"use client"

import type React from "react"

import { useState } from "react"

export function IEBrowser() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // 使用必应搜索，在新窗口打开
      const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(searchQuery.trim())}`
      window.open(searchUrl, "_blank")
    }
  }

  const handleQuickSearch = (query: string) => {
    const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(query)}`
    window.open(searchUrl, "_blank")
  }

  return (
    <div className="h-full flex flex-col bg-gray-200">
      {/* 菜单栏 */}
      <div className="bg-gray-200 p-1 border-b border-gray-400 text-xs">
        文件(F) 编辑(E) 查看(V) 收藏夹(A) 工具(T) 帮助(H)
      </div>

      {/* 工具栏 */}
      <div className="bg-gray-200 p-2 border-b border-gray-400 flex items-center gap-2">
        <button
          className="px-2 py-1 bg-gray-200 border border-gray-400 text-xs hover:bg-gray-300"
          style={{ borderStyle: "outset" }}
        >
          后退
        </button>
        <button
          className="px-2 py-1 bg-gray-200 border border-gray-400 text-xs hover:bg-gray-300"
          style={{ borderStyle: "outset" }}
        >
          前进
        </button>
        <button
          className="px-2 py-1 bg-gray-200 border border-gray-400 text-xs hover:bg-gray-300"
          style={{ borderStyle: "outset" }}
        >
          停止
        </button>
        <button
          className="px-2 py-1 bg-gray-200 border border-gray-400 text-xs hover:bg-gray-300"
          style={{ borderStyle: "outset" }}
        >
          刷新
        </button>
        <button
          className="px-2 py-1 bg-gray-200 border border-gray-400 text-xs hover:bg-gray-300"
          style={{ borderStyle: "outset" }}
        >
          主页
        </button>
      </div>

      {/* 地址栏 */}
      <div className="bg-gray-200 p-2 border-b border-gray-400 flex items-center gap-2">
        <span className="text-xs">地址(D):</span>
        <form onSubmit={handleSearch} className="flex-1 flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-2 py-1 border border-gray-400 text-sm"
            style={{ borderStyle: "inset" }}
            placeholder="输入搜索内容..."
          />
          <button
            type="submit"
            className="px-3 py-1 bg-gray-200 border border-gray-400 text-xs hover:bg-gray-300 ml-1"
            style={{ borderStyle: "outset" }}
          >
            转到
          </button>
        </form>
      </div>

      {/* 主要内容区域 */}
      <div className="flex-1 bg-white p-4 overflow-auto">
        <div className="text-center">
          <div className="mb-6">
            <img src="/placeholder.svg?height=60&width=200" alt="Internet Explorer" className="mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-blue-800 mb-2">Internet Explorer</h1>
            <p className="text-gray-600">欢迎使用 Internet Explorer</p>
          </div>

          <div className="max-w-md mx-auto">
            <form onSubmit={handleSearch} className="mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-400 text-lg mb-3"
                style={{ borderStyle: "inset" }}
                placeholder="搜索互联网..."
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white border-2 border-blue-800 hover:bg-blue-700"
                style={{ borderStyle: "outset" }}
              >
                搜索
              </button>
            </form>

            <div className="text-left">
              <h3 className="font-bold mb-2">快速搜索:</h3>
              <div className="space-y-1">
                <button
                  onClick={() => handleQuickSearch("Windows 98")}
                  className="block w-full text-left px-2 py-1 text-blue-600 hover:bg-blue-100 underline"
                >
                  🪟 Windows 98
                </button>
                <button
                  onClick={() => handleQuickSearch("经典游戏")}
                  className="block w-full text-left px-2 py-1 text-blue-600 hover:bg-blue-100 underline"
                >
                  🎮 经典游戏
                </button>
                <button
                  onClick={() => handleQuickSearch("90年代音乐")}
                  className="block w-full text-left px-2 py-1 text-blue-600 hover:bg-blue-100 underline"
                >
                  🎵 90年代音乐
                </button>
                <button
                  onClick={() => handleQuickSearch("怀旧软件")}
                  className="block w-full text-left px-2 py-1 text-blue-600 hover:bg-blue-100 underline"
                >
                  💾 怀旧软件
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs text-gray-500">
            <p>在地址栏输入搜索内容并按回车，将在新窗口中打开搜索结果</p>
          </div>
        </div>
      </div>

      {/* 状态栏 */}
      <div className="bg-gray-200 p-1 border-t border-gray-400 text-xs">完毕</div>
    </div>
  )
}
