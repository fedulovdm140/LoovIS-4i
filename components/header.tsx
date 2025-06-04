"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Bell, Menu, X, Users, Calendar, BarChart3, Settings, User, LogOut, Plus } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import LanguageSwitcher from "@/components/language-switcher"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
  { href: "/new-club", icon: Plus, label: "new_club" },
  { href: "/calendar", icon: Calendar, label: "calendar" },
  { href: "/analytics", icon: BarChart3, label: "analytics" },
  { href: "/team", icon: Users, label: "team" },
  { href: "/settings", icon: Settings, label: "settings" },
]

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()

  // Мокап уведомлений
  const notifications = [
    {
      id: 1,
      title: "Новая задача назначена",
      message: "Вам назначена задача 'Подготовка презентации'",
      time: "5 мин назад",
      unread: true,
    },
    {
      id: 2,
      title: "Встреча через 30 минут",
      message: "Team Review Meeting в 10:00",
      time: "25 мин назад",
      unread: true,
    },
    {
      id: 3,
      title: "Документ обновлен",
      message: "Обновлен план проекта LOOV 1",
      time: "1 час назад",
      unread: false,
    },
  ]

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <>
      <header className="border-b bg-white sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-3 min-h-[64px]">
          {/* Мобильное меню - показывается только на мобильных */}
          <div className="lg:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="p-3 -ml-3 min-w-[48px] min-h-[48px]"
                  aria-label={t("open_menu")}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0">
                <div className="flex flex-col h-full">
                  {/* Header меню */}
                  <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-indigo-600">
                    <Link
                      href="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 group cursor-pointer transition-opacity hover:opacity-80"
                    >
                      <Avatar className="h-12 w-12 border-2 border-white/20">
                        <AvatarImage src="/avatars/sarah-anderson.jpg" />
                        <AvatarFallback className="bg-white/20 text-white">SA</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-white group-hover:underline">Sarah Anderson</p>
                        <p className="text-sm text-blue-100">{t("operations_manager")}</p>
                      </div>
                      <User className="h-4 w-4 text-blue-100 ml-auto" />
                    </Link>
                  </div>

                  {/* Навигация */}
                  <nav className="flex-1 py-4">
                    <div className="space-y-1 px-3">
                      {navigationItems.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                              isActive
                                ? "bg-blue-50 text-blue-600 border border-blue-200"
                                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            <Icon className="h-5 w-5 flex-shrink-0" />
                            <span>{t(item.label)}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Поиск */}
          <div className="flex items-center flex-1">
            <div className="hidden lg:block flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder={t("search_placeholder")}
                  className="pl-10 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Действия */}
          <div className="flex items-center space-x-2">
            {/* Поиск на мобильных */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="lg"
                className="p-3 min-w-[48px] min-h-[48px]"
                onClick={() => setIsSearchOpen(true)}
                aria-label={t("search")}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>

            {/* Переключатель языка */}
            <LanguageSwitcher />

            {/* Уведомления */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="p-3 min-w-[48px] min-h-[48px] relative"
                  aria-label={t("notifications")}
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 border-2 border-white flex items-center justify-center">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="font-semibold">
                  {t("notifications")} ({unreadCount} {t("new")})
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-4 cursor-pointer">
                      <div className="flex items-start justify-between w-full">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm">{notification.title}</p>
                            {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center text-blue-600 cursor-pointer">
                  {t("view_all_notifications")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Профиль пользователя - скрыт на мобильных */}
            <div className="hidden lg:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-1">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/avatars/sarah-anderson.jpg" />
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">Sarah Anderson</p>
                      <p className="text-xs text-gray-500">s.anderson@loovis.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>{t("profile")}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>{t("settings")}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("logout")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Полноэкранный поиск на мобильных */}
        {isSearchOpen && (
          <div className="absolute inset-x-0 top-0 bg-white border-b z-50 lg:hidden">
            <div className="flex items-center px-4 py-3 min-h-[64px]">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder={t("search_clubs_tasks")}
                  className="pl-10 pr-4 py-3 text-base border-0 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500"
                  autoFocus
                  autoComplete="off"
                />
              </div>
              <Button
                variant="ghost"
                size="lg"
                className="ml-2 p-3 min-w-[48px] min-h-[48px]"
                onClick={() => setIsSearchOpen(false)}
                aria-label={t("close")}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
