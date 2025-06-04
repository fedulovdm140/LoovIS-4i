"use client"

// Утилита для проверки отсутствующих переводов
export function validateTranslations() {
  if (process.env.NODE_ENV !== "development") return

  const missingKeys: string[] = []

  // Функция для сбора всех используемых ключей из компонентов
  const collectUsedKeys = () => {
    // Здесь можно добавить логику для автоматического сбора ключей
    // из всех компонентов, которые используют t()
  }

  // Проверка отсутствующих ключей
  const checkMissingKeys = (keys: string[], language: "en" | "ru") => {
    // Логика проверки
  }

  return missingKeys
}

// Хук для отладки переводов
export function useTranslationDebug() {
  if (process.env.NODE_ENV === "development") {
    console.log("🔍 Translation debug mode enabled")
  }
}
