/**
 * Example Component: Integration Icons Usage
 * 
 * This file demonstrates various ways to use the branded integration icons
 * from the centralized IconSet component.
 */

import { IconSet } from "@/components/IconSet";

/**
 * Example 1: Simple Icon Grid
 * Perfect for displaying available integrations
 */
export function IntegrationIconGrid() {
  const integrations = [
    { name: "Slack", Icon: IconSet.Slack },
    { name: "Teams", Icon: IconSet.MicrosoftTeams },
    { name: "Gmail", Icon: IconSet.Gmail },
    { name: "Outlook", Icon: IconSet.Outlook },
    { name: "LinkedIn", Icon: IconSet.LinkedIn },
    { name: "Facebook", Icon: IconSet.Facebook },
    { name: "Instagram", Icon: IconSet.Instagram },
    { name: "Threads", Icon: IconSet.Threads },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {integrations.map((integration) => {
        const Icon = integration.Icon;
        return (
          <div key={integration.name} className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-gradient-to-br from-forest/10 to-turquoise/10 rounded-2xl flex items-center justify-center shadow-sm hover:shadow-lg transition-shadow">
              <Icon size={40} />
            </div>
            <span className="text-sm font-medium text-forest">{integration.name}</span>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Example 2: Connection Status Cards
 * Shows integration status with icons
 */
export function ConnectionStatusCard({ 
  service, 
  connected 
}: { 
  service: "slack" | "teams" | "gmail" | "outlook";
  connected: boolean;
}) {
  const iconMap = {
    slack: IconSet.Slack,
    teams: IconSet.MicrosoftTeams,
    gmail: IconSet.Gmail,
    outlook: IconSet.Outlook,
  };

  const Icon = iconMap[service];
  const statusColor = connected ? "bg-green-500" : "bg-gray-400";

  return (
    <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
            <Icon size={32} />
          </div>
          <div className={`absolute -top-1 -right-1 w-4 h-4 ${statusColor} rounded-full border-2 border-white`} />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 capitalize">{service}</h3>
          <p className="text-sm text-gray-600">
            {connected ? "Connected" : "Not connected"}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Example 3: Social Media Footer
 * Using social media icons in a footer
 */
export function SocialMediaFooter() {
  const socialLinks = [
    { name: "LinkedIn", Icon: IconSet.LinkedIn, url: "#" },
    { name: "Twitter", Icon: IconSet.XTwitter, url: "#" },
    { name: "Facebook", Icon: IconSet.Facebook, url: "#" },
    { name: "Instagram", Icon: IconSet.Instagram, url: "#" },
  ];

  return (
    <footer className="bg-forest text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-6">
          {socialLinks.map((social) => {
            const Icon = social.Icon;
            return (
              <a
                key={social.name}
                href={social.url}
                className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label={social.name}
              >
                <Icon size={24} />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

/**
 * Example 4: Integration Setup Wizard
 * Step-by-step integration setup with icons
 */
export function IntegrationWizard() {
  const steps = [
    {
      step: 1,
      title: "Connect Slack",
      description: "Link your Slack workspace",
      Icon: IconSet.Slack,
      completed: true,
    },
    {
      step: 2,
      title: "Connect Teams",
      description: "Link your Microsoft Teams",
      Icon: IconSet.MicrosoftTeams,
      completed: true,
    },
    {
      step: 3,
      title: "Connect Email",
      description: "Link Gmail or Outlook",
      Icon: IconSet.Gmail,
      completed: false,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {steps.map((step) => {
        const Icon = step.Icon;
        return (
          <div
            key={step.step}
            className={`flex items-center gap-4 p-4 rounded-xl border-2 ${
              step.completed
                ? "bg-green-50 border-green-200"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
              <Icon size={32} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{step.title}</h3>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
            {step.completed && (
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <IconSet.Check size={20} className="text-white" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Example 5: Inline Icon with Text
 * Using icons inline with text content
 */
export function IntegrationFeature() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <IconSet.Slack size={24} />
        <p className="text-gray-700">
          Send automated messages directly to your Slack channels
        </p>
      </div>
      <div className="flex items-center gap-3">
        <IconSet.MicrosoftTeams size={24} />
        <p className="text-gray-700">
          Collaborate seamlessly with Microsoft Teams integration
        </p>
      </div>
      <div className="flex items-center gap-3">
        <IconSet.Gmail size={24} />
        <p className="text-gray-700">
          Sync your Gmail inbox and automate email responses
        </p>
      </div>
    </div>
  );
}

/**
 * Example 6: Hover Effect Cards
 * Interactive cards with hover effects
 */
export function HoverIntegrationCards() {
  const integrations = [
    { name: "Slack", Icon: IconSet.Slack, color: "from-[#E01E5A]/10 to-[#36C5F0]/10" },
    { name: "Teams", Icon: IconSet.MicrosoftTeams, color: "from-[#5059C9]/10 to-[#5059C9]/20" },
    { name: "Gmail", Icon: IconSet.Gmail, color: "from-[#4285F4]/10 to-[#EA4335]/10" },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {integrations.map((integration) => {
        const Icon = integration.Icon;
        return (
          <div
            key={integration.name}
            className="group cursor-pointer"
          >
            <div className={`bg-gradient-to-br ${integration.color} rounded-2xl p-8 hover:scale-105 transition-transform`}>
              <div className="flex flex-col items-center gap-3">
                <Icon size={64} />
                <h3 className="font-semibold text-lg text-gray-900">{integration.name}</h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

