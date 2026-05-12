"use client";

import { useState } from "react";

export default function KBEditor() {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    setError(null);
    try {
      const parsed = JSON.parse(jsonInput);
      const blob = new Blob([JSON.stringify(parsed, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "knowledge-base.json";
      a.click();
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (e) {
      setError("Invalid JSON: " + (e as Error).message);
    }
  };

  const loadFromFile = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const text = await file.text();
        setJsonInput(text);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-cyan-400">Knowledge Base Editor</h1>
            <p className="text-gray-400 text-sm">Paste or edit JSON, then save to file</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={loadFromFile}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
            >
              Load JSON
            </button>
            <button
              onClick={handleSave}
              className={`px-6 py-2 rounded-lg font-semibold ${
                saved ? "bg-green-500" : "bg-cyan-600 hover:bg-cyan-500"
              }`}
            >
              {saved ? "✓ Saved!" : "Save JSON"}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-300 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <textarea
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Paste your knowledge-base.json here...'
          className="w-full h-[70vh] bg-black border border-gray-700 rounded-lg p-4 font-mono text-sm"
        />
      </div>
    </div>
  );
}
