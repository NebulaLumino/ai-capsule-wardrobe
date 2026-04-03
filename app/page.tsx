"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOutput("");
    setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData: form }),
      });
      const data = await res.json();
      setOutput(data.result || data.error || "No output received.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900 text-white p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className={"text-3xl font-bold mb-2 text-violet-400"}>AI Capsule Wardrobe Generator</h1>
        <p className="text-gray-400 mb-8">Generate personalized capsule wardrobes with outfit combinations</p>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <div className="space-y-3">
          <select value={form.bodyType || ""} onChange={e => setForm(f => ({...f, bodyType: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Select Body Type</option><option value="hourglass">Hourglass</option><option value="pear">Pear</option><option value="apple">Apple</option><option value="rectangle">Rectangle</option><option value="inverted-triangle">Inverted Triangle</option></select>
          <select value={form.skinTone || ""} onChange={e => setForm(f => ({...f, skinTone: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Select Skin Tone</option><option value="fair">Fair</option><option value="light">Light</option><option value="medium">Medium</option><option value="tan">Tan</option><option value="dark">Dark</option></select>
          <select value={form.lifestyle || ""} onChange={e => setForm(f => ({...f, lifestyle: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Lifestyle Activities</option><option value="office">Office / Corporate</option><option value="creative">Creative / Artistic</option><option value="active">Active / Athletic</option><option value="social">Social / Events</option><option value="casual">Casual / Relaxed</option></select>
          <select value={form.dressCode || ""} onChange={e => setForm(f => ({...f, dressCode: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Work Dress Code</option><option value="formal">Formal Business</option><option value="business-casual">Business Casual</option><option value="smart-casual">Smart Casual</option><option value="casual">Casual</option><option value="none">No Dress Code</option></select>
          <input type="text" placeholder="Budget for new pieces ($)" value={form.budget || ""} onChange={e => setForm(f => ({...f, budget: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500" />
          <textarea placeholder="List current essential pieces you own" value={form.closet || ""} onChange={e => setForm(f => ({...f, closet: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 h-20" />
          <textarea placeholder="e.g. minimalist, French, boho" value={form.inspiration || ""} onChange={e => setForm(f => ({...f, inspiration: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 h-20" />
          <select value={form.climate || ""} onChange={e => setForm(f => ({...f, climate: e.target.value}))} className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"><option value=""></option><option value="">Climate</option><option value="cold">Cold / Winter</option><option value="temperate">Temperate / All Seasons</option><option value="warm">Warm / Summer</option><option value="humid">Humid / Tropical</option><option value="dry">Dry / Arid</option></select>
          </div>
          <button type="submit" disabled={loading}
            className={"w-full py-3 px-6 rounded-lg font-semibold bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white transition"}>
            {loading ? "Generating..." : "Generate"}
          </button>
        </form>
        {error && <div className="p-4 rounded-lg bg-red-900/50 text-red-300">{error}</div>}
        {output && <div className="p-6 rounded-lg bg-gray-800 whitespace-pre-wrap text-gray-200 font-mono text-sm border border-gray-700">{output}</div>}
      </div>
    </div>
  );
}
