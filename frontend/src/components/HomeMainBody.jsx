import React from "react";
import { useSelector } from "react-redux";
import Strands from "./Strands";

function HomeMainBody() {
  const { userData, darkMode } = useSelector((state) => state.user);
  
  const firstName =
    userData?.name?.trim().split(" ")[0] ||
    "there";

  return (
    <div
      className="
        absolute
        top-[70px] sm:top-[80px] md:top-[90px]
        left-2 sm:left-[95px] md:left-[120px]
        right-2 sm:right-3 md:right-4
        bottom-2 sm:bottom-3 md:bottom-4
        overflow-hidden
      "
    >
      {/* Animated strands */}
      <div
        className="
          absolute
          left-1/2
          top-[48%]
          -translate-x-1/2
          -translate-y-1/2
          w-[92%] sm:w-[550px] md:w-[750px]
          max-w-[750px]
          h-[160px] sm:h-[220px] md:h-[300px]
          pointer-events-none
          overflow-visible
        "
      >
        <Strands
          colors={[
            "#7C3AED",
            "#3B82F6",
            "#F97316",
          ]}
          count={3}
          speed={0.5}
          amplitude={1}
          waviness={1}
          thickness={0.7}
          glow={2.5}
          taper={3}
          spread={1.4}
          intensity={0.6}
          saturation={1.5}
          opacity={0.85}
          scale={2.5}
          // The background color matches your theme to eliminate the boundary box
          // without using blend modes that distort colors.
          backgroundColor={darkMode ? "#0d1117" : "#ffffff"}
        />
      </div>

      {/* Greeting */}
      <h1
        className={`
          absolute
          left-1/2
          top-16 sm:top-24 md:top-32 lg:top-35
          z-10
          -translate-x-1/2
          w-[92%] sm:w-auto
          text-2xl sm:text-3xl md:text-4xl lg:text-5xl
          font-semibold
          font-serif
          leading-tight sm:leading-snug md:leading-tight lg:leading-16
          text-center
          whitespace-normal lg:whitespace-nowrap
          transition-colors
          duration-300
          ${darkMode ? "text-white" : "text-black"}
        `}
      >
        <span>
          Hi {firstName},{" "}
        </span>

        <span 
          className={`transition-colors duration-300 ${
            darkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Ready to
          <br />
          Achieve Great Things?
        </span>
      </h1>
    </div>
  );
}

export default HomeMainBody;