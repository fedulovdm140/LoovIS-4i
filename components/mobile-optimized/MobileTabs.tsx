"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, Check } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Tab {
  id: string
  label: string
  shortLabel?: string
  icon?: React.ComponentType<{ className?: string }>
  badge?: number
}

interface MobileTabsProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  children: React.ReactNode
}

export function MobileTabs({ tabs, activeTab, onTabChange, children }: MobileTabsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const activeTabData = tabs.find((tab) => tab.id === activeTab)

  return (
    <div>
      {/* Мобильный dropdown */}
      <div className="lg:hidden mb-6">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between h-14 text-left border-2 hover:border-blue-200 focus:border-blue-500 touch-manipulation"
              size="lg"
            >
              <div className="flex items-center space-x-3">
                {activeTabData?.icon && <activeTabData.icon className="h-5 w-5 text-blue-600" />}
                <div>
                  <span className="font-medium text-base">{activeTabData?.label}</span>
                  {activeTabData?.badge && (
                    <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-600 rounded-full">
                      {activeTabData.badge}
                    </span>
                  )}
                </div>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[calc(100vw-2rem)] max-w-md">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <DropdownMenuItem
                  key={tab.id}
                  onClick={() => {
                    onTabChange(tab.id)
                    setIsOpen(false)
                  }}
                  className={`py-4 px-4 cursor-pointer touch-manipulation ${
                    isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      {Icon && <Icon className="h-5 w-5" />}
                      <span className="font-medium">{tab.label}</span>
                      {tab.badge && (
                        <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-600 rounded-full">
                          {tab.badge}
                        </span>
                      )}
                    </div>
                    {isActive && <Check className="h-4 w-4 text-blue-600" />}
                  </div>
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Десктопные табы с горизонтальным скроллом */}
      <div className="hidden lg:block">
        <ScrollArea className="w-full">
          <div className="flex space-x-2 mb-6 p-1 bg-gray-100 rounded-xl">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id

              return (
                <Button
                  key={tab.id}
                  variant={isActive ? "default" : "ghost"}
                  onClick={() => onTabChange(tab.id)}
                  className={`whitespace-nowrap px-4 py-3 h-auto flex items-center space-x-2 transition-all duration-200 ${
                    isActive
                      ? "bg-white shadow-sm text-blue-600 border border-blue-200"
                      : "hover:bg-white/70 text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span className="font-medium">{tab.shortLabel || tab.label}</span>
                  {tab.badge && (
                    <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-blue-600 rounded-full">
                      {tab.badge}
                    </span>
                  )}
                </Button>
              )
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Контент табов */}
      <div className="animate-in fade-in-50 duration-200">{children}</div>
    </div>
  )
}
