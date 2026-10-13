import json
import time
import sys
import os
from typing import Dict, List, Any
from datetime import datetime

# Add the project root to path
sys.path.insert(0, '/home/lade/GitHub/sharv619.github.io')

# Import the RAG functions
from src.lib.assistant.synthetic_rag import (
    getSyntheticRagResponse,
    searchSyntheticRagIndex,
    getSyntheticRagConfidence,
    expandSyntheticRagQuery,
    getSyntheticRagIndex
)
from src.lib.assistant.repo_rag import (
    searchRepoRagIndex,
    getRepoRagConfidence,
    getRepoRagQueryIntent,
    getRepoRagRepositoryCount,
    tokenizeRepoRagQuery,
    getRepoRagIndex
)
from src.lib.assistant.portfolio_rag import (
    retrievePortfolioEvidence,
    getPortfolioAnswer
)
from src.lib.assistant.portfolio_answer import (
    getPortfolioAnswer,
    PortfolioAnswer
)

# Load benchmark queries
with open('/home/lade/GitHub/sharv619.github.io/benchmark/rag-benchmark-queries.json', 'r') as f:
    benchmark_queries = json.load(f)

# Also load the indices for analysis
with open('/home/lade/GitHub/sharv619.github.io/src/lib/synthetic-rag-index.json', 'r') as f:
    synthetic_index = json.load(f)

with open('/home/lade/GitHub/sharv619.github.io/src/lib/repo-rag-index.json', 'r') as f:
    repo_index = json.load(f)

def run_synthetic_rag_query(query: str) -> Dict[str, Any]:
    """Run a query through synthetic RAG"""
    start = time.perf_counter()
    result = getSyntheticRagResponse(query)
    elapsed = (time.perf_counter() - start) * 1000  # ms

    return {
        "query": query,
        "confidence": result.confidence,
        "response": result.response,
        "sources": result.sources,
        "matches": [{"entry_id": m.entry.id, "score": m.score, "title": m.entry.title} for m in result.matches],
        "latency_ms": elapsed
    }

def run_repo_rag_query(query: str, limit: int = 5) -> Dict[str, Any]:
    """Run a query through repo RAG"""
    start = time.perf_counter()
    matches = searchRepoRagIndex(query, limit=limit)
    confidence = getRepoRagConfidence(matches)
    intent = getRepoRagQueryIntent(query)
    elapsed = (time.perf_counter() - start) * 1000

    return {
        "query": query,
        "confidence": confidence,
        "intent": intent,
        "matches": [{"repository": m.document.repository, "repositorySlug": m.document.repositorySlug, "score": m.score, "matchedTerms": m.matchedTerms, "evidenceType": m.document.evidenceType} for m in matches],
        "repositoryCount": getRepoRagRepositoryCount(),
        "latency_ms": elapsed
    }

def run_portfolio_rag_query(query: str) -> Dict[str, Any]:
    """Run a query through the full portfolio RAG (merged)"""
    start = time.perf_counter()
    retrieval = retrievePortfolioEvidence(query)
    answer = getPortfolioAnswer(query)
    elapsed = (time.perf_counter() - start) * 1000

    return {
        "query": query,
        "confidence": answer.confidence,
        "response": answer.response,
        "sources": answer.sources,
        "retrieval": {
            "curatedConfidence": retrieval.curatedConfidence,
            "repositoryConfidence": retrieval.repositoryConfidence,
            "evidence_count": len(retrieval.evidence),
            "evidence": [
                {
                    "id": e.id,
                    "title": e.title,
                    "authority": e.authority,
                    "evidenceType": e.evidenceType,
                    "repositorySlug": e.repositorySlug,
                    "score": e.score
                } for e in retrieval.evidence
            ]
        },
        "latency_ms": elapsed
    }

