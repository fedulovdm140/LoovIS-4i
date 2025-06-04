"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, Calendar, ChevronRight } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { MobileDashboard } from "@/components/mobile-optimized/MobileDashboard"
import { useMobile } from "@/hooks/use-mobile"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, ExternalLink } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export default function Dashboard() {
  const { t } = useLanguage()
  const isMobile = useMobile()
  const [period, setPeriod] = useState("week")
  const [location, setLocation] = useState("all")
  const [selectedClub, setSelectedClub] = useState("LOOV 1")
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  // Метрики для дашборда
  const metricsData = {
    "LOOV 1": {
      day: [
        {
          title: t("total_revenue"),
          value: "$2,845",
          change: "+5.1% " + t("from_last_day"),
          trend: "up",
        },
        {
          title: t("sales_count"),
          value: "85",
          change: "+12 " + t("from_last_day"),
          trend: "up",
        },
        {
          title: t("vision_tests"),
          value: "165",
          change: "+15 " + t("from_last_day"),
          trend: "up",
        },
        {
          title: t("conversion_rate"),
          value: "48%",
          change: "+8% " + t("improvement"),
          trend: "up",
        },
      ],
      week: [
        {
          title: t("total_revenue"),
          value: "$19,876",
          change: "+6.8% " + t("from_last_week"),
          trend: "up",
        },
        {
          title: t("sales_count"),
          value: "580",
          change: "+95 " + t("from_last_week"),
          trend: "up",
        },
        {
          title: t("vision_tests"),
          value: "1,150",
          change: "+120 " + t("from_last_week"),
          trend: "up",
        },
        {
          title: t("conversion_rate"),
          value: "49%",
          change: "+10% " + t("improvement"),
          trend: "up",
        },
      ],
      month: [
        {
          title: t("total_revenue"),
          value: "$84,254",
          change: "+8.2% " + t("from_last_month"),
          trend: "up",
        },
        {
          title: t("sales_count"),
          value: "2,500",
          change: "+400 " + t("from_last_month"),
          trend: "up",
        },
        {
          title: t("vision_tests"),
          value: "5,000",
          change: "+500 " + t("from_last_month"),
          trend: "up",
        },
        {
          title: t("conversion_rate"),
          value: "50%",
          change: "+12% " + t("improvement"),
          trend: "up",
        },
      ],
    },
    "LOOV 2": {
      day: [
        {
          title: t("total_revenue"),
          value: "$3,120",
          change: "+7.2% " + t("from_last_day"),
          trend: "up",
        },
        {
          title: t("sales_count"),
          value: "92",
          change: "+15 " + t("from_last_day"),
          trend: "up",
        },
        {
          title: t("vision_tests"),
          value: "180",
          change: "+18 " + t("from_last_day"),
          trend: "up",
        },
        {
          title: t("conversion_rate"),
          value: "51%",
          change: "+9% " + t("improvement"),
          trend: "up",
        },
      ],
      week: [
        {
          title: t("total_revenue"),
          value: "$21,540",
          change: "+8.3% " + t("from_last_week"),
          trend: "up",
        },
        {
          title: t("sales_count"),
          value: "640",
          change: "+110 " + t("from_last_week"),
          trend: "up",
        },
        {
          title: t("vision_tests"),
          value: "1,280",
          change: "+150 " + t("from_last_week"),
          trend: "up",
        },
        {
          title: t("conversion_rate"),
          value: "52%",
          change: "+11% " + t("improvement"),
          trend: "up",
        },
      ],
      month: [
        {
          title: t("total_revenue"),
          value: "$92,150",
          change: "+9.5% " + t("from_last_month"),
          trend: "up",
        },
        {
          title: t("sales_count"),
          value: "2,750",
          change: "+450 " + t("from_last_month"),
          trend: "up",
        },
        {
          title: t("vision_tests"),
          value: "5,500",
          change: "+550 " + t("from_last_month"),
          trend: "up",
        },
        {
          title: t("conversion_rate"),
          value: "53%",
          change: "+14% " + t("improvement"),
          trend: "up",
        },
      ],
    },
    "LOOV 3": {
      day: [
        {
          title: t("total_revenue"),
          value: "$2,650",
          change: "+4.5% " + t("from_last_day"),
          trend: "up",
        },
        {
          title: t("sales_count"),
          value: "78",
          change: "+10 " + t("from_last_day"),
          trend: "up",
        },
        {
          title: t("vision_tests"),
          value: "155",
          change: "+12 " + t("from_last_day"),
          trend: "up",
        },
        {
          title: t("conversion_rate"),
          value: "47%",
          change: "+7% " + t("improvement"),
          trend: "up",
        },
      ],
      week: [
        {
          title: t("total_revenue"),
          value: "$18,420",
          change: "+5.9% " + t("from_last_week"),
          trend: "up",
        },
        {
          title: t("sales_count"),
          value: "540",
          change: "+85 " + t("from_last_week"),
          trend: "up",
        },
        {
          title: t("vision_tests"),
          value: "1,080",
          change: "+105 " + t("from_last_week"),
          trend: "up",
        },
        {
          title: t("conversion_rate"),
          value: "48%",
          change: "+9% " + t("improvement"),
          trend: "up",
        },
      ],
      month: [
        {
          title: t("total_revenue"),
          value: "$78,650",
          change: "+7.8% " + t("from_last_month"),
          trend: "up",
        },
        {
          title: t("sales_count"),
          value: "2,350",
          change: "+380 " + t("from_last_month"),
          trend: "up",
        },
        {
          title: t("vision_tests"),
          value: "4,700",
          change: "+470 " + t("from_last_month"),
          trend: "up",
        },
        {
          title: t("conversion_rate"),
          value: "49%",
          change: "+11% " + t("improvement"),
          trend: "up",
        },
      ],
    },
  }

  // Получаем текущие метрики в зависимости от выбранного клуба и периода
  const metrics = metricsData[selectedClub][selectedPeriod]

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

  const teamMembers = [
    {
      id: "1",
      name: "John Anderson",
      role: "Senior Manager",
      avatar: "/avatars/alex-johnson.jpg",
      metric: "Daily Revenue",
      value: "$6,130",
      change: "+18.5%",
      trend: "up",
    },
    {
      id: "2",
      name: "Sarah Miller",
      role: "Sales Manager",
      avatar: "/avatars/sarah-miller.jpg",
      metric: "Sales Today",
      value: "$3,240",
      change: "+12.5%",
      trend: "up",
    },
    {
      id: "3",
      name: "Mike Chen",
      role: "Sales Manager",
      avatar: "/avatars/mike-chen.jpg",
      metric: "Sales Today",
      value: "$2,890",
      change: "-3.1%",
      trend: "down",
    },
    {
      id: "4",
      name: "Dr. Emma White",
      role: "Ophthalmologist",
      avatar: "/avatars/emma-white.jpg",
      metric: "Examinations",
      value: "18",
      change: "+2",
      trend: "up",
    },
  ]

  const activities = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "/avatars/sarah-miller.jpg",
      action: "completed the design review",
      time: "2 hours ago",
    },
    {
      id: 2,
      user: "Michael Chen",
      avatar: "/avatars/mike-chen.jpg",
      action: "added new comments to Project X",
      time: "4 hours ago",
    },
    {
      id: 3,
      user: "Emily Davis",
      avatar: "/avatars/emily-davis.jpg",
      action: "updated the project timeline",
      time: "6 hours ago",
    },
  ]

  const [taskList, setTaskList] = useState(tasks)

  const toggleTaskCompletion = (taskId: number) => {
    setTaskList(taskList.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  // Если мобильное устройство, отображаем мобильную версию
  if (isMobile) {
    return <MobileDashboard />
  }

  // Десктопная версия
  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">{t("dashboard")}</h1>
          <p className="text-gray-600">{t("welcome_back")}</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{t("calendar")}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">{metric.title}</p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
                <div className="flex items-center mt-2 text-sm">
                  {metric.trend === "up" ? (
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {metric.change} {t("compared_to_last_week")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{t("recent_tasks")}</h2>
              <Link href="/tasks" className="text-sm text-blue-600 flex items-center">
                {t("view_all")} <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox id={`task-${task.id}`} className="mr-3" />
                    <label htmlFor={`task-${task.id}`} className="text-sm">
                      {task.title}
                    </label>
                  </div>
                  <span className="text-sm text-gray-500">{task.dueDate}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{t("upcoming_events")}</h2>
              <Link href="/calendar" className="text-sm text-blue-600 flex items-center">
                {t("view_calendar")} <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="flex items-start">
                  <div className="bg-blue-100 text-blue-800 rounded p-2 text-center mr-4 w-14">
                    <div className="text-xs font-medium">{event.date.month}</div>
                    <div className="text-xl font-bold">{event.date.day}</div>
                  </div>
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            <h2 className="text-lg font-medium">{t("current_shift")}</h2>
          </div>
          <Link href="/team" className="text-sm text-blue-600 hover:underline">
            {t("view_all_team")}
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="relative">
              <Dialog>
                <DialogTrigger asChild>
                  <div className="bg-white border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow">
                    <div className="flex flex-col items-center text-center">
                      <Avatar className="h-16 w-16 mb-3">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-gray-500 mb-3">{member.role}</p>
                      <div className="w-full pt-3 border-t">
                        <p className="text-xs text-gray-500">{member.metric}</p>
                        <p className="text-lg font-bold">{member.value}</p>
                        <p className={`text-sm ${member.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                          {member.change}
                        </p>
                      </div>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("employee_profile")}</DialogTitle>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="flex items-center mb-6">
                      <Avatar className="h-16 w-16 mr-4">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        <p className="text-gray-500">{member.role}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">{t("contact_info")}</h4>
                        <p className="text-sm">
                          {t("email")}: {member.name.toLowerCase().replace(" ", ".")}@loovis.com
                        </p>
                        <p className="text-sm">
                          {t("phone")}: +1 (555) 123-{1000 + Number.parseInt(member.id)}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium">{t("performance_metrics")}</h4>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div className="bg-gray-50 p-3 rounded-md">
                            <p className="text-xs text-gray-500">{member.metric}</p>
                            <p className="text-lg font-bold">{member.value}</p>
                            <p className={`text-sm ${member.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                              {member.change}
                            </p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-md">
                            <p className="text-xs text-gray-500">{t("customer_rating")}</p>
                            <p className="text-lg font-bold">4.8/5.0</p>
                            <p className="text-sm text-green-500">+0.2 {t("per_month")}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium">{t("work_schedule")}</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                          <p className="text-sm">{t("monday")}: 9:00 - 18:00</p>
                          <p className="text-sm">{t("tuesday")}: 9:00 - 18:00</p>
                          <p className="text-sm">{t("wednesday")}: 9:00 - 18:00</p>
                          <p className="text-sm">{t("thursday")}: 9:00 - 18:00</p>
                          <p className="text-sm">{t("friday")}: 9:00 - 18:00</p>
                          <p className="text-sm">{t("saturday")}: 10:00 - 16:00</p>
                          <p className="text-sm">
                            {t("sunday")}: {t("day_off")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">{t("send_message")}</Button>
                    <Button asChild>
                      <Link href={`/team/members/${member.id}`}>{t("full_profile")}</Link>
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Link
                href={`/team/members/${member.id}`}
                className="absolute top-2 right-2 bg-blue-100 text-blue-600 p-1 rounded-full hover:bg-blue-200"
                title={t("open_profile")}
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">{t("team_activity")}</h2>
          <Link href="/activity" className="text-sm text-blue-600 hover:underline">
            {t("view_all")}
          </Link>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-start p-4">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={activity.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
