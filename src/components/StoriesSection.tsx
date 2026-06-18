/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { MessageSquare, Quote, PenTool, Share2, Plus, Sparkles, MapPin } from "lucide-react";
import { Story } from "../types";
import { motion, AnimatePresence } from "motion/react";

const SEED_STORIES: Story[] = [
  {
    id: "s1",
    name: "Sarah & Marcus B.",
    city: "Omaha",
    role: "Parents of Three",
    storyText: "Our monthly healthcare premium jumped by $145 after the tax credit shifts. That is money we directly relied on for groceries and public school lunches. We are working two jobs each, but we are still being squeezed to the breaking point by rates that represent actual rent money.",
    date: "June 2026"
  },
  {
    id: "s2",
    name: "Evelyn Campbell",
    city: "Kearney",
    role: "Independent Retailer",
    storyText: "As a small business owner relying completely on the ACA marketplace, Nebraska's premiums are a massive economic weight. With a $6,500 individual deductible, I am basically paying huge monthly sums for coverage I can't even afford to use for routine checkups.",
    date: "May 2026"
  },
  {
    id: "s3",
    name: "Dean Schroeder",
    city: "Grand Island",
    role: "Retired Farmer",
    storyText: "Out here in central Nebraska, local rural clinics are underfunded. We have to drive an hour to Hastings or Kearney just to see a specialist, and when we do, we're hit with high copays. Congress needs to invest in rural healthcare infrastructure before these towns dry up.",
    date: "May 2026"
  }
];

export default function StoriesSection() {
  const [stories, setStories] = useState<Story[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newStory, setNewStory] = useState({
    name: "",
    city: "",
    role: "",
    text: ""
  });
  const [successMsg, setSuccessMsg] = useState(false);

  // Load custom and seed stories
  const loadStories = () => {
    const savedCustomStories = localStorage.getItem("ne_healthcare_stories") || "[]";
    const customList = JSON.parse(savedCustomStories);
    setStories([...customList, ...SEED_STORIES]);
  };

  useEffect(() => {
    loadStories();

    // Listen to form submissions inside the TakeActionCard which can also trigger stories
    const handleStorySubmitted = () => {
      loadStories();
    };

    window.addEventListener("new_story_submitted", handleStorySubmitted);
    return () => {
      window.removeEventListener("new_story_submitted", handleStorySubmitted);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewStory(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStory.name || !newStory.city || !newStory.text) {
      alert("Please fill in Name, Nebraska City, and your Story text.");
      return;
    }

    const storyObj: Story = {
      id: "sto-" + Date.now().toString(),
      name: newStory.name,
      city: newStory.city,
      role: newStory.role || "Community Member",
      storyText: newStory.text,
      isCustom: true,
      date: "Just now"
    };

    const savedCustom = localStorage.getItem("ne_healthcare_stories") || "[]";
    const customList = JSON.parse(savedCustom);
    const updatedCustom = [storyObj, ...customList];
    localStorage.setItem("ne_healthcare_stories", JSON.stringify(updatedCustom));

    setStories([storyObj, ...stories]);
    setNewStory({ name: "", city: "", role: "", text: "" });
    setShowForm(false);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 5000);
  };

  return (
    <section className="py-16 bg-white" id="community-stories">
      <div className="container mx-auto px-4 sm:px-6">
        
        {/* Header Grid */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
          <div className="max-w-xl text-left">
            <span className="text-red-700 text-xs font-bold uppercase tracking-wider bg-red-50 px-2.5 py-1 rounded-md border border-red-100">
              Voice of Nebraskans
            </span>
            <h2 className="text-3xl font-extrabold text-stone-900 mt-3 tracking-tight font-sans">
              Our Community, Our Stories
            </h2>
            <p className="text-stone-600 text-sm mt-2 leading-relaxed">
              These are the raw accounts of working families navigating healthcare inflation in Nebraska. Add yours to the wall to help us carry this message to Washington.
            </p>
          </div>
          
          <button
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center gap-1.5 py-3 px-5 bg-stone-900 hover:bg-stone-950 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer text-center justify-center"
          >
            <PenTool className="w-4 h-4" />
            Share Your Healthcare Story
          </button>
        </div>

        {/* Success Alert */}
        <AnimatePresence>
          {successMsg && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-emerald-800 text-xs font-medium mb-6 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
              <span>Thank you! Your story has been successfully added to our public advocacy dashboard.</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Story Form Segment */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-stone-50 border border-stone-200 rounded-2xl p-6 mb-10 overflow-hidden text-left"
            >
              <div className="flex items-center gap-2 mb-4">
                <PenTool className="w-4 h-4 text-red-700" />
                <h3 className="font-bold text-stone-900 text-sm uppercase tracking-wide">Write Your Account</h3>
              </div>

              <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-stone-700 text-xs font-semibold mb-1">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={newStory.name}
                    onChange={handleInputChange}
                    placeholder="Matty H."
                    className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-lg outline-none focus:ring-1 focus:ring-red-500 shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 text-xs font-semibold mb-1">Your Nebraska City/Town *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={newStory.city}
                    onChange={handleInputChange}
                    placeholder="Omaha"
                    className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-lg outline-none focus:ring-1 focus:ring-red-500 shadow-inner"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 text-xs font-semibold mb-1">Household Role (Optional)</label>
                  <input
                    type="text"
                    name="role"
                    value={newStory.role}
                    onChange={handleInputChange}
                    placeholder="e.g. Teacher, Parent, Nurse"
                    className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-lg outline-none focus:ring-1 focus:ring-red-500 shadow-inner"
                  />
                </div>

                <div className="md:col-span-3">
                  <label className="block text-stone-700 text-xs font-semibold mb-1">Your Healthcare Cost Experience *</label>
                  <textarea
                    name="text"
                    required
                    rows={4}
                    value={newStory.text}
                    onChange={handleInputChange}
                    placeholder="Describe how rising premiums, high medical bills, or deductibles affect your household decisions. Do you choose between care and heating/groceries? Share it honestly..."
                    className="w-full p-2.5 text-xs bg-white border border-stone-200 rounded-lg outline-none focus:ring-1 focus:ring-red-500 shadow-inner resize-none"
                  />
                </div>

                <div className="md:col-span-3 flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="py-2 px-4 rounded-lg border border-stone-200 text-stone-600 hover:text-stone-800 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-2 px-5 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-bold transition-all shadow-md"
                  >
                    Publish Account
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Storyboard grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.div
              layout
              key={story.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-stone-50 border border-stone-200/60 p-6 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all text-left"
            >
              <div>
                <Quote className="w-8 h-8 text-red-700/10 mb-4" />
                <p className="text-stone-700 text-sm leading-relaxed font-serif italic">
                  "{story.storyText}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200/50 flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-stone-900 text-xs block">{story.name}</span>
                  <span className="text-stone-500 text-[10px] mt-0.5 block">{story.role}</span>
                </div>
                
                <div className="flex items-center gap-1 bg-stone-100 text-stone-600 rounded-full px-2 py-0.5 text-[9px] font-bold">
                  <MapPin className="w-3 h-3 text-red-700" />
                  <span>{story.city}, NE</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
