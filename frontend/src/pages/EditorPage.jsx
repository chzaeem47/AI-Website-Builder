import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // 1. Added import
import axios from "axios";
import { serverURL } from "../App.jsx";
import { FiArrowLeft, FiCode, FiMonitor, FiSend, FiMessageSquare } from "react-icons/fi";

function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [website, setWebsite] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("preview");
  const { darkMode } = useSelector((state) => state.user); 

  const [messages, setMessages] = useState([{ role: "ai", text: "How can I help you update this project?" }]);
  const [input, setInput] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [deployStatus, setDeployStatus] = useState("idle");
  const chatEndRef = useRef(null);
  const textareaRef = useRef(null);

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
      const response = await axios.post(`${serverURL}/api/website/update`, {
        websiteId: id,
        prompt: userMessage,
        currentCode: code
      }, { withCredentials: true });
      setCode(response.data.updatedCode);
      setMessages((prev) => [...prev, { role: "ai", text: response.data.message }]);
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Sorry, I encountered an error while updating.";
      setMessages((prev) => [...prev, { role: "ai", text: errorMsg }]);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className={`relative flex h-screen w-full items-center justify-center overflow-hidden transition-colors duration-300 ${darkMode ? "bg-[#0a0a0a]" : "bg-gradient-to-br from-[#eef2ff] via-[#fdf2f8] to-[#ecfeff]"}`}>
        <style>{`
          @keyframes meshFloatA { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-20px) scale(1.15)} }
          @keyframes meshFloatB { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-25px,25px) scale(0.9)} }
          @keyframes spinSlow { to { transform: rotate(360deg); } }
          @keyframes spinSlowRev { to { transform: rotate(-360deg); } }
        `}</style>
        <div className={`absolute top-[10%] left-[15%] w-72 h-72 rounded-full blur-3xl ${darkMode ? "bg-pink-900/20" : "bg-pink-400/40"}`} style={{ animation: "meshFloatA 8s ease-in-out infinite" }} />
        <div className={`absolute bottom-[15%] right-[15%] w-80 h-80 rounded-full blur-3xl ${darkMode ? "bg-indigo-900/20" : "bg-indigo-400/40"}`} style={{ animation: "meshFloatB 10s ease-in-out infinite" }} />
        <div className={`absolute top-[35%] right-[20%] w-56 h-56 rounded-full blur-3xl ${darkMode ? "bg-cyan-900/15" : "bg-cyan-300/40"}`} style={{ animation: "meshFloatA 9s ease-in-out infinite reverse" }} />
        <div className={`relative flex flex-col items-center gap-6 rounded-[2rem] border px-14 py-12 shadow-2xl backdrop-blur-2xl ${darkMode ? "border-gray-800 bg-[#1e1e2e]/80" : "border-white/50 bg-white/50"}`}>
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full" style={{ background: "conic-gradient(from 0deg,#ec4899,#a855f7,#6366f1,#22d3ee,#facc15,#ec4899)", animation: "spinSlow 2.6s linear infinite", WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 5px))", mask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 5px))" }} />
            <div className="absolute inset-[10px] rounded-full" style={{ background: "conic-gradient(from 180deg,#22d3ee,#facc15,#ec4899,#a855f7,#22d3ee)", animation: "spinSlowRev 1.9s linear infinite", WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))", mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))" }} />
          </div>
          <p className={`font-serif text-lg ${darkMode ? "text-gray-200" : "text-gray-800"}`}>Opening your project…</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative flex h-screen w-full flex-col overflow-hidden transition-colors duration-300 ${darkMode ? "bg-[#0a0a0a]" : "bg-gradient-to-br from-[#eef2ff] via-[#fdf2f8] to-[#ecfeff]"}`}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full blur-3xl ${darkMode ? "bg-pink-900/10" : "bg-pink-400/25"}`} />
        <div className={`absolute bottom-[-10%] right-[-5%] w-[460px] h-[460px] rounded-full blur-3xl ${darkMode ? "bg-indigo-900/10" : "bg-indigo-400/25"}`} />
        <div className={`absolute top-[30%] right-[10%] w-[300px] h-[300px] rounded-full blur-3xl ${darkMode ? "bg-cyan-900/10" : "bg-cyan-300/20"}`} />
        <div className={`absolute bottom-[10%] left-[20%] w-[260px] h-[260px] rounded-full blur-3xl ${darkMode ? "bg-amber-900/10" : "bg-amber-300/20"}`} />
      </div>

      <header className={`relative z-10 flex h-16 items-center justify-between border-b px-6 backdrop-blur-xl ${darkMode ? "border-gray-800 bg-[#1e1e2e]/80" : "border-white/40 bg-white/50 shadow-sm"}`}>
        <button onClick={() => navigate(-1)} className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-[20px] font-serif transition-all ${darkMode ? "border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700" : "border-white/60 bg-white/70 text-gray-700 hover:bg-white shadow-sm"}`}>
          <FiArrowLeft size={24} /> Back
        </button>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-1 rounded-full border p-1 backdrop-blur-md ${darkMode ? "border-gray-700 bg-gray-800/80" : "border-white/60 bg-white/60 shadow-sm"}`}>
            <button onClick={() => setView("code")} className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${view === "code" ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md" : darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900"}`}>
              <FiCode size={15} /> Code
            </button>
            <button onClick={() => setView("preview")} className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-all ${view === "preview" ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md" : darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-900"}`}>
              <FiMonitor size={15} /> Preview
            </button>
          </div>
          <button
            disabled={deployStatus === "deploying"}
            onClick={async () => {
              if (website?.deployed) {
                navigator.clipboard.writeText(website.deployURL);
                alert("URL copied to clipboard!");
                return;
              }
              setDeployStatus("deploying");
              try {
                const res = await axios.get(`${serverURL}/api/website/deploy/${website._id}`, { withCredentials: true });
                if (res.data.url) {
                  setWebsite(prev => ({ ...prev, deployed: true, deployURL: res.data.url }));
                  window.open(res.data.url, '_blank');
                }
              } catch (err) {
                alert("Deployment failed.");
              } finally {
                setDeployStatus("idle");
              }
            }}
            className="rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 py-2 text-sm font-medium text-white font-serif text-[18px] shadow-sm backdrop-blur-md transition-all cursor-pointer"
          >
            {deployStatus === "deploying" ? "Deploying..." : (website?.deployed ? "Copy URL" : "Deploy")}
          </button>
        </div>
      </header>

      <div className="relative z-10 flex flex-1 overflow-hidden">
        <aside className={`flex w-[520px] flex-col border-r backdrop-blur-xl ${darkMode ? "border-gray-800 bg-[#111827]/90" : "border-white/40 bg-white/40"}`}>
          <div className={`flex items-center gap-2.5 border-b px-5 py-4 ${darkMode ? "border-gray-800" : "border-white/40"}`}>
            <div className="flex h-8 w-8 items-center justify-center rounded-full text-white shadow-md" style={{ background: "conic-gradient(from 0deg,#ec4899,#a855f7,#6366f1,#22d3ee,#facc15,#ec4899)" }}>
              <FiMessageSquare size={20} />
            </div>
            <span className={`font-serif text-base font-semibold ${darkMode ? "text-gray-200" : "text-gray-800"}`}>AI Assistant</span>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((msg, i) => (
              <div key={i} className={`w-fit max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${msg.role === "user" ? "ml-auto rounded-br-md bg-gradient-to-br from-indigo-600 to-purple-600 text-white" : darkMode ? "rounded-bl-md border border-gray-700 bg-gray-800 text-gray-200" : "rounded-bl-md border border-white/60 bg-white/80 text-gray-800"}`}>
                {msg.text}
              </div>
            ))}
            {isUpdating && (
                <div className={`w-fit rounded-2xl rounded-bl-md border px-4 py-3 text-sm shadow-sm flex items-center gap-3 ${darkMode ? "border-gray-700 bg-gray-800 text-gray-300" : "border-white/60 bg-white/80 text-gray-800"}`}>
                    <div className="flex gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-indigo-500 animate-bounce"></span></div>
                    <span className="text-xs font-medium italic">Writing code...</span>
                </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div className={`border-t p-3 ${darkMode ? "border-gray-800" : "border-white/40"}`}>
            <div className={`flex items-end gap-2 rounded-3xl border px-3 py-2 shadow-sm backdrop-blur-md focus-within:ring-2 focus-within:ring-purple-300 ${darkMode ? "border-gray-700 bg-[#1e1e2e]" : "border-gray-300 bg-white"}`}>
              <textarea ref={textareaRef} 
              placeholder='Ask for any Updates?' value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} 
              className={`no-scrollbar flex-1 resize-none px-1 py-1.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden text-[18px] outline-none ${darkMode ? "bg-transparent text-gray-200 placeholder-gray-500" : "bg-transparent text-black"}`} rows={1} />
              <button onClick={handleSendMessage} className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white"><FiSend size={17} /></button>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-hidden p-4">
          {view === "code" ? (
            <div className="flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl">
              <div className="flex items-center gap-2 border-b border-white/10 bg-[#161b22] px-4 py-2.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f56]" /><span className="h-3 w-3 rounded-full bg-[#ffbd2e]" /><span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              </div>
              <textarea value={code} onChange={(e) => setCode(e.target.value)} className="h-full w-full flex-1 resize-none bg-transparent p-6 font-mono text-sm text-gray-300 outline-none" />
            </div>
          ) : (
            <div className={`flex h-full w-full flex-col overflow-hidden rounded-2xl border shadow-2xl ${darkMode ? "border-gray-700 bg-white" : "border-white/50 bg-white"}`}>
              <div className={`flex items-center gap-3 border-b px-4 py-2.5 ${darkMode ? "border-gray-200 bg-gray-50" : "border-gray-200 bg-gray-50"}`}>
                <div className="flex gap-1.5"><span className="h-3 w-3 rounded-full bg-[#ff5f56]" /><span className="h-3 w-3 rounded-full bg-[#ffbd2e]" /><span className="h-3 w-3 rounded-full bg-[#27c93f]" /></div>
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