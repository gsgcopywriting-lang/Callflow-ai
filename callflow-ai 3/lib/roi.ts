export type ROIInputs = {
  missedCalls: number;
  customerValue: number;
  conversionRate: number;
};

export type ROIResult = {
  lostRevenueMonthly: number;
  recoveredRevenueMonthly: number;
  annualROIMultiplier: number;
};

const MONTHLY_PLAN_COST = 297;
const CALLFLOW_CAPTURE_RATE = 0.85; // share of previously-missed calls Ava answers
const WEEKS_PER_MONTH = 4.33;

export function calculateROI({
  missedCalls,
  customerValue,
  conversionRate,
}: ROIInputs): ROIResult {
  const conversion = conversionRate / 100;
  const monthlyMissedCalls = missedCalls * WEEKS_PER_MONTH;

  const lostRevenueMonthly = Math.round(
    monthlyMissedCalls * conversion * customerValue
  );

  const recoveredRevenueMonthly = Math.round(
    lostRevenueMonthly * CALLFLOW_CAPTURE_RATE
  );

  const annualRecovered = recoveredRevenueMonthly * 12;
  const annualCost = MONTHLY_PLAN_COST * 12;
  const annualROIMultiplier = annualCost > 0 ? annualRecovered / annualCost : 0;

  return { lostRevenueMonthly, recoveredRevenueMonthly, annualROIMultiplier };
}
