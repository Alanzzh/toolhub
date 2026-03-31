import Link from 'next/link';

export default function HomePage() {
  const tools = [
    { name: 'JSON Formatter', description: 'Format and validate JSON data', href: '/tools/json-formatter', icon: '{ }' },
    { name: 'Base64 Encoder/Decoder', description: 'Encode and decode Base64 strings', href: '/tools/base64', icon: '64' },
    { name: 'Password Generator', description: 'Generate secure random passwords', href: '/tools/password-generator', icon: '🔑' },
    { name: 'QR Code Generator', description: 'Create QR codes from text', href: '/tools/qr-code', icon: '▦' },
    { name: 'Hash Generator', description: 'Generate MD5, SHA-1, SHA-256 hashes', href: '/tools/hash', icon: '#' },
    { name: 'UUID Generator', description: 'Generate unique identifiers', href: '/tools/uuid', icon: '⊞' },
    { name: 'Image Compressor', description: 'Compress images to reduce file size', href: '/tools/image-compressor', icon: '🖼' },
    { name: 'Color Picker', description: 'Pick colors and get hex/rgb values', href: '/tools/color-picker', icon: '🎨' },
    { name: 'Regex Tester', description: 'Test regular expressions', href: '/tools/regex-tester', icon: '.*' },
    { name: 'Word Counter', description: 'Count words and characters', href: '/tools/word-counter', icon: 'W' },
    { name: 'Text Case Converter', description: 'Convert text case', href: '/tools/text-case', icon: 'Aa' },
    { name: 'Timestamp Converter', description: 'Convert timestamps', href: '/tools/timestamp', icon: '⏱' },
    { name: 'URL Encoder/Decoder', description: 'Encode and decode URLs', href: '/tools/url-encoder', icon: '🔗' },
    { name: 'Markdown Preview', description: 'Preview markdown in real-time', href: '/tools/markdown-preview', icon: 'M↓' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            ToolHub
          </h1>
          <p className="text-xl text-gray-600">
            Free online tools for developers and everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="text-2xl font-bold text-blue-600 mb-3 font-mono">{tool.icon}</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {tool.name}
              </h2>
              <p className="text-gray-600">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
