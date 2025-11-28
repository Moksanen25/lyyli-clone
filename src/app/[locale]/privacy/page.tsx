import { getTranslations } from '@/lib/i18n';
import type { Metadata } from 'next';
import {
  generatePageCanonicalUrl,
  generateHreflangMetadata,
} from '@/lib/canonical';
import { buildTitleFromTranslation } from '@/lib/title';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations(locale);

  return {
    title: buildTitleFromTranslation(t['privacy.page.title'], 'Privacy Policy'),
    description: t['privacy.page.description'],
    openGraph: {
      title: t['privacy.page.title'],
      description: t['privacy.page.description'],
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(t['privacy.page.title'])}`,
          width: 1200,
          height: 630,
          alt: t['privacy.page.title'],
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t['privacy.page.title'],
      description: t['privacy.page.description'],
    },
    alternates: {
      canonical: generatePageCanonicalUrl('privacy', locale),
      languages: generateHreflangMetadata('/privacy', ['en', 'fi']),
    },
  };
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const supportedLocales = ['en', 'fi'];
  const currentLocale = supportedLocales.includes(locale) ? locale : 'en';

  const t = await getTranslations(currentLocale);

  const isFi = currentLocale === 'fi';

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative z-10 pt-32">
        <section
          className="container mx-auto px-4 py-20 relative overflow-hidden"
          aria-label="Hero"
        >
          {/* Animated Hero Visual */}

          <div className="text-center max-w-4xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl mb-4 text-forest font-playfair font-bold leading-tight">
              {t['privacy.title']}
            </h1>
            <p className="text-base text-mediumGray font-sans leading-relaxed">
              {t['privacy.updated']}:{' '}
              {isFi ? '28.11.2025' : 'November 28, 2025'}
            </p>
          </div>
        </section>
      </div>

      {/* Privacy Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
        <div className="prose prose-lg max-w-none space-y-8">
          <section>
            <p className="text-lg text-mediumGray font-sans leading-relaxed">
              {t['privacy.intro']}
            </p>
          </section>

          {isFi ? (
            /* FINNISH CONTENT */
            <>
              <section>
                <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
                  1. Tietojen kerääminen
                </h2>
                <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
                  Keräämme tietoja, joita annat meille suoraan, mukaan lukien:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
                  <li>Yhteystiedot (nimi, sähköpostiosoite, puhelinnumero)</li>
                  <li>Yritystiedot ja roolitiedot</li>
                  <li>Viestintäasetukset ja tiimin koko</li>
                  <li>
                    Viestit ja sisältö, jonka päätät jakaa tekoälyavusteisen
                    viestintäassistenttimme kanssa
                  </li>
                </ul>
                <h3 className="text-2xl text-forest mt-6 mb-3 font-playfair font-bold leading-snug">
                  Kolmansien osapuolten integraatiot
                </h3>
                <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
                  Jos yhdistät Lyyli.ai:n kolmannen osapuolen palveluun (kuten
                  LinkedIn, Microsoft Teams, Slack tai sähköpostipalvelut),
                  saamme kyseisestä palvelusta tietoja sinun antamallasi
                  luvalla. Näitä tietoja voivat olla profiilitiedot (kuten nimi
                  ja kuva), verkostotiedot tai viestisisällöt. Käytämme näitä
                  tietoja vain palvelun tarjoamiseksi, kuten viestiluonnosten
                  luomiseen tai julkaisuun asiakkaan ohjeiden mukaisesti.
                </p>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
                  2. Miten käytämme tietojasi
                </h2>
                <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
                  Käytämme keräämiämme tietoja seuraaviin tarkoituksiin:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
                  <li>
                    Tarjotaksemme ja parantaaksemme
                    tekoälyviestintäpalveluitamme
                  </li>
                  <li>
                    Vastataksemme kyselyihisi ja tarjotaksemme asiakastukea
                  </li>
                  <li>
                    Lähettääksemme palvelupäivityksiä ja tärkeitä ilmoituksia
                  </li>
                  <li>
                    Analysoidaksemme käyttötapoja alustamme turvallisuuden ja
                    suorituskyvyn parantamiseksi
                  </li>
                  <li>
                    Mahdollistaaksemme integraatiot kolmansien osapuolten
                    palveluihin (vain käyttäjän pyynnöstä ja suostumuksella)
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
                  3. GDPR-vaatimustenmukaisuus ja käsittelyperusteet
                </h2>
                <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
                  Asiantuntijaorganisaatioiden palveluntarjoajana varmistamme
                  täyden vaatimustenmukaisuuden yleisen tietosuoja-asetuksen
                  (GDPR) kanssa:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
                  <li>
                    <strong>Käsittelyperusteet:</strong> Käsittelemme
                    henkilötietoja ensisijaisesti sopimuksen
                    täytäntöönpanemiseksi ja oikeutetun edun perusteella.
                    Tietyissä tapauksissa, kuten kolmansien osapuolten
                    integraatioiden jatkuvassa tietojen haussa, pyydämme
                    käyttäjältä erillisen suostumuksen.
                  </li>
                  <li>
                    <strong>Tietojen minimointi:</strong> Keräämme vain
                    välttämättömät tiedot ilmoitettuihin tarkoituksiin.
                  </li>
                  <li>
                    <strong>Suostumuksen peruuttaminen:</strong> Voit peruuttaa
                    antamasi suostumuksen (esim. integraatioiden osalta) milloin
                    tahansa asetuksista tai ottamalla yhteyttä meihin.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
                  4. Tietojen jakaminen ja kolmannet osapuolet
                </h2>
                <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
                  Emme myy tai jaa tietojasi kolmansille osapuolille
                  markkinointitarkoituksiin. Tietoja jaetaan vain seuraavissa
                  tilanteissa:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
                  <li>
                    <strong>Palveluntarjoajat:</strong> Käytämme luotettavia
                    alihankkijoita (katso erillinen alihankkijaluettelo)
                    palvelun tekniseen toteuttamiseen.
                  </li>
                  <li>
                    <strong>Integraatiot:</strong> Kun käyttäjä julkaisee
                    sisältöä kolmannen osapuolen alustalle (esim. LinkedIn)
                    Lyyli.ai:n kautta, kyseinen sisältö välittyy kyseiselle
                    alustalle käyttäjän toimeksiannosta, ja sen jatkokäyttöön
                    sovelletaan kyseisen alustan ehtoja.
                  </li>
                </ul>
                <p className="text-base text-mediumGray mt-4 font-sans leading-relaxed">
                  Huomioithan, että Lyyli.ai ei ole sidoksissa Metaan,
                  LinkedIniin tai muihin sosiaalisen median alustoihin, eivätkä
                  nämä alustat sponsoroi tai vastaa sovelluksestamme.
                </p>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
                  5. Tietoturva
                </h2>
                <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
                  Toteutamme alan standardien mukaisia turvatoimia suojataksemme
                  henkilötietojasi:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
                  <li>Päästä päähän -salaus kaikelle siirrettävälle datalle</li>
                  <li>Vahva salaus levossa olevalle datalle</li>
                  <li>Säännölliset turvallisuusauditoinnit ja testaaminen</li>
                  <li>Pääsynhallinta ja tunnistautumisvaatimukset</li>
                  <li>Häiriönhallinta- ja tietomurtoilmoitusmenettelyt</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
                  6. Tietojen säilytys
                </h2>
                <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
                  Säilytämme henkilötietojasi vain niin kauan kuin on tarpeen:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
                  <li>Palveluiden tarjoamiseksi sinulle</li>
                  <li>Lakisääteisten velvoitteiden noudattamiseksi</li>
                  <li>
                    Riitojen ratkaisemiseksi ja sopimusten täytäntöönpanemiseksi
                  </li>
                </ul>
                <p className="text-base text-mediumGray mt-4 font-sans leading-relaxed">
                  Kun emme enää tarvitse tietojasi (tai kun poistat
                  integraation/tilin), poistamme tai anonymisoimme tiedot
                  turvallisesti.
                </p>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
                  7. Sinun oikeutesi
                </h2>
                <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
                  GDPR:n mukaisesti sinulla on seuraavat oikeudet
                  henkilötietoihisi liittyen:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
                  <li>Oikeus saada pääsy tietoihin</li>
                  <li>Oikeus tietojen oikaisemiseen</li>
                  <li>
                    Oikeus tietojen poistamiseen ("oikeus tulla unohdetuksi")
                  </li>
                  <li>Oikeus käsittelyn rajoittamiseen ja vastustamiseen</li>
                  <li>Oikeus siirtää tiedot järjestelmästä toiseen</li>
                </ul>
                <p className="text-base text-mediumGray mt-4 font-sans leading-relaxed">
                  Voit käyttää oikeuksiasi, kuten pyytää tietojen poistoa,
                  ottamalla yhteyttä sähköpostitse osoitteeseen{' '}
                  <strong>privacy@lyyli.ai</strong> tai käyttämällä sovelluksen
                  sisäisiä työkaluja (mikäli saatavilla).
                </p>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
                  8. Ota yhteyttä
                </h2>
                <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
                  Jos sinulla on kysyttävää tästä tietosuojakäytännöstä tai
                  tietojenkäsittelytavoistamme, ota meihin yhteyttä:
                </p>
                <div className="bg-grayLight p-6 rounded-lg">
                  <p className="text-base text-mediumGray font-sans leading-relaxed">
                    <strong>Sähköposti:</strong> privacy@lyyli.ai
                  </p>
                  <p className="text-base text-mediumGray font-sans leading-relaxed">
                    <strong>Osoite:</strong> Lyyli.ai, Helsinki, Suomi
                  </p>
                  <p className="text-base text-mediumGray font-sans leading-relaxed">
                    <strong>Tietosuojavastaava:</strong> dpo@lyyli.ai
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
                  9. Muutokset tähän käytäntöön
                </h2>
                <p className="text-base text-mediumGray font-sans leading-relaxed">
                  Voimme päivittää tätä tietosuojakäytäntöä aika ajoin.
                  Ilmoitamme olennaisista muutoksista julkaisemalla uuden
                  käytännön tällä sivulla ja päivittämällä
                  "Päivitetty"-päivämäärän. Kehotamme sinua tarkistamaan tämän
                  käytännön säännöllisesti.
                </p>
              </section>
            </>
          ) : (
            /* ENGLISH CONTENT */
            <>
              <section>
                <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
                  1. Information we collect
                </h2>
                <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
                  We collect information that you provide directly to us,
                  including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
                  <li>
                    Contact information (name, email address, phone number)
                  </li>
                  <li>Company information and role details</li>
                  <li>Communication preferences and team size</li>
                  <li>
                    Messages and content you choose to share with our AI
                    communication assistant
                  </li>
                </ul>
                <h3 className="text-2xl text-forest mt-6 mb-3 font-playfair font-bold leading-snug">
                  Third-party integrations
                </h3>
                <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
                  If you connect Lyyli.ai to a third-party service (such as
                  LinkedIn, Microsoft Teams, Slack, or email providers), we
                  receive information from that service with your permission.
                  This data may include profile information (such as name and
                  image), network information, or message content. We use this
                  data only to provide the service, such as creating message
                  drafts or publishing content according to your instructions.
                </p>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
                  2. How we use your information
                </h2>
                <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
                  <li>Provide and improve our AI communication services</li>
                  <li>
                    Respond to your inquiries and provide customer support
                  </li>
                  <li>Send you service updates and important notifications</li>
                  <li>
                    Analyze usage patterns to enhance our platform security and
                    performance
                  </li>
                  <li>
                    Enable integrations with third-party services (only at your
                    request and with your consent)
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
                  3. GDPR compliance and legal basis
                </h2>
                <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
                  As a service provider to professional organizations, we ensure
                  full compliance with the General Data Protection Regulation
                  (GDPR):
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
                  <li>
                    <strong>Lawful basis:</strong> We process personal data
                    based on legitimate interests for service provision and
                    contract performance. In certain cases, such as continuous
                    data retrieval from third-party integrations, we will ask
                    for your explicit consent.
                  </li>
                  <li>
                    <strong>Data minimization:</strong> We collect only the
                    minimum data necessary for our stated purposes
                  </li>
                  <li>
                    <strong>Right to withdraw consent:</strong> You can withdraw
                    your consent (e.g. for integrations) at any time via
                    settings or by contacting us.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
                  4. Data sharing and third parties
                </h2>
                <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
                  We do not sell or share your data with third parties for
                  marketing purposes. Data is shared only in the following
                  situations:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
                  <li>
                    <strong>Service Providers:</strong> We use trusted
                    sub-processors (see separate sub-processor list) for
                    technical service delivery.
                  </li>
                  <li>
                    <strong>Integrations:</strong> When a user publishes content
                    to a third-party platform (e.g. LinkedIn) via Lyyli.ai, that
                    content is transmitted to that platform at the user's
                    direction, and its further use is subject to that platform's
                    terms.
                  </li>
                </ul>
                <p className="text-base text-mediumGray mt-4 font-sans leading-relaxed">
                  Please note that Lyyli.ai is not affiliated with Meta,
                  LinkedIn, or other social media platforms, and these platforms
                  do not sponsor or are not responsible for our application.
                </p>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
                  5. Data security
                </h2>
                <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
                  We implement industry-standard security measures to protect
                  your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
                  <li>End-to-end encryption for all data in transit</li>
                  <li>Strong encryption for data at rest</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Access controls and authentication requirements</li>
                  <li>Incident response and breach notification procedures</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
                  6. Data retention
                </h2>
                <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
                  We retain your personal data only for as long as necessary to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
                  <li>Provide our services to you</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes and enforce agreements</li>
                </ul>
                <p className="text-base text-mediumGray mt-4 font-sans leading-relaxed">
                  When we no longer need your data (or when you remove an
                  integration/account), we securely delete or anonymize it.
                </p>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
                  7. Your rights
                </h2>
                <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
                  Under GDPR, you have the following rights regarding your
                  personal data:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base text-mediumGray font-sans leading-relaxed">
                  <li>Right to access and information</li>
                  <li>Right to rectification</li>
                  <li>Right to erasure ("right to be forgotten")</li>
                  <li>Right to restrict processing</li>
                  <li>Right to data portability</li>
                  <li>Right to object to processing</li>
                </ul>
                <p className="text-base text-mediumGray mt-4 font-sans leading-relaxed">
                  You can exercise your rights, such as requesting data
                  deletion, by contacting us via email at{' '}
                  <strong>privacy@lyyli.ai</strong> or by using in-app tools
                  (where available).
                </p>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
                  8. Contact us
                </h2>
                <p className="text-base text-mediumGray mb-4 font-sans leading-relaxed">
                  If you have any questions about this Privacy Policy or our
                  data practices, please contact us:
                </p>
                <div className="bg-grayLight p-6 rounded-lg">
                  <p className="text-base text-mediumGray font-sans leading-relaxed">
                    <strong>Email:</strong> privacy@lyyli.ai
                  </p>
                  <p className="text-base text-mediumGray font-sans leading-relaxed">
                    <strong>Address:</strong> Lyyli.ai, Helsinki, Finland
                  </p>
                  <p className="text-base text-mediumGray font-sans leading-relaxed">
                    <strong>Data Protection Officer:</strong> dpo@lyyli.ai
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl md:text-4xl text-forest mb-4 font-playfair font-bold leading-snug">
                  9. Changes to this policy
                </h2>
                <p className="text-base text-mediumGray font-sans leading-relaxed">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any material changes by posting the new policy
                  on this page and updating the "Last Updated" date. We
                  encourage you to review this policy periodically.
                </p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
