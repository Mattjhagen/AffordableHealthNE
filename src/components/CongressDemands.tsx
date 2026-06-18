/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  TrendingDown, 
  ShieldCheck, 
  Building2, 
  Users, 
  Activity, 
  CheckCircle2, 
  ChevronRight,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { DemandItem } from "../types";

const DEMAND_ITEMS: DemandItem[] = [
  {
    id: 1,
    title: "Lower Monthly Premiums & Out-of-Pocket Costs",
    description: "Enact permanent caps on monthly bills and limit sky-high deductibles. Nebraska families cannot afford to start independent healthcare years with a $5,000 threshold before insurance contributes a single dollar.",
    iconName: "TrendingDown",
    impact: "Would save the average Nebraska household nearly $110/month in take-home funds."
  },
  {
    id: 2,
    title: "Protect & Expand Affordability Tax Credits",
    description: "Defend against legislative actions or sunset clauses that strip tax credits. Tax credits are the single most effective buffer preventing hundreds of thousands from dropping out of the marketplace.",
    iconName: "ShieldCheck",
    impact: "Keeps insurance accessible for over 90,000 qualifying low-to-middle income Nebraskans."
  },
  {
    id: 3,
    title: "Hold Price-Gouging Insurance Companies Accountable",
    description: "Launch federal oversight against major insurance carriers that systematically increase premiums, limit preventative copays, deny claims, and shrink physical provider directories.",
    iconName: "Building2",
    impact: "Reins in corporate boards who put quarterly profits above families in Grand Island and Lincoln."
  },
  {
    id: 4,
    title: "Strengthen Healthcare Access in NE Communities",
    description: "Increase federal resources and partnerships for neighborhood health clinics, school health resources, and localized community care structures, ensuring help is never a multi-hour drive away.",
    iconName: "Users",
    impact: "Creates immediate localized care portals for urban and suburban families in Omaha and Bellevue."
  },
  {
    id: 5,
    title: "Invest in Rural Health Infrastructure",
    description: "Inject critical federal funds into regional access hospitals, emergency care centers, and rural transport. No Nebraskan should face life-threatening delays due to a lacks of localized trauma units.",
    iconName: "Activity",
    impact: "Locks in emergency coverage and medical stabilization units across Central and Western Nebraska."
  }
];

export default function CongressDemands() {
  const [selectedDemand, setSelectedDemand] = useState<number>(1);

  const getIcon = (name: string) => {
    switch(name) {
      case "TrendingDown": return <TrendingDown className="w-5 h-5" />;
      case "ShieldCheck": return <ShieldCheck className="w-5 h-5" />;
      case "Building2": return <Building2 className="w-5 h-5" />;
      case "Users": return <Users className="w-5 h-5" />;
      case "Activity": return <Activity className="w-5 h-5" />;
      default: return <CheckCircle2 className="w-5 h-5" />;
    }
  };

  const currentDemand = DEMAND_ITEMS.find(d => d.id === selectedDemand) || DEMAND_ITEMS[0];

  return (
    <section className="py-16 bg-stone-100/50" id="congressional-demands">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-red-700 text-xs font-bold uppercase tracking-wider bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Path Forward
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 mt-4 tracking-tight font-sans">
            How Congress Can Restore Fairness
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-4 leading-relaxed max-w-2xl mx-auto">
            The solution to Nebraska’s healthcare crisis lies in decisive action from our elected officials. We demand a system designed for hard working people, not corporate spreadsheets.
          </p>
        </div>

        {/* Master Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation - Left (5 Columns) */}
          <div className="lg:col-span-5 space-y-3">
            {DEMAND_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedDemand(item.id)}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-center gap-4 cursor-pointer align-middle ${
                  selectedDemand === item.id 
                    ? "bg-white border-red-700 shadow-md text-red-950 translate-x-1" 
                    : "bg-white/80 border-stone-200/50 hover:bg-white text-stone-600 hover:text-stone-900 shadow-xs"
                }`}
              >
                <div className={`p-2.5 rounded-lg shrink-0 transition-colors ${
                  selectedDemand === item.id ? "bg-red-700 text-white" : "bg-stone-50 text-stone-500"
                }`}>
                  {getIcon(item.iconName)}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-xs font-bold text-stone-400 block tracking-tight uppercase">Pillar 0{item.id}</span>
                  <span className="font-bold text-sm leading-tight block mt-0.5 truncate">{item.title}</span>
                </div>
                <ChevronRight className={`w-4 h-4 text-stone-400 transition-transform ${
                  selectedDemand === item.id ? "rotate-90 text-red-700" : ""
                }`} />
              </button>
            ))}
          </div>

          {/* Details Panel - Right (7 Columns) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 lg:p-8 min-h-[350px] flex flex-col justify-between shadow-sm relative overflow-hidden text-left">
              
              {/* Corner Watermark */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-stone-50 rounded-full flex items-center justify-center pointer-events-none select-none">
                <span className="text-stone-100 font-sans font-black text-9xl">0{currentDemand.id}</span>
              </div>

              <div className="relative z-10">
                <span className="text-red-700 font-bold text-xs uppercase tracking-widest block mb-1">
                  Demand Action Pillar 0{currentDemand.id}
                </span>
                
                <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight mt-2 leading-tight">
                  {currentDemand.title}
                </h3>
                
                <p className="text-stone-600 text-sm sm:text-base mt-5 leading-relaxed">
                  {currentDemand.description}
                </p>
              </div>

              {/* Impact Card inside */}
              <div className="mt-8 bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-start gap-3 relative z-10">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-xs text-emerald-950 block">Key Nebraska Impact:</span>
                  <span className="text-emerald-800 text-xs mt-1 leading-relaxed block">
                    {currentDemand.impact}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
