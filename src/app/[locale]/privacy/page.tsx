import { getTranslations } from '../../../lib/i18n';
import { Metadata } from 'next';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale);
  
  return {
    title: t['privacy.page.title'],
    description: t['privacy.page.description'],
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const supportedLocales = ['en', 'fi'];
  const currentLocale = supportedLocales.includes(locale) ? locale : 'en';
  
  const t = getTranslations(currentLocale);

  return (
    <div className="bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
        <header className="mb-12">
          <h1 className="heading-1 mb-4 text-forest-green">
            {t['privacy.title']}
          </h1>
          <p className="body-text text-medium-gray">
            {t['privacy.updated']}: January 15, 2024
          </p>
        </header>

        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <p className="body-large text-medium-gray">
              {t['privacy.intro']}
            </p>
          </section>

          <section>
            <h2 className="heading-2 text-forest-green mb-4">1. Information We Collect</h2>
            <p className="body-text text-medium-gray mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 body-text text-medium-gray">
              <li>Contact information (name, email address, phone number)</li>
              <li>Company information and role details</li>
              <li>Communication preferences and team size</li>
              <li>Messages and content you choose to share with our AI communication assistant</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-2 text-forest-green mb-4">2. How We Use Your Information</h2>
            <p className="body-text text-medium-gray mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 space-y-2 body-text text-medium-gray">
              <li>Provide and improve our AI communication services</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send you service updates and important notifications</li>
              <li>Analyze usage patterns to enhance our platform security and performance</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-2 text-forest-green mb-4">3. GDPR Compliance</h2>
            <p className="body-text text-medium-gray mb-4">
              As a service provider to professional organizations, we ensure full compliance with the General Data Protection Regulation (GDPR):
            </p>
            <ul className="list-disc pl-6 space-y-2 body-text text-medium-gray">
              <li><strong>Lawful Basis:</strong> We process personal data based on legitimate interests for service provision and contract performance</li>
              <li><strong>Data Minimization:</strong> We collect only the minimum data necessary for our stated purposes</li>
              <li><strong>Right to Access:</strong> You can request access to your personal data at any time</li>
              <li><strong>Right to Rectification:</strong> You can request correction of inaccurate personal data</li>
              <li><strong>Right to Erasure:</strong> You can request deletion of your personal data</li>
              <li><strong>Data Portability:</strong> You can request your data in a structured, machine-readable format</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-2 text-forest-green mb-4">4. Enterprise-Grade Security</h2>
            <p className="body-text text-medium-gray mb-4">
              We implement comprehensive security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 space-y-2 body-text text-medium-gray">
              <li><strong>Encryption:</strong> All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption</li>
              <li><strong>Access Controls:</strong> Role-based access controls ensure only authorized personnel can access your data</li>
              <li><strong>Audit Trails:</strong> Complete logging of all data access and processing activities</li>
              <li><strong>Regular Audits:</strong> Our security practices are regularly reviewed by third-party security firms</li>
              <li><strong>Data Centers:</strong> We use ISO 27001 certified data centers with physical security controls</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-2 text-forest-green mb-4">5. Data Retention</h2>
            <p className="body-text text-medium-gray mb-4">
              We retain personal data only as long as necessary to fulfill the purposes for which it was collected:
            </p>
            <ul className="list-disc pl-6 space-y-2 body-text text-medium-gray">
              <li>Account information: Retained while your account is active and for 30 days after account closure</li>
              <li>Communication data: Retained according to your organization&apos;s data retention policies</li>
              <li>Audit logs: Retained for 7 years to meet compliance requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-2 text-forest-green mb-4">6. Data Transfers</h2>
            <p className="body-text text-medium-gray mb-4">
              When personal data is transferred outside the European Economic Area (EEA), we ensure adequate protection through:
            </p>
            <ul className="list-disc pl-6 space-y-2 body-text text-medium-gray">
              <li>Standard Contractual Clauses approved by the European Commission</li>
              <li>Adequacy decisions for countries with equivalent data protection laws</li>
              <li>Additional safeguards including encryption and access controls</li>
            </ul>
          </section>

          <section>
            <h2 className="heading-2 text-forest-green mb-4">7. Your Rights</h2>
            <p className="body-text text-medium-gray mb-4">
              You have the following rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2 body-text text-medium-gray">
              <li>Request access to your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Request restriction of processing</li>
              <li>Object to processing based on legitimate interests</li>
              <li>Data portability for data you have provided</li>
            </ul>
            <p className="body-text text-medium-gray mt-4">
              To exercise these rights, contact us at privacy@lyyli.ai. We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="heading-2 text-forest-green mb-4">8. Contact Information</h2>
            <p className="body-text text-medium-gray">
              For questions about this privacy policy or our data practices, contact:
            </p>
            <div className="bg-soft-rose p-6 rounded-lg mt-4">
              <p className="body-text text-forest-green">
                <strong>Data Protection Officer</strong><br/>
                Email: privacy@lyyli.ai<br/>
                Address: Lyyli Oy, Finland
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
