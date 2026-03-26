"use client";

import { useState, useEffect } from "react";
import { marked } from "marked";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function MarkdownPreviewPage() {
  const t = useTranslations('tools.markdownPreview');
  const tc = useTranslations('common');
  const [input, setInput] = useState(`# Hello, Markdown!

## Features
- **Bold** and *italic* text
- \`inline code\`
- [Links](https://example.com)

## Code Block
\`\`\`javascript
const greet = (name) => \`Hello, \${name}!\`;
console.log(greet("World"));
\`\`\`

> Blockquotes are supported too!

| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
`);
  const [html, setHtml] = useState("");

  useEffect(() => {
    const result = marked(input);
    setHtml(typeof result === "string" ? result : "");
  }, [input]);

  const copy = () => navigator.clipboard.writeText(html);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">{tc('backHome')}</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600 mb-8">{t('description')}</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">{t('inputLabel')}</label>
              <button onClick={() => setInput("")} className="text-sm text-gray-500 hover:text-gray-700">{tc('clear')}</button>
            </div>
            <textarea value={input} onChange={(e) => setInput(e.target.value)}
              className="w-full h-[600px] p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">{t('previewLabel')}</label>
              <button onClick={copy} className="text-sm text-blue-600 hover:underline">{t('copyHtml')}</button>
            </div>
            <div
              className="w-full h-[600px] p-6 bg-white border border-gray-300 rounded-lg overflow-auto prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
