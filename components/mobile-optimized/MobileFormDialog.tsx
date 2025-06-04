"use client"

import type React from "react"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { X, ChevronLeft, Check } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface MobileFormDialogProps {
  isOpen: boolean
  onClose: () => void
  currentStep: number
  totalSteps: number
  onNextStep: () => void
  onPrevStep: () => void
  canGoNext: boolean
  isLastStep?: boolean
  children: React.ReactNode
  title?: string
}

export function MobileFormDialog({
  isOpen,
  onClose,
  currentStep,
  totalSteps,
  onNextStep,
  onPrevStep,
  canGoNext,
  isLastStep = false,
  children,
  title,
}: MobileFormDialogProps) {
  const { t } = useLanguage()

  // Предотвращаем скролл body когда модал открыт
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
    } else {
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
    }

    return () => {
      document.body.style.overflow = ""
      document.body.style.position = ""
      document.body.style.width = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  const progressPercentage = (currentStep / totalSteps) * 100

  return (
    <div className="fixed inset-0 z-50 lg:flex lg:items-center lg:justify-center lg:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm lg:rounded-lg"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="relative bg-white h-full lg:h-auto lg:max-h-[90vh] lg:w-full lg:max-w-4xl lg:rounded-xl lg:shadow-2xl flex flex-col safe-area-inset">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-white lg:rounded-t-xl safe-area-top">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {/* Кнопка назад/закрыть */}
            {currentStep > 1 ? (
              <Button
                variant="ghost"
                size="lg"
                onClick={onPrevStep}
                className="p-2 -ml-2 min-w-[44px] min-h-[44px] touch-manipulation"
                aria-label={t("back")}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="lg"
                onClick={onClose}
                className="p-2 -ml-2 min-w-[44px] min-h-[44px] touch-manipulation"
                aria-label={t("close")}
              >
                <X className="h-6 w-6" />
              </Button>
            )}

            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-gray-900 truncate">{title || t("create_new_club")}</h2>
              <p className="text-sm text-gray-500">
                {t("step")} {currentStep} {t("of")} {totalSteps}
              </p>
            </div>
          </div>

          {/* Кнопка закрытия (только десктоп) */}
          <Button
            variant="ghost"
            size="lg"
            onClick={onClose}
            className="hidden lg:flex p-2 min-w-[44px] min-h-[44px]"
            aria-label={t("close")}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Прогресс бар */}
        <div className="px-4 py-4 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">{t("progress")}</span>
            <span className="text-sm font-bold text-blue-600">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="relative">
            <Progress
              value={progressPercentage}
              className="h-3 bg-white/50 rounded-full"
              aria-label={`${t("progress")}: ${currentStep} ${t("of")} ${totalSteps}`}
            />
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Контент */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="p-4 lg:p-6 pb-24 lg:pb-6">{children}</div>
        </div>

        {/* Footer с кнопками */}
        <div className="border-t bg-white p-4 lg:rounded-b-xl safe-area-bottom">
          <div className="flex space-x-3">
            {/* Кнопка назад (только на десктопе, если не первый шаг) */}
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={onPrevStep}
                className="hidden lg:flex flex-1 h-12 touch-manipulation"
                size="lg"
              >
                {t("back")}
              </Button>
            )}

            {/* Основная кнопка */}
            <Button
              onClick={onNextStep}
              disabled={!canGoNext}
              className={`flex-1 h-12 touch-manipulation transition-all duration-200 ${
                isLastStep
                  ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              } text-white border-0 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
              size="lg"
            >
              <div className="flex items-center space-x-2">
                {isLastStep && <Check className="h-5 w-5" />}
                <span className="font-medium">{isLastStep ? t("create_club") : t("next")}</span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
