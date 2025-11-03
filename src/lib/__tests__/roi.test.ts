import { computeRoiMetrics, type RoiInput } from '../roi';

describe('ROI Calculator - computeRoiMetrics', () => {
  describe('Basic Calculations', () => {
    it('calculates ROI metrics with default parameters', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 8,
      };

      const result = computeRoiMetrics(input);

      expect(result).toHaveProperty('timeSavedPerPersonHoursPerWeek');
      expect(result).toHaveProperty('timeSavedPercent');
      expect(result).toHaveProperty('productivityBoostPercent');
      expect(result).toHaveProperty('weeklySavingsPerPerson');
      expect(result).toHaveProperty('monthlySavingsGross');
      expect(result).toHaveProperty('yearlySavingsGross');
      expect(result).toHaveProperty('monthlyNetSavings');
      expect(result).toHaveProperty('yearlyNetSavings');
      expect(result).toHaveProperty('fteEquivalent');
      expect(result).toHaveProperty('totalTimeSavedTeamHoursPerWeek');
    });

    it('calculates correct time savings with 1.5x productivity multiplier', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 9, // 9 hours per week
        hourlyRate: 60,
        planMonthlyCost: 199,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      // With 1.5x multiplier, time saved ratio = 1 - (1/1.5) = 0.333...
      // Time saved = 9 * 0.333... = 3 hours per person per week
      expect(result.timeSavedPerPersonHoursPerWeek).toBeCloseTo(3, 1);

      // Time saved percent should be ~33.33%
      expect(result.timeSavedPercent).toBeCloseTo(33.33, 1);

      // Productivity boost = (1.5 - 1) * 100 = 50%
      expect(result.productivityBoostPercent).toBe(50);
    });

    it('calculates correct monetary savings', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 9,
        hourlyRate: 60,
        planMonthlyCost: 199,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      // Weekly savings per person = 3 hours * €60 = €180
      expect(result.weeklySavingsPerPerson).toBeCloseTo(180, 0);

      // Monthly gross savings = €180 * 4.33 weeks * 10 people = €7,794
      expect(result.monthlySavingsGross).toBeCloseTo(7794, 0);

      // Yearly gross savings = €7,794 * 12 = €93,528
      expect(result.yearlySavingsGross).toBeCloseTo(93528, 0);

      // Monthly net savings = €7,794 - €199 = €7,595
      expect(result.monthlyNetSavings).toBeCloseTo(7595, 0);

      // Yearly net savings = €7,595 * 12 = €91,140
      expect(result.yearlyNetSavings).toBeCloseTo(91140, 0);
    });

    it('calculates correct FTE equivalent', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 12, // 12 hours per week per person
        hourlyRate: 60,
        planMonthlyCost: 199,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      // Time saved per person = 12 * (1 - 1/1.5) = 4 hours
      // Total time saved = 4 * 10 = 40 hours per week
      // FTE = 40 / 40 = 1 FTE
      expect(result.totalTimeSavedTeamHoursPerWeek).toBeCloseTo(40, 0);
      expect(result.fteEquivalent).toBeCloseTo(1, 1);
    });
  });

  describe('Different Team Sizes', () => {
    it('scales correctly with small team (5 people)', () => {
      const input: RoiInput = {
        teamSize: 5,
        currentTimeHoursPerWeek: 8,
        hourlyRate: 60,
        planMonthlyCost: 199,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      // Smaller team = lower total savings
      expect(result.monthlySavingsGross).toBeLessThan(5000);
      expect(result.totalTimeSavedTeamHoursPerWeek).toBeCloseTo(13.33, 1);
    });

    it('scales correctly with medium team (25 people)', () => {
      const input: RoiInput = {
        teamSize: 25,
        currentTimeHoursPerWeek: 8,
        hourlyRate: 60,
        planMonthlyCost: 199,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      // Larger team = higher total savings
      expect(result.monthlySavingsGross).toBeGreaterThan(10000);
      expect(result.totalTimeSavedTeamHoursPerWeek).toBeCloseTo(66.67, 1);
    });

    it('scales correctly with large team (100 people)', () => {
      const input: RoiInput = {
        teamSize: 100,
        currentTimeHoursPerWeek: 8,
        hourlyRate: 60,
        planMonthlyCost: 199,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      // Very large team = substantial savings
      expect(result.monthlySavingsGross).toBeGreaterThan(50000);
      expect(result.fteEquivalent).toBeGreaterThan(6);
    });
  });

  describe('Different Hourly Rates', () => {
    it('calculates correctly with lower hourly rate (€40)', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 8,
        hourlyRate: 40,
        planMonthlyCost: 199,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      // Lower hourly rate = lower savings
      const expectedWeeklySavings = 8 * (1 - 1 / 1.5) * 40;
      expect(result.weeklySavingsPerPerson).toBeCloseTo(
        expectedWeeklySavings,
        1
      );
    });

    it('calculates correctly with higher hourly rate (€100)', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 8,
        hourlyRate: 100,
        planMonthlyCost: 199,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      // Higher hourly rate = higher savings
      const expectedWeeklySavings = 8 * (1 - 1 / 1.5) * 100;
      expect(result.weeklySavingsPerPerson).toBeCloseTo(
        expectedWeeklySavings,
        1
      );
    });
  });

  describe('Different Productivity Multipliers', () => {
    it('calculates correctly with 2x productivity multiplier', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 8,
        hourlyRate: 60,
        planMonthlyCost: 199,
        productivityMultiplier: 2.0,
      };

      const result = computeRoiMetrics(input);

      // 2x multiplier = 50% time saved (1 - 1/2 = 0.5)
      expect(result.timeSavedPercent).toBeCloseTo(50, 0);
      expect(result.timeSavedPerPersonHoursPerWeek).toBeCloseTo(4, 1);
      expect(result.productivityBoostPercent).toBe(100);
    });

    it('calculates correctly with 1.25x productivity multiplier', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 8,
        hourlyRate: 60,
        planMonthlyCost: 199,
        productivityMultiplier: 1.25,
      };

      const result = computeRoiMetrics(input);

      // 1.25x multiplier = 20% time saved (1 - 1/1.25 = 0.2)
      expect(result.timeSavedPercent).toBeCloseTo(20, 0);
      expect(result.timeSavedPerPersonHoursPerWeek).toBeCloseTo(1.6, 1);
      expect(result.productivityBoostPercent).toBe(25);
    });

    it('calculates correctly with 3x productivity multiplier', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 8,
        hourlyRate: 60,
        planMonthlyCost: 199,
        productivityMultiplier: 3.0,
      };

      const result = computeRoiMetrics(input);

      // 3x multiplier = 66.67% time saved (1 - 1/3 = 0.6667)
      expect(result.timeSavedPercent).toBeCloseTo(66.67, 1);
      expect(result.timeSavedPerPersonHoursPerWeek).toBeCloseTo(5.33, 1);
      expect(result.productivityBoostPercent).toBe(200);
    });
  });

  describe('Different Plan Costs', () => {
    it('accounts for plan cost correctly in net savings', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 8,
        hourlyRate: 60,
        planMonthlyCost: 299, // Higher plan cost
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      // Net savings should be €100 less per month than with €199 plan
      expect(result.monthlyNetSavings).toBeLessThan(result.monthlySavingsGross);
      expect(result.monthlySavingsGross - result.monthlyNetSavings).toBe(299);
    });

    it('handles free tier (zero cost)', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 8,
        hourlyRate: 60,
        planMonthlyCost: 0,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      // Net savings should equal gross savings
      expect(result.monthlyNetSavings).toBe(result.monthlySavingsGross);
    });
  });

  describe('Real-World Scenarios', () => {
    it('calculates ROI for typical small agency', () => {
      const input: RoiInput = {
        teamSize: 15,
        currentTimeHoursPerWeek: 6,
        hourlyRate: 75,
        planMonthlyCost: 199,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      expect(result.timeSavedPerPersonHoursPerWeek).toBeCloseTo(2, 0);
      expect(result.weeklySavingsPerPerson).toBeCloseTo(150, 0);
      expect(result.monthlyNetSavings).toBeGreaterThan(9000);
      expect(result.yearlyNetSavings).toBeGreaterThan(100000);
    });

    it('calculates ROI for enterprise team', () => {
      const input: RoiInput = {
        teamSize: 50,
        currentTimeHoursPerWeek: 10,
        hourlyRate: 80,
        planMonthlyCost: 499, // Enterprise plan
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      expect(result.timeSavedPerPersonHoursPerWeek).toBeCloseTo(3.33, 1);
      expect(result.totalTimeSavedTeamHoursPerWeek).toBeCloseTo(166.67, 1);
      expect(result.fteEquivalent).toBeGreaterThan(4);
      expect(result.monthlyNetSavings).toBeGreaterThan(50000);
    });

    it('calculates ROI for communications-heavy organization', () => {
      const input: RoiInput = {
        teamSize: 30,
        currentTimeHoursPerWeek: 15, // Spends a lot of time on comms
        hourlyRate: 65,
        planMonthlyCost: 299,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      expect(result.timeSavedPerPersonHoursPerWeek).toBeCloseTo(5, 0);
      expect(result.totalTimeSavedTeamHoursPerWeek).toBeCloseTo(150, 0);
      expect(result.fteEquivalent).toBeCloseTo(3.75, 1);
    });
  });

  describe('Edge Cases', () => {
    it('handles minimum viable team (1 person)', () => {
      const input: RoiInput = {
        teamSize: 1,
        currentTimeHoursPerWeek: 8,
        hourlyRate: 60,
        planMonthlyCost: 199,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      expect(result.timeSavedPerPersonHoursPerWeek).toBeCloseTo(2.67, 1);
      expect(result.monthlyNetSavings).toBeGreaterThan(0);
    });

    it('handles very low time spent (1 hour per week)', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 1,
        hourlyRate: 60,
        planMonthlyCost: 199,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      expect(result.timeSavedPerPersonHoursPerWeek).toBeCloseTo(0.33, 1);
      expect(result.weeklySavingsPerPerson).toBeCloseTo(20, 0);
    });

    it('handles very high time spent (30 hours per week)', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 30,
        hourlyRate: 60,
        planMonthlyCost: 199,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      expect(result.timeSavedPerPersonHoursPerWeek).toBeCloseTo(10, 0);
      expect(result.weeklySavingsPerPerson).toBeCloseTo(600, 0);
    });

    it('handles zero plan cost edge case', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 8,
        hourlyRate: 60,
        planMonthlyCost: 0,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      expect(result.monthlyNetSavings).toBe(result.monthlySavingsGross);
      expect(result.yearlyNetSavings).toBe(result.yearlySavingsGross);
    });
  });

  describe('Return Value Consistency', () => {
    it('ensures yearly values are 12x monthly values', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 8,
        hourlyRate: 60,
        planMonthlyCost: 199,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      expect(result.yearlySavingsGross).toBeCloseTo(
        result.monthlySavingsGross * 12,
        0
      );
      expect(result.yearlyNetSavings).toBeCloseTo(
        result.monthlyNetSavings * 12,
        0
      );
    });

    it('ensures net savings account for plan cost correctly', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 8,
        hourlyRate: 60,
        planMonthlyCost: 199,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      expect(result.monthlyNetSavings).toBe(result.monthlySavingsGross - 199);
    });

    it('ensures all numeric values are positive', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 8,
        hourlyRate: 60,
        planMonthlyCost: 199,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      expect(result.timeSavedPerPersonHoursPerWeek).toBeGreaterThan(0);
      expect(result.timeSavedPercent).toBeGreaterThan(0);
      expect(result.productivityBoostPercent).toBeGreaterThan(0);
      expect(result.weeklySavingsPerPerson).toBeGreaterThan(0);
      expect(result.monthlySavingsGross).toBeGreaterThan(0);
      expect(result.yearlySavingsGross).toBeGreaterThan(0);
      expect(result.fteEquivalent).toBeGreaterThan(0);
      expect(result.totalTimeSavedTeamHoursPerWeek).toBeGreaterThan(0);
    });
  });

  describe('Mathematical Accuracy', () => {
    it('validates the time saved formula', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 8,
        hourlyRate: 60,
        planMonthlyCost: 199,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      // Manual calculation
      const timeSavedRatio = 1 - 1 / 1.5; // 0.333...
      const expectedTimeSaved = 8 * timeSavedRatio;

      expect(result.timeSavedPerPersonHoursPerWeek).toBeCloseTo(
        expectedTimeSaved,
        2
      );
    });

    it('validates the weekly savings formula', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 8,
        hourlyRate: 60,
        planMonthlyCost: 199,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      const expectedWeeklySavings = result.timeSavedPerPersonHoursPerWeek * 60;
      expect(result.weeklySavingsPerPerson).toBeCloseTo(
        expectedWeeklySavings,
        2
      );
    });

    it('validates the FTE calculation', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 8,
        hourlyRate: 60,
        planMonthlyCost: 199,
        productivityMultiplier: 1.5,
      };

      const result = computeRoiMetrics(input);

      const expectedFTE = result.totalTimeSavedTeamHoursPerWeek / 40;
      expect(result.fteEquivalent).toBeCloseTo(expectedFTE, 2);
    });
  });

  describe('Input Validation', () => {
    it('uses default values when optional parameters not provided', () => {
      const input: RoiInput = {
        teamSize: 10,
        currentTimeHoursPerWeek: 8,
      };

      const result = computeRoiMetrics(input);

      // Should use defaults: hourlyRate=60, planMonthlyCost=199, productivityMultiplier=1.5
      expect(result).toBeDefined();
      expect(result.weeklySavingsPerPerson).toBeCloseTo(160, 0); // (8 * 0.333 * 60)
    });

    it('accepts custom values for all parameters', () => {
      const input: RoiInput = {
        teamSize: 20,
        currentTimeHoursPerWeek: 10,
        hourlyRate: 75,
        planMonthlyCost: 299,
        productivityMultiplier: 2.0,
      };

      const result = computeRoiMetrics(input);

      expect(result).toBeDefined();
      expect(result.timeSavedPercent).toBeCloseTo(50, 0);
    });
  });
});
