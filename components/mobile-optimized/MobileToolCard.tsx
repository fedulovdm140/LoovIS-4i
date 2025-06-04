"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface MobileToolCardProps {
  id: string
  name: string
  description: string
  icon: LucideIcon
  path: string
  isNew?: boolean
  isFavorite?: boolean
}

export function MobileToolCard({ id, name, description, icon: Icon, path, isNew, isFavorite }: MobileToolCardProps) {
  const { t } = useLanguage()

  return (
    <Link href={path} className="block">
      <Card className="flex items-center p-3 hover:shadow-md transition-shadow border-2 hover:border-blue-200">
        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mr-3 flex-shrink-0">
          <Icon className="h-5 w-5 text-blue-600" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-base truncate">{name}</h3>
            <div className="flex space-x-1 ml-2 flex-shrink-0">
              {isNew && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800 text-xs px-1.5">
                  {t("new")}
                </Badge>
              )}
              {isFavorite && (
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 hover:text-amber-800 text-xs px-1.5">
                  {t("favorite")}
                </Badge>
              )}
            </div>
          </div>
          <p className="text-gray-600 text-xs line-clamp-1">{description}</p>
        </div>
      </Card>
    </Link>
  )
}
