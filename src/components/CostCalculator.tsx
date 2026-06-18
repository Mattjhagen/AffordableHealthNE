/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  Building2, 
  HelpCircle, 
  ArrowRight, 
  TrendingUp, 
  AlertTriangle, 
  ShieldAlert,
  Coins,
  Frown,
  UtensilsCrossed,
  Droplet,
  Pill
} from "lucide-react";
import { motion } from "motion/react";

export default function CostCalculator() {
  const [familySize, setFamilySize] = useState<number>(3);
  const [monthlyPremium, setMonthlyPremium] = useState<number>(450);
  const [hasDeductible, setHasDeductible] = useState<boolean>(true);
  const [deductibleAmt, setDeductibleAmt] = useState<number>(3500);

  // Core estimates: Nebraska premiums are among the highest in the country.
  // When tax credits expired or get slashed, a typical family faces an average
  // increase of 30-40% in monthly premiums, plus high deductibles.
  const estimatedTaxCreditLoss = Math.round(monthlyPremium * 0.35); // 35% average tax credit support loss without expansion
  const yearlyPremiumIncrease = estimatedTaxCreditLoss * 12;

  // Equivalencies (What that yearly premium increase represents in basic needs)
  const equivalentGroceriesWeeks = Math.round(yearlyPremiumIncrease / 150); // $150 average groceries/week for family
  const equivalentUtilityMonths = Math.round(yearlyPremiumIncrease / 220); // $220 average utility bill/month
  const equivalentPrescriptions = Math.round(yearlyPremiumIncrease / 45); // $45 average co-pay/prescription

  return (
    <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-6 lg:p-8" id="cost-calculator">
      <div className="max-w-2xl">
        <span className="text-red-700 text-xs font-bold uppercase tracking-wider bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
          Interactive Cost Tool
        </span>
        <h3 className="text-2xl font-bold text-stone-900 mt-2.5 tracking-tight font-sans">
          The Nebraska Cost Burden Calculator
        </h3>
        <p className="text-stone-600 text-sm mt-2 leading-relaxed">
          Nebraska’s health insurance premiums are among the highest in the nation. Calculate the estimated impact of expiring ACA tax credits and see what that cost represents in basic family needs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Controls - Left side (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Family Size */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-stone-800 text-xs font-bold uppercase tracking-wider block">
                Family Size
              </span>
              <span className="text-stone-900 font-bold text-sm bg-white border px-2.5 py-0.5 rounded-md shadow-xs">
                {familySize} {familySize === 1 ? "Person" : "People"}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="7"
              value={familySize}
              onChange={(e) => setFamilySize(parseInt(e.target.value, 10))}
              className="w-full accent-red-700 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>Single</span>
              <span>Average Family</span>
              <span>Large Family (7+)</span>
            </div>
          </div>

          {/* Monthly Premium */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-stone-800 text-xs font-bold uppercase tracking-wider block">
                Estimated Monthly Premium
              </span>
              <span className="text-stone-900 font-bold text-sm bg-white border px-2.5 py-0.5 rounded-md shadow-xs">
                ${monthlyPremium}/mo
              </span>
            </div>
            <input
              type="range"
              min="150"
              max="1500"
              step="50"
              value={monthlyPremium}
              onChange={(e) => setMonthlyPremium(parseInt(e.target.value, 10))}
              className="w-full accent-red-700 h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-stone-400 mt-1">
              <span>$150/mo</span>
              <span>$750/mo</span>
              <span>$1,500/mo</span>
            </div>
          </div>

          {/* Deductible checkbox & custom control */}
          <div className="bg-white p-4 rounded-xl border border-stone-200/50 shadow-xs">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="hasDeductible"
                checked={hasDeductible}
                onChange={(e) => setHasDeductible(e.target.checked)}
                className="h-4 w-4 rounded border-stone-300 text-red-600 focus:ring-red-500"
              />
              <label htmlFor="hasDeductible" className="text-stone-800 text-xs font-bold uppercase cursor-pointer">
                Include Medical Deductible
              </label>
            </div>
            
            {hasDeductible && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-3.5 pt-3.5 border-t border-stone-100"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-stone-500 text-xs">
                    Annual Deductible Amount
                  </span>
                  <span className="text-amber-700 font-bold text-xs bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">
                    ${deductibleAmt.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="500"
                  value={deductibleAmt}
                  onChange={(e) => setDeductibleAmt(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-600 h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-[10px] text-stone-400 mt-2 leading-relaxed">
                  In Nebraska, many plans on the ACA marketplace have high deductibles, meaning working families must pay thousands out-of-pocket before benefits even kick in.
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Results - Right side (5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-5">
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-widest">
              Estimated Monthly Increase Cost
            </h4>

            {/* Premium loss indicator */}
            <div className="flex items-baseline gap-1 animate-pulse">
              <span className="text-4xl lg:text-5xl font-black text-rose-700">+${estimatedTaxCreditLoss}</span>
              <span className="text-stone-500 text-sm font-medium">/ month</span>
            </div>

            <div className="flex gap-2.5 items-start bg-rose-50 border border-rose-100 p-3 rounded-lg text-rose-800">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-rose-700" />
              <div>
                <span className="font-bold text-xs block">Expiring Premium Tax Credits</span>
                <span className="text-[11px] leading-relaxed block mt-0.5">
                  Working Nebraskans pay around <strong>${yearlyPremiumIncrease.toLocaleString()} more per year</strong> for the exact same level of insurance coverage.
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100">
              <span className="text-stone-700 text-xs font-bold uppercase tracking-wider block mb-3">
                Forces a Choice Between:
              </span>
              
              <div className="space-y-3">
                {/* Groceries Equivalent */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-stone-800 font-medium">
                      <span>Groceries Offset</span>
                      <strong className="text-rose-700">{equivalentGroceriesWeeks} Weeks</strong>
                    </div>
                    <div className="w-full bg-stone-100 h-1 rounded-full mt-1">
                      <div className="bg-rose-600 h-full rounded-full" style={{ width: `${Math.min(equivalentGroceriesWeeks * 4, 100)}%` }} />
                    </div>
                  </div>
                </div>

                {/* Utilities Equivalent */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
                    <Droplet className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-stone-800 font-medium">
                      <span>Utility Bills Missed</span>
                      <strong className="text-rose-700">{equivalentUtilityMonths} Months</strong>
                    </div>
                    <div className="w-full bg-stone-100 h-1 rounded-full mt-1">
                      <div className="bg-rose-600 h-full rounded-full" style={{ width: `${Math.min(equivalentUtilityMonths * 8, 100)}%` }} />
                    </div>
                  </div>
                </div>

                {/* Prescription Equivalent */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
                    <Pill className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs text-stone-800 font-medium">
                      <span>Co-pays Delayed</span>
                      <strong className="text-rose-700">{equivalentPrescriptions} Copays</strong>
                    </div>
                    <div className="w-full bg-stone-100 h-1 rounded-full mt-1">
                      <div className="bg-rose-600 h-full rounded-full" style={{ width: `${Math.min(equivalentPrescriptions * 2, 100)}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
