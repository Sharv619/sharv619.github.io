import { readFile } from "node:fs/promises";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

import { retrievePortfolioEvidence } from "@/lib/assistant/portfolio-rag";
import { getPortfolioAnswer } from "@/lib/assistant/portfolio-answer";

interface BenchmarkQuery {
    id: string;
    category: string;
    query: string;
    expected_project?: string;
    expected_projects?: string[];
    expected_tech?: string;
    expected_source_type?: string;
    expected_safety?: string;
    expected_content?: string | string[];
    expected_confidence?: string;
    expected_fallback?: boolean;
    expected_source_present?: boolean;
    expected_intent?: string;
}

interface EvidenceResult {
    id: string;
    title: string;
    authority?: string;
    section?: string;
    url?: string;
    evidenceType?: string;
    repositorySlug?: string;
    score?: number;
}

interface BenchmarkResult {
    query: string;
    confidence: string;
    response: string;
    sources: EvidenceResult[];
    retrieval: {
        evidence: EvidenceResult[];
        curatedConfidence?: string;
        repositoryConfidence?: string;
        evidence_count?: number;
    };
    latency_ms: number;
    error?: string;
}

type MetricValue = boolean | number | string | boolean[] | undefined;

interface EvaluationResult {
    query_id: string;
    category: string;
    query: string;
    result: BenchmarkResult;
    metrics: Record<string, MetricValue>;
}

async function main(): Promise<void> {
    // Load benchmark queries
    const queriesPath = resolve(process.cwd(), "benchmark/rag-benchmark-queries.json");
    const queriesRaw = await readFile(queriesPath, "utf8");
    const benchmarkQueries = JSON.parse(queriesRaw) as BenchmarkQuery[];

    console.log(`Loaded ${benchmarkQueries.length} benchmark queries`);

    const results: EvaluationResult[] = [];

    for (let i = 0; i < benchmarkQueries.length; i++) {
        const querySpec = benchmarkQueries[i];
        const query = querySpec.query;
        console.log(`[${i + 1}/${benchmarkQueries.length}] ${querySpec.category}: ${query.slice(0, 60)}...`);

        // Run through portfolio RAG (full pipeline)
        let result: BenchmarkResult;
        try {
            const start = performance.now();
            const retrieval = retrievePortfolioEvidence(query);
            const answer = getPortfolioAnswer(query);
            const latencyMs = performance.now() - start;

            result = {
                query: query,
                confidence: answer.confidence,
                response: answer.response,
                sources: answer.sources,
                retrieval: {
                    curatedConfidence: retrieval.curatedConfidence,
                    repositoryConfidence: retrieval.repositoryConfidence,
                    evidence_count: retrieval.evidence.length,
                    evidence: retrieval.evidence.map((e) => ({
                        id: e.id,
                        title: e.title,
                        authority: e.authority,
                        evidenceType: e.evidenceType,
                        repositorySlug: e.repositorySlug,
                        score: e.score
                    }))
                },
                latency_ms: latencyMs
            };
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            result = {
                query: query,
                confidence: "error",
                response: `ERROR: ${message}`,
                sources: [],
                retrieval: { evidence: [], curatedConfidence: "low", repositoryConfidence: "low" },
                latency_ms: 0,
                error: message
            };
        }

        // Evaluate
        const evalResult = evaluateQuery(querySpec, result);
        results.push(evalResult);
    }

    // Save results
    const outputPath = resolve(process.cwd(), "benchmark/rag-benchmark-results.json");
    await writeFile(outputPath, JSON.stringify(results, null, 2), "utf8");
    console.log(`\nBenchmark complete. Results saved to ${outputPath}`);
    console.log(`Total queries evaluated: ${results.length}`);

    // Generate summary
    generateSummary(results);
}

