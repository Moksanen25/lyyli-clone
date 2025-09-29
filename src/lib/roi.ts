export interface RoiInput {
  teamSize: number; // number of people in communications-related roles
  currentTimeHoursPerWeek: number; // hours per person per week spent on comms
  hourlyRate?: number; // € per hour per person
  planMonthlyCost?: number; // € per month (flat comparison)
  productivityMultiplier?: number; // e.g., 1.5 means 50% more output with same time
}

export interface RoiResult {
  timeSavedPerPersonHoursPerWeek: number;
  timeSavedPercent: number; // percent of current time saved per person
  productivityBoostPercent: number; // (multiplier - 1) * 100
  weeklySavingsPerPerson: number; // €
  monthlySavingsGross: number; // € for team
  yearlySavingsGross: number; // € for team
  monthlyNetSavings: number; // € for team after plan cost
  yearlyNetSavings: number; // € for team after plan cost
  fteEquivalent: number; // FTE saved across team
  totalTimeSavedTeamHoursPerWeek: number;
}

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


