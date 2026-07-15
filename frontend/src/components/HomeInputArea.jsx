import React, { useEffect, useRef, useState } from "react";
import { FiSend, FiCode, FiHeart, FiBriefcase, FiSearch, FiX } from "react-icons/fi";
import { LuCookingPot } from "react-icons/lu";
import axios from 'axios';
import { serverURL } from '../App.jsx';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux"; // 1. Added import

const loadingMessages = [
  "Initializing AI Architect",
  "Drafting responsive layouts",
  "Writing clean HTML & CSS",
  "Injecting JavaScript logic",
  "Adding styling magic",
  "Polishing UI/UX elements",
  "Almost there, finalizing code"
];

function HomeInputArea() { // 2. Removed prop
  const [prompt, setPrompt] = useState("");
  const [generatedId, setGeneratedId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  const textareaRef = useRef(null);
  const abortControllerRef = useRef(null);
  const navigate = useNavigate();
  const { darkMode } = useSelector((state) => state.user); // 3. Access global state

  // Handle auto-resizing of the textarea
  const handleInput = (e) => {
    setPrompt(e.target.value);
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height to recalculate
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // Limit to 200px
  };

  // Reset textarea height after submission
  useEffect(() => {
    if (!isGenerating && textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [isGenerating]);

  useEffect(() => {
    let progressInterval;
    let textInterval;

    if (isGenerating) {
      setProgress(8);
      progressInterval = setInterval(() => {
        setProgress((prev) => (prev >= 95 ? 95 : prev + Math.random() * 3));
      }, 1200);

      textInterval = setInterval(() => {
        setTextVisible(false);
        setTimeout(() => {
          setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
          setTextVisible(true);
        }, 300);
      }, 2600);
    } else {
      setProgress(0);
      setMessageIndex(0);
      setTextVisible(true);
    }

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [isGenerating]);

  const handleGenerateWebsite = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      toast.info("Please enter a description for your website first!");
      return;
    }

    try {
      setIsGenerating(true);
      abortControllerRef.current = new AbortController();

      const result = await axios.post(
        `${serverURL}/api/website/generate`,
        { prompt },
        {
          withCredentials: true,
          timeout: 300000,
          signal: abortControllerRef.current.signal,
        }
      );

      setGeneratedId(result.data.website);
      setPrompt("");
      toast.success("Masterpiece created successfully!");
    } catch (error) {
      if (axios.isCancel(error) || error.name === "CanceledError" || error.code === "ERR_CANCELED") {
        toast.info("Generation cancelled.");
      } else {
        toast.error(error.response?.data?.message || "Something went wrong.");
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  const handleCancelGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  };

  const categories = [
    { id: 1, name: "Coding", icon: <FiCode /> },
    { id: 2, name: "Cooking", icon: <LuCookingPot /> },
    { id: 3, name: "Health", icon: <FiHeart /> },
    { id: 4, name: "Trips", icon: <FiBriefcase /> },
    { id: 5, name: "Troubleshoot", icon: <FiSearch /> },
  ];

  return (
    <>
      <style>{`
        @keyframes meshFloat1 { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(40px, -30px) scale(1.15); } 66% { transform: translate(-30px, 20px) scale(0.9); } }
        @keyframes meshFloat2 { 0%, 100% { transform: translate(0, 0) scale(1); } 33% { transform: translate(-50px, 40px) scale(1.1); } 66% { transform: translate(30px, -25px) scale(0.95); } }
        @keyframes meshFloat3 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(20px, 30px) scale(1.2); } }
        @keyframes spinGradient { to { transform: rotate(360deg); } }
        @keyframes spinGradientReverse { to { transform: rotate(-360deg); } }
        @keyframes pulseCore { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(0.85); opacity: 0.7; } }
        @keyframes shimmerBar { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes gradientTextMove { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes cardEntrance { from { opacity: 0; transform: scale(0.92) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .loader-mesh-1 { background: radial-gradient(circle, rgba(236,72,153,0.55) 0%, transparent 70%); animation: meshFloat1 9s ease-in-out infinite; }
        .loader-mesh-2 { background: radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%); animation: meshFloat2 11s ease-in-out infinite; }
        .loader-mesh-3 { background: radial-gradient(circle, rgba(34,211,238,0.45) 0%, transparent 70%); animation: meshFloat3 8s ease-in-out infinite; }
        .loader-mesh-4 { background: radial-gradient(circle, rgba(250,204,21,0.35) 0%, transparent 70%); animation: meshFloat1 13s ease-in-out infinite reverse; }
        .spinner-ring-outer { background: conic-gradient(from 0deg, #ec4899, #a855f7, #6366f1, #22d3ee, #facc15, #ec4899); animation: spinGradient 3.2s linear infinite; }
        .spinner-ring-inner { background: conic-gradient(from 180deg, #22d3ee, #facc15, #ec4899, #a855f7, #22d3ee); animation: spinGradientReverse 2.4s linear infinite; }
        .gradient-text-anim { background: linear-gradient(90deg, #ec4899, #a855f7, #6366f1, #22d3ee, #facc15, #ec4899); background-size: 300% auto; -webkit-background-clip: text; background-clip: text; color: transparent; animation: gradientTextMove 4s ease infinite; }
        .shimmer-progress { background: linear-gradient(90deg, #ec4899, #a855f7, #6366f1, #22d3ee, #facc15); background-size: 200% 100%; }
        .shimmer-progress::after { content: ''; position: absolute; inset: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent); background-size: 200% 100%; animation: shimmerBar 1.6s linear infinite; }
      `}</style>

      {isGenerating && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#0a0118]/85 backdrop-blur-2xl overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="loader-mesh-1 absolute top-[10%] left-[15%] w-[220px] sm:w-[300px] md:w-[380px] h-[220px] sm:h-[300px] md:h-[380px] rounded-full blur-3xl" />
            <div className="loader-mesh-2 absolute bottom-[10%] right-[15%] w-[240px] sm:w-[330px] md:w-[420px] h-[240px] sm:h-[330px] md:h-[420px] rounded-full blur-3xl" />
            <div className="loader-mesh-3 absolute top-[40%] right-[10%] w-[180px] sm:w-[240px] md:w-[300px] h-[180px] sm:h-[240px] md:h-[300px] rounded-full blur-3xl" />
            <div className="loader-mesh-4 absolute bottom-[30%] left-[10%] w-[160px] sm:w-[210px] md:w-[260px] h-[160px] sm:h-[210px] md:h-[260px] rounded-full blur-3xl" />
          </div>
          <div style={{ animation: "cardEntrance 0.5s cubic-bezier(0.16,1,0.3,1)" }} className="relative flex w-[92%] max-w-[520px] flex-col items-center justify-center rounded-[1.5rem] sm:rounded-[1.75rem] md:rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl backdrop-blur-2xl">
            <div className="relative mb-5 sm:mb-6 md:mb-8 flex items-center justify-center w-[80px] h-[80px] sm:w-[95px] sm:h-[95px] md:w-[110px] md:h-[110px]">
              <div className="spinner-ring-outer absolute inset-0 rounded-full" style={{ WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px))", mask: "radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px))" }} />
              <div className="spinner-ring-inner absolute inset-[14px] rounded-full" style={{ WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 5px))", mask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 5px))" }} />
              <div style={{ animation: "pulseCore 1.8s ease-in-out infinite" }} className="relative w-[26px] h-[26px] sm:w-[32px] sm:h-[32px] md:w-[38px] md:h-[38px] rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400 shadow-[0_0_25px_rgba(168,85,247,0.6)]" />
            </div>
            <div className="w-full text-center min-h-[2rem] sm:min-h-[2.25rem] md:min-h-[2.5rem] flex items-center justify-center px-2">
              <h2 style={{ animation: textVisible ? "fadeUp 0.35s ease" : "none", opacity: textVisible ? 1 : 0, transition: "opacity 0.25s ease" }} className="gradient-text-anim font-serif text-lg sm:text-2xl md:text-3xl font-bold tracking-tight">
                {loadingMessages[messageIndex]}
              </h2>
            </div>
            <div className="w-full mt-4 sm:mt-5 md:mt-6">
              <div className="relative h-2 sm:h-2.5 w-full overflow-hidden rounded-full bg-white/10 border border-white/10">
                <div className="shimmer-progress relative h-full rounded-full transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-2 flex justify-between text-[11px] sm:text-xs font-serif text-gray-400">
                <span>Building your vision</span>
                <span className="text-gray-300 font-semibold">{Math.min(Math.round(progress), 99)}%</span>
              </div>
            </div>
            <p className="mt-4 sm:mt-5 md:mt-6 font-serif text-center text-xs sm:text-sm text-gray-300/90 leading-relaxed">
              Crafting your masterpiece takes 2-3 minutes.<br />
              Hold tight and keep this page open!
            </p>
            <button onClick={handleCancelGeneration} className="mt-6 sm:mt-7 md:mt-8 flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 font-serif text-xs sm:text-sm text-gray-200 hover:text-white hover:border-pink-400/40 hover:bg-white/10 transition-all duration-300 group">
              <FiX className="text-pink-400 group-hover:rotate-90 transition-transform duration-300" size={16} />
              Cancel Generation
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 flex justify-center px-3 sm:px-4 md:px-6 transition-all duration-300">
        <div className="w-full max-w-[850px]">
          {generatedId && !isGenerating && (
            <div
              className={`mb-3 sm:mb-4 flex items-center justify-between gap-2 rounded-2xl border px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 backdrop-blur-xl transition-all duration-300 ${
                darkMode
                  ? "border-gray-700 bg-[#1e1e2e]/90 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                  : "border-white/50 bg-white/60 shadow-lg"
              }`}
            >
              <span
                className={`font-serif text-sm sm:text-lg md:text-xl truncate ${
                  darkMode ? "text-gray-200" : "text-gray-900"
                }`}
              >
                Your website is ready!
              </span>
              <button
                onClick={() => navigate(`/editor/${generatedId}`)}
                className={`font-serif rounded-xl px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-sm sm:text-base text-white transition-colors duration-300 shrink-0 ${
                  darkMode
                    ? "bg-indigo-500 hover:bg-indigo-600"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                Open Editor
              </button>
            </div>
          )}

          <form
            onSubmit={handleGenerateWebsite}
            className={`flex items-end gap-2 sm:gap-3 rounded-3xl border p-3 sm:p-4 backdrop-blur-xl transition-all duration-300 ${
              darkMode
                ? "border-gray-700 bg-[#1e1e2e]/90 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
                : "border-white/50 bg-white/60 shadow-xl"
            }`}
          >
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={handleInput}
              placeholder="Create your dream website"
              className={`w-full bg-transparent p-1 font-serif text-[15px] sm:text-[19px] md:text-[22px] lg:text-[25px] outline-none resize-none overflow-y-auto max-h-[200px] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden transition-colors duration-300 ${
                darkMode
                  ? "text-gray-200 placeholder:text-gray-500"
                  : "text-gray-900 placeholder:text-gray-500"
              }`}
              rows={1}
            />
            <button
              type="submit"
              className={`flex h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12 items-center justify-center rounded-full text-white hover:scale-105 transition-all duration-300 shrink-0 ${
                darkMode
                  ? "bg-indigo-500 shadow-[0_4px_12px_rgba(99,102,241,0.4)]"
                  : "bg-indigo-600 shadow-lg"
              }`}
            >
              <span className="inline-flex scale-[0.8] sm:scale-90 md:scale-100">
                <FiSend size={24} />
              </span>
            </button>
          </form>

          <div className="hidden sm:flex mt-3 sm:mt-4 flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setPrompt(`${cat.name}: `)}
                className={`flex items-center gap-1.5 sm:gap-2 rounded-full border px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-sm sm:text-base font-serif backdrop-blur-md transition-all duration-300 ${
                  darkMode
                    ? "border-gray-700 bg-[#1e1e2e]/80 text-gray-300 shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:bg-[#2a2a3c]"
                    : "border-white/50 bg-white/60 text-gray-900 shadow-md hover:bg-white/80"
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeInputArea;