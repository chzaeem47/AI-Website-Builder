import React from "react";
import {
  FiHome,
  FiClock,
} from "react-icons/fi";
import { LuLayoutGrid } from "react-icons/lu";
import { FcBiotech } from "react-icons/fc";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";

function HomeLeftSideBar() {
  const menuItems = [
    {
      id: 1,
      icon: <FiHome />,
      label: "Home",
    },
    {
      id: 2,
      icon: <FiClock />,
      label: "History",
    },
    {
      id: 3,
      icon: <SiGithub />,
      label: "GitHub",
    },
    {
      id: 4,
      icon: <FaLinkedin />,
      label: "LinkedInts",
    },
    {
      id: 5,
      icon: <FaWhatsapp />,
      label: "Search",
    },

  ];

  return (
    <aside
      className="
        absolute
        left-5
        top-2
        bottom-5
        w-[105px]
        flex
        flex-col
        items-center
        py-5
        z-20
      "
    >
      {/* Keep your Quantum icon */}
      <button
        type="button"
        aria-label="Quantum AI"
        className="
          w-[62px]
          h-[62px]
          rounded-full
          flex
          items-center
          justify-center
          hover:scale-105
          transition-all
          duration-300
        "
      >
        <FcBiotech size={48} />
      </button>

      {/* Navigation buttons */}
      <nav className="mt-8 flex flex-col items-center gap-5">
        {menuItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            title={item.label}
            aria-label={item.label}
            className={`
              group
              w-[58px]
              h-[58px]
              rounded-full
              flex
              items-center
              justify-center
              text-[25px]
              border
              transition-all
              duration-300
              ${
                index === 1
                  ? `
                    bg-white
                    text-gray-800
                    border-white
                    shadow-[0_8px_20px_rgba(75,85,130,0.2)]
                  `
                  : `
                    bg-white/95
                    text-gray-800
                    border-white
                    shadow-[0_6px_16px_rgba(75,85,130,0.14)]
                    hover:bg-white
                    hover:text-gray-900
                    hover:-translate-y-0.5
                    hover:shadow-[0_10px_22px_rgba(75,85,130,0.22)]
                  `
              }
            `}
          >
            <span className="transition-transform duration-300 group-hover:scale-110">
              {item.icon}
            </span>
          </button>
        ))}
      </nav>

      {/* Bottom grid button */}
      <button
        type="button"
        aria-label="All apps"
        title="All apps"
        className="
          mt-auto
          w-[58px]
          h-[58px]
          rounded-full
          flex
          items-center
          justify-center
          text-[28px]
          text-gray-900
          hover:bg-white/50
          transition-all
          duration-300
          bg-white/95
        "
      >
        <LuLayoutGrid />
      </button>
    </aside>
  );
}

export default HomeLeftSideBar;