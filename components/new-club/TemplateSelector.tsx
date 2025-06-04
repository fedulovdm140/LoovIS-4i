"use client"

import { memo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

interface TemplateOption {
  id: string
  name: string
  description: string
  timeline: string
  cost: string
  image: string
  features: string[]
}

interface TemplateSelectorProps {
  templates: TemplateOption[]
  selectedTemplate: string
  onSelect: (templateId: string) => void
  t: (key: string) => string
  error?: string
}

export const TemplateSelector = memo<TemplateSelectorProps>(({ templates, selectedTemplate, onSelect, t, error }) => {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-2">{t("select_club_template")}</h3>
      <p className="text-gray-600 mb-6">{t("template_description")}</p>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => {
          const isSelected = selectedTemplate === template.id

          return (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected ? "ring-2 ring-blue-500 bg-blue-50" : "hover:border-gray-400"
              }`}
              onClick={() => onSelect(template.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onSelect(template.id)
                }
              }}
              aria-pressed={isSelected}
            >
              <div className="relative">
                <div className="h-40 overflow-hidden rounded-t-lg">
                  <img
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-lg">{template.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {template.timeline}
                  </Badge>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{template.description}</p>

                <div className="text-sm text-gray-500 mb-3">
                  <span className="font-medium">{t("cost")}: </span>
                  <span className="text-green-600 font-semibold">{template.cost}</span>
                </div>

                {isSelected && (
                  <div className="mt-3 pt-3 border-t border-blue-100">
                    <h5 className="font-medium text-sm mb-2">{t("key_features")}</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {template.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
})

TemplateSelector.displayName = "TemplateSelector"
