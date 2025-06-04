"use client"

import { ArrowDown, ArrowUp } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { Card } from "@/components/ui/card"

interface Metric {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  period?: string
}

interface MobileMetricsGridProps {
  metrics: Metric[]
  compact?: boolean
}

export function MobileMetricsGrid({ metrics, compact = false }: MobileMetricsGridProps) {
  const { t } = useLanguage()

  return (
    <div className={`grid ${compact ? "grid-cols-2 gap-2" : "grid-cols-1 gap-3"} w-full`}>
      {metrics.map((metric, index) => (
        <Card
          key={index}
          className={`${
            compact ? "p-3" : "p-4"
          } flex flex-col border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow`}
        >
          <p className="text-sm text-gray-500 mb-1">{metric.title}</p>
          <p className={`font-bold ${compact ? "text-xl" : "text-2xl"} mb-1`}>{metric.value}</p>
          <div className="flex items-center mt-auto text-xs">
            {metric.trend === "up" ? (
              <ArrowUp className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
            ) : (
              <ArrowDown className="h-3 w-3 text-red-500 mr-1 flex-shrink-0" />
            )}
            <span className={`${metric.trend === "up" ? "text-green-500" : "text-red-500"} truncate`}>
              {metric.change} {metric.period || ""}
            </span>
          </div>
        </Card>
      ))}
    </div>
  )
}
