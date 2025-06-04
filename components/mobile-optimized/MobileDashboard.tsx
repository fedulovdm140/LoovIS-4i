"use client"

import { useLanguage } from "@/contexts/language-context"
import { MobileMetricsGrid } from "./MobileMetricsGrid"
import { MobileFilterBar } from "./MobileFilterBar"
import { MobileChartContainer } from "./MobileChartContainer"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import Link from "next/link"
import { Calendar, ChevronRight } from "lucide-react"

export function MobileDashboard() {
  const { t } = useLanguage()
  const [period, setPeriod] = useState("week")
  const [location, setLocation] = useState("all")

  // Метрики для дашборда
  const metrics = [
    {
      title: t("total_revenue"),
      value: "$19,876",
      change: "+6.8%",
      trend: "up" as const,
      period: t("compared_to_last_week"),
    },
    {
      title: t("sales_count"),
      value: "580",
      change: "+14%",
      trend: "up" as const,
      period: t("compared_to_last_week"),
    },
    {
      title: t("vision_tests"),
      value: "1,150",
      change: "+9%",
      trend: "up" as const,
      period: t("compared_to_last_week"),
    },
    {
      title: t("conversion_rate"),
      value: "49%",
      change: "+10%",
      trend: "up" as const,
      period: t("compared_to_last_week"),
    },
  ]

  // Опции для фильтров
  const periodOptions = [
    { value: "day", label: t("day") },
    { value: "week", label: t("week") },
    { value: "month", label: t("month") },
    { value: "quarter", label: t("quarter") },
    { value: "year", label: t("year") },
  ]

  const locationOptions = [
    { value: "all", label: t("all_locations") },
    { value: "loov1", label: "LOOV 1" },
    { value: "loov2", label: "LOOV 2" },
    { value: "loov3", label: "LOOV 3" },
  ]

  // Задачи
  const tasks = [
    { id: 1, title: t("update_sales_standart"), dueDate: t("today") },
    { id: 2, title: t("client_meeting_preparation"), dueDate: t("tomorrow") },
    { id: 3, title: t("review_project_timeline"), dueDate: t("thu_mar_15") },
  ]

  // События
  const events = [
    {
      id: 1,
      title: t("team_review_meeting"),
      time: "10:00 AM - 11:30 AM",
      date: { day: 15, month: "MAR" },
    },
    {
      id: 2,
      title: t("client_presentation"),
      time: "2:00 PM - 3:30 PM",
      date: { day: 16, month: "MAR" },
    },
  ]

  return (
    <div className="p-4">
      <MobileFilterBar
        periodOptions={periodOptions}
        locationOptions={locationOptions}
        onPeriodChange={setPeriod}
        onLocationChange={setLocation}
        defaultPeriod={period}
        defaultLocation={location}
      />

      {/* Компактная сетка метрик */}
      <MobileMetricsGrid metrics={metrics} compact={true} />

      {/* Задачи */}
      <MobileChartContainer title={t("recent_tasks")} defaultExpanded={true} className="mt-4">
        <div className="space-y-2">
          {tasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox id={`task-${task.id}`} className="mr-2" />
                <label htmlFor={`task-${task.id}`} className="text-sm">
                  {task.title}
                </label>
              </div>
              <span className="text-xs text-gray-500">{task.dueDate}</span>
            </div>
          ))}
          <Link href="/tasks" className="flex items-center justify-center text-sm text-blue-600 mt-2 py-1">
            {t("view_all")} <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </MobileChartContainer>

      {/* События */}
      <MobileChartContainer title={t("upcoming_events")} defaultExpanded={true}>
        <div className="space-y-3">
          {events.map((event) => (
            <Card key={event.id} className="p-2 flex items-start">
              <div className="bg-blue-100 text-blue-800 rounded p-1 text-center mr-3 w-12 flex-shrink-0">
                <div className="text-xs font-medium">{event.date.month}</div>
                <div className="text-lg font-bold">{event.date.day}</div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">{event.title}</h4>
                <p className="text-xs text-gray-500 flex items-center mt-0.5">
                  <Calendar className="h-3 w-3 mr-1" />
                  {event.time}
                </p>
              </div>
            </Card>
          ))}
          <Link href="/calendar" className="flex items-center justify-center text-sm text-blue-600 mt-2 py-1">
            {t("view_calendar")} <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </MobileChartContainer>
    </div>
  )
}
