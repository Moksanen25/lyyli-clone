import { TranslationKeys } from "@/lib/i18n";

interface OriginStoryProps {
  translations: TranslationKeys;
}

export default function OriginStory({ translations: t }: OriginStoryProps) {
  const problems = [
    {
      title: t["about.origin.problem1.title"],
      description: t["about.origin.problem1.description"],
      icon: (
        <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.88V14m0 0v4m0-4h6m-6 0H9m3-9a3 3 0 100 6 3 3 0 000-6z" />
        </svg>
      ),
      color: "bg-rose",
      iconColor: "text-rose-600",
    },
    {
      title: t["about.origin.problem2.title"],
      description: t["about.origin.problem2.description"],
      icon: (
        <svg className="w-8 h-8 text-turquoise-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      color: "bg-turquoise",
      iconColor: "text-turquoise-600",
    },
    {
      title: t["about.origin.problem3.title"],
      description: t["about.origin.problem3.description"],
      icon: (
        <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
        </svg>
      ),
      color: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
          {t["about.origin.title"]}
        </h2>
        <p className="text-lg text-mediumGray max-w-2xl mx-auto font-sans leading-relaxed">
          {t["about.origin.subtitle"]}
        </p>
      </div>

      {/* Problems Grid - Following 10-layout rule: korttigrid with pehmeät varjot, md–lg pyöristys */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {problems.map((problem, index) => (
          <article
            key={index}
            className="bg-white p-8 rounded-xl shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1 text-center border border-gray-100"
          >
            <div className={`w-16 h-16 ${problem.color} rounded-full mx-auto mb-6 flex items-center justify-center`}>
              <div className={problem.iconColor}>
                {problem.icon}
              </div>
            </div>
            <h3 className="text-xl mb-4 text-forest font-playfair font-bold leading-normal">
              {problem.title}
            </h3>
            <p className="text-base text-mediumGray font-sans leading-relaxed">{problem.description}</p>
          </article>
        ))}
      </div>

      {/* Solution Highlight - Following 05-brand rule: forest for headers & CTA */}
      <div className="bg-forest text-white p-8 rounded-xl text-center shadow-soft">
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-white leading-relaxed font-sans">{t["about.origin.solution"]}</p>
        </div>
      </div>
    </div>
  );
}
