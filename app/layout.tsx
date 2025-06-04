import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import MessagesButton from "@/components/messages-button"
import { LanguageProvider } from "@/contexts/language-context"
import { ProgressProvider } from "@/contexts/progress-context"
import { MobileTabBar } from "@/components/mobile-optimized/MobileTabBar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LoovIS - Corporate Portal",
  description: "Corporate portal for LoovIS",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <LanguageProvider>
            <ProgressProvider>
              <div className="flex h-screen overflow-hidden">
                {/* Десктопный сайдбар */}
                <Sidebar />

                <div className="flex flex-col flex-1 overflow-hidden">
                  {/* Единый хедер для всех устройств */}
                  <Header />

                  <main className="flex-1 relative">
                    <div className="absolute inset-0 overflow-y-auto pb-20 lg:pb-0" style={{ maxHeight: "100vh" }}>
                      {children}
                    </div>
                  </main>

                  {/* Мобильный таб бар */}
                  <MobileTabBar />

                  {/* Кнопка сообщений - скрыта на мобильных */}
                  <div className="hidden lg:block">
                    <MessagesButton />
                  </div>
                </div>
              </div>
            </ProgressProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
