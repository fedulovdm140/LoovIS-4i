"use client"

import type React from "react"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { useState, useRef, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/contexts/language-context"

export default function MessagesButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("recent")
  const [messageText, setMessageText] = useState("")
  const [selectedChat, setSelectedChat] = useState<number | null>(null)
  const messagesRef = useRef<HTMLDivElement>(null)
  const { t } = useLanguage()

  const messages = [
    {
      id: 1,
      sender: "Sarah Chen",
      avatar: "/avatars/sarah-chen.jpg",
      message: "Can you review the latest design updates?",
      time: "2m ago",
      unread: true,
    },
    {
      id: 2,
      sender: "Design Team",
      avatar: "/avatars/team-avatar.jpg",
      message: "Weekly sync meeting notes posted",
      time: "15m ago",
      unread: true,
    },
    {
      id: 3,
      sender: "Michael Park",
      avatar: "/avatars/michael-park.jpg",
      message: "Thanks for the update!",
      time: "1h ago",
      unread: false,
    },
    {
      id: 4,
      sender: "Project Updates",
      avatar: "",
      message: "New milestone completed",
      time: "2h ago",
      unread: false,
    },
    {
      id: 5,
      sender: "Emma Wilson",
      avatar: "/avatars/emma-wilson.jpg",
      message: "Schedule for tomorrow's presentation",
      time: "3h ago",
      unread: false,
    },
  ]

  const chatMessages = [
    {
      id: 1,
      sender: "Sarah Chen",
      text: "Hi there! Can you review the latest design updates?",
      time: "10:30 AM",
      isMine: false,
    },
    { id: 2, sender: "Me", text: "Sure, I'll take a look at them right away.", time: "10:32 AM", isMine: true },
    {
      id: 3,
      sender: "Sarah Chen",
      text: "Great! I've made some changes to the navigation and color scheme.",
      time: "10:33 AM",
      isMine: false,
    },
    {
      id: 4,
      sender: "Sarah Chen",
      text: "Let me know what you think about the new layout too.",
      time: "10:34 AM",
      isMine: false,
    },
    {
      id: 5,
      sender: "Me",
      text: "The navigation looks much better now. I like the simplified structure.",
      time: "10:40 AM",
      isMine: true,
    },
  ]

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // В реальном приложении здесь был бы код для отправки сообщения
      setMessageText("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Позиционирование окна сообщений
  const [messagesPosition, setMessagesPosition] = useState({ bottom: 0, right: 0 })

  useEffect(() => {
    const updatePosition = () => {
      const buttonElement = document.querySelector(".messages-button") as HTMLElement
      if (buttonElement && messagesRef.current) {
        const rect = buttonElement.getBoundingClientRect()
        setMessagesPosition({
          bottom: window.innerHeight - rect.top + 16,
          right: 16,
        })
      }
    }

    updatePosition()
    window.addEventListener("resize", updatePosition)

    return () => {
      window.removeEventListener("resize", updatePosition)
    }
  }, [isOpen])

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        className="rounded-full h-14 w-14 bg-blue-600 hover:bg-blue-700 relative messages-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          12
        </span>
      </Button>

      {isOpen && (
        <div
          ref={messagesRef}
          className="fixed bg-white border rounded-lg shadow-lg w-[90vw] sm:w-[380px] md:w-[440px] h-[600px] max-h-[80vh] flex flex-col z-50"
          style={{
            bottom: `${messagesPosition.bottom}px`,
            right: `${messagesPosition.right}px`,
            maxHeight: `calc(100vh - ${messagesPosition.bottom + 20}px)`,
          }}
        >
          {selectedChat === null ? (
            <>
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-semibold">{t("messages")}</h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full" onClick={() => setIsOpen(false)}>
                  <span className="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </Button>
              </div>
              <Tabs defaultValue="recent" className="flex flex-col flex-1">
                <TabsList className="grid grid-cols-2 mx-4 mt-2">
                  <TabsTrigger value="recent" onClick={() => setActiveTab("recent")}>
                    {t("recent")}
                  </TabsTrigger>
                  <TabsTrigger value="unread" onClick={() => setActiveTab("unread")}>
                    {t("unread")}
                  </TabsTrigger>
                </TabsList>
                <div className="p-4">
                  <Input placeholder={t("search_messages")} className="bg-gray-50" />
                </div>
                <TabsContent value="recent" className="flex-1 overflow-auto m-0">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${message.unread ? "bg-blue-50" : ""}`}
                      onClick={() => setSelectedChat(message.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarImage src={message.avatar || undefined} />
                          <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <p className="font-medium truncate">{message.sender}</p>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{message.time}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{message.message}</p>
                        </div>
                        {message.unread && <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="unread" className="flex-1 overflow-auto m-0">
                  {messages
                    .filter((m) => m.unread)
                    .map((message) => (
                      <div
                        key={message.id}
                        className="p-4 border-b hover:bg-gray-50 cursor-pointer bg-blue-50"
                        onClick={() => setSelectedChat(message.id)}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={message.avatar || undefined} />
                            <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline">
                              <p className="font-medium truncate">{message.sender}</p>
                              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{message.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 truncate">{message.message}</p>
                          </div>
                          <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
                        </div>
                      </div>
                    ))}
                </TabsContent>
              </Tabs>
              <div className="border-t p-3 flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <span className="sr-only">{t("add_attachment")}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M12 5v14"></path>
                    <path d="M5 12h14"></path>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <span className="sr-only">{t("video_call")}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="m22 8-6 4 6 4V8Z"></path>
                    <rect width="14" height="12" x="2" y="6" rx="2" ry="2"></rect>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <span className="sr-only">{t("voice_call")}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <span className="sr-only">{t("notifications")}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                  </svg>
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 border-b flex items-center">
                <Button variant="ghost" size="icon" className="mr-2" onClick={() => setSelectedChat(null)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                </Button>
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src="/avatars/sarah-chen.jpg" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">Sarah Chen</p>
                    <p className="text-xs text-gray-500">{t("online")}</p>
                  </div>
                </div>
                <div className="ml-auto flex">
                  <Button variant="ghost" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="m22 8-6 4 6 4V8Z"></path>
                      <rect width="14" height="12" x="2" y="6" rx="2" ry="2"></rect>
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 rounded-full ml-1"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-auto p-4 space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isMine ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] ${msg.isMine ? "bg-blue-500 text-white rounded-tl-lg rounded-tr-lg rounded-bl-lg" : "bg-gray-100 rounded-tl-lg rounded-tr-lg rounded-br-lg"} p-3`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.isMine ? "text-blue-100" : "text-gray-500"}`}>{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t p-3">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M12 5v14"></path>
                      <path d="M5 12h14"></path>
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" x2="12" y1="3" y2="15"></line>
                    </svg>
                  </Button>
                  <div className="relative flex-1">
                    <textarea
                      className="w-full border rounded-lg pl-3 pr-10 py-2 resize-none h-10 min-h-[40px] max-h-[120px] text-sm"
                      placeholder={t("type_message")}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      style={{ paddingTop: "8px" }}
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1 text-gray-400 hover:text-gray-600"
                      onClick={handleSendMessage}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="m22 2-7 20-4-9-9-4Z"></path>
                        <path d="M22 2 11 13"></path>
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
