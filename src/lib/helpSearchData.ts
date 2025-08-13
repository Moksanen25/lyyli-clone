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
