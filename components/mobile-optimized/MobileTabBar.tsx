"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { LayoutDashboard, Grid, MessageCircle, BookOpen, CheckSquare } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface TabItem {
  path: string
  labelKey: string
  icon: React.ElementType
}

export function MobileTabBar() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const tabs: TabItem[] = [
    {
      path: "/",
      labelKey: "dashboard",
      icon: LayoutDashboard,
    },
    {
      path: "/tools",
      labelKey: "tools",
      icon: Grid,
    },
    {
      path: "/chat",
      labelKey: "chat",
      icon: MessageCircle,
    },
    {
      path: "/wiki",
      labelKey: "knowledge_base",
      icon: BookOpen,
    },
    {
      path: "/tasks",
      labelKey: "tasks",
      icon: CheckSquare,
    },
  ]

  // Определяем активный таб
  const getActiveTab = (path: string): boolean => {
    if (pathname === path) return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 lg:hidden safe-area-bottom">
      <nav className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = getActiveTab(tab.path)
          const Icon = tab.icon

          return (
            <Link
              key={tab.path}
              href={tab.path}
              className="relative flex flex-col items-center justify-center py-2 flex-1 min-h-[60px] touch-manipulation"
              aria-label={t(tab.labelKey)}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="flex flex-col items-center justify-center w-full transition-colors">
                {isActive && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute top-0 left-0 right-0 h-1 bg-blue-600 rounded-b-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon className={`h-6 w-6 mb-1 transition-colors ${isActive ? "text-blue-600" : "text-gray-500"}`} />
                <span
                  className={`text-xs font-medium transition-colors ${isActive ? "text-blue-600" : "text-gray-500"}`}
                >
                  {t(tab.labelKey)}
                </span>
              </div>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
