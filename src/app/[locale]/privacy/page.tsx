import { getTranslations } from "@/lib/i18n";
import { Metadata } from "next";

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
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
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl mb-4 text-forest font-playfair font-bold leading-tight">
            {t["privacy.title"]}
          </h1>
          <p className="text-base text-mediumGray font-sans leading-relaxed">
            {t["privacy.updated"]}: January 15, 2024
          </p>
        </header>

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
                <strong>Right to rectification:</strong> You can request
                correction of inaccurate personal data
              </li>
              <li>
                <strong>Right to erasure:</strong> You can request deletion of
                your personal data
              </li>
              <li>
                <strong>Data portability:</strong> You can request your data in
                a structured, machine-readable format
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              4. Enterprise-grade security
            </h2>
            <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
              We implement comprehensive security measures to protect your
              information:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
              <li>
                <strong>Encryption:</strong> All data is encrypted in transit
                using TLS 1.3 and at rest using AES-256 encryption
              </li>
              <li>
                <strong>Access controls:</strong> Role-based access controls
                ensure only authorized personnel can access your data
              </li>
              <li>
                <strong>Audit trails:</strong> Complete logging of all data
                access and processing activities
              </li>
              <li>
                <strong>Regular audits:</strong> Our security practices are
                regularly reviewed by third-party security firms
              </li>
              <li>
                <strong>Data centers:</strong> We use ISO 27001 certified data
                centers with physical security controls
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              5. Data retention
            </h2>
            <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
              We retain personal data only as long as necessary to fulfill the
              purposes for which it was collected:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
              <li>
                Account information: Retained while your account is active and
                for 30 days after account closure
              </li>
              <li>
                Communication data: Retained according to your
                organization&apos;s data retention policies
              </li>
              <li>
                Audit logs: Retained for 7 years to meet compliance requirements
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              6. Data transfers
            </h2>
            <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
              When personal data is transferred outside the European Economic
              Area (EEA), we ensure adequate protection through:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
              <li>
                Standard contractual clauses approved by the European Commission
              </li>
              <li>
                Adequacy decisions for countries with equivalent data protection
                laws
              </li>
              <li>
                Additional safeguards including encryption and access controls
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">7. Your rights</h2>
            <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
              You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
              <li>Request access to your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Request restriction of processing</li>
              <li>Object to processing based on legitimate interests</li>
              <li>Data portability for data you have provided</li>
            </ul>
            <p className="text-base text-mediumGray mt-4 font-sans leading-relaxed">
              To exercise these rights, contact us at privacy@lyyli.ai. We will
              respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
              8. Contact information
            </h2>
            <p className="text-base text-mediumGray font-sans leading-relaxed">
              For questions about this privacy policy or our data practices,
              contact:
            </p>
            <div className="bg-rose p-6 rounded-lg mt-4">
              <p className="text-base text-forest font-sans leading-relaxed">
                <strong>Data protection officer</strong>
                <br />
                Email: privacy@lyyli.ai
                <br />
                Address: Lyyli Oy, Finland
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
