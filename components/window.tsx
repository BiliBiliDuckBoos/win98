"use client"

import type React from "react"

import { useState } from "react"
import { X, Minus, Square } from "lucide-react"

interface WindowProps {
  title: string
  children: React.ReactNode
  onClose?: () => void
  onMinimize?: () => void
  initialPosition?: { x: number; y: number }
  width?: number
  height?: number
}

export function Window({
  title,
  children,
  onClose,
  onMinimize,
  initialPosition = { x: 100, y: 100 },
  width = 400,
  height = 300,
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isMaximized, setIsMaximized] = useState(false)
  const [previousState, setPreviousState] = useState({ x: 100, y: 100, width: 400, height: 300 })

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && !isMaximized) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMaximize = () => {
    if (isMaximized) {
      setPosition({ x: previousState.x, y: previousState.y })
      setIsMaximized(false)
    } else {
      setPreviousState({ x: position.x, y: position.y, width, height })
      setPosition({ x: 0, y: 0 })
      setIsMaximized(true)
    }
  }

  const currentWidth = isMaximized ? window.innerWidth : width
  const currentHeight = isMaximized ? window.innerHeight - 32 : height

  return (
    <div
      className="absolute bg-gray-200 border-2 border-gray-400 shadow-lg"
      style={{
        left: position.x,
        top: position.y,
        width: currentWidth,
        height: currentHeight,
        borderStyle: "outset",
        zIndex: 10,
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Title Bar */}
      <div
        className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-2 py-1 flex items-center justify-between cursor-move"
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm font-bold">{title}</span>
        <div className="flex gap-1">
          <button
            className="w-4 h-4 bg-gray-300 border border-gray-400 flex items-center justify-center text-xs hover:bg-gray-400"
            onClick={onMinimize}
          >
            <Minus className="w-2 h-2" />
          </button>
          <button
            className="w-4 h-4 bg-gray-300 border border-gray-400 flex items-center justify-center text-xs hover:bg-gray-400"
            onClick={handleMaximize}
          >
            <Square className="w-2 h-2" />
          </button>
          <button
            className="w-4 h-4 bg-gray-300 border border-gray-400 flex items-center justify-center text-xs hover:bg-gray-400"
            onClick={onClose}
          >
            <X className="w-2 h-2" />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="h-full overflow-auto" style={{ height: `calc(100% - 24px)` }}>
        {children}
      </div>
    </div>
  )
}
