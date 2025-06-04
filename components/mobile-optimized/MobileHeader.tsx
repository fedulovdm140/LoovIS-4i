"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Menu, Search, Bell, X, Calendar, BarChart3, Settings, HelpCircle, User, PlusCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import { usePathname } from "next/navigation"

// Обновленный список навигации без дублирующихся пунктов
const navigationItems = [
  { href: "/new-club", icon: PlusCircle, label: "new_club" },
  { href: "/calendar", icon: Calendar, label: "calendar" },
  { href: "/analytics", icon: BarChart3, label: "analytics" },
  { href: "/settings", icon: Settings, label: "settings" },
]

export function MobileHeader() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const { t } = useLanguage()
  const pathname = usePathname()

  return (
    <>
      <header className="border-b bg-white sticky top-0 z-40 safe-area-top">
        <div className="flex items-center justify-between px-4 py-3 min-h-[56px]">
          {/* Мобильное меню */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="lg"
                className="p-3 -ml-3 min-w-[48px] min-h-[48px] lg:hidden touch-manipulation"
                aria-label={t("open_menu")}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] p-0 safe-area-left">
              <div className="flex flex-col h-full">
                {/* Header меню */}
                <div className="p-6 border-b bg-gradient-to-r from-blue-600 to-indigo-600">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12 border-2 border-white/20">
                      <AvatarImage src="/avatars/sarah-anderson.jpg" />
                      <AvatarFallback className="bg-white/20 text-white">SA</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-white">Sarah Anderson</p>
                      <p className="text-sm text-blue-100">{t("operations_manager")}</p>
                    </div>
                  </div>
                </div>

                {/* Явная кнопка профиля */}
                <div className="px-3 py-2 border-b">
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between w-full px-3 py-3 rounded-lg text-base font-medium bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-3" />
                      <span>{t("profile")}</span>
                    </div>
                  </Link>
                </div>

                {/* Навигация - только уникальные пункты */}
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
                          className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors touch-manipulation ${
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

                {/* Footer меню */}
                <div className="border-t p-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-600 hover:text-gray-900 h-12"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <HelpCircle className="h-5 w-5 mr-3" />
                    {t("help_support")}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Логотип */}
          <div className="flex-1 flex justify-center lg:justify-start">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">L</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">LoovIS</span>
            </Link>
          </div>

          {/* Действия */}
          <div className="flex items-center space-x-1">
            {/* Поиск */}
            <Button
              variant="ghost"
              size="lg"
              className="p-3 min-w-[48px] min-h-[48px] lg:hidden touch-manipulation"
              onClick={() => setIsSearchOpen(true)}
              aria-label={t("search")}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Уведомления */}
            <Sheet open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="p-3 min-w-[48px] min-h-[48px] relative touch-manipulation"
                  aria-label={t("notifications")}
                >
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-500 border-2 border-white flex items-center justify-center">
                    3
                  </Badge>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] p-0 safe-area-right">
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">{t("notifications")}</h2>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <div className="p-4 border-b hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-medium">Новая задача назначена</p>
                          <p className="text-xs text-gray-500 mt-1">2 часа назад</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-b hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-medium">Комментарий к задаче</p>
                          <p className="text-xs text-gray-500 mt-1">Вчера</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-b hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                        <div>
                          <p className="text-sm font-medium">Напоминание о встрече</p>
                          <p className="text-xs text-gray-500 mt-1">Вчера</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-t">
                    <Button variant="outline" className="w-full" size="sm">
                      {t("view_all_notifications")}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Аватар - прямая ссылка на профиль */}
            <Link href="/profile" className="lg:hidden">
              <Button variant="ghost" className="p-1">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/sarah-anderson.jpg" />
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
              </Button>
            </Link>
          </div>
        </div>

        {/* Полноэкранный поиск */}
        {isSearchOpen && (
          <div className="absolute inset-x-0 top-0 bg-white border-b z-50 lg:hidden safe-area-top">
            <div className="flex items-center px-4 py-3 min-h-[56px]">
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
                className="ml-2 p-3 min-w-[48px] min-h-[48px] touch-manipulation"
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
