"use client";

import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function TimestampPage() {
  const t = useTranslations('tools.timestamp');
  const tc = useTranslations('common');
  const [now, setNow] = useState(0);
  const [tsInput, setTsInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [tsResult, setTsResult] = useState<{ utc: string; local: string; iso: string } | null>(null);
  const [dateResult, setDateResult] = useState<{ ms: number; s: number } | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const convertTs = () => {
    const ms = tsInput.length <= 10 ? parseInt(tsInput) * 1000 : parseInt(tsInput);
    if (isNaN(ms)) return;
    const d = new Date(ms);
    setTsResult({ utc: d.toUTCString(), local: d.toLocaleString(), iso: d.toISOString() });
  };

  const convertDate = () => {
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return;
    setDateResult({ ms: d.getTime(), s: Math.floor(d.getTime() / 1000) });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">{tc('backHome')}</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600 mb-8">{t('description')}</p>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">{t('currentTime')}</h2>
          <p className="text-3xl font-mono text-blue-600 mb-1">{Math.floor(now / 1000)}</p>
          <p className="text-sm text-gray-500">{new Date(now).toISOString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('timestampToDate')}</h2>
          <div className="flex gap-3 mb-4">
            <input value={tsInput} onChange={(e) => setTsInput(e.target.value)}
              placeholder={t('timestampPlaceholder')}
              className="flex-1 p-3 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            <button onClick={convertTs} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">{t('convertBtn')}</button>
          </div>
          {tsResult && (
            <div className="space-y-2 text-sm">
              {Object.entries(tsResult).map(([k, v]) => (
                <div key={k} className="flex gap-3 items-center">
                  <span className="w-14 text-gray-500 capitalize">{t(k)}:</span>
                  <code className="flex-1 bg-gray-50 px-3 py-1 rounded font-mono">{v}</code>
                  <button onClick={() => navigator.clipboard.writeText(v)} className="text-blue-600 hover:underline text-xs">{tc('copy')}</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('dateToTimestamp')}</h2>
          <div className="flex gap-3 mb-4">
            <input type="datetime-local" value={dateInput} onChange={(e) => setDateInput(e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            <button onClick={convertDate} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">{t('convertBtn')}</button>
          </div>
          {dateResult && (
            <div className="space-y-2 text-sm">
              <div className="flex gap-3 items-center">
                <span className="w-20 text-gray-500">{t('seconds')}:</span>
                <code className="flex-1 bg-gray-50 px-3 py-1 rounded font-mono">{dateResult.s}</code>
                <button onClick={() => navigator.clipboard.writeText(String(dateResult.s))} className="text-blue-600 hover:underline text-xs">{tc('copy')}</button>
              </div>
              <div className="flex gap-3 items-center">
                <span className="w-20 text-gray-500">{t('milliseconds')}:</span>
                <code className="flex-1 bg-gray-50 px-3 py-1 rounded font-mono">{dateResult.ms}</code>
                <button onClick={() => navigator.clipboard.writeText(String(dateResult.ms))} className="text-blue-600 hover:underline text-xs">{tc('copy')}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
