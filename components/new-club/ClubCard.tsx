import { memo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Calendar, User } from "lucide-react"
import Link from "next/link"

interface ClubData {
  id: string
  name: string
  address: string
  progress: number
  stage: string
  startDate: string
  targetDate: string
  daysLeft: number
  manager: string
  template: string
  legalEntity: string
}

interface ClubCardProps {
  club: ClubData
  t: (key: string) => string
  progress?: number
}

export const ClubCard = memo<ClubCardProps>(({ club, t, progress }) => {
  const displayProgress = progress ?? club.progress

  return (
    <Card className="hover:shadow-lg transition-all duration-200 overflow-hidden group">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">{club.name}</h3>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
            {club.daysLeft} {t("days_left")}
          </Badge>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-1">
          <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
          <span className="truncate">{club.address}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <User className="h-4 w-4 mr-2 flex-shrink-0" />
          <span>{club.manager}</span>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium text-gray-700">{t("progress")}</span>
            <span className="font-semibold text-blue-600">{displayProgress}%</span>
          </div>
          <Progress
            value={displayProgress}
            className="h-3 bg-gray-100"
            aria-label={`${t("progress")}: ${displayProgress}%`}
          />
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">{t("current_stage")}</span>
            <span className="font-medium text-right max-w-[60%]">{club.stage}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">{t("template")}</span>
            <span className="text-right">{club.template}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center text-xs text-gray-500">
            <Calendar className="h-3 w-3 mr-1" />
            <span>
              {club.startDate} → {club.targetDate}
            </span>
          </div>
          <Link href={`/new-club/details/${club.id}`}>
            <Button variant="outline" size="sm" className="hover:bg-blue-50 hover:border-blue-200 transition-colors">
              {t("view_details")}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
})

ClubCard.displayName = "ClubCard"
