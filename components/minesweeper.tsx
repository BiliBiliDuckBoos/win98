"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface Cell {
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  neighborMines: number
}

export function Minesweeper() {
  const [rows, setRows] = useState(9)
  const [cols, setCols] = useState(9)
  const [mines, setMines] = useState(10)
  const [board, setBoard] = useState<Cell[][]>([])
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing")
  const [mineCount, setMineCount] = useState(mines)
  const [showSettings, setShowSettings] = useState(false)

  const initializeBoard = () => {
    // 创建空白棋盘
    const newBoard: Cell[][] = Array(rows)
      .fill(null)
      .map(() =>
        Array(cols)
          .fill(null)
          .map(() => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            neighborMines: 0,
          })),
      )

    // 随机放置地雷
    let minesPlaced = 0
    while (minesPlaced < mines) {
      const row = Math.floor(Math.random() * rows)
      const col = Math.floor(Math.random() * cols)
      if (!newBoard[row][col].isMine) {
        newBoard[row][col].isMine = true
        minesPlaced++
      }
    }

    // 计算每个格子周围的地雷数量
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!newBoard[row][col].isMine) {
          let count = 0
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              const newRow = row + i
              const newCol = col + j
              if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && newBoard[newRow][newCol].isMine) {
                count++
              }
            }
          }
          newBoard[row][col].neighborMines = count
        }
      }
    }

    setBoard(newBoard)
    setGameStatus("playing")
    setMineCount(mines)
  }

  const applySettings = () => {
    setShowSettings(false)
    initializeBoard()
  }

  useEffect(() => {
    initializeBoard()
  }, [])

  const revealCell = (row: number, col: number) => {
    if (gameStatus !== "playing" || board[row][col].isRevealed || board[row][col].isFlagged) {
      return
    }

    const newBoard = [...board]
    newBoard[row][col].isRevealed = true

    if (newBoard[row][col].isMine) {
      setGameStatus("lost")
      // 显示所有地雷
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (newBoard[i][j].isMine) {
            newBoard[i][j].isRevealed = true
          }
        }
      }
    } else if (newBoard[row][col].neighborMines === 0) {
      // 如果是空格，自动揭开周围的格子
      const queue = [[row, col]]
      while (queue.length > 0) {
        const [currentRow, currentCol] = queue.shift()!
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = currentRow + i
            const newCol = currentCol + j
            if (
              newRow >= 0 &&
              newRow < rows &&
              newCol >= 0 &&
              newCol < cols &&
              !newBoard[newRow][newCol].isRevealed &&
              !newBoard[newRow][newCol].isFlagged
            ) {
              newBoard[newRow][newCol].isRevealed = true
              if (newBoard[newRow][newCol].neighborMines === 0 && !newBoard[newRow][newCol].isMine) {
                queue.push([newRow, newCol])
              }
            }
          }
        }
      }
    }

    setBoard(newBoard)

    // 检查是否获胜
    let revealedCount = 0
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (newBoard[i][j].isRevealed && !newBoard[i][j].isMine) {
          revealedCount++
        }
      }
    }
    if (revealedCount === rows * cols - mines) {
      setGameStatus("won")
    }
  }

  const toggleFlag = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault()
    if (gameStatus !== "playing" || board[row][col].isRevealed) {
      return
    }

    const newBoard = [...board]
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged
    setBoard(newBoard)
    setMineCount(mineCount + (newBoard[row][col].isFlagged ? -1 : 1))
  }

  const getCellContent = (cell: Cell) => {
    if (cell.isFlagged) return "🚩"
    if (!cell.isRevealed) return ""
    if (cell.isMine) return "💣"
    if (cell.neighborMines === 0) return ""
    return cell.neighborMines.toString()
  }

  const getCellColor = (cell: Cell) => {
    if (!cell.isRevealed) return "text-black"
    if (cell.isMine) return "text-red-600"
    const colors = [
      "text-blue-600",
      "text-green-600",
      "text-red-600",
      "text-purple-600",
      "text-yellow-600",
      "text-pink-600",
      "text-gray-600",
      "text-black",
    ]
    return colors[cell.neighborMines - 1] || "text-black"
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-bold">地雷数: {mineCount}</div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-2 py-1 bg-gray-200 border-2 border-gray-400 text-xs hover:bg-gray-300"
            style={{ borderStyle: "outset" }}
          >
            设置
          </button>
          <button
            onClick={initializeBoard}
            className="px-3 py-1 bg-gray-200 border-2 border-gray-400 text-sm hover:bg-gray-300"
            style={{ borderStyle: "outset" }}
          >
            {gameStatus === "playing" ? "😐" : gameStatus === "won" ? "😎" : "😵"}
          </button>
        </div>
        <div className="text-sm font-bold">
          状态: {gameStatus === "playing" ? "游戏中" : gameStatus === "won" ? "获胜!" : "失败!"}
        </div>
      </div>

      {showSettings && (
        <div className="mb-4 p-3 bg-gray-100 border border-gray-400">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <label className="text-xs block mb-1">格子数 (10-30):</label>
              <input
                type="number"
                min="10"
                max="30"
                value={rows}
                onChange={(e) => {
                  const value = Math.max(10, Math.min(30, Number.parseInt(e.target.value) || 10))
                  setRows(value)
                  setCols(value)
                }}
                className="w-full px-2 py-1 border border-gray-400 text-sm"
              />
            </div>
            <div>
              <label className="text-xs block mb-1">地雷数 (5-20):</label>
              <input
                type="number"
                min="5"
                max="20"
                value={mines}
                onChange={(e) => setMines(Math.max(5, Math.min(20, Number.parseInt(e.target.value) || 10)))}
                className="w-full px-2 py-1 border border-gray-400 text-sm"
              />
            </div>
          </div>
          <button
            onClick={applySettings}
            className="px-3 py-1 bg-gray-200 border-2 border-gray-400 text-xs hover:bg-gray-300"
            style={{ borderStyle: "outset" }}
          >
            应用设置
          </button>
        </div>
      )}

      <div
        className="border-2 border-gray-600 inline-block"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: "0px",
          lineHeight: 0,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className={`w-4 h-4 text-xs font-bold flex items-center justify-center ${
                cell.isRevealed ? (cell.isMine ? "bg-red-300" : "bg-gray-100") : "bg-gray-300 hover:bg-gray-200"
              } ${getCellColor(cell)}`}
              style={{
                borderStyle: cell.isRevealed ? "inset" : "outset",
                borderWidth: "1px",
                borderRightColor: "#666",
                borderBottomColor: "#666",
                borderLeftColor: "#fff",
                borderTopColor: "#fff",
              }}
              onClick={() => revealCell(rowIndex, colIndex)}
              onContextMenu={(e) => toggleFlag(e, rowIndex, colIndex)}
            >
              {getCellContent(cell)}
            </button>
          )),
        )}
      </div>
      <div className="mt-2 text-xs text-gray-600">左键点击揭开格子，右键点击标记地雷</div>
    </div>
  )
}
