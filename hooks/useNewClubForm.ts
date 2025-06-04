"use client"

import { useState, useCallback } from "react"
import { z } from "zod"

// Схема валидации
const newClubSchema = z.object({
  name: z.string().min(1, "Название клуба обязательно"),
  address: z.string().min(1, "Адрес обязателен"),
  city: z.string().min(1, "Город обязателен"),
  region: z.string().optional(),
  legalEntity: z.string().optional(),
  companyOwner: z.string().optional(),
  contactPerson: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().email("Некорректный email").optional().or(z.literal("")),
  template: z.enum(["retail", "clinic", "dark-optics"], {
    required_error: "Выберите шаблон",
  }),
  manager: z.string().min(1, "Выберите менеджера"),
  openingDate: z.string().min(1, "Выберите дату открытия"),
  description: z.string().optional(),
})

export type NewClubFormData = z.infer<typeof newClubSchema>

interface UseNewClubFormReturn {
  formData: NewClubFormData
  errors: Partial<Record<keyof NewClubFormData, string>>
  isValid: boolean
  updateField: (field: keyof NewClubFormData, value: string) => void
  validateStep: (step: number) => boolean
  reset: () => void
}

const initialFormData: NewClubFormData = {
  name: "",
  address: "",
  city: "",
  region: "",
  legalEntity: "",
  companyOwner: "",
  contactPerson: "",
  contactPhone: "",
  contactEmail: "",
  template: "retail",
  manager: "",
  openingDate: "",
  description: "",
}

export const useNewClubForm = (): UseNewClubFormReturn => {
  const [formData, setFormData] = useState<NewClubFormData>(initialFormData)
  const [errors, setErrors] = useState<Partial<Record<keyof NewClubFormData, string>>>({})

  const updateField = useCallback(
    (field: keyof NewClubFormData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }))

      // Очищаем ошибку при изменении поля
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    },
    [errors],
  )

  const validateStep = useCallback(
    (step: number): boolean => {
      const stepValidations = {
        1: () => {
          const stepSchema = newClubSchema.pick({ name: true, address: true, city: true })
          const result = stepSchema.safeParse(formData)
          if (!result.success) {
            const stepErrors: Partial<Record<keyof NewClubFormData, string>> = {}
            result.error.errors.forEach((error) => {
              const field = error.path[0] as keyof NewClubFormData
              stepErrors[field] = error.message
            })
            setErrors(stepErrors)
            return false
          }
          return true
        },
        2: () => {
          if (!formData.template) {
            setErrors({ template: "Выберите шаблон" })
            return false
          }
          return true
        },
        3: () => {
          const stepSchema = newClubSchema.pick({ manager: true, openingDate: true })
          const result = stepSchema.safeParse(formData)
          if (!result.success) {
            const stepErrors: Partial<Record<keyof NewClubFormData, string>> = {}
            result.error.errors.forEach((error) => {
              const field = error.path[0] as keyof NewClubFormData
              stepErrors[field] = error.message
            })
            setErrors(stepErrors)
            return false
          }
          return true
        },
      }

      return stepValidations[step as keyof typeof stepValidations]?.() ?? true
    },
    [formData],
  )

  const reset = useCallback(() => {
    setFormData(initialFormData)
    setErrors({})
  }, [])

  const isValid = newClubSchema.safeParse(formData).success

  return {
    formData,
    errors,
    isValid,
    updateField,
    validateStep,
    reset,
  }
}
