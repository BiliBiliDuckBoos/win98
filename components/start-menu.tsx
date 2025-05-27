"use client"

interface StartMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function StartMenu({ isOpen, onClose }: StartMenuProps) {
  if (!isOpen) return null

  const menuItems = [
    { icon: "📁", label: "Programs", hasSubmenu: true },
    { icon: "📄", label: "Documents", hasSubmenu: true },
    { icon: "⚙️", label: "Settings", hasSubmenu: true },
    { icon: "🔍", label: "Find" },
    { icon: "❓", label: "Help" },
    { icon: "🏃", label: "Run..." },
    { icon: "💤", label: "Shut Down..." },
  ]

  return (
    <div
      className="absolute bottom-8 left-0 w-64 bg-gray-200 border-2 border-gray-400 shadow-lg"
      style={{ borderStyle: "outset" }}
    >
      {/* Start Menu Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-2 flex items-center">
        <div className="text-2xl mr-2">🪟</div>
        <div>
          <div className="font-bold text-sm">Windows 98</div>
          <div className="text-xs opacity-90">模拟器</div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-1">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer text-sm"
            onClick={onClose}
          >
            <span className="mr-3">{item.icon}</span>
            <span className="flex-1">{item.label}</span>
            {item.hasSubmenu && <span className="text-xs">▶</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
