import { TranslationKeys } from "../../lib/i18n";
import { IconSet } from "../IconSet";

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
              <IconSet.Slack size={32} />
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
              <IconSet.MicrosoftTeams size={32} />
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
              <IconSet.Gmail size={32} />
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
              <IconSet.Outlook size={32} />
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
              <IconSet.LinkedIn size={32} />
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
              <IconSet.Threads size={32} />
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
              <IconSet.Facebook size={32} />
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
              <IconSet.Instagram size={32} />
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
              <IconSet.XTwitter size={32} />
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
              <IconSet.SharePoint size={32} />
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