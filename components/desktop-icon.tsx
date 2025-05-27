"use client"

import type React from "react"

interface DesktopIconProps {
  icon: string | React.ReactNode
  label: string
  selected: boolean
  onSelect: () => void
  onDoubleClick?: () => void
}

export function DesktopIcon({ icon, label, selected, onSelect, onDoubleClick }: DesktopIconProps) {
  return (
    <div
      className={`flex flex-col items-center w-16 h-20 p-1 cursor-pointer select-none ${
        selected ? "bg-blue-600 text-white" : "text-black"
      }`}
      onClick={onSelect}
      onDoubleClick={onDoubleClick}
    >
      <div className="mb-1 flex items-center justify-center w-8 h-8">
        {typeof icon === "string" ? <span className="text-2xl">{icon}</span> : icon}
      </div>
      <div className="text-xs text-center leading-tight">{label}</div>
    </div>
  )
}
