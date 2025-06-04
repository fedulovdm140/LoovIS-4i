"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"

interface Stage {
  id: number
  title: string
  duration: string
  roles: {
    title: string
    tasks: {
      id: string
      title: string
      color: string
    }[]
  }[]
}

export default function ProcessView() {
  const { t } = useLanguage()
  const [expandedStages, setExpandedStages] = useState<number[]>([0])

  // Функция для переключения раскрытия этапа
  const toggleStage = (stageIndex: number) => {
    if (expandedStages.includes(stageIndex)) {
      setExpandedStages(expandedStages.filter((i) => i !== stageIndex))
    } else {
      setExpandedStages([...expandedStages, stageIndex])
    }
  }

  // Данные о процессе
  const stages: Stage[] = [
    {
      id: 1,
      title: t("stage_1_preparation") || "Этап 1: Подготовка",
      duration: t("3_6_weeks") || "3-6 недель",
      roles: [
        {
          title: t("ceo_management") || "CEO / Руководство",
          tasks: [
            { id: "task1", title: t("project_initiation") || "Инициация проекта", color: "bg-blue-100 text-blue-800" },
          ],
        },
        {
          title: t("operations_manager") || "Операционный менеджер",
          tasks: [
            { id: "task2", title: t("location_search") || "Поиск локации", color: "bg-blue-100 text-blue-800" },
            { id: "task3", title: t("tender_launch") || "Запуск тендера", color: "bg-blue-100 text-blue-800" },
          ],
        },
        {
          title: t("legal") || "Юрист",
          tasks: [
            {
              id: "task4",
              title: t("legal_lease_check") || "Юридическая проверка аренды",
              color: "bg-yellow-100 text-yellow-800",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: t("stage_2_construction") || "Этап 2: Строительство",
      duration: t("6_12_weeks") || "6-12 недель",
      roles: [
        {
          title: t("operations_manager") || "Операционный менеджер",
          tasks: [
            { id: "task7", title: t("demolition") || "Демонтаж", color: "bg-orange-100 text-orange-800" },
            { id: "task8", title: t("electrical_work") || "Электрика", color: "bg-orange-100 text-orange-800" },
          ],
        },
        {
          title: t("creative_manager") || "Креативный менеджер",
          tasks: [
            {
              id: "task9",
              title: t("retro_furniture") || "Поиск ретро-мебели",
              color: "bg-purple-100 text-purple-800",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: t("stage_3_finishing") || "Этап 3: Чистовая отделка",
      duration: t("5_8_weeks") || "5-8 недель",
      roles: [
        {
          title: t("it_specialist") || "IT-специалист",
          tasks: [
            {
              id: "task13",
              title: t("it_infrastructure") || "IT-инфраструктура",
              color: "bg-indigo-100 text-indigo-800",
            },
          ],
        },
        {
          title: t("operations_manager") || "Операционный менеджер",
          tasks: [
            { id: "task14", title: t("finishing_work") || "Отделочные работы", color: "bg-orange-100 text-orange-800" },
          ],
        },
      ],
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">
        {t("current_club_opening_process") || "Текущий процесс открытия клуба"}
      </h2>

      <div className="space-y-6">
        {stages.map((stage, index) => (
          <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
            <div
              className={`p-4 flex justify-between items-center cursor-pointer ${
                expandedStages.includes(index) ? "bg-blue-50" : "bg-gray-50"
              }`}
              onClick={() => toggleStage(index)}
            >
              <div>
                <h3 className="font-medium text-lg">{stage.title}</h3>
                <p className="text-sm text-gray-500">{stage.duration}</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform ${
                  expandedStages.includes(index) ? "transform rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {expandedStages.includes(index) && (
              <div className="p-4 border-t">
                {stage.roles.map((role, roleIndex) => (
                  <div key={roleIndex} className="mb-4 last:mb-0">
                    <h4 className="font-medium text-gray-700 mb-2">{role.title}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {role.tasks.map((task) => (
                        <div
                          key={task.id}
                          className={`${task.color} p-3 rounded-md cursor-pointer hover:shadow-md transition-shadow`}
                        >
                          <p className="font-medium">{task.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
