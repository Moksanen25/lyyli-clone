

interface ComplianceBadgesProps {
  locale: string;
}

export default function ComplianceBadges({ locale }: ComplianceBadgesProps) {

  const badges = [
    {
      name: 'GDPR',
      description: 'GDPR Compliant',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      name: 'ISO 27001',
      description: 'Information Security',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    {
      name: 'SOC 2',
      description: 'Security Standards',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      name: 'Enterprise',
      description: 'Enterprise Ready',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];

  return (
    <div className="text-center">
      <h3 className="heading-3 mb-8 text-forest-green">
        Enterprise-Grade Security & Compliance
      </h3>
      
      <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
        {badges.map((badge, index) => (
          <div 
            key={index}
            className="flex flex-col items-center space-y-2 p-4 rounded-lg bg-white/50 hover:bg-white transition-colors"
          >
            <div className="p-3 bg-forest-green/10 rounded-full text-forest-green">
              {badge.icon}
            </div>
            <div className="text-center">
              <div className="font-medium text-forest-green text-sm">
                {badge.name}
              </div>
              <div className="text-xs text-medium-gray">
                {badge.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <p className="mt-8 text-sm text-medium-gray max-w-2xl mx-auto">
        {locale === 'en' 
          ? 'All plans include enterprise-grade security features, data encryption, and compliance with major regulatory frameworks.'
          : 'Kaikki paketit sisältävät yritystason turvallisuusominaisuudet, tietojen salauksen ja vaatimustenmukaisuuden tärkeimpien sääntelykehysten kanssa.'
        }
      </p>
    </div>
  );
}
