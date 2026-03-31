"use client";

import { useState, useMemo } from "react";

import Link from 'next/link';

export default function WordCounterPage() {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const charsNoSpace = text.replace(/\s/g, "").length;
    const lines = text ? text.split("\n").length : 0;
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(Boolean).length : 0;
    const readingTime = Math.ceil(words / 200);

    const wordFreq: Record<string, number> = {};
    text.toLowerCase().match(/\b[a-z]+\b/g)?.forEach((w) => {
      wordFreq[w] = (wordFreq[w] || 0) + 1;
    });
    const topWords = Object.entries(wordFreq).sort((a, b) => b[1] - a[1]).slice(0, 10);

    return { words, chars, charsNoSpace, lines, sentences, paragraphs, readingTime, topWords };
  }, [text]);

  const statItems = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.chars },
    { label: "Characters (no spaces)", value: stats.charsNoSpace },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Lines", value: stats.lines },
    { label: "Reading Time", value: `${stats.readingTime} min` },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Home</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Word Counter</h1>
        <p className="text-gray-600 mb-8">Count words, characters, and analyze text</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <textarea value={text} onChange={(e) => setText(e.target.value)}
              placeholder="Enter text here..."
              className="w-full h-96 p-4 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
          </div>

          <div className="space-y-3">
            {statItems.map(({ label, value }) => (
              <div key={label} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex justify-between items-center">
                <span className="text-sm text-gray-600">{label}</span>
                <span className="text-xl font-bold text-blue-600">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {stats.topWords.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Top Words</h2>
            <div className="flex flex-wrap gap-2">
              {stats.topWords.map(([word, count]) => (
                <span key={word} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                  {word} <span className="font-bold">{count}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
