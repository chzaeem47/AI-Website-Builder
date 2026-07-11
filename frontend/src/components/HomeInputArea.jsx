import React, { useEffect, useRef, useState } from "react";
import { FiSend, FiCode, FiHeart, FiBriefcase, FiSearch, FiX } from "react-icons/fi";
import { LuCookingPot } from "react-icons/lu";
import axios from 'axios';
import { serverURL } from '../App.jsx';
import { FaFileCode } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const loadingMessages = [
  "Initializing AI Architect",
  "Drafting responsive layouts",
  "Writing clean HTML & CSS",
  "Injecting JavaScript logic",
  "Adding styling magic",
  "Polishing UI/UX elements",
  "Almost there, finalizing code"
];

function HomeInputArea() {
  const [prompt, setPrompt] = useState("");
  const [generatedId, setGeneratedId] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(true);

  const textareaRef = useRef(null);
  const abortControllerRef = useRef(null);
  const navigate = useNavigate();

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
        @keyframes meshFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.15); }
          66% { transform: translate(-30px, 20px) scale(0.9); }
        }
        @keyframes meshFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, 40px) scale(1.1); }
          66% { transform: translate(30px, -25px) scale(0.95); }
        }
        @keyframes meshFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, 30px) scale(1.2); }
        }
        @keyframes spinGradient {
          to { transform: rotate(360deg); }
        }
        @keyframes spinGradientReverse {
          to { transform: rotate(-360deg); }
        }
        @keyframes pulseCore {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.85); opacity: 0.7; }
        }
        @keyframes shimmerBar {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes gradientTextMove {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardEntrance {
          from { opacity: 0; transform: scale(0.92) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .loader-mesh-1 {
          background: radial-gradient(circle, rgba(236,72,153,0.55) 0%, transparent 70%);
          animation: meshFloat1 9s ease-in-out infinite;
        }
        .loader-mesh-2 {
          background: radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%);
          animation: meshFloat2 11s ease-in-out infinite;
        }
        .loader-mesh-3 {
          background: radial-gradient(circle, rgba(34,211,238,0.45) 0%, transparent 70%);
          animation: meshFloat3 8s ease-in-out infinite;
        }
        .loader-mesh-4 {
          background: radial-gradient(circle, rgba(250,204,21,0.35) 0%, transparent 70%);
          animation: meshFloat1 13s ease-in-out infinite reverse;
        }
        .spinner-ring-outer {
          background: conic-gradient(from 0deg, #ec4899, #a855f7, #6366f1, #22d3ee, #facc15, #ec4899);
          animation: spinGradient 3.2s linear infinite;
        }
        .spinner-ring-inner {
          background: conic-gradient(from 180deg, #22d3ee, #facc15, #ec4899, #a855f7, #22d3ee);
          animation: spinGradientReverse 2.4s linear infinite;
        }
        .gradient-text-anim {
          background: linear-gradient(90deg, #ec4899, #a855f7, #6366f1, #22d3ee, #facc15, #ec4899);
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientTextMove 4s ease infinite;
        }
        .shimmer-progress {
          background: linear-gradient(90deg, #ec4899, #a855f7, #6366f1, #22d3ee, #facc15);
          background-size: 200% 100%;
        }
        .shimmer-progress::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
          background-size: 200% 100%;
          animation: shimmerBar 1.6s linear infinite;
        }
      `}</style>

      {isGenerating && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#0a0118]/85 backdrop-blur-2xl overflow-hidden">
          {/* Animated gradient mesh background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="loader-mesh-1 absolute top-[10%] left-[15%] w-[380px] h-[380px] rounded-full blur-3xl" />
            <div className="loader-mesh-2 absolute bottom-[10%] right-[15%] w-[420px] h-[420px] rounded-full blur-3xl" />
            <div className="loader-mesh-3 absolute top-[40%] right-[10%] w-[300px] h-[300px] rounded-full blur-3xl" />
            <div className="loader-mesh-4 absolute bottom-[30%] left-[10%] w-[260px] h-[260px] rounded-full blur-3xl" />
          </div>

          <div
            style={{ animation: "cardEntrance 0.5s cubic-bezier(0.16,1,0.3,1)" }}
            className="relative flex w-[90%] max-w-[520px] flex-col items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.06] p-10 sm:p-12 shadow-2xl backdrop-blur-2xl"
          >
            {/* Custom dual-ring conic gradient spinner */}
            <div className="relative mb-8 flex items-center justify-center w-[110px] h-[110px]">
              <div className="spinner-ring-outer absolute inset-0 rounded-full" style={{ WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px))", mask: "radial-gradient(farthest-side, transparent calc(100% - 6px), #000 calc(100% - 6px))" }} />
              <div className="spinner-ring-inner absolute inset-[14px] rounded-full" style={{ WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 5px))", mask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 5px))" }} />
              <div
                style={{ animation: "pulseCore 1.8s ease-in-out infinite" }}
                className="relative w-[38px] h-[38px] rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-cyan-400 shadow-[0_0_25px_rgba(168,85,247,0.6)]"
              />
            </div>

            {/* Cycling status text */}
            <div className="w-full text-center min-h-[2.5rem] flex items-center justify-center px-2">
              <h2
                style={{ animation: textVisible ? "fadeUp 0.35s ease" : "none", opacity: textVisible ? 1 : 0, transition: "opacity 0.25s ease" }}
                className="gradient-text-anim font-serif text-2xl sm:text-3xl font-bold tracking-tight"
              >
                {loadingMessages[messageIndex]}
              </h2>
            </div>

            {/* Progress bar */}
            <div className="w-full mt-6">
              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/10 border border-white/10">
                <div
                  className="shimmer-progress relative h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs font-serif text-gray-400">
                <span>Building your vision</span>
                <span className="text-gray-300 font-semibold">{Math.min(Math.round(progress), 99)}%</span>
              </div>
            </div>

            <p className="mt-6 font-serif text-center text-sm text-gray-300/90 leading-relaxed">
              Crafting your masterpiece takes 2-3 minutes.<br />
              Hold tight and keep this page open!
            </p>

            {/* Cancel button */}
            <button
              onClick={handleCancelGeneration}
              className="mt-8 flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.05] px-6 py-2.5 font-serif text-sm text-gray-200 hover:text-white hover:border-pink-400/40 hover:bg-white/10 transition-all duration-300 group"
            >
              <FiX className="text-pink-400 group-hover:rotate-90 transition-transform duration-300" size={16} />
              Cancel Generation
            </button>
          </div>
        </div>
      )}

      <div className="absolute bottom-8 left-0 right-0 flex justify-center px-6">
        <div className="w-full max-w-[850px]">
          {generatedId && !isGenerating && (
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-white/50 bg-white/60 px-6 py-3 backdrop-blur-xl shadow-lg">
              <span className="font-serif text-xl text-gray-900">Your website is ready!</span>
              <button onClick={() => navigate(`/editor/${generatedId}`)} className="font-serif rounded-xl bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700">
                Open Editor
              </button>
            </div>
          )}

          <form onSubmit={handleGenerateWebsite} className="flex items-end gap-3 rounded-3xl border border-white/50 bg-white/60 p-4 backdrop-blur-xl shadow-xl">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Create your dream website"
              className="w-full bg-transparent p-2 font-serif text-xl text-gray-900 placeholder:text-gray-500 outline-none resize-none"
              rows={1}
            />
            <button type="submit" className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg hover:scale-105 transition-transform">
              <FiSend size={24} />
            </button>
          </form>

          <div className="mt-4 flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button key={cat.id} onClick={() => setPrompt(`${cat.name}: `)} className="flex items-center gap-2 rounded-full border border-white/50 bg-white/60 px-5 py-2 font-serif text-gray-900 shadow-md backdrop-blur-md hover:bg-white/80 transition-all">
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