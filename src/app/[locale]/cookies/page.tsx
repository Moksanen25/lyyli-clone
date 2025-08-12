import { getTranslations } from "@/lib/i18n";
import { Metadata } from "next";

interface CookiesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: CookiesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return {
    title: t["cookies.page.title"],
    description: t["cookies.page.description"],
  };
}

export default async function CookiesPage({ params }: CookiesPageProps) {
  const { locale } = await params;
  const supportedLocales = ["en", "fi"];
  const currentLocale = supportedLocales.includes(locale) ? locale : "en";

  const t = await getTranslations(currentLocale);

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-tight">
            {t["cookies.title"]}
          </h1>
          <p className="text-base text-muted-foreground font-sans leading-relaxed">
            {t["cookies.updated"]}: January 15, 2024
          </p>
        </header>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed">
              {t["cookies.intro"]}
            </p>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              1. What are cookies
            </h2>
            <p className="text-base text-muted-foreground mb-4 font-sans leading-relaxed">
              Cookies are small text files stored on your device when you visit
              our website. They help us provide a better user experience and
              maintain security standards required by professional service
              organizations.
            </p>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              2. Types of cookies we use
            </h2>

            <div className="space-y-6">
              <div className="bg-rose p-6 rounded-lg">
                <h3 className="text-xl text-forest mb-3 font-playfair font-bold leading-normal">
                  Essential cookies
                </h3>
                <p className="text-mediumGray font-sans leading-relaxed">
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-base text-muted-foreground font-sans leading-relaxed">
                  <li>Authentication and session management</li>
                  <li>Security and fraud prevention</li>
                  <li>Load balancing and performance optimization</li>
                  <li>Language and locale preferences</li>
                </ul>
              </div>

              <div className="bg-grayLight p-6 rounded-lg">
                <h3 className="text-xl text-forest mb-3 font-playfair font-bold leading-normal">
                  Functional cookies
                </h3>
                <p className="text-base text-muted-foreground mb-3 font-sans leading-relaxed">
                  These cookies enable enhanced functionality and
                  personalization:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-base text-muted-foreground font-sans leading-relaxed">
                  <li>User interface preferences</li>
                  <li>Form data retention for user convenience</li>
                  <li>Accessibility settings</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-grayLight p-6 rounded-lg">
                <h3 className="text-xl text-forest mb-3 font-playfair font-bold leading-normal">
                  Analytics cookies
                </h3>
                <p className="text-mediumGray font-sans leading-relaxed">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
                <ul className="list-disc pl-6 space-y-1 text-base text-muted-foreground font-sans leading-relaxed">
                  <li>Usage statistics and performance metrics</li>
                  <li>Error tracking and system monitoring</li>
                  <li>Security incident detection</li>
                </ul>
                <p className="text-base text-mediumGray mt-3 font-medium font-sans leading-relaxed">
                  Note: All analytics data is anonymized and aggregated to
                  protect privacy.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              3. Enterprise security standards
            </h2>
            <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
              Our cookie implementation follows enterprise-grade security
              practices:
            </p>
            <ul className="list-disc pl-6 space-y-2 body-text text-medium-gray">
              <li>
                <strong>Secure Transmission:</strong> All cookies are
                transmitted over HTTPS with Secure flag
              </li>
              <li>
                <strong>HttpOnly Protection:</strong> Authentication cookies are
                protected from client-side access
              </li>
              <li>
                <strong>SameSite Policy:</strong> Strict SameSite policy
                prevents cross-site request forgery
              </li>
              <li>
                <strong>Encryption:</strong> Sensitive cookie data is encrypted
                using industry-standard algorithms
              </li>
              <li>
                <strong>Expiration Management:</strong> Automatic expiration and
                cleanup of unused cookies
              </li>
            </ul>
          </section>

          <section>
            <h2 className="heading-2 text-forest-green mb-4">
              4. GDPR Compliance
            </h2>
            <p className="body-text text-medium-gray mb-4">
              Our cookie practices comply with GDPR requirements:
            </p>
            <ul className="list-disc pl-6 space-y-2 body-text text-medium-gray">
              <li>
                <strong>Lawful Basis:</strong> Essential cookies are processed
                based on legitimate interests; optional cookies require consent
              </li>
              <li>
                <strong>Transparency:</strong> Clear information about cookie
                types and purposes
              </li>
              <li>
                <strong>Control:</strong> Granular control over non-essential
                cookies
              </li>
              <li>
                <strong>Data Minimization:</strong> We only collect necessary
                cookie data
              </li>
              <li>
                <strong>Retention Limits:</strong> Cookies are automatically
                deleted when no longer needed
              </li>
            </ul>
          </section>

          <section>
            <h2 className="heading-2 text-forest-green mb-4">
              5. Managing Your Cookie Preferences
            </h2>
            <p className="body-text text-medium-gray mb-4">
              You can control cookies through several methods:
            </p>

            <div className="space-y-4">
              <div className="bg-rose p-4 rounded-lg">
                <h4 className="font-medium text-forest-green mb-2">
                  Browser Settings
                </h4>
                <p className="body-text text-medium-gray">
                  Most browsers allow you to control cookies through their
                  settings. However, disabling essential cookies may affect
                  website functionality.
                </p>
              </div>

              <div className="bg-light-gray p-4 rounded-lg">
                <h4 className="font-medium text-forest-green mb-2">
                  Cookie Consent Manager
                </h4>
                <p className="body-text text-medium-gray">
                  Our cookie consent manager allows you to accept or reject
                  non-essential cookies when you first visit our site.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="heading-2 text-forest-green mb-4">
              6. Third-Party Cookies
            </h2>
            <p className="body-text text-medium-gray mb-4">
              We carefully vet all third-party services to ensure they meet our
              security standards:
            </p>
            <ul className="list-disc pl-6 space-y-2 body-text text-medium-gray">
              <li>All third-party services must be GDPR compliant</li>
              <li>Data processing agreements are in place with all vendors</li>
              <li>Regular security assessments of third-party integrations</li>
              <li>Minimal data sharing with external services</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-2 text-forest-green mb-4">
              7. Updates to This Policy
            </h2>
            <p className="body-text text-medium-gray mb-4">
              We may update this Cookie Policy to reflect changes in our
              practices or legal requirements. We will notify users of
              significant changes through:
            </p>
            <ul className="list-disc pl-6 space-y-2 body-text text-medium-gray">
              <li>Email notifications to registered users</li>
              <li>Website banners for important changes</li>
              <li>
                Updated &ldquo;Last modified&rdquo; date at the top of this
                policy
              </li>
            </ul>
          </section>

          <section>
            <h2 className="heading-2 text-forest-green mb-4">8. Contact Us</h2>
            <p className="body-text text-medium-gray mb-4">
              For questions about our use of cookies or this policy, contact:
            </p>
            <div className="bg-rose p-6 rounded-lg">
              <p className="body-text text-forest-green">
                <strong>Privacy Team</strong>
                <br />
                Email: privacy@lyyli.ai
                <br />
                Subject: Cookie Policy Inquiry
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
