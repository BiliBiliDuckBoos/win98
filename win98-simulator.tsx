"use client"

import type React from "react"

import { useState } from "react"
import { DesktopIcon } from "./components/desktop-icon"
import { Window } from "./components/window"
import { Taskbar } from "./components/taskbar"
import { PaintCanvas } from "./components/paint-canvas"
import { Minesweeper } from "./components/minesweeper"
import { IEBrowser } from "./components/ie-browser"
import { MediaPlayer } from "./components/media-player"
import { FileViewer } from "./components/file-viewer"

export default function Win98Simulator() {
  const [openWindows, setOpenWindows] = useState<Array<{ id: string; title: string; content: React.ReactNode }>>([])
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([])
  const [paintColor, setPaintColor] = useState("#000000")
  const [paintTool, setPaintTool] = useState("brush")

  const openWindow = (id: string, title: string, content: React.ReactNode) => {
    if (!openWindows.find((w) => w.id === id)) {
      setOpenWindows([...openWindows, { id, title, content }])
      setMinimizedWindows(minimizedWindows.filter((winId) => winId !== id))
    }
  }

  const closeWindow = (id: string) => {
    setOpenWindows(openWindows.filter((w) => w.id !== id))
    setMinimizedWindows(minimizedWindows.filter((winId) => winId !== id))
  }

  const minimizeWindow = (id: string) => {
    setMinimizedWindows([...minimizedWindows, id])
  }

  const restoreWindow = (id: string) => {
    setMinimizedWindows(minimizedWindows.filter((winId) => winId !== id))
  }

  const openNotepadWithContent = (fileName: string, content: string) => {
    const notepadContent = (
      <div className="h-full flex flex-col">
        <div className="bg-gray-200 p-1 border-b border-gray-400">
          <div className="text-xs">文件(F) 编辑(E) 搜索(S) 帮助(H)</div>
        </div>
        <textarea
          className="flex-1 p-2 border-none resize-none font-mono text-sm"
          defaultValue={content}
          placeholder="在此输入文本..."
        />
      </div>
    )
    openWindow(`notepad-${fileName}`, `记事本 - ${fileName}`, notepadContent)
  }

  const desktopIcons = [
    { icon: "💻", label: "我的电脑", id: "mycomputer" },
    { icon: "🗂️", label: "我的文档", id: "mydocuments" },
    { icon: "🗑️", label: "回收站", id: "recycle" },
    { icon: "🌐", label: "Internet Explorer", id: "ie" },
    { icon: "📝", label: "记事本", id: "notepad" },
    { icon: "🎨", label: "画图", id: "paint" },
    { icon: "🎵", label: "媒体播放器", id: "mediaplayer" },
    { icon: "💣", label: "扫雷", id: "minesweeper" },
    { icon: "/bilibili-icon.png", label: "BiliBili", id: "bilibili", isImage: true },
    { icon: "👋", label: "你好", id: "hello" },
  ]

  const getWindowContent = (id: string) => {
    switch (id) {
      case "hello":
        return (
          <div className="p-6 h-full flex flex-col items-center justify-center bg-white">
            <div className="text-center max-w-md">
              <h2 className="text-2xl font-bold mb-6 text-blue-800">你好！</h2>
              <p className="text-base mb-8 leading-relaxed text-gray-700">这个网站是测试中，如果有好的想法可以联系我</p>
              <button
                onClick={() => window.open("https://space.bilibili.com/1717132739", "_blank")}
                className="px-6 py-3 bg-blue-600 text-white border-2 border-blue-800 hover:bg-blue-700 text-base font-bold rounded"
                style={{ borderStyle: "outset" }}
              >
                -我的B站主页-
              </button>
            </div>
          </div>
        )

      case "mycomputer":
        return (
          <div className="p-4">
            <h3 className="font-bold mb-4">我的电脑</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center p-2 border border-gray-400">
                <span className="text-2xl mr-2">💾</span>
                <span>软盘 (A:)</span>
              </div>
              <div className="flex items-center p-2 border border-gray-400">
                <span className="text-2xl mr-2">💿</span>
                <span>光盘 (D:)</span>
              </div>
              <div className="flex items-center p-2 border border-gray-400">
                <span className="text-2xl mr-2">🖥️</span>
                <span>本地磁盘 (C:)</span>
              </div>
              <div className="flex items-center p-2 border border-gray-400">
                <span className="text-2xl mr-2">🖨️</span>
                <span>控制面板</span>
              </div>
            </div>
          </div>
        )
      case "mydocuments":
        const documentsFiles = [
          {
            name: "一键三连.txt",
            content: "哔哩哔哩DuckBoos创作，记得一定一定一定一定一定一定要一键三连+关注！",
            type: "file" as const,
          },
        ]
        return <FileViewer files={documentsFiles} onFileOpen={openNotepadWithContent} />

      case "recycle":
        return <FileViewer files={[]} />

      case "notepad":
        return (
          <div className="h-full flex flex-col">
            <div className="bg-gray-200 p-1 border-b border-gray-400">
              <div className="text-xs">文件(F) 编辑(E) 搜索(S) 帮助(H)</div>
            </div>
            <textarea className="flex-1 p-2 border-none resize-none font-mono text-sm" placeholder="在此输入文本..." />
          </div>
        )
      case "paint":
        const colors = [
          "#000000",
          "#FF0000",
          "#00FF00",
          "#0000FF",
          "#FFFF00",
          "#FF00FF",
          "#00FFFF",
          "#FFFFFF",
          "#808080",
          "#800000",
          "#008000",
          "#000080",
          "#808000",
          "#800080",
          "#008080",
          "#C0C0C0",
        ]

        const tools = [
          { id: "brush", icon: "🖌️", name: "画笔" },
          { id: "pencil", icon: "✏️", name: "铅笔" },
          { id: "line", icon: "📏", name: "直线" },
          { id: "rect", icon: "🔲", name: "矩形" },
        ]

        return (
          <div className="h-full flex flex-col">
            <div className="bg-gray-200 p-1 border-b border-gray-400">
              <div className="text-xs">文件(F) 编辑(E) 查看(V) 图像(I) 颜色(C) 帮助(H)</div>
            </div>
            <div className="flex flex-1">
              <div className="w-20 bg-gray-200 border-r border-gray-400 p-1">
                <div className="mb-2 text-xs">工具:</div>
                <div className="grid grid-cols-2 gap-1 mb-4">
                  {tools.map((tool) => (
                    <div
                      key={tool.id}
                      className={`w-6 h-6 border-2 cursor-pointer flex items-center justify-center text-xs ${
                        paintTool === tool.id
                          ? "border-black bg-blue-200"
                          : "border-gray-400 bg-white hover:bg-gray-100"
                      }`}
                      onClick={() => setPaintTool(tool.id)}
                      title={tool.name}
                    >
                      {tool.icon}
                    </div>
                  ))}
                </div>
                <div className="text-xs mb-1">颜色:</div>
                <div className="grid grid-cols-4 gap-1">
                  {colors.map((color) => (
                    <div
                      key={color}
                      className={`w-4 h-4 border-2 cursor-pointer ${paintColor === color ? "border-black" : "border-gray-400"}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setPaintColor(color)}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="flex-1 p-2">
                <PaintCanvas
                  width={400}
                  height={280}
                  brushColor={paintColor}
                  brushSize={paintTool === "pencil" ? 1 : 2}
                  onColorChange={setPaintColor}
                />
              </div>
            </div>
          </div>
        )

      case "ie":
        return <IEBrowser />

      case "minesweeper":
        return <Minesweeper />

      case "mediaplayer":
        return <MediaPlayer />

      case "bilibili":
        window.open("https://www.bilibili.com", "_blank")
        return (
          <div className="p-4 text-center">
            <div className="text-4xl mb-4">📺</div>
            <h3 className="font-bold mb-2">BiliBili</h3>
            <p>正在跳转到 www.bilibili.com...</p>
          </div>
        )

      default:
        return (
          <div className="p-4">
            <h3 className="font-bold mb-2">{id}</h3>
            <p>这是一个 Windows 98 应用程序窗口。</p>
          </div>
        )
    }
  }

  return (
    <div
      className="h-screen w-screen overflow-hidden relative"
      style={{
        background:
          "linear-gradient(45deg, #008080 25%, transparent 25%), linear-gradient(-45deg, #008080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #008080 75%), linear-gradient(-45deg, transparent 75%, #008080 75%)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
        backgroundColor: "#008080",
      }}
      onClick={() => setSelectedIcon(null)}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 grid grid-cols-1 gap-2">
        {desktopIcons.map((icon, index) => (
          <DesktopIcon
            key={index}
            icon={
              icon.isImage ? (
                <img src={icon.icon || "/placeholder.svg"} alt={icon.label} className="w-8 h-8 object-contain" />
              ) : (
                icon.icon
              )
            }
            label={icon.label}
            selected={selectedIcon === icon.id}
            onSelect={() => setSelectedIcon(icon.id)}
            onDoubleClick={() => openWindow(icon.id, icon.label, getWindowContent(icon.id))}
          />
        ))}
      </div>

      {/* Windows */}
      {openWindows
        .filter((window) => !minimizedWindows.includes(window.id))
        .map((window, index) => (
          <Window
            key={window.id}
            title={window.title}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            initialPosition={{ x: 150 + index * 30, y: 100 + index * 30 }}
            width={500}
            height={400}
          >
            {window.content}
          </Window>
        ))}

      {/* Taskbar */}
      <Taskbar openWindows={openWindows} minimizedWindows={minimizedWindows} onWindowRestore={restoreWindow} />
    </div>
  )
}
