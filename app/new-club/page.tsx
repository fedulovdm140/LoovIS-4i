"use client"

import { useState, Suspense } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Plus, MapPin } from "lucide-react"
import { useProgress } from "@/contexts/progress-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

// Импорт компонентов напрямую вместо lazy loading
import NewClubDialog from "@/components/new-club/NewClubDialog"
import ProcessView from "@/components/new-club/ProcessView"
import RolesView from "@/components/new-club/RolesView"

// Константы
const TABS = {
  CURRENT_CLUBS: "current-clubs",
  PROCESS: "process",
  ROLES: "roles",
} as const

// Компонент загрузки
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
)

export default function NewClubPage() {
  const { t } = useLanguage()
  const { clubProgress } = useProgress()
  const [activeTab, setActiveTab] = useState(TABS.CURRENT_CLUBS)
  const [showNewClubDialog, setShowNewClubDialog] = useState(false)

  // Данные о клубах
  const clubsData = {
    club1: {
      id: "club1",
      name: "LOOV Арбат",
      address: "ул. Арбат, 24, Москва",
      progress: 75,
      stage: "stage_3_opening_preparation", // Используем ключ для перевода
      startDate: "15.01.2025",
      targetDate: "30.03.2025",
      daysLeft: 15,
      manager: "Sarah Anderson",
      template: "retail_store", // Используем ключ для перевода
      legalEntity: "ООО 'ЛООВ Ритейл'",
    },
    club2: {
      id: "club2",
      name: "LOOV Пресненская",
      address: "Пресненская наб., 10, Москва",
      progress: 45,
      stage: "stage_2_construction", // Используем ключ для перевода
      startDate: "01.02.2025",
      targetDate: "15.05.2025",
      daysLeft: 61,
      manager: "Alex Johnson",
      template: "clinic", // Используем ключ для перевода
      legalEntity: "ООО 'ЛООВ Медикал'",
    },
    club3: {
      id: "club3",
      name: "LOOV Тверская",
      address: "ул. Тверская, 15, Москва",
      progress: 25,
      stage: "stage_1_preparation", // Используем ключ для перевода
      startDate: "01.03.2025",
      targetDate: "30.06.2025",
      daysLeft: 107,
      manager: "Mike Chen",
      template: "retail_store", // Используем ключ для перевода
      legalEntity: "ООО 'ЛООВ Ритейл'",
    },
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">{t("new_club_opening_process")}</h1>
          <p className="text-gray-600">
            {t("total_duration")}: {t("13_25_weeks")}
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2 hover:bg-gray-50">
            <Download className="h-4 w-4" />
            <span>{t("export_plan")}</span>
          </Button>
          <Button
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowNewClubDialog(true)}
          >
            <Plus className="h-4 w-4" />
            <span>{t("start_new_project")}</span>
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-4 bg-gray-100">
          <TabsTrigger value={TABS.CURRENT_CLUBS} className="data-[state=active]:bg-white">
            {t("current_clubs")}
          </TabsTrigger>
          <TabsTrigger value={TABS.PROCESS} className="data-[state=active]:bg-white">
            {t("process")}
          </TabsTrigger>
          <TabsTrigger value={TABS.ROLES} className="data-[state=active]:bg-white">
            {t("project_roles")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value={TABS.CURRENT_CLUBS}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{t("clubs_in_progress")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(clubsData).map((club) => (
              <Card key={club.id} className="hover:shadow-md transition-shadow overflow-hidden">
                <div className="bg-blue-50 p-3 border-b">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{club.name}</h3>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      {club.daysLeft} {t("days_left")}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{club.address}</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{t("progress")}</span>
                      <span>{clubProgress[club.id] || club.progress}%</span>
                    </div>
                    <Progress value={clubProgress[club.id] || club.progress} className="h-2" />
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{t("current_stage")}</span>
                      <span className="font-medium">{t(club.stage)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{t("template")}</span>
                      <span>{t(club.template)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">{t("manager")}</span>
                      <span>{club.manager}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <div className="text-xs text-gray-500">
                      {t("started")}: {club.startDate} • {t("target")}: {club.targetDate}
                    </div>
                    <Link href={`/new-club/details/${club.id}`}>
                      <Button variant="outline" size="sm" className="hover:bg-blue-50">
                        {t("view_details")}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value={TABS.PROCESS}>
          <Suspense fallback={<LoadingSpinner />}>
            <ProcessView />
          </Suspense>
        </TabsContent>

        <TabsContent value={TABS.ROLES}>
          <Suspense fallback={<LoadingSpinner />}>
            <RolesView />
          </Suspense>
        </TabsContent>
      </Tabs>

      {/* Диалог создания нового клуба */}
      {showNewClubDialog && <NewClubDialog isOpen={showNewClubDialog} onClose={() => setShowNewClubDialog(false)} />}
    </div>
  )
}
