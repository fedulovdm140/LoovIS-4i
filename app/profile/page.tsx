"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, Edit, Camera } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function ProfilePage() {
  const { t } = useLanguage()
  const [isEditing, setIsEditing] = useState(false)

  const userProfile = {
    name: "Sarah Anderson",
    title: t("profile_job_title"),
    email: "s.anderson@loovis.com",
    phone: "+1 (555) 123-4567",
    avatar: "/avatars/sarah-anderson.jpg",
  }

  const currentProjects = [
    {
      id: 1,
      name: t("website_redesign"),
      progress: 65,
      status: t("in_progress"),
    },
    {
      id: 2,
      name: t("mobile_app_design"),
      progress: 30,
      status: t("planning"),
    },
  ]

  const kpis = [
    {
      title: t("projects_completed"),
      value: "12/15",
    },
    {
      title: t("task_completion_rate"),
      value: "94%",
    },
    {
      title: t("team_satisfaction"),
      value: "4.8/5.0",
    },
  ]

  const projectRoles = [
    {
      project: t("website_redesign"),
      role: t("lead_designer"),
      status: t("active"),
    },
    {
      project: t("mobile_app_design"),
      role: t("ux_consultant"),
      status: t("in_progress"),
    },
  ]

  const skills = [t("ui_design"), t("ux_research"), t("prototyping"), "Figma", t("design_systems"), t("user_testing")]

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-0 right-0 rounded-full h-8 w-8 shadow-md"
              onClick={() => setIsEditing(true)}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{userProfile.name}</h1>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-gray-600 mb-4">{userProfile.title}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-2" />
                <span>{userProfile.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>{userProfile.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">{t("current_projects")}</h2>
          <div className="space-y-6">
            {currentProjects.map((project) => (
              <div key={project.id} className="bg-white border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">{project.name}</h3>
                  <Badge
                    className={
                      project.status === t("in_progress")
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">{t("kpis")}</h2>
          <div className="grid grid-cols-1 gap-4">
            {kpis.map((kpi, index) => (
              <div key={index} className="bg-white border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-gray-600">{kpi.title}</h3>
                  <span className="font-bold">{kpi.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("project_roles")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projectRoles.map((role, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-medium">{role.project}</h3>
                    <Badge
                      className={
                        role.status === t("active")
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                      }
                    >
                      {role.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{role.role}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("skills_expertise")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="bg-gray-100">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
