"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

interface MobileChartContainerProps {
  title: string
  description?: string
  children: React.ReactNode
  defaultExpanded?: boolean
  className?: string
}

export function MobileChartContainer({
  title,
  description,
  children,
  defaultExpanded = false,
  className = "",
}: MobileChartContainerProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const { t } = useLanguage()

  return (
    <Card className={`mb-4 overflow-hidden ${className}`}>
      <CardHeader className="p-3 pb-0">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            {description && <CardDescription className="text-xs mt-0.5">{description}</CardDescription>}
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-label={isExpanded ? t("collapse") : t("expand")}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <div
        className={`transition-all duration-300 ease-in-out ${
          isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <CardContent className="p-3 pt-2">{children}</CardContent>
      </div>
      {!isExpanded && (
        <div className="px-3 pb-3">
          <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => setIsExpanded(true)}>
            {t("show_details")}
          </Button>
        </div>
      )}
    </Card>
  )
}
