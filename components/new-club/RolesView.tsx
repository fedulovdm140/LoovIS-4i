"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"

export default function RolesView() {
  const { t } = useLanguage()

  const roles = [
    {
      title: t("ceo_management") || "CEO / Руководство",
      description:
        t("ceo_management_desc") ||
        "Принимает стратегические решения об открытии нового клуба. Утверждает бюджеты и ключевые сроки.",
      responsibilities: [
        t("ceo_initiate_project") || "Инициировать проект, дать 'зелёный свет' на запуск нового клуба",
        t("ceo_approve_budget") || "Утвердить бюджет и сроки, определить верхние границы расходов",
        t("ceo_monitor_milestones") || "Контролировать ключевые моменты, получать отчёты от Проектного менеджера",
      ],
    },
    {
      title: t("operations_manager") || "Операционный менеджер (Ops)",
      description:
        t("operations_manager_desc") ||
        "Руководит всем проектом открытия 'от и до', составляя план, координируя остальных участников и контролируя сроки/бюджет.",
      responsibilities: [
        t("ops_coordinate_roles") || "Координировать взаимодействие между ролями",
        t("ops_location_tender") || "Поиск помещения и организация тендеров",
        t("ops_construction_works") || "Организация строительно-монтажных работ",
        t("ops_procurement_logistics") || "Закупка и логистика, финансы и документы",
      ],
    },
    {
      title: t("creative_manager") || "Креативный менеджер (Creative)",
      description:
        t("creative_manager_desc") ||
        "Отвечает за 'душу' и 'стиль' клуба: подбор уникальных объектов, ретро-мебели, оформление пространства.",
      responsibilities: [
        t("creative_design_concept") || "Участие в дизайн-концепции",
        t("creative_unique_items") || "Поиск и закупка 'уникальных' предметов",
        t("creative_atmosphere_control") || "Контроль атмосферы и подготовка к открытию",
      ],
    },
    {
      title: t("designer") || "Дизайнер (Designer)",
      description:
        t("designer_desc") || "Отрисовывает весь проект (планы, чертежи) и обеспечивает техническую реализацию.",
      responsibilities: [
        t("designer_design_project") || "Разработка дизайн-проекта",
        t("designer_electrical_support") || "Уточнение электрики и сопровождение ремонта",
        t("designer_final_acceptance") || "Финальная приёмка",
      ],
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">{t("project_roles") || "Роли проекта"}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role, index) => (
          <Card key={index}>
            <CardContent className="p-5">
              <h3 className="font-bold text-lg mb-3">{role.title}</h3>
              <p className="text-gray-700 mb-3">{role.description}</p>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">
                  {t("key_responsibilities") || "Ключевые обязанности"}
                </h4>
                <ul className="list-disc pl-5 space-y-1">
                  {role.responsibilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
