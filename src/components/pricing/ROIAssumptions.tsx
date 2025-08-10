import { TranslationKeys } from '../../lib/i18n';

interface ROIAssumptionsProps {
  translations: TranslationKeys;
}

export default function ROIAssumptions({ translations }: ROIAssumptionsProps) {
  const t = translations;

  const assumptions = [
    t['pricing.assumptions.efficiency'],
    t['pricing.assumptions.time'],
    t['pricing.assumptions.cost'],
    t['pricing.assumptions.overhead']
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="heading-3 mb-4 text-forest-green">
          {t['pricing.assumptions.title']}
        </h2>
      </div>
      
      <div className="bg-soft-rose p-8 rounded-lg">
        <ul className="space-y-4">
          {assumptions.map((assumption, index) => (
            <li key={index} className="flex items-start gap-3">
              <svg 
                className="w-5 h-5 text-forest-green mt-0.5 flex-shrink-0" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="body-text text-dark-gray">
                {assumption}
              </span>
            </li>
          ))}
        </ul>
        
        <div className="mt-6 p-4 bg-white rounded-lg border-l-4 border-muted-turquoise">
          <p className="small-text text-medium-gray">
            <strong>Note:</strong> ROI calculations are estimates based on typical customer outcomes and industry benchmarks. 
            Actual results may vary depending on your organization&apos;s specific communication patterns, team size, and implementation approach.
          </p>
        </div>
      </div>
    </div>
  );
}
