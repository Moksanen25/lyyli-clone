import { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from '../../../lib/i18n';

export const metadata: Metadata = {
  title: 'Cache Test Page',
  description: 'Test page to verify static asset caching behavior and performance.',
};

export default async function CacheTestPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-playfair font-bold text-forest mb-6">
            {locale === 'fi' ? 'Välimuistitesti' : 'Cache Test Page'}
          </h1>
          <p className="text-lg text-mediumGray max-w-3xl mx-auto">
            {locale === 'fi' 
              ? 'Tämä sivu testaa staattisten resurssien välimuistia ja suorituskykyä. Tarkista selainkehittäjien työkaluista Cache-Control-otsakkeet ja ETag-arvot.'
              : 'This page tests static asset caching and performance. Check browser dev tools for Cache-Control headers and ETag values.'
            }
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Static Images Section */}
          <section className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-playfair font-bold text-forest mb-6">
              {locale === 'fi' ? 'Staattiset kuvat' : 'Static Images'}
            </h2>
            <div className="space-y-6">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <Image
                  src="/images/logos/Lyyli_ai_favicon.svg"
                  alt="Lyyli Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="relative h-32 rounded-lg overflow-hidden">
                <Image
                  src="/images/logos/Lyyli_ai_no_BG.png"
                  alt="Lyyli Logo No Background"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-sm text-mediumGray">
                <p className="mb-2">
                  <strong>{locale === 'fi' ? 'Odotettu välimuisti:' : 'Expected cache:'}</strong>
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Cache-Control: public, max-age=31536000, immutable</li>
                  <li>ETag: "hash-value"</li>
                  <li>Content-Encoding: br (Brotli) tai gzip</li>
                </ul>
              </div>
            </div>
          </section>

          {/* CSS/JS Assets Section */}
          <section className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-playfair font-bold text-forest mb-6">
              {locale === 'fi' ? 'CSS/JS Resurssit' : 'CSS/JS Assets'}
            </h2>
            <div className="space-y-4">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-forest mb-2">Next.js Static Assets</h3>
                <p className="text-sm text-mediumGray">
                  /_next/static/ - Pitäisi olla välimuistissa 1 vuosi
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-forest mb-2">Fonts</h3>
                <p className="text-sm text-mediumGray">
                  /fonts/ - Pitäisi olla välimuistissa 1 vuosi
                </p>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-semibold text-forest mb-2">Icons</h3>
                <p className="text-sm text-mediumGray">
                  /icons/ - Pitäisi olla välimuistissa 1 vuosi
                </p>
              </div>
            </div>
          </section>

          {/* Cache Headers Test */}
          <section className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-playfair font-bold text-forest mb-6">
              {locale === 'fi' ? 'Välimuisti-otsakkeet' : 'Cache Headers'}
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Staattiset resurssit</h3>
                <code className="text-sm text-blue-800">
                  Cache-Control: public, max-age=31536000, immutable
                </code>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">HTML-sivut</h3>
                <code className="text-sm text-green-800">
                  Cache-Control: public, max-age=3600, must-revalidate
                </code>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">Service Worker</h3>
                <code className="text-sm text-yellow-800">
                  Cache-Control: public, max-age=0, must-revalidate
                </code>
              </div>
            </div>
          </section>

          {/* Performance Metrics */}
          <section className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-playfair font-bold text-forest mb-6">
              {locale === 'fi' ? 'Suorituskykymittarit' : 'Performance Metrics'}
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-mediumGray">LCP (Largest Contentful Paint)</span>
                <span className="font-semibold text-forest">&lt; 2.5s</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-mediumGray">FCP (First Contentful Paint)</span>
                <span className="font-semibold text-forest">&lt; 1.8s</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-mediumGray">CLS (Cumulative Layout Shift)</span>
                <span className="font-semibold text-forest">&lt; 0.1</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-mediumGray">Cache Hit Rate</span>
                <span className="font-semibold text-forest">&gt; 90%</span>
              </div>
            </div>
          </section>
        </div>

        {/* Instructions */}
        <section className="mt-16 bg-forest text-white p-8 rounded-2xl">
          <h2 className="text-2xl font-playfair font-bold mb-6">
            {locale === 'fi' ? 'Testausohjeet' : 'Testing Instructions'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {locale === 'fi' ? '1. Selainkehittäjien työkalut' : '1. Browser Dev Tools'}
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Painike F12 tai oikea klikki → "Inspect"</li>
                <li>Siirry Network-välilehdelle</li>
                <li>Lataa sivu uudelleen (Ctrl+F5)</li>
                <li>Tarkista staattisten resurssien status-koodit</li>
                <li>Katsotaan Response Headers -välilehti</li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {locale === 'fi' ? '2. Lighthouse-testaus' : '2. Lighthouse Testing'}
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Selainkehittäjien työkalut → Lighthouse</li>
                <li>Valitse "Performance" ja "Best practices"</li>
                <li>Klikkaa "Generate report"</li>
                <li>Tarkista "Serve static assets with an efficient cache policy"</li>
                <li>Varmista että suurin osa resursseista on välimuistissa</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Expected Results */}
        <section className="mt-12 bg-blue-50 p-8 rounded-2xl">
          <h2 className="text-2xl font-playfair font-bold text-blue-900 mb-6">
            {locale === 'fi' ? 'Odotetut tulokset' : 'Expected Results'}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Status Codes</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 200 OK (first load)</li>
                <li>• 304 Not Modified (cached)</li>
                <li>• No 404 errors</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Cache Headers</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• max-age=31536000 (1 year)</li>
                <li>• immutable directive</li>
                <li>• ETag present</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Compression</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Content-Encoding: br</li>
                <li>• Vary: Accept-Encoding</li>
                <li>• Reduced file sizes</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
