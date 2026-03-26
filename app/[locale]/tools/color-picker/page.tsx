"use client";

import { useState, useCallback } from "react";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hexToHsv(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  const s = max === 0 ? 0 : d / max;
  let h = 0;
  if (max !== min) {
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(max * 100) };
}

export default function ColorPickerPage() {
  const t = useTranslations('tools.colorPicker');
  const tc = useTranslations('common');
  const [color, setColor] = useState("#3b82f6");
  const [copied, setCopied] = useState<string | null>(null);

  const rgb = hexToRgb(color);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const hsv = hexToHsv(rgb.r, rgb.g, rgb.b);

  const formats = [
    { label: "HEX", value: color.toUpperCase() },
    { label: "RGB", value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: "HSL", value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: "HSV", value: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)` },
    { label: "R", value: String(rgb.r) },
    { label: "G", value: String(rgb.g) },
    { label: "B", value: String(rgb.b) },
  ];

  const copy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const shades = Array.from({ length: 9 }, (_, i) => {
    const l = 10 + i * 10;
    return `hsl(${hsl.h}, ${hsl.s}%, ${l}%)`;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">{tc('backHome')}</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600 mb-8">{t('description')}</p>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)}
              className="w-24 h-24 rounded-xl cursor-pointer border-0 p-0" />
            <div>
              <div className="w-40 h-24 rounded-xl shadow-inner" style={{ background: color }} />
            </div>
          </div>

          <div className="space-y-3">
            {formats.map(({ label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="w-16 text-sm font-medium text-gray-500">{label}</span>
                <code className="flex-1 bg-gray-50 px-3 py-2 rounded font-mono text-sm">{value}</code>
                <button onClick={() => copy(value, label)}
                  className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                  {copied === label ? tc('copied') : tc('copy')}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{t('shadesLabel')}</h2>
          <div className="flex gap-2">
            {shades.map((shade, i) => (
              <div key={i} title={shade} onClick={() => copy(shade, `shade-${i}`)}
                className="flex-1 h-12 rounded cursor-pointer hover:scale-110 transition-transform"
                style={{ background: shade }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
