export interface HelpArticle {
  id: string;
  title: string;
  titleFi: string;
  summary: string;
  summaryFi: string;
  url: string;
  category: string;
  categoryFi: string;
  tags: string[];
  tagsFi: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  timeToComplete: string;
  timeToCompleteFi: string;
  content: string;
  contentFi: string;
}

export const helpArticles: HelpArticle[] = [
  {
    id: 'getting-started',
    title: 'Creating your first AI communications assistant',
    titleFi: 'Luo ensimmäinen tekoälyavustajasi',
    summary: 'Set up your first AI assistant in under 10 minutes with this step-by-step guide',
    summaryFi: 'Luo ensimmäinen tekoälyavustajasi alle 10 minuutissa tämän vaiheittaisen oppaan avulla',
    url: '/help/getting-started',
    category: 'Getting Started',
    categoryFi: 'Aloittaminen',
    tags: ['getting-started', 'ai-assistant', 'setup', 'onboarding', 'first-time'],
    tagsFi: ['aloittaminen', 'tekoälyavustaja', 'asetukset', 'ensimmäinen-kerta'],
    difficulty: 'beginner',
    timeToComplete: '10 min',
    timeToCompleteFi: '10 min',
    content: 'Create your first AI communications assistant. This guide will walk you through creating your first AI communications assistant in just a few simple steps. What you will accomplish: Created your first AI assistant, Set basic personality traits, Added initial knowledge base, Tested your first conversations. Prerequisites: An active Lyyli.ai account, Access to your company communication guidelines, Basic understanding of your target audience. Step-by-step guide: Access the AI Assistant creation page, Configure basic settings, Define personality and voice, Add initial knowledge base, Test your assistant.',
    contentFi: 'Luo ensimmäinen tekoälyavustajasi. Tämä oppaat opastaa sinua luomaan ensimmäisen tekoälyavustajasi vain muutamassa minuutissa. Mitä saavutat: Luotu ensimmäinen tekoälyavustajasi, Asetettu peruspersoonallisuusominaisuudet, Lisätty alustava tietopohja, Testattu ensimmäiset keskustelut. Edellytykset: Aktiivinen Lyyli.ai-tili, Pääsy yrityksesi viestintäohjeisiin, Perustietoa kohderyhmästäsi. Vaiheittainen oppaat: Pääsy AI-avustajan luontisivulle, Perusasetusten määrittäminen, Persoonallisuuden ja äänen määrittäminen, Alustavan tietopohjan lisääminen, Avustajasi testaaminen.'
  },
  {
    id: 'legal-library',
    title: 'Legal & agreements',
    titleFi: 'Sopimukset ja ehdot',
    summary: 'Order confirmation, DPA, SLA, terms, and annex templates',
    summaryFi: 'Tilausvahvistus, DPA, SLA, ehdot ja liitteet',
    url: '/help/legal',
    category: 'Support',
    categoryFi: 'Tuki',
    tags: ['legal','agreements','dpa','gdpr','sla','toms','subprocessors','retention','deletion','it2022','terms'],
    tagsFi: ['juridiikka','sopimukset','dpa','gdpr','sla','toms','alihankkijat','säilytys','poisto','it2022','ehdot'],
    difficulty: 'beginner',
    timeToComplete: '2 min',
    timeToCompleteFi: '2 min',
    content: 'Browse legal templates for Lyyli AI Oy including order confirmation, DPA, SLA, TOMs, subprocessors, and retention policy.',
    contentFi: 'Selaa Lyyli AI Oy:n malleja: tilausvahvistus, DPA, SLA, TOMit, alikäsittelijät ja säilytyskäytäntö.'
  },
  {
    id: 'ai-assistants',
    title: 'Managing and training AI assistants',
    titleFi: 'Tekoälyavustajien hallinta ja koulutus',
    summary: 'Learn how to effectively manage, train, and optimize your AI assistants',
    summaryFi: 'Opi hallitsemaan, kouluttamaan ja optimoimaan tekoälyavustajiasi tehokkaasti',
    url: '/help/ai-assistants',
    category: 'AI Assistants',
    categoryFi: 'Tekoälyavustajat',
    tags: ['ai-assistants', 'training', 'management', 'optimization', 'performance'],
    tagsFi: ['tekoälyavustajat', 'koulutus', 'hallinta', 'optimointi', 'suorituskyky'],
    difficulty: 'intermediate',
    timeToComplete: '20 min',
    timeToCompleteFi: '20 min',
    content: 'Managing and training AI assistants. Learn how to effectively manage, train, and optimize your AI assistants. Training techniques, performance monitoring, quality assessment, optimization strategies, best practices for AI training, continuous improvement, A/B testing, version control, content maintenance, review schedules.',
    contentFi: 'Tekoälyavustajien hallinta ja koulutus. Opi hallitsemaan, kouluttamaan ja optimoimaan tekoälyavustajiasi tehokkaasti. Koulutustekniikat, suorituskyvyn seuranta, laadun arviointi, optimointistrategiat, parhaat käytännöt AI-koulutukseen, jatkuva parantaminen, A/B-testaus, versionhallinta, sisällön ylläpito, tarkistusajat.'
  },
  {
    id: 'integrations',
    title: 'Integrations and third-party connections',
    titleFi: 'Integraatiot ja kolmannen osapuolen yhteistyöt',
    summary: 'Connect Lyyli.ai with other tools and platforms for seamless workflows',
    summaryFi: 'Yhdistä Lyyli.ai muihin työkaluihin ja alustoihin saumattomien työprosessien saavuttamiseksi',
    url: '/help/integrations',
    category: 'Integrations',
    categoryFi: 'Integraatiot',
    tags: ['integrations', 'api', 'webhooks', 'third-party', 'workflows', 'automation'],
    tagsFi: ['integraatiot', 'api', 'webhooks', 'kolmannen-osapuolen', 'työprosessit', 'automaatio'],
    difficulty: 'intermediate',
    timeToComplete: '30 min',
    timeToCompleteFi: '30 min',
    content: 'Integrations and third-party connections. Connect Lyyli.ai with other tools and platforms for seamless workflows. WordPress integration, HubSpot CRM, Slack workspace, email marketing platforms, API authentication, webhook configuration, custom integration development, troubleshooting common integration issues.',
    contentFi: 'Integraatiot ja kolmannen osapuolen yhteistyöt. Yhdistä Lyyli.ai muihin työkaluihin ja alustoihin saumattomien työprosessien saavuttamiseksi. WordPress-integraatio, HubSpot CRM, Slack-työtilan, sähköpostimarkkinointialustat, API-autentikaatio, webhook-konfiguraatio, mukautetun integraation kehitys, yleisten integraatioongelmien vianmääritys.'
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting and problem solving',
    titleFi: 'Vianmääritys ja ongelmien ratkaisu',
    summary: 'Find solutions to common issues and get help when things go wrong',
    summaryFi: 'Löydä ratkaisut yleisiin ongelmiin ja saa apua kun asiat menevät pieleen',
    url: '/help/troubleshooting',
    category: 'Troubleshooting',
    categoryFi: 'Vianmääritys',
    tags: ['troubleshooting', 'problems', 'solutions', 'errors', 'fixes', 'support'],
    tagsFi: ['vianmääritys', 'ongelmat', 'ratkaisut', 'virheet', 'korjaukset', 'tuki'],
    difficulty: 'beginner',
    timeToComplete: '15 min',
    timeToCompleteFi: '15 min',
    content: 'Troubleshooting and problem solving. Find solutions to common issues and get help when things go wrong. Common problems, error messages, diagnostic steps, solution guides, escalation procedures, support contact information, known issues, workarounds.',
    contentFi: 'Vianmääritys ja ongelmien ratkaisu. Löydä ratkaisut yleisiin ongelmiin ja saa apua kun asiat menevät pieleen. Yleiset ongelmat, virheilmoitukset, diagnostiikkavaiheet, ratkaisuoppaat, eskalointimenettelyt, tuen yhteystiedot, tunnetut ongelmat, kiertotiet.'
  },
  {
    id: 'analytics',
    title: 'Analytics and performance insights',
    titleFi: 'Analytiikka ja suorituskykyyn liittyvät tiedot',
    summary: 'Track performance, analyze data, and optimize your AI communications',
    summaryFi: 'Seuraa suorituskykyä, analysoi tietoja ja optimoi tekoälyviestintääsi',
    url: '/help/analytics',
    category: 'Analytics',
    categoryFi: 'Analytiikka',
    tags: ['analytics', 'performance', 'metrics', 'reporting', 'insights', 'optimization'],
    tagsFi: ['analytiikka', 'suorituskyky', 'mittarit', 'raportointi', 'näkemykset', 'optimointi'],
    difficulty: 'intermediate',
    timeToComplete: '25 min',
    timeToCompleteFi: '25 min',
    content: 'Analytics and performance insights. Track performance, analyze data, and optimize your AI communications. Dashboard overview, key metrics, custom reports, performance trends, optimization recommendations, data export, real-time monitoring, historical analysis.',
    contentFi: 'Analytiikka ja suorituskykyyn liittyvät tiedot. Seuraa suorituskykyä, analysoi tietoja ja optimoi tekoälyviestintääsi. Dashboard-yleiskatsaus, avainmittarit, mukautetut raportit, suorituskykytrendit, optimointisuositukset, tietojen vienti, reaaliaikainen seuranta, historiallinen analyysi.'
  },
  {
    id: 'security',
    title: 'Security, permissions, and compliance',
    titleFi: 'Tietoturva, käyttöoikeudet ja yhteensopivuus',
    summary: 'Manage security settings, user permissions, and ensure compliance',
    summaryFi: 'Hallitse tietoturva-asetuksia, käyttäjien oikeuksia ja varmista yhteensopivuus',
    url: '/help/security',
    category: 'Security',
    categoryFi: 'Tietoturva',
    tags: ['security', 'permissions', 'compliance', 'access-control', 'audit', 'gdpr'],
    tagsFi: ['tietoturva', 'käyttöoikeudet', 'yhteensopivuus', 'pääsyn-hallinta', 'tarkistus', 'gdpr'],
    difficulty: 'advanced',
    timeToComplete: '40 min',
    timeToCompleteFi: '40 min',
    content: 'Security, permissions, and compliance. Manage security settings, user permissions, and ensure compliance. User roles, access control, SSO setup, data encryption, audit logging, compliance reporting, security best practices, incident response.',
    contentFi: 'Tietoturva, käyttöoikeudet ja yhteensopivuus. Hallitse tietoturva-asetuksia, käyttäjien oikeuksia ja varmista yhteensopivuus. Käyttäjäroolit, pääsyn hallinta, SSO-asetukset, tietojen salaus, tarkistusloki, yhteensopivuusraportointi, tietoturvan parhaat käytännöt, tapahtumavastaus.'
  },
  {
    id: 'contact-support',
    title: 'Contact Support',
    titleFi: 'Ota yhteyttä tukeen',
    summary: 'Get help from our support team through multiple channels',
    summaryFi: 'Saa apua tukitiimiltämme useiden kanavien kautta',
    url: '/help/contact-support',
    category: 'Support',
    categoryFi: 'Tuki',
    tags: ['support', 'contact', 'help', 'email', 'chat', 'phone'],
    tagsFi: ['tuki', 'yhteys', 'apu', 'sähköposti', 'chat', 'puhelin'],
    difficulty: 'beginner',
    timeToComplete: '5 min',
    timeToCompleteFi: '5 min',
    content: 'Contact Support. Get help from our support team through multiple channels. Email support, live chat, phone support, support request form, response times, escalation procedures, additional resources.',
    contentFi: 'Ota yhteyttä tukeen. Saa apua tukitiimiltämme useiden kanavien kautta. Sähköpostituki, live-chat, puhelintuki, tukipyynnön lomake, vastausajat, eskalointimenettelyt, lisätukiresurssit.'
  },
  {
    id: 'status',
    title: 'Service Status',
    titleFi: 'Palvelun tila',
    summary: 'Check the current operational status of Lyyli.ai services',
    summaryFi: 'Tarkista Lyyli.ai-palveluiden nykyinen toimintatila',
    url: '/help/status',
    category: 'Status',
    categoryFi: 'Tila',
    tags: ['status', 'monitoring', 'uptime', 'incidents', 'performance', 'alerts'],
    tagsFi: ['tila', 'seuranta', 'käytettävyys', 'tapahtumat', 'suorituskyky', 'hälytykset'],
    difficulty: 'beginner',
    timeToComplete: '2 min',
    timeToCompleteFi: '2 min',
    content: 'Service Status. Check the current operational status of Lyyli.ai services. Overall status, service components, recent incidents, performance metrics, uptime statistics, subscription updates.',
    contentFi: 'Palvelun tila. Tarkista Lyyli.ai-palveluiden nykyinen toimintatila. Yleinen tila, palvelukomponentit, viimeisimmät tapahtumat, suorituskykymittaukset, käytettävyystilastot, päivitysten tilaus.'
  },
  {
    id: 'accounts-auth',
    title: 'Accounts and authentication',
    titleFi: 'Tilit ja kirjautuminen',
    summary: 'Create/verify account, set up SSO/MFA, reset passwords, manage profile',
    summaryFi: 'Tilin luonti/vahvistus, SSO/MFA, salasanan nollaus, profiiliasetukset',
    url: '/help/accounts-auth',
    category: 'Accounts',
    categoryFi: 'Tilit',
    tags: ['account', 'auth', 'sso', 'mfa', 'password', 'profile'],
    tagsFi: ['tili', 'kirjautuminen', 'sso', 'mfa', 'salasana', 'profiili'],
    difficulty: 'beginner',
    timeToComplete: '10 min',
    timeToCompleteFi: '10 min',
    content: 'Manage account creation and verification, enable SSO/MFA, reset passwords, unlock accounts, and configure profile and notifications.',
    contentFi: 'Hallinnoi tilin luontia ja vahvistusta, ota käyttöön SSO/MFA, nollaa salasanat, avaa lukitukset sekä määritä profiili ja ilmoitukset.'
  },
  {
    id: 'organizations-users',
    title: 'Organizations and user management',
    titleFi: 'Organisaatiot ja käyttäjähallinta',
    summary: 'Create organizations, invites, roles, teams, permission inheritance, audit trail',
    summaryFi: 'Luo organisaatioita, kutsut ja roolit, tiimit, oikeuksien periytyminen, audit trail',
    url: '/help/organizations-users',
    category: 'Organizations',
    categoryFi: 'Organisaatiot',
    tags: ['organization', 'roles', 'permissions', 'teams', 'groups', 'audit'],
    tagsFi: ['organisaatio', 'roolit', 'oikeudet', 'tiimit', 'ryhmät', 'audit'],
    difficulty: 'intermediate',
    timeToComplete: '15 min',
    timeToCompleteFi: '15 min',
    content: 'Create and manage organizations, send invites, assign roles and permissions, structure teams/groups with inheritance, and review audit trails.',
    contentFi: 'Luo ja hallitse organisaatioita, lähetä kutsuja, määritä roolit ja käyttöoikeudet, rakenna tiimit/ryhmät periytyvine oikeuksineen ja tarkastele audit trail -lokia.'
  },
  {
    id: 'ui-basics',
    title: 'UI basics',
    titleFi: 'Käyttöliittymän perusteet',
    summary: 'Navigation, views, search, filters, notifications, keyboard shortcuts',
    summaryFi: 'Navigointi, näkymät, haku, suodattimet, ilmoitukset, näppäinoikotiet',
    url: '/help/ui-basics',
    category: 'Basics',
    categoryFi: 'Perusteet',
    tags: ['ui', 'navigation', 'search', 'filters', 'notifications', 'shortcuts'],
    tagsFi: ['ui', 'navigointi', 'haku', 'suodattimet', 'ilmoitukset', 'oikotiet'],
    difficulty: 'beginner',
    timeToComplete: '8 min',
    timeToCompleteFi: '8 min',
    content: 'Learn navigation and view layout, use search and filters, manage notifications, and speed up work with keyboard shortcuts.',
    contentFi: 'Opi navigointi ja näkymärakenne, käytä hakua ja suodattimia, hallitse ilmoituksia ja tehosta työtä näppäinoikoteillä.'
  },
  {
    id: 'brand-content',
    title: 'Brand and content settings',
    titleFi: 'Brändi ja sisältöasetukset',
    summary: 'Brand colors, typography, logos, tone, languages, translation, policies, approvals',
    summaryFi: 'Brändivärit, typografia, logot, sävy, kielet, käännöslogiikka, politiikat, hyväksynnät',
    url: '/help/brand-content',
    category: 'Brand',
    categoryFi: 'Brändi',
    tags: ['brand', 'style', 'tone', 'languages', 'translation', 'policies', 'approvals'],
    tagsFi: ['brändi', 'tyyli', 'sävy', 'kielet', 'käännös', 'politiikat', 'hyväksynnät'],
    difficulty: 'intermediate',
    timeToComplete: '12 min',
    timeToCompleteFi: '12 min',
    content: 'Configure brand colors, typography, logos, tone of voice, language settings and translation logic, and define content policies and approval chains.',
    contentFi: 'Määritä brändivärit, typografia ja logot, brändin sävy, kieliasetukset ja käännöslogiikka sekä sisältöpolitiikat ja hyväksyntäketjut.'
  },
  {
    id: 'publishing',
    title: 'Publishing and channels',
    titleFi: 'Julkaisu ja kanavat',
    summary: 'Channel selection and publishing flow, versioning, preview, A/B, feedback, errors',
    summaryFi: 'Kanavan valinta ja julkaisuvirta, versiointi, esikatselu, A/B, palaute, virheet',
    url: '/help/publishing',
    category: 'Publishing',
    categoryFi: 'Julkaisu',
    tags: ['publishing', 'channels', 'versioning', 'preview', 'ab-testing', 'errors'],
    tagsFi: ['julkaisu', 'kanavat', 'versiointi', 'esikatselu', 'ab-testaus', 'virheet'],
    difficulty: 'beginner',
    timeToComplete: '10 min',
    timeToCompleteFi: '10 min',
    content: 'Choose channels and follow the publishing workflow, manage versioning and changes, preview content, run A/B tests, collect feedback, and resolve publishing errors.',
    contentFi: 'Valitse kanavat ja seuraa julkaisuvirtaa, hallitse versioita ja muutoksia, esikatsele sisällöt, tee A/B-testit, kerää palautetta ja ratkaise julkaisuvirheet.'
  },
  {
    id: 'service-description',
    title: 'Service Description',
    titleFi: 'Palvelun kuvaus',
    summary: 'Learn about Lyyli.ai\'s AI-powered communication service and its key features',
    summaryFi: 'Tutustu Lyyli.ai:n tekoälypohjaiseen viestintäpalveluun ja sen keskeisiin ominaisuuksiin',
    url: '/help/service-description',
    category: 'Getting Started',
    categoryFi: 'Aloitus',
    tags: ['service', 'description', 'ai', 'communication', 'features', 'architecture', 'benefits'],
    tagsFi: ['palvelu', 'kuvaus', 'tekoäly', 'viestintä', 'ominaisuudet', 'arkkitehtuuri', 'hyödyt'],
    difficulty: 'beginner',
    timeToComplete: '5 min',
    timeToCompleteFi: '5 min',
    content: 'Service Description. Learn about Lyyli.ai\'s AI-powered communication service and its key features. What is Lyyli.ai, service architecture, technology stack, security, use cases, benefits, next steps.',
    contentFi: 'Palvelun kuvaus. Tutustu Lyyli.ai:n tekoälypohjaiseen viestintäpalveluun ja sen keskeisiin ominaisuuksiin. Mikä on Lyyli.ai, palvelun arkkitehtuuri, tekninen pino, turvallisuus, käyttöalueet, hyödyt, seuraavat vaiheet.'
  },
  {
    id: 'target-audience',
    title: 'Target Audience',
    titleFi: 'Kenelle palvelu on tarkoitettu',
    summary: 'Learn about Lyyli.ai\'s target audiences and different use cases in companies',
    summaryFi: 'Tutustu Lyyli.ai:n kohderyhmiin ja eri käyttötarkoituksiin yrityksissä',
    url: '/help/target-audience',
    category: 'Getting Started',
    categoryFi: 'Aloitus',
    tags: ['target audience', 'use case', 'company', 'industry', 'requirements'],
    tagsFi: ['kohderyhmä', 'käyttötarkoitus', 'yritys', 'toimiala', 'vaatimukset'],
    difficulty: 'beginner',
    timeToComplete: '3 min',
    timeToCompleteFi: '3 min',
    content: 'Target Audience. Learn about Lyyli.ai\'s target audiences and different use cases in companies. Target groups, use cases, suitable industries, implementation requirements, next steps.',
    contentFi: 'Kenelle palvelu on tarkoitettu. Tutustu Lyyli.ai:n kohderyhmiin ja eri käyttötarkoituksiin yrityksissä. Kohderyhmät, käyttötarkoitukset, sopivat toimialat, käyttöönottovaatimukset, seuraavat vaiheet.'
  },
  {
    id: 'registration-subscription',
    title: 'Registration and subscription selection',
    titleFi: 'Rekisteröityminen ja tilauksen valinta',
    summary: 'Guide to registering and choosing the right subscription for Lyyli.ai',
    summaryFi: 'Opas rekisteröitymiseen ja sopivan tilauksen valintaan Lyyli.ai:ssä',
    url: '/help/registration-subscription',
    category: 'Getting Started',
    categoryFi: 'Aloitus',
    tags: ['registration', 'subscription', 'payment', 'trial', 'plan'],
    tagsFi: ['rekisteröityminen', 'tilaus', 'maksu', 'kokeilu', 'paketti'],
    difficulty: 'beginner',
    timeToComplete: '7 min',
    timeToCompleteFi: '7 min',
    content: 'Registration and subscription selection. Guide to registering and choosing the right subscription for Lyyli.ai. Registration process, subscription options, choosing the right plan, payment methods, trial period, next steps.',
    contentFi: 'Rekisteröityminen ja tilauksen valinta. Opas rekisteröitymiseen ja sopivan tilauksen valintaan Lyyli.ai:ssä. Rekisteröitymisprosessi, tilausvaihtoehdot, sopivan suunnitelman valinta, maksutavat, kokeilujakso, seuraavat vaiheet.'
  }
];

