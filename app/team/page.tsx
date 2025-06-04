"use client"

import type React from "react"
import { useLanguage } from "@/contexts/language-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Filter, PlusCircle, RefreshCw, Users } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function TeamPage() {
  const { t, language } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"list" | "org">("org")
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const router = useRouter()

  const [showNewClubDialog, setShowNewClubDialog] = useState(false)
  const [newClubStep, setNewClubStep] = useState(1)
  const [newClubData, setNewClubData] = useState({
    name: "",
    address: "",
    city: "",
    region: "",
    legalEntity: "",
    companyOwner: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    template: "",
    manager: "",
    openingDate: "",
    description: "",
  })

  // Función para iniciar la creación de un club con una plantilla específica
  const startNewClubWithTemplate = (template: string) => {
    setNewClubData({
      ...newClubData,
      template: template,
    })
    setNewClubStep(3) // Comenzar desde el paso 3 (después de seleccionar la plantilla)
    setShowNewClubDialog(true)
  }

  const organizationChart = [
    {
      id: "1",
      role: language === "ru" ? "Руководитель клуба" : "Club Leader",
      specialists: language === "ru" ? "1 специалист" : "1 specialist",
      description:
        language === "ru"
          ? "Управляет ежедневными операциями и координацией команды"
          : "Manages daily operations and team coordination",
      avatar: "/avatars/sarah-anderson.jpg",
      name: "Sarah Anderson",
    },
    {
      id: "2",
      role: language === "ru" ? "Старший менеджер" : "Senior Manager",
      specialists: language === "ru" ? "2 специалиста (1 на смену)" : "2 specialists (1 per shift)",
      description:
        language === "ru"
          ? "Контролирует обслуживание клиентов и продажи"
          : "Supervises customer service and sales operations",
      avatar: "/avatars/alex-johnson.jpg",
      name: "Alex Johnson",
      similarPositions: [
        {
          id: "21",
          name: "Michael Roberts",
          avatar: "/avatars/michael-roberts.jpg",
          shift: language === "ru" ? "Вечерняя смена" : "Evening shift",
        },
      ],
    },
    {
      id: "3",
      role: language === "ru" ? "Старший мастер" : "Senior Crafter",
      specialists: language === "ru" ? "2 специалиста (посменно)" : "2 specialists (shift-based)",
      description:
        language === "ru"
          ? "Руководит изготовлением линз и контролем качества"
          : "Leads lens crafting and quality control",
      avatar: "/avatars/mike-chen.jpg",
      name: "Mike Chen",
      similarPositions: [
        {
          id: "31",
          name: "Lisa Wong",
          avatar: "/avatars/lisa-wong.jpg",
          shift: language === "ru" ? "Вечерняя смена" : "Evening shift",
        },
      ],
    },
    {
      id: "4",
      role: language === "ru" ? "Старший оптометрист" : "Senior Optometrist",
      specialists: language === "ru" ? "1 специалист" : "1 specialist",
      description: language === "ru" ? "Контролирует услуги по проверке зрения" : "Oversees eye examination services",
      avatar: "/avatars/emma-white.jpg",
      name: "Dr. Emma White",
    },
    {
      id: "5",
      role: language === "ru" ? "Менеджер по обслуживанию" : "Care Manager",
      specialists: language === "ru" ? "2 специалиста (1 на смену)" : "2 specialists (1 per shift)",
      description:
        language === "ru"
          ? "Отвечает за обслуживание клиентов и их удовлетворенность"
          : "Handles customer care and satisfaction",
      avatar: "/avatars/sarah-miller.jpg",
      name: "Sarah Miller",
      similarPositions: [
        {
          id: "51",
          name: "David Roberts",
          avatar: "/avatars/david-roberts.jpg",
          shift: language === "ru" ? "Вечерняя смена" : "Evening shift",
        },
      ],
    },
    {
      id: "6",
      role: language === "ru" ? "Мастер" : "Crafter",
      specialists: language === "ru" ? "4 (2 на смену)" : "4 (2 per shift)",
      description:
        language === "ru" ? "Производит и обслуживает оптические изделия" : "Produces and maintains optical products",
      avatar: "/avatars/james-wilson.jpg",
      name: "James Wilson",
      similarPositions: [
        {
          id: "61",
          name: "Emily Davis",
          avatar: "/avatars/emily-davis.jpg",
          shift: language === "ru" ? "Утренняя смена" : "Morning shift",
        },
        {
          id: "62",
          name: "Robert Lee",
          avatar: "/avatars/robert-lee.jpg",
          shift: language === "ru" ? "Вечерняя смена" : "Evening shift",
        },
        {
          id: "63",
          name: "Sarah Chen",
          avatar: "/avatars/sarah-chen.jpg",
          shift: language === "ru" ? "Вечерняя смена" : "Evening shift",
        },
      ],
    },
    {
      id: "7",
      role: language === "ru" ? "Офтальмолог" : "Ophthalmologist",
      specialists: language === "ru" ? "1 + 1 плавающий" : "1 + 1 floating",
      description:
        language === "ru"
          ? "Предоставляет специализированную помощь и лечение глаз"
          : "Provides specialized eye care and treatments",
      avatar: "/avatars/anna-kim.jpg",
      name: "Dr. Anna Kim",
      similarPositions: [
        {
          id: "71",
          name: "Dr. Michael Park",
          avatar: "/avatars/michael-park.jpg",
          shift: language === "ru" ? "Плавающий график" : "Floating schedule",
        },
      ],
    },
    {
      id: "8",
      role: language === "ru" ? "Оптометрист" : "Optometrist",
      specialists: language === "ru" ? "2 специалиста (1 на смену)" : "2 specialists (1 per shift)",
      description:
        language === "ru"
          ? "Проводит проверку зрения и выписывает рецепты"
          : "Performs eye examinations and prescriptions",
      avatar: "/avatars/robert-lee.jpg",
      name: "Robert Lee",
      similarPositions: [
        {
          id: "81",
          name: "Emma Wilson",
          avatar: "/avatars/emma-wilson.jpg",
          shift: language === "ru" ? "Вечерняя смена" : "Evening shift",
        },
      ],
    },
  ]

  const quickActions = [
    {
      id: 1,
      title: language === "ru" ? "Добавить нового сотрудника" : "Add New Employee",
      icon: Users,
    },
    {
      id: 2,
      title: language === "ru" ? "Создать отдел" : "Create Department",
      icon: Copy,
    },
    {
      id: 3,
      title: language === "ru" ? "Обновить иерархию" : "Update Hierarchy",
      icon: RefreshCw,
    },
  ]

  const recentChanges = [
    {
      id: 1,
      title: language === "ru" ? "Добавлен новый сотрудник" : "New employee added",
      time: language === "ru" ? "2 часа назад" : "2 hours ago",
      icon: Users,
    },
    {
      id: 2,
      title: language === "ru" ? "Обновление должности" : "Role update",
      time: language === "ru" ? "5 часов назад" : "5 hours ago",
      icon: RefreshCw,
    },
  ]

  const statistics = [
    {
      title: language === "ru" ? "Всего сотрудников" : "Total Employees",
      value: "156",
    },
    {
      title: language === "ru" ? "Отделы" : "Departments",
      value: "12",
    },
    {
      title: language === "ru" ? "Локации" : "Locations",
      value: "4",
    },
  ]

  const franchiseTemplates = [
    {
      id: 1,
      title: language === "ru" ? "Розничный магазин" : "Retail Store",
      positions: language === "ru" ? "10 должностей" : "10 positions",
      description:
        language === "ru"
          ? "Стандартная структура организации розничного магазина с ролями руководства и персонала"
          : "Standard retail store organization structure with management and staff roles",
    },
    {
      id: 2,
      title: language === "ru" ? "Клиника" : "Clinic",
      positions: language === "ru" ? "12 должностей" : "12 positions",
      description:
        language === "ru"
          ? "Полная структура персонала клиники, включая все стандарты и оборудование"
          : "The complete structure of the clinic's staff, including all standards and equipment",
    },
    {
      id: "3",
      title: language === "ru" ? "Сервисный центр" : "Service Center",
      positions: language === "ru" ? "8 должностей" : "8 positions",
      description:
        language === "ru"
          ? "Шаблон организации сервисного центра с техническими и вспомогательными ролями"
          : "Service center organization template with technical and support roles",
    },
  ]

  const filteredOrganizationChart = organizationChart.filter(
    (item) =>
      item.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Функция для отображения диалога с сотрудниками на аналогичных должностях
  const showSimilarPositions = (roleId: string) => {
    setSelectedRole(roleId)
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">
            {language === "ru" ? "Организационная структура" : "Organizational Structure"}
          </h1>
          <p className="text-gray-600">
            {language === "ru"
              ? "Управление и визуализация структуры компании"
              : "Management and visualization of company structure"}
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <Copy className="h-4 w-4" />
            <span>{language === "ru" ? "Дублировать клуб" : "Duplicate Club"}</span>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>{language === "ru" ? "Добавить сотрудника" : "Add Employee"}</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{language === "ru" ? "Добавить нового сотрудника" : "Add New Employee"}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right">
                    {language === "ru" ? "Имя" : "Name"}
                  </label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="role" className="text-right">
                    {language === "ru" ? "Должность" : "Role"}
                  </label>
                  <Input id="role" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="department" className="text-right">
                    {language === "ru" ? "Отдел" : "Department"}
                  </label>
                  <select id="department" className="col-span-3 border rounded-md px-3 py-1.5 bg-white">
                    <option>{language === "ru" ? "Управление" : "Management"}</option>
                    <option>{language === "ru" ? "Продажи" : "Sales"}</option>
                    <option>{language === "ru" ? "Обслуживание клиентов" : "Customer Service"}</option>
                    <option>{language === "ru" ? "Медицинский персонал" : "Medical Staff"}</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="email" className="text-right">
                    Email
                  </label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="phone" className="text-right">
                    {language === "ru" ? "Телефон" : "Phone"}
                  </label>
                  <Input id="phone" type="tel" className="col-span-3" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">{language === "ru" ? "Отмена" : "Cancel"}</Button>
                <Button>{language === "ru" ? "Сохранить" : "Save"}</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder={
                language === "ru"
                  ? "Поиск по имени, должности или отделу..."
                  : "Search by name, position or department..."
              }
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>{language === "ru" ? "Фильтры" : "Filters"}</span>
          </Button>
          <Tabs defaultValue="org" className="w-[200px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="org" onClick={() => setViewMode("org")}>
                {language === "ru" ? "Схема" : "Chart"}
              </TabsTrigger>
              <TabsTrigger value="list" onClick={() => setViewMode("list")}>
                {language === "ru" ? "Список" : "List"}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {viewMode === "org" ? (
        <div className="mb-8">
          <div className="flex flex-col items-center mb-8">
            {/* Club Leader */}
            <div className="mb-6">
              <Link href={`/team/members/1`}>
                <Card className="w-[300px] hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-16 w-16 mb-3">
                        <AvatarImage src="/avatars/sarah-anderson.jpg" />
                        <AvatarFallback>SA</AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold">{organizationChart[0].name}</h3>
                      <p className="text-sm font-medium text-blue-600">{organizationChart[0].role}</p>
                      <p className="text-xs text-gray-500 mt-1">{organizationChart[0].specialists}</p>
                      <p className="text-sm text-gray-600 mt-2">{organizationChart[0].description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>

            {/* Vertical line */}
            <div className="w-px h-8 bg-gray-300"></div>

            {/* Senior level */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              {organizationChart.slice(1, 5).map((item) => (
                <div key={item.id} className="flex flex-col items-center">
                  <div onClick={() => (item.similarPositions ? null : router.push(`/team/members/${item.id}`))}>
                    <Card className="w-[250px] hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex flex-col items-center text-center">
                          <Avatar className="h-12 w-12 mb-2">
                            <AvatarImage src={item.avatar} />
                            <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <p className="text-xs font-medium text-blue-600">{item.role}</p>
                          <div
                            className="text-xs text-gray-500 mt-1 cursor-pointer hover:text-blue-600"
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation() // Detener la propagación para evitar la navegación
                              if (item.similarPositions) {
                                showSimilarPositions(item.id)
                              }
                            }}
                          >
                            {item.specialists}
                            {item.similarPositions && (
                              <span className="ml-1 text-blue-600">{language === "ru" ? "(просмотр)" : "(view)"}</span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  {/* Vertical line to next level */}
                  {item.id < 5 && <div className="w-px h-8 bg-gray-300 mt-2"></div>}
                </div>
              ))}
            </div>

            {/* Staff level */}
            <div className="flex flex-wrap justify-center gap-6">
              {organizationChart.slice(5).map((item) => (
                <div
                  key={item.id}
                  onClick={() => (item.similarPositions ? null : router.push(`/team/members/${item.id}`))}
                >
                  <Card className="w-[220px] hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex flex-col items-center text-center">
                        <Avatar className="h-10 w-10 mb-2">
                          <AvatarImage src={item.avatar} />
                          <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-xs font-medium text-gray-600">{item.role}</p>
                        <div
                          className="text-xs text-gray-500 mt-1 cursor-pointer hover:text-blue-600"
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation() // Detener la propagación para evitar la navegación
                            if (item.similarPositions) {
                              showSimilarPositions(item.id)
                            }
                          }}
                        >
                          {item.specialists}
                          {item.similarPositions && (
                            <span className="ml-1 text-blue-600">{language === "ru" ? "(просмотр)" : "(view)"}</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredOrganizationChart.map((item) => (
            <Link key={item.id} href={`/team/members/${item.id}`}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={item.avatar} />
                      <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm font-medium text-blue-600">{item.role}</p>
                      <div
                        className="text-xs text-gray-500 mb-2 cursor-pointer hover:text-blue-600"
                        onClick={(e) => {
                          e.preventDefault()
                          item.similarPositions && showSimilarPositions(item.id)
                        }}
                      >
                        {item.specialists}
                        {item.similarPositions && (
                          <span className="ml-1 text-blue-600">{language === "ru" ? "(просмотр)" : "(view)"}</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{language === "ru" ? "Быстрые действия" : "Quick Actions"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Button key={action.id} variant="outline" className="w-full justify-start">
                    <Icon className="h-4 w-4 mr-2" />
                    <span>{action.title}</span>
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">{language === "ru" ? "Недавние изменения" : "Recent Changes"}</CardTitle>
            <Link href="#" className="text-sm text-blue-600 hover:underline">
              {language === "ru" ? "Просмотреть все" : "View all"}
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentChanges.map((change) => {
                const Icon = change.icon
                return (
                  <div key={change.id} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{change.title}</p>
                      <p className="text-xs text-gray-500">{change.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">{language === "ru" ? "Статистика" : "Statistics"}</CardTitle>
            <Link href="#" className="text-sm text-blue-600 hover:underline">
              {language === "ru" ? "Подробнее" : "More details"}
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statistics.map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{stat.title}</span>
                  <span className="text-lg font-bold">{stat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">{language === "ru" ? "Шаблоны франшизы" : "Franchise Templates"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-0 overflow-hidden">
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BE%D1%82%D0%BA%D1%80%D1%8B%D1%82%D0%B8%D0%B5.jpg-DvDWiOiQHDNtv3epHNXxebyy0B2PlH.jpeg"
                  alt="Retail Store"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold mb-2">{language === "ru" ? "Розничный магазин" : "Retail Store"}</h3>
                <p className="text-sm text-gray-500 mb-3">{language === "ru" ? "10 должностей" : "10 positions"}</p>
                <p className="text-sm text-gray-600 mb-4">
                  {language === "ru"
                    ? "Стандартный формат оптики с торговой зоной, зоной диагностики и мастерской. Оптимален для торговых центров и улиц с высоким трафиком."
                    : "Standard optical format with retail area, diagnostic zone and workshop. Optimal for shopping centers and high-traffic streets."}
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-1">
                    {language === "ru" ? "Структура персонала" : "Organization Structure"}:
                  </h4>
                  <ul className="text-sm list-disc pl-5">
                    <li>{language === "ru" ? "Управляющий" : "Store Manager"}</li>
                    <li>{language === "ru" ? "Оптометрист" : "Optometrist"}</li>
                    <li>{language === "ru" ? "Продавец-консультант" : "Sales Consultant"}</li>
                    <li>{language === "ru" ? "Мастер" : "Craftsman"}</li>
                  </ul>
                </div>
                <Button variant="outline" className="w-full" onClick={() => startNewClubWithTemplate("retail")}>
                  {language === "ru" ? "Использовать шаблон" : "Use Template"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0 overflow-hidden">
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BA%D0%BB%D0%B8%D0%BD%D0%B8%D0%BA%D0%B0-t8VFrQLMhgQmvb6wdWKJgdQmCihm4u.png"
                  alt="Clinic"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold mb-2">{language === "ru" ? "Клиника" : "Clinic"}</h3>
                <p className="text-sm text-gray-500 mb-3">{language === "ru" ? "12 должностей" : "12 positions"}</p>
                <p className="text-sm text-gray-600 mb-4">
                  {language === "ru"
                    ? "Формат с расширенной медицинской частью, диагностическим оборудованием и кабинетами для специалистов. Для медицинских центров и локаций с фокусом на здоровье."
                    : "Format with expanded medical section, diagnostic equipment and specialist offices. For medical centers and health-focused locations."}
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-1">
                    {language === "ru" ? "Структура персонала" : "Organization Structure"}:
                  </h4>
                  <ul className="text-sm list-disc pl-5">
                    <li>{language === "ru" ? "Руководитель клиники" : "Clinic Manager"}</li>
                    <li>{language === "ru" ? "Офтальмолог" : "Ophthalmologist"}</li>
                    <li>{language === "ru" ? "Оптометрист" : "Optometrist"}</li>
                    <li>{language === "ru" ? "Оптик-консультант" : "Optical Consultant"}</li>
                    <li>{language === "ru" ? "Мастер" : "Craftsman"}</li>
                    <li>{language === "ru" ? "Администратор" : "Administrator"}</li>
                  </ul>
                </div>
                <Button variant="outline" className="w-full" onClick={() => startNewClubWithTemplate("clinic")}>
                  {language === "ru" ? "Использовать шаблон" : "Use Template"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0 overflow-hidden">
              <div className="aspect-video bg-gray-100 overflow-hidden">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%94%D0%B0%D1%80%D0%BA%20%D0%BE%D0%BF%D1%82%D0%B8%D0%BA%D0%B0.jpg-DT9hEbzENKolH8V6wb7b2GLjF6SAEk.jpeg"
                  alt="Dark Optics"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold mb-2">{language === "ru" ? "Дарк оптика" : "Dark Optics"}</h3>
                <p className="text-sm text-gray-500 mb-3">{language === "ru" ? "8 должностей" : "8 positions"}</p>
                <p className="text-sm text-gray-600 mb-4">
                  {language === "ru"
                    ? "Формат мастерской, где работают мастера по созданию уникальных оправ ручной работы. Это не место для посещения клиентов, а творческая лаборатория для создания эксклюзивных изделий."
                    : "Workshop format where master craftsmen create unique handmade frames. This is not a place for customers to visit, but a creative laboratory for creating exclusive products."}
                </p>
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-1">
                    {language === "ru" ? "Структура персонала" : "Organization Structure"}:
                  </h4>
                  <ul className="text-sm list-disc pl-5">
                    <li>{language === "ru" ? "Руководитель мастерской" : "Workshop Manager"}</li>
                    <li>{language === "ru" ? "Мастер-изготовитель оправ" : "Frame Craftsman"}</li>
                    <li>{language === "ru" ? "Дизайнер оправ" : "Frame Designer"}</li>
                    <li>{language === "ru" ? "Мастер высшей категории" : "Master Craftsman"}</li>
                    <li>{language === "ru" ? "Технолог" : "Technologist"}</li>
                  </ul>
                </div>
                <Button variant="outline" className="w-full" onClick={() => startNewClubWithTemplate("dark")}>
                  {language === "ru" ? "Использовать шаблон" : "Use Template"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Диалог для просмотра сотрудников на аналогичных должностях */}
      {selectedRole && (
        <Dialog open={!!selectedRole} onOpenChange={(open) => !open && setSelectedRole(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {language === "ru" ? "Сотрудники на должности" : "Employees in position"}:{" "}
                {organizationChart.find((item) => item.id === selectedRole)?.role}
              </DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <div className="space-y-4">
                {/* Основной сотрудник */}
                <Link href={`/team/members/${selectedRole}`}>
                  <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={organizationChart.find((item) => item.id === selectedRole)?.avatar} />
                      <AvatarFallback>
                        {organizationChart.find((item) => item.id === selectedRole)?.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">
                        {organizationChart.find((item) => item.id === selectedRole)?.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {language === "ru" ? "Основной сотрудник" : "Primary employee"}
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Сотрудники на аналогичных должностях */}
                {organizationChart
                  .find((item) => item.id === selectedRole)
                  ?.similarPositions?.map((employee) => (
                    <Link key={employee.id} href={`/team/members/${employee.id}`}>
                      <div className="flex items-center gap-4 p-3 border rounded-md hover:bg-gray-50 transition-colors">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={employee.avatar} />
                          <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{employee.name}</h3>
                          <p className="text-sm text-gray-500">{employee.shift}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Диалог для создания нового клуба */}
      <Dialog open={showNewClubDialog} onOpenChange={setShowNewClubDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {newClubStep === 3 && (language === "ru" ? "Основная информация" : "Basic Information")}
              {newClubStep === 4 && (language === "ru" ? "Контактная информация" : "Contact Details")}
              {newClubStep === 5 && (language === "ru" ? "Сводка" : "Summary")}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Шаг 3: Информация о компании */}
            {newClubStep === 3 && (
              <>
                <div>
                  <Label htmlFor="legalEntity">{language === "ru" ? "Юридическое лицо" : "Legal Entity"}</Label>
                  <Input
                    id="legalEntity"
                    type="text"
                    value={newClubData.legalEntity}
                    onChange={(e) => setNewClubData({ ...newClubData, legalEntity: e.target.value })}
                    placeholder={language === "ru" ? "Например: ООО 'ЛООВ Ритейл'" : "Example: LOOV Retail LLC"}
                  />
                </div>
                <div>
                  <Label htmlFor="companyOwner">{language === "ru" ? "Компания-владелец" : "Company Owner"}</Label>
                  <Input
                    id="companyOwner"
                    type="text"
                    value={newClubData.companyOwner}
                    onChange={(e) => setNewClubData({ ...newClubData, companyOwner: e.target.value })}
                    placeholder={
                      language === "ru" ? "Например: ООО 'Инвестиции в здоровье'" : "Example: Health Investments LLC"
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="manager">{language === "ru" ? "Менеджер клуба" : "Club Manager"}</Label>
                  <Input
                    id="manager"
                    type="text"
                    value={newClubData.manager}
                    onChange={(e) => setNewClubData({ ...newClubData, manager: e.target.value })}
                    placeholder={language === "ru" ? "Например: Иванов Иван" : "Example: John Smith"}
                  />
                </div>
                <div>
                  <Label htmlFor="openingDate">
                    {language === "ru" ? "Планируемая дата открытия" : "Target Opening Date"}
                  </Label>
                  <Input
                    id="openingDate"
                    type="date"
                    value={newClubData.openingDate}
                    onChange={(e) => setNewClubData({ ...newClubData, openingDate: e.target.value })}
                  />
                </div>
              </>
            )}

            {/* Шаг 4: Контактная информация */}
            {newClubStep === 4 && (
              <>
                <div>
                  <Label htmlFor="contactPerson">{language === "ru" ? "Контактное лицо" : "Contact Person"}</Label>
                  <Input
                    id="contactPerson"
                    type="text"
                    value={newClubData.contactPerson}
                    onChange={(e) => setNewClubData({ ...newClubData, contactPerson: e.target.value })}
                    placeholder={language === "ru" ? "Например: Петров Петр" : "Example: Jane Doe"}
                  />
                </div>
                <div>
                  <Label htmlFor="contactPhone">{language === "ru" ? "Контактный телефон" : "Contact Phone"}</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    value={newClubData.contactPhone}
                    onChange={(e) => setNewClubData({ ...newClubData, contactPhone: e.target.value })}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                <div>
                  <Label htmlFor="contactEmail">{language === "ru" ? "Контактный email" : "Contact Email"}</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    value={newClubData.contactEmail}
                    onChange={(e) => setNewClubData({ ...newClubData, contactEmail: e.target.value })}
                    placeholder="example@loov.com"
                  />
                </div>
                <div>
                  <Label htmlFor="description">
                    {language === "ru" ? "Дополнительная информация" : "Additional Information"}
                  </Label>
                  <Textarea
                    id="description"
                    placeholder={
                      language === "ru"
                        ? "Добавьте любую дополнительную информацию о клубе..."
                        : "Add any additional information about the club..."
                    }
                    value={newClubData.description}
                    onChange={(e) => setNewClubData({ ...newClubData, description: e.target.value })}
                  />
                </div>
              </>
            )}

            {/* Шаг 5: Сводка */}
            {newClubStep === 5 && (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold mb-2">{language === "ru" ? "Сводка" : "Summary"}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">{language === "ru" ? "Шаблон" : "Template"}</p>
                      <p className="font-medium">
                        {newClubData.template === "retail"
                          ? language === "ru"
                            ? "Розничный магазин"
                            : "Retail Store"
                          : newClubData.template === "clinic"
                            ? language === "ru"
                              ? "Клиника"
                              : "Clinic"
                            : language === "ru"
                              ? "Дарк оптика"
                              : "Dark Optics"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{language === "ru" ? "Юридическое лицо" : "Legal Entity"}</p>
                      <p className="font-medium">{newClubData.legalEntity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{language === "ru" ? "Менеджер" : "Manager"}</p>
                      <p className="font-medium">{newClubData.manager}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {language === "ru" ? "Планируемая дата открытия" : "Target Opening Date"}
                      </p>
                      <p className="font-medium">{newClubData.openingDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {language === "ru" ? "Контактное лицо" : "Contact Person"}
                      </p>
                      <p className="font-medium">{newClubData.contactPerson}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {language === "ru" ? "Контактный телефон" : "Contact Phone"}
                      </p>
                      <p className="font-medium">{newClubData.contactPhone}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {language === "ru" ? "Шаг" : "Step"} {newClubStep} {language === "ru" ? "из" : "of"} 5
              </div>
              <div className="flex gap-2">
                {newClubStep > 3 && (
                  <Button variant="outline" onClick={() => setNewClubStep(newClubStep - 1)}>
                    {language === "ru" ? "Назад" : "Back"}
                  </Button>
                )}
                {newClubStep < 5 ? (
                  <Button onClick={() => setNewClubStep(newClubStep + 1)}>
                    {language === "ru" ? "Далее" : "Next"}
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      // Aquí iría la lógica para crear el club
                      setShowNewClubDialog(false)
                      router.push("/new-club")
                    }}
                  >
                    {language === "ru" ? "Создать клуб" : "Create Club"}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
