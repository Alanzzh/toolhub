import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function HomePage() {
  const t = useTranslations('home');

  const tools = [
    { key: 'jsonFormatter', href: '/tools/json-formatter', icon: '{ }' },
    { key: 'base64', href: '/tools/base64', icon: '64' },
    { key: 'password', href: '/tools/password-generator', icon: '🔑' },
    { key: 'qrCode', href: '/tools/qr-code', icon: '▦' },
    { key: 'hash', href: '/tools/hash', icon: '#' },
    { key: 'uuid', href: '/tools/uuid', icon: '⊞' },
    { key: 'imageCompressor', href: '/tools/image-compressor', icon: '🖼' },
    { key: 'colorPicker', href: '/tools/color-picker', icon: '🎨' },
    { key: 'regexTester', href: '/tools/regex-tester', icon: '.*' },
    { key: 'wordCounter', href: '/tools/word-counter', icon: 'W' },
    { key: 'textCase', href: '/tools/text-case', icon: 'Aa' },
    { key: 'timestamp', href: '/tools/timestamp', icon: '⏱' },
    { key: 'urlEncoder', href: '/tools/url-encoder', icon: '🔗' },
    { key: 'markdownPreview', href: '/tools/markdown-preview', icon: 'M↓' },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-xl text-gray-600">
            {t('subtitle')}
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
                {t(`tools.${tool.key}.name`)}
              </h2>
              <p className="text-gray-600">{t(`tools.${tool.key}.description`)}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
