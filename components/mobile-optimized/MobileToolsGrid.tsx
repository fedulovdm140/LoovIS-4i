"use client"

import { useLanguage } from "@/contexts/language-context"
import { MobileToolCard } from "./MobileToolCard"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import {
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

interface Category {
  id: string
  name: string
}

export function MobileToolsGrid() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  const categories: Category[] = [
    { id: "all", name: t("all_tools") },
    { id: "operations", name: t("operations") },
    { id: "planning", name: t("planning") },
    { id: "hr", name: t("human_resources") },
    { id: "reports", name: t("reports") },
    { id: "admin", name: t("administration") },
  ]

  const tools = [
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

  // Фильтрация инструментов
  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "all" || tool.category === activeCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="p-4">
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

      <div className="space-y-2">
        {filteredTools.map((tool) => (
          <MobileToolCard
            key={tool.id}
            id={tool.id}
            name={tool.name}
            description={tool.description}
            icon={tool.icon}
            path={tool.path}
            isNew={tool.isNew}
            isFavorite={tool.isFavorite}
          />
        ))}

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
    </div>
  )
}
