/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  ShieldAlert, 
  TrendingUp, 
  Coins, 
  HelpCircle,
  Activity,
  DollarSign,
  AlertOctagon,
  Milestone
} from "lucide-react";

export default function IssuesList() {
  const issues = [
    {
      id: "premium-rates",
      title: "Among the Highest Rates in America",
      subtitle: "Highest Health Insurance Premiums",
      stat: "Top 5",
      statLabel: "Highest in the US",
      description: "Working families in Nebraska are hit by some of the steepest health insurance premiums in the entire country, placing us at a severe economic disadvantage.",
      icon: TrendingUp,
      colorClass: "border-rose-100 bg-rose-50/50 text-rose-700"
    },
    {
      id: "marketplace-dependency",
      title: "Rising Dependence on the ACA",
      subtitle: "More Nebraskans Than Ever Rely on ACA",
      stat: "100k+",
      statLabel: "Nebraskans Enrolled",
      description: "As traditional job-based coverage shrinks or becomes unaffordable, more Nebraska residents than ever turn to the Affordable Care Act (ACA) Marketplace for essential care.",
      icon: Activity,
      colorClass: "border-amber-100 bg-amber-50/50 text-amber-700"
    },
    {
      id: "credit-expiration",
      title: "The Expiring Tax Credit Crisis",
      subtitle: "Big Beautiful Bill Expiration Impact",
      stat: "+$1.2k",
      statLabel: "Avg Annual Cost Spike",
      description: "Recent modifications enacted under the 'Big Beautiful Bill' coupled with the impending sunset of critical tax credits mean immediate financial pain or complete loss of coverage.",
      icon: AlertOctagon,
      colorClass: "border-red-100 bg-rose-50/20 text-rose-800"
    },
    {
      id: "impossible-choices",
      title: "Impossible Family Trade-offs",
      subtitle: "Choosing Between Medicine and Rent",
      stat: "1 in 4",
      statLabel: "Choose Basic Needs over Care",
      description: "High monthly premiums, deductibles, and out-of-pocket bills force families to delay vital care or choose between medication, food, heating, or paying rent.",
      icon: Coins,
      colorClass: "border-stone-200 bg-stone-50/60 text-stone-700"
    }
  ];

  return (
    <section className="py-16 bg-white" id="healthcare-issues">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-red-700 text-xs font-bold uppercase tracking-widest bg-red-50 border border-red-100 px-3 py-1 rounded-full inline-block">
            The Reality On The Ground
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-sans text-stone-900 mt-4 tracking-tight">
            Why Nebraska Families Are Falling Behind
          </h2>
          <p className="text-stone-600 text-base mt-4 leading-relaxed max-w-2xl mx-auto">
            Our family members, friends, and neighbors are navigating a highly premium-distended system. Under current conditions, essential healthcare has become a severe wealth-depleting burden.
          </p>
        </div>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {issues.map((issue) => {
            const IconComponent = issue.icon;
            return (
              <div 
                key={issue.id}
                className="group border border-stone-100 rounded-2xl p-6 lg:p-8 hover:shadow-xl hover:border-stone-200 transition-all duration-250 flex flex-col justify-between bg-white text-left"
              >
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-stone-400 text-xs font-bold uppercase tracking-wider block">
                      {issue.subtitle}
                    </span>
                    <div className="p-2 bg-stone-50 border border-stone-100 rounded-xl group-hover:bg-red-50 group-hover:border-red-100 transition-colors">
                      <IconComponent className="w-5 h-5 text-stone-600 group-hover:text-red-700 transition-colors" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-stone-900 tracking-tight mt-3">
                    {issue.title}
                  </h3>
                  
                  <p className="text-stone-600 text-sm mt-3 leading-relaxed">
                    {issue.description}
                  </p>
                </div>

                {/* Highlight metric card inside */}
                <div className={`mt-6 border p-4 rounded-xl flex items-center justify-between ${issue.colorClass}`}>
                  <div>
                    <span className="text-3xl font-black tracking-tight">{issue.stat}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-bold uppercase tracking-wider block opacity-80">{issue.statLabel}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed block about "The Big Beautiful Bill" impacts */}
        <div className="mt-12 bg-stone-900 text-white rounded-3xl p-8 lg:p-12 relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-red-800/10 to-transparent pointer-events-none" />
          <div className="max-w-3xl relative z-10">
            <span className="bg-red-700 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md">
              Legislative Alert
            </span>
            <h3 className="text-2xl lg:text-3xl font-bold tracking-tight mt-4 text-white">
              The Harmful Ripple Effect of Credit Sunset (The "Big Beautiful Bill")
            </h3>
            <p className="text-stone-300 text-sm lg:text-base mt-4 leading-relaxed">
              When temporary support schemes like the federal enhanced premium tax credits lapse, middle-class and working-class Nebraskans suffer. High deductibles and out-of-pocket costs are pricing families out of the marketplace. They are left with two crushing choices: paying premiums with money meant for mortgage or groceries, or dropping healthcare altogether and risking catastrophic debt.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-stone-800">
              <div>
                <span className="text-amber-400 text-lg font-bold block">40% Cost Spike</span>
                <span className="text-xs text-stone-400 mt-1 block">Expected increase on plans if action isn't taken.</span>
              </div>
              <div>
                <span className="text-amber-400 text-lg font-bold block">Thousands Uninsured</span>
                <span className="text-xs text-stone-400 mt-1 block">Nebraskans expected to drop coverage completely.</span>
              </div>
              <div>
                <span className="text-amber-400 text-lg font-bold block">1 in 4 Choice Dilemma</span>
                <span className="text-xs text-stone-400 mt-1 block">Families facing tough choices between basic food or drugs.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
