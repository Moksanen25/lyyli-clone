import { TranslationKeys } from "../../lib/i18n";

interface Props {
  translations?: TranslationKeys;
}

export default function IntegrationsFlow({ translations: t }: Props) {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Integration Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Slack - Bidirectional */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-forest/10 to-turquoise/10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52-2.523c0-1.398 1.13-2.528 2.52-2.528s2.523 1.13 2.523 2.528c0 1.398-1.132 2.523-2.523 2.523m0-9.838a2.528 2.528 0 0 1-2.52-2.523c0-1.398 1.13-2.528 2.52-2.528s2.523 1.13 2.523 2.528c0 1.398-1.132 2.523-2.523 2.523" fill="#E01E5A"/>
                <path d="M5.042 15.165c0-1.398 1.132-2.528 2.523-2.528s2.528 1.13 2.528 2.528v2.523c0 1.398-1.137 2.528-2.528 2.528s-2.523-1.13-2.523-2.528v-2.523z" fill="#36C5F0"/>
                <path d="M18.958 8.835a2.528 2.528 0 0 1 2.523-2.523c1.398 0 2.528 1.13 2.528 2.523s-1.13 2.528-2.528 2.528c-1.393 0-2.523-1.13-2.523-2.528" fill="#2EB67D"/>
                <path d="M8.835 18.958c1.398 0 2.528 1.137 2.528 2.528s-1.13 2.528-2.528 2.528-2.523-1.137-2.523-2.528c0-1.391 1.125-2.528 2.523-2.528" fill="#ECB22E"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-forest">Slack</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">{t?.["integrations.status.connected"] || "Connected"}</span>
              </div>
            </div>
          </div>
          
          <p className="text-mediumGray text-sm mb-4 font-sans">
            {t?.["integrations.slack.description"] || "Get instant meeting summaries & action items in your team channel"}
          </p>
          
          {/* Dataflow visualization */}
          <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-rose/5 to-turquoise/5 rounded-xl p-3">
            <div className="text-xs font-medium text-forest">Slack</div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-turquoise" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 10h16l-8-8 2-2 12 12-12 12-2-2 8-8H2z"/>
              </svg>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-forest to-turquoise flex items-center justify-center">
                <span className="text-white text-xs font-bold">L</span>
              </div>
              <svg className="w-4 h-4 text-turquoise" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 10h16l-8-8 2-2 12 12-12 12-2-2 8-8H2z"/>
              </svg>
            </div>
            <div className="text-xs font-medium text-forest">Lyyli</div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-mediumGray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-mediumGray">5/6 channels</span>
            </div>
            <div className="relative">
              <input type="checkbox" className="sr-only" checked readOnly />
              <div className="w-10 h-6 bg-forest rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Teams - Bidirectional */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-forest/10 to-turquoise/10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M21.53 12.478c.546-.91.546-2.046 0-2.956L19.437 6.44c-.546-.91-1.555-1.478-2.656-1.478H7.219c-1.101 0-2.11.568-2.656 1.478L2.47 9.522c-.546.91-.546 2.046 0 2.956L4.563 15.56c.546.91 1.555 1.478 2.656 1.478h9.562c1.101 0 2.11-.568 2.656-1.478L21.53 12.478z" fill="#5059C9"/>
                <path d="M12 8.5c-1.933 0-3.5 1.567-3.5 3.5s1.567 3.5 3.5 3.5 3.5-1.567 3.5-3.5S13.933 8.5 12 8.5zm0 5.5c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" fill="white"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-forest">Teams</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-mediumGray font-medium">{t?.["integrations.status.notConnected"] || "Not connected"}</span>
              </div>
            </div>
          </div>
          
          <p className="text-mediumGray text-sm mb-4 font-sans">
            {t?.["integrations.teams.description"] || "Capture key action and automate action items"}
          </p>
          
          {/* Dataflow visualization */}
          <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-rose/5 to-turquoise/5 rounded-xl p-3">
            <div className="text-xs font-medium text-forest">Teams</div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-turquoise" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 10h16l-8-8 2-2 12 12-12 12-2-2 8-8H2z"/>
              </svg>
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-forest to-turquoise flex items-center justify-center">
                <span className="text-white text-xs font-bold">L</span>
              </div>
              <svg className="w-4 h-4 text-turquoise" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 10h16l-8-8 2-2 12 12-12 12-2-2 8-8H2z"/>
              </svg>
            </div>
            <div className="text-xs font-medium text-forest">Lyyli</div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-mediumGray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-10 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Gmail - Data to Lyyli */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-forest/10 to-turquoise/10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M22.288 21l-10.944-6.64L.344 21A1.99 1.99 0 0 0 2 22h20c.75 0 1.467-.4 1.84-1.06-.226.04-.36.06-.552.06z" fill="#4285F4"/>
                <path d="M22.288 21L12 15l10.288-6.64A1.99 1.99 0 0 1 24 10v11c0 .75-.4 1.467-1.06 1.84-.04-.226-.06-.36-.652-.84z" fill="#34A853"/>
                <path d="M1.712 21L12 15 1.712 8.36A1.99 1.99 0 0 0 0 10v11c0 .75.4 1.467 1.06 1.84.04-.226.06-.36.652-.84z" fill="#FBBC04"/>
                <path d="M1.712 3L12 9l10.288-6A1.99 1.99 0 0 0 22 2H2c-.75 0-1.467.4-1.84 1.06.226-.04.36-.06.552-.06z" fill="#EA4335"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-forest">Gmail</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-mediumGray font-medium">{t?.["integrations.status.notConnected"] || "Not connected"}</span>
              </div>
            </div>
          </div>
          
          <p className="text-mediumGray text-sm mb-4 font-sans">
            {t?.["integrations.gmail.description"] || "Tracking all email communication and respond accordingly"}
          </p>
          
          {/* Dataflow visualization - One way to Lyyli */}
          <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-rose/5 to-turquoise/5 rounded-xl p-3">
            <div className="text-xs font-medium text-forest">Gmail</div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-turquoise" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 10h16l-8-8 2-2 12 12-12 12-2-2 8-8H2z"/>
              </svg>
            </div>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-forest to-turquoise flex items-center justify-center">
              <span className="text-white text-xs font-bold">L</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-mediumGray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-10 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Outlook - Data to Lyyli */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-forest/10 to-turquoise/10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M0 4.5A2.5 2.5 0 0 1 2.5 2h19A2.5 2.5 0 0 1 24 4.5v15a2.5 2.5 0 0 1-2.5 2.5h-19A2.5 2.5 0 0 1 0 19.5v-15z" fill="#0078D4"/>
                <path d="M12 14.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5.5.22.5.5-.22.5-.5.5zm-4-4c-.83 0-1.5-.67-1.5-1.5S7.17 7.5 8 7.5s1.5.67 1.5 1.5S8.83 10.5 8 10.5zm8 0c-.83 0-1.5-.67-1.5-1.5S15.17 7.5 16 7.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" fill="white"/>
                <path d="M4 6h16v12H4V6zm2 2v8h12V8H6z" fill="white"/>
                <path d="M7 10h10v1H7v-1zm0 2h10v1H7v-1zm0 2h7v1H7v-1z" fill="#0078D4"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-forest">Outlook</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-mediumGray font-medium">{t?.["integrations.status.notConnected"] || "Not connected"}</span>
              </div>
            </div>
          </div>
          
          <p className="text-mediumGray text-sm mb-4 font-sans">
            {t?.["integrations.outlook.description"] || "Schedule and track discussion effortlessly"}
          </p>
          
          {/* Dataflow visualization - One way to Lyyli */}
          <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-rose/5 to-turquoise/5 rounded-xl p-3">
            <div className="text-xs font-medium text-forest">Outlook</div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-turquoise" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 10h16l-8-8 2-2 12 12-12 12-2-2 8-8H2z"/>
              </svg>
            </div>
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-forest to-turquoise flex items-center justify-center">
              <span className="text-white text-xs font-bold">L</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-mediumGray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-10 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
              </div>
            </div>
          </div>
        </div>

        {/* LinkedIn - Data from Lyyli */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-forest/10 to-turquoise/10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" fill="#0A66C2"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-forest">LinkedIn</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-mediumGray font-medium">{t?.["integrations.status.notConnected"] || "Not connected"}</span>
              </div>
            </div>
          </div>
          
          <p className="text-mediumGray text-sm mb-4 font-sans">
            {t?.["integrations.linkedin.description"] || "Read post and publish new content with the power of AI"}
          </p>
          
          {/* Dataflow visualization - One way from Lyyli */}
          <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-rose/5 to-turquoise/5 rounded-xl p-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-forest to-turquoise flex items-center justify-center">
              <span className="text-white text-xs font-bold">L</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-turquoise" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 10h16l-8-8 2-2 12 12-12 12-2-2 8-8H2z"/>
              </svg>
            </div>
            <div className="text-xs font-medium text-forest">LinkedIn</div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-mediumGray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-10 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Threads - Data from Lyyli */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-forest/10 to-turquoise/10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM12.017 21.987c-5.518 0-9.988-4.47-9.988-9.988S6.499 2.001 12.017 2.001s9.988 4.47 9.988 9.988-4.47 9.988-9.988 9.988z" fill="black"/>
                <path d="M15.232 8.196c-.711 0-1.288.577-1.288 1.288s.577 1.288 1.288 1.288 1.288-.577 1.288-1.288-.577-1.288-1.288-1.288zm-6.464 0c-.711 0-1.288.577-1.288 1.288s.577 1.288 1.288 1.288 1.288-.577 1.288-1.288-.577-1.288-1.288-1.288zm3.232 6.464c-1.423 0-2.577-1.154-2.577-2.577s1.154-2.577 2.577-2.577 2.577 1.154 2.577 2.577-1.154 2.577-2.577 2.577z" fill="black"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-forest">Threads</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-mediumGray font-medium">{t?.["integrations.status.notConnected"] || "Not connected"}</span>
              </div>
            </div>
          </div>
          
          <p className="text-mediumGray text-sm mb-4 font-sans">
            {t?.["integrations.threads.description"] || "Read post and publish new content with the power of AI"}
          </p>
          
          {/* Dataflow visualization - One way from Lyyli */}
          <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-rose/5 to-turquoise/5 rounded-xl p-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-forest to-turquoise flex items-center justify-center">
              <span className="text-white text-xs font-bold">L</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-turquoise" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 10h16l-8-8 2-2 12 12-12 12-2-2 8-8H2z"/>
              </svg>
            </div>
            <div className="text-xs font-medium text-forest">Threads</div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-mediumGray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-10 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Facebook - Data from Lyyli */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-forest/10 to-turquoise/10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-forest">Facebook</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-mediumGray font-medium">{t?.["integrations.status.notConnected"] || "Not connected"}</span>
              </div>
            </div>
          </div>
          
          <p className="text-mediumGray text-sm mb-4 font-sans">
            {t?.["integrations.facebook.description"] || "Read post and publish new content with the power of AI"}
          </p>
          
          {/* Dataflow visualization - One way from Lyyli */}
          <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-rose/5 to-turquoise/5 rounded-xl p-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-forest to-turquoise flex items-center justify-center">
              <span className="text-white text-xs font-bold">L</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-turquoise" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 10h16l-8-8 2-2 12 12-12 12-2-2 8-8H2z"/>
              </svg>
            </div>
            <div className="text-xs font-medium text-forest">Facebook</div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-mediumGray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-10 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Instagram - Data from Lyyli */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-forest/10 to-turquoise/10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <defs>
                  <radialGradient id="instagram-gradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FDF497"/>
                    <stop offset="5%" stopColor="#FDF497"/>
                    <stop offset="45%" stopColor="#FD5949"/>
                    <stop offset="60%" stopColor="#D6249F"/>
                    <stop offset="90%" stopColor="#285AEB"/>
                  </radialGradient>
                </defs>
                <rect width="24" height="24" rx="5.4" fill="url(#instagram-gradient)"/>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="white"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-forest">Instagram</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-mediumGray font-medium">{t?.["integrations.status.notConnected"] || "Not connected"}</span>
              </div>
            </div>
          </div>
          
          <p className="text-mediumGray text-sm mb-4 font-sans">
            {t?.["integrations.instagram.description"] || "Read post and publish new content with the power of AI"}
          </p>
          
          {/* Dataflow visualization - One way from Lyyli */}
          <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-rose/5 to-turquoise/5 rounded-xl p-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-forest to-turquoise flex items-center justify-center">
              <span className="text-white text-xs font-bold">L</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-turquoise" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 10h16l-8-8 2-2 12 12-12 12-2-2 8-8H2z"/>
              </svg>
            </div>
            <div className="text-xs font-medium text-forest">Instagram</div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-mediumGray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-10 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></div>
              </div>
            </div>
          </div>
        </div>

        {/* X (Twitter) - Coming Soon */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-dashed border-gray-300 hover:shadow-xl transition-all duration-300 opacity-60">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="black"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-forest">X (Twitter)</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="bg-rose/20 text-rose text-xs px-2 py-1 rounded-full font-medium">{t?.["common.comingSoon"] || "Coming soon"}</div>
              </div>
            </div>
          </div>
          
          <p className="text-mediumGray text-sm mb-4 font-sans">
            {t?.["integrations.twitter.description"] || "Read post and publish new content with the power of AI"}
          </p>
          
          {/* Dataflow visualization - Disabled */}
          <div className="flex items-center justify-between mb-4 bg-gray-100 rounded-xl p-3">
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-xs font-bold">L</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 10h16l-8-8 2-2 12 12-12 12-2-2 8-8H2z"/>
              </svg>
            </div>
            <div className="text-xs font-medium text-gray-400">X (Twitter)</div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-mediumGray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12a3 3 0 106 0v12z" />
              </svg>
            </div>
            <div className="relative opacity-50 pointer-events-none">
              <div className="w-10 h-6 bg-gray-300 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* SharePoint - Coming Soon */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-dashed border-gray-300 hover:shadow-xl transition-all duration-300 opacity-60">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#0078D4"/>
                <path d="M8 8h8v8H8z" fill="white"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-forest">SharePoint</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="bg-rose/20 text-rose text-xs px-2 py-1 rounded-full font-medium">{t?.["common.comingSoon"] || "Coming soon"}</div>
              </div>
            </div>
          </div>
          <p className="text-mediumGray text-sm mb-4 font-sans">{t?.["integrations.sharepoint.description"] || "Search and attach files from your SharePoint libraries."}</p>
          <div className="flex items-center justify-between mb-4 bg-gray-100 rounded-xl p-3">
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-xs font-bold">L</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 10h16l-8-8 2-2 12 12-12 12-2-2 8-8H2z"/>
              </svg>
            </div>
            <div className="text-xs font-medium text-gray-400">SharePoint</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-mediumGray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12a3 3 0 106 0v12z" />
              </svg>
            </div>
            <div className="relative opacity-50 pointer-events-none">
              <div className="w-10 h-6 bg-gray-300 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Most common CRMs - Coming Soon */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-dashed border-gray-300 hover:shadow-xl transition-all duration-300 opacity-60">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="4" width="16" height="16" rx="4" fill="#2F5D50"/>
                <path d="M8 12h8M8 15h5M8 9h6" stroke="white" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-forest">{t?.["integrations.crms.title"] || "Most common CRM's"}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="bg-rose/20 text-rose text-xs px-2 py-1 rounded-full font-medium">{t?.["common.comingSoon"] || "Coming soon"}</div>
              </div>
            </div>
          </div>
          <p className="text-mediumGray text-sm mb-4 font-sans">{t?.["integrations.crms.description"] || "Sync contacts and activities with leading CRM platforms."}</p>
          <div className="flex items-center justify-between mb-4 bg-gray-100 rounded-xl p-3">
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-xs font-bold">L</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 10h16l-8-8 2-2 12 12-12 12-2-2 8-8H2z"/>
              </svg>
            </div>
            <div className="text-xs font-medium text-gray-400">CRM Platforms</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-mediumGray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12a3 3 0 106 0v12z" />
              </svg>
            </div>
            <div className="relative opacity-50 pointer-events-none">
              <div className="w-10 h-6 bg-gray-300 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter & marketing email apps - Coming Soon */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-dashed border-gray-300 hover:shadow-xl transition-all duration-300 opacity-60">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path d="M3 7h18v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" stroke="#A7D6D1" strokeWidth="1.5"/>
                <path d="M3 7l9 6 9-6" stroke="#2F5D50" strokeWidth="1.5"/>
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-forest">{t?.["integrations.emailApps.title"] || "Newsletter & marketing email apps"}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="bg-rose/20 text-rose text-xs px-2 py-1 rounded-full font-medium">{t?.["common.comingSoon"] || "Coming soon"}</div>
              </div>
            </div>
          </div>
          <p className="text-mediumGray text-sm mb-4 font-sans">{t?.["integrations.emailApps.description"] || "Publish campaigns to your preferred email platforms."}</p>
          <div className="flex items-center justify-between mb-4 bg-gray-100 rounded-xl p-3">
            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
              <span className="text-gray-500 text-xs font-bold">L</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 10h16l-8-8 2-2 12 12-12 12-2-2 8-8H2z"/>
              </svg>
            </div>
            <div className="text-xs font-medium text-gray-400">Email platforms</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-mediumGray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12a3 3 0 106 0v12z" />
              </svg>
            </div>
            <div className="relative opacity-50 pointer-events-none">
              <div className="w-10 h-6 bg-gray-300 rounded-full relative">
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}