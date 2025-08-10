import { TranslationKeys } from '@/lib/i18n';

interface MissionVisionValuesProps {
  translations: TranslationKeys;
}

export default function MissionVisionValues({ translations: t }: MissionVisionValuesProps) {
  const values = [
    {
      title: t['about.values.transparency.title'],
      description: t['about.values.transparency.description'],
      icon: '🔒'
    },
    {
      title: t['about.values.expertise.title'],
      description: t['about.values.expertise.description'],
      icon: '🎯'
    },
    {
      title: t['about.values.security.title'],
      description: t['about.values.security.description'],
      icon: '🛡️'
    },
    {
      title: t['about.values.inclusion.title'],
      description: t['about.values.inclusion.description'],
      icon: '🌐'
    }
  ];

  return (
    <div className="space-y-16">
      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12">
        <article className="text-center">
          <h2 className="heading-2 mb-6 text-forest-green">
            {t['about.mission.title']}
          </h2>
          <p className="body-large text-medium-gray">
            {t['about.mission.description']}
          </p>
        </article>
        
        <article className="text-center">
          <h2 className="heading-2 mb-6 text-forest-green">
            {t['about.vision.title']}
          </h2>
          <p className="body-large text-medium-gray">
            {t['about.vision.description']}
          </p>
        </article>
      </div>
      
      {/* Values */}
      <div>
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4 text-forest-green">
            {t['about.values.title']}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <article key={index} className="text-center">
              <div className="text-4xl mb-4" aria-hidden="true">
                {value.icon}
              </div>
              <h3 className="heading-4 mb-4 text-forest-green">
                {value.title}
              </h3>
              <p className="body-text text-medium-gray">
                {value.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
