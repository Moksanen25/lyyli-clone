import { TranslationKeys } from "@/lib/i18n";

interface TeamSectionProps {
  translations: TranslationKeys;
}

export default function TeamSection({ translations: t }: TeamSectionProps) {
  const leadership = [
    {
      name: t["about.team.mikko.name"],
      title: t["about.team.mikko.title"],
      description: t["about.team.mikko.description"],
      initials: "MO",
    },
    {
      name: t["about.team.veikko.name"],
      title: t["about.team.veikko.title"],
      description: t["about.team.veikko.description"],
      initials: "VL",
    },
  ];

  const boardMembers = [
    {
      name: t["about.board.sannamari.name"],
      title: t["about.board.sannamari.title"],
      initials: "SN",
    },
    {
      name: t["about.board.perttu.name"],
      title: t["about.board.perttu.title"],
      initials: "PA",
    },
    {
      name: t["about.board.teemu.name"],
      title: t["about.board.teemu.title"],
      initials: "TL",
    },
  ];

  return (
    <div className="space-y-20">
      {/* Leadership Team - Following 10-layout rule: korttigrid with pehmeät varjot */}
      <div>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
            {t["about.team.title"]}
          </h2>
          <p className="text-lg text-mediumGray max-w-2xl mx-auto font-sans leading-relaxed">
            {t["about.team.subtitle"]}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {leadership.map((member, index) => (
            <article
              key={index}
              className="bg-white p-8 rounded-xl shadow-soft text-center border border-gray-100 hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-24 h-24 bg-forest rounded-full mx-auto mb-6 flex items-center justify-center shadow-soft">
                <span className="text-2xl font-bold text-white font-playfair">
                  {member.initials}
                </span>
              </div>
              <h3 className="text-2xl mb-2 text-forest font-playfair font-bold leading-normal">
                {member.name}
              </h3>
              <p className="text-base text-mediumGray mb-4 font-medium font-sans">
                {member.title}
              </p>
              <p className="text-base text-mediumGray leading-relaxed font-sans">{member.description}</p>
            </article>
          ))}
        </div>
      </div>

      {/* Board & Advisors - Following 10-layout rule: korttigrid with pehmeät varjot */}
      <div>
        <div className="text-center mb-12">
          <h3 className="text-2xl mb-8 text-forest font-playfair font-bold leading-normal">
            {t["about.board.title"]}
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {boardMembers.map((member, index) => (
            <article
              key={index}
              className="bg-white p-6 rounded-xl shadow-soft text-center border border-gray-100 hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-turquoise rounded-full mx-auto mb-4 flex items-center justify-center shadow-soft">
                <span className="text-lg font-bold text-white font-playfair">
                  {member.initials}
                </span>
              </div>
              <h4 className="text-xl mb-2 text-forest font-playfair font-bold leading-normal">
                {member.name}
              </h4>
              <p className="text-base text-mediumGray font-sans">{member.title}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
