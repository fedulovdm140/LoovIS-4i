"use client"
import { useEffect, useState, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronDown,
  ChevronUp,
  Clock,
  User,
  ArrowLeft,
  AlertCircle,
  MapPin,
  FileText,
  Building,
  RefreshCw,
} from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { useProgress } from "@/contexts/progress-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ClubDetailsPage() {
  console.log("Rendering ClubDetailsPage component")

  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const {
    taskProgress,
    clubProgress,
    updateTaskChecklistItem,
    getTaskChecklist,
    resetProgress,
    setClubProgressAndTasks,
    currentTasks,
    getCurrentTasks,
  } = useProgress()

  // Проверка контекста языка и обработка ошибок
  const { t, language } = useLanguage()

  const [expandedStages, setExpandedStages] = useState<number[]>([0])
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [clubData, setClubData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [forceUpdate, setForceUpdate] = useState(0) // Добавляем состояние для принудительного обновления

  // Загрузка данных о клубе
  useEffect(() => {
    console.log("Loading club data for ID:", id)
    const loadClubData = async () => {
      setLoading(true)
      try {
        // В реальном приложении здесь был бы запрос к API
        // Для демонстрации используем моковые данные
        const mockClubData = {
          club1: {
            id: "club1",
            name: "LOOV Арбат",
            address: "ул. Арбат, 24, Москва",
            progress: 75,
            stage: t("stage_3_opening_preparation") || "Этап 3: Подготовка к открытию",
            startDate: "15.01.2025",
            targetDate: "30.03.2025",
            daysLeft: 15,
            manager: "Sarah Anderson",
            template: t("retail_store") || "Розничный магазин",
            legalEntity: "ООО 'ЛООВ Ритейл'",
            description: "Новый клуб оптики Loov в центре Москвы.",
            teamMembers: [
              {
                name: "Sarah Anderson",
                role: t("operations_manager") || "Операционный менеджер",
                avatar: "/avatars/sarah-anderson.jpg",
              },
              {
                name: "Alex Johnson",
                role: t("designer") || "Дизайнер",
                avatar: "/avatars/alex-johnson.jpg",
              },
              {
                name: "Mike Chen",
                role: t("it_specialist") || "IT-специалист",
                avatar: "/avatars/mike-chen.jpg",
              },
            ],
          },
          club2: {
            id: "club2",
            name: "LOOV Пресненская",
            address: "Пресненская наб., 10, Москва",
            progress: 45,
            stage: t("stage_2_construction") || "Этап 2: Строительство",
            startDate: "01.02.2025",
            targetDate: "15.05.2025",
            daysLeft: 61,
            manager: "Alex Johnson",
            template: t("clinic") || "Клиника",
            legalEntity: "ООО 'ЛООВ Медикал'",
            description: "Новый клуб оптики Loov в деловом центре Москва-Сити.",
            teamMembers: [
              {
                name: "Alex Johnson",
                role: t("operations_manager") || "Операционный менеджер",
                avatar: "/avatars/alex-johnson.jpg",
              },
              {
                name: "Emma White",
                role: t("designer") || "Дизайнер",
                avatar: "/avatars/emma-white.jpg",
              },
            ],
          },
          club3: {
            id: "club3",
            name: "LOOV Тверская",
            address: "ул. Тверская, 15, Москва",
            progress: 25,
            stage: t("stage_1_preparation") || "Этап 1: Подготовка",
            startDate: "01.03.2025",
            targetDate: "30.06.2025",
            daysLeft: 107,
            manager: "Mike Chen",
            template: t("retail_store") || "Розничный магазин",
            legalEntity: "ООО 'ЛООВ Ритейл'",
            description: "Новый клуб оптики Loov на главной улице Москвы.",
            teamMembers: [
              {
                name: "Mike Chen",
                role: t("operations_manager") || "Операционный менеджер",
                avatar: "/avatars/mike-chen.jpg",
              },
            ],
          },
        }

        console.log("Available club IDs:", Object.keys(mockClubData))

        if (id && mockClubData[id as keyof typeof mockClubData]) {
          console.log("Found club data:", mockClubData[id as keyof typeof mockClubData])
          setClubData(mockClubData[id as keyof typeof mockClubData])

          // Получаем текущий прогресс клуба
          const currentProgress = clubProgress[id as string] || mockClubData[id as keyof typeof mockClubData].progress

          // Получаем текущие задачи
          getCurrentTasks(id as string)
        } else {
          console.log("Club not found, redirecting to club list")
          // Если клуб не найден, перенаправляем на страницу со списком клубов
          router.push("/new-club")
        }
      } catch (error) {
        console.error("Error loading club data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadClubData()
  }, [id, router, t, clubProgress, getCurrentTasks])

  // Функция для переключения раскрытия этапа
  const toggleStage = (stageIndex: number) => {
    setExpandedStages((prevExpandedStages) =>
      prevExpandedStages.includes(stageIndex)
        ? prevExpandedStages.filter((i) => i !== stageIndex)
        : [...prevExpandedStages, stageIndex],
    )
  }

  // Функция для отображения деталей задачи
  const showTaskDetails = useCallback((taskId: string) => {
    console.log(`Showing details for task ${taskId}`)
    setSelectedTask(taskId)
  }, [])

  // Функция для закрытия деталей задачи
  const closeTaskDetails = useCallback(() => {
    console.log("Closing task details")
    setSelectedTask(null)
  }, [])

  // Функция обновления чек-листа
  const updateChecklistItem = useCallback(
    (taskId: string, index: number, checked: boolean) => {
      if (!id) return

      console.log(`Updating checklist item in UI: taskId=${taskId}, index=${index}, checked=${checked}`)

      // Обновляем чек-лист через контекст
      updateTaskChecklistItem(id as string, taskId, index, checked)

      // Принудительно обновляем компонент
      setTimeout(() => {
        setForceUpdate((prev) => prev + 1)
      }, 50)
    },
    [id, updateTaskChecklistItem],
  )

  // Функция для расчета прогресса задачи
  const calculateTaskProgress = useCallback(
    (taskId: string) => {
      const progress = taskProgress[taskId] || 0
      console.log(`Task ${taskId} progress from context: ${progress}%`)
      return progress
    },
    [taskProgress],
  )

  // Функция для получения чек-листа задачи
  const getTaskChecklistItems = useCallback(
    (taskId: string) => {
      if (!id) return []
      const checklist = getTaskChecklist(id as string, taskId)
      console.log(`Got checklist for task ${taskId}:`, checklist)
      return checklist
    },
    [id, getTaskChecklist],
  )

  const handleResetProgress = useCallback(() => {
    console.log("Resetting progress")
    resetProgress()
    setForceUpdate((prev) => prev + 1)
  }, [resetProgress])

  // Функция для определения, является ли задача текущей
  const isCurrentTask = useCallback(
    (taskId: string) => {
      return currentTasks.includes(taskId)
    },
    [currentTasks],
  )

  // Добавим эффект для отслеживания изменений в forceUpdate
  useEffect(() => {
    console.log(`Component force updated (${forceUpdate})`)
  }, [forceUpdate])

  // Заменим массив stages на полный список задач, соответствующий процессу открытия клуба

  const stages = [
    {
      id: 1,
      title: t("stage_1_preparation") || "Этап 1: Подготовка",
      duration: t("3_6_weeks") || "3-6 недель",
      roles: [
        {
          title: t("ceo_management") || "CEO / Руководство",
          tasks: [
            {
              id: "task1",
              title: t("project_initiation") || "Инициация проекта",
              color: "bg-blue-100 text-blue-800",
            },
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
        {
          title: t("designer") || "Дизайнер",
          tasks: [
            { id: "task5", title: t("design_concept") || "Концепция дизайна", color: "bg-green-100 text-green-800" },
          ],
        },
        {
          title: t("hr_recruiter") || "HR / Рекрутер",
          tasks: [
            {
              id: "task6",
              title: t("staff_planning") || "Планирование персонала",
              color: "bg-pink-100 text-pink-800",
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
          title: t("creative_manager") || "Креативный менеджер",
          tasks: [
            {
              id: "task7",
              title: t("unique_items_search") || "Поиск уникальных предметов",
              color: "bg-purple-100 text-purple-800",
            },
          ],
        },
        {
          title: t("operations_manager") || "Операционный менеджер",
          tasks: [
            {
              id: "task8",
              title: t("construction_control") || "Контроль строительства",
              color: "bg-blue-100 text-blue-800",
            },
            {
              id: "task9",
              title: t("equipment_purchase") || "Закупка оборудования",
              color: "bg-blue-100 text-blue-800",
            },
            {
              id: "task10",
              title: t("demolition_rough_finish") || "Демонтаж и черновая отделка",
              color: "bg-blue-100 text-blue-800",
            },
            { id: "task11", title: t("electrical_wiring") || "Электропроводка", color: "bg-blue-100 text-blue-800" },
            {
              id: "task12",
              title: t("ventilation_installation") || "Установка вентиляции",
              color: "bg-blue-100 text-blue-800",
            },
            { id: "task13", title: t("finishing_work") || "Отделочные работы", color: "bg-blue-100 text-blue-800" },
            { id: "task14", title: t("site_acceptance") || "Приемка объекта", color: "bg-blue-100 text-blue-800" },
          ],
        },
        {
          title: t("designer") || "Дизайнер",
          tasks: [
            {
              id: "task15",
              title: t("author_supervision") || "Авторский надзор",
              color: "bg-green-100 text-green-800",
            },
          ],
        },
        {
          title: t("it_specialist") || "IT-специалист",
          tasks: [
            {
              id: "task16",
              title: t("network_design") || "Проектирование сети",
              color: "bg-indigo-100 text-indigo-800",
            },
            {
              id: "task17",
              title: t("equipment_installation") || "Установка оборудования",
              color: "bg-indigo-100 text-indigo-800",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      title: t("stage_3_opening_preparation") || "Этап 3: Подготовка к открытию",
      duration: t("2_4_weeks") || "2-4 недели",
      roles: [
        {
          title: t("operations_manager") || "Операционный менеджер",
          tasks: [
            {
              id: "task18",
              title: t("furniture_arrangement") || "Расстановка мебели",
              color: "bg-blue-100 text-blue-800",
            },
            {
              id: "task19",
              title: t("equipment_setup") || "Настройка оборудования",
              color: "bg-blue-100 text-blue-800",
            },
          ],
        },
        {
          title: t("hr_recruiter") || "HR / Рекрутер",
          tasks: [
            { id: "task20", title: t("staff_hiring") || "Найм персонала", color: "bg-pink-100 text-pink-800" },
            { id: "task21", title: t("staff_training") || "Обучение персонала", color: "bg-pink-100 text-pink-800" },
          ],
        },
        {
          title: t("legal") || "Юрист",
          tasks: [
            {
              id: "task22",
              title: t("obtaining_licenses") || "Получение лицензий",
              color: "bg-yellow-100 text-yellow-800",
            },
          ],
        },
        {
          title: t("marketing") || "Маркетинг",
          tasks: [
            {
              id: "task23",
              title: t("pre_launch_campaign") || "Предстартовая кампания",
              color: "bg-purple-100 text-purple-800",
            },
          ],
        },
      ],
    },
    {
      id: 4,
      title: t("stage_4_launch") || "Этап 4: Запуск",
      duration: t("2_3_weeks") || "2-3 недели",
      roles: [
        {
          title: t("operations_manager") || "Операционный менеджер",
          tasks: [
            { id: "task24", title: t("soft_opening") || "Мягкое открытие", color: "bg-blue-100 text-blue-800" },
            {
              id: "task25",
              title: t("process_adjustment") || "Корректировка процессов",
              color: "bg-blue-100 text-blue-800",
            },
          ],
        },
        {
          title: t("marketing") || "Маркетинг",
          tasks: [
            {
              id: "task26",
              title: t("grand_opening") || "Официальное открытие",
              color: "bg-purple-100 text-purple-800",
            },
            {
              id: "task27",
              title: t("review_management") || "Управление отзывами",
              color: "bg-purple-100 text-purple-800",
            },
          ],
        },
        {
          title: t("ceo_management") || "CEO / Руководство",
          tasks: [
            {
              id: "task28",
              title: t("results_analysis") || "Анализ результатов",
              color: "bg-blue-100 text-blue-800",
            },
          ],
        },
      ],
    },
  ]

  // Также добавим недостающие данные о задачах в taskData
  const taskData = {
    task1: {
      title: t("project_initiation") || "Инициирование проекта",
      description: t("project_initiation_desc") || "Определение основных параметров проекта и формирование команды.",
      checklist: [
        t("develop_business_plan") || "Разработать бизнес-план",
        t("determine_project_budget") || "Определить бюджет проекта",
        t("form_project_team") || "Сформировать проектную команду",
        t("approve_club_concept") || "Утвердить концепцию клуба",
        t("define_success_criteria") || "Определить критерии успеха",
      ],
      executor: t("ceo_management") || "CEO / Руководство",
      approver: t("board_of_directors") || "Совет директоров",
      deadline: t("1_2_weeks") || "1-2 недели",
      reference: t("project_initiation_ref") || "Важно определить четкие KPI и сроки для всего проекта.",
    },
    task2: {
      title: t("location_search") || "Поиск локации",
      description: t("location_search_desc") || "Поиск подходящего помещения для нового клуба.",
      checklist: [
        t("find_5_7_locations") || "Найти 5-7 вариантов помещений",
        t("create_playbook_template") || "Создать шаблон для анализа помещений",
        t("conduct_inspections") || "Провести осмотры помещений",
        t("fill_comparison_table") || "Заполнить таблицу сравнения",
        t("identify_potential_risks") || "Выявить потенциальные риски",
        t("form_shortlist") || "Сформировать шорт-лист",
        t("transfer_to_legal") || "Передать юристам",
      ],
      executor: t("operations_manager") || "Операционный менеджер",
      approver: t("ceo_legal") || "CEO / Юрист",
      deadline: t("2_4_weeks") || "2-4 недели",
      reference:
        t("location_search_ref") || "Учитывать транспортную доступность, проходимость и соответствие концепции LOOV.",
    },
    task3: {
      title: t("tender_launch") || "Запуск тендера",
      description: t("tender_launch_desc") || "Организация и проведение тендера на выбор подрядчиков.",
      checklist: [
        t("prepare_technical_specifications") || "Подготовить техническое задание",
        t("send_rfp") || "Разослать RFP",
        t("meet_potential_contractors") || "Встретиться с потенциальными подрядчиками",
        t("compare_price_timeline") || "Сравнить цены и сроки",
        t("select_contractors") || "Выбрать подрядчиков",
        t("prepare_sign_contracts") || "Подготовить и подписать договора",
      ],
      executor: t("operations_manager") || "Операционный менеджер",
      approver: t("ceo") || "CEO",
      deadline: t("2_3_weeks") || "2-3 недели",
      reference: t("tender_launch_ref") || "Важно четко сформулировать требования к подрядчикам.",
    },
    task4: {
      title: t("legal_lease_check") || "Юридическая проверка аренды",
      description: t("legal_lease_check_desc") || "Проверка юридической чистоты помещения и условий аренды.",
      checklist: [
        t("check_lease_conditions") || "Проверить условия аренды",
        t("clarify_renovation_signage") || "Уточнить вопросы ремонта и вывески",
        t("determine_renovation_payment") || "Определить порядок оплаты ремонта",
        t("conduct_lease_negotiations") || "Провести переговоры по аренде",
        t("prepare_final_contract") || "Подготовить окончательный договор",
        t("transfer_for_signing") || "Передать на подписание",
      ],
      executor: t("legal") || "Юрист",
      approver: t("ceo_ops") || "CEO / Операционный менеджер",
      deadline: t("5_working_days") || "5 рабочих дней",
      reference: t("legal_lease_check_ref") || "Важно учесть все юридические нюансы.",
    },
    task5: {
      title: t("design_concept") || "Концепция дизайна",
      description: t("design_concept_desc") || "Разработка дизайн-концепции для нового клуба.",
      checklist: [
        t("get_photos_plan") || "Получить фотографии и план помещения",
        t("determine_zone_layout") || "Определить планировку зон",
        t("draw_draft_layout") || "Нарисовать эскиз планировки",
        t("determine_lighting_requirements") || "Определить требования к освещению",
        t("transfer_for_approval") || "Передать на утверждение",
      ],
      executor: t("designer") || "Дизайнер",
      approver: t("ceo_creative") || "CEO / Креативный менеджер",
      deadline: t("2_3_weeks") || "2-3 недели",
      reference: t("design_concept_ref") || "Важно учесть концепцию LOOV.",
    },
    task6: {
      title: t("staff_planning") || "Планирование персонала",
      description: t("staff_planning_desc") || "Формирование профилей вакансий и планирование найма персонала.",
      checklist: [
        t("define_required_positions") || "Определить необходимые должности и количество сотрудников",
        t("create_job_profiles") || "Составить профили вакансий",
        t("determine_hiring_training_deadlines") || "Определить сроки найма и обучения",
        t("prepare_personnel_budget") || "Подготовить бюджет на персонал",
        t("approve_hiring_plan_with_ceo") || "Согласовать план найма с CEO",
      ],
      executor: t("hr_recruiter") || "HR / Рекрутер",
      approver: t("ceo") || "CEO",
      deadline: t("1_2_weeks") || "1-2 недели",
      reference: t("staff_planning_ref") || "Учитывать специфику работы офтальмолога и требования к сертификации",
    },
    task7: {
      title: t("unique_items_search") || "Поиск уникальных предметов",
      description:
        t("unique_items_search_desc") || "Поиск и закупка 'уникальных' предметов для создания атмосферы клуба.",
      checklist: [
        t("create_list_of_necessary_items") || "Составить список необходимых предметов",
        t("search_on_avito_communicate_with_artists_craftsmen") || "Искать на Авито, общаться с художниками, мастерами",
        t("keep_track_of_found_objects") || "Вести карту найденных объектов",
        t("approve_purchases_with_ops") || "Согласовать покупки с Ops",
        t("organize_delivery_storage") || "Организовать доставку и хранение",
      ],
      executor: t("creative_manager") || "Креативный менеджер",
      approver: t("operations_manager") || "Операционный менеджер",
      deadline: t("4_8_weeks") || "4-8 недель",
      reference: t("unique_items_search_ref") || "Поддерживать идею 'бальзамирования времени' (LOOV-концепция)",
    },
    task8: {
      title: t("construction_control") || "Контроль строительства",
      description: t("construction_control_desc") || "Контроль и координация строительных работ.",
      checklist: [
        t("develop_construction_schedule") || "Разработать график строительных работ",
        t("coordinate_contractors") || "Координировать работу подрядчиков",
        t("monitor_progress") || "Контролировать ход работ",
        t("conduct_site_inspections") || "Проводить инспекции объекта",
        t("resolve_issues") || "Решать возникающие вопросы",
      ],
      executor: t("operations_manager") || "Операционный менеджер",
      approver: t("ceo") || "CEO",
      deadline: t("6_12_weeks") || "6-12 недель",
      reference: t("construction_control_ref") || "Обеспечить соблюдение сроков и качества работ.",
    },
    task9: {
      title: t("equipment_purchase") || "Закупка оборудования",
      description: t("equipment_purchase_desc") || "Закупка необходимого оборудования для клуба.",
      checklist: [
        t("prepare_equipment_list") || "Подготовить список необходимого оборудования",
        t("get_quotes") || "Получить коммерческие предложения",
        t("compare_prices") || "Сравнить цены",
        t("select_suppliers") || "Выбрать поставщиков",
        t("place_orders") || "Разместить заказы",
      ],
      executor: t("operations_manager") || "Операционный менеджер",
      approver: t("ceo") || "CEO",
      deadline: t("4_8_weeks") || "4-8 недель",
      reference: t("equipment_purchase_ref") || "Учитывать требования к качеству и функциональности оборудования.",
    },
    task10: {
      title: t("demolition_rough_finish") || "Демонтаж и черновая отделка",
      description: t("demolition_rough_finish_desc") || "Проведение демонтажных работ и черновой отделки помещения.",
      checklist: [
        t("obtain_permits") || "Получить разрешения",
        t("demolish_existing_structures") || "Демонтировать существующие конструкции",
        t("prepare_surfaces") || "Подготовить поверхности",
        t("apply_primer") || "Нанести грунтовку",
        t("install_utilities") || "Установить коммуникации",
      ],
      executor: t("operations_manager") || "Операционный менеджер",
      approver: t("ceo") || "CEO",
      deadline: t("2_4_weeks") || "2-4 недели",
      reference: t("demolition_rough_finish_ref") || "Соблюдать технику безопасности и экологические нормы.",
    },
    task11: {
      title: t("electrical_wiring") || "Электропроводка",
      description: t("electrical_wiring_desc") || "Прокладка электропроводки и установка электрооборудования.",
      checklist: [
        t("design_electrical_system") || "Разработать схему электроснабжения",
        t("install_cables") || "Проложить кабели",
        t("install_outlets") || "Установить розетки",
        t("install_switches") || "Установить выключатели",
        t("connect_equipment") || "Подключить оборудование",
      ],
      executor: t("operations_manager") || "Операционный менеджер",
      approver: t("ceo") || "CEO",
      deadline: t("2_4_weeks") || "2-4 недели",
      reference: t("electrical_wiring_ref") || "Соблюдать требования электробезопасности.",
    },
    task12: {
      title: t("ventilation_installation") || "Установка вентиляции",
      description: t("ventilation_installation_desc") || "Установка системы вентиляции и кондиционирования воздуха.",
      checklist: [
        t("design_ventilation_system") || "Разработать схему вентиляции",
        t("install_ducts") || "Установить воздуховоды",
        t("install_fans") || "Установить вентиляторы",
        t("install_filters") || "Установить фильтры",
        t("connect_equipment") || "Подключить оборудование",
      ],
      executor: t("operations_manager") || "Операционный менеджер",
      approver: t("ceo") || "CEO",
      deadline: t("2_4_weeks") || "2-4 недели",
      reference: t("ventilation_installation_ref") || "Обеспечить комфортный микроклимат в помещении.",
    },
    task13: {
      title: t("finishing_work") || "Отделочные работы",
      description: t("finishing_work_desc") || "Проведение отделочных работ в помещении.",
      checklist: [
        t("plaster_walls") || "Оштукатурить стены",
        t("paint_walls") || "Покрасить стены",
        t("install_flooring") || "Установить напольное покрытие",
        t("install_ceiling") || "Установить потолок",
        t("install_doors") || "Установить двери",
      ],
      executor: t("operations_manager") || "Операционный менеджер",
      approver: t("ceo") || "CEO",
      deadline: t("2_4_weeks") || "2-4 недели",
      reference: t("finishing_work_ref") || "Обеспечить высокое качество отделки.",
    },
    task14: {
      title: t("site_acceptance") || "Приемка объекта",
      description: t("site_acceptance_desc") || "Приемка объекта после завершения строительных и отделочных работ.",
      checklist: [
        t("inspect_work") || "Проверить качество работ",
        t("verify_compliance") || "Проверить соответствие требованиям",
        t("sign_acceptance_certificate") || "Подписать акт приемки",
        t("resolve_defects") || "Устранить недостатки",
        t("transfer_to_operations") || "Передать объект в эксплуатацию",
      ],
      executor: t("operations_manager") || "Операционный менеджер",
      approver: t("ceo") || "CEO",
      deadline: t("1_2_weeks") || "1-2 недели",
      reference: t("site_acceptance_ref") || "Обеспечить соответствие объекта требованиям безопасности и качества.",
    },
    task15: {
      title: t("author_supervision") || "Авторский надзор",
      description: t("author_supervision_desc") || "Контроль соответствия строительных работ дизайн-проекту.",
      checklist: [
        t("review_design_documentation") || "Изучить проектную документацию",
        t("conduct_site_visits") || "Проводить выезды на объект",
        t("monitor_compliance") || "Контролировать соответствие работ проекту",
        t("resolve_design_issues") || "Решать вопросы по дизайну",
        t("conduct_site_visits") || "Проводить выезды на объект",
        t("monitor_compliance") || "Контролировать соответствие работ проекту",
        t("resolve_design_issues") || "Решать вопросы по дизайну",
        t("approve_changes") || "Согласовывать изменения",
      ],
      executor: t("designer") || "Дизайнер",
      approver: t("ceo") || "CEO",
      deadline: t("6_12_weeks") || "6-12 недель",
      reference: t("author_supervision_ref") || "Обеспечить реализацию дизайн-проекта в соответствии с концепцией.",
    },
    task16: {
      title: t("network_design") || "Проектирование сети",
      description: t("network_design_desc") || "Проектирование и настройка компьютерной сети клуба.",
      checklist: [
        t("determine_network_requirements") || "Определить требования к сети",
        t("design_network_topology") || "Разработать топологию сети",
        t("select_equipment") || "Выбрать оборудование",
        t("configure_network") || "Настроить сеть",
        t("test_network") || "Протестировать сеть",
      ],
      executor: t("it_specialist") || "IT-специалист",
      approver: t("ceo") || "CEO",
      deadline: t("2_4_weeks") || "2-4 недели",
      reference: t("network_design_ref") || "Обеспечить надежную и безопасную работу сети.",
    },
    task17: {
      title: t("equipment_installation") || "Установка оборудования",
      description: t("equipment_installation_desc") || "Установка и настройка IT-оборудования в клубе.",
      checklist: [
        t("install_servers") || "Установить серверы",
        t("install_workstations") || "Установить рабочие станции",
        t("install_printers") || "Установить принтеры",
        t("install_network_equipment") || "Установить сетевое оборудование",
        t("configure_equipment") || "Настроить оборудование",
      ],
      executor: t("it_specialist") || "IT-специалист",
      approver: t("ceo") || "CEO",
      deadline: t("2_4_weeks") || "2-4 недели",
      reference: t("equipment_installation_ref") || "Обеспечить правильную работу оборудования.",
    },
    task18: {
      title: t("furniture_arrangement") || "Расстановка мебели",
      description: t("furniture_arrangement_desc") || "Расстановка мебели в соответствии с дизайн-проектом.",
      checklist: [
        t("receive_furniture") || "Получить мебель",
        t("unpack_furniture") || "Распаковать мебель",
        t("arrange_furniture") || "Расставить мебель",
        t("assemble_furniture") || "Собрать мебель",
        t("verify_arrangement") || "Проверить расстановку",
      ],
      executor: t("operations_manager") || "Операционный менеджер",
      approver: t("ceo") || "CEO",
      deadline: t("1_2_weeks") || "1-2 недели",
      reference: t("furniture_arrangement_ref") || "Обеспечить комфорт и функциональность помещения.",
    },
    task19: {
      title: t("equipment_setup") || "Настройка оборудования",
      description: t("equipment_setup_desc") || "Настройка и подключение оборудования перед открытием.",
      checklist: [
        t("connect_equipment") || "Подключить оборудование",
        t("configure_software") || "Настроить программное обеспечение",
        t("test_equipment") || "Протестировать оборудование",
        t("train_staff") || "Обучить персонал",
        t("verify_setup") || "Проверить настройку",
      ],
      executor: t("operations_manager") || "Операционный менеджер",
      approver: t("ceo") || "CEO",
      deadline: t("1_2_weeks") || "1-2 недели",
      reference: t("equipment_setup_ref") || "Обеспечить готовность оборудования к работе.",
    },
    task20: {
      title: t("staff_hiring") || "Найм персонала",
      description: t("staff_hiring_desc") || "Проведение собеседований и найм персонала для клуба.",
      checklist: [
        t("post_job_ads") || "Разместить объявления о вакансиях",
        t("screen_resumes") || "Просмотреть резюме",
        t("conduct_interviews") || "Провести собеседования",
        t("check_references") || "Проверить рекомендации",
        t("make_job_offers") || "Сделать предложения о работе",
      ],
      executor: t("hr_recruiter") || "HR / Рекрутер",
      approver: t("ceo") || "CEO",
      deadline: t("2_4_weeks") || "2-4 недели",
      reference: t("staff_hiring_ref") || "Найти квалифицированных и мотивированных сотрудников.",
    },
    task21: {
      title: t("staff_training") || "Обучение персонала",
      description: t("staff_training_desc") || "Проведение обучения для новых сотрудников.",
      checklist: [
        t("prepare_training_materials") || "Подготовить учебные материалы",
        t("conduct_training_sessions") || "Провести учебные занятия",
        t("assess_knowledge") || "Оценить знания",
        t("provide_feedback") || "Предоставить обратную связь",
        t("verify_competence") || "Проверить компетентность",
      ],
      executor: t("hr_recruiter") || "HR / Рекрутер",
      approver: t("ceo") || "CEO",
      deadline: t("1_2_weeks") || "1-2 недели",
      reference: t("staff_training_ref") || "Обеспечить высокий уровень обслуживания клиентов.",
    },
    task22: {
      title: t("obtaining_licenses") || "Получение лицензий",
      description: t("obtaining_licenses_desc") || "Получение необходимых лицензий и разрешений для работы клуба.",
      checklist: [
        t("identify_required_licenses") || "Определить необходимые лицензии",
        t("prepare_applications") || "Подготовить заявления",
        t("submit_applications") || "Подать заявления",
        t("track_progress") || "Отслеживать прогресс",
        t("obtain_licenses") || "Получить лицензии",
      ],
      executor: t("legal") || "Юрист",
      approver: t("ceo") || "CEO",
      deadline: t("2_4_weeks") || "2-4 недели",
      reference: t("obtaining_licenses_ref") || "Обеспечить законность деятельности клуба.",
    },
    task23: {
      title: t("pre_launch_campaign") || "Предстартовая кампания",
      description: t("pre_launch_campaign_desc") || "Проведение маркетинговой кампании перед открытием клуба.",
      checklist: [
        t("define_target_audience") || "Определить целевую аудиторию",
        t("develop_marketing_strategy") || "Разработать маркетинговую стратегию",
        t("create_marketing_materials") || "Создать маркетинговые материалы",
        t("launch_campaign") || "Запустить кампанию",
        t("monitor_results") || "Отслеживать результаты",
      ],
      executor: t("marketing") || "Маркетинг",
      approver: t("ceo") || "CEO",
      deadline: t("2_4_weeks") || "2-4 недели",
      reference: t("pre_launch_campaign_ref") || "Привлечь внимание к открытию клуба.",
    },
    task24: {
      title: t("soft_opening") || "Мягкое открытие",
      description: t("soft_opening_desc") || "Проведение тестового открытия клуба для отладки процессов.",
      checklist: [
        t("invite_guests") || "Пригласить гостей",
        t("test_processes") || "Протестировать процессы",
        t("gather_feedback") || "Собрать отзывы",
        t("make_adjustments") || "Внести корректировки",
        t("prepare_for_grand_opening") || "Подготовиться к официальному открытию",
      ],
      executor: t("operations_manager") || "Операционный менеджер",
      approver: t("ceo") || "CEO",
      deadline: t("1_2_weeks") || "1-2 недели",
      reference: t("soft_opening_ref") || "Обеспечить готовность клуба к официальному открытию.",
    },
    task25: {
      title: t("process_adjustment") || "Корректировка процессов",
      description:
        t("process_adjustment_desc") || "Внесение изменений в процессы работы клуба по результатам тестового открытия.",
      checklist: [
        t("analyze_feedback") || "Проанализировать отзывы",
        t("identify_issues") || "Выявить проблемы",
        t("develop_solutions") || "Разработать решения",
        t("implement_changes") || "Внедрить изменения",
        t("verify_effectiveness") || "Проверить эффективность",
      ],
      executor: t("operations_manager") || "Операционный менеджер",
      approver: t("ceo") || "CEO",
      deadline: t("1_2_weeks") || "1-2 недели",
      reference: t("process_adjustment_ref") || "Оптимизировать работу клуба.",
    },
    task26: {
      title: t("grand_opening") || "Официальное открытие",
      description: t("grand_opening_desc") || "Проведение официального открытия клуба.",
      checklist: [
        t("promote_event") || "Продвигать мероприятие",
        t("invite_guests") || "Пригласить гостей",
        t("organize_event") || "Организовать мероприятие",
        t("manage_event") || "Управлять мероприятием",
        t("gather_feedback") || "Собрать отзывы",
      ],
      executor: t("marketing") || "Маркетинг",
      approver: t("ceo") || "CEO",
      deadline: t("1_2_weeks") || "1-2 недели",
      reference: t("grand_opening_ref") || "Привлечь внимание к клубу и создать положительное впечатление.",
    },
    task27: {
      title: t("review_management") || "Управление отзывами",
      description: t("review_management_desc") || "Сбор и обработка отзывов клиентов о работе клуба.",
      checklist: [
        t("monitor_reviews") || "Отслеживать отзывы",
        t("respond_to_reviews") || "Отвечать на отзывы",
        t("analyze_reviews") || "Анализировать отзывы",
        t("identify_trends") || "Выявлять тенденции",
        t("improve_service") || "Улучшать обслуживание",
      ],
      executor: t("marketing") || "Маркетинг",
      approver: t("ceo") || "CEO",
      deadline: t("ongoing") || "Постоянно",
      reference: t("review_management_ref") || "Повысить лояльность клиентов.",
    },
    task28: {
      title: t("results_analysis") || "Анализ результатов",
      description:
        t("results_analysis_desc") || "Анализ финансовых и операционных результатов работы клуба после открытия.",
      checklist: [
        t("collect_data") || "Собрать данные",
        t("analyze_data") || "Проанализировать данные",
        t("identify_trends") || "Выявлять тенденции",
        t("prepare_report") || "Подготовить отчет",
        t("make_recommendations") || "Сделать рекомендации",
      ],
      executor: t("ceo_management") || "CEO / Руководство",
      approver: t("board_of_directors") || "Совет директоров",
      deadline: t("1_2_weeks") || "1-2 недели",
      reference:
        t("results_analysis_ref") || "Оценить эффективность работы клуба и принять решения по дальнейшему развитию.",
    },
  }

  if (loading) {
    return <div className="p-8 text-center">Загрузка данных...</div>
  }

  if (!clubData) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-xl font-bold mb-4">
          &#1050;&#1083;&#1091;&#1073; &#1085;&#1077; &#1085;&#1072;&#1081;&#1076;&#1077;&#1085;
        </h1>
        <Button variant="outline" onClick={() => router.push("/new-club")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === "ru" ? "Вернуться к списку клубов" : "Back to Clubs"}
        </Button>
      </div>
    )
  }

  // Получаем прогресс клуба из контекста или используем значение по умолчанию
  const currentClubProgress = clubProgress[id as string] || clubData.progress

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" onClick={() => router.push("/new-club")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === "ru" ? "Вернуться к списку клубов" : "Back to Clubs"}
        </Button>

        <Button variant="outline" onClick={handleResetProgress} className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          {language === "ru" ? "Сбросить прогресс" : "Reset Progress"}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">{clubData.name}</h1>
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{clubData.address}</span>
          </div>
        </div>
        <Badge className="mt-2 md:mt-0">
          {clubData.daysLeft} {language === "ru" ? "дней осталось" : "days left"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>{language === "ru" ? "Информация о клубе" : "Club Information"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    {language === "ru" ? "Шаблон" : "Template"}
                  </h3>
                  <p>{clubData.template}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    {language === "ru" ? "Менеджер" : "Manager"}
                  </h3>
                  <p>{clubData.manager}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    {language === "ru" ? "Юридическое лицо" : "Legal Entity"}
                  </h3>
                  <p>{clubData.legalEntity}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    {language === "ru" ? "Текущий этап" : "Current Stage"}
                  </h3>
                  <p>{clubData.stage}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  {language === "ru" ? "Описание" : "Description"}
                </h3>
                <p>{clubData.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  {language === "ru" ? "Прогресс" : "Progress"}
                </h3>
                <div className="flex justify-between text-sm mb-1">
                  <span>{language === "ru" ? "Общее выполнение" : "Overall Completion"}</span>
                  <span>{currentClubProgress}%</span>
                </div>
                <Progress value={currentClubProgress} className="h-2" />
              </div>

              {/* Информация о текущих задачах */}
              {currentTasks.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-700 mb-1">
                        {language === "ru" ? "Текущие задачи в работе" : "Current Tasks in Progress"}
                      </h3>
                      <ul className="text-sm text-blue-600 space-y-1">
                        {currentTasks.map((taskId) => (
                          <li key={taskId} className="flex items-center gap-1">
                            <span>• {taskData[taskId]?.title}</span>
                            <Badge variant="outline" className="ml-2 bg-white">
                              {calculateTaskProgress(taskId)}%
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>{language === "ru" ? "Временная шкала" : "Timeline"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  {language === "ru" ? "Дата начала" : "Start Date"}
                </h3>
                <p>{clubData.startDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  {language === "ru" ? "Целевая дата" : "Target Date"}
                </h3>
                <p>{clubData.targetDate}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">
                  {language === "ru" ? "Осталось дней" : "Days Remaining"}
                </h3>
                <p>
                  {clubData.daysLeft} {language === "ru" ? "дней" : "days"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tasks" className="mb-6">
        <TabsList>
          <TabsTrigger value="tasks">{language === "ru" ? "Задачи" : "Tasks"}</TabsTrigger>
          <TabsTrigger value="team">{language === "ru" ? "Команда" : "Team"}</TabsTrigger>
          <TabsTrigger value="documents">{language === "ru" ? "Документы" : "Documents"}</TabsTrigger>
        </TabsList>
        <TabsContent value="tasks" className="mt-6">
          {stages.map((stage, stageIndex) => (
            <Collapsible
              key={stage.id}
              open={expandedStages.includes(stageIndex)}
              className="mb-4 transition-all duration-200"
            >
              <Card className="shadow-sm border-gray-200">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleStage(stageIndex)}
                >
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white mr-3">
                      {stage.id}
                    </div>
                    <div>
                      <h3 className="font-semibold">{stage.title}</h3>
                      <p className="text-sm text-gray-500">{stage.duration}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                    {expandedStages.includes(stageIndex) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <CollapsibleContent>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {stage.roles.map((role) => (
                        <div key={role.title} className="space-y-3">
                          <div className="bg-gray-800 text-white p-2 rounded-md text-center font-medium">
                            {role.title}
                          </div>
                          {role.tasks.map((task) => (
                            <div
                              key={task.id}
                              className={`${task.color} p-3 rounded-md cursor-pointer hover:shadow-md transition-all ${
                                isCurrentTask(task.id) ? "border-2 border-blue-500 shadow-lg" : ""
                              } ${calculateTaskProgress(task.id) === 100 ? "opacity-75" : ""}`}
                              onClick={() => showTaskDetails(task.id)}
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">{task.title}</span>
                                <Badge variant="outline" className="bg-white">
                                  {calculateTaskProgress(task.id)}%
                                </Badge>
                              </div>
                              {taskData[task.id] && (
                                <div className="text-xs space-y-1">
                                  <div className="flex items-center gap-1">
                                    <User className="h-3 w-3" />
                                    <span>{taskData[task.id].executor}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    <span>
                                      {language === "ru" ? "Срок" : "Deadline"}: {taskData[task.id].deadline}
                                    </span>
                                  </div>
                                </div>
                              )}
                              {isCurrentTask(task.id) && (
                                <div className="mt-2 text-xs font-medium text-blue-700 flex items-center">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  {language === "ru" ? "Текущая задача" : "Current task"}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </TabsContent>
        <TabsContent value="team" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "ru" ? "Команда проекта" : "Project Team"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clubData.teamMembers.map((member: any, index: number) => (
                  <div key={index} className="flex items-center p-4 border rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      <img
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{language === "ru" ? "Документы проекта" : "Project Documents"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 border rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <FileText className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium">{language === "ru" ? "Договор аренды.pdf" : "Lease Agreement.pdf"}</p>
                    <p className="text-sm text-gray-500">2.4 MB • {clubData.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center p-4 border rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">{language === "ru" ? "Бизнес-план.docx" : "Business Plan.docx"}</p>
                    <p className="text-sm text-gray-500">1.8 MB • {clubData.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center p-4 border rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{language === "ru" ? "Дизайн-проект.pdf" : "Design Project.pdf"}</p>
                    <p className="text-sm text-gray-500">5.2 MB • {clubData.startDate}</p>
                  </div>
                </div>
                <div className="flex items-center p-4 border rounded-lg">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                    <Building className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {language === "ru" ? "Технические требования.pdf" : "Technical Requirements.pdf"}
                    </p>
                    <p className="text-sm text-gray-500">3.1 MB • {clubData.startDate}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Диалог с деталями задачи */}
      {selectedTask && taskData[selectedTask] && (
        <Dialog open={!!selectedTask} onOpenChange={(open) => !open && closeTaskDetails()}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl">{taskData[selectedTask].title}</DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">{t("description") || "Описание"}</h3>
                <p>{taskData[selectedTask].description}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">{t("checklist") || "Чек-лист"}</h3>
                <div className="space-y-2 border rounded-md p-4">
                  {taskData[selectedTask].checklist.map((item: string, index: number) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Checkbox
                        id={`${selectedTask}-check-${index}`}
                        checked={getTaskChecklistItems(selectedTask)[index] || false}
                        onCheckedChange={(checked) => {
                          updateChecklistItem(selectedTask, index, checked as boolean)
                        }}
                      />
                      <label
                        htmlFor={`${selectedTask}-check-${index}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {t(item) || item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">
                    {t("task_info") || "Информация о задаче"}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">{t("executor") || "Исполнитель"}:</span>
                      <span className="text-sm font-medium">{taskData[selectedTask].executor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{t("approver") || "Утверждающий"}:</span>
                      <span className="text-sm font-medium">{taskData[selectedTask].approver}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">{t("deadline") || "Срок"}:</span>
                      <span className="text-sm font-medium">{taskData[selectedTask].deadline}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">{t("progress") || "Прогресс"}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{t("completion") || "Завершенность"}:</span>
                      <span className="text-sm font-medium">{calculateTaskProgress(selectedTask)}%</span>
                    </div>
                    <Progress value={calculateTaskProgress(selectedTask)} className="h-2" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  {t("reference_info") || "Справочная информация"}
                </h3>
                <div className="border rounded-md p-4 bg-gray-50">
                  <p className="text-sm">{taskData[selectedTask].reference}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 mb-2">{t("comments") || "Комментарии"}</h3>
                <Textarea
                  placeholder={t("add_comment_placeholder") || "Добавьте комментарий..."}
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={closeTaskDetails}>
                  {t("cancel") || "Отмена"}
                </Button>
                <Button
                  onClick={() => {
                    // Сохраняем текущий прогресс и закрываем диалог
                    closeTaskDetails()
                  }}
                >
                  {t("save_progress") || "Сохранить прогресс"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
