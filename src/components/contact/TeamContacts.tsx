import { TranslationKeys } from "@/lib/i18n";

interface TeamContactsProps {
  locale: string;
  translations: TranslationKeys;
}

export default function TeamContacts({
  locale,
  translations: t,
}: TeamContactsProps) {
  const contacts = [
    {
      title: t["contact.team.general.title"],
      email: t["contact.team.general.email"],
      description: t["contact.team.general.description"],
      icon: (
        <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: t["contact.team.mikko.name"],
      role: t["contact.team.mikko.role"],
      email: t["contact.team.mikko.email"],
      phone: t["contact.team.mikko.phone"],
      whatsapp: t["contact.team.mikko.whatsapp"],
      focus: t["contact.team.mikko.focus"],
      icon: (
        <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
    {
      name: t["contact.team.veikko.name"],
      role: t["contact.team.veikko.role"],
      email: t["contact.team.veikko.email"],
      focus: t["contact.team.veikko.focus"],
      icon: (
        <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <div>
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl mb-4 text-forest font-playfair font-bold leading-snug">
          {t["contact.team.title"]}
        </h2>
        <p className="text-lg text-mediumGray font-sans leading-relaxed">
          {t["contact.team.subtitle"]}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {contacts.map((contact, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-soft">
            <div className="text-center mb-4">
              <div className="text-4xl mb-3" aria-hidden="true">
                {contact.icon}
              </div>
              {contact.name ? (
                <>
                  <h3 className="text-xl mb-1 text-forest font-playfair font-bold leading-normal">
                    {contact.name}
                  </h3>
                  <p className="text-base text-mediumGray font-medium mb-3 font-sans leading-relaxed">
                    {contact.role}
                  </p>
                </>
              ) : (
                <h3 className="text-xl mb-3 text-forest font-playfair font-bold leading-normal">
                  {contact.title}
                </h3>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <svg
                  className="w-4 h-4 text-forest flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-base text-forest hover:text-turquoise transition-colors font-sans leading-relaxed"
                >
                  {contact.email}
                </a>
              </div>

              {contact.phone && (
                <div className="flex items-center gap-3">
                  <svg
                    className="w-4 h-4 text-forest flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <div>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-base text-forest hover:text-turquoise transition-colors block font-sans leading-relaxed"
                    >
                      {contact.phone}
                    </a>
                    <p className="text-sm text-mediumGray font-sans leading-relaxed">
                      {contact.whatsapp}
                    </p>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-grayLight">
                <p className="text-sm text-mediumGray font-sans leading-relaxed">
                  {contact.focus || contact.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
