import { getTranslations } from "@/lib/i18n";
import { Metadata } from "next";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return {
    title: t["privacy.page.title"],
    description: t["privacy.page.description"],
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const supportedLocales = ["en", "fi"];
  const currentLocale = supportedLocales.includes(locale) ? locale : "en";

  const t = await getTranslations(currentLocale);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative z-10 pt-32">
        <section 
          className="container mx-auto px-4 py-20 relative overflow-hidden"
          aria-label="Hero"
        >
          {/* Animated Hero Visual */}
          
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl mb-4 text-forest font-playfair font-bold leading-tight">
              {t["privacy.title"]}
            </h1>
            <p className="text-base text-mediumGray font-sans leading-relaxed">
              {t["privacy.updated"]}: January 15, 2024
            </p>
          </div>
        </section>
      </div>

      {/* Privacy Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <p className="text-lg text-mediumGray font-sans leading-relaxed">{t["privacy.intro"]}</p>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              1. Information we collect
            </h2>
            <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
              <li>Contact information (name, email address, phone number)</li>
              <li>Company information and role details</li>
              <li>Communication preferences and team size</li>
              <li>
                Messages and content you choose to share with our AI
                communication assistant
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              2. How we use your information
            </h2>
            <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
              <li>Provide and improve our AI communication services</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send you service updates and important notifications</li>
              <li>
                Analyze usage patterns to enhance our platform security and
                performance
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              3. GDPR compliance
            </h2>
            <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
              As a service provider to professional organizations, we ensure
              full compliance with the General Data Protection Regulation
              (GDPR):
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
              <li>
                <strong>Lawful basis:</strong> We process personal data based on
                legitimate interests for service provision and contract
                performance
              </li>
              <li>
                <strong>Data minimization:</strong> We collect only the minimum
                data necessary for our stated purposes
              </li>
              <li>
                <strong>Right to access:</strong> You can request access to your
                personal data at any time
              </li>
              <li>
                <strong>Right to erasure:</strong> You can request deletion of
                your personal data, subject to legal obligations
              </li>
              <li>
                <strong>Data portability:</strong> You can request a copy of
                your data in a machine-readable format
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              4. Data security
            </h2>
            <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
              We implement industry-standard security measures to protect your
              personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
              <li>End-to-end encryption for all data in transit</li>
              <li>Strong encryption for data at rest</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and authentication requirements</li>
              <li>Incident response and breach notification procedures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              5. Data retention
            </h2>
            <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
              We retain your personal data only for as long as necessary to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
              <li>Provide our services to you</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes and enforce agreements</li>
              <li>Improve our services and user experience</li>
            </ul>
            <p className="text-base text-mediumGray mt-4 font-sans leading-relaxed">
              When we no longer need your data, we securely delete or
              anonymize it.
            </p>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              6. Your rights
            </h2>
            <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
              Under GDPR, you have the following rights regarding your personal
              data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
              <li>Right to access and information</li>
              <li>Right to rectification</li>
              <li>Right to erasure ("right to be forgotten")</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to object to processing</li>
              <li>Rights related to automated decision making</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              7. Contact us
            </h2>
            <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <div className="bg-grayLight p-6 rounded-lg">
              <p className="text-base text-mediumGray font-sans leading-relaxed">
                <strong>Email:</strong> privacy@lyyli.ai
              </p>
              <p className="text-base text-mediumGray font-sans leading-relaxed">
                <strong>Address:</strong> Lyyli.ai, Helsinki, Finland
              </p>
              <p className="text-base text-mediumGray font-sans leading-relaxed">
                <strong>Data Protection Officer:</strong> dpo@lyyli.ai
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              8. Changes to this policy
            </h2>
            <p className="text-base text-mediumGray font-sans leading-relaxed">
              We may update this Privacy Policy from time to time. We will
              notify you of any material changes by posting the new policy on
              this page and updating the "Last Updated" date. We encourage you
              to review this policy periodically.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
