"use client"

import type React from "react"

import { useState, useRef } from "react"

export function MediaPlayer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileType, setFileType] = useState<"video" | "audio" | "image" | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)

      if (file.type.startsWith("video/")) {
        setFileType("video")
      } else if (file.type.startsWith("audio/")) {
        setFileType("audio")
      } else if (file.type.startsWith("image/")) {
        setFileType("image")
      }
    }
  }

  const renderMedia = () => {
    if (!selectedFile) return null

    const fileUrl = URL.createObjectURL(selectedFile)

    switch (fileType) {
      case "video":
        return (
          <video controls className="w-full max-h-64" src={fileUrl}>
            您的浏览器不支持视频播放
          </video>
        )
      case "audio":
        return (
          <div className="text-center p-4">
            <div className="text-4xl mb-4">🎵</div>
            <audio controls className="w-full" src={fileUrl}>
              您的浏览器不支持音频播放
            </audio>
          </div>
        )
      case "image":
        return <img src={fileUrl || "/placeholder.svg"} alt="Selected" className="w-full max-h-64 object-contain" />
      default:
        return null
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-200">
      {/* 菜单栏 */}
      <div className="bg-gray-200 p-1 border-b border-gray-400 text-xs">文件(F) 编辑(E) 查看(V) 播放(P) 帮助(H)</div>

      {/* 工具栏 */}
      <div className="bg-gray-200 p-2 border-b border-gray-400 flex items-center gap-2">
        <button
          onClick={handleFileSelect}
          className="px-3 py-1 bg-gray-200 border border-gray-400 text-xs hover:bg-gray-300"
          style={{ borderStyle: "outset" }}
        >
          打开文件
        </button>
        <button
          className="px-2 py-1 bg-gray-200 border border-gray-400 text-xs hover:bg-gray-300"
          style={{ borderStyle: "outset" }}
        >
          ⏸️
        </button>
        <button
          className="px-2 py-1 bg-gray-200 border border-gray-400 text-xs hover:bg-gray-300"
          style={{ borderStyle: "outset" }}
        >
          ⏹️
        </button>
        <button
          className="px-2 py-1 bg-gray-200 border border-gray-400 text-xs hover:bg-gray-300"
          style={{ borderStyle: "outset" }}
        >
          ⏭️
        </button>
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1 bg-black p-4 overflow-auto">
        {selectedFile ? (
          <div className="h-full flex flex-col">
            <div className="text-white text-sm mb-2">正在播放: {selectedFile.name}</div>
            <div className="flex-1 flex items-center justify-center">{renderMedia()}</div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-white">
            <div className="text-center">
              <div className="text-6xl mb-4">🎬</div>
              <h2 className="text-xl mb-2">Windows Media Player</h2>
              <p className="text-sm mb-4">点击"打开文件"选择媒体文件</p>
              <p className="text-xs text-gray-400">支持格式: MP4, MP3, JPG, PNG</p>
            </div>
          </div>
        )}
      </div>

      {/* 隐藏的文件输入 */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".mp4,.mp3,.jpg,.jpeg,.png"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 状态栏 */}
      <div className="bg-gray-200 p-1 border-t border-gray-400 text-xs">
        {selectedFile ? `已加载: ${selectedFile.name}` : "就绪"}
      </div>
    </div>
  )
}
