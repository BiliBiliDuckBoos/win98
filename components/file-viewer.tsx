"use client"

import { useState } from "react"

interface FileViewerProps {
  files: Array<{ name: string; content?: string; type: "file" | "folder" }>
  onFileOpen?: (fileName: string, content: string) => void
}

export function FileViewer({ files, onFileOpen }: FileViewerProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  const handleFileDoubleClick = (file: { name: string; content?: string; type: "file" | "folder" }) => {
    if (file.type === "file" && file.content && onFileOpen) {
      onFileOpen(file.name, file.content)
    }
  }

  return (
    <div className="p-4 h-full bg-white">
      {files.length === 0 ? (
        <div className="text-center text-gray-500 mt-8">
          <div className="text-4xl mb-2">📁</div>
          <p>没有文件</p>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {files.map((file, index) => (
            <div
              key={index}
              className={`flex flex-col items-center p-2 cursor-pointer hover:bg-blue-100 ${
                selectedFile === file.name ? "bg-blue-200" : ""
              }`}
              onClick={() => setSelectedFile(file.name)}
              onDoubleClick={() => handleFileDoubleClick(file)}
            >
              <div className="text-2xl mb-1">{file.type === "folder" ? "📁" : "📄"}</div>
              <div className="text-xs text-center">{file.name}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
