import { getTranslations } from '../../lib/i18n';

interface OriginStoryProps {
  locale: string;
}

export default function OriginStory({ locale }: OriginStoryProps) {
  const t = getTranslations(locale);

  const problems = [
    {
      title: t['about.origin.problem1.title'],
      description: t['about.origin.problem1.description'],
      icon: '📢'
    },
    {
      title: t['about.origin.problem2.title'],
      description: t['about.origin.problem2.description'],
      icon: '🔍'
    },
    {
      title: t['about.origin.problem3.title'],
      description: t['about.origin.problem3.description'],
      icon: '🌍'
    }
  ];

  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="heading-2 mb-4 text-forest-green">
          {t['about.origin.title']}
        </h2>
        <p className="body-large text-medium-gray max-w-2xl mx-auto">
          {t['about.origin.subtitle']}
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {problems.map((problem, index) => (
          <article key={index} className="bg-white p-8 rounded-lg shadow-soft text-center">
            <div className="text-4xl mb-4" aria-hidden="true">
              {problem.icon}
            </div>
            <h3 className="heading-4 mb-4 text-forest-green">
              {problem.title}
            </h3>
            <p className="body-text text-medium-gray">
              {problem.description}
            </p>
          </article>
        ))}
      </div>
      
      <div className="bg-forest-green text-white p-8 rounded-lg text-center">
        <p className="body-large text-white">
          {t['about.origin.solution']}
        </p>
      </div>
    </div>
  );
}
