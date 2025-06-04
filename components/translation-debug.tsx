"use client"

import { useLanguage } from "@/contexts/language-context"
import { useEffect } from "react"

// Компонент для отладки переводов в режиме разработки
export function TranslationDebug() {
  const { language } = useLanguage()

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log(`🌐 Current language: ${language}`)

      // Проверяем все элементы на странице на наличие ключей переводов
      const checkForTranslationKeys = () => {
        const allElements = document.querySelectorAll("*")
        const suspiciousElements: Element[] = []

        allElements.forEach((element) => {
          const text = element.textContent
          if (
            text &&
            (text.includes("_") ||
              text.match(/^[a-z]+[A-Z]/) || // camelCase
              text.match(/^[a-z_]+$/)) // snake_case
          ) {
            suspiciousElements.push(element)
          }
        })

        if (suspiciousElements.length > 0) {
          console.warn("🚨 Possible untranslated keys found:", suspiciousElements)
        }
      }

      // Запускаем проверку через небольшую задержку
      setTimeout(checkForTranslationKeys, 1000)
    }
  }, [language])

  return null
}
