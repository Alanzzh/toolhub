"use client";

import { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";

import Link from 'next/link';

export default function QrCodePage() {
  const [text, setText] = useState("https://toolhub.example.com");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !text) return;
    QRCode.toCanvas(canvasRef.current, text, {
      width: size,
      color: { dark: fgColor, light: bgColor },
      errorCorrectionLevel: errorLevel,
    }).catch(() => {});
  }, [text, size, fgColor, bgColor, errorLevel]);

  const download = (type: "png" | "svg") => {
    if (type === "png") {
      const link = document.createElement("a");
      link.download = "qrcode.png";
      link.href = canvasRef.current?.toDataURL("image/png") ?? "";
      link.click();
    } else {
      QRCode.toString(text, { type: "svg", errorCorrectionLevel: errorLevel }, (err, svg) => {
        if (err || !svg) return;
        const blob = new Blob([svg], { type: "image/svg+xml" });
        const link = document.createElement("a");
        link.download = "qrcode.svg";
        link.href = URL.createObjectURL(blob);
        link.click();
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Link href="/" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Home</Link>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">QR Code Generator</h1>
        <p className="text-gray-600 mb-8">Generate customizable QR codes</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-5 bg-white rounded-lg shadow p-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text or URL</label>
              <textarea value={text} onChange={(e) => setText(e.target.value)}
                className="w-full h-28 p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size: {size}px</label>
              <input type="range" min={128} max={512} step={32} value={size} onChange={(e) => setSize(+e.target.value)} className="w-full" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Foreground</label>
                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Background</label>
                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 rounded cursor-pointer" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Error Correction</label>
              <select value={errorLevel} onChange={(e) => setErrorLevel(e.target.value as "L" | "M" | "Q" | "H")}
                className="w-full p-2 border border-gray-300 rounded-lg text-sm">
                <option value="L">Low (7%)</option>
                <option value="M">Medium (15%)</option>
                <option value="Q">Quartile (25%)</option>
                <option value="H">High (30%)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow p-6">
            <canvas ref={canvasRef} className="rounded-lg mb-6 max-w-full" />
            <div className="flex gap-3">
              <button onClick={() => download("png")} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Download PNG
              </button>
              <button onClick={() => download("svg")} className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                Download SVG
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
