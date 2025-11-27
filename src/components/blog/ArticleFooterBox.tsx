import CalendarPopup from '@/components/CalendarPopup';

interface ArticleFooterBoxProps {
	author?: string;
	keywords?: string[];
	locale: string;
	className?: string;
}

export default function ArticleFooterBox({
	author,
	keywords = [],
	locale,
	className,
}: ArticleFooterBoxProps) {
	const isFi = locale === 'fi';
	// Fallback author per request
	const resolvedAuthor =
		!author || author.trim() === '' || author === 'Lyyli Team'
			? 'Mikko, CEO of Lyyli.ai'
			: author;

	const authorIntro =
		resolvedAuthor.toLowerCase().includes('mikko')
			? isFi
				? 'Mikko johtaa Lyyli.aita ja kirjoittaa käytännöllisestä viestinnän kehittämisestä asiantuntijaorganisaatioille.'
				: 'Mikko leads Lyyli.ai and writes about practical communication improvements for professional service companies.'
			: isFi
				? 'Artikkelin kirjoittaja.'
				: 'Author of this article.';

	const emailHref = 'mailto:mikko@lyyli.ai';
	const phoneHref = 'tel:+358409619224';
	const whatsappHref = 'https://wa.me/358409619224';

	return (
		<section
			className={`mt-12 md:mt-16 ${className ?? ''}`}
			aria-labelledby="article-footer-box-title"
		>
			<div className="rounded-2xl border border-forest/15 bg-white/80 backdrop-blur-sm p-6 md:p-8 shadow-soft">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* Author + Intro + Contacts */}
					<div className="md:col-span-2">
						<div className="flex items-start gap-4">
							{/* Simple avatar with initial */}
							<div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-forest to-turquoise text-white flex items-center justify-center font-semibold">
								{(resolvedAuthor?.[0] || 'M').toUpperCase()}
							</div>
							<div className="min-w-0">
								<h2
									id="article-footer-box-title"
									className="text-xl font-playfair font-bold text-forest"
								>
									{isFi ? 'Kirjoittajasta' : 'About the author'}
								</h2>
								<p className="text-forest font-semibold mt-1">
									{resolvedAuthor}
								</p>
								<p className="text-mediumGray mt-1 leading-relaxed">
									{authorIntro}
								</p>
							</div>
						</div>

						{/* Contact */}
						<div className="mt-4 md:mt-6">
							<p className="text-sm text-mediumGray mb-2">
								{isFi ? 'Ota yhteyttä' : 'Get in touch'}
							</p>
							<div className="flex items-center gap-2 flex-wrap">
								<a
									href={emailHref}
									className="group inline-flex items-center gap-2 px-3 py-2 rounded-full border border-forest/20 bg-white text-forest shadow-sm transition-all duration-200 hover:bg-forest/10 hover:border-forest hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-forest/40"
									aria-label="Email"
								>
									<svg
										className="w-4 h-4 transition-colors"
										fill="currentColor"
										viewBox="0 0 20 20"
										aria-hidden="true"
									>
										<path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
										<path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
									</svg>
									<span>mikko@lyyli.ai</span>
								</a>
								<a
									href={whatsappHref}
									target="_blank"
									rel="noopener noreferrer"
									className="group inline-flex items-center gap-2 px-3 py-2 rounded-full border border-forest/20 bg-white text-forest shadow-sm transition-all duration-200 hover:bg-forest/10 hover:border-forest hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-forest/40"
									aria-label="WhatsApp"
								>
									<svg
										className="w-4 h-4 transition-colors"
										fill="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path d="M20.52 3.48A11.93 11.93 0 0012.06 0C5.72 0 .55 5.18.55 11.57c0 2.04.53 4.03 1.53 5.79L0 24l6.83-1.97a11.51 11.51 0 005.23 1.28h.01c6.35 0 11.52-5.18 11.52-11.57 0-3.09-1.2-5.99-3.57-8.25zM12.06 21.3h-.01a9.6 9.6 0 01-4.89-1.34l-.35-.21-4.05 1.17 1.16-3.95-.23-.4a9.52 9.52 0 01-1.46-5.1c0-5.27 4.28-9.55 9.56-9.55 2.56 0 4.96.99 6.77 2.8a9.52 9.52 0 012.79 6.75c0 5.27-4.28 9.55-9.55 9.55zm5.51-7.33c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.18.2-.35.23-.64.08-.3-.15-1.25-.46-2.38-1.47-.88-.77-1.48-1.72-1.66-2.02-.17-.3-.02-.47.13-.62.13-.13.3-.34.43-.5.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.51-.67-.52l-.57-.01c-.2 0-.53.08-.8.38-.27.3-1.05 1.03-1.05 2.51 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.09 4.49.71.31 1.27.5 1.7.64.71.23 1.35.2 1.86.12.57-.08 1.77-.73 2.02-1.44.25-.71.25-1.32.17-1.44-.08-.12-.28-.2-.58-.35z" />
									</svg>
									<span>WhatsApp</span>
								</a>
								<a
									href={phoneHref}
									className="group inline-flex items-center gap-2 px-3 py-2 rounded-full border border-forest/20 bg-white text-forest shadow-sm transition-all duration-200 hover:bg-forest/10 hover:border-forest hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-forest/40"
									aria-label="Phone"
								>
									<svg
										className="w-4 h-4 transition-colors"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M3 5a2 2 0 012-2h3.28a1 1 0 01.95.69l1.5 4.48a1 1 0 01-.5 1.22l-2.26 1.13a11.04 11.04 0 005.52 5.52l1.13-2.26a1 1 0 011.22-.5l4.48 1.5a1 1 0 01.69.95V19a2 2 0 01-2 2h-1C9.72 21 3 14.28 3 6V5z"
										/>
									</svg>
									<span>+358 40 961 9224</span>
								</a>
							</div>
						</div>

						{/* Tags */}
						{keywords.length > 0 && (
							<div className="mt-6">
								<p className="text-sm text-mediumGray mb-2">
									{isFi ? 'Tagit' : 'Tags'}
								</p>
								<div className="flex flex-wrap gap-2">
									{keywords.map((tag) => (
										<span
											key={tag}
											className="inline-flex items-center px-3 py-1 rounded-full border border-forest/20 bg-forest/5 text-sm text-forest"
										>
											{tag}
										</span>
									))}
								</div>
							</div>
						)}
					</div>

					{/* CTA Card */}
					<div className="md:col-span-1">
						<div className="rounded-xl bg-gradient-to-br from-forest to-turquoise text-white p-5 shadow-lg">
							<h3 className="text-lg font-playfair font-bold leading-tight">
								{isFi ? 'Varaa demo' : 'Book a Demo'}
							</h3>
							<p className="text-white/90 text-sm mt-1">
								{isFi
									? 'Näe Lyyli toiminnassa sopivana ajankohtana.'
									: 'See Lyyli in action at a time that suits you.'}
							</p>
							<div className="mt-4">
								<CalendarPopup
									className="w-full bg-white text-forest px-4 py-2.5 rounded-lg hover:bg-white/90 transition-all duration-200 font-medium inline-flex items-center justify-center gap-2 shadow-md"
									aria-label={isFi ? 'Varaa demo' : 'Book a Demo'}
									translations={{
										title: isFi ? 'Varaa demo' : 'Book a Demo',
										subtitle: isFi
											? 'Ajoita henkilökohtainen demo tiimimme kanssa'
											: 'Schedule a personalized demo with our team',
										description: isFi
											? 'Valitse sopiva aika henkilökohtaiselle demollesi. Tiimimme näyttää, kuinka Lyyli voi muuttaa organisaatiosi viestintää.'
											: "Choose a convenient time for your personalized demo. Our team will show you how Lyyli can transform your organization's communication.",
										loading: isFi ? 'Ladataan kalenteria...' : 'Loading calendar...',
										errorTitle: isFi ? 'Ajoita demosi' : 'Schedule Your Demo',
										errorDescription: isFi
											? 'Klikkaa alla olevaa painiketta avataksesi kalenterimme uudessa välilehdessä'
											: 'Click the button below to open our calendar in a new tab',
										errorButton: isFi ? 'Avaa kalenteri' : 'Open Calendar',
										footerSecure: isFi
											? 'Turvallinen varaus • GDPR-yhteensopiva'
											: 'Secure booking • GDPR compliant',
										footerContact: isFi
											? 'Kysymyksiä? Ota yhteyttä'
											: 'Questions? Contact us',
									}}
								>
									{isFi ? 'Varaa Demo' : 'Book a Demo'}
								</CalendarPopup>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}


