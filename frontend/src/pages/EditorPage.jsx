import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverURL } from "../App.jsx";
import { FiArrowLeft, FiCode, FiMonitor, FiLoader, FiSend, FiMessageSquare } from "react-icons/fi";

function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [website, setWebsite] = useState(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("preview"); 
  
  // Chat state
  const [messages, setMessages] = useState([{ role: "ai", text: "How can I help you update this project?" }]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const response = await axios.get(`${serverURL}/api/website/get-by-id/${id}`, { withCredentials: true });
        setWebsite(response.data);
        setCode(response.data.latestCode);
      } catch (error) {
        console.error("Error fetching website:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchWebsite();
  }, [id]);

  // Auto-scroll to bottom of chat
  useEffect(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
    // TODO: Add your API call here to send 'input' to your AI backend
  };

  if (loading) return <div className="flex h-screen w-full items-center justify-center bg-[#071426] text-white"><FiLoader size={48} className="animate-spin text-blue-500" /></div>;

  return (
    <div className="flex h-screen w-full flex-col bg-[#0f172a]">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-gray-700 bg-[#1e293b] px-6 text-white shadow-md z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 rounded-lg bg-gray-700 px-3 py-1.5 text-sm hover:bg-gray-600"><FiArrowLeft size={16} /> Back</button>
          <h1 className="text-xl font-serif font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{website.title || "Untitled Project"}</h1>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-gray-900 p-1">
          <button onClick={() => setView("code")} className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm ${view === "code" ? "bg-gray-700" : "text-gray-400"}`}><FiCode size={16} /> Code</button>
          <button onClick={() => setView("preview")} className={`flex items-center gap-2 rounded-lg px-4 py-1.5 text-sm ${view === "preview" ? "bg-gray-700" : "text-gray-400"}`}><FiMonitor size={16} /> Preview</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat Sidebar */}
        <aside className="w-[320px] bg-[#1e293b] border-r border-gray-700 flex flex-col">
          <div className="p-4 border-b border-gray-700 flex items-center gap-2 text-white">
            <FiMessageSquare /> <span className="font-serif">AI Assistant</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`p-3 rounded-xl text-sm ${msg.role === "user" ? "bg-blue-600 ml-auto text-white w-fit" : "bg-gray-700 text-gray-200"}`}>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center bg-gray-900 rounded-lg p-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()} className="flex-1 bg-transparent text-white px-2 outline-none text-sm" placeholder="Ask for updates..." />
              <button onClick={handleSendMessage} className="text-blue-400 hover:text-blue-300"><FiSend /></button>
            </div>
          </div>
        </aside>

        {/* Workspace */}
        <main className="flex-1 bg-gray-900 overflow-hidden">
          {view === "code" ? (
            <textarea value={code} onChange={(e) => setCode(e.target.value)} className="h-full w-full bg-[#0d1117] p-6 font-mono text-sm text-gray-300 outline-none resize-none" spellCheck="false" />
          ) : (
            <iframe title="Preview" srcDoc={code} className="h-full w-full border-none bg-white" sandbox="allow-scripts" />
          )}
        </main>
      </div>
    </div>
  );
}

export default EditorPage;