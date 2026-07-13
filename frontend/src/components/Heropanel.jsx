import React from 'react'

function FloatingShape({ className, children }) {
  return (
    <div className={`absolute text-purple-400/50 ${className}`}>
      {children}
    </div>
  )
}

function HeroPanel() {
  return (
    <div className="relative w-full max-w-[400px] aspect-[3/4] rounded-[2.5rem] bg-black overflow-hidden shadow-2xl mx-auto">

      {/* subtle depth glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-transparent pointer-events-none" />

      {/* floating outline shapes */}
      <FloatingShape className="top-[9%] right-[20%]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </FloatingShape>

      <FloatingShape className="top-[20%] right-[9%]">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </FloatingShape>

      <FloatingShape className="bottom-[40%] left-[14%]">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <polygon points="12,4 20,19 4,19" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </FloatingShape>

      <FloatingShape className="bottom-[38%] right-[13%]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </FloatingShape>

      {/* character illustration */}
      <div className="absolute inset-x-0 top-[7%] flex justify-center">
        <img
          src="/character-illustration.png"
          alt="Illustration of a person working on a laptop"
          className="w-[70%] max-w-[280px] h-auto object-contain select-none pointer-events-none"
          draggable="false"
        />
      </div>

      {/* copy */}
      <div className="absolute inset-x-0 bottom-[15%] px-8 flex flex-col items-center gap-3 text-center">
        <h2 className="text-white font-bold text-xl sm:text-2xl leading-tight">
          Turn your ideas into professional websites in minutes
        </h2>
        <p className="text-gray-400 text-sm sm:text-base">
          Simply type what you want and let AI handle the rest
        </p>
      </div>

      {/* pagination dots */}
      <div className="absolute inset-x-0 bottom-[6%] flex justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-white" />
        <span className="w-2 h-2 rounded-full bg-gray-600" />
        <span className="w-2 h-2 rounded-full bg-gray-600" />
        <span className="w-2 h-2 rounded-full bg-gray-600" />
      </div>
    </div>
  )
}

export default HeroPanel