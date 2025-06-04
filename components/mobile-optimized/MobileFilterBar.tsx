"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"
import { Filter } from "lucide-react"
import { useState } from "react"

interface FilterOption {
  value: string
  label: string
}

interface MobileFilterBarProps {
  periodOptions: FilterOption[]
  locationOptions: FilterOption[]
  onPeriodChange: (value: string) => void
  onLocationChange: (value: string) => void
  defaultPeriod?: string
  defaultLocation?: string
}

export function MobileFilterBar({
  periodOptions,
  locationOptions,
  onPeriodChange,
  onLocationChange,
  defaultPeriod = "month",
  defaultLocation = "all",
}: MobileFilterBarProps) {
  const { t } = useLanguage()
  const [showFilters, setShowFilters] = useState(false)
  const [period, setPeriod] = useState(defaultPeriod)
  const [location, setLocation] = useState(defaultLocation)

  const handlePeriodChange = (value: string) => {
    setPeriod(value)
    onPeriodChange(value)
  }

  const handleLocationChange = (value: string) => {
    setLocation(value)
    onLocationChange(value)
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">{t("filters")}</h2>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4" />
          <span className="text-sm">{showFilters ? t("hide_filters") : t("show_filters")}</span>
        </Button>
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 gap-2 mt-2">
          <div>
            <label className="text-xs text-gray-500 mb-1 block">{t("period")}</label>
            <Select value={period} onValueChange={handlePeriodChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("select_period")} />
              </SelectTrigger>
              <SelectContent>
                {periodOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-xs text-gray-500 mb-1 block">{t("location")}</label>
            <Select value={location} onValueChange={handleLocationChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t("select_location")} />
              </SelectTrigger>
              <SelectContent>
                {locationOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </div>
  )
}
