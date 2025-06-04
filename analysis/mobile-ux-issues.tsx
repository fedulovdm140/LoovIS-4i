"use client"

// АНАЛИЗ ПРОБЛЕМ МОБИЛЬНОГО UX/UI

/**
 * 1. НАВИГАЦИЯ И HEADER
 * ❌ Проблемы:
 */

import { Menu, Bell, Mail, MapPin } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Текущий header - проблемы на мобильных
const ProblematicHeader = () => {
  return (
    <header className="border-b bg-white">
      {/* ❌ ПРОБЛЕМА: Слишком много элементов в одной строке */}
      <div className="flex items-center justify-between px-4 py-3">
        {/* ❌ Гамбургер меню слишком маленькое (44px минимум для touch) */}
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" /> {/* ❌ 20px слишком мало */}
        </Button>

        {/* ❌ Поиск занимает слишком много места на мобильном */}
        <div className="flex-1 max-w-md mx-4">
          <Input type="search" placeholder="Поиск..." className="w-full pl-9" />
        </div>

        {/* ❌ Слишком много иконок в ряд, сложно попасть пальцем */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Mail className="h-5 w-5" />
          </Button>
          <Avatar className="h-8 w-8">
            {" "}
            {/* ❌ Слишком маленький */}
            <AvatarImage src="/avatar.jpg" />
          </Avatar>
        </div>
      </div>
    </header>
  )
}

/**
 * 2. КАРТОЧКИ КЛУБОВ
 * ❌ Проблемы:
 */

const ProblematicClubCard = () => {
  return (
    <Card className="hover:shadow-md transition-shadow overflow-hidden">
      {/* ❌ Слишком много информации в header карточки */}
      <div className="bg-blue-50 p-3 border-b">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">LOOV Арбат</h3> {/* ❌ Может обрезаться */}
          <Badge>15 дней осталось</Badge> {/* ❌ Может наезжать на заголовок */}
        </div>
        {/* ❌ Адрес может быть слишком длинным */}
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span>ул. Арбат, 24, Москва, Центральный район</span> {/* ❌ Переполнение */}
        </div>
      </div>

      <CardContent className="p-4">
        {/* ❌ Прогресс бар слишком тонкий для мобильного */}
        <Progress value={75} className="h-2" />

        {/* ❌ Слишком плотная компоновка информации */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span>Текущий этап</span>
            <span>Этап 3: Подготовка к открытию</span> {/* ❌ Может не поместиться */}
          </div>
        </div>

        {/* ❌ Кнопка слишком маленькая */}
        <Button variant="outline" size="sm">
          Подробнее
        </Button>
      </CardContent>
    </Card>
  )
}

/**
 * 3. ФОРМЫ И МОДАЛЬНЫЕ ОКНА
 * ❌ Проблемы:
 */

const ProblematicForm = () => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      {/* ❌ Модальное окно может быть слишком большим для мобильного */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-auto">
        {/* ❌ Индикатор шагов не адаптирован для мобильного */}
        <div className="flex items-center mt-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center">
              <div className="w-8 h-8 rounded-full">
                {" "}
                {/* ❌ Слишком маленькие точки */}
                {index + 1}
              </div>
              {index < 4 && <div className="w-12 h-1 bg-gray-200"></div>} {/* ❌ Может не поместиться */}
            </div>
          ))}
        </div>

        {/* ❌ Поля формы не оптимизированы для мобильного ввода */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ❌ На мобильном лучше одна колонка */}
          <input type="text" className="w-full p-2 border rounded-md" />
          <input type="text" className="w-full p-2 border rounded-md" />
        </div>

        {/* ❌ Кнопки навигации могут быть неудобными */}
        <div className="flex justify-between">
          <Button variant="outline">Назад</Button> {/* ❌ Слишком близко к краю */}
          <Button>Далее</Button>
        </div>
      </div>
    </div>
  )
}

/**
 * 4. ТАБЫ И НАВИГАЦИЯ
 * ❌ Проблемы:
 */

const ProblematicTabs = () => {
  return (
    <Tabs defaultValue="current-clubs">
      {/* ❌ Табы могут не поместиться на узком экране */}
      <TabsList className="mb-4 bg-gray-100">
        <TabsTrigger value="current-clubs">Текущие клубы</TabsTrigger>
        <TabsTrigger value="process">Процесс открытия клуба</TabsTrigger> {/* ❌ Длинный текст */}
        <TabsTrigger value="roles">Роли проекта</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
