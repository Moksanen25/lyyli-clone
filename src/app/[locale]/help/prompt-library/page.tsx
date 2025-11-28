import type { Metadata } from 'next';
import Link from 'next/link';
import PromptCategory from '@/components/PromptCategory';
import CalendarPopup from '@/components/CalendarPopup';

export const metadata: Metadata = {
  title: 'Prompt-kirjasto - Lyyli.ai',
  description:
    'Opi käyttämään Lyyli.ai:ta tehokkaasti valmiiden prompt-esimerkkien avulla. Kopioi, muokkaa ja testaa.',
};

export default async function PromptLibraryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<React.JSX.Element> {
  const { locale } = await params;

  // Quick prompts for everyday use
  const quickPrompts = [
    {
      title: locale === 'fi' ? 'Kiitosviesti' : 'Thank you message',
      prompt:
        locale === 'fi'
          ? 'Kiitos eilen käydystä palaverista. Lyhyt ja ystävällinen.'
          : "Thanks for yesterday's meeting. Short and friendly.",
    },
    {
      title: locale === 'fi' ? 'Muistutus kollegalle' : 'Reminder to colleague',
      prompt:
        locale === 'fi'
          ? 'Muistuta Pekkaa huomisesta deadlinesta. Rento mutta selkeä, Slackiin.'
          : "Remind Pekka about tomorrow's deadline. Casual but clear, for Slack.",
    },
    {
      title:
        locale === 'fi' ? 'Tapaamisajan ehdotus' : 'Meeting time suggestion',
      prompt:
        locale === 'fi'
          ? 'Ehdota asiakkaalle kahta aikaa ensi viikolle demokokoukseen. Sähköpostiin, ammattimaisesti.'
          : "Suggest two times to client for next week's demo meeting. For email, professionally.",
    },
    {
      title: locale === 'fi' ? 'Poissaoloviesti' : 'Out of office message',
      prompt:
        locale === 'fi'
          ? 'Poissaoloviesti sähköpostiin: lomalla 15.–22.6., kiireellisissä asioissa yhteyttä Saaraan.'
          : 'Out of office message for email: on vacation June 15-22, urgent matters contact Sara.',
    },
    {
      title:
        locale === 'fi'
          ? 'Onnitteluviesti LinkedIniin'
          : 'Congratulations message for LinkedIn',
      prompt:
        locale === 'fi'
          ? 'Onnittele Lauraa ylennöksestä LinkedInissä. Aito ja lämmin, ei liian pitkä.'
          : 'Congratulate Laura on promotion on LinkedIn. Genuine and warm, not too long.',
    },
    {
      title:
        locale === 'fi'
          ? 'Nopea päivitys asiakkaalle'
          : 'Quick update to client',
      prompt:
        locale === 'fi'
          ? 'Kerro asiakkaalle, että projekti etenee aikataulussa. Positiivinen ja luottamusta rakentava, 3-4 lausetta.'
          : 'Tell client that project is on schedule. Positive and trust-building, 3-4 sentences.',
    },
    {
      title:
        locale === 'fi' ? 'Kokouskutsun teksti' : 'Meeting invitation text',
      prompt:
        locale === 'fi'
          ? 'Kutsu tiimi viikkopalaveeriin perjantaiksi klo 10. Agendana viikon tilanne ja ensi viikon prioriteetit. Kalenterikutsuun.'
          : "Invite team to weekly meeting Friday at 10. Agenda: week's status and next week's priorities. For calendar invite.",
    },
  ];

  // Email prompts
  const emailPrompts = [
    {
      title:
        locale === 'fi'
          ? 'Myyntiviesti potentiaaliselle asiakkaalle'
          : 'Sales message to potential client',
      prompt:
        locale === 'fi'
          ? `Kirjoita myyntiviesti potentiaaliselle B2B-asiakkaalle, joka on kiinnostunut viestinnän tehostamisesta.

Kohde: Viestintäjohtaja keskisuuressa teknologiayrityksessä
Tavoite: Saada vastaanottaja varaamaan demo
Kanava: Sähköposti
Pituus: 150–200 sanaa
Sävy: Asiantunteva mutta lähestyttävä, ei liian myyvä

Sisällytä:
- Lyhyt tunnistus asiakkaan haasteesta (viestinnän tehottomuus)
- Konkreettinen hyöty (aikasäästö + aitous)
- Selkeä CTA (varaa demo)`
          : `Write a sales message to a potential B2B client interested in improving communication efficiency.

Target: Communications director at mid-sized tech company
Goal: Get recipient to book a demo
Channel: Email
Length: 150–200 words
Tone: Expert but approachable, not too sales-y

Include:
- Brief acknowledgment of client's challenge (communication inefficiency)
- Concrete benefit (time savings + authenticity)
- Clear CTA (book demo)`,
    },
    {
      title:
        locale === 'fi'
          ? 'Kiitosviesti tapahtuman jälkeen'
          : 'Thank you message after event',
      prompt:
        locale === 'fi'
          ? `Kirjoita kiitosviesti asiakkaalle, joka osallistui tuote-esittelyyni.

Kohde: Osallistuja, joka oli aktiivisesti mukana demossa
Tavoite: Vahvistaa positiivista kokemusta ja tarjota seuraava askel
Kanava: Sähköposti
Pituus: 100–150 sanaa
Sävy: Lämmin ja kiitollinen, mutta ammattimainen

Sisällytä:
- Kiitos osallistumisesta
- Lyhyt yhteenveto siitä, mitä käsiteltiin
- Tarjous jatkokeskusteluun tai kokeiluun`
          : `Write a thank you message to a client who attended your product demo.

Target: Participant who was actively engaged in demo
Goal: Reinforce positive experience and offer next step
Channel: Email
Length: 100–150 words
Tone: Warm and grateful, but professional

Include:
- Thanks for participating
- Brief summary of what was covered
- Offer for follow-up conversation or trial`,
    },
  ];

  // LinkedIn prompts
  const linkedInPrompts = [
    {
      title:
        locale === 'fi' ? 'Ajatusjohtajuus-postaus' : 'Thought leadership post',
      prompt:
        locale === 'fi'
          ? `Kirjoita LinkedIn-julkaisu aiheesta "Miksi tekoäly ei korvaa viestintäammattilaista, vaan vahvistaa häntä".

Kohde: Viestinnän ammattilaiset, markkinoijat ja johtajat
Tavoite: Herättää keskustelua ja vahvistaa asiantuntijabrändiä
Kanava: LinkedIn
Pituus: 800–1000 merkkiä
Sävy: Ajatuksia herättävä, rohkea mutta rakentava

Rakenne:
- Aloita provosoivalla väitteellä tai kysymyksellä
- Jaa 2–3 konkreettista näkökulmaa
- Päätä avoimeen kysymykseen, joka kannustaa kommentointiin

Käytä kappalejakoa ja emojeja kohtuudella.`
          : `Write a LinkedIn post about "Why AI doesn't replace communications professionals, but empowers them".

Target: Communications professionals, marketers, and leaders
Goal: Spark discussion and strengthen expert brand
Channel: LinkedIn
Length: 800–1000 characters
Tone: Thought-provoking, bold but constructive

Structure:
- Start with provocative statement or question
- Share 2–3 concrete perspectives
- End with open question that encourages commenting

Use paragraph breaks and emojis in moderation.`,
    },
    {
      title: locale === 'fi' ? 'Asiakastarina' : 'Customer story',
      prompt:
        locale === 'fi'
          ? `Kirjoita LinkedIn-julkaisu asiakastarinan pohjalta.

Kohde: Potentiaaliset asiakkaat, jotka pohtivat tekoälyn käyttöä viestinnässä
Tavoite: Osoittaa konkreettinen hyöty todellisella esimerkillä
Kanava: LinkedIn
Pituus: 600–800 merkkiä
Sävy: Inspiroiva ja uskottava, ei liian mainosmainen

Sisältö:
- Asiakkaan lähtötilanne (haaste)
- Ratkaisu (Lyyli.ai:n käyttö)
- Konkreettinen tulos (esim. aikasäästö, parempi sitoutuminen)
- Loppukehotus: "Jos tämä kuulostaa tutulta, jutellaan lisää."

Käytä lainausmerkkejä asiakkaan kommentista, jos mahdollista.`
          : `Write a LinkedIn post based on a customer story.

Target: Potential clients considering AI use in communications
Goal: Show concrete benefit with real example
Channel: LinkedIn
Length: 600–800 characters
Tone: Inspiring and credible, not too advertisement-like

Content:
- Client's starting situation (challenge)
- Solution (using Lyyli.ai)
- Concrete result (e.g., time savings, better engagement)
- Closing call: "If this sounds familiar, let's talk more."

Use quotation marks from client's comment if possible.`,
    },
  ];

  // Social media prompts
  const socialMediaPrompts = [
    {
      title:
        locale === 'fi' ? 'Instagram-postauksen teksti' : 'Instagram post text',
      prompt:
        locale === 'fi'
          ? `Kirjoita Instagram-postauksen teksti tuotepäivityksestä.

Kohde: Nuoremmat asiantuntijat ja startup-väki
Tavoite: Herättää kiinnostus ja ohjata profiiliin/linkkiin
Kanava: Instagram
Pituus: 100–150 sanaa
Sävy: Rento, energinen ja visuaalinen

Rakenne:
- Aloita hookkaamalla kysymyksellä tai väitteellä
- Kerro uudistuksesta napakasti
- Päätä CTA:han (esim. "Kokeile itse – linkki biossa")

Käytä 3–5 relevanttia hashtagia lopussa.`
          : `Write Instagram post text about a product update.

Target: Younger professionals and startup crowd
Goal: Generate interest and direct to profile/link
Channel: Instagram
Length: 100–150 words
Tone: Casual, energetic, and visual

Structure:
- Start with hooking question or statement
- Tell about update concisely
- End with CTA (e.g., "Try it yourself – link in bio")

Use 3–5 relevant hashtags at the end.`,
    },
    {
      title: locale === 'fi' ? 'X (Twitter) -ketju' : 'X (Twitter) thread',
      prompt:
        locale === 'fi'
          ? `Kirjoita 5-osainen twiittiketju aiheesta "5 tapaa tehostaa viestintää ilman että menetät aitoutesi".

Kohde: Kiireiset asiantuntijat ja yrittäjät
Tavoite: Jakaa arvokasta sisältöä ja osoittaa asiantuntemus
Kanava: X (Twitter)
Pituus: Kukin twiitti max 280 merkkiä
Sävy: Napakka, konkreettinen ja helposti jaettava

Rakenne:
1. Aloitustwiitti: Herättävä väite + lupaus ketjusta
2.–5. Kukin vinkki omana twiittinään, selkeästi numeroituna
6. Päätöstwiitti: Yhteenveto + CTA

Käytä emojeja visuaalisina erottimina.`
          : `Write a 5-part tweet thread about "5 ways to improve communication without losing authenticity".

Target: Busy professionals and entrepreneurs
Goal: Share valuable content and demonstrate expertise
Channel: X (Twitter)
Length: Each tweet max 280 characters
Tone: Concise, concrete, and easily shareable

Structure:
1. Opening tweet: Attention-grabbing statement + thread promise
2.–5. Each tip in its own tweet, clearly numbered
6. Closing tweet: Summary + CTA

Use emojis as visual separators.`,
    },
  ];

  // Internal communication prompts
  const internalPrompts = [
    {
      title:
        locale === 'fi' ? 'Tiimipäivitys Slackiin' : 'Team update for Slack',
      prompt:
        locale === 'fi'
          ? `Kirjoita viikkopäivitys tiimille Slackiin.

Kohde: Oma tiimi (kehittäjät, myynti, tuki)
Tavoite: Pitää kaikki ajan tasalla ja motivoida
Kanava: Slack (#general)
Pituus: 150–200 sanaa
Sävy: Kannustava, avoin ja energinen

Sisällytä:
- Viikon keskeiset saavutukset
- Tulevat prioriteetit
- Kiitos tiimille hyvästä työstä
- Mahdollinen huumoripitoinen huomio tai emoji

Käytä bulleteja selkeyden vuoksi.`
          : `Write a weekly update for team in Slack.

Target: Own team (developers, sales, support)
Goal: Keep everyone updated and motivated
Channel: Slack (#general)
Length: 150–200 words
Tone: Encouraging, open, and energetic

Include:
- Week's key achievements
- Upcoming priorities
- Thanks to team for good work
- Possible humorous note or emoji

Use bullets for clarity.`,
    },
    {
      title:
        locale === 'fi'
          ? 'Muutosviestintä sisäisesti'
          : 'Change communication internally',
      prompt:
        locale === 'fi'
          ? `Kirjoita sisäinen sähköposti tiimille prosessimuutoksesta.

Kohde: Koko tiimi
Tavoite: Selittää muutos, vähentää epävarmuutta ja saada tiimi mukaan
Kanava: Sisäinen sähköposti
Pituus: 250–300 sanaa
Sävy: Selkeä, empaattinen ja ratkaisukeskeinen

Rakenne:
- Mikä muuttuu ja miksi
- Miten muutos vaikuttaa käytännössä
- Mitä tiimiltä odotetaan
- Keneen voi ottaa yhteyttä kysymysten kanssa

Vältä byrokratiaa – puhu ihmiselle.`
          : `Write an internal email to team about a process change.

Target: Entire team
Goal: Explain change, reduce uncertainty, and get team on board
Channel: Internal email
Length: 250–300 words
Tone: Clear, empathetic, and solution-focused

Structure:
- What's changing and why
- How change affects in practice
- What's expected from team
- Who to contact with questions

Avoid bureaucracy – speak to the person.`,
    },
  ];

  // Image prompts - updated with new Nano Banana Pro capabilities
  const imageIntro =
    locale === 'fi'
      ? 'Kun luot kuvia tekoälyllä, voit viitata suoraan visuaalisiin asetuksiin, kunhan ne on määritetty asetuksissa. Asetuksissa voit määrittää brändivärit sekä fontit, ladata kuvituksen käyttöön visuaalisia elementtejä, kuten ikoneita tai logoja sekä luontivaiheessa valita referenssikuvia, jotka on valmiiksi ladattu Stock-kuviin.'
      : 'When creating images with AI, you can reference your visual settings directly, as long as they’re configured in Settings. In Settings you can define brand colors and fonts, upload visual elements for illustrations such as icons or logos, and during generation choose reference images that have been pre‑uploaded to Stock images.';

  const imagePrompts = [
    {
      title:
        locale === 'fi'
          ? 'LinkedIn-postauksen kuvitus'
          : 'LinkedIn post illustration',
      prompt:
        locale === 'fi'
          ? `Käyttötilanne: Tarvitset visuaalisen elementin LinkedIn-julkaisuun

Luo LinkedIn-postauksen kuvitus aiheesta [AIHE].
Tyyli: Moderni, ammattimainen editorial-kuvitus
Värit: Käytä metsänvihreää päävärinä, muted turquoisea ja soft rosea tehosteina, valkoinen tausta
Tunnelma: [Inspiroiva/Opettavainen/Ajatuksia herättävä]
Visuaalinen konsepti:
- Pääelementti: [Kuvaa keskeisin visuaalinen elementti]
- Tukielementit: [Listaa 2-3 tukevaa elementtiä]
- Komposition fokus: [Vasen/Keski/Oikea]
Lyyli-hahmo: [Kyllä/Ei, jos kyllä: Lyyli [toiminta/asento], katso referenssikuva]
Tekniset vaatimukset:
- Koko: 1200x675 pikseliä (16:9)
- Flat design subtililla varjoilla
- Korkea kontrasti mobiililukemiseen
- Riittävästi tyhjää tilaa tekstin lisäämiselle [yläosassa/alaosassa]
Vältä: [Liian geneerisiä elementtejä/Liian monimutkaista/etc.]`
          : `Use case: You need a visual element for a LinkedIn post

Create a LinkedIn post illustration on the topic [TOPIC].
Style: Modern, professional editorial illustration
Colors: Use forest green as the primary, muted turquoise and soft rose as accents, white background
Mood: [Inspiring/Educational/Thought-provoking]
Visual concept:
- Main element: [Describe the central visual element]
- Supporting elements: [List 2–3 supporting elements]
- Composition focus: [Left/Center/Right]
Lyyli character: [Yes/No; if yes: Lyyli [action/pose], see reference image]
Technical requirements:
- Size: 1200x675 pixels (16:9)
- Flat design with subtle shadows
- High contrast for mobile readability
- Enough whitespace for text [top/bottom]
Avoid: [Overly generic elements/Too complex/etc.]`,
    },
    {
      title:
        locale === 'fi'
          ? 'Blogiartikkelin hero-kuva'
          : 'Blog article hero image',
      prompt:
        locale === 'fi'
          ? `Käyttötilanne: Tarvitset visuaalisesti vaikuttavan otsikkokuvan blogiartikkeliin

Luo hero-kuva blogiartikkeliin aiheesta "[ARTIKKELIN OTSIKKO]".
Tyyli: Premium editorial-kuvitus, SaaS-estetiikka
Väripaletti: Metsänvihreä pääväri, muted turquoise ja soft rose tehosteet, vaalean harmaa (#F5F5F5) taustaelementteihin
Tunnelma: [Asiantunteva/Luotettava/Innovatiivinen]
Visuaalinen konsepti:
- Keskiössä: [Päävisuaalinen metafora aiheesta]
- Vasemmalla: [Tukeva elementti 1]
- Oikealla: [Tukeva elementti 2]
- Tausta: [Kuvaus taustasta ja sen elementeistä]
Lyyli-hahmo: [Kyllä/Ei, jos kyllä: sijainti ja rooli]
Kompositio:
- Horisontaalinen asettelu
- Kuvasuhde: 1200x600 pikseliä (2:1)
- Fokuspiste vasemmassa kolmanneksessa
- Jätä yläosan vasempaan nurkkaan tilaa otsikkoa varten
Tekniset yksityiskohdat:
- Flat design kevyellä syvyydellä
- Terävät reunat pääelementeissä, pehmeämmät taustalla
- Valonlähde vasemmalta yläviistosta
- Ei valokuvaelementtejä – pidä kuvitus abstraktina
Vältä: [Aihekohtaiset vältettävät asiat]`
          : `Use case: You need a visually impactful header image for a blog article

Create a hero image for a blog article titled "[ARTICLE TITLE]".
Style: Premium editorial illustration, SaaS aesthetic
Color palette: Forest green primary, muted turquoise and soft rose accents, light gray (#F5F5F5) for background elements
Mood: [Expert/Trustworthy/Innovative]
Visual concept:
- Center: [Primary visual metaphor for the topic]
- Left: [Supporting element 1]
- Right: [Supporting element 2]
- Background: [Describe background and its elements]
Lyyli character: [Yes/No; if yes: position and role]
Composition:
- Horizontal layout
- Aspect ratio: 1200x600 pixels (2:1)
- Focal point in the left third
- Leave space in the top-left corner for the title
Technical details:
- Flat design with light depth
- Sharp edges on primary elements, softer in the background
- Light source from top-left
- No photo elements – keep the illustration abstract
Avoid: [Topic-specific pitfalls]`,
    },
    {
      title:
        locale === 'fi'
          ? 'Sosiaalisen median neliökuva'
          : 'Square social media image',
      prompt:
        locale === 'fi'
          ? `Käyttötilanne: Instagram, Facebook tai muut neliömuotoista kuvaa vaativat kanavat

Luo neliömuotoinen sosiaalisen median kuva aiheesta [AIHE].
Tyyli: Ystävällinen, moderni kuvitus
Värit: Metsänvihreä, muted turquoise, soft rose, valkoinen tausta
Tunnelma: [Energinen/Lämmin/Kutsuva]
Visuaalinen konsepti:
- Keskipiste: [Pääelementti keskellä]
- Ympäröivät elementit: [2–4 tukielementtiä]
- Visuaalinen hierarkia: [Miten katse ohjataan]
Lyyli-hahmo: [Kyllä/Ei, jos kyllä: Lyyli [asento/toiminta], katso referenssikuva]
Tekniset vaatimukset:
- Koko: 1080x1080 pikseliä (1:1)
- Symmetrinen tai keskitetty kompositio
- Selkeä fokuspiste keskellä
- Tarpeeksi kontrastia tekstin lisäämiselle
- [Yläosassa/Alaosassa/Keskellä] tilaa tekstille
Typografia-integraatio: [Jos tekstiä sisällytetään, määrittele tyyli]
Vältä: [Aihekohtaiset rajoitukset]`
          : `Use case: Instagram, Facebook, or other square-format channels

Create a square social media image on the topic [TOPIC].
Style: Friendly, modern illustration
Colors: Forest green, muted turquoise, soft rose, white background
Mood: [Energetic/Warm/Inviting]
Visual concept:
- Centerpiece: [Main element in the middle]
- Surrounding elements: [2–4 supporting elements]
- Visual hierarchy: [How the gaze is directed]
Lyyli character: [Yes/No; if yes: Lyyli [pose/action], see reference image]
Technical requirements:
- Size: 1080x1080 pixels (1:1)
- Symmetrical or centered composition
- Clear focal point in the center
- Sufficient contrast for adding text
- Space for text [Top/Bottom/Center]
Typography integration: [If including text, define style]
Avoid: [Topic-specific constraints]`,
    },
    {
      title:
        locale === 'fi' ? 'Infograafinen kuvitus' : 'Infographic illustration',
      prompt:
        locale === 'fi'
          ? `Käyttötilanne: Datan, prosessin tai konseptin visualisointi

Luo infograafinen kuvitus aiheesta [AIHE/PROSESSI/DATA].
Tyyli: Selkeä, informatiivinen data-visualisointi
Värit: Metsänvihreä pääväri, käytä muted turquoisea ja soft rosea kategorioiden erottamiseen
Tunnelma: Selkeä, helposti ymmärrettävä, luotettava
Visuaalinen konsepti:
- Rakenne: [Lineaarinen/Syklinen/Hierarkinen/Vertaileva]
- Elementit: [Listaa visualisoitavat osat]
- Datatyyppi: [Prosenttiluvut/Vaiheet/Vertailu/Timeline]
Lyyli-hahmo: [Kyllä/Ei, jos kyllä: Lyyli selittämässä/osoittamassa, katso referenssikuva]
Layout:
- Suunta: [Vaaka/Pysty/Molemmat]
- Koko: [Määrittele käyttötarkoituksen mukaan]
- Luettavuus: Numerot ja tekstit riittävän suuria
- Ikonit: Yksinkertaiset, tunnistettavat
Tekniset yksityiskohdat:
- Johdonmukainen värikoodaus läpi kuvituksen
- Selkeät otsikot ja labelit
- Nuolet tai viivat ohjaamassa katsetta
- Riittävästi white spacea
Vältä: Liian monimutkaisia kaavioita, liikaa dataa yhdessä kuvassa, huonoa kontrastia`
          : `Use case: Visualizing data, a process, or a concept

Create an infographic illustration on [TOPIC/PROCESS/DATA].
Style: Clear, informative data visualization
Colors: Forest green as primary; use muted turquoise and soft rose to distinguish categories
Mood: Clear, easy to understand, trustworthy
Visual concept:
- Structure: [Linear/Cyclical/Hierarchical/Comparative]
- Elements: [List the parts to visualize]
- Data type: [Percentages/Steps/Comparison/Timeline]
Lyyli character: [Yes/No; if yes: Lyyli explaining/pointing, see reference image]
Layout:
- Orientation: [Horizontal/Vertical/Both]
- Size: [Define based on use]
- Readability: Numbers and labels large enough
- Icons: Simple, recognizable
Technical details:
- Consistent color-coding across the illustration
- Clear headings and labels
- Arrows or lines guiding the eye
- Sufficient white space
Avoid: Overly complex charts, too much data in one image, poor contrast`,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose/5 to-turquoise/5">
      {/* Breadcrumb */}
      <div className="hidden bg-white/50 border-b border-[#E5E5E4] pt-24 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 pb-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link
                  href={`/${locale}/help`}
                  className="text-[#666666] hover:text-[#2F5D50] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#2F5D50] focus:ring-offset-2 rounded"
                >
                  {locale === 'fi' ? 'Apu ja tuki' : 'Help & Support Center'}
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="flex-shrink-0 h-5 w-5 text-[#666666]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-4 text-sm font-medium text-[#666666]">
                    {locale === 'fi' ? 'Prompt-kirjasto' : 'Prompt Library'}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="pt-12 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#2F5D50] mb-6 font-playfair leading-tight">
              {locale === 'fi'
                ? 'Prompt-kirjasto: Näin saat parhaan irti Lyyli.ai:sta'
                : 'Prompt library: How to get the most out of Lyyli.ai'}
            </h1>
            <p className="text-xl text-[#333333] font-inter leading-relaxed mb-6">
              {locale === 'fi'
                ? 'Hyvä prompt on kuin hyvä briifi – mitä selkeämmin kerrot, mitä haluat, sitä paremman tuloksen saat. Tekoälyassari ei arvaa ajatuksiasi, mutta se ymmärtää tarkan ohjeen.'
                : "A good prompt is like a good brief – the clearer you communicate what you want, the better result you get. The AI assistant won't guess your thoughts, but it understands precise instructions."}
            </p>
            <p className="text-lg text-[#666666] font-inter leading-relaxed">
              {locale === 'fi'
                ? 'Parhaimmillaan prompt kertoo kenelle kirjoitat, mitä varten, missä kanavassa ja millä tyylillä. Mitä enemmän kontekstia annat, sitä vähemmän joudut muokkaamaan.'
                : "At its best, a prompt tells who you're writing for, what purpose, which channel, and what style. The more context you provide, the less you need to edit."}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* White background container for Prompt Categories */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100">
          {/* Quick Commands */}
          <PromptCategory
            title={
              locale === 'fi'
                ? 'Pikakäskyt arkeen'
                : 'Quick commands for everyday'
            }
            description={
              locale === 'fi'
                ? 'Joskus tarvitset vain nopean viestin ilman pitkiä ohjeita. Näillä lyhyillä prompteilla hoidat päivittäisen viestinnän salamannopeasti:'
                : 'Sometimes you just need a quick message without long instructions. Handle daily communication lightning-fast with these short prompts:'
            }
            prompts={quickPrompts}
            locale={locale}
          />

          {/* Email Messages */}
          <PromptCategory
            title={locale === 'fi' ? 'Sähköpostiviestit' : 'Email messages'}
            description={
              locale === 'fi'
                ? 'Ammattimaisia sähköpostiviestejä erilaisiin tilanteisiin:'
                : 'Professional email messages for different situations:'
            }
            prompts={emailPrompts}
            locale={locale}
          />

          {/* LinkedIn Posts */}
          <PromptCategory
            title={locale === 'fi' ? 'LinkedIn-julkaisut' : 'LinkedIn posts'}
            description={
              locale === 'fi'
                ? 'Vaikuttavia LinkedIn-postauksia, jotka rakentavat asiantuntijabrändiä:'
                : 'Impactful LinkedIn posts that build your expert brand:'
            }
            prompts={linkedInPrompts}
            locale={locale}
          />

          {/* Social Media Updates */}
          <PromptCategory
            title={
              locale === 'fi'
                ? 'Sosiaalisen median päivitykset'
                : 'Social media updates'
            }
            description={
              locale === 'fi'
                ? 'Energisiä päivityksiä eri kanaviin:'
                : 'Energetic updates for different channels:'
            }
            prompts={socialMediaPrompts}
            locale={locale}
          />

          {/* Internal Communication */}
          <PromptCategory
            title={
              locale === 'fi' ? 'Sisäinen viestintä' : 'Internal communication'
            }
            description={
              locale === 'fi'
                ? 'Selkeää ja kannustavaa tiimimiestintää:'
                : 'Clear and encouraging team communication:'
            }
            prompts={internalPrompts}
            locale={locale}
          />

          {/* Image Requests */}
          <PromptCategory
            title={locale === 'fi' ? 'Kuvapyynnöt' : 'Image requests'}
            description={imageIntro}
            prompts={imagePrompts}
            locale={locale}
          />
        </div>

        {/* Tips Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 bg-gradient-to-r from-[#2F5D50] to-[#2F5D50]/90">
            <h2 className="text-3xl font-bold text-white mb-2 font-playfair leading-tight">
              {locale === 'fi'
                ? 'Vinkit tehokkaaseen promptaamiseen'
                : 'Tips for effective prompting'}
            </h2>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#A7D6D1] rounded-lg flex items-center justify-center">
                  <span className="text-[#2F5D50] font-bold text-lg">1</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#2F5D50] mb-2 font-inter">
                    {locale === 'fi' ? 'Anna konteksti' : 'Give context'}
                  </h3>
                  <p className="text-[#666666] font-inter leading-relaxed">
                    {locale === 'fi'
                      ? 'Kerro, missä tilanteessa olet ja miksi kirjoitat.'
                      : "Tell what situation you're in and why you're writing."}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#A7D6D1] rounded-lg flex items-center justify-center">
                  <span className="text-[#2F5D50] font-bold text-lg">2</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#2F5D50] mb-2 font-inter">
                    {locale === 'fi' ? 'Määrittele kohde' : 'Define target'}
                  </h3>
                  <p className="text-[#666666] font-inter leading-relaxed">
                    {locale === 'fi'
                      ? 'Kenelle viestit? Mitä he tietävät aiheesta ennestään?'
                      : 'Who are you messaging? What do they already know about the topic?'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#A7D6D1] rounded-lg flex items-center justify-center">
                  <span className="text-[#2F5D50] font-bold text-lg">3</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#2F5D50] mb-2 font-inter">
                    {locale === 'fi' ? 'Aseta tavoite' : 'Set goal'}
                  </h3>
                  <p className="text-[#666666] font-inter leading-relaxed">
                    {locale === 'fi'
                      ? 'Haluatko myydä, informoida, inspiroida vai aktivoida?'
                      : 'Do you want to sell, inform, inspire, or activate?'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#A7D6D1] rounded-lg flex items-center justify-center">
                  <span className="text-[#2F5D50] font-bold text-lg">4</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#2F5D50] mb-2 font-inter">
                    {locale === 'fi' ? 'Rajaa pituus' : 'Limit length'}
                  </h3>
                  <p className="text-[#666666] font-inter leading-relaxed">
                    {locale === 'fi'
                      ? 'Anna sana- tai merkkimäärä, niin saat sopivan mittaisen tekstin.'
                      : 'Give word or character count to get appropriately sized text.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#A7D6D1] rounded-lg flex items-center justify-center">
                  <span className="text-[#2F5D50] font-bold text-lg">5</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#2F5D50] mb-2 font-inter">
                    {locale === 'fi' ? 'Ohjaa sävy' : 'Guide tone'}
                  </h3>
                  <p className="text-[#666666] font-inter leading-relaxed">
                    {locale === 'fi'
                      ? 'Muodollinen vai rento? Asiantunteva vai kaverillinen?'
                      : 'Formal or casual? Expert or friendly?'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#A7D6D1] rounded-lg flex items-center justify-center">
                  <span className="text-[#2F5D50] font-bold text-lg">6</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#2F5D50] mb-2 font-inter">
                    {locale === 'fi' ? 'Pyydä rakenne' : 'Request structure'}
                  </h3>
                  <p className="text-[#666666] font-inter leading-relaxed">
                    {locale === 'fi'
                      ? 'Bulletit, kappaleet, numeroidut listat – kerro, miten haluat sisällön jäsenneltävän.'
                      : 'Bullets, paragraphs, numbered lists – tell how you want content structured.'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#A7D6D1] rounded-lg flex items-center justify-center">
                  <span className="text-[#2F5D50] font-bold text-lg">7</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#2F5D50] mb-2 font-inter">
                    {locale === 'fi' ? 'Testaa ja tarkenna' : 'Test and refine'}
                  </h3>
                  <p className="text-[#666666] font-inter leading-relaxed">
                    {locale === 'fi'
                      ? 'Jos tulos ei ole täydellinen, anna lisäohjeita. Lyyli oppii tyylisi sitä paremmin, mitä enemmän sitä käytät.'
                      : "If result isn't perfect, give additional instructions. Lyyli learns your style better the more you use it."}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-[#A7D6D1] rounded-lg flex items-center justify-center">
                  <span className="text-[#2F5D50] font-bold text-lg">8</span>
                </div>
                <div>
                  <h3 className="font-bold text-[#2F5D50] mb-2 font-inter">
                    {locale === 'fi'
                      ? 'Muista: Lyhytkin käy!'
                      : 'Remember: Short works too!'}
                  </h3>
                  <p className="text-[#666666] font-inter leading-relaxed">
                    {locale === 'fi'
                      ? 'Arkiviestintään riittää usein muutaman sanan ohje. Lyyli täydentää loput.'
                      : 'For everyday communication, often a few words instruction is enough. Lyyli fills in the rest.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-[#2F5D50] to-[#2F5D50]/90 rounded-2xl shadow-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4 font-playfair leading-tight">
            {locale === 'fi' ? 'Valmis kokeilemaan?' : 'Ready to try?'}
          </h2>
          <p className="text-xl text-white/90 mb-8 font-inter leading-relaxed max-w-2xl mx-auto">
            {locale === 'fi'
              ? 'Ota Lyyli käyttöön ja katso, miten nopeutat viestintääsi menettämättä aitouttasi.'
              : 'Start using Lyyli and see how you speed up your communication without losing authenticity.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://app.lyyli.ai"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-semibold rounded-lg text-white hover:bg-white hover:text-[#2F5D50] transition-all duration-200"
            >
              {locale === 'fi' ? 'Aloita käyttö' : 'Start using'}
            </a>
            <CalendarPopup
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg text-white hover:bg-white/10 transition-all duration-200"
              translations={{
                title: locale === 'fi' ? 'Varaa demo' : 'Book a Demo',
                subtitle:
                  locale === 'fi'
                    ? 'Ajoita henkilökohtainen demo tiimimme kanssa'
                    : 'Schedule a personalized demo with our team',
                description:
                  locale === 'fi'
                    ? 'Valitse sopiva aika henkilökohtaiselle demollesi. Tiimimme näyttää, kuinka Lyyli voi muuttaa organisaatiosi viestintää.'
                    : "Choose a convenient time for your personalized demo. Our team will show you how Lyyli can transform your organization\'s communication.",
                loading:
                  locale === 'fi'
                    ? 'Ladataan kalenteria...'
                    : 'Loading calendar...',
                errorTitle:
                  locale === 'fi' ? 'Ajoita demosi' : 'Schedule Your Demo',
                errorDescription:
                  locale === 'fi'
                    ? 'Klikkaa alla olevaa painiketta avataksesi kalenterimme uudessa välilehdessä'
                    : 'Click the button below to open our calendar in a new tab',
                errorButton:
                  locale === 'fi' ? 'Avaa kalenteri' : 'Open Calendar',
                footerSecure:
                  locale === 'fi'
                    ? 'Turvallinen varaus • GDPR-yhteensopiva'
                    : 'Secure booking • GDPR compliant',
                footerContact:
                  locale === 'fi'
                    ? 'Kysymyksiä? Ota yhteyttä'
                    : 'Questions? Contact us',
              }}
            >
              {locale === 'fi' ? 'Varaa demo' : 'Book a demo'}
            </CalendarPopup>
          </div>
        </div>
      </div>
    </div>
  );
}
