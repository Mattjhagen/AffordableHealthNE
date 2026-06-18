/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Send, 
  Heart, 
  Settings, 
  FileText, 
  Link2, 
  MessageSquare,
  Facebook,
  Twitter,
  CheckCircle,
  Sparkles
} from "lucide-react";
import { Signer } from "../types";
import EmbedContainer from "./EmbedContainer";

interface TakeActionCardProps {
  customEmbedCode: string;
  setCustomEmbedCode: (code: string) => void;
  petitionLink: string;
}

const DEFAULT_SIGNERS: Signer[] = [
  { id: "s1", name: "Matty Hagen", city: "Omaha", date: "Just now" },
  { id: "s2", name: "Sarah Jenkins", city: "Lincoln", date: "2 mins ago" },
  { id: "s3", name: "David T.", city: "Grand Island", date: "15 mins ago" },
  { id: "s4", name: "Maria Ortiz", city: "Bellevue", date: "40 mins ago" },
  { id: "s5", name: "Rev. Robert K.", city: "Kearney", date: "2 hours ago" },
  { id: "s6", name: "Jessica L.", city: "Hastings", date: "4 hours ago" }
];

export default function TakeActionCard({ 
  customEmbedCode, 
  setCustomEmbedCode,
  petitionLink 
}: TakeActionCardProps) {
  const [activeTab, setActiveTab] = useState<"native" | "embed">("native");
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [signers, setSigners] = useState<Signer[]>(DEFAULT_SIGNERS);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    zipCode: "",
    story: "",
    shareConsent: true
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [goalProgress, setGoalProgress] = useState<number>(784);
  const goalTarget = 1000;

  // Load signatures from LocalStorage
  useEffect(() => {
    const savedSigners = localStorage.getItem("ne_healthcare_signers");
    const savedCount = localStorage.getItem("ne_healthcare_signers_count");
    if (savedSigners) {
      setSigners(JSON.parse(savedSigners));
    }
    if (savedCount) {
      setGoalProgress(parseInt(savedCount, 10));
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.zipCode) {
      alert("Please fill in all required fields.");
      return;
    }

    const newSigner: Signer = {
      id: Date.now().toString(),
      name: `${formData.firstName} ${formData.lastName[0]}.`,
      city: formData.zipCode.startsWith("68") ? getNebraskaCity(formData.zipCode) : "Nebraska",
      date: "Just now"
    };

    const updatedSigners = [newSigner, ...signers];
    setSigners(updatedSigners);
    const newCount = goalProgress + 1;
    setGoalProgress(newCount);

    localStorage.setItem("ne_healthcare_signers", JSON.stringify(updatedSigners));
    localStorage.setItem("ne_healthcare_signers_count", newCount.toString());

    // If they typed a personal story, also save it in local storage to add to the stories feed!
    if (formData.story.trim()) {
      const savedStories = localStorage.getItem("ne_healthcare_stories") || "[]";
      const storiesList = JSON.parse(savedStories);
      const newStory = {
        id: "cust-" + Date.now().toString(),
        name: `${formData.firstName} ${formData.lastName[0]}.`,
        city: newSigner.city,
        role: "Community Member",
        storyText: formData.story,
        isCustom: true,
        date: "Today"
      };
      localStorage.setItem("ne_healthcare_stories", JSON.stringify([newStory, ...storiesList]));
      // Trigger event to refresh stories feed
      window.dispatchEvent(new Event("new_story_submitted"));
    }

    setIsSubmitted(true);
  };

  const getNebraskaCity = (zip: string): string => {
    const zipNum = parseInt(zip, 10);
    if (zipNum >= 68000 && zipNum <= 68199) return "Omaha";
    if (zipNum >= 68500 && zipNum <= 68599) return "Lincoln";
    if (zipNum >= 68800 && zipNum <= 68899) return "Grand Island";
    if (zipNum >= 68005 && zipNum <= 68007) return "Bellevue";
    if (zipNum >= 68845 && zipNum <= 68849) return "Kearney";
    if (zipNum >= 68901 && zipNum <= 68902) return "Hastings";
    if (zipNum >= 68701 && zipNum <= 68702) return "Norfolk";
    if (zipNum >= 69101 && zipNum <= 69103) return "North Platte";
    return "Nebraska Family";
  };

  const handleShare = (platform: "twitter" | "facebook" | "copy") => {
    const shareText = "As working families in Nebraska, healthcare costs are rising brandishing unaffordable premiums. Tell Congress to act now!";
    const shareUrl = window.location.href;
    
    if (platform === "twitter") {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
    } else if (platform === "facebook") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Campaign link copied to your clipboard!");
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-stone-200" id="take-action-card">
      <div className="bg-red-800 px-6 py-5 text-white">
        <div className="flex justify-between items-start">
          <div>
            <span className="bg-red-900/50 text-red-200 text-xs font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Official Campaign
            </span>
            <h3 className="text-xl font-bold font-sans mt-2 tracking-tight">Demand Affordable Care Now</h3>
          </div>
          <button 
            onClick={() => setShowConfig(!showConfig)}
            className="p-1.5 hover:bg-red-700 rounded-lg transition-colors text-white/90 hover:text-white"
            title="Configure Embed Widget"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Custom Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center text-xs text-red-200 mb-1.5">
            <span className="font-medium flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <strong>{goalProgress} Nebraskans</strong> have signed
            </span>
            <span>Goal: {goalTarget}</span>
          </div>
          <div className="w-full bg-red-950/40 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-amber-400 h-full rounded-full transition-all duration-1000 ease-out" 
              style={{ width: `${(goalProgress / goalTarget) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Embedded config panel if settings open */}
      <AnimatePresence>
        {showConfig && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-stone-50 border-b border-stone-200 p-4 overflow-hidden"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <label className="text-stone-800 text-xs font-semibold uppercase tracking-wider block">
                Paste Custom Action Network Embed HTML:
              </label>
            </div>
            
            <p className="text-stone-500 text-xs mb-3">
              When you have your direct form script tag or iframe from Action Network, paste it below. The action section will dynamically display your exact embed live!
            </p>

            <textarea
              className="w-full font-mono text-xs p-2.5 bg-white border border-stone-200 rounded-lg h-36 focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-inner"
              placeholder='<script src="https://actionnetwork.org/widgets/v3/form/..."></script>'
              value={customEmbedCode}
              onChange={(e) => setCustomEmbedCode(e.target.value)}
            />
            
            <div className="flex justify-between items-center mt-2.5">
              <button
                onClick={() => {
                  setCustomEmbedCode("");
                  setActiveTab("native");
                }}
                className="text-stone-500 hover:text-stone-700 text-xs font-semibold"
              >
                Reset Default Form
              </button>
              <button
                onClick={() => {
                  setShowConfig(false);
                  setActiveTab("embed");
                }}
                className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold px-3 py-1.5 rounded-md transition-colors"
              >
                Apply & View Embed
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabs */}
      <div className="flex border-b border-stone-100 bg-stone-50/50">
        <button
          onClick={() => {
            setActiveTab("native");
            setShowConfig(false);
          }}
          className={`flex-1 py-3 text-sm font-semibold border-b-2 text-center transition-colors flex items-center justify-center gap-2 ${
            activeTab === "native" 
              ? "border-red-700 text-red-800 bg-white shadow-sm" 
              : "border-transparent text-stone-500 hover:text-stone-800 hover:bg-stone-100/50"
          }`}
        >
          <FileText className="w-4 h-4" />
          Petition Form
        </button>
        <button
          onClick={() => setActiveTab("embed")}
          className={`flex-1 py-3 text-sm font-semibold border-b-2 text-center transition-colors flex items-center justify-center gap-2 ${
            activeTab === "embed" 
              ? "border-red-700 text-red-800 bg-white shadow-sm" 
              : "border-transparent text-stone-500 hover:text-stone-800 hover:bg-stone-100/50"
          }`}
        >
          <Link2 className="w-4 h-4" />
          Action Network Embed
        </button>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {activeTab === "native" ? (
            <motion.div
              key="native-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {!isSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-stone-700 text-xs font-semibold mb-1">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-red-500/10 focus:border-red-700 focus:bg-white outline-none transition-all"
                        placeholder="Matty"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 text-xs font-semibold mb-1">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-red-500/10 focus:border-red-700 focus:bg-white outline-none transition-all"
                        placeholder="Hagen"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-stone-700 text-xs font-semibold mb-1">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-red-500/10 focus:border-red-700 focus:bg-white outline-none transition-all"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-stone-700 text-xs font-semibold mb-1">Nebraska ZIP Code *</label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      pattern="[0-9]{5}"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full p-2.5 text-sm bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-red-500/10 focus:border-red-700 focus:bg-white outline-none transition-all"
                      placeholder="68102 (e.g., Omaha)"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-stone-700 text-xs font-semibold">Share Your Personal Story (Optional)</label>
                      <span className="text-[10px] text-stone-400">Added to story wall</span>
                    </div>
                    <textarea
                      name="story"
                      value={formData.story}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full p-2.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:ring-2 focus:ring-red-500/10 focus:border-red-700 focus:bg-white outline-none transition-all resize-none"
                      placeholder="High deductibles, copays, or lack of coverage force us to choose between medicine or groceries... Share your experience here."
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="shareConsent"
                      name="shareConsent"
                      checked={formData.shareConsent}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 rounded border-stone-300 text-red-600 focus:ring-red-500"
                    />
                    <label htmlFor="shareConsent" className="text-stone-500 text-[11px] leading-relaxed">
                      I agree to join the campaign and receive updates. My comment can be displayed anonymously to show congressional leaders the impact on real Nebraskans.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg shadow-lg shadow-red-700/10 transition-colors duration-150 flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <Send className="w-4 h-4" />
                    Sign and Submit Petition
                  </button>
                </form>
              ) : (
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-6"
                >
                  <div className="mx-auto w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-4 border border-emerald-100">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h4 className="text-lg font-bold text-stone-800 mb-2">Thank you, {formData.firstName}!</h4>
                  <p className="text-stone-600 text-sm mb-6 max-w-sm mx-auto leading-relaxed">
                    Your voice was added to our count of Nebraskans demanding attention. Your support fuels our push for healthier, stronger communities.
                  </p>

                  <div className="bg-stone-50 rounded-xl p-4 border border-stone-200/60 mb-6 text-left max-w-sm mx-auto">
                    <h5 className="text-xs font-bold text-stone-700 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                      Two More Important Steps:
                    </h5>
                    <ol className="list-decimal list-inside space-y-2 text-xs text-stone-600 pl-1 leading-relaxed">
                      <li>
                        <strong>Sign the Official Action Network Page:</strong> We highly encourage signing the official platform form directly. Click below!
                      </li>
                      <li>
                        <strong>Share with Friends:</strong> Reach out to families across NE who need fair premium relief.
                      </li>
                    </ol>
                    <a
                      href={petitionLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3.5 block text-center py-2 bg-stone-900 hover:bg-stone-950 text-white font-bold text-xs rounded-lg transition-colors"
                    >
                      Go to Official Action Network Form
                    </a>
                  </div>

                  {/* Share buttons */}
                  <div className="space-y-2.5 max-w-sm mx-auto">
                    <p className="text-stone-500 text-xs font-semibold">Share the Campaign:</p>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => handleShare("twitter")}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 bg-stone-50 hover:bg-stone-100 rounded-lg text-stone-700 text-xs font-semibold border border-stone-200 transition-all cursor-pointer"
                      >
                        <Twitter className="w-3.5 h-3.5 text-sky-500" />
                        Twitter
                      </button>
                      <button
                        onClick={() => handleShare("facebook")}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 bg-stone-50 hover:bg-stone-100 rounded-lg text-stone-700 text-xs font-semibold border border-stone-200 transition-all cursor-pointer"
                      >
                        <Facebook className="w-3.5 h-3.5 text-blue-600" />
                        Facebook
                      </button>
                      <button
                        onClick={() => handleShare("copy")}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 bg-stone-50 hover:bg-stone-100 rounded-lg text-stone-700 text-xs font-semibold border border-stone-200 transition-all cursor-pointer"
                      >
                        <Link2 className="w-3.5 h-3.5 text-stone-500" />
                        Copy Link
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        firstName: "",
                        lastName: "",
                        email: "",
                        zipCode: "",
                        story: "",
                        shareConsent: true
                      });
                    }}
                    className="mt-6 text-red-700 hover:text-red-800 text-xs font-semibold underline"
                  >
                    Sign another petition entry
                  </button>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="embed-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              {customEmbedCode ? (
                <div>
                  <div className="flex justify-between items-center bg-stone-100/50 p-2 rounded-lg border border-stone-200/40 text-stone-500 text-[10px] mb-3">
                    <span className="flex items-center gap-1 font-mono">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Loaded custom embed code
                    </span>
                    <button 
                      onClick={() => setShowConfig(true)}
                      className="text-red-700 font-bold hover:underline"
                    >
                      Change Code
                    </button>
                  </div>
                  <EmbedContainer embedCode={customEmbedCode} />
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="mx-auto w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center mb-4 border border-rose-100">
                    <Link2 className="w-6 h-6 text-rose-600" />
                  </div>
                  <h4 className="text-base font-bold text-stone-800 mb-2">Redirecting to Action Network</h4>
                  <p className="text-stone-500 text-xs max-w-sm mx-auto mb-5 leading-relaxed">
                    You can sign the official "Congress: Working People in Nebraska Need Affordable Healthcare Now" form directly on the secure Action Network portal.
                  </p>
                  
                  <a
                    href={petitionLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-3 px-6 bg-red-700 hover:bg-red-800 text-white font-bold rounded-lg shadow-lg shadow-red-700/10 text-xs transition-colors"
                  >
                    Open Action Network Petition
                    <MessageSquare className="w-3.5 h-3.5" />
                  </a>

                  <div className="mt-8 pt-6 border-t border-stone-100 text-left">
                    <div className="flex items-start gap-2.5">
                      <Settings className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                      <div>
                        <h5 className="text-xs font-semibold text-stone-700">Developer or Admins:</h5>
                        <p className="text-[11px] text-stone-500 mt-1 leading-relaxed">
                          Do you want this widget embedded directly in this container? Click the <strong>gear icon</strong> at the top right of this card and paste your Action Network embed script. The applet will render it in real-time!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Recent Signers ticker */}
      {activeTab === "native" && !isSubmitted && (
        <div className="bg-stone-50 border-t border-stone-100 p-4">
          <h5 className="text-[11px] font-bold text-stone-500 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600 animate-pulse" />
            Recent Supporters in Nebraska
          </h5>
          <div className="grid grid-cols-2 gap-2 text-[11px] max-h-24 overflow-y-auto pr-1">
            {signers.slice(0, 6).map((signer) => (
              <div 
                key={signer.id}
                className="bg-white border border-stone-100 px-2.5 py-1.5 rounded-md flex justify-between items-center shadow-xs"
              >
                <div>
                  <span className="font-bold text-stone-800 block leading-tight">{signer.name}</span>
                  <span className="text-stone-400 block text-[9px] mt-0.5">{signer.city}, NE</span>
                </div>
                <span className="text-emerald-600 text-[10px] font-medium">{signer.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
