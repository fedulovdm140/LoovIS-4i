"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Calendar, Clock, FileText, ChevronDown, ChevronUp, Plus, X } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function TasksPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("project")
  const [expandedPhases, setExpandedPhases] = useState<number[]>([0, 1])
  const [selectedTask, setSelectedTask] = useState<number | null>(3)
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false)
  const [showTaskDetails, setShowTaskDetails] = useState(true)

  const projectDetails = {
    title: t("new_franchise_location"),
    startDate: t("jan_15_2025"),
    dueDate: t("mar_30_2025"),
    progress: 38,
    tasksCompleted: "14/36",
    daysRemaining: 45,
    teamMembers: [
      {
        id: 1,
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80",
      },
      { id: 2, avatar: "" },
      { id: 3, avatar: "" },
      { id: 4, avatar: "" },
    ],
  }

  const phases = [
    {
      name: t("planning"),
      status: t("completed"),
      tasks: [
        { id: 1, name: t("site_selection"), completed: true },
        { id: 2, name: t("budget_approval"), completed: true },
      ],
    },
    {
      name: t("integration"),
      status: t("in_progress"),
      tasks: [
        { id: 3, name: t("lease_agreement"), completed: true },
        { id: 4, name: t("permits_licenses"), completed: false },
      ],
    },
    {
      name: t("setup"),
      status: t("pending"),
      tasks: [
        { id: 5, name: t("equipment_installation"), completed: false },
        { id: 6, name: t("staff_training"), completed: false },
      ],
    },
    {
      name: t("launch"),
      status: t("pending"),
      tasks: [
        { id: 7, name: t("marketing_campaign"), completed: false },
        { id: 8, name: t("grand_opening"), completed: false },
      ],
    },
  ]

  const currentTasks = [
    {
      id: 1,
      title: t("sign_lease_agreement"),
      startDate: t("jan_15_2025"),
      dueDate: t("jan_30_2025"),
      status: t("not_started"),
      completed: false,
    },
    {
      id: 2,
      title: t("lease_agreement"),
      startDate: t("jan_10_2025"),
      dueDate: t("jan_20_2025"),
      status: t("completed"),
      completed: true,
    },
    {
      id: 3,
      title: t("it_systems_setup"),
      startDate: t("mar_10_2025"),
      dueDate: t("mar_30_2025"),
      status: t("in_progress"),
      completed: false,
    },
  ]

  const taskDetails = {
    id: 3,
    title: t("it_systems_setup"),
    priority: t("high_priority"),
    createdDate: t("mar_10_2025"),
    dueDate: t("mar_30_2025"),
    progress: 35,
    assignee: {
      name: "Michael Roberts",
      role: t("it_systems_manager"),
      avatar: "",
    },
    description: [t("configure_erp"), t("install_pos"), t("connect_medical_equipment")],
    resources: [
      { id: 1, title: t("setup_guides"), icon: "FileText" },
      { id: 2, title: t("video_tutorials"), icon: "Video" },
      { id: 3, title: t("it_support"), icon: "HelpCircle" },
      { id: 4, title: t("wiki_documentation"), icon: "FileText" },
    ],
    checklist: [
      { id: 1, title: t("initial_system_requirements"), completed: true },
      { id: 2, title: t("erp_configuration"), completed: false, status: t("in_progress") },
      { id: 3, title: t("pos_integration"), completed: false, status: t("not_started") },
    ],
    attachments: [
      { id: 1, name: "System_Requirements.pdf", size: "2.4 MB", type: "pdf" },
      { id: 2, name: "Equipment_List.xlsx", size: "1.8 MB", type: "excel" },
    ],
  }

  const togglePhase = (index: number) => {
    if (expandedPhases.includes(index)) {
      setExpandedPhases(expandedPhases.filter((i) => i !== index))
    } else {
      setExpandedPhases([...expandedPhases, index])
    }
  }

  const toggleTaskCompletion = (taskId: number) => {
    // Implement task completion toggle logic
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">{projectDetails.title}</h1>
            <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                <span>
                  {t("started")}: {projectDetails.startDate}
                </span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>
                  {t("due")}: {projectDetails.dueDate}
                </span>
              </div>
            </div>
          </div>
          <Button className="flex items-center gap-2" onClick={() => setShowAddTaskDialog(true)}>
            <Plus className="h-4 w-4" />
            <span>{t("add_task")}</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm text-gray-500 mb-2">{t("overall_progress")}</h3>
            <div className="text-2xl font-bold mb-2">{projectDetails.progress}%</div>
            <Progress value={projectDetails.progress} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm text-gray-500 mb-2">{t("tasks_completed")}</h3>
            <div className="text-2xl font-bold">{projectDetails.tasksCompleted}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm text-gray-500 mb-2">{t("days_remaining")}</h3>
            <div className="text-2xl font-bold">{projectDetails.daysRemaining}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm text-gray-500 mb-2">{t("team_members")}</h3>
            <div className="flex -space-x-2">
              {projectDetails.teamMembers.map((member) => (
                <Avatar key={member.id} className="border-2 border-white h-8 w-8">
                  <AvatarImage src={member.avatar || undefined} />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              ))}
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-100 text-gray-600 text-xs font-medium border-2 border-white">
                +2
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {phases.map((phase, index) => (
          <Collapsible key={phase.name} open={expandedPhases.includes(index)} className="transition-all duration-200">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">{phase.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        phase.status === t("completed")
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : phase.status === t("in_progress")
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {phase.status}
                    </Badge>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        {expandedPhases.includes(index) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
              </CardHeader>
              <CollapsibleContent>
                <CardContent>
                  <div className="space-y-2">
                    {phase.tasks.map((task) => (
                      <div key={task.id} className="flex items-center">
                        <Checkbox id={`task-${task.id}`} checked={task.completed} className="mr-2" />
                        <label
                          htmlFor={`task-${task.id}`}
                          className={`text-sm ${task.completed ? "line-through text-gray-500" : ""}`}
                        >
                          {task.name}
                        </label>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="w-full mt-2 text-blue-600 hover:text-blue-800">
                      <Plus className="h-3 w-3 mr-1" /> {t("add_task_to_phase")}
                    </Button>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        ))}
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">{t("current_tasks")}</h2>
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500"></th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{t("task")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{t("start_date")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{t("due_date")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{t("status")}</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {currentTasks.map((task) => (
                  <tr
                    key={task.id}
                    className={`border-b hover:bg-gray-50 ${task.id === selectedTask ? "bg-blue-50" : ""}`}
                  >
                    <td className="px-4 py-3">
                      <Checkbox checked={task.completed} />
                    </td>
                    <td className="px-4 py-3 text-sm font-medium">{task.title}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{task.startDate}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{task.dueDate}</td>
                    <td className="px-4 py-3">
                      <Badge
                        className={
                          task.status === t("completed")
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : task.status === t("in_progress")
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {task.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedTask(task.id)
                          setShowTaskDetails(true)
                        }}
                      >
                        {t("view")}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedTask && showTaskDetails && (
        <div className="relative border rounded-lg p-4 mb-8 bg-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{taskDetails.title}</h2>
            <div className="flex items-center gap-2">
              <Badge className="bg-red-100 text-red-800 hover:bg-red-100">{taskDetails.priority}</Badge>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowTaskDetails(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Collapsible defaultOpen>
                <div className="border rounded-lg overflow-hidden">
                  <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-gray-50 hover:bg-gray-100">
                    <h3 className="font-medium">{t("description")}</h3>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-4">
                      <ul className="space-y-2">
                        {taskDetails.description.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 mt-0.5">
                              <span className="text-xs">•</span>
                            </div>
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>

              <Collapsible defaultOpen>
                <div className="border rounded-lg overflow-hidden">
                  <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-gray-50 hover:bg-gray-100">
                    <h3 className="font-medium">{t("resources")}</h3>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {taskDetails.resources.map((resource) => (
                          <Button key={resource.id} variant="outline" className="h-auto py-3 justify-start">
                            <FileText className="h-4 w-4 mr-2" />
                            <span className="text-sm">{resource.title}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>

              <Collapsible defaultOpen>
                <div className="border rounded-lg overflow-hidden">
                  <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-gray-50 hover:bg-gray-100">
                    <h3 className="font-medium">{t("checklist")}</h3>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-4">
                      <div className="space-y-3">
                        {taskDetails.checklist.map((item) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Checkbox id={`checklist-${item.id}`} checked={item.completed} className="mr-3" />
                              <label
                                htmlFor={`checklist-${item.id}`}
                                className={`text-sm ${item.completed ? "line-through text-gray-500" : ""}`}
                              >
                                {item.title}
                              </label>
                            </div>
                            {!item.completed && item.status && (
                              <Badge
                                className={
                                  item.status === t("in_progress")
                                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                }
                              >
                                {item.status}
                              </Badge>
                            )}
                          </div>
                        ))}
                        <Button variant="ghost" size="sm" className="mt-2 text-blue-600 hover:text-blue-800">
                          <Plus className="h-3 w-3 mr-1" /> {t("add_checklist_item")}
                        </Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>

              <Collapsible defaultOpen>
                <div className="border rounded-lg overflow-hidden">
                  <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-gray-50 hover:bg-gray-100">
                    <h3 className="font-medium">{t("attachments")}</h3>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {taskDetails.attachments.map((attachment) => (
                          <div key={attachment.id} className="flex items-center border rounded-md p-3">
                            <div className="h-8 w-8 bg-red-100 text-red-800 rounded flex items-center justify-center mr-3">
                              <FileText className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{attachment.name}</p>
                              <p className="text-xs text-gray-500">{attachment.size}</p>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" className="flex items-center justify-center h-16">
                          <Plus className="h-4 w-4 mr-2" /> {t("add_attachment")}
                        </Button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>

              <Collapsible defaultOpen>
                <div className="border rounded-lg overflow-hidden">
                  <CollapsibleTrigger className="flex justify-between items-center w-full p-4 bg-gray-50 hover:bg-gray-100">
                    <h3 className="font-medium">{t("comments")}</h3>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80" />
                          <AvatarFallback>SA</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <textarea
                            placeholder={t("add_comment")}
                            className="w-full border rounded-md p-2 text-sm min-h-[80px]"
                          ></textarea>
                          <div className="mt-2">
                            <Button>{t("post_comment")}</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t("assignee")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={taskDetails.assignee.avatar || undefined} />
                      <AvatarFallback>{taskDetails.assignee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{taskDetails.assignee.name}</p>
                      <p className="text-sm text-gray-500">{taskDetails.assignee.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("timeline")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">{t("start_date")}</p>
                      <p className="font-medium">{taskDetails.createdDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t("due_date")}</p>
                      <p className="font-medium">{taskDetails.dueDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t("progress")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{t("completion")}</span>
                      <span className="text-sm font-medium">
                        {taskDetails.progress}% {t("complete")}
                      </span>
                    </div>
                    <Progress value={taskDetails.progress} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  {t("edit")}
                </Button>
                <Button className="flex-1">{t("complete")}</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog open={showAddTaskDialog} onOpenChange={setShowAddTaskDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{t("add_new_task")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="task-title" className="text-right">
                {t("title")}
              </label>
              <Input id="task-title" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="task-phase" className="text-right">
                {t("phase")}
              </label>
              <select id="task-phase" className="col-span-3 border rounded-md px-3 py-1.5 bg-white">
                {phases.map((phase) => (
                  <option key={phase.name} value={phase.name}>
                    {phase.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="task-start-date" className="text-right">
                {t("start_date")}
              </label>
              <Input id="task-start-date" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="task-due-date" className="text-right">
                {t("due_date")}
              </label>
              <Input id="task-due-date" type="date" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="task-assignee" className="text-right">
                {t("assignee")}
              </label>
              <select id="task-assignee" className="col-span-3 border rounded-md px-3 py-1.5 bg-white">
                <option value="michael">Michael Roberts</option>
                <option value="sarah">Sarah Miller</option>
                <option value="john">John Anderson</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="task-priority" className="text-right">
                {t("priority")}
              </label>
              <select id="task-priority" className="col-span-3 border rounded-md px-3 py-1.5 bg-white">
                <option value="high">{t("high")}</option>
                <option value="medium">{t("medium")}</option>
                <option value="low">{t("low")}</option>
              </select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="task-description" className="text-right">
                {t("description")}
              </label>
              <Textarea id="task-description" className="col-span-3" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddTaskDialog(false)}>
              {t("cancel")}
            </Button>
            <Button>{t("create_task")}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
