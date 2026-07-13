import React from 'react'

function AmbientBackground({ dark }) {
  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden transition-colors duration-300 ${dark ? "bg-gradient-to-br from-[#0d0710] via-[#160b1f] to-[#1c0f28]" : "bg-gradient-to-br from-white via-[#f3f0fa] to-[#e8e1f7]"}`}>

      {/* soft glow blob bottom-left */}
      <div className={`absolute -bottom-32 -left-20 w-[420px] h-[420px] rounded-full blur-3xl ${dark ? "bg-purple-700/30" : "bg-purple-300/40"}`} />

      {/* soft glow blob behind hero panel */}
      <div className={`absolute top-1/3 right-10 w-[300px] h-[300px] rounded-full blur-3xl ${dark ? "bg-fuchsia-700/20" : "bg-purple-200/50"}`} />

      {/* floating glass panels, desktop only */}

      {/* thin vertical divider between the two panels, desktop only */}
      <div className={`hidden lg:block absolute top-0 bottom-0 left-1/2 w-px ${dark ? "bg-white/10" : "bg-black/10"}`} />
    </div>
  )
}

export default AmbientBackground