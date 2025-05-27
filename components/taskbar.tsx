"use client"

import { useState } from "react"
import { StartMenu } from "./start-menu"

interface TaskbarProps {
  openWindows: Array<{ id: string; title: string }>
  minimizedWindows: string[]
  onWindowRestore: (id: string) => void
}

export function Taskbar({ openWindows, minimizedWindows, onWindowRestore }: TaskbarProps) {
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every second
  useState(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  })

  return (
    <>
      <StartMenu isOpen={startMenuOpen} onClose={() => setStartMenuOpen(false)} />
      <div
        className="fixed bottom-0 left-0 right-0 h-8 bg-gray-300 border-t-2 border-gray-400 flex items-center px-1"
        style={{ borderStyle: "outset" }}
      >
        {/* Start Button */}
        <button
          className={`h-6 px-3 mr-2 text-sm font-bold flex items-center border-2 ${
            startMenuOpen ? "border-gray-600 bg-gray-400" : "border-gray-400 bg-gray-200 hover:bg-gray-300"
          }`}
          style={{ borderStyle: startMenuOpen ? "inset" : "outset" }}
          onClick={() => setStartMenuOpen(!startMenuOpen)}
        >
          <span className="mr-1">🪟</span>
          开始
        </button>

        {/* Task Buttons Area */}
        <div
          className="flex-1 h-6 bg-gray-300 border border-gray-400 flex items-center px-1"
          style={{ borderStyle: "inset" }}
        >
          {openWindows.map((window) => (
            <button
              key={window.id}
              className={`h-5 px-2 mr-1 text-xs border border-gray-400 truncate max-w-32 ${
                minimizedWindows.includes(window.id) ? "bg-gray-200" : "bg-gray-100"
              } hover:bg-gray-200`}
              style={{ borderStyle: minimizedWindows.includes(window.id) ? "outset" : "inset" }}
              onClick={() => onWindowRestore(window.id)}
            >
              {window.title}
            </button>
          ))}
        </div>

        {/* System Tray */}
        <div className="h-6 px-2 bg-gray-300 border border-gray-400 flex items-center" style={{ borderStyle: "inset" }}>
          <span className="text-xs mr-2">🔊</span>
          <span className="text-xs">
            {currentTime.toLocaleTimeString("zh-CN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </span>
        </div>
      </div>
    </>
  )
}
