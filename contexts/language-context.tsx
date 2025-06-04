"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "ru" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  ru: {
    // Header & Navigation
    dashboard: "Дашборд",
    new_club: "Новый клуб",
    tools: "Инструменты",
    chat: "Чат",
    knowledge_base: "База знаний",
    tasks: "Задачи",
    calendar: "Календарь",
    analytics: "Аналитика",
    settings: "Настройки",
    profile: "Профиль",
    logout: "Выйти",
    help_support: "Помощь и поддержка",

    // Search & Actions
    search: "Поиск",
    search_placeholder: "Поиск клубов, задач, документов...",
    search_clubs_tasks: "Поиск клубов и задач...",
    search_tools: "Поиск инструментов...",
    open_menu: "Открыть меню",
    close: "Закрыть",
    open: "Открыть",

    // Tools
    tools_description_long: "Управляйте всеми аспектами вашего бизнеса с помощью наших инструментов",
    all_tools: "Все инструменты",
    operations: "Операции",
    planning: "Планирование",
    human_resources: "HR",
    reports: "Отчеты",
    administration: "Администрирование",
    new_club_description: "Создание и управление новыми клубами",
    calendar_description: "Планирование и управление событиями",
    tasks_description: "Управление задачами и проектами",
    team_description: "Управление командой и сотрудниками",
    analytics_description: "Аналитика и отчеты по бизнесу",
    settings_description: "Настройки системы и профиля",
    hr_portal: "HR портал",
    hr_portal_description: "Управление персоналом и HR процессами",
    success_cases: "Кейсы успеха",
    success_cases_description: "Примеры успешных проектов",
    equipment: "Оборудование",
    equipment_description: "Управление оборудованием и техникой",
    knowledge_base_description: "База знаний и документация",
    no_tools_found: "Инструменты не найдены",
    try_different_search: "Попробуйте изменить поисковый запрос",

    // Notifications
    notifications: "Уведомления",
    new: "Новый",
    favorite: "Избранное",
    view_all_notifications: "Посмотреть все уведомления",
    mark_as_read: "Отметить как прочитанное",
    no_notifications: "Нет уведомлений",

    // User Profile
    operations_manager: "Операционный менеджер",
    profile_job_title: "Ведущий UX/UI дизайнер",

    // New Club Process
    new_club_opening_process: "Процесс открытия нового клуба",
    total_duration: "Общая продолжительность",
    weeks: "недель",
    current_clubs: "Текущие клубы",
    process: "Процесс",
    project_roles: "Роли проекта",
    export_plan: "Экспорт плана",
    start_new_project: "Начать новый проект",

    // Club Creation Dialog
    create_new_club: "Создать новый клуб",
    basic_information: "Основная информация",
    club_name: "Название клуба",
    legal_entity: "Юридическое лицо",
    address: "Адрес",
    city: "Город",
    region: "Регион",
    enter_club_name: "Введите название клуба",
    example_loov_retail: "Например: LOOV Retail",
    enter_address: "Введите адрес",
    enter_city: "Введите город",
    enter_region: "Введите регион",
    next: "Далее",

    // Dashboard Metrics
    select_period: "Выберите период",
    week: "неделя",
    month: "месяц",
    day: "день",
    all_locations: "все локации",
    total_revenue: "Общая выручка",
    sales_count: "Количество продаж",
    vision_tests: "Проверки зрения",
    conversion_rate: "Конверсия",

    // Task Statuses
    planning: "Планирование",
    completed: "Завершено",
    in_progress: "В процессе",
    pending: "Ожидание",

    // Analytics
    sales_dynamics: "Динамика продаж",
    sales_comparison: "Сравнение продаж",
    top_products: "Топ товары",
    best_selling_products: "Самые продаваемые товары",
    sales_by_category: "Продажи по категориям",
    marketing_effectiveness: "Эффективность маркетинга",
    marketing_results: "Результаты маркетинга",

    // Profile Page
    current_projects: "Текущие проекты",
    website_redesign: "Редизайн веб-сайта",
    mobile_app_design: "Дизайн мобильного приложения",
    active: "Активный",
    kpis: "KPI",
    projects_completed: "Проекты завершены",
    task_completion_rate: "Процент выполнения задач",
    team_satisfaction: "Удовлетворенность команды",
    project_roles: "Роли в проектах",
    lead_designer: "Ведущий дизайнер",
    ux_consultant: "UX консультант",
    skills_expertise: "Навыки и экспертиза",
    ui_design: "UI дизайн",
    ux_research: "UX исследования",
    prototyping: "Прототипирование",
    design_systems: "Дизайн системы",
    user_testing: "Пользовательское тестирование",
  },
  en: {
    // Header & Navigation
    dashboard: "Dashboard",
    new_club: "New Club",
    tools: "Tools",
    chat: "Chat",
    knowledge_base: "Knowledge Base",
    tasks: "Tasks",
    calendar: "Calendar",
    analytics: "Analytics",
    settings: "Settings",
    profile: "Profile",
    logout: "Logout",
    help_support: "Help & Support",

    // Search & Actions
    search: "Search",
    search_placeholder: "Search clubs, tasks, documents...",
    search_clubs_tasks: "Search clubs and tasks...",
    search_tools: "Search tools...",
    open_menu: "Open menu",
    close: "Close",
    open: "Open",

    // Tools
    tools_description_long: "Manage all aspects of your business with our comprehensive tools",
    all_tools: "All Tools",
    operations: "Operations",
    planning: "Planning",
    human_resources: "HR",
    reports: "Reports",
    administration: "Administration",
    new_club_description: "Create and manage new clubs",
    calendar_description: "Schedule and manage events",
    tasks_description: "Manage tasks and projects",
    team_description: "Manage team and employees",
    analytics_description: "Business analytics and reports",
    settings_description: "System and profile settings",
    hr_portal: "HR Portal",
    hr_portal_description: "Personnel and HR process management",
    success_cases: "Success Cases",
    success_cases_description: "Examples of successful projects",
    equipment: "Equipment",
    equipment_description: "Equipment and technology management",
    knowledge_base_description: "Knowledge base and documentation",
    no_tools_found: "No tools found",
    try_different_search: "Try a different search query",

    // Notifications
    notifications: "Notifications",
    new: "New",
    favorite: "Favorite",
    view_all_notifications: "View all notifications",
    mark_as_read: "Mark as read",
    no_notifications: "No notifications",

    // User Profile
    operations_manager: "Operations Manager",
    profile_job_title: "Lead UX/UI Designer",

    // New Club Process
    new_club_opening_process: "New Club Opening Process",
    total_duration: "Total Duration",
    weeks: "weeks",
    current_clubs: "Current Clubs",
    process: "Process",
    project_roles: "Project Roles",
    export_plan: "Export Plan",
    start_new_project: "Start New Project",

    // Club Creation Dialog
    create_new_club: "Create New Club",
    basic_information: "Basic Information",
    club_name: "Club Name",
    legal_entity: "Legal Entity",
    address: "Address",
    city: "City",
    region: "Region",
    enter_club_name: "Enter club name",
    example_loov_retail: "Example: LOOV Retail",
    enter_address: "Enter address",
    enter_city: "Enter city",
    enter_region: "Enter region",
    next: "Next",

    // Dashboard Metrics
    select_period: "Select Period",
    week: "week",
    month: "month",
    day: "day",
    all_locations: "all locations",
    total_revenue: "Total Revenue",
    sales_count: "Sales Count",
    vision_tests: "Vision Tests",
    conversion_rate: "Conversion Rate",

    // Task Statuses
    planning: "Planning",
    completed: "Completed",
    in_progress: "In Progress",
    pending: "Pending",

    // Analytics
    sales_dynamics: "Sales Dynamics",
    sales_comparison: "Sales Comparison",
    top_products: "Top Products",
    best_selling_products: "Best Selling Products",
    sales_by_category: "Sales by Category",
    marketing_effectiveness: "Marketing Effectiveness",
    marketing_results: "Marketing Results",

    // Profile Page
    current_projects: "Current Projects",
    website_redesign: "Website Redesign",
    mobile_app_design: "Mobile App Design",
    active: "Active",
    kpis: "KPIs",
    projects_completed: "Projects Completed",
    task_completion_rate: "Task Completion Rate",
    team_satisfaction: "Team Satisfaction",
    project_roles: "Project Roles",
    lead_designer: "Lead Designer",
    ux_consultant: "UX Consultant",
    skills_expertise: "Skills & Expertise",
    ui_design: "UI Design",
    ux_research: "UX Research",
    prototyping: "Prototyping",
    design_systems: "Design Systems",
    user_testing: "User Testing",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("ru")

  // Загрузка сохраненного языка при инициализации
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "ru" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Функция для изменения языка с сохранением в localStorage
  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  // Улучшенная функция для получения перевода по ключу с отладкой
  const t = (key: string): string => {
    const translation = translations[language][key as keyof (typeof translations)[typeof language]]

    // Если перевод не найден, выводим предупреждение в консоль для разработки
    if (!translation && process.env.NODE_ENV === "development") {
      console.warn(`🔍 Missing translation for key: "${key}" in language: "${language}"`)
    }

    // Возвращаем перевод или ключ, если перевод не найден
    return translation || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
