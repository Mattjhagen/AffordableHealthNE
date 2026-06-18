/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Building2, 
  HelpCircle, 
  ChevronRight, 
  MapPin, 
  HeartHandshake, 
  AlertCircle, 
  ExternalLink,
  Github,
  Mail,
  UserCheck
} from "lucide-react";
import Header from "./components/Header";
import TakeActionCard from "./components/TakeActionCard";
import CostCalculator from "./components/CostCalculator";
import IssuesList from "./components/IssuesList";
import CongressDemands from "./components/CongressDemands";
import StoriesSection from "./components/StoriesSection";

export default function App() {
  const [customEmbedCode, setCustomEmbedCode] = useState<string>("");
  const PETITION_LINK = "https://actionnetwork.org/forms/congress-working-people-in-nebraska-need-affordable-healthcare-now?source=direct_link&canvasser_firstname=Matty&canvasser_lastname=Hagen&office_code=NEOA";

  // Load saved custom embed code if any
  useEffect(() => {
    const savedEmbedCode = localStorage.getItem("ne_healthcare_custom_embed");
    if (savedEmbedCode) {
      setCustomEmbedCode(savedEmbedCode);
    }
  }, []);

  const handleUpdateEmbedCode = (code: string) => {
    setCustomEmbedCode(code);
    localStorage.setItem("ne_healthcare_custom_embed", code);
  };

  const handleTakeActionClick = () => {
    const element = document.getElementById("take-action-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen font-sans flex flex-col justify-between selection:bg-red-200 selection:text-red-900">
      
      {/* Header bar */}
      <Header onTakeActionClick={handleTakeActionClick} />

      {/* Main Campaign Frame */}
      <main className="flex-grow">
        
        {/* Banner Alert for Expiring Credits */}
        <div className="bg-amber-500 text-stone-900 border-b border-amber-600/30 px-4 py-2.5 text-center text-xs font-bold leading-none tracking-wide">
          <span className="inline-flex items-center gap-1.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stone-950 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-stone-900"></span>
            </span>
            ATTENTION NEBRASKA: Healthcare premiums are rising due to temporary tax credit sunsets. Speak out now!
          </span>
        </div>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-stone-550 pt-10 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200">
          
          {/* Subtle background graphic design element */}
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-70 pointer-events-none" />
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-rose-50 rounded-full blur-3xl opacity-60 -translate-y-1/2 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
              
              {/* Hero Copy (7 columns) */}
              <div className="lg:col-span-7 text-left space-y-6">
                
                {/* Nebraska Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-100/80 border border-red-200/50 rounded-full">
                  <MapPin className="w-3.5 h-3.5 text-red-700" />
                  <span className="text-red-800 text-xs font-black uppercase tracking-wider">
                    Nebraskans For Healthcare Relief
                  </span>
                </div>

                <h1 className="text-4.5xl sm:text-5.5xl lg:text-6xl font-black font-serif tracking-tight text-stone-900 leading-[1.05] max-w-2.5xl">
                  Working Nebraska Families Need <span className="text-red-700">Affordable Healthcare</span> Now
                </h1>

                <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl">
                  For working families across Nebraska, healthcare costs are extremely high. Recent premium increases from the sunsetting of key ACA tax credits mean many are paying more for the same care or losing coverage altogether. 
                </p>

                <p className="text-stone-600 text-sm leading-relaxed max-w-xl">
                  High premiums, out-of-pocket deductibles, and constant utility trades are squeezing us dry. Matty Hagen, Nebraska canvassers, and community members are calling on Congress to step up—caps on rates, protect tax credits, and hold insurance companies accountable.
                </p>

                {/* Stat block */}
                <div className="grid grid-cols-3 gap-6 pt-4 max-w-lg border-t border-stone-200/60">
                  <div>
                    <span className="text-3xl font-black text-stone-900 block font-display">100k+</span>
                    <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider mt-1 block">NE ACA Enrollees</span>
                  </div>
                  <div>
                    <span className="text-3xl font-black text-rose-700 block font-display">Top 5</span>
                    <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider mt-1 block">Highest Premiums</span>
                  </div>
                  <div>
                    <span className="text-3xl font-black text-stone-900 block font-display">1,000</span>
                    <span className="text-[11px] text-stone-500 font-bold uppercase tracking-wider mt-1 block">Petition Goal</span>
                  </div>
                </div>

                {/* Heartland Aesthetic Illustration / Photo Container */}
                <div className="relative rounded-2xl overflow-hidden border border-stone-200/60 bg-stone-100 shadow-sm aspect-video max-w-xl mt-6">
                  <img
                    src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=1200&q=80"
                    alt="Nebraska Family standing outside"
                    className="object-cover w-full h-full filter saturate-[0.85] contrast-[1.02] brightness-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-4">
                    <p className="text-white text-xs font-semibold drop-shadow-sm flex items-center gap-1.5 opacity-90">
                      <HeartHandshake className="w-4 h-4 text-rose-400 shrink-0" />
                      Our health shouldn't be defined by how much we can afford to pay out of pocket.
                    </p>
                  </div>
                </div>

              </div>

              {/* Take Action Card Sidebar (5 columns) */}
              <div className="lg:col-span-5" id="take-action-section">
                <TakeActionCard 
                  customEmbedCode={customEmbedCode}
                  setCustomEmbedCode={handleUpdateEmbedCode}
                  petitionLink={PETITION_LINK}
                />
              </div>

            </div>
          </div>
        </section>

        {/* Interactive Calculator Section */}
        <section className="py-20 bg-stone-100/50 border-b border-stone-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CostCalculator />
          </div>
        </section>

        {/* Key Issues Grid */}
        <IssuesList />

        {/* Congressional Action Demands */}
        <CongressDemands />

        {/* Nebraska Healthcare Storyboard Wall */}
        <StoriesSection />

        {/* Bottom Banner Call to Action */}
        <section className="py-16 bg-red-900 text-white relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-[radial-gradient(#be123c_1px,transparent_1px)] [background-size:20px_20px] opacity-20 pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black font-serif tracking-tight">
              We Can Win This Fight — But Only Together
            </h2>
            <p className="text-red-100 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Every voice matters. When we sign petitions, share experiences, and make direct impacts visible, Congress has no choice but to take notice and protect our communities.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={handleTakeActionClick}
                className="w-full sm:w-auto py-3.5 px-8 bg-amber-400 hover:bg-amber-500 text-stone-900 font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-lg transition-transform hover:scale-103 cursor-pointer"
              >
                Sign the Petition Right Here
              </button>
              <a
                href={PETITION_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto py-3.5 px-6 bg-red-950/40 hover:bg-red-950/60 text-white border border-red-500/35 font-bold text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-1.5 transition-all"
              >
                Go to Official Platform Form
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            
            <div className="flex justify-center gap-6 pt-6 text-red-200 text-xs text-stone-200">
              <span className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-amber-400" /> Matty Hagen, Canvasser coordinator
              </span>
              <span>•</span>
              <span>Contact: Mattjhagen0@gmail.com</span>
            </div>
          </div>
        </section>

      </main>

      {/* Campaign Footer footer */}
      <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800 text-left text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-3.5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-red-700 flex items-center justify-center text-white font-bold text-sm">
                  NE
                </div>
                <h2 className="font-sans font-black text-stone-100 uppercase tracking-tight">
                  Affordable Healthcare for NE
                </h2>
              </div>
              <p className="text-[11px] leading-relaxed text-stone-500 max-w-sm">
                A grassroots, people-backed advocacy platform dedicated to preserving ACA tax support, establishing cap rates, and boosting community-based clinics and rural emergency health units.
              </p>
            </div>

            {/* Campaign Links column */}
            <div className="md:col-span-3 space-y-3">
              <h3 className="font-bold text-stone-200 uppercase tracking-widest text-[10px]">Jump To Sections</h3>
              <ul className="space-y-2 text-[11px]">
                <li>
                  <button onClick={() => {
                    const e = document.getElementById("healthcare-issues");
                    if (e) e.scrollIntoView({ behavior: "smooth" });
                  }} className="hover:text-white transition-colors cursor-pointer">
                    What is the Crisis?
                  </button>
                </li>
                <li>
                  <button onClick={() => {
                    const e = document.getElementById("cost-calculator");
                    if (e) e.scrollIntoView({ behavior: "smooth" });
                  }} className="hover:text-white transition-colors cursor-pointer">
                    Healthcare Cost Burden Calculator
                  </button>
                </li>
                <li>
                  <button onClick={() => {
                    const e = document.getElementById("congressional-demands");
                    if (e) e.scrollIntoView({ behavior: "smooth" });
                  }} className="hover:text-white transition-colors cursor-pointer">
                    Actions Congress Must Take
                  </button>
                </li>
                <li>
                  <button onClick={() => {
                    const e = document.getElementById("community-stories");
                    if (e) e.scrollIntoView({ behavior: "smooth" });
                  }} className="hover:text-white transition-colors cursor-pointer">
                    Statewide Story Wall
                  </button>
                </li>
              </ul>
            </div>

            {/* Disclaimer & Platform column */}
            <div className="md:col-span-4 space-y-3">
              <h3 className="font-bold text-stone-200 uppercase tracking-widest text-[10px]">Action Network Source</h3>
              <p className="text-[11px] leading-relaxed text-stone-500">
                This advocacy platform represents the interests of working people in Nebraska. All information and submitted names are tracked organically and can be synced with the Action Network system.
              </p>
              <div className="pt-2">
                <a
                  href={PETITION_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-red-400 hover:text-red-300 transition-colors inline-flex items-center gap-1 text-[11px]"
                >
                  View Live Action Network Form
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>

          <div className="pt-8 mt-12 border-t border-stone-800 text-stone-600 text-[10px] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Affordable Healthcare for Nebraska Alliance. Proudly people-powered.</p>
            <div className="flex gap-4">
              <span>Primary Canvasser: Matty Hagen</span>
              <span>Office Code: NEOA</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
