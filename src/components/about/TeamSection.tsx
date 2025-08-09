import { getTranslations } from '../../lib/i18n';

interface TeamSectionProps {
  locale: string;
}

export default function TeamSection({ locale }: TeamSectionProps) {
  const t = getTranslations(locale);

  const leadership = [
    {
      name: t['about.team.mikko.name'],
      title: t['about.team.mikko.title'],
      description: t['about.team.mikko.description']
    },
    {
      name: t['about.team.veikko.name'],
      title: t['about.team.veikko.title'],
      description: t['about.team.veikko.description']
    }
  ];

  const boardMembers = [
    {
      name: t['about.board.sannamari.name'],
      title: t['about.board.sannamari.title']
    },
    {
      name: t['about.board.perttu.name'],
      title: t['about.board.perttu.title']
    },
    {
      name: t['about.board.teemu.name'],
      title: t['about.board.teemu.title']
    }
  ];

  return (
    <div className="space-y-16">
      {/* Leadership Team */}
      <div>
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4 text-forest-green">
            {t['about.team.title']}
          </h2>
          <p className="body-large text-medium-gray max-w-2xl mx-auto">
            {t['about.team.subtitle']}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {leadership.map((member, index) => (
            <article key={index} className="bg-white p-8 rounded-lg shadow-soft text-center">
              <div className="w-24 h-24 bg-forest-green rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {member.name.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
              <h3 className="heading-3 mb-2 text-forest-green">
                {member.name}
              </h3>
              <p className="body-text text-medium-gray mb-4 font-medium">
                {member.title}
              </p>
              <p className="body-text text-medium-gray">
                {member.description}
              </p>
            </article>
          ))}
        </div>
      </div>
      
      {/* Board & Advisors */}
      <div>
        <div className="text-center mb-12">
          <h2 className="heading-3 mb-8 text-forest-green">
            {t['about.board.title']}
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {boardMembers.map((member, index) => (
            <article key={index} className="bg-white p-6 rounded-lg shadow-soft text-center">
              <div className="w-16 h-16 bg-muted-turquoise rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-lg font-bold text-white">
                  {member.name.split(' ').map((n: string) => n[0]).join('')}
                </span>
              </div>
              <h4 className="heading-4 mb-2 text-forest-green">
                {member.name}
              </h4>
              <p className="body-text text-medium-gray">
                {member.title}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
