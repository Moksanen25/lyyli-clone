import { getTranslations } from "@/lib/i18n";
import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import TeamContacts from "@/components/contact/TeamContacts";
import SecurityNotice from "@/components/contact/SecurityNotice";
import SubPageVisual from "@/components/SubPageVisual";
import { EnhancedGeometricPattern, FloatingElements, InteractiveCard } from "@/components/VisualElements";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);

  const baseUrl = "https://lyyli.ai";
  const canonicalUrl = `${baseUrl}/${locale}/contact`;

  return {
    title: t["contact.page.title"],
    description: t["contact.page.description"],
    openGraph: {
      title: t["contact.page.title"],
      description: t["contact.page.description"],
      url: canonicalUrl,
      siteName: "Lyyli.ai",
      locale: locale === "fi" ? "fi_FI" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t["contact.page.title"],
      description: t["contact.page.description"],
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${baseUrl}/en/contact`,
        fi: `${baseUrl}/fi/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const supportedLocales = ["en", "fi"];
  const currentLocale = supportedLocales.includes(locale) ? locale : "en";

  const t = await getTranslations(currentLocale);

  return (
    <div className="bg-white relative overflow-hidden">
      {/* Background Visual Elements */}
      <FloatingElements />
      
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
        {/* Animated Sub-Page Visual */}
        <SubPageVisual />
        
        {/* Hero Background Pattern */}
        <EnhancedGeometricPattern className="opacity-20" />
        
        <div className="text-center max-w-4xl mx-auto relative z-10">
          <h1 className="text-3xl md:text-4xl mb-6 font-playfair font-bold leading-tight text-forest">
            {t["contact.hero.title"]}
          </h1>
          <p className="text-lg mb-12 text-muted-foreground max-w-3xl mx-auto font-sans leading-relaxed">
            {t["contact.hero.subtitle"]}
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-gradient-to-br from-grayLight to-white py-16 lg:py-24 relative z-10">
        <div className="max-w-4xl mx-auto px-6">
          <ContactForm locale={currentLocale} translations={t} />
        </div>
      </section>

      {/* Security Notice */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <SecurityNotice locale={currentLocale} translations={t} />
      </section>

      {/* Team Contacts */}
      <section className="bg-gradient-to-br from-forest to-forest/80 py-16 lg:py-24 relative z-10 overflow-hidden">
        {/* Background Pattern */}
        <EnhancedGeometricPattern className="opacity-10" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <TeamContacts locale={currentLocale} translations={t} />
        </div>
      </section>

      {/* Response Expectations */}
      <section className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-6 text-forest font-playfair font-bold leading-snug">
            {t["contact.response.title"]}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-sans leading-relaxed">
            What you can expect when you reach out to us
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <InteractiveCard className="text-center p-8 bg-white hover:shadow-medium transition-all duration-300">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-forest/10 to-forest/20 rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-12 transition-transform duration-300 group-hover:rotate-0">
                <svg className="w-10 h-10 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-forest/40 rounded-full animate-ping opacity-75"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-forest/30 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-xl mb-3 text-forest font-playfair font-bold leading-normal">
              24h response
            </h3>
            <p className="text-base text-muted-foreground font-sans leading-relaxed">
              {t["contact.response.timing"]}
            </p>
          </InteractiveCard>

          <InteractiveCard className="text-center p-8 bg-white hover:shadow-medium transition-all duration-300">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-turquoise/10 to-turquoise/20 rounded-2xl flex items-center justify-center mx-auto mb-4 transform -rotate-12 transition-transform duration-300 group-hover:rotate-0">
                <svg className="w-10 h-10 text-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-turquoise/40 rounded-full animate-ping opacity-75"></div>
              <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-turquoise/30 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-xl mb-3 text-forest font-playfair font-bold leading-normal">
              Discovery call
            </h3>
            <p className="text-base text-muted-foreground font-sans leading-relaxed">
              {t["contact.response.discovery"]}
            </p>
          </InteractiveCard>

          <InteractiveCard className="text-center p-8 bg-white hover:shadow-medium transition-all duration-300">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-forest/10 to-forest/20 rounded-2xl flex items-center justify-center mx-auto mb-4 transform rotate-6 transition-transform duration-300 group-hover:rotate-0">
                <svg className="w-10 h-10 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-forest/40 rounded-full animate-ping opacity-75"></div>
              <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-forest/30 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-xl mb-3 text-forest font-playfair font-bold leading-normal">
              Custom proposal
            </h3>
            <p className="text-base text-muted-foreground font-sans leading-relaxed">
              {t["contact.response.followup"]}
            </p>
          </InteractiveCard>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-gradient-to-br from-forest to-forest/90 text-white py-16 lg:py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <EnhancedGeometricPattern className="opacity-10" />
        
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl mb-8 text-white font-playfair font-bold leading-snug">
            Trusted by professional service organizations
          </h2>
          <p className="text-lg mb-12 text-white/90 max-w-3xl mx-auto font-sans leading-relaxed">
            Join leading companies that have transformed their communication with Lyyli
          </p>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-playfair font-bold text-white mb-2">GDPR Compliant</h3>
              <p className="text-white/80 text-sm">Full data protection compliance</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg font-playfair font-bold text-white mb-2">Enterprise Security</h3>
              <p className="text-white/80 text-sm">Bank-level encryption</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-playfair font-bold text-white mb-2">24/7 Support</h3>
              <p className="text-white/80 text-sm">Always here when you need us</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-playfair font-bold text-white mb-2">Analytics & Insights</h3>
              <p className="text-white/80 text-sm">Data-driven improvements</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