export function searchHelpArticles(query: string, locale: string = 'en'): HelpArticle[] {
  if (!query.trim()) return [];
  
  const searchTerm = query.toLowerCase().trim();
  const isFinnish = locale === 'fi';
  
  return helpArticles.filter(article => {
    // Search in title (both languages)
    const titleMatch = isFinnish 
      ? article.titleFi.toLowerCase().includes(searchTerm)
      : article.title.toLowerCase().includes(searchTerm);
    
    // Search in summary (both languages)
    const summaryMatch = isFinnish
      ? article.summaryFi.toLowerCase().includes(searchTerm)
      : article.summary.toLowerCase().includes(searchTerm);
    
    // Search in content (both languages)
    const contentMatch = isFinnish
      ? article.contentFi.toLowerCase().includes(searchTerm)
      : article.content.toLowerCase().includes(searchTerm);
    
    // Search in tags (both languages)
    const tagsMatch = isFinnish
      ? article.tagsFi.some(tag => tag.toLowerCase().includes(searchTerm))
      : article.tags.some(tag => tag.toLowerCase().includes(searchTerm));
    
    // Search in category (both languages)
    const categoryMatch = isFinnish
      ? article.categoryFi.toLowerCase().includes(searchTerm)
      : article.category.toLowerCase().includes(searchTerm);
    
    return titleMatch || summaryMatch || contentMatch || tagsMatch || categoryMatch;
  }).sort((a, b) => {
    // Prioritize exact matches in title
    const aTitleExact = isFinnish 
      ? a.titleFi.toLowerCase() === searchTerm
      : a.title.toLowerCase() === searchTerm;
    const bTitleExact = isFinnish
      ? b.titleFi.toLowerCase() === searchTerm
      : b.title.toLowerCase() === searchTerm;
    
    if (aTitleExact && !bTitleExact) return -1;
    if (!aTitleExact && bTitleExact) return 1;
    
    // Then prioritize title matches
    const aTitleMatch = isFinnish
      ? a.titleFi.toLowerCase().includes(searchTerm)
      : a.title.toLowerCase().includes(searchTerm);
    const bTitleMatch = isFinnish
      ? b.titleFi.toLowerCase().includes(searchTerm)
      : b.title.toLowerCase().includes(searchTerm);
    
    if (aTitleMatch && !bTitleMatch) return -1;
    if (!aTitleMatch && bTitleMatch) return 1;
    
    // Finally, prioritize by difficulty (beginner first)
    const difficultyOrder = { beginner: 0, intermediate: 1, advanced: 2 };
    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
  });
}
