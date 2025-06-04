"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState("Март")
  const [currentYear, setCurrentYear] = useState("2025")
  const [currentView, setCurrentView] = useState("month")

  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ]
  const years = ["2023", "2024", "2025", "2026"]

  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]

  const events = [
    {
      id: 1,
      date: "2025-03-15",
      title: "Team Review Meeting",
      time: "10:00 - 11:30",
      type: "meeting",
      participants: 7,
    },
    {
      id: 2,
      date: "2025-03-16",
      title: "Client Presentation",
      time: "14:00 - 15:30",
      type: "presentation",
      participants: 4,
    },
    { id: 3, date: "2025-03-18", title: "Product Training", time: "09:00 - 12:00", type: "training", participants: 12 },
    { id: 4, date: "2025-03-20", title: "Marketing Strategy", time: "13:00 - 14:30", type: "meeting", participants: 5 },
    { id: 5, date: "2025-03-22", title: "Team Building", time: "15:00 - 18:00", type: "event", participants: 20 },
    { id: 6, date: "2025-03-25", title: "Quarterly Review", time: "11:00 - 13:00", type: "meeting", participants: 8 },
    { id: 7, date: "2025-03-28", title: "New Product Launch", time: "10:00 - 12:00", type: "event", participants: 15 },
  ]

  // Генерация календарной сетки для текущего месяца
  const generateCalendarDays = () => {
    // В реальном приложении здесь был бы код для генерации дней месяца
    // с учетом текущего месяца и года

    // Для демонстрации создадим сетку для марта 2025
    const totalDays = 31
    const firstDayOffset = 5 // Предположим, что 1 марта 2025 - суббота (смещение 5)

    const calendarDays = []

    // Добавляем пустые ячейки для дней предыдущего месяца
    for (let i = 0; i < firstDayOffset; i++) {
      calendarDays.push({ day: null, events: [] })
    }

    // Добавляем дни текущего месяца
    for (let day = 1; day <= totalDays; day++) {
      const date = `2025-03-${day.toString().padStart(2, "0")}`
      const dayEvents = events.filter((event) => event.date === date)
      calendarDays.push({ day, events: dayEvents })
    }

    return calendarDays
  }

  const calendarDays = generateCalendarDays()

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800"
      case "presentation":
        return "bg-purple-100 text-purple-800"
      case "training":
        return "bg-green-100 text-green-800"
      case "event":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Календарь</h1>
          <p className="text-gray-600">Управление встречами и событиями</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Новое событие</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Создать новое событие</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="event-title" className="text-right">
                    Название
                  </label>
                  <Input id="event-title" className="col-span-3" placeholder="Введите название события" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="event-date" className="text-right">
                    Дата
                  </label>
                  <Input id="event-date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="event-time" className="text-right">
                    Время
                  </label>
                  <div className="col-span-3 flex gap-2">
                    <Input id="event-time-start" type="time" />
                    <span className="flex items-center">-</span>
                    <Input id="event-time-end" type="time" />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="event-type" className="text-right">
                    Тип
                  </label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Выберите тип события" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="meeting">Встреча</SelectItem>
                      <SelectItem value="presentation">Презентация</SelectItem>
                      <SelectItem value="training">Тренинг</SelectItem>
                      <SelectItem value="event">Мероприятие</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="event-description" className="text-right">
                    Описание
                  </label>
                  <Textarea id="event-description" className="col-span-3" placeholder="Введите описание события" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="event-participants" className="text-right">
                    Участники
                  </label>
                  <div className="col-span-3">
                    <div className="flex -space-x-2 mb-2">
                      <Avatar className="h-8 w-8 border-2 border-white">
                        <AvatarImage src="/avatars/john-smith.jpg" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-8 w-8 border-2 border-white">
                        <AvatarImage src="/avatars/sarah-miller.jpg" />
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                      <Avatar className="h-8 w-8 border-2 border-white">
                        <AvatarImage src="/avatars/mike-chen.jpg" />
                        <AvatarFallback>MC</AvatarFallback>
                      </Avatar>
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-600 text-xs font-medium border-2 border-white">
                        +5
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Добавить участников
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Отмена</Button>
                <Button>Создать</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Select value={currentMonth} onValueChange={setCurrentMonth}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Месяц" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={currentYear} onValueChange={setCurrentYear}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Год" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2 ml-auto">
          <Button variant={currentView === "month" ? "default" : "outline"} onClick={() => setCurrentView("month")}>
            Месяц
          </Button>
          <Button variant={currentView === "week" ? "default" : "outline"} onClick={() => setCurrentView("week")}>
            Неделя
          </Button>
          <Button variant={currentView === "day" ? "default" : "outline"} onClick={() => setCurrentView("day")}>
            День
          </Button>
        </div>
      </div>

      {currentView === "month" ? (
        <Card>
          <CardContent className="p-0">
            <div className="grid grid-cols-7 border-b">
              {days.map((day) => (
                <div key={day} className="p-3 text-center font-medium text-sm">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 auto-rows-fr">
              {calendarDays.map((calendarDay, index) => (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border-b border-r ${calendarDay.day ? "bg-white" : "bg-gray-50"} ${
                    calendarDay.day === 15 ? "ring-2 ring-blue-500 ring-inset" : ""
                  }`}
                >
                  {calendarDay.day && (
                    <>
                      <div className="text-sm font-medium mb-1">{calendarDay.day}</div>
                      <div className="space-y-1">
                        {calendarDay.events.map((event) => (
                          <Dialog key={event.id}>
                            <DialogTrigger asChild>
                              <div className={`text-xs p-1 rounded cursor-pointer ${getEventTypeColor(event.type)}`}>
                                <div className="font-medium truncate">{event.title}</div>
                                <div>{event.time}</div>
                              </div>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{event.title}</DialogTitle>
                              </DialogHeader>
                              <div className="py-4">
                                <div className="flex items-center mb-4">
                                  <div
                                    className={`w-3 h-3 rounded-full mr-2 ${
                                      event.type === "meeting"
                                        ? "bg-blue-500"
                                        : event.type === "presentation"
                                          ? "bg-purple-500"
                                          : event.type === "training"
                                            ? "bg-green-500"
                                            : "bg-orange-500"
                                    }`}
                                  ></div>
                                  <span className="text-sm font-medium capitalize">{event.type}</span>
                                </div>
                                <div className="space-y-3">
                                  <div>
                                    <h4 className="font-medium">Дата и время</h4>
                                    <p className="text-sm text-gray-600">
                                      {calendarDay.day} марта 2025, {event.time}
                                    </p>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Участники ({event.participants})</h4>
                                    <div className="flex mt-2">
                                      <Avatar className="h-8 w-8 border-2 border-white">
                                        <AvatarImage src="/avatars/john-smith.jpg" />
                                        <AvatarFallback>JS</AvatarFallback>
                                      </Avatar>
                                      <Avatar className="h-8 w-8 border-2 border-white -ml-2">
                                        <AvatarImage src="/avatars/sarah-miller.jpg" />
                                        <AvatarFallback>SM</AvatarFallback>
                                      </Avatar>
                                      <Avatar className="h-8 w-8 border-2 border-white -ml-2">
                                        <AvatarImage src="/avatars/mike-chen.jpg" />
                                        <AvatarFallback>MC</AvatarFallback>
                                      </Avatar>
                                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-600 text-xs font-medium border-2 border-white -ml-2">
                                        +{event.participants - 3}
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Описание</h4>
                                    <p className="text-sm text-gray-600">
                                      {event.type === "meeting"
                                        ? "Обсуждение текущих проектов и планирование следующих шагов."
                                        : event.type === "presentation"
                                          ? "Презентация новых продуктов и услуг для клиентов."
                                          : event.type === "training"
                                            ? "Обучение сотрудников новым методикам и технологиям."
                                            : "Корпоративное мероприятие для всей команды."}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-end gap-2">
                                <Button variant="outline">Редактировать</Button>
                                <Button>Присоединиться</Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : currentView === "week" ? (
        <Card>
          <CardHeader>
            <CardTitle>Просмотр по неделям</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[600px] relative">
              <Image src="/images/calendar-view.png" alt="Weekly Calendar View" fill className="object-contain" />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Просмотр по дням</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[600px] flex items-center justify-center">
              <p className="text-gray-500">Выберите дату для просмотра детального расписания</p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Предстоящие события</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events.slice(0, 3).map((event) => (
                <div key={event.id} className="flex items-start space-x-4">
                  <div className="flex flex-col items-center justify-center bg-blue-100 text-blue-800 rounded p-2 min-w-[50px]">
                    <span className="text-xs font-medium">МАР</span>
                    <span className="text-lg font-bold">{event.date.split("-")[2]}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{event.title}</h4>
                    <p className="text-xs text-gray-500">{event.time}</p>
                    <div className="flex items-center mt-1">
                      <div
                        className={`w-2 h-2 rounded-full mr-1 ${
                          event.type === "meeting"
                            ? "bg-blue-500"
                            : event.type === "presentation"
                              ? "bg-purple-500"
                              : event.type === "training"
                                ? "bg-green-500"
                                : "bg-orange-500"
                        }`}
                      ></div>
                      <span className="text-xs text-gray-500 capitalize">{event.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Мои встречи</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events
                .filter((e) => e.type === "meeting")
                .slice(0, 3)
                .map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <h4 className="text-sm font-medium">{event.title}</h4>
                      <p className="text-xs text-gray-500">
                        {event.date.split("-")[2]} марта, {event.time}
                      </p>
                    </div>
                    <div className="flex -space-x-2">
                      {Array.from({ length: Math.min(3, event.participants) }).map((_, idx) => (
                        <Avatar key={idx} className="h-6 w-6 border-2 border-white">
                          <AvatarImage
                            src={`/avatars/${idx === 0 ? "john-smith" : idx === 1 ? "sarah-miller" : "mike-chen"}.jpg`}
                          />
                          <AvatarFallback>{idx === 0 ? "JS" : idx === 1 ? "SM" : "MC"}</AvatarFallback>
                        </Avatar>
                      ))}
                      {event.participants > 3 && (
                        <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-600 text-xs font-medium border-2 border-white">
                          +{event.participants - 3}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ресурсы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-2"
                >
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                  <line x1="16" x2="16" y1="2" y2="6"></line>
                  <line x1="8" x2="8" y1="2" y2="6"></line>
                  <line x1="3" x2="21" y1="10" y2="10"></line>
                </svg>
                Забронировать конференц-зал
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-2"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                Пригласить внешних участников
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-2"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
                Создать отчет о встречах
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 mr-2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" x2="12" y1="3" y2="15"></line>
                </svg>
                Экспортировать календарь
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
