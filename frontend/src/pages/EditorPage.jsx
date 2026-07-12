import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../App.jsx";
import { FiArrowLeft, FiCode, FiMonitor, FiSend, FiMessageSquare, FiUploadCloud, FiCheck } from "react-icons/fi";

function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [website, setWebsite] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("preview");

  const [messages, setMessages] = useState([{ role: "ai", text: "How can I help you update this project?" }]);
  const [input, setInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const chatEndRef = useRef(null);

  const textareaRef = useRef(null);

  // Deploy state
  const [deployStatus, setDeployStatus] = useState("idle"); // idle | deploying | deployed | error

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [input]);


  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const response = await axios.get(`${serverURL}/api/website/get-by-id/${id}`, { withCredentials: true });
        setWebsite(response.data);
        setCode(response.data.latestCode);

        if (response.data.conversation && response.data.conversation.length > 0) {
          const chatHistory = response.data.conversation.map(msg => ({
            role: msg.role.toLowerCase(),
            text: msg.content
          }));
          setMessages(chatHistory);
        }

      } catch (error) {
        console.error("Error fetching website:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchWebsite();
  }, [id]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isUpdating) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setIsUpdating(true);

    try {
      const response = await axios.post(
        `${serverURL}/api/website/update`,
        {
          websiteId: id,
          prompt: userMessage,
          currentCode: code
        },
        { withCredentials: true }
      );

      setCode(response.data.updatedCode);
      setMessages((prev) => [...prev, { role: "ai", text: response.data.message }]);

    } catch (error) {
      console.error("Error updating code:", error);
      const errorMsg = error.response?.data?.message || "Sorry, I encountered an error while updating.";
      setMessages((prev) => [...prev, { role: "ai", text: errorMsg }]);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeploy = async () => {
    if (deployStatus === "deploying") return;
    setDeployStatus("deploying");
    try {
      // TODO: point this at your real deploy endpoint once it exists on the backend
      await axios.post(
        `${serverURL}/api/website/deploy`,
        { websiteId: id, code },
        { withCredentials: true }
      );
      setDeployStatus("deployed");
      setTimeout(() => setDeployStatus("idle"), 2500);
    } catch (error) {
      console.error("Error deploying website:", error);
      setDeployStatus("error");
      setTimeout(() => setDeployStatus("idle"), 2500);
    }
  };

  if (loading) {
    return (
      <div className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-[#eef2ff] via-[#fdf2f8] to-[#ecfeff]">
        <style>{`
          @keyframes meshFloatA { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-20px) scale(1.15)} }
          @keyframes meshFloatB { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-25px,25px) scale(0.9)} }
          @keyframes spinSlow { to { transform: rotate(360deg); } }
          @keyframes spinSlowRev { to { transform: rotate(-360deg); } }
        `}</style>
        <div className="absolute top-[10%] left-[15%] w-72 h-72 rounded-full bg-pink-400/40 blur-3xl" style={{ animation: "meshFloatA 8s ease-in-out infinite" }} />
        <div className="absolute bottom-[15%] right-[15%] w-80 h-80 rounded-full bg-indigo-400/40 blur-3xl" style={{ animation: "meshFloatB 10s ease-in-out infinite" }} />
        <div className="absolute top-[35%] right-[20%] w-56 h-56 rounded-full bg-cyan-300/40 blur-3xl" style={{ animation: "meshFloatA 9s ease-in-out infinite reverse" }} />

        <div className="relative flex flex-col items-center gap-6 rounded-[2rem] border border-white/50 bg-white/50 px-14 py-12 shadow-2xl backdrop-blur-2xl">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full" style={{ background: "conic-gradient(from 0deg,#ec4899,#a855f7,#6366f1,#22d3ee,#facc15,#ec4899)", animation: "spinSlow 2.6s linear infinite", WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 5px))", mask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 5px))" }} />
            <div className="absolute inset-[10px] rounded-full" style={{ background: "conic-gradient(from 180deg,#22d3ee,#facc15,#ec4899,#a855f7,#22d3ee)", animation: "spinSlowRev 1.9s linear infinite", WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))", mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))" }} />
          </div>
          <p className="font-serif text-lg text-gray-800">Opening your project…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden bg-gradient-to-br from-[#eef2ff] via-[#fdf2f8] to-[#ecfeff]">
      {/* Ambient gradient mesh */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-pink-400/25 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[460px] h-[460px] rounded-full bg-indigo-400/25 blur-3xl" />
        <div className="absolute top-[30%] right-[10%] w-[300px] h-[300px] rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="absolute bottom-[10%] left-[20%] w-[260px] h-[260px] rounded-full bg-amber-300/20 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex h-16 items-center justify-between border-b border-white/40 bg-white/50 px-6 shadow-sm backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-1.5
            text-[20px] font-serif text-gray-700 shadow-sm backdrop-blur-md transition-all hover:bg-white hover:shadow-md"
          >
            <FiArrowLeft size={24} /> Back
          </button>

        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full border border-white/60 bg-white/60 p-1 shadow-sm backdrop-blur-md">
            <button
              onClick={() => setView("code")}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${view === "code" ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md" : "text-gray-600 hover:text-gray-900"
                }`}
            >
              <FiCode size={15} /> Code
            </button>
            <button
              onClick={() => setView("preview")}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${view === "preview" ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md" : "text-gray-600 hover:text-gray-900"
                }`}
            >
              <FiMonitor size={15} /> Preview
            </button>
          </div>

          <button
            onClick={handleDeploy}
            disabled={deployStatus === "deploying"}
            className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium text-white shadow-md transition-all ${
              deployStatus === "deployed"
                ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                : deployStatus === "error"
                ? "bg-gradient-to-r from-rose-500 to-red-500"
                : "bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 hover:shadow-lg hover:-translate-y-0.5"
            } ${deployStatus === "deploying" ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {deployStatus === "deploying" ? (
              <>
                <span className="h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                Deploying...
              </>
            ) : deployStatus === "deployed" ? (
              <>
                <FiCheck size={16} /> Deployed
              </>
            ) : deployStatus === "error" ? (
              <>
                <FiUploadCloud size={16} /> Failed — Retry
              </>
            ) : (
              <>
                <FiUploadCloud size={16} /> Deploy
              </>
            )}
          </button>
        </div>
      </header>

      <div className="relative z-10 flex flex-1 overflow-hidden">
        {/* Chat Sidebar */}
        <aside className="flex w-[520px] flex-col border-r border-white/40 bg-white/40 backdrop-blur-xl">
          <div className="flex items-center gap-2.5 border-b border-white/40 px-5 py-4">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-white shadow-md"
              style={{ background: "conic-gradient(from 0deg,#ec4899,#a855f7,#6366f1,#22d3ee,#facc15,#ec4899)" }}
            >
              <FiMessageSquare size={20} />
            </div>
            <span className="font-serif text-base font-semibold text-gray-800">AI Assistant</span>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`w-fit max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${msg.role === "user"
                  ? "ml-auto rounded-br-md bg-gradient-to-br from-indigo-600 to-purple-600 text-white"
                  : "rounded-bl-md border border-white/60 bg-white/80 text-gray-800"
                  }`}
              >
                {msg.text}
              </div>
            ))}

            {isUpdating && (
              <div className="w-fit max-w-[85%] rounded-2xl rounded-bl-md border border-white/60 bg-white/80 px-4 py-3 text-sm shadow-sm flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce"></span>
                </div>
                <span className="text-xs font-medium text-gray-500 italic">Writing code...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          <div className="border-t border-white/40 p-3">

            <div className="flex items-end gap-2 rounded-3xl border border-gray-200 bg-white/70 px-3 py-2 shadow-sm 
            relative bottom-3 backdrop-blur-md focus-within:ring-2 focus-within:ring-purple-300">
              <textarea
                disabled={isUpdating}
                placeholder={isUpdating ? "Applying updates..." : "Ask for updates..."}
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                className="no-scrollbar flex-1 resize-none bg-transparent px-1 
                [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
                py-1.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none leading-relaxed"
                style={{ maxHeight: "140px", overflowY: "auto" }}
              />
              <button
                disabled={isUpdating}
                onClick={handleSendMessage}
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-sm transition-transform hover:scale-105 ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
              >

                <FiSend size={14} />
              </button>
            </div>
          </div>
        </aside>

        {/* Workspace */}
        <main className="flex-1 overflow-hidden p-4">
          {view === "code" ? (
            <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/10 bg-[#161b22] px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                <span className="ml-3 font-mono text-xs text-gray-400">index.html</span>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="h-full w-full flex-1 resize-none bg-transparent p-6 font-mono text-sm text-gray-300 outline-none"
                spellCheck="false"
              />
            </div>
          ) : (
            <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/50 bg-white shadow-2xl">
              <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-2.5">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
              </div>
              <iframe title="Preview" srcDoc={code} className="h-full w-full flex-1 border-none bg-white" sandbox="allow-scripts" />
            </div>
            
          )}
        </main>
      </div>
    </div>
  );
}

export default EditorPage;