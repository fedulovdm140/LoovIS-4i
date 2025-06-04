"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"

export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("ru")

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Настройки</h1>
        <p className="text-gray-600">Управление настройками аккаунта и системы</p>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-4 max-w-md mb-6">
          <TabsTrigger value="account">Аккаунт</TabsTrigger>
          <TabsTrigger value="notifications">Уведомления</TabsTrigger>
          <TabsTrigger value="appearance">Внешний вид</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Профиль</CardTitle>
                <CardDescription>Управление информацией вашего профиля</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/avatars/john-smith.jpg" />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm">
                      Изменить фото
                    </Button>
                  </div>
                  <div className="flex-1 grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">Имя</Label>
                        <Input id="first-name" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Фамилия</Label>
                        <Input id="last-name" defaultValue="Smith" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="john.smith@loovis.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="job-title">Должность</Label>
                      <Input id="job-title" defaultValue="Региональный менеджер" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Настройки аккаунта</CardTitle>
                <CardDescription>Обновите настройки вашего аккаунта</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Язык</Label>
                  <select
                    id="language"
                    className="w-full border rounded-md px-3 py-1.5 bg-white"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                    <option value="de">Deutsch</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Часовой пояс</Label>
                  <select id="timezone" className="w-full border rounded-md px-3 py-1.5 bg-white">
                    <option>Москва (GMT+3)</option>
                    <option>Лондон (GMT+0)</option>
                    <option>Нью-Йорк (GMT-5)</option>
                    <option>Токио (GMT+9)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Темный режим</Label>
                    <p className="text-sm text-gray-500">Включить темный режим интерфейса</p>
                  </div>
                  <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Настройки уведомлений</CardTitle>
              <CardDescription>Настройте способы получения уведомлений</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Уведомления</Label>
                  <p className="text-sm text-gray-500">Включить все уведомления</p>
                </div>
                <Switch id="notifications" checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email уведомления</Label>
                  <p className="text-sm text-gray-500">Получать уведомления по email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                  disabled={!notificationsEnabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sms-notifications">SMS уведомления</Label>
                  <p className="text-sm text-gray-500">Получать уведомления по SMS</p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={smsNotifications}
                  onCheckedChange={setSmsNotifications}
                  disabled={!notificationsEnabled}
                />
              </div>

              <div className="pt-4">
                <h3 className="font-medium mb-3">Типы уведомлений</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="task-notifications">Задачи и проекты</Label>
                    <Switch id="task-notifications" defaultChecked disabled={!notificationsEnabled} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="meeting-notifications">Встречи и события</Label>
                    <Switch id="meeting-notifications" defaultChecked disabled={!notificationsEnabled} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="message-notifications">Сообщения</Label>
                    <Switch id="message-notifications" defaultChecked disabled={!notificationsEnabled} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-notifications">Системные уведомления</Label>
                    <Switch id="system-notifications" defaultChecked disabled={!notificationsEnabled} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Внешний вид</CardTitle>
              <CardDescription>Настройте внешний вид интерфейса</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Тема</Label>
                <select id="theme" className="w-full border rounded-md px-3 py-1.5 bg-white">
                  <option>Системная (по умолчанию)</option>
                  <option>Светлая</option>
                  <option>Темная</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-size">Размер шрифта</Label>
                <select id="font-size" className="w-full border rounded-md px-3 py-1.5 bg-white">
                  <option>Маленький</option>
                  <option>Средний (по умолчанию)</option>
                  <option>Большой</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="color-scheme">Цветовая схема</Label>
                <div className="grid grid-cols-5 gap-2 pt-2">
                  <div className="h-10 w-10 rounded-full bg-blue-600 cursor-pointer ring-2 ring-offset-2 ring-blue-600"></div>
                  <div className="h-10 w-10 rounded-full bg-purple-600 cursor-pointer"></div>
                  <div className="h-10 w-10 rounded-full bg-green-600 cursor-pointer"></div>
                  <div className="h-10 w-10 rounded-full bg-orange-600 cursor-pointer"></div>
                  <div className="h-10 w-10 rounded-full bg-red-600 cursor-pointer"></div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compact-mode">Компактный режим</Label>
                  <p className="text-sm text-gray-500">Уменьшить отступы и размеры элементов</p>
                </div>
                <Switch id="compact-mode" />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="animations">Анимации</Label>
                  <p className="text-sm text-gray-500">Включить анимации интерфейса</p>
                </div>
                <Switch id="animations" defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Изменить пароль</CardTitle>
                <CardDescription>Обновите ваш пароль для повышения безопасности</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Текущий пароль</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Новый пароль</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                  <Input id="confirm-password" type="password" />
                </div>
                <Button>Обновить пароль</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Двухфакторная аутентификация</CardTitle>
                <CardDescription>Добавьте дополнительный уровень защиты для вашего аккаунта</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="2fa">Двухфакторная аутентификация</Label>
                    <p className="text-sm text-gray-500">Защитите ваш аккаунт с помощью 2FA</p>
                  </div>
                  <Switch id="2fa" />
                </div>
                <Button variant="outline">Настроить 2FA</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Сеансы</CardTitle>
                <CardDescription>Управление активными сеансами и устройствами</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 rounded-full">
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
                          className="h-5 w-5"
                        >
                          <rect width="16" height="20" x="4" y="2" rx="2" ry="2"></rect>
                          <path d="M9 22v-4h6v4"></path>
                          <path d="M8 6h.01"></path>
                          <path d="M16 6h.01"></path>
                          <path d="M12 6h.01"></path>
                          <path d="M12 10h.01"></path>
                          <path d="M12 14h.01"></path>
                          <path d="M16 10h.01"></path>
                          <path d="M16 14h.01"></path>
                          <path d="M8 10h.01"></path>
                          <path d="M8 14h.01"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Текущее устройство</p>
                        <p className="text-sm text-gray-500">Windows 10 • Chrome • Москва, Россия</p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Активно</span>
                  </div>

                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 rounded-full">
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
                          className="h-5 w-5"
                        >
                          <path d="M10.3 21H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-2.3"></path>
                          <path d="M12 18h.01"></path>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">iPhone 13</p>
                        <p className="text-sm text-gray-500">iOS 16 • Safari • Москва, Россия</p>
                      </div>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">3 дня назад</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-gray-100 rounded-full">
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
                          className="h-5 w-5"
                        >
                          <rect width="20" height="14" x="2" y="3" rx="2"></rect>
                          <line x1="8" x2="16" y1="21" y2="21"></line>
                          <line x1="12" x2="12" y1="17" y2="21"></line>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">MacBook Pro</p>
                        <p className="text-sm text-gray-500">macOS • Firefox • Санкт-Петербург, Россия</p>
                      </div>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">1 неделю назад</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Завершить все сеансы
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Удаление аккаунта</CardTitle>
                <CardDescription>Удаление вашего аккаунта приведет к потере всех данных</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive">Удалить аккаунт</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
