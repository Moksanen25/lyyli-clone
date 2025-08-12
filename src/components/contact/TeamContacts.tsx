import { TranslationKeys } from "@/lib/i18n";
import { InteractiveCard } from "@/components/VisualElements";

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
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      gradient: "from-blue-500 to-blue-600",
    },
    {
      name: t["contact.team.mikko.name"],
      role: t["contact.team.mikko.role"],
      email: t["contact.team.mikko.email"],
      phone: t["contact.team.mikko.phone"],
      whatsapp: t["contact.team.mikko.whatsapp"],
      focus: t["contact.team.mikko.focus"],
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      gradient: "from-forest to-forest/80",
    },
    {
      name: t["contact.team.veikko.name"],
      role: t["contact.team.veikko.role"],
      email: t["contact.team.veikko.email"],
      focus: t["contact.team.veikko.focus"],
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      gradient: "from-turquoise to-turquoise/80",
    },
  ];

  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl mb-6 text-white font-playfair font-normal leading-snug">
          {t["contact.team.title"]}
        </h2>
        <p className="text-lg text-white/90 font-sans leading-relaxed max-w-3xl mx-auto">
          {t["contact.team.subtitle"]}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {contacts.map((contact, index) => (
          <InteractiveCard key={index} className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-center mb-6">
              <div className={`w-20 h-20 bg-gradient-to-br ${contact.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft transform transition-transform duration-300 group-hover:scale-110`}>
                {contact.icon}
              </div>
              {contact.name ? (
                <>
                  <h3 className="text-xl mb-2 text-forest font-playfair font-normal leading-normal">
                    {contact.name}
                  </h3>
                  <p className="text-base text-mediumGray font-medium mb-4 font-sans leading-relaxed">
                    {contact.role}
                  </p>
                </>
              ) : (
                <h3 className="text-xl mb-4 text-forest font-playfair font-normal leading-normal">
                  {contact.title}
                </h3>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-grayLight/50 rounded-lg hover:bg-grayLight/70 transition-colors">
                <svg
                  className="w-5 h-5 text-forest flex-shrink-0"
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
                  className="text-base text-forest hover:text-turquoise transition-colors font-sans leading-relaxed font-medium"
                >
                  {contact.email}
                </a>
              </div>

              {contact.phone && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-grayLight/50 rounded-lg hover:bg-grayLight/70 transition-colors">
                    <svg
                      className="w-5 h-5 text-forest flex-shrink-0"
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
                        className="text-base text-forest hover:text-turquoise transition-colors block font-sans leading-relaxed font-medium"
                      >
                        {contact.phone}
                      </a>
                      <p className="text-sm text-mediumGray font-sans leading-relaxed">
                        {contact.whatsapp}
                      </p>
                    </div>
                  </div>
                  
                  {/* Contact Buttons for Mikko */}
                  {contact.name === t["contact.team.mikko.name"] && (
                    <div className="flex gap-2">
                      <a
                        href={`https://wa.me/358409619224`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                        </svg>
                        WhatsApp
                      </a>
                      <a
                        href={`tel:${contact.phone}`}
                        className="flex-1 bg-forest hover:bg-forest/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Call
                      </a>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-4 border-t border-grayLight/50">
                <p className="text-sm text-mediumGray font-sans leading-relaxed bg-forest/5 p-3 rounded-lg">
                  {contact.focus || contact.description}
                </p>
              </div>
            </div>
          </InteractiveCard>
        ))}
      </div>
    </div>
  );
}
