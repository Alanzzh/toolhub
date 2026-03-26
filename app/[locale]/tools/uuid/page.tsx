"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function UuidPage() {
  const t = useTranslations('tools.uuid');
  const tc = useTranslations('common');
  const [count, setCount] = useState(5);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = () => {
    setUuids(Array.from({ length: count }, () => crypto.randomUUID()));
    setCopied(null);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">{tc('backHome')}</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600 mb-8">{t('description')}</p>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('countLabel')}: {count}</label>
            <input type="range" min={1} max={20} value={count} onChange={(e) => setCount(+e.target.value)}
              className="w-full" />
          </div>
          <button onClick={generate}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            {t('generateBtn')}
          </button>
        </div>

        {uuids.length > 0 && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">{uuids.length} {t('generated')}</span>
              <button onClick={copyAll} className="text-sm text-blue-600 hover:underline">{t('copyAll')}</button>
            </div>
            <div className="space-y-2">
              {uuids.map((uuid, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-lg shadow-sm p-3 border border-gray-100">
                  <code className="flex-1 font-mono text-sm text-gray-800">{uuid}</code>
                  <button onClick={() => { navigator.clipboard.writeText(uuid); setCopied(i); setTimeout(() => setCopied(null), 2000); }}
                    className="shrink-0 px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                    {copied === i ? tc('copied') : tc('copy')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
