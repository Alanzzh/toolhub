"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function Base64Page() {
  const t = useTranslations('tools.base64');
  const tc = useTranslations('common');
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const encode = () => {
    try {
      setOutput(btoa(unescape(encodeURIComponent(input))));
      setError("");
    } catch {
      setError(t('errorEncode'));
    }
  };

  const decode = () => {
    try {
      setOutput(decodeURIComponent(escape(atob(input))));
      setError("");
    } catch {
      setError(t('errorDecode'));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">{tc('backHome')}</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600 mb-8">{t('description')}</p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('inputLabel')}</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('inputPlaceholder')}
              className="w-full h-48 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-3">
            <button onClick={encode} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              {t('encodeBtn')}
            </button>
            <button onClick={decode} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              {t('decodeBtn')}
            </button>
            <button onClick={() => { setInput(""); setOutput(""); setError(""); }} className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors">
              {tc('clear')}
            </button>
          </div>

          {error && <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">{error}</div>}

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">{t('outputLabel')}</label>
              {output && (
                <button onClick={() => navigator.clipboard.writeText(output)} className="text-sm text-blue-600 hover:underline">
                  {tc('copy')}
                </button>
              )}
            </div>
            <textarea
              value={output}
              readOnly
              placeholder={t('outputPlaceholder')}
              className="w-full h-48 p-4 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
