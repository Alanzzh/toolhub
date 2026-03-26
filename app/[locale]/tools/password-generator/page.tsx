"use client";

import { useState } from "react";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const CHARS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?",
};

export default function PasswordGeneratorPage() {
  const t = useTranslations('tools.password');
  const tc = useTranslations('common');
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ uppercase: true, lowercase: true, numbers: true, symbols: false });
  const [count, setCount] = useState(1);
  const [passwords, setPasswords] = useState<string[]>([]);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = () => {
    const charset = Object.entries(options)
      .filter(([, v]) => v)
      .map(([k]) => CHARS[k as keyof typeof CHARS])
      .join("");

    if (!charset) return;

    const newPasswords = Array.from({ length: count }, () =>
      Array.from(crypto.getRandomValues(new Uint32Array(length)))
        .map((n) => charset[n % charset.length])
        .join("")
    );
    setPasswords(newPasswords);
    setCopied(null);
  };

  const copyOne = (idx: number) => {
    navigator.clipboard.writeText(passwords[idx]);
    setCopied(idx);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">{tc('backHome')}</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600 mb-8">{t('description')}</p>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('lengthLabel')}: <span className="text-blue-600 font-bold">{length}</span>
            </label>
            <input type="range" min={8} max={64} value={length} onChange={(e) => setLength(+e.target.value)}
              className="w-full" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">{t('charTypesLabel')}</label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(options).map(([key, val]) => (
                <label key={key} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={val}
                    onChange={(e) => setOptions((o) => ({ ...o, [key]: e.target.checked }))}
                    className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-700">{t(key)}</span>
                  <span className="text-xs text-gray-400 font-mono">{CHARS[key as keyof typeof CHARS].slice(0, 8)}…</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('countLabel')}: {count}</label>
            <input type="range" min={1} max={10} value={count} onChange={(e) => setCount(+e.target.value)}
              className="w-full" />
          </div>

          <button onClick={generate}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            {t('generateBtn')}
          </button>
        </div>

        {passwords.length > 0 && (
          <div className="mt-6 space-y-3">
            {passwords.map((pw, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-lg shadow p-4">
                <code className="flex-1 font-mono text-sm break-all">{pw}</code>
                <button onClick={() => copyOne(i)}
                  className="shrink-0 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                  {copied === i ? tc('copied') : tc('copy')}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
