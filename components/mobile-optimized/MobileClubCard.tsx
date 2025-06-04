import { memo } from "react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"
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
}

interface MobileClubCardProps {
  club: ClubData
  t: (key: string) => string
  progress?: number
}

export const MobileClubCard = memo<MobileClubCardProps>(({ club, t, progress }) => {
  const displayProgress = progress ?? club.progress

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
      <div className="bg-blue-50 p-4 border-b">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{club.name}</h3>
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            {club.daysLeft} {t("days_left")}
          </Badge>
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{club.address}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>{t("progress")}</span>
            <span>{displayProgress}%</span>
          </div>
          <Progress value={displayProgress} className="h-2" />
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">{t("current_stage")}</span>
            <span className="font-medium">{t(club.stage)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">{t("template")}</span>
            <span>{t(club.template)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">{t("manager")}</span>
            <span>{club.manager}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t">
          <div className="text-xs text-gray-500">
            {t("started")}: {club.startDate} • {t("target")}: {club.targetDate}
          </div>
          <Link href={`/new-club/details/${club.id}`}>
            <Button variant="outline" size="sm" className="hover:bg-blue-50">
              {t("view_details")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
})

MobileClubCard.displayName = "MobileClubCard"
