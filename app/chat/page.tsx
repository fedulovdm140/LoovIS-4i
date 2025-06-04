"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Send, Paperclip, Mic, ImageIcon, File, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface Message {
  id: number
  text: string
  sender: "user" | "assistant"
  timestamp: Date
  status: "sending" | "sent" | "read" | "error"
}

export default function ChatPage() {
  const { t } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Добро пожаловать в чат поддержки LOOV! Чем я могу вам помочь сегодня?",
      sender: "assistant",
      timestamp: new Date(Date.now() - 60000),
      status: "read",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Автоскролл к последнему сообщению
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Фокус на поле ввода при загрузке
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Добавляем сообщение пользователя
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
      status: "sending",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Имитация ответа от ассистента
    setTimeout(() => {
      // Обновляем статус сообщения пользователя
      setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "sent" } : msg)))

      // Добавляем ответ ассистента
      const assistantMessage: Message = {
        id: Date.now() + 1,
        text: "Спасибо за ваше сообщение! Я проверю информацию и скоро отвечу вам.",
        sender: "assistant",
        timestamp: new Date(),
        status: "sent",
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Обновляем статус до "прочитано" через 2 секунды
      setTimeout(() => {
        setMessages((prev) => prev.map((msg) => (msg.id === userMessage.id ? { ...msg, status: "read" } : msg)))
      }, 2000)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-112px)] lg:max-h-[calc(100vh-64px)]">
      {/* Заголовок чата */}
      <div className="p-4 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src="/avatars/team-avatar.jpg" />
            <AvatarFallback>LS</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-lg">LOOV Support</h1>
            <p className="text-sm text-green-600">{t("online")}</p>
          </div>
        </div>
      </div>

      {/* Сообщения */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-slide-up`}
          >
            {message.sender === "assistant" && (
              <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                <AvatarImage src="/avatars/team-avatar.jpg" />
                <AvatarFallback>LS</AvatarFallback>
              </Avatar>
            )}
            <div className="max-w-[80%]">
              <div
                className={`p-3 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-white border rounded-tl-none"
                }`}
              >
                <p className="text-base whitespace-pre-wrap">{message.text}</p>
              </div>
              <div
                className={`flex items-center mt-1 text-xs ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <span className={message.sender === "user" ? "text-gray-500" : "text-gray-500"}>
                  {formatTime(message.timestamp)}
                </span>
                {message.sender === "user" && (
                  <span className="ml-2">
                    {message.status === "sending" && "⏳"}
                    {message.status === "sent" && "✓"}
                    {message.status === "read" && "✓✓"}
                    {message.status === "error" && "⚠️"}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Ввод сообщения */}
      <div className="p-4 border-t bg-white relative">
        {isAttachmentMenuOpen && (
          <Card className="absolute bottom-full left-0 right-0 mb-2 p-3 animate-fade-in">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{t("attach_file")}</h3>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full"
                onClick={() => setIsAttachmentMenuOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <Button variant="outline" className="flex flex-col items-center p-3 h-auto">
                <ImageIcon className="h-6 w-6 mb-1 text-blue-600" />
                <span className="text-xs">{t("image")}</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-3 h-auto">
                <File className="h-6 w-6 mb-1 text-blue-600" />
                <span className="text-xs">{t("document")}</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-3 h-auto">
                <Paperclip className="h-6 w-6 mb-1 text-blue-600" />
                <span className="text-xs">{t("file")}</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-3 h-auto">
                <Mic className="h-6 w-6 mb-1 text-blue-600" />
                <span className="text-xs">{t("audio")}</span>
              </Button>
            </div>
          </Card>
        )}

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-10 w-10 flex-shrink-0"
            onClick={() => setIsAttachmentMenuOpen(!isAttachmentMenuOpen)}
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <div className="relative flex-1">
            <Input
              ref={inputRef}
              type="text"
              placeholder={t("type_message")}
              className="pr-10 py-6 text-base rounded-full bg-gray-100 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button
            variant={inputValue.trim() ? "default" : "ghost"}
            size="icon"
            className={`rounded-full h-10 w-10 flex-shrink-0 ${
              inputValue.trim() ? "bg-blue-600 hover:bg-blue-700" : ""
            }`}
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
