"use client";

import { useState } from "react";

import Link from 'next/link';

export default function UrlEncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const encode = () => {
    try {
      setOutput(encodeURIComponent(input));
      setError("");
    } catch {
      setError("Encoding failed");
    }
  };

  const decode = () => {
    try {
      setOutput(decodeURIComponent(input));
      setError("");
    } catch {
      setError("Decoding failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Home</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">URL Encoder/Decoder</h1>
        <p className="text-gray-600 mb-8">Encode and decode URL components</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Input</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text here..."
              className="w-full h-48 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div className="flex gap-3">
            <button onClick={encode} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Encode</button>
            <button onClick={decode} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">Decode</button>
            <button onClick={() => { setInput(""); setOutput(""); setError(""); }} className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors">Clear</button>
          </div>

          {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Output</label>
              {output && <button onClick={() => navigator.clipboard.writeText(output)} className="text-sm text-blue-600 hover:underline">Copy</button>}
            </div>
            <textarea value={output} readOnly placeholder="Result will appear here..."
              className="w-full h-48 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50" />
          </div>
        </div>
      </div>
    </div>
  );
}
