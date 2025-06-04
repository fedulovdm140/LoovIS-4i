"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Calendar,
  FileText,
  Users,
  BarChart3,
  Settings,
  Briefcase,
  Store,
  Award,
  Microscope,
  BookOpen,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useMobile } from "@/hooks/use-mobile"
import Link from "next/link"

interface Tool {
  id: string
  name: string
  description: string
  icon: React.ElementType
  category: string
  isNew?: boolean
  isFavorite?: boolean
  path: string
}

export default function ToolsPage() {
  const { t } = useLanguage()
  const isMobile = useMobile()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const tools: Tool[] = [
    {
      id: "new-club",
      name: t("new_club"),
      description: t("new_club_description"),
      icon: Store,
      category: "operations",
      isNew: true,
      path: "/new-club",
    },
    {
      id: "calendar",
      name: t("calendar"),
      description: t("calendar_description"),
      icon: Calendar,
      category: "planning",
      isFavorite: true,
      path: "/calendar",
    },
    {
      id: "tasks",
      name: t("tasks"),
      description: t("tasks_description"),
      icon: FileText,
      category: "operations",
      path: "/tasks",
    },
    {
      id: "team",
      name: t("team"),
      description: t("team_description"),
      icon: Users,
      category: "hr",
      path: "/team",
    },
    {
      id: "analytics",
      name: t("analytics"),
      description: t("analytics_description"),
      icon: BarChart3,
      category: "reports",
      path: "/analytics",
    },
    {
      id: "settings",
      name: t("settings"),
      description: t("settings_description"),
      icon: Settings,
      category: "admin",
      path: "/settings",
    },
    {
      id: "hr",
      name: t("hr_portal"),
      description: t("hr_portal_description"),
      icon: Briefcase,
      category: "hr",
      path: "/hr",
    },
    {
      id: "success-cases",
      name: t("success_cases"),
      description: t("success_cases_description"),
      icon: Award,
      category: "reports",
      path: "/success-cases",
    },
    {
      id: "equipment",
      name: t("equipment"),
      description: t("equipment_description"),
      icon: Microscope,
      category: "operations",
      path: "/equipment",
    },
    {
      id: "wiki",
      name: t("knowledge_base"),
      description: t("knowledge_base_description"),
      icon: BookOpen,
      category: "operations",
      path: "/wiki",
    },
  ]

  const categories = [
    { id: "all", name: t("all_tools") },
    { id: "operations", name: t("operations") },
    { id: "planning", name: t("planning") },
    { id: "hr", name: t("human_resources") },
    { id: "reports", name: t("reports") },
    { id: "admin", name: t("administration") },
  ]

  // Фильтрация инструментов
  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory

    return matchesSearch && matchesCategory
  })

  if (isMobile) {
    return (
      <div className="p-4 pb-20">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{t("tools")}</h1>
          <p className="text-gray-500 text-sm">{t("tools_description_long")}</p>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder={t("search_tools")}
            className="pl-9 py-5 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="mb-4 overflow-x-auto pb-2">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                className={`whitespace-nowrap px-3 py-1 h-auto text-sm ${
                  activeCategory === category.id ? "bg-blue-600 text-white" : ""
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Компактная плитка для мобильных */}
        <div className="grid grid-cols-2 gap-3">
          {filteredTools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link href={tool.path} key={tool.id} className="block">
                <Card className="h-full hover:shadow-md transition-shadow border-2 hover:border-blue-200 relative">
                  <CardContent className="p-4 flex flex-col h-full">
                    {/* Бейджи */}
                    <div className="absolute top-2 right-2 flex space-x-1">
                      {tool.isNew && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800 text-xs px-1.5 py-0.5">
                          {t("new")}
                        </Badge>
                      )}
                      {tool.isFavorite && (
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 hover:text-amber-800 text-xs px-1.5 py-0.5">
                          ★
                        </Badge>
                      )}
                    </div>

                    {/* Иконка */}
                    <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>

                    {/* Название */}
                    <h3 className="font-semibold text-base mb-2 line-clamp-2 flex-1">{tool.name}</h3>

                    {/* Описание - скрыто на мобильных для экономии места */}
                    <p className="text-gray-600 text-xs line-clamp-2 mb-3">{tool.description}</p>

                    {/* Кнопка */}
                    <Button size="sm" className="w-full text-xs py-2">
                      {t("open")}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-base font-medium mb-1">{t("no_tools_found")}</h3>
            <p className="text-sm text-gray-500">{t("try_different_search")}</p>
          </div>
        )}
      </div>
    )
  }

  // Десктопная версия
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">{t("tools")}</h1>
        <p className="text-gray-500">{t("tools_description_long")}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder={t("search_tools")}
            className="pl-10 py-6 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex space-x-2 min-w-max">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={`whitespace-nowrap px-4 py-2 h-auto ${
                activeCategory === category.id ? "bg-blue-600 text-white" : ""
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTools.map((tool) => {
          const Icon = tool.icon
          return (
            <Link href={tool.path} key={tool.id} className="block">
              <Card className="h-full hover:shadow-md transition-shadow border-2 hover:border-blue-200">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex space-x-2">
                      {tool.isNew && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800">
                          {t("new")}
                        </Badge>
                      )}
                      {tool.isFavorite && (
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 hover:text-amber-800">
                          {t("favorite")}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
                  <p className="text-gray-600 text-sm flex-1">{tool.description}</p>
                  <div className="mt-4">
                    <Button className="w-full">{t("open")}</Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium mb-2">{t("no_tools_found")}</h3>
          <p className="text-gray-500">{t("try_different_search")}</p>
        </div>
      )}
    </div>
  )
}
