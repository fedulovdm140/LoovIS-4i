"use client"

import { useState } from "react"
import {
  BrainCircuit,
  Mail,
  Globe,
  Calculator,
  Calendar,
  Database,
  FileText,
  MessageSquare,
  PenToolIcon as Tool,
  Video,
  Search,
  Briefcase,
  LineChart,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface ToolsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ToolsModal({ open, onOpenChange }: ToolsModalProps) {
  const { language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  // Prepare translations
  const allToolsText = language === "ru" ? "Все инструменты" : "All Tools"
  const searchPlaceholder = language === "ru" ? "Поиск инструментов..." : "Search tools..."
  const allCategoryText = language === "ru" ? "Все" : "All"
  const communicationText = language === "ru" ? "Коммуникации" : "Communication"
  const officeText = language === "ru" ? "Офис" : "Office"
  const analyticsText = language === "ru" ? "Аналитика" : "Analytics"
  const newText = language === "ru" ? "Новое" : "New"

  // Tool data
  const tools = [
    {
      id: 1,
      name: language === "ru" ? "Почта" : "Email",
      description: language === "ru" ? "Корпоративная почта" : "Corporate email",
      icon: Mail,
      category: "communication",
      isNew: false,
      roles: ["all"],
    },
    {
      id: 2,
      name: language === "ru" ? "Календарь" : "Calendar",
      description: language === "ru" ? "Планировщик встреч" : "Meeting planner",
      icon: Calendar,
      category: "office",
      isNew: false,
      roles: ["all"],
    },
    {
      id: 3,
      name: language === "ru" ? "CRM" : "CRM",
      description: language === "ru" ? "Управление клиентами" : "Customer management",
      icon: Briefcase,
      category: "office",
      isNew: false,
      roles: ["manager", "admin"],
    },
    {
      id: 4,
      name: language === "ru" ? "Чат" : "Chat",
      description: language === "ru" ? "Корпоративный мессенджер" : "Corporate messenger",
      icon: MessageSquare,
      category: "communication",
      isNew: false,
      roles: ["all"],
    },
    {
      id: 5,
      name: language === "ru" ? "Видеоконференции" : "Video Conferences",
      description: language === "ru" ? "Видео звонки" : "Video calls",
      icon: Video,
      category: "communication",
      isNew: false,
      roles: ["all"],
    },
    {
      id: 6,
      name: language === "ru" ? "База знаний" : "Knowledge Base",
      description: language === "ru" ? "Корпоративная база знаний" : "Corporate knowledge base",
      icon: Database,
      category: "office",
      isNew: false,
      roles: ["all"],
    },
    {
      id: 7,
      name: language === "ru" ? "Документы" : "Documents",
      description: language === "ru" ? "Совместная работа с документами" : "Document collaboration",
      icon: FileText,
      category: "office",
      isNew: false,
      roles: ["all"],
    },
    {
      id: 8,
      name: language === "ru" ? "Аналитика продаж" : "Sales Analytics",
      description: language === "ru" ? "Отчеты по продажам" : "Sales reports",
      icon: LineChart,
      category: "analytics",
      isNew: false,
      roles: ["manager", "admin"],
    },
    {
      id: 9,
      name: language === "ru" ? "Калькулятор" : "Calculator",
      description: language === "ru" ? "Финансовый калькулятор" : "Financial calculator",
      icon: Calculator,
      category: "analytics",
      isNew: false,
      roles: ["all"],
    },
    {
      id: 10,
      name: language === "ru" ? "AI Ассистент" : "AI Assistant",
      description: language === "ru" ? "Помощник на базе ИИ" : "AI-based assistant",
      icon: BrainCircuit,
      category: "office",
      isNew: true,
      roles: ["all"],
    },
    {
      id: 11,
      name: language === "ru" ? "Переводчик" : "Translator",
      description: language === "ru" ? "Перевод документов" : "Document translation",
      icon: Globe,
      category: "office",
      isNew: true,
      roles: ["all"],
    },
    {
      id: 12,
      name: language === "ru" ? "Техподдержка" : "Tech Support",
      description: language === "ru" ? "Заявки в техподдержку" : "Tech support requests",
      icon: Tool,
      category: "communication",
      isNew: false,
      roles: ["all"],
    },
  ]

  // Filter tools by search query
  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{allToolsText}</DialogTitle>
          <DialogDescription>
            {language === "ru"
              ? "Доступ к корпоративным приложениям и сервисам"
              : "Access to corporate applications and services"}
          </DialogDescription>
        </DialogHeader>

        <div className="relative mt-2">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">{allCategoryText}</TabsTrigger>
            <TabsTrigger value="communication">{communicationText}</TabsTrigger>
            <TabsTrigger value="office">{officeText}</TabsTrigger>
            <TabsTrigger value="analytics">{analyticsText}</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="m-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredTools.map((tool) => (
                <div key={tool.id} className="p-4 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-100 rounded-md text-blue-600">
                      <tool.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{tool.name}</h3>
                        {tool.isNew && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                            {newText}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{tool.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="communication" className="m-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredTools
                .filter((tool) => tool.category === "communication")
                .map((tool) => (
                  <div
                    key={tool.id}
                    className="p-4 border rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-blue-100 rounded-md text-blue-600">
                        <tool.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{tool.name}</h3>
\

\
