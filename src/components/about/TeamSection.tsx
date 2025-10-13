import { TranslationKeys } from "@/lib/i18n";
import Image from "next/image";

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
              className="group p-8 rounded-2xl shadow-lg text-center border border-gray-200 hover:shadow-xl transition-all duration-300 ease-out transform hover:-translate-y-1"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-forest to-forest/90 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
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

      {/* Trusted by investors */}
      <div>
        <div className="text-center mb-10">
          <h3 className="text-2xl mb-4 text-forest font-playfair font-bold leading-normal">
            {t["about.trustedBy.title"]}
          </h3>
          <p className="text-base text-mediumGray max-w-2xl mx-auto font-sans leading-relaxed">
            {t["about.trustedBy.subtitle"]}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12">
          <a
            href="https://www.redstone.vc/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Redstone.vc website"
            className="inline-flex items-center opacity-90 hover:opacity-100 transition-opacity"
          >
            <Image
              src="/images/logos/redstone.svg"
              alt="Redstone.vc logo"
              width={120}
              height={32}
              className="h-8 w-auto"
              loading="lazy"
            />
          </a>
          <a
            href="https://expion.fi/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Expion.fi website"
            className="inline-flex items-center opacity-90 hover:opacity-100 transition-opacity"
          >
            <Image
              src="/images/logos/expion.svg"
              alt="Expion.fi logo"
              width={120}
              height={32}
              className="h-8 w-auto"
              loading="lazy"
            />
          </a>
        </div>
      </div>

      {/* Board & Advisors - Following 10-layout rule: korttigrid with pehmeät varjot */}
      <div>
        <div className="text-center mb-12">
          <h3 className="text-2xl mb-8 text-forest font-playfair font-bold leading-normal">
            {t["about.board.title"]}
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto place-items-center">
          {boardMembers.map((member, index) => (
            <article
              key={index}
              className="group bg-white p-6 rounded-2xl shadow-lg text-center border border-gray-200 hover:shadow-xl transition-all duration-300 ease-out transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-turquoise to-turquoise/90 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
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
