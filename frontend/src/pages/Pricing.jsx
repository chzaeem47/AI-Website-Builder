import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheck } from "react-icons/fi";

function Pricing() {
  const navigate = useNavigate();
  // Accessing global darkMode state from Redux
  const { darkMode } = useSelector((state) => state.user);

  const plans = [
    {
      name: "Starter",
      price: "$0",
      features: ["1 Project", "Basic AI Editor", "Community Support", "50 Credits"],
    },
    {
      name: "Pro",
      price: "$29",
      popular: true,
      features: ["Unlimited Projects", "Advanced AI Editor", "Priority Support", "500 Credits"],
    },
    {
      name: "Enterprise",
      price: "$99",
      features: ["Everything in Pro", "Custom Branding", "Dedicated Manager", "Unlimited Credits"],
    },
  ];

  return (
    <div className={`relative h-screen w-full overflow-hidden transition-colors duration-300 ${
        darkMode ? "bg-[#0a0a0a]" : "bg-gradient-to-br from-[#c7d2fe] via-[#f0abfc]/40 to-[#a5f3fc]"
    }`}>
      <style>{`
        @keyframes meshFloatA { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-20px) scale(1.15)} }
        @keyframes meshFloatB { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-25px,25px) scale(0.9)} }
      `}</style>

      {/* Ambient background matching Dashboard aesthetic */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className={`absolute -top-24 -left-20 w-[460px] h-[460px] rounded-full blur-3xl ${darkMode ? "bg-pink-900/20" : "bg-pink-400/40"}`} style={{ animation: "meshFloatA 10s ease-in-out infinite" }} />
        <div className={`absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-3xl ${darkMode ? "bg-indigo-900/20" : "bg-indigo-400/40"}`} style={{ animation: "meshFloatB 12s ease-in-out infinite" }} />
      </div>

      <div className="relative z-10 h-full overflow-y-auto p-10">
        <button
          onClick={() => navigate("/")}
          className={`mb-10 flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium transition-all ${
            darkMode 
                ? "bg-gray-800 text-gray-200 hover:bg-gray-700" 
                : "bg-white/60 text-gray-700 hover:bg-white"
          }`}
        >
          <FiArrowLeft /> Back
        </button>

        <div className="mx-auto max-w-6xl text-center">
          <h1 className={`text-5xl font-serif font-bold mb-6 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Choose your plan
          </h1>
          <p className={`text-lg mb-16 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Scale your productivity with the right plan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-3xl p-8 border backdrop-blur-xl transition-transform hover:-translate-y-2 ${
                  plan.popular
                    ? darkMode ? "border-purple-500/50 bg-[#1e1e2e]/80" : "border-purple-300 bg-white shadow-2xl"
                    : darkMode ? "border-gray-800 bg-[#1e1e2e]/60" : "border-white/60 bg-white/50"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </span>
                )}
                <h3 className={`text-2xl font-serif mb-4 ${darkMode ? "text-gray-100" : "text-gray-900"}`}>{plan.name}</h3>
                <div className={`text-5xl font-bold mb-8 ${darkMode ? "text-white" : "text-gray-900"}`}>{plan.price}</div>
                
                <ul className="space-y-4 mb-8 text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className={`flex items-center gap-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      <FiCheck className={darkMode ? "text-purple-400" : "text-purple-600"} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-xl font-medium transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-500/20"
                    : darkMode 
                        ? "bg-gray-800 text-gray-200 border border-gray-700 hover:bg-gray-700" 
                        : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;