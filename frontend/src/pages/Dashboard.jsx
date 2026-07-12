import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; // 1. Added import
import { serverURL } from "../App.jsx";
import { FiFolder, FiExternalLink, FiPlus, FiClock } from "react-icons/fi";

function Dashboard() {
    const [websites, setWebsites] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [deployingId, setDeployingId] = useState(null);
    const { darkMode } = useSelector((state) => state.user); // 2. Access global state

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const res = await axios.get(`${serverURL}/api/website/get-all`, { withCredentials: true });
                setWebsites(res.data);
            } catch (err) {
                console.error("Failed to fetch websites", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    return (
        <div className={`relative h-screen w-full overflow-hidden transition-colors duration-300 ${
            darkMode 
                ? "bg-[#0a0a0a]" 
                : "bg-gradient-to-br from-[#c7d2fe] via-[#f0abfc]/40 to-[#a5f3fc]"
        }`}>
            <style>{`
        @keyframes meshFloatA { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-20px) scale(1.15)} }
        @keyframes meshFloatB { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-25px,25px) scale(0.9)} }
        @keyframes spinSlow { to { transform: rotate(360deg); } }
        @keyframes spinSlowRev { to { transform: rotate(-360deg); } }
        @keyframes cardIn { from { opacity:0; transform: translateY(10px); } to { opacity:1; transform: translateY(0); } }
        .dash-scroll::-webkit-scrollbar { width: 8px; }
        .dash-scroll::-webkit-scrollbar-track { background: transparent; }
        .dash-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #ec4899, #a855f7, #6366f1);
          border-radius: 999px;
        }
        .dash-scroll { scrollbar-width: thin; scrollbar-color: #a855f7 transparent; }
      `}</style>

            {/* Ambient gradient mesh */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className={`absolute -top-24 -left-20 w-[460px] h-[460px] rounded-full blur-3xl ${darkMode ? "bg-pink-900/20" : "bg-pink-400/40"}`} style={{ animation: "meshFloatA 10s ease-in-out infinite" }} />
                <div className={`absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-3xl ${darkMode ? "bg-indigo-900/20" : "bg-indigo-400/40"}`} style={{ animation: "meshFloatB 12s ease-in-out infinite" }} />
                <div className={`absolute top-[30%] right-[10%] w-[340px] h-[340px] rounded-full blur-3xl ${darkMode ? "bg-cyan-900/15" : "bg-cyan-300/35"}`} style={{ animation: "meshFloatA 9s ease-in-out infinite reverse" }} />
                <div className={`absolute bottom-[10%] left-[20%] w-[300px] h-[300px] rounded-full blur-3xl ${darkMode ? "bg-amber-900/15" : "bg-amber-300/30"}`} style={{ animation: "meshFloatB 11s ease-in-out infinite reverse" }} />
                <div className={`absolute top-[55%] left-[45%] w-[280px] h-[280px] rounded-full blur-3xl ${darkMode ? "bg-fuchsia-900/15" : "bg-fuchsia-300/30"}`} style={{ animation: "meshFloatA 13s ease-in-out infinite" }} />
            </div>

            {/* Scrollable content layer */}
            <div className="dash-scroll relative z-10 h-full w-full overflow-y-auto p-10">
                <button 
                    className={`text-[20px] font-serif w-20 rounded-3xl relative bottom-2 transition-colors ${
                        darkMode ? "bg-gray-800 text-gray-200 hover:bg-gray-700" : "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                    }`} 
                    onClick={() => navigate('/')}
                >
                    Back
                </button>
                <div className="max-w-6xl mx-auto">
                    <header className="flex justify-between items-center mb-12">
                        <div>
                            <h1 className={`text-4xl font-serif font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r ${
                                darkMode ? "from-pink-400 via-purple-400 to-indigo-400" : "from-pink-500 via-purple-500 to-indigo-500"
                            }`}>
                                My Projects
                            </h1>
                            <p className={`mt-1.5 text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                {loading ? "Loading your workspace…" : `${websites.length} project${websites.length === 1 ? "" : "s"} in your workspace`}
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-purple-500/20 transition-all hover:shadow-xl hover:shadow-purple-500/30 hover:-translate-y-0.5"
                        >
                            <FiPlus size={16} /> New Project
                        </button>
                    </header>

                    {loading ? (
                        <div className={`flex flex-col items-center justify-center gap-6 rounded-[2rem] border py-24 backdrop-blur-xl ${
                            darkMode ? "border-gray-800 bg-[#1e1e2e]/60" : "border-white/50 bg-white/40"
                        }`}>
                            <div className="relative w-14 h-14">
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{
                                        background: "conic-gradient(from 0deg,#ec4899,#a855f7,#6366f1,#22d3ee,#facc15,#ec4899)",
                                        animation: "spinSlow 2.6s linear infinite",
                                        WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 5px))",
                                        mask: "radial-gradient(farthest-side, transparent calc(100% - 5px), #000 calc(100% - 5px))",
                                    }}
                                />
                                <div
                                    className="absolute inset-[9px] rounded-full"
                                    style={{
                                        background: "conic-gradient(from 180deg,#22d3ee,#facc15,#ec4899,#a855f7,#22d3ee)",
                                        animation: "spinSlowRev 1.9s linear infinite",
                                        WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))",
                                        mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))",
                                    }}
                                />
                            </div>
                            <p className={`font-serif ${darkMode ? "text-gray-300" : "text-gray-600"}`}>Loading your projects...</p>
                        </div>
                    ) : websites.length === 0 ? (
                        <div className={`flex flex-col items-center justify-center gap-4 rounded-[2rem] border py-24 backdrop-blur-xl text-center ${
                            darkMode ? "border-gray-800 bg-[#1e1e2e]/60" : "border-white/50 bg-white/40"
                        }`}>
                            <div className="flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg" style={{ background: "conic-gradient(from 0deg,#ec4899,#a855f7,#6366f1,#22d3ee,#facc15,#ec4899)" }}>
                                <FiFolder size={32} />
                            </div>
                            <h3 className={`font-serif text-xl font-semibold ${darkMode ? "text-gray-100" : "text-gray-800"}`}>No projects yet</h3>
                            <p className={`text-sm max-w-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Start your first build and it'll show up here as a project card.</p>
                            <button
                                onClick={() => navigate('/c')}
                                className="mt-2 flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg"
                            >
                                <FiPlus size={16} /> Create your first project
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10">
                            {websites.map((site, index) => (
                                <div
                                    key={site._id}
                                    style={{ animation: `cardIn 0.4s ease ${index * 0.05}s both` }}
                                    className={`group relative overflow-hidden rounded-2xl border p-6 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 ${
                                        darkMode 
                                            ? "border-gray-700 bg-[#1e1e2e]/70 hover:shadow-2xl hover:shadow-purple-900/20" 
                                            : "border-white/60 bg-white/50 hover:shadow-2xl hover:shadow-purple-500/10"
                                    }`}
                                >
                                    <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-pink-400/0 to-indigo-400/0 blur-2xl transition-all duration-500 group-hover:from-pink-400/30 group-hover:to-indigo-400/30" />

                                    <div className="relative flex justify-between items-start mb-5">
                                        <div
                                            className="flex h-13 w-15 items-center justify-center rounded-2xl text-white shadow-md"
                                            style={{ background: "conic-gradient(from 0deg,#ec4899,#a855f7,#6366f1,#22d3ee,#facc15,#ec4899)" }}
                                        >
                                            <FiFolder size={28} />
                                        </div>
                                    </div>

                                    <h3 className={`relative font-serif font-semibold text-lg mb-1 truncate ${darkMode ? "text-gray-100" : "text-gray-800"}`}>{site.title}</h3>
                                    <div className={`relative flex items-center gap-1.5 text-xs mb-6 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                                        <FiClock size={12} /> {new Date(site.createdAt).toLocaleDateString()}
                                    </div>

                                    <div className="relative flex gap-2">
                                        <button
                                            onClick={() => navigate(`/editor/${site._id}`)}
                                            className={`flex-1 rounded-full border py-2 text-sm font-medium shadow-sm transition-all ${
                                                darkMode 
                                                    ? "border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:shadow-md" 
                                                    : "border-white/70 bg-white/80 text-gray-700 hover:bg-white hover:shadow-md"
                                            }`}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            disabled={deployingId === site._id}
                                            onClick={async () => {
                                                if (site.deployed) {
                                                    navigator.clipboard.writeText(site.deployURL);
                                                    alert("URL copied to clipboard!");
                                                    return;
                                                }

                                                setDeployingId(site._id);
                                                try {
                                                    const res = await axios.get(`${serverURL}/api/website/deploy/${site._id}`, {
                                                        withCredentials: true
                                                    });

                                                    if (res.data.url) {
                                                        site.deployed = true;
                                                        site.deployURL = res.data.url;
                                                        window.open(res.data.url, '_blank');
                                                    }
                                                } catch (err) {
                                                    console.error("Deployment Error:", err);
                                                    alert("Deployment failed.");
                                                } finally {
                                                    setDeployingId(null);
                                                }
                                            }}
                                            className={`flex-1 rounded-full py-2 text-sm font-medium shadow-md transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${site.deployed
                                                ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white"
                                                : "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                                            }`}
                                        >
                                            {deployingId === site._id ? (
                                                "Deploying..."
                                            ) : site.deployed ? (
                                                <>
                                                    <FiExternalLink className="mr-1 inline" /> Share URL
                                                </>
                                            ) : (
                                                <>
                                                    <FiExternalLink className="mr-1 inline" /> Deploy
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;