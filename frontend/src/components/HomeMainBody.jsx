import React from "react";
import { useSelector } from "react-redux";
import Strands from "./Strands";

function HomeMainBody() {
  const { userData } = useSelector(
    (state) => state.user
  );
  

  const firstName =
    userData?.name?.trim().split(" ")[0] ||
    "there";

  return (
    <div
      className="
        absolute
        top-[90px]
        left-[120px]
        right-4
        bottom-4
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
          w-[750px]
          h-[350px]
          pointer-events-none
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
        />
      </div>

      {/* Greeting */}
      <h1
        className="
          absolute
          left-1/2
          top-35
          z-10
          -translate-x-1/2
          text-black
          text-5xl
          font-semibold
          font-serif
          leading-16
          text-center
          whitespace-nowrap
        "
      >
        <span>
          Hi {firstName},{" "}
        </span>

        <span className="text-gray-600">
          Ready to
          <br />
          Achieve Great Things?
        </span>
      </h1>
    </div>
  );
}

export default HomeMainBody;