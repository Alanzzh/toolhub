"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}
function toCamelCase(str: string) {
  return str.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : "")).replace(/^(.)/, (c) => c.toLowerCase());
}
function toSnakeCase(str: string) {
  return str.replace(/\s+/g, "_").replace(/([A-Z])/g, "_$1").replace(/^_/, "").toLowerCase();
}
function toKebabCase(str: string) {
  return str.replace(/\s+/g, "-").replace(/([A-Z])/g, "-$1").replace(/^-/, "").toLowerCase();
}

export default function TextCasePage() {
  const t = useTranslations('tools.textCase');
  const tc = useTranslations('common');
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const conversions = [
    { label: t('uppercase'), fn: (s: string) => s.toUpperCase() },
    { label: t('lowercase'), fn: (s: string) => s.toLowerCase() },
    { label: t('titleCase'), fn: toTitleCase },
    { label: t('sentenceCase'), fn: (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() },
    { label: t('camelCase'), fn: toCamelCase },
    { label: t('snakeCase'), fn: toSnakeCase },
    { label: t('kebabCase'), fn: toKebabCase },
  ];

  const copy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">{tc('backHome')}</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600 mb-8">{t('description')}</p>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">{t('inputLabel')}</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)}
            placeholder={t('inputPlaceholder')}
            className="w-full h-32 p-4 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>

        <div className="space-y-3">
          {conversions.map(({ label, fn }) => {
            const result = input ? fn(input) : "";
            return (
              <div key={label} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 flex items-center gap-4">
                <span className="w-32 shrink-0 text-sm font-medium text-gray-500">{label}</span>
                <code className="flex-1 text-sm text-gray-800 break-all">{result || <span className="text-gray-300">{t('preview')}</span>}</code>
                {result && (
                  <button onClick={() => copy(result, label)} className="shrink-0 px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                    {copied === label ? tc('copied') : tc('copy')}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