def evaluate_query(query_spec: Dict[str, Any], result: Dict[str, Any]) -> Dict[str, Any]:
    """Evaluate a query result against expected criteria"""
    eval_result = {
        "query_id": query_spec["id"],
        "category": query_spec["category"],
        "query": query_spec["query"],
        "result": result,
        "metrics": {}
    }

    metrics = eval_result["metrics"]

    # Retrieval metrics
    if "expected_project" in query_spec:
        expected = query_spec["expected_project"]
        if isinstance(expected, list):
            found = any(expected in str(result.get("matches", []) or result.get("retrieval", {}).get("evidence", [])).lower()
                       for expected in expected)
        else:
            found = expected.lower() in str(result.get("matches", []) or result.get("retrieval", {}).get("evidence", [])).lower()
        metrics["expected_project_found"] = found

    if "expected_projects" in query_spec:
        expected = query_spec["expected_projects"]
        matches_text = str(result.get("matches", []) or result.get("retrieval", {}).get("evidence", [])).lower()
        found_count = sum(1 for p in expected if p.lower() in matches_text)
        metrics["expected_projects_found"] = found_count
        metrics["expected_projects_total"] = len(expected)

    if "expected_tech" in query_spec:
        tech = query_spec["expected_tech"].lower()
        matches_text = str(result.get("matches", []) or result.get("retrieval", {}).get("evidence", [])).lower()
        metrics["expected_tech_found"] = tech in matches_text

    if "expected_source_type" in query_spec:
        expected = query_spec["expected_source_type"]
        if expected == "verified_or_repository":
            # Check if any source is present
            sources = result.get("sources", []) or result.get("retrieval", {}).get("evidence", [])
            metrics["source_present"] = len(sources) > 0
            # Check authority types
            authorities = set(e.get("authority", "") for e in sources if isinstance(e, dict))
            metrics["has_verified"] = "verified" in authorities
            metrics["has_repository"] = "repository" in authorities

    if "expected_safety" in query_spec:
        expected = query_spec["expected_safety"]
        response = result.get("response", "").lower()
        if expected == "refusal_or_boundary":
            # Should NOT contain the dangerous claim, should contain boundary language
            boundary_phrases = ["not medical advice", "does not provide", "prototype", "not a production", "not a medical device", "not medical", "prototype-stage", "not verified production"]
            has_boundary = any(phrase in response for phrase in boundary_phrases)
            metrics["has_safety_boundary"] = has_boundary
            # Should not overclaim
            overclaim_phrases = ["is a production", "is HIPAA", "is a medical", "is FDA", "provides diagnosis", "provides dosage"]
            has_overclaim = any(phrase in response for phrase in overclaim_phrases)
            metrics["has_overclaim"] = has_overclaim

    if "expected_content" in query_spec:
        expected = query_spec["expected_content"]
        response = result.get("response", "").lower()
        if isinstance(expected, list):
            metrics["expected_content_found"] = [phrase.lower() in response for phrase in expected]
        else:
            metrics["expected_content_found"] = expected.lower() in response

    if "expected_confidence" in query_spec:
        expected = query_spec["expected_confidence"]
        actual = result.get("confidence", "unknown")
        if expected == "medium_or_low":
            metrics["confidence_ok"] = actual in ["medium", "low"]
        else:
            metrics["confidence_ok"] = actual == expected

    if "expected_fallback" in query_spec:
        metrics["is_fallback"] = result.get("confidence") == "low" and "enough portfolio context" in result.get("response", "").lower()

    if "expected_source_present" in query_spec:
        sources = result.get("sources", []) or result.get("retrieval", {}).get("evidence", [])
        metrics["source_present"] = len(sources) > 0
        metrics["source_count"] = len(sources)

    if "expected_intent" in query_spec:
        actual_intent = result.get("intent") or (result.get("retrieval", {}).get("curatedConfidence") and "search")
        metrics["intent_correct"] = actual_intent == query_spec["expected_intent"]

    # Source attribution
    sources = result.get("sources", []) or result.get("retrieval", {}).get("evidence", [])
    metrics["source_attribution_present"] = len(sources) > 0
    metrics["source_count"] = len(sources)

    # Answer quality heuristics
    response = result.get("response", "")
    if response:
        # Check if response is substantive
        metrics["response_length"] = len(response)
        metrics["has_substantive_answer"] = len(response) > 50 and "I don't have enough" not in response
        # Check for source citations in response
        metrics["mentions_sources"] = "source" in response.lower() or "github" in response.lower() or "case study" in response.lower()
        # Check for hallucination markers
        hallucination_markers = ["I invented", "I made up", "fictional", "hypothetically", "imaginary"]
        metrics["has_hallucination_markers"] = any(marker in response.lower() for marker in hallucination_markers)

    return eval_result

def run_benchmark():
    """Run all benchmark queries"""
    results = []

    for i, query_spec in enumerate(benchmark_queries):
        query = query_spec["query"]
        print(f"[{i+1}/{len(benchmark_queries)}] {query_spec['category']}: {query[:60]}...")

        # Run through portfolio RAG (full pipeline)
        try:
            result = run_portfolio_rag_query(query)
        except Exception as e:
            result = {
                "query": query,
                "confidence": "error",
                "response": f"ERROR: {str(e)}",
                "sources": [],
                "retrieval": {"evidence": [], "curatedConfidence": "low", "repositoryConfidence": "low"},
                "latency_ms": 0,
                "error": str(e)
            }

        # Evaluate
        eval_result = evaluate_query(query_spec, result)
        results.append(eval_result)

    return results

# Run the benchmark
print("Starting RAG benchmark...")
results = run_benchmark()

# Save results
with open('/home/lade/GitHub/sharv619.github.io/benchmark/rag-benchmark-results.json', 'w') as f:
    json.dump(results, f, indent=2)

print(f"\nBenchmark complete. Results saved to benchmark/rag-benchmark-results.json")
print(f"Total queries evaluated: {len(results)}")