import { TranslationKeys } from "@/lib/i18n";
import { InteractiveCard } from "@/components/VisualElements";

interface SecurityNoticeProps {
  locale: string;
  translations: TranslationKeys;
}

export default function SecurityNotice({
  locale,
  translations: t,
}: SecurityNoticeProps) {
  const securityFeatures = [
    {
      title: t["contact.security.encryption"],
      description: "End-to-end encryption ensures your messages are secure from sender to recipient",
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      gradient: "from-forest/10 to-forest/20",
      color: "text-forest",
    },
    {
      title: t["contact.security.privacy"],
      description: "Full GDPR compliance with transparent data handling practices",
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      gradient: "from-forest/10 to-forest/20",
      color: "text-forest",
    },
    {
      title: t["contact.security.confidential"],
      description: "Your business discussions remain confidential and protected at all times",
      icon: (
        <svg className="w-8 h-8 text-turquoise" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      gradient: "from-turquoise/10 to-turquoise/20",
      color: "text-turquoise",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-forest/5 to-forest/10 p-8 rounded-2xl border border-forest/20">
      <div className="text-center mb-12">
        <div className="w-20 h-20 bg-gradient-to-br from-forest/10 to-forest/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-soft">
          <svg className="w-10 h-10 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl mb-4 text-forest font-playfair font-bold leading-snug">
          {t["contact.security.title"]}
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-sans leading-relaxed">
          Your security and privacy are our top priorities
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {securityFeatures.map((feature, index) => (
          <InteractiveCard key={index} className="text-center p-6 bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300">
            <div className={`w-16 h-16 ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-soft transform transition-transform duration-300 group-hover:scale-110`}>
              <div className={feature.color}>
                {feature.icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-forest mb-3 font-playfair">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground font-sans leading-relaxed">
              {feature.description}
            </p>
          </InteractiveCard>
        ))}
      </div>
    </div>
  );
}
