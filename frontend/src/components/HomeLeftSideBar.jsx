import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/userSlice";
import {
  FiHome,
  FiClock,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { LuLayoutGrid } from "react-icons/lu";
import { FcBiotech } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { BiDollar } from "react-icons/bi";

function HomeLeftSideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.user);

  const menuItems = [
    { id: 1, icon: <FiHome />, label: "Home", path: "/dashboard" },
    { id: 2, icon: <FiClock />, label: "History", path: "/dashboard" },
    { id: 3, icon: <BiDollar />, label: "Pricing", path: "/pricing" },
    {
      id: 4,
      icon: <SiGithub />,
      label: "GitHub",
      url: "https://github.com/chzaeem47",
    },
    {
      id: 5,
      icon: <FaLinkedin />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/muhammad-zaeem-ahmad-06a5a0363/",
    },
  ];

  const handleNavigation = (item) => {
    if (item.url) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <aside className="hidden sm:flex absolute left-2 sm:left-3 md:left-5 top-2 bottom-2 sm:bottom-3 md:bottom-5 w-[60px] sm:w-[84px] md:w-[105px] sm:flex-col items-center py-3 sm:py-4 md:py-5 z-20">
      {/* Logo Button */}
      <button
        type="button"
        aria-label="Quantum AI"
        className={`w-[40px] h-[40px] sm:w-[52px] sm:h-[52px] md:w-[62px] md:h-[62px] rounded-full flex items-center justify-center hover:scale-105 transition-all duration-300 ${
          darkMode ? "bg-white/5 shadow-[0_4px_12px_rgba(0,0,0,0.3)]" : ""
        }`}
      >
        <span className="inline-flex scale-[0.65] sm:scale-[0.85] md:scale-100">
          <FcBiotech size={48} />
        </span>
      </button>

      {/* Navigation Menu */}
      <nav className="mt-4 sm:mt-6 md:mt-8 flex flex-col items-center gap-2 sm:gap-3 md:gap-5">
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            title={item.label}
            aria-label={item.label}
            onClick={() => handleNavigation(item)}
            className={`
              group w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] md:w-[58px] md:h-[58px] rounded-full flex items-center justify-center text-[16px] sm:text-[20px] md:text-[25px] border transition-all duration-300
              ${
                index === 1
                  ? darkMode
                    ? "bg-[#1e1e2e] text-white border-gray-700 shadow-[0_8px_20px_rgba(0,0,0,0.5)]"
                    : "bg-white text-gray-800 border-white shadow-[0_8px_20px_rgba(75,85,130,0.2)]"
                  : darkMode
                  ? "bg-[#1e1e2e]/95 text-gray-400 border-gray-700 shadow-[0_6px_16px_rgba(0,0,0,0.4)] hover:bg-[#2a2a3c] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(0,0,0,0.6)]"
                  : "bg-white/95 text-gray-800 border-white shadow-[0_6px_16px_rgba(75,85,130,0.14)] hover:bg-white hover:text-gray-900 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(75,85,130,0.22)]"
              }
            `}
          >
            <span className="transition-transform duration-300 group-hover:scale-110">
              {item.icon}
            </span>
          </button>
        ))}
      </nav>

      <div className="mt-auto flex flex-col items-center gap-2 sm:gap-3 md:gap-5">
        {/* Theme Toggle Button */}
        <button
          type="button"
          aria-label="Toggle Theme"
          title="Toggle Theme"
          onClick={() => dispatch(toggleTheme())}
          className={`
            group w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] md:w-[58px] md:h-[58px] rounded-full flex items-center justify-center text-[16px] sm:text-[20px] md:text-[25px] border transition-all duration-300
            ${
              darkMode
                ? "bg-[#1e1e2e]/95 text-gray-400 border-gray-700 shadow-[0_6px_16px_rgba(0,0,0,0.4)] hover:bg-[#2a2a3c] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(0,0,0,0.6)]"
                : "bg-white/95 text-gray-800 border-white shadow-[0_6px_16px_rgba(75,85,130,0.14)] hover:bg-white hover:text-gray-900 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(75,85,130,0.22)]"
            }
          `}
        >
          <span className="transition-transform duration-300 group-hover:scale-110">
            {darkMode ? <FiMoon /> : <FiSun />}
          </span>
        </button>

        {/* All Apps Button */}
        <button
          type="button"
          aria-label="All apps"
          title="All apps"
          className={`
            w-[36px] h-[36px] sm:w-[48px] sm:h-[48px] md:w-[58px] md:h-[58px] rounded-full flex items-center justify-center text-[18px] sm:text-[22px] md:text-[28px] transition-all duration-300
            ${
              darkMode
                ? "text-gray-400 bg-[#1e1e2e]/95 hover:bg-[#2a2a3c]/80 border border-gray-700 shadow-[0_6px_16px_rgba(0,0,0,0.4)]"
                : "text-gray-900 bg-white/95 hover:bg-white/50"
            }
          `}
        >
          <LuLayoutGrid />
        </button>
      </div>
    </aside>
  );
}

export default HomeLeftSideBar;