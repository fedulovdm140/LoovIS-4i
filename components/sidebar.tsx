"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { BarChart2, FileText, Home, Settings, Users, BookOpen, PlusCircle, Grid } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import ToolsModal from "@/components/tools-modal"

export default function Sidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const [showToolsModal, setShowToolsModal] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    { name: t("dashboard"), href: "/", icon: Home },
    { name: t("all_tools"), href: "#", icon: Grid, isModal: true },
    { name: t("tasks"), href: "/tasks", icon: FileText },
    { name: t("wiki"), href: "/wiki", icon: BookOpen },
    { name: t("team"), href: "/team", icon: Users },
    { name: t("analytics"), href: "/analytics", icon: BarChart2 },
    { name: t("new_club"), href: "/new-club", icon: PlusCircle },
  ]

  return (
    <div className="w-[200px] border-r bg-white flex-shrink-0 h-full hidden md:block">
      <div className="p-4">
        <Link href="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-600">LoovIS</h1>
        </Link>
      </div>
      <nav className="mt-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.name}>
                {item.isModal ? (
                  <button
                    onClick={() => setShowToolsModal(true)}
                    className={`flex items-center px-4 py-3 text-sm w-full text-left ${
                      isActive(item.href) ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm ${
                      isActive(item.href) ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="absolute bottom-4 left-0 w-full px-4">
        <Link
          href="/settings"
          className={`flex items-center px-4 py-3 text-sm ${
            isActive("/settings") ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Settings className="w-5 h-5 mr-3" />
          {t("settings")}
        </Link>
      </div>
      {showToolsModal && <ToolsModal open={showToolsModal} onOpenChange={setShowToolsModal} />}
    </div>
  )
}
