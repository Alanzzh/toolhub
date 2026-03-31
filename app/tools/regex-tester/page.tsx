"use client";

import { useState, useMemo } from "react";

import Link from 'next/link';

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testStr, setTestStr] = useState("");

  const result = useMemo(() => {
    if (!pattern || !testStr) return null;
    try {
      const re = new RegExp(pattern, flags);
      const matches = [...testStr.matchAll(new RegExp(pattern, flags.includes("g") ? flags : flags + "g"))];
      return { matches, error: null };
    } catch (e) {
      return { matches: [], error: e instanceof Error ? e.message : "Invalid regex" };
    }
  }, [pattern, flags, testStr]);

  const highlighted = useMemo(() => {
    if (!result || result.error || result.matches.length === 0) return testStr;
    let out = "";
    let last = 0;
    for (const m of result.matches) {
      if (m.index === undefined) continue;
      out += testStr.slice(last, m.index).replace(/</g, "&lt;");
      out += `<mark class="bg-yellow-200 rounded">${m[0].replace(/</g, "&lt;")}</mark>`;
      last = m.index + m[0].length;
    }
    out += testStr.slice(last).replace(/</g, "&lt;");
    return out;
  }, [result, testStr]);

  const flagOptions = ["g", "i", "m", "s"];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Home</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Regex Tester</h1>
        <p className="text-gray-600 mb-8">Test and debug regular expressions</p>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Pattern</label>
              <input value={pattern} onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern..."
                className={`w-full p-3 border rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${result?.error ? "border-red-400" : "border-gray-300"}`} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Flags</label>
              <div className="flex gap-2">
                {flagOptions.map((f) => (
                  <label key={f} className="flex items-center gap-1 cursor-pointer">
                    <input type="checkbox" checked={flags.includes(f)}
                      onChange={(e) => setFlags((fl) => e.target.checked ? fl + f : fl.replace(f, ""))}
                      className="w-4 h-4" />
                    <code className="text-sm">{f}</code>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {result?.error && <p className="text-red-600 text-sm mb-4">{result.error}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Test String</label>
            <textarea value={testStr} onChange={(e) => setTestStr(e.target.value)}
              placeholder="Enter text to test..."
              className="w-full h-40 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>

        {result && !result.error && testStr && (
          <>
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-gray-800">Highlighted Matches</h2>
                <span className="text-sm text-gray-500">{result.matches.length} {result.matches.length !== 1 ? "matches" : "match"}</span>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg font-mono text-sm whitespace-pre-wrap break-all"
                dangerouslySetInnerHTML={{ __html: highlighted }} />
            </div>

            {result.matches.length > 0 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Match Details</h2>
                <div className="space-y-2">
                  {result.matches.map((m, i) => (
                    <div key={i} className="flex gap-4 items-start p-3 bg-gray-50 rounded-lg">
                      <span className="text-xs text-gray-500 mt-0.5">#{i + 1}</span>
                      <div>
                        <code className="text-sm font-semibold text-blue-700">{m[0]}</code>
                        <span className="text-xs text-gray-400 ml-2">at index {m.index}</span>
                        {m.length > 1 && (
                          <div className="mt-1 space-y-1">
                            {Array.from(m).slice(1).map((g, gi) => (
                              <div key={gi} className="text-xs text-gray-600">Group {gi + 1}: <code>{g}</code></div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
