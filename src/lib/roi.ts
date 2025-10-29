/**
 * ROI Calculator - Input Parameters
 * Defines the input parameters for calculating return on investment
 */
export interface RoiInput {
  /** Number of people in communications-related roles */
  teamSize: number;
  /** Hours per person per week spent on communications */
  currentTimeHoursPerWeek: number;
  /** Hourly rate per person (€). Default: 60 */
  hourlyRate?: number;
  /** Monthly plan cost (€). Default: 199 */
  planMonthlyCost?: number;
  /** Productivity multiplier (e.g., 1.5 means 50% more output). Default: 1.5 */
  productivityMultiplier?: number;
}

/**
 * ROI Calculator - Result Metrics
 * Contains all calculated ROI metrics including time savings and cost savings
 */
export interface RoiResult {
  /** Hours saved per person per week */
  timeSavedPerPersonHoursPerWeek: number;
  /** Percent of current time saved per person */
  timeSavedPercent: number;
  /** Productivity boost percentage ((multiplier - 1) * 100) */
  productivityBoostPercent: number;
  /** Weekly savings per person (€) */
  weeklySavingsPerPerson: number;
  /** Monthly gross savings for the entire team (€) */
  monthlySavingsGross: number;
  /** Yearly gross savings for the entire team (€) */
  yearlySavingsGross: number;
  /** Monthly net savings after plan cost (€) */
  monthlyNetSavings: number;
  /** Yearly net savings after plan cost (€) */
  yearlyNetSavings: number;
  /** Full-time equivalent (FTE) saved across the team */
  fteEquivalent: number;
  /** Total hours saved for the entire team per week */
  totalTimeSavedTeamHoursPerWeek: number;
}

/**
 * Calculate comprehensive ROI metrics based on team size and productivity gains
 * 
 * This function calculates time savings, cost savings, and productivity improvements
 * when using the Lyyli platform. It accounts for the team size, current time spent,
 * and expected productivity multiplier.
 * 
 * @param input - ROI calculation parameters
 * @returns Comprehensive ROI metrics including time and cost savings
 * 
 * @example
 * ```typescript
 * const result = computeRoiMetrics({
 *   teamSize: 10,
 *   currentTimeHoursPerWeek: 8,
 *   hourlyRate: 60,
 *   planMonthlyCost: 199,
 *   productivityMultiplier: 1.5
 * });
 * console.log(`Monthly savings: €${result.monthlyNetSavings}`);
 * ```
 */
export function computeRoiMetrics(input: RoiInput): RoiResult {
  const {
    teamSize,
    currentTimeHoursPerWeek,
    hourlyRate = 60,
    planMonthlyCost = 199,
    productivityMultiplier = 1.5,
  } = input;

  const weeksPerMonth = 4.33;
  const workingHoursPerWeek = 40;

  // If output is 1.5x with same time, then time per unit drops by 1/1.5.
  // Time saved ratio when keeping the same output volume:
  const timeSavedRatio = 1 - (1 / productivityMultiplier); // e.g., 0.333...

  const timeSavedPerPersonHoursPerWeek = currentTimeHoursPerWeek * timeSavedRatio;
  const timeSavedPercent = timeSavedRatio * 100;
  const productivityBoostPercent = (productivityMultiplier - 1) * 100;

  const weeklySavingsPerPerson = timeSavedPerPersonHoursPerWeek * hourlyRate;

  const monthlySavingsGross = weeklySavingsPerPerson * weeksPerMonth * teamSize;
  const yearlySavingsGross = monthlySavingsGross * 12;

  const monthlyNetSavings = monthlySavingsGross - planMonthlyCost;
  const yearlyNetSavings = monthlyNetSavings * 12;

  const totalTimeSavedTeamHoursPerWeek = timeSavedPerPersonHoursPerWeek * teamSize;
  const fteEquivalent = totalTimeSavedTeamHoursPerWeek / workingHoursPerWeek; // FTE across team

  return {
    timeSavedPerPersonHoursPerWeek,
    timeSavedPercent,
    productivityBoostPercent,
    weeklySavingsPerPerson,
    monthlySavingsGross,
    yearlySavingsGross,
    monthlyNetSavings,
    yearlyNetSavings,
    fteEquivalent,
    totalTimeSavedTeamHoursPerWeek,
  };
}