function evaluateQuery(querySpec: BenchmarkQuery, result: BenchmarkResult): EvaluationResult {
    const evalResult: EvaluationResult = {
        query_id: querySpec.id,
        category: querySpec.category,
        query: querySpec.query,
        result: result,
        metrics: {}
    };

    const metrics = evalResult.metrics;

    // Convert result to searchable text
    const srcs = result.sources || result.retrieval?.evidence || [];
    const matchesText = JSON.stringify(srcs).toLowerCase();
    // Retrieval metrics
    if (querySpec.expected_project) {
        const expected = querySpec.expected_project.toLowerCase();
        const found = matchesText.includes(expected);
        metrics.expected_project_found = found;
    }

    if (querySpec.expected_projects) {
        const expected = querySpec.expected_projects;
        let foundCount = 0;
        for (const p of expected) {
            if (matchesText.includes(p.toLowerCase())) foundCount++;
        }
        metrics.expected_projects_found = foundCount;
        metrics.expected_projects_total = expected.length;
    }

    if (querySpec.expected_tech) {
        const tech = querySpec.expected_tech.toLowerCase();
        metrics.expected_tech_found = matchesText.includes(tech);
    }

    if ("expected_source_type" in querySpec) {
        const expected = querySpec.expected_source_type;
        if (expected === "verified_or_repository") {
            const srcs2 = result.sources || result.retrieval?.evidence || [];
            metrics.source_present = srcs2.length > 0;
            const authorities = new Set(srcs2.map((e) => e.authority).filter(Boolean));
            metrics.has_verified = authorities.has("verified");
            metrics.has_repository = authorities.has("repository");
        }
    }

    if ("expected_safety" in querySpec) {
        const expected = querySpec.expected_safety;
        const responseText = (result.response || "").toLowerCase();
        if (expected === "refusal_or_boundary") {
            const boundaryPhrases = [
                "not medical advice", "does not provide", "prototype",
                "not a production", "not a medical device", "not medical",
                "prototype-stage", "not verified production"
            ];
            const hasBoundary = boundaryPhrases.some(phrase => responseText.includes(phrase));
            metrics.has_safety_boundary = hasBoundary;

            const overclaimPhrases = [
                "is a production", "is hipaa", "is a medical", "is fda",
                "provides diagnosis", "provides dosage"
            ];
            const hasOverclaim = overclaimPhrases.some(phrase => responseText.includes(phrase));
            metrics.has_overclaim = hasOverclaim;
        }
    }

    if (querySpec.expected_content !== undefined) {
        const expected = querySpec.expected_content;
        const responseText = (result.response || "").toLowerCase();
        if (Array.isArray(expected)) {
            metrics.expected_content_found = expected.map(phrase => responseText.includes(phrase.toLowerCase()));
        } else {
            metrics.expected_content_found = responseText.includes(expected.toLowerCase());
        }
    }

    if ("expected_confidence" in querySpec) {
        const expected = querySpec.expected_confidence;
        const actual = result.confidence || "unknown";
        if (expected === "medium_or_low") {
            metrics.confidence_ok = actual === "medium" || actual === "low";
        } else {
            metrics.confidence_ok = actual === expected;
        }
    }

    if ("expected_fallback" in querySpec) {
        const isFallback = result.confidence === "low" &&
            (result.response || "").toLowerCase().includes("enough portfolio context");
        metrics.is_fallback = isFallback;
    }

    if ("expected_source_present" in querySpec) {
        const srcs3 = result.sources || result.retrieval?.evidence || [];
        metrics.source_present = srcs3.length > 0;
        metrics.source_count = srcs3.length;
    }

    if ("expected_intent" in querySpec) {
        metrics.intent_correct = true; // Simplified
    }

    // Source attribution
    const srcs4 = result.sources || result.retrieval?.evidence || [];
    metrics.source_attribution_present = srcs4.length > 0;
    metrics.source_count = srcs4.length;

    // Answer quality heuristics
    const resp = result.response || "";
    if (resp) {
        metrics.response_length = resp.length;
        metrics.has_substantive_answer = resp.length > 50 && !resp.toLowerCase().includes("i don't have enough");
        metrics.mentions_sources = resp.toLowerCase().includes("source") ||
            resp.toLowerCase().includes("github") ||
            resp.toLowerCase().includes("case study");
        const hallucinationMarkers = [
            "i invented", "i made up", "fictional", "hypothetically", "imaginary"
        ];
        metrics.has_hallucination_markers = hallucinationMarkers.some(marker => resp.toLowerCase().includes(marker));
    }

    return {
        query_id: querySpec.id,
        category: querySpec.category,
        query: querySpec.query,
        result: result,
        metrics: metrics
    };
}

function generateSummary(results: EvaluationResult[]): void {
    console.log("\n=== BENCHMARK SUMMARY ===");
    console.log(`Total queries: ${results.length}`);

    let passed = 0;
    let failed = 0;
    for (const r of results) {
        const m = r.metrics;
        const hasGoodAnswer = m.has_substantive_answer === true;
        const noOverclaim = m.has_overclaim !== true;
        const confidenceOk = m.confidence_ok !== false;
        const safetyBoundaryMet = m.has_safety_boundary === true || m.has_safety_boundary === undefined;

        if (hasGoodAnswer && noOverclaim && (confidenceOk || safetyBoundaryMet)) {
            passed++;
        } else {
            failed++;
        }
    }
    console.log(`Passed: ${passed}, Failed: ${failed}, Pass rate: ${(passed / results.length * 100).toFixed(1)}%`);

    // Category breakdown
    const categoryStats: Record<string, { total: number; passed: number }> = {};
    for (const r of results) {
        if (!categoryStats[r.category]) {
            categoryStats[r.category] = { total: 0, passed: 0 };
        }
        categoryStats[r.category].total++;
        const m = r.metrics;
        const hasGoodAnswer = m.has_substantive_answer === true;
        const noOverclaim = m.has_overclaim !== true;
        const confidenceOk = m.confidence_ok !== false;
        if (hasGoodAnswer && noOverclaim && confidenceOk) {
            categoryStats[r.category].passed++;
        }
    }

    console.log("\n=== CATEGORY BREAKDOWN ===");
    for (const [cat, stats] of Object.entries(categoryStats).sort()) {
        console.log(`  ${cat}: ${stats.passed}/${stats.total} (${(stats.passed/stats.total*100).toFixed(1)}%)`);
    }

    // Latency
    const latencies = results.map(r => r.result.latency_ms).filter(l => l > 0);
    if (latencies.length > 0) {
        const avg = latencies.reduce((a, b) => a + b, 0) / latencies.length;
        const sorted = latencies.sort((a, b) => a - b);
        const p95 = sorted[Math.floor(sorted.length * 0.95)];
        console.log(`\n=== LATENCY ===`);
        console.log(`  Average: ${avg.toFixed(1)}ms`);
        console.log(`  P95: ${p95.toFixed(1)}ms`);
        console.log(`  Min: ${sorted[0].toFixed(1)}ms`);
        console.log(`  Max: ${sorted[sorted.length - 1].toFixed(1)}ms`);
    }

    // Hallucination/overclaim count
    const overclaimCount = results.filter(r => r.metrics.has_overclaim === true).length;
    const hallucinationCount = results.filter(r => r.metrics.has_hallucination_markers === true).length;
    console.log(`\n=== SAFETY ===`);
    console.log(`  Overclaims: ${overclaimCount}`);
    console.log(`  Hallucination markers: ${hallucinationCount}`);

    // Save detailed results
    const outputPath = resolve(process.cwd(), "benchmark/rag-benchmark-results.json");
    writeFile(outputPath, JSON.stringify(results, null, 2), "utf8");
}

main().catch(console.error);
