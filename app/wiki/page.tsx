"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  BookOpen,
  FileText,
  GraduationCapIcon as Graduation,
  Search,
  Users,
  Building,
  Microscope,
  BookMarked,
  Briefcase,
  Store,
  Award,
  ChevronDown,
  ChevronRight,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"

export default function WikiPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const { language } = useLanguage()
  const [activeArticle, setActiveArticle] = useState("customer-service")
  const [activeSidebarItem, setActiveSidebarItem] = useState(6)
  const [activeSubItem, setActiveSubItem] = useState(61)
  const [activeNestedItem, setActiveNestedItem] = useState(612)

  const trainingModules = [
    {
      id: 1,
      title: language === "ru" ? "Основы оптики" : "Basic Optics",
      icon: BookOpen,
      progress: 80,
      completed: language === "ru" ? "8/10 модулей" : "8/10 modules",
    },
    {
      id: 2,
      title: language === "ru" ? "Продвинутое тестирование" : "Advanced Testing",
      icon: Graduation,
      progress: 40,
      completed: language === "ru" ? "4/10 модулей" : "4/10 modules",
    },
    {
      id: 3,
      title: language === "ru" ? "Обучение продажам" : "Sales Training",
      icon: Users,
      progress: 60,
      completed: language === "ru" ? "6/10 модулей" : "6/10 modules",
    },
  ]

  // Sidebar structure with translations
  const sidebarItems = [
    {
      id: 1,
      title: language === "ru" ? "Правила компании" : "Company Regulations",
      icon: Building,
      articleId: "company-regulations",
    },
    {
      id: 2,
      title: language === "ru" ? "Протоколы офтальмологии" : "Ophthalmology Protocols",
      icon: Microscope,
      articleId: "ophthalmology-protocols",
    },
    {
      id: 3,
      title: language === "ru" ? "Руководства по оптическому оборудованию" : "Equipment Manuals",
      icon: FileText,
      articleId: "equipment-manuals",
    },
    {
      id: 4,
      title: language === "ru" ? "HR и адаптация" : "HR & Onboarding",
      icon: Briefcase,
      articleId: "hr-onboarding",
    },
    {
      id: 5,
      title: language === "ru" ? "Маркетинг и брендбук" : "Marketing & Brandbook",
      icon: Store,
      articleId: "marketing-brandbook",
    },
    {
      id: 6,
      title: language === "ru" ? "Руководство по франшизе" : "Franchise Guidelines",
      icon: BookMarked,
      articleId: "franchise-guidelines",
      subItems: [
        {
          id: 61,
          title: language === "ru" ? "Операционные стандарты" : "Operational Standards",
          articleId: "operational-standards",
          subItems: [
            {
              id: 611,
              title: language === "ru" ? "Общие рекомендации" : "General Guidelines",
              articleId: "general-guidelines",
            },
            {
              id: 612,
              title: language === "ru" ? "Обслуживание клиентов" : "Customer Service",
              articleId: "customer-service",
            },
            {
              id: 613,
              title: language === "ru" ? "Контроль качества" : "Quality Control",
              articleId: "quality-control",
            },
          ],
        },
      ],
    },
    {
      id: 7,
      title: language === "ru" ? "Истории успеха" : "Success Cases",
      icon: Award,
      articleId: "success-cases",
    },
  ]

  // All available articles
  const articles = {
    "company-regulations": {
      id: "company-regulations",
      title: language === "ru" ? "Правила компании" : "Company Regulations",
      lastUpdated: language === "ru" ? "10 марта 2025" : "March 10, 2025",
      author: "Michael Roberts",
      breadcrumbs: [
        { title: language === "ru" ? "Правила компании" : "Company Regulations", articleId: "company-regulations" },
      ],
      sections: [
        {
          id: 1,
          title: language === "ru" ? "Общие положения" : "General Provisions",
          content:
            language === "ru"
              ? "Настоящие правила определяют основные принципы работы компании LOOV и обязательны для соблюдения всеми сотрудниками. Правила разработаны с целью обеспечения эффективной работы компании и создания комфортных условий труда."
              : "These regulations define the basic principles of LOOV company operations and are mandatory for all employees. The rules are designed to ensure the efficient operation of the company and create comfortable working conditions.",
        },
        {
          id: 2,
          title: language === "ru" ? "Рабочее время" : "Working Hours",
          content:
            language === "ru"
              ? "Стандартное рабочее время: с 9:00 до 18:00 с понедельника по пятницу. Обеденный перерыв: с 13:00 до 14:00. Все сотрудники должны приходить на работу вовремя и соблюдать установленный график работы."
              : "Standard working hours: 9:00 AM to 6:00 PM, Monday to Friday. Lunch break: 1:00 PM to 2:00 PM. All employees must arrive at work on time and adhere to the established work schedule.",
        },
        {
          id: 3,
          title: language === "ru" ? "Дресс-код" : "Dress Code",
          content:
            language === "ru"
              ? "Все сотрудники должны соблюдать деловой стиль одежды. Для мужчин: костюм, рубашка, галстук. Для женщин: деловой костюм, блузка, юбка или брюки. В пятницу допускается свободный стиль одежды (casual)."
              : "All employees must adhere to business attire. For men: suit, shirt, tie. For women: business suit, blouse, skirt or trousers. Casual attire is permitted on Fridays.",
        },
      ],
    },
    "ophthalmology-protocols": {
      id: "ophthalmology-protocols",
      title: language === "ru" ? "Протоколы офтальмологии" : "Ophthalmology Protocols",
      lastUpdated: language === "ru" ? "5 марта 2025" : "March 5, 2025",
      author: "Dr. Emma Wilson",
      breadcrumbs: [
        {
          title: language === "ru" ? "Протоколы офтальмологии" : "Ophthalmology Protocols",
          articleId: "ophthalmology-protocols",
        },
      ],
      sections: [
        {
          id: 1,
          title: language === "ru" ? "Стандартное обследование зрения" : "Standard Vision Examination",
          content:
            language === "ru"
              ? "Стандартное обследование зрения включает в себя проверку остроты зрения, измерение внутриглазного давления, осмотр глазного дна и проверку полей зрения. Обследование должно проводиться в соответствии с установленными протоколами."
              : "Standard vision examination includes visual acuity testing, intraocular pressure measurement, fundus examination, and visual field testing. The examination should be conducted in accordance with established protocols.",
        },
        {
          id: 2,
          title: language === "ru" ? "Диагностика глазных заболеваний" : "Diagnosis of Eye Diseases",
          content:
            language === "ru"
              ? "Диагностика глазных заболеваний должна проводиться с использованием современного оборудования и в соответствии с международными стандартами. При выявлении патологий необходимо назначить дополнительные исследования."
              : "Diagnosis of eye diseases should be carried out using modern equipment and in accordance with international standards. If pathologies are detected, additional examinations should be prescribed.",
        },
        {
          id: 3,
          title: language === "ru" ? "Подбор очков и контактных линз" : "Selection of Glasses and Contact Lenses",
          content:
            language === "ru"
              ? "Подбор очков и контактных линз должен осуществляться индивидуально для каждого пациента с учетом его особенностей и потребностей. Необходимо проводить детальную консультацию по правилам использования и ухода за очками и линзами."
              : "Selection of glasses and contact lenses should be carried out individually for each patient, taking into account their characteristics and needs. Detailed consultation on the rules of use and care for glasses and lenses should be provided.",
        },
      ],
    },
    "equipment-manuals": {
      id: "equipment-manuals",
      title: language === "ru" ? "Руководства по оптическому оборудованию" : "Optical Equipment Manuals",
      lastUpdated: language === "ru" ? "20 февраля 2025" : "February 20, 2025",
      author: "Alex Johnson",
      breadcrumbs: [
        {
          title: language === "ru" ? "Руководства по оптическому оборудованию" : "Optical Equipment Manuals",
          articleId: "equipment-manuals",
        },
      ],
      sections: [
        {
          id: 1,
          title: language === "ru" ? "Автоматический рефрактометр" : "Automatic Refractometer",
          content:
            language === "ru"
              ? "Автоматический рефрактометр используется для измерения рефракции глаза. Перед использованием убедитесь, что прибор откалиброван. Для проведения измерения попросите пациента сесть прямо и смотреть на мишень внутри прибора."
              : "The automatic refractometer is used to measure eye refraction. Before use, make sure the device is calibrated. To take a measurement, ask the patient to sit up straight and look at the target inside the device.",
          image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wiki-dJr6XHZIEkd5WXSwmBMGzzDc2KvHDR.png",
          caption: language === "ru" ? "Рисунок 1: Автоматический рефрактометр" : "Figure 1: Automatic Refractometer",
        },
        {
          id: 2,
          title: language === "ru" ? "Щелевая лампа" : "Slit Lamp",
          content:
            language === "ru"
              ? "Щелевая лампа используется для осмотра переднего отдела глаза. Перед использованием отрегулируйте высоту стула и положение подбородка пациента. Для проведения осмотра используйте различные фильтры и настройки освещения."
              : "The slit lamp is used to examine the anterior segment of the eye. Before use, adjust the height of the chair and the position of the patient's chin. For examination, use various filters and lighting settings.",
        },
        {
          id: 3,
          title: language === "ru" ? "Тонометр" : "Tonometer",
          content:
            language === "ru"
              ? "Тонометр используется для измерения внутриглазного давления. Перед использованием проведите калибровку прибора. Для проведения измерения попросите пациента расслабиться и смотреть прямо перед собой."
              : "The tonometer is used to measure intraocular pressure. Before use, calibrate the device. To take a measurement, ask the patient to relax and look straight ahead.",
        },
      ],
    },
    "hr-onboarding": {
      id: "hr-onboarding",
      title: language === "ru" ? "HR и адаптация" : "HR & Onboarding",
      lastUpdated: language === "ru" ? "15 января 2025" : "January 15, 2025",
      author: "Sarah Miller",
      breadcrumbs: [{ title: language === "ru" ? "HR и адаптация" : "HR & Onboarding", articleId: "hr-onboarding" }],
      sections: [
        {
          id: 1,
          title: language === "ru" ? "Процесс найма" : "Hiring Process",
          content:
            language === "ru"
              ? "Процесс найма включает в себя следующие этапы: размещение вакансии, отбор резюме, проведение собеседований, проверка рекомендаций, принятие решения о найме, оформление документов. Все этапы должны быть документированы в системе LoovIS."
              : "The hiring process includes the following stages: job posting, resume screening, conducting interviews, reference checking, hiring decision, paperwork. All stages should be documented in the LoovIS system.",
        },
        {
          id: 2,
          title: language === "ru" ? "Адаптация новых сотрудников" : "New Employee Onboarding",
          content:
            language === "ru"
              ? "Адаптация новых сотрудников включает в себя: знакомство с компанией, обучение работе с системами, знакомство с коллегами, изучение должностных инструкций, прохождение обязательных тренингов. Процесс адаптации должен занимать не более 2 недель."
              : "New employee onboarding includes: introduction to the company, training on systems, meeting colleagues, studying job descriptions, completing mandatory trainings. The onboarding process should take no more than 2 weeks.",
        },
        {
          id: 3,
          title: language === "ru" ? "Обучение и развитие" : "Training and Development",
          content:
            language === "ru"
              ? "Компания предоставляет возможности для обучения и развития сотрудников. Каждый сотрудник имеет доступ к онлайн-курсам и может участвовать в тренингах. Для прохождения обучения необходимо согласовать план с руководителем."
              : "The company provides opportunities for employee training and development. Each employee has access to online courses and can participate in trainings. To undergo training, it is necessary to agree on a plan with the manager.",
        },
      ],
    },
    "marketing-brandbook": {
      id: "marketing-brandbook",
      title: language === "ru" ? "Маркетинг и брендбук" : "Marketing & Brandbook",
      lastUpdated: language === "ru" ? "5 января 2025" : "January 5, 2025",
      author: "Lisa Wong",
      breadcrumbs: [
        {
          title: language === "ru" ? "Маркетинг и брендбук" : "Marketing & Brandbook",
          articleId: "marketing-brandbook",
        },
      ],
      sections: [
        {
          id: 1,
          title: language === "ru" ? "Логотип и фирменный стиль" : "Logo and Corporate Identity",
          content:
            language === "ru"
              ? "Логотип компании LOOV является основным элементом фирменного стиля. Использование логотипа должно соответствовать установленным правилам. Запрещается изменять пропорции, цвета и элементы логотипа без согласования с отделом маркетинга."
              : "The LOOV company logo is the main element of the corporate identity. The use of the logo must comply with established rules. It is forbidden to change the proportions, colors, and elements of the logo without coordination with the marketing department.",
          image: "/images/loov-logo.png",
          caption: language === "ru" ? "Рисунок 1: Логотип LOOV" : "Figure 1: LOOV Logo",
        },
        {
          id: 2,
          title: language === "ru" ? "Цветовая палитра" : "Color Palette",
          content:
            language === "ru"
              ? "Основные цвета компании: синий (#0066CC), серый (#333333), белый (#FFFFFF). Дополнительные цвета: оранжевый (#FF6600), зеленый (#00CC66). Использование других цветов в маркетинговых материалах не рекомендуется."
              : "Company main colors: blue (#0066CC), gray (#333333), white (#FFFFFF). Additional colors: orange (#FF6600), green (#00CC66). The use of other colors in marketing materials is not recommended.",
        },
        {
          id: 3,
          title: language === "ru" ? "Маркетинговые материалы" : "Marketing Materials",
          content:
            language === "ru"
              ? "Все маркетинговые материалы (брошюры, листовки, баннеры) должны соответствовать фирменному стилю компании. Перед публикацией материалы должны быть согласованы с отделом маркетинга. Шаблоны материалов доступны в системе LoovIS."
              : "All marketing materials (brochures, flyers, banners) must comply with the company's corporate identity. Before publication, materials must be approved by the marketing department. Material templates are available in the LoovIS system.",
        },
      ],
    },
    "franchise-guidelines": {
      id: "franchise-guidelines",
      title: language === "ru" ? "Руководство по франшизе" : "Franchise Guidelines",
      lastUpdated: language === "ru" ? "20 декабря 2024" : "December 20, 2024",
      author: "James Wilson",
      breadcrumbs: [
        {
          title: language === "ru" ? "Руководство по франшизе" : "Franchise Guidelines",
          articleId: "franchise-guidelines",
        },
      ],
      sections: [
        {
          id: 1,
          title: language === "ru" ? "Требования к помещению" : "Premises Requirements",
          content:
            language === "ru"
              ? "Помещение для франшизы LOOV должно соответствовать следующим требованиям: площадь не менее 100 кв.м., расположение в торговом центре или на первой линии домов, наличие отдельного входа, возможность размещения вывески. Планировка помещения должна соответствовать стандартам компании."
              : "The premises for the LOOV franchise must meet the following requirements: area of at least 100 sq.m., location in a shopping center or on the first line of buildings, presence of a separate entrance, possibility of placing a sign. The layout of the premises must comply with company standards.",
        },
        {
          id: 2,
          title: language === "ru" ? "Финансовые условия" : "Financial Conditions",
          content:
            language === "ru"
              ? "Паушальный взнос: 50 000 евро. Роялти: 5% от ежемесячного оборота. Маркетинговый сбор: 2% от ежемесячного оборота. Инвестиции в открытие: от 100 000 до 150 000 евро в зависимости от формата и региона."
              : "Franchise fee: 50,000 euros. Royalty: 5% of monthly turnover. Marketing fee: 2% of monthly turnover. Investment in opening: from 100,000 to 150,000 euros depending on the format and region.",
        },
        {
          id: 3,
          title: language === "ru" ? "Поддержка франчайзи" : "Franchisee Support",
          content:
            language === "ru"
              ? "Компания LOOV предоставляет следующую поддержку франчайзи: обучение персонала, помощь в подборе помещения, разработка дизайн-проекта, маркетинговая поддержка, операционная поддержка, доступ к системе LoovIS. Поддержка осуществляется на всех этапах работы франшизы."
              : "LOOV company provides the following support to franchisees: staff training, assistance in selecting premises, development of a design project, marketing support, operational support, access to the LoovIS system. Support is provided at all stages of the franchise operation.",
        },
      ],
    },
    "operational-standards": {
      id: "operational-standards",
      title: language === "ru" ? "Операционные стандарты" : "Operational Standards",
      lastUpdated: language === "ru" ? "15 декабря 2024" : "December 15, 2024",
      author: "Michael Park",
      breadcrumbs: [
        {
          title: language === "ru" ? "Руководство по франшизе" : "Franchise Guidelines",
          articleId: "franchise-guidelines",
        },
        {
          title: language === "ru" ? "Операционные стандарты" : "Operational Standards",
          articleId: "operational-standards",
        },
      ],
      sections: [
        {
          id: 1,
          title: language === "ru" ? "Часы работы" : "Working Hours",
          content:
            language === "ru"
              ? "Стандартные часы работы для всех франшиз LOOV: с 10:00 до 22:00 ежедневно без выходных. Изменение часов работы возможно только по согласованию с головным офисом. В праздничные дни часы работы могут быть изменены по согласованию с головным офисом."
              : "Standard working hours for all LOOV franchises: from 10:00 AM to 10:00 PM daily without days off. Changing working hours is possible only with the approval of the head office. On holidays, working hours may be changed with the approval of the head office.",
        },
        {
          id: 2,
          title: language === "ru" ? "Стандарты обслуживания" : "Service Standards",
          content:
            language === "ru"
              ? "Все сотрудники франшизы должны соблюдать стандарты обслуживания LOOV. Время ожидания клиента не должно превышать 5 минут. Каждый клиент должен быть встречен в течение 30 секунд после входа в салон. Все сотрудники должны носить униформу и бейджи."
              : "All franchise employees must comply with LOOV service standards. Customer waiting time should not exceed 5 minutes. Each customer should be greeted within 30 seconds after entering the salon. All employees must wear uniforms and badges.",
        },
        {
          id: 3,
          title: language === "ru" ? "Управление запасами" : "Inventory Management",
          content:
            language === "ru"
              ? "Управление запасами осуществляется через систему LoovIS. Минимальный запас товаров должен составлять 30 дней продаж. Заказ товаров осуществляется еженедельно. Инвентаризация проводится ежемесячно. Все расхождения должны быть зафиксированы в системе."
              : "Inventory management is carried out through the LoovIS system. The minimum stock of goods should be 30 days of sales. Ordering of goods is carried out weekly. Inventory is conducted monthly. All discrepancies must be recorded in the system.",
        },
      ],
    },
    "general-guidelines": {
      id: "general-guidelines",
      title: language === "ru" ? "Общие рекомендации" : "General Guidelines",
      lastUpdated: language === "ru" ? "10 декабря 2024" : "December 10, 2024",
      author: "Emily Davis",
      breadcrumbs: [
        {
          title: language === "ru" ? "Руководство по франшизе" : "Franchise Guidelines",
          articleId: "franchise-guidelines",
        },
        {
          title: language === "ru" ? "Операционные стандарты" : "Operational Standards",
          articleId: "operational-standards",
        },
        { title: language === "ru" ? "Общие рекомендации" : "General Guidelines", articleId: "general-guidelines" },
      ],
      sections: [
        {
          id: 1,
          title: language === "ru" ? "Внешний вид салона" : "Salon Appearance",
          content:
            language === "ru"
              ? "Внешний вид салона должен соответствовать стандартам бренда LOOV. Вывеска должна быть освещена в темное время суток. Витрины должны быть чистыми и оформлены в соответствии с текущей маркетинговой кампанией. Входная зона должна быть чистой и свободной от препятствий."
              : "The appearance of the salon must comply with LOOV brand standards. The sign must be illuminated in the dark. Showcases must be clean and decorated in accordance with the current marketing campaign. The entrance area must be clean and free of obstacles.",
        },
        {
          id: 2,
          title: language === "ru" ? "Чистота и порядок" : "Cleanliness and Order",
          content:
            language === "ru"
              ? "В салоне должна поддерживаться чистота и порядок. Уборка помещения проводится ежедневно до открытия и после закрытия салона. Рабочие места сотрудников должны быть чистыми и организованными. Туалетные комнаты должны проверяться каждые 2 часа."
              : "Cleanliness and order must be maintained in the salon. Cleaning of the premises is carried out daily before opening and after closing the salon. Employee workplaces must be clean and organized. Restrooms should be checked every 2 hours.",
        },
        {
          id: 3,
          title: language === "ru" ? "Безопасность" : "Safety",
          content:
            language === "ru"
              ? "Все сотрудники должны соблюдать правила безопасности. Аварийные выходы должны быть свободны от препятствий. Огнетушители должны быть в рабочем состоянии и легко доступны. Система видеонаблюдения должна работать круглосуточно. Все инциденты должны быть зафиксированы в журнале."
              : "All employees must follow safety rules. Emergency exits must be free of obstacles. Fire extinguishers must be in working order and easily accessible. The video surveillance system must operate around the clock. All incidents must be recorded in the log.",
        },
      ],
    },
    "customer-service": {
      id: "customer-service",
      title: language === "ru" ? "Руководство по обслуживанию клиентов" : "Customer Service Guidelines",
      lastUpdated: language === "ru" ? "15 марта 2025" : "March 15, 2025",
      author: "Sarah Johnson",
      breadcrumbs: [
        {
          title: language === "ru" ? "Руководство по франшизе" : "Franchise Guidelines",
          articleId: "franchise-guidelines",
        },
        {
          title: language === "ru" ? "Операционные стандарты" : "Operational Standards",
          articleId: "operational-standards",
        },
        { title: language === "ru" ? "Обслуживание клиентов" : "Customer Service", articleId: "customer-service" },
      ],
      sections: [
        {
          id: 1,
          title: language === "ru" ? "Введение" : "Introduction",
          content:
            language === "ru"
              ? "Эти рекомендации описывают стандартные процедуры для представителей службы поддержки клиентов, использующих систему LoovIS. Следование этим протоколам обеспечивает последовательное, высококачественное обслуживание во всех взаимодействиях с клиентами."
              : "These guidelines outline the standard procedures for customer service representatives using the LoovIS system. Following these protocols ensures consistent, high-quality service delivery across all customer interactions.",
        },
        {
          id: 2,
          title: language === "ru" ? "Протокол взаимодействия с клиентами" : "Customer Interaction Protocol",
          highlight:
            language === "ru"
              ? "Всегда проверяйте личность клиента перед доступом или изменением любых записей клиента в системе."
              : "Always verify customer identity before accessing or modifying any customer records in the system.",
          steps: [
            {
              id: 1,
              text: language === "ru" ? "Откройте профиль клиента в модуле CRM" : "Open customer profile in CRM module",
            },
            {
              id: 2,
              text:
                language === "ru"
                  ? "Проверьте личность клиента, используя как минимум два пункта данных"
                  : "Verify customer identity using at least two data points",
            },
            {
              id: 3,
              text:
                language === "ru"
                  ? "Документируйте все взаимодействия в разделе истории клиента"
                  : "Document all interactions in the customer history section",
            },
          ],
        },
        {
          id: 3,
          title: language === "ru" ? "Руководство по интерфейсу системы" : "System Interface Guide",
          image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wiki-dJr6XHZIEkd5WXSwmBMGzzDc2KvHDR.png",
          caption:
            language === "ru"
              ? "Рисунок 1: Интерфейс LoovIS CRM - Вид профиля клиента"
              : "Figure 1: LoovIS CRM Interface - Customer Profile View",
        },
        {
          id: 4,
          title: language === "ru" ? "Краткое справочное руководство" : "Quick Reference Guide",
          table: [
            {
              action: language === "ru" ? "Новый клиент" : "New Customer",
              shortcut: "Ctrl + N",
              description: language === "ru" ? "Создает новый профиль клиента" : "Creates new customer profile",
            },
            {
              action: language === "ru" ? "Поиск клиента" : "Search Customer",
              shortcut: "Ctrl + F",
              description: language === "ru" ? "Открывает окно поиска клиента" : "Opens customer search window",
            },
            {
              action: language === "ru" ? "Сохранить изменения" : "Save Changes",
              shortcut: "Ctrl + S",
              description:
                language === "ru" ? "Сохраняет изменения в профиле клиента" : "Saves changes to customer profile",
            },
          ],
        },
      ],
    },
    "quality-control": {
      id: "quality-control",
      title: language === "ru" ? "Контроль качества" : "Quality Control",
      lastUpdated: language === "ru" ? "5 декабря 2024" : "December 5, 2024",
      author: "Robert Lee",
      breadcrumbs: [
        {
          title: language === "ru" ? "Руководство по франшизе" : "Franchise Guidelines",
          articleId: "franchise-guidelines",
        },
        {
          title: language === "ru" ? "Операционные стандарты" : "Operational Standards",
          articleId: "operational-standards",
        },
        { title: language === "ru" ? "Контроль качества" : "Quality Control", articleId: "quality-control" },
      ],
      sections: [
        {
          id: 1,
          title: language === "ru" ? "Стандарты качества" : "Quality Standards",
          content:
            language === "ru"
              ? "Все продукты и услуги LOOV должны соответствовать высоким стандартам качества. Каждый продукт проходит проверку качества перед поступлением в продажу. Все услуги предоставляются в соответствии с установленными протоколами. Несоответствие стандартам качества недопустимо."
              : "All LOOV products and services must meet high quality standards. Each product undergoes quality control before going on sale. All services are provided in accordance with established protocols. Non-compliance with quality standards is unacceptable.",
        },
        {
          id: 2,
          title: language === "ru" ? "Проверка качества" : "Quality Inspection",
          content:
            language === "ru"
              ? "Проверка качества продукции проводится на всех этапах: при поступлении товара, перед выкладкой на витрину, перед продажей клиенту. Проверка включает в себя: визуальный осмотр, проверку комплектации, проверку функциональности. Все результаты проверки фиксируются в системе LoovIS."
              : "Quality control of products is carried out at all stages: upon receipt of goods, before display in the showcase, before sale to the customer. The inspection includes: visual inspection, checking the completeness, checking the functionality. All inspection results are recorded in the LoovIS system.",
        },
        {
          id: 3,
          title: language === "ru" ? "Обратная связь от клиентов" : "Customer Feedback",
          content:
            language === "ru"
              ? "Обратная связь от клиентов является важным инструментом контроля качества. Все отзывы клиентов должны быть зарегистрированы в системе LoovIS. Негативные отзывы должны быть обработаны в течение 24 часов. Ежемесячно проводится анализ обратной связи для выявления областей для улучшения."
              : "Customer feedback is an important quality control tool. All customer reviews must be registered in the LoovIS system. Negative reviews must be processed within 24 hours. Feedback analysis is conducted monthly to identify areas for improvement.",
        },
      ],
    },
    "success-cases": {
      id: "success-cases",
      title: language === "ru" ? "Истории успеха" : "Success Cases",
      lastUpdated: language === "ru" ? "1 декабря 2024" : "December 1, 2024",
      author: "Anna Kim",
      breadcrumbs: [{ title: language === "ru" ? "Истории успеха" : "Success Cases", articleId: "success-cases" }],
      sections: [
        {
          id: 1,
          title: language === "ru" ? "Франшиза в Москве" : "Moscow Franchise",
          content:
            language === "ru"
              ? "Франшиза LOOV в Москве была открыта в 2023 году. За первый год работы салон достиг оборота в 1,5 млн евро, что на 30% выше планового показателя. Ключевыми факторами успеха стали: удачное расположение в торговом центре, профессиональная команда, активное использование маркетинговых инструментов."
              : "The LOOV franchise in Moscow was opened in 2023. In the first year of operation, the salon achieved a turnover of 1.5 million euros, which is 30% higher than the planned figure. The key success factors were: good location in the shopping center, professional team, active use of marketing tools.",
        },
        {
          id: 2,
          title: language === "ru" ? "Франшиза в Санкт-Петербурге" : "St. Petersburg Franchise",
          content:
            language === "ru"
              ? "Франшиза LOOV в Санкт-Петербурге была открыта в 2022 году. Особенностью данной франшизы стало сочетание оптики и кофейни в одном помещении. Это привлекло дополнительный поток клиентов и увеличило среднее время пребывания клиента в салоне. Оборот за второй год работы составил 2 млн евро."
              : "The LOOV franchise in St. Petersburg was opened in 2022. The feature of this franchise was the combination of optics and a coffee shop in one room. This attracted an additional flow of customers and increased the average time a customer stays in the salon. The turnover for the second year of operation was 2 million euros.",
        },
        {
          id: 3,
          title: language === "ru" ? "Франшиза в Казани" : "Kazan Franchise",
          content:
            language === "ru"
              ? "Франшиза LOOV в Казани была открыта в 2024 году. Несмотря на высокую конкуренцию в регионе, салон смог привлечь клиентов благодаря уникальному предложению - услуге экспресс-диагностики зрения. За первые 6 месяцев работы салон обслужил более 5000 клиентов и достиг точки безубыточности на 2 месяца раньше плана."
              : "The LOOV franchise in Kazan was opened in 2024. Despite high competition in the region, the salon was able to attract customers thanks to a unique offer - express vision diagnostics service. In the first 6 months of operation, the salon served more than 5,000 customers and reached the break-even point 2 months ahead of schedule.",
        },
      ],
    },
  }

  // Map article IDs to sidebar items
  const articleToSidebarMap = {
    "company-regulations": { item: 1 },
    "ophthalmology-protocols": { item: 2 },
    "equipment-manuals": { item: 3 },
    "hr-onboarding": { item: 4 },
    "marketing-brandbook": { item: 5 },
    "franchise-guidelines": { item: 6 },
    "operational-standards": { item: 6, subItem: 61 },
    "general-guidelines": { item: 6, subItem: 61, nestedItem: 611 },
    "customer-service": { item: 6, subItem: 61, nestedItem: 612 },
    "quality-control": { item: 6, subItem: 61, nestedItem: 613 },
    "success-cases": { item: 7 },
  }

  // Update sidebar when active article changes
  useEffect(() => {
    if (articleToSidebarMap[activeArticle]) {
      const mapping = articleToSidebarMap[activeArticle]
      setActiveSidebarItem(mapping.item)
      if (mapping.subItem) setActiveSubItem(mapping.subItem)
      else setActiveSubItem(null)
      if (mapping.nestedItem) setActiveNestedItem(mapping.nestedItem)
      else setActiveNestedItem(null)
    }
  }, [activeArticle])

  // Handle sidebar item click
  const handleSidebarItemClick = (articleId) => {
    setActiveArticle(articleId)
  }

  // Handle breadcrumb click
  const handleBreadcrumbClick = (articleId) => {
    setActiveArticle(articleId)
  }

  // Get current article
  const currentArticle = articles[activeArticle]

  // Update sidebar structure to reflect active items
  const updatedSidebarItems = sidebarItems.map((item) => {
    const isItemActive = item.id === activeSidebarItem

    // Update subItems if they exist
    const updatedSubItems = item.subItems
      ? item.subItems.map((subItem) => {
          const isSubItemActive = subItem.id === activeSubItem

          // Update nestedItems if they exist
          const updatedNestedItems = subItem.subItems
            ? subItem.subItems.map((nestedItem) => {
                return {
                  ...nestedItem,
                  active: nestedItem.id === activeNestedItem,
                }
              })
            : null

          return {
            ...subItem,
            expanded: isSubItemActive,
            subItems: updatedNestedItems,
          }
        })
      : null

    return {
      ...item,
      expanded: isItemActive,
      subItems: updatedSubItems,
    }
  })

  return (
    <div className="flex h-full">
      <div className="w-64 border-r bg-white p-4 hidden md:block">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder={language === "ru" ? "Спросить LOOV AI" : "Ask LOOV AI"}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <nav>
          <ul className="space-y-1">
            {updatedSidebarItems.map((item) => (
              <li key={item.id}>
                <div className="space-y-1">
                  <button
                    onClick={() => handleSidebarItemClick(item.articleId)}
                    className={`flex items-center w-full px-3 py-2 text-sm rounded-md text-left ${
                      item.expanded ? "text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                    {item.title}
                    {item.subItems && (
                      <span className="ml-auto">
                        {item.expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                      </span>
                    )}
                  </button>

                  {item.expanded && item.subItems && (
                    <ul className="pl-6 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.id}>
                          <div className="space-y-1">
                            <button
                              onClick={() => handleSidebarItemClick(subItem.articleId)}
                              className={`flex items-center w-full px-3 py-2 text-sm rounded-md text-left ${
                                subItem.expanded ? "text-blue-600 font-medium" : "text-gray-700 hover:bg-gray-100"
                              }`}
                            >
                              {subItem.title}
                              {subItem.subItems && (
                                <span className="ml-auto">
                                  {subItem.expanded ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4" />
                                  )}
                                </span>
                              )}
                            </button>

                            {subItem.expanded && subItem.subItems && (
                              <ul className="pl-6 space-y-1">
                                {subItem.subItems.map((nestedItem) => (
                                  <li key={nestedItem.id}>
                                    <button
                                      onClick={() => handleSidebarItemClick(nestedItem.articleId)}
                                      className={`flex items-center w-full px-3 py-2 text-sm rounded-md text-left ${
                                        nestedItem.active
                                          ? "bg-blue-50 text-blue-600 font-medium"
                                          : "text-gray-700 hover:bg-gray-100"
                                      }`}
                                    >
                                      {nestedItem.title}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Training modules - only shown on main page */}
          {!activeArticle && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">
                {language === "ru" ? "Обучение и сертификация персонала" : "Staff Training & Certification"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trainingModules.map((module) => (
                  <Card key={module.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <module.icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <h3 className="font-medium">{module.title}</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">{language === "ru" ? "Прогресс" : "Progress"}</span>
                          <span
                            className={
                              module.id === 1 ? "text-green-600" : module.id === 2 ? "text-orange-600" : "text-blue-600"
                            }
                          >
                            {module.completed}
                          </span>
                        </div>
                        <Progress
                          value={module.progress}
                          className="h-2"
                          indicatorClassName={
                            module.id === 1 ? "bg-green-600" : module.id === 2 ? "bg-orange-500" : "bg-blue-600"
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Article content */}
          {currentArticle && (
            <>
              <div className="mb-4">
                <nav className="flex" aria-label="Breadcrumb">
                  <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    {currentArticle.breadcrumbs.map((item, index) => (
                      <li key={index} className="inline-flex items-center">
                        {index > 0 && <ChevronRight className="h-4 w-4 text-gray-400 mx-1" />}
                        <button
                          onClick={() => handleBreadcrumbClick(item.articleId)}
                          className={`inline-flex items-center text-sm ${
                            index === currentArticle.breadcrumbs.length - 1
                              ? "text-gray-500"
                              : "text-blue-600 hover:underline"
                          }`}
                        >
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ol>
                </nav>
              </div>

              <div className="bg-white border rounded-lg p-6 mb-6">
                <h1 className="text-2xl font-bold mb-2">{currentArticle.title}</h1>
                <div className="flex items-center text-sm text-gray-500 mb-6">
                  <span>
                    {language === "ru" ? "Последнее обновление:" : "Last updated:"} {currentArticle.lastUpdated}
                  </span>
                  <span className="mx-2">•</span>
                  <span>
                    {language === "ru" ? "Автор:" : "By:"} {currentArticle.author}
                  </span>
                </div>

                <div className="space-y-8">
                  {currentArticle.sections.map((section) => (
                    <div key={section.id} className="space-y-4">
                      <h2 className="text-xl font-semibold">
                        {section.id}. {section.title}
                      </h2>

                      {section.content && <p className="text-gray-700">{section.content}</p>}

                      {section.highlight && (
                        <div className="border-l-4 border-blue-500 bg-blue-50 p-4 text-blue-800">
                          {section.highlight}
                        </div>
                      )}

                      {section.steps && (
                        <div className="space-y-3">
                          {section.steps.map((step) => (
                            <div key={step.id} className="flex items-start">
                              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                                <span className="text-sm font-medium">{step.id}</span>
                              </div>
                              <span>{step.text}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.image && (
                        <div className="space-y-2">
                          <img
                            src={section.image || "/placeholder.svg"}
                            alt={section.caption || "Documentation image"}
                            className="border rounded-lg w-full"
                          />
                          {section.caption && <p className="text-sm text-gray-500 text-center">{section.caption}</p>}
                        </div>
                      )}

                      {section.table && (
                        <div className="border rounded-lg overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  {language === "ru" ? "Действие" : "Action"}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  {language === "ru" ? "Сочетание клавиш" : "Shortcut"}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  {language === "ru" ? "Описание" : "Description"}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {section.table.map((row, index) => (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {row.action}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.shortcut}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {row.description}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
