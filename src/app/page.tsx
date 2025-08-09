export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-soft-rose border-b border-light-gray">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="heading-4">Lyyli Clone</div>
            <nav className="body-text">
              <ul className="flex space-x-8">
                <li><a href="#" className="text-forest-green hover:text-muted-turquoise transition-colors">Features</a></li>
                <li><a href="#" className="text-forest-green hover:text-muted-turquoise transition-colors">About</a></li>
                <li><a href="#" className="text-forest-green hover:text-muted-turquoise transition-colors">Contact</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-16">
        <section className="text-center mb-16">
          <h1 className="heading-1 mb-6">
            Welcome to Lyyli Clone
          </h1>
          <p className="body-large max-w-2xl mx-auto mb-8 text-medium-gray">
            A Next.js 15 TypeScript project with App Router, SSR, and brand-compliant design system. 
            Built with Inter and Playfair Display fonts, following the Lyyli brand guidelines.
          </p>
          <div className="flex gap-4 justify-center flex-col sm:flex-row">
            <button className="bg-forest-green text-white px-8 py-3 rounded-lg hover:bg-opacity-90 transition-all body-text font-medium">
              Get Started
            </button>
            <button className="bg-soft-rose text-forest-green px-8 py-3 rounded-lg hover:bg-opacity-80 transition-all body-text font-medium border border-forest-green/20">
              Learn More
            </button>
          </div>
        </section>

        {/* Typography Showcase */}
        <section className="mb-16">
          <div className="bg-white rounded-lg p-8 shadow-soft border border-light-gray">
            <h2 className="heading-2 mb-8">Typography Hierarchy</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="heading-3 mb-4">Headings</h3>
                <div className="space-y-4">
                  <div>
                    <div className="caption mb-1">H1 - Playfair Display</div>
                    <h1 className="heading-1">Main Page Title</h1>
                  </div>
                  <div>
                    <div className="caption mb-1">H2 - Playfair Display</div>
                    <h2 className="heading-2">Section Heading</h2>
                  </div>
                  <div>
                    <div className="caption mb-1">H3 - Playfair Display</div>
                    <h3 className="heading-3">Subsection Title</h3>
                  </div>
                  <div>
                    <div className="caption mb-1">H4 - Inter Semi-Bold</div>
                    <h4 className="heading-4">Minor Heading</h4>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="heading-3 mb-4">Body Text</h3>
                <div className="space-y-4">
                  <div>
                    <div className="caption mb-1">Body Large - Inter</div>
                    <p className="body-large">This is large body text for important content and introductions.</p>
                  </div>
                  <div>
                    <div className="caption mb-1">Body Text - Inter</div>
                    <p className="body-text">This is regular body text for standard content and paragraphs.</p>
                  </div>
                  <div>
                    <div className="caption mb-1">Caption - Inter</div>
                    <p className="caption">This is caption text for supplementary information.</p>
                  </div>
                  <div>
                    <div className="caption mb-1">Small Text - Inter</div>
                    <p className="small-text">This is small text for footnotes and legal information.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Colors Showcase */}
        <section className="mb-16">
          <div className="bg-white rounded-lg p-8 shadow-soft border border-light-gray">
            <h2 className="heading-2 mb-8">Brand Colors</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-full h-24 bg-forest-green rounded-lg mb-3"></div>
                <div className="heading-4 mb-1">Forest Green</div>
                <div className="caption">#2F5D50</div>
                <div className="small-text">Primary brand color</div>
              </div>
              <div className="text-center">
                <div className="w-full h-24 bg-soft-rose rounded-lg mb-3 border border-light-gray"></div>
                <div className="heading-4 mb-1">Soft Rose</div>
                <div className="caption">#F7EBEB</div>
                <div className="small-text">Gentle warmth</div>
              </div>
              <div className="text-center">
                <div className="w-full h-24 bg-light-gray rounded-lg mb-3 border border-medium-gray/20"></div>
                <div className="heading-4 mb-1">Light Gray</div>
                <div className="caption">#F5F5F4</div>
                <div className="small-text">Minimalism</div>
              </div>
              <div className="text-center">
                <div className="w-full h-24 bg-muted-turquoise rounded-lg mb-3"></div>
                <div className="heading-4 mb-1">Muted Turquoise</div>
                <div className="caption">#A7D6D1</div>
                <div className="small-text">Technology accent</div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section>
          <h2 className="heading-2 text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-soft border border-light-gray hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 bg-muted-turquoise rounded-lg mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-forest-green rounded"></div>
              </div>
              <h3 className="heading-3 mb-3">Next.js 15</h3>
              <p className="body-text">Latest Next.js with App Router and server-side rendering enabled by default.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-soft border border-light-gray hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 bg-muted-turquoise rounded-lg mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-forest-green rounded"></div>
              </div>
              <h3 className="heading-3 mb-3">Brand Typography</h3>
              <p className="body-text">Inter and Playfair Display fonts loaded with display: swap for optimal performance.</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-soft border border-light-gray hover:shadow-medium transition-shadow">
              <div className="w-12 h-12 bg-muted-turquoise rounded-lg mb-4 flex items-center justify-center">
                <div className="w-6 h-6 bg-forest-green rounded"></div>
              </div>
              <h3 className="heading-3 mb-3">Tailwind CSS v4</h3>
              <p className="body-text">Modern CSS framework with brand colors and design tokens configured.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-forest-green text-white mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <div className="body-text mb-4">Built with Next.js 15, TypeScript, and Tailwind CSS</div>
            <div className="caption">Following Lyyli brand guidelines with SSR enabled</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
