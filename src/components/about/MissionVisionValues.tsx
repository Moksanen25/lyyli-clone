import { TranslationKeys } from "@/lib/i18n";

interface MissionVisionValuesProps {
  translations: TranslationKeys;
}

export default function MissionVisionValues({
  translations: t,
}: MissionVisionValuesProps) {
  const values = [
    {
      title: t["about.values.transparency.title"],
      description: t["about.values.transparency.description"],
      icon: (
        <svg className="w-8 h-8 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      color: "bg-rose",
      iconColor: "text-forest",
    },
    {
      title: t["about.values.expertise.title"],
      description: t["about.values.expertise.description"],
      icon: (
        <svg className="w-8 h-8 text-turquoise-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: "bg-turquoise",
      iconColor: "text-turquoise-600",
    },
    {
      title: t["about.values.security.title"],
      description: t["about.values.security.description"],
      icon: (
        <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: "bg-amber-100",
      iconColor: "text-amber-600",
    },
    {
      title: t["about.values.inclusion.title"],
      description: t["about.values.inclusion.description"],
      icon: (
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      ),
      color: "bg-green-100",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="space-y-20">
      {/* Mission & Vision - Following 10-layout rule: korttigrid with pehmeät varjot */}
      <div className="grid md:grid-cols-2 gap-12">
        <article className="text-center bg-white p-8 rounded-xl shadow-soft border border-gray-100 hover:shadow-medium transition-all duration-300">
          <h2 className="text-3xl md:text-4xl mb-6 text-forest font-playfair font-bold leading-snug">
            {t["about.mission.title"]}
          </h2>
          <p className="text-lg text-mediumGray leading-relaxed font-sans">
            {t["about.mission.description"]}
          </p>
        </article>

        <article className="text-center bg-white p-8 rounded-xl shadow-soft border border-gray-100 hover:shadow-medium transition-all duration-300">
          <h2 className="text-3xl md:text-4xl mb-6 text-forest font-playfair font-bold leading-snug">
            {t["about.vision.title"]}
          </h2>
          <p className="text-lg text-mediumGray leading-relaxed font-sans">
            {t["about.vision.description"]}
          </p>
        </article>
      </div>

      {/* Values - Following 10-layout rule: korttigrid with pehmeät varjot, md–lg pyöristys */}
      <div>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
            {t["about.values.title"]}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <article key={index} className="text-center bg-white p-6 rounded-xl shadow-soft border border-gray-100 hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1">
              <div className={`w-16 h-16 ${value.color} rounded-full mx-auto mb-6 flex items-center justify-center`}>
                <div className={value.iconColor}>
                  {value.icon}
                </div>
              </div>
              <h3 className="text-xl mb-4 text-forest font-playfair font-bold leading-normal">
                {value.title}
              </h3>
              <p className="text-base text-mediumGray leading-relaxed font-sans">{value.description}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
