"use client"

import { useParams, useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Building } from "lucide-react"

export default function MemberProfilePage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const { t, language } = useLanguage()
  const [member, setMember] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Данные о сотрудниках
  const teamMembers = [
    {
      id: "1",
      name: "Sarah Anderson",
      role: language === "ru" ? "Руководитель клуба" : "Club Leader",
      email: "s.anderson@loovis.com",
      phone: "+1 (555) 123-4567",
      location: language === "ru" ? "LOOV 1, Москва" : "LOOV 1, Moscow",
      joinDate: "15.03.2023",
      avatar: "/avatars/sarah-anderson.jpg",
      department: language === "ru" ? "Управление" : "Management",
      bio:
        language === "ru"
          ? "Опытный руководитель с более чем 8-летним стажем в оптическом ритейле. Специализируется на развитии команды и улучшении клиентского опыта."
          : "Experienced leader with over 8 years in optical retail. Specializes in team development and improving customer experience.",
      skills: [
        language === "ru" ? "Управление персоналом" : "Personnel Management",
        language === "ru" ? "Стратегическое планирование" : "Strategic Planning",
        language === "ru" ? "Анализ продаж" : "Sales Analysis",
        language === "ru" ? "Обучение персонала" : "Staff Training",
        language === "ru" ? "Работа с клиентами" : "Customer Relations",
      ],
      performance: {
        sales: { value: "$84,254", change: "+8.2%", target: "$90,000" },
        team: { value: "4.8/5.0", change: "+0.3", target: "4.5/5.0" },
        customers: { value: "96%", change: "+4%", target: "90%" },
      },
      schedule: [
        { day: language === "ru" ? "Понедельник" : "Monday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Вторник" : "Tuesday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Среда" : "Wednesday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Четверг" : "Thursday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Пятница" : "Friday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Суббота" : "Saturday", hours: "-" },
        { day: language === "ru" ? "Воскресенье" : "Sunday", hours: "-" },
      ],
      tasks: [
        {
          title: language === "ru" ? "Ежемесячный отчет по продажам" : "Monthly Sales Report",
          status: language === "ru" ? "В процессе" : "In Progress",
          dueDate: "25.03.2025",
        },
        {
          title: language === "ru" ? "Обучение новых сотрудников" : "New Staff Training",
          status: language === "ru" ? "Запланировано" : "Planned",
          dueDate: "30.03.2025",
        },
        {
          title: language === "ru" ? "Ревизия товарных запасов" : "Inventory Audit",
          status: language === "ru" ? "Завершено" : "Completed",
          dueDate: "15.03.2025",
        },
      ],
    },
    {
      id: "2",
      name: "Alex Johnson",
      role: language === "ru" ? "Старший менеджер" : "Senior Manager",
      email: "a.johnson@loovis.com",
      phone: "+1 (555) 234-5678",
      location: language === "ru" ? "LOOV 2, Санкт-Петербург" : "LOOV 2, Saint Petersburg",
      joinDate: "05.01.2023",
      avatar: "/avatars/alex-johnson.jpg",
      department: language === "ru" ? "Продажи" : "Sales",
      bio:
        language === "ru"
          ? "Специалист по продажам с 5-летним опытом работы в оптической индустрии. Отличные коммуникативные навыки и ориентация на результат."
          : "Sales specialist with 5 years of experience in the optical industry. Excellent communication skills and results-oriented.",
      skills: [
        language === "ru" ? "Переговоры" : "Negotiation",
        language === "ru" ? "Холодные звонки" : "Cold Calling",
        language === "ru" ? "CRM" : "CRM",
        language === "ru" ? "Презентации" : "Presentations",
      ],
      performance: {
        sales: { value: "$65,321", change: "+12.7%", target: "$70,000" },
        team: { value: "4.6/5.0", change: "+0.2", target: "4.5/5.0" },
        customers: { value: "92%", change: "+3%", target: "90%" },
      },
      schedule: [
        { day: language === "ru" ? "Понедельник" : "Monday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Вторник" : "Tuesday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Среда" : "Wednesday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Четверг" : "Thursday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Пятница" : "Friday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Суббота" : "Saturday", hours: "-" },
        { day: language === "ru" ? "Воскресенье" : "Sunday", hours: "-" },
      ],
      tasks: [
        {
          title: language === "ru" ? "Встреча с клиентом" : "Client Meeting",
          status: language === "ru" ? "Запланировано" : "Planned",
          dueDate: "22.03.2025",
        },
        {
          title: language === "ru" ? "Подготовка презентации" : "Presentation Preparation",
          status: language === "ru" ? "В процессе" : "In Progress",
          dueDate: "24.03.2025",
        },
      ],
    },
    {
      id: "3",
      name: "Mike Chen",
      role: language === "ru" ? "Старший мастер" : "Senior Crafter",
      email: "m.chen@loovis.com",
      phone: "+1 (555) 345-6789",
      location: language === "ru" ? "LOOV 3, Казань" : "LOOV 3, Kazan",
      joinDate: "10.02.2023",
      avatar: "/avatars/mike-chen.jpg",
      department: language === "ru" ? "Производство" : "Production",
      bio:
        language === "ru"
          ? "Опытный мастер с 10-летним стажем в оптической индустрии. Специализируется на изготовлении и ремонте очков."
          : "Experienced craftsman with 10 years in the optical industry. Specializes in eyeglasses manufacturing and repair.",
      skills: [
        language === "ru" ? "Изготовление очков" : "Eyeglasses Manufacturing",
        language === "ru" ? "Ремонт оправ" : "Frame Repair",
        language === "ru" ? "Контроль качества" : "Quality Control",
        language === "ru" ? "Обучение персонала" : "Staff Training",
      ],
      performance: {
        sales: { value: "$45,678", change: "+5.3%", target: "$50,000" },
        team: { value: "4.7/5.0", change: "+0.2", target: "4.5/5.0" },
        customers: { value: "98%", change: "+2%", target: "95%" },
      },
      schedule: [
        { day: language === "ru" ? "Понедельник" : "Monday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Вторник" : "Tuesday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Среда" : "Wednesday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Четверг" : "Thursday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Пятница" : "Friday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Суббота" : "Saturday", hours: "-" },
        { day: language === "ru" ? "Воскресенье" : "Sunday", hours: "-" },
      ],
      tasks: [
        {
          title: language === "ru" ? "Обновление оборудования" : "Equipment Update",
          status: language === "ru" ? "В процессе" : "In Progress",
          dueDate: "20.03.2025",
        },
        {
          title: language === "ru" ? "Обучение новых мастеров" : "Training New Crafters",
          status: language === "ru" ? "Запланировано" : "Planned",
          dueDate: "05.04.2025",
        },
      ],
    },
    {
      id: "4",
      name: "Dr. Emma White",
      role: language === "ru" ? "Старший оптометрист" : "Senior Optometrist",
      email: "e.white@loovis.com",
      phone: "+1 (555) 456-7890",
      location: language === "ru" ? "LOOV 1, Москва" : "LOOV 1, Moscow",
      joinDate: "20.04.2023",
      avatar: "/avatars/emma-white.jpg",
      department: language === "ru" ? "Медицина" : "Medical",
      bio:
        language === "ru"
          ? "Сертифицированный оптометрист с 7-летним опытом работы. Специализируется на диагностике и коррекции зрения."
          : "Certified optometrist with 7 years of experience. Specializes in vision diagnostics and correction.",
      skills: [
        language === "ru" ? "Диагностика зрения" : "Vision Diagnostics",
        language === "ru" ? "Подбор очков" : "Eyeglasses Fitting",
        language === "ru" ? "Контактные линзы" : "Contact Lenses",
        language === "ru" ? "Лечение глазных заболеваний" : "Eye Disease Treatment",
      ],
      performance: {
        sales: { value: "$32,145", change: "+15.2%", target: "$35,000" },
        team: { value: "4.5/5.0", change: "+0.1", target: "4.5/5.0" },
        customers: { value: "90%", change: "+5%", target: "85%" },
      },
      schedule: [
        { day: language === "ru" ? "Понедельник" : "Monday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Вторник" : "Tuesday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Среда" : "Wednesday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Четверг" : "Thursday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Пятница" : "Friday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Суббота" : "Saturday", hours: "-" },
        { day: language === "ru" ? "Воскресенье" : "Sunday", hours: "-" },
      ],
      tasks: [
        {
          title: language === "ru" ? "Обновление медицинского оборудования" : "Medical Equipment Update",
          status: language === "ru" ? "В процессе" : "In Progress",
          dueDate: "15.03.2025",
        },
        {
          title: language === "ru" ? "Обучение новым методикам" : "Training on New Methods",
          status: language === "ru" ? "Запланировано" : "Planned",
          dueDate: "30.03.2025",
        },
      ],
    },
    {
      id: "5",
      name: "Sarah Miller",
      role: language === "ru" ? "Менеджер по обслуживанию" : "Care Manager",
      email: "s.miller@loovis.com",
      phone: "+1 (555) 567-8901",
      location: language === "ru" ? "LOOV 2, Санкт-Петербург" : "LOOV 2, Saint Petersburg",
      joinDate: "15.05.2023",
      avatar: "/avatars/sarah-miller.jpg",
      department: language === "ru" ? "Обслуживание клиентов" : "Customer Service",
      bio:
        language === "ru"
          ? "Опытный менеджер по обслуживанию клиентов с 5-летним стажем. Специализируется на улучшении клиентского опыта и решении проблем."
          : "Experienced customer service manager with 5 years of experience. Specializes in improving customer experience and problem-solving.",
      skills: [
        language === "ru" ? "Обслуживание клиентов" : "Customer Service",
        language === "ru" ? "Решение проблем" : "Problem Solving",
        language === "ru" ? "Управление персоналом" : "Personnel Management",
        language === "ru" ? "CRM" : "CRM",
      ],
      performance: {
        sales: { value: "$28,750", change: "+10.5%", target: "$30,000" },
        team: { value: "4.8/5.0", change: "+0.3", target: "4.5/5.0" },
        customers: { value: "95%", change: "+7%", target: "90%" },
      },
      schedule: [
        { day: language === "ru" ? "Понедельник" : "Monday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Вторник" : "Tuesday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Среда" : "Wednesday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Четверг" : "Thursday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Пятница" : "Friday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Суббота" : "Saturday", hours: "-" },
        { day: language === "ru" ? "Воскресенье" : "Sunday", hours: "-" },
      ],
      tasks: [
        {
          title: language === "ru" ? "Улучшение процесса обслуживания" : "Service Process Improvement",
          status: language === "ru" ? "В процессе" : "In Progress",
          dueDate: "10.03.2025",
        },
        {
          title: language === "ru" ? "Обучение персонала" : "Staff Training",
          status: language === "ru" ? "Запланировано" : "Planned",
          dueDate: "20.03.2025",
        },
      ],
    },
    {
      id: "6",
      name: "James Wilson",
      role: language === "ru" ? "Мастер" : "Crafter",
      email: "j.wilson@loovis.com",
      phone: "+1 (555) 678-9012",
      location: language === "ru" ? "LOOV 3, Казань" : "LOOV 3, Kazan",
      joinDate: "01.06.2023",
      avatar: "/avatars/james-wilson.jpg",
      department: language === "ru" ? "Производство" : "Production",
      bio:
        language === "ru"
          ? "Опытный мастер с 3-летним стажем в оптической индустрии. Специализируется на изготовлении и ремонте очков."
          : "Experienced craftsman with 3 years in the optical industry. Specializes in eyeglasses manufacturing and repair.",
      skills: [
        language === "ru" ? "Изготовление очков" : "Eyeglasses Manufacturing",
        language === "ru" ? "Ремонт оправ" : "Frame Repair",
        language === "ru" ? "Контроль качества" : "Quality Control",
      ],
      performance: {
        sales: { value: "$22,500", change: "+8.2%", target: "$25,000" },
        team: { value: "4.3/5.0", change: "+0.1", target: "4.5/5.0" },
        customers: { value: "92%", change: "+4%", target: "90%" },
      },
      schedule: [
        { day: language === "ru" ? "Понедельник" : "Monday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Вторник" : "Tuesday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Среда" : "Wednesday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Четверг" : "Thursday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Пятница" : "Friday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Суббота" : "Saturday", hours: "-" },
        { day: language === "ru" ? "Воскресенье" : "Sunday", hours: "-" },
      ],
      tasks: [
        {
          title: language === "ru" ? "Ремонт оборудования" : "Equipment Repair",
          status: language === "ru" ? "В процессе" : "In Progress",
          dueDate: "05.03.2025",
        },
        {
          title: language === "ru" ? "Инвентаризация" : "Inventory",
          status: language === "ru" ? "Запланировано" : "Planned",
          dueDate: "15.03.2025",
        },
      ],
    },
    {
      id: "7",
      name: "Dr. Anna Kim",
      role: language === "ru" ? "Офтальмолог" : "Ophthalmologist",
      email: "a.kim@loovis.com",
      phone: "+1 (555) 789-0123",
      location: language === "ru" ? "LOOV 1, Москва" : "LOOV 1, Moscow",
      joinDate: "15.07.2023",
      avatar: "/avatars/anna-kim.jpg",
      department: language === "ru" ? "Медицина" : "Medical",
      bio:
        language === "ru"
          ? "Сертифицированный офтальмолог с 10-летним опытом работы. Специализируется на диагностике и лечении глазных заболеваний."
          : "Certified ophthalmologist with 10 years of experience. Specializes in diagnosing and treating eye diseases.",
      skills: [
        language === "ru" ? "Диагностика глазных заболеваний" : "Eye Disease Diagnostics",
        language === "ru" ? "Лечение глазных заболеваний" : "Eye Disease Treatment",
        language === "ru" ? "Хирургия глаза" : "Eye Surgery",
        language === "ru" ? "Лазерная коррекция зрения" : "Laser Vision Correction",
      ],
      performance: {
        sales: { value: "$65,000", change: "+12.3%", target: "$70,000" },
        team: { value: "4.9/5.0", change: "+0.4", target: "4.5/5.0" },
        customers: { value: "98%", change: "+3%", target: "95%" },
      },
      schedule: [
        { day: language === "ru" ? "Понедельник" : "Monday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Вторник" : "Tuesday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Среда" : "Wednesday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Четверг" : "Thursday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Пятница" : "Friday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Суббота" : "Saturday", hours: "-" },
        { day: language === "ru" ? "Воскресенье" : "Sunday", hours: "-" },
      ],
      tasks: [
        {
          title: language === "ru" ? "Консультации пациентов" : "Patient Consultations",
          status: language === "ru" ? "В процессе" : "In Progress",
          dueDate: "Ongoing",
        },
        {
          title: language === "ru" ? "Обучение новым методикам" : "Training on New Methods",
          status: language === "ru" ? "Запланировано" : "Planned",
          dueDate: "25.03.2025",
        },
      ],
    },
    {
      id: "8",
      name: "Robert Lee",
      role: language === "ru" ? "Оптометрист" : "Optometrist",
      email: "r.lee@loovis.com",
      phone: "+1 (555) 890-1234",
      location: language === "ru" ? "LOOV 2, Санкт-Петербург" : "LOOV 2, Saint Petersburg",
      joinDate: "01.08.2023",
      avatar: "/avatars/robert-lee.jpg",
      department: language === "ru" ? "Медицина" : "Medical",
      bio:
        language === "ru"
          ? "Сертифицированный оптометрист с 5-летним опытом работы. Специализируется на диагностике и коррекции зрения."
          : "Certified optometrist with 5 years of experience. Specializes in vision diagnostics and correction.",
      skills: [
        language === "ru" ? "Диагностика зрения" : "Vision Diagnostics",
        language === "ru" ? "Подбор очков" : "Eyeglasses Fitting",
        language === "ru" ? "Контактные линзы" : "Contact Lenses",
        language === "ru" ? "Компьютерная диагностика" : "Computer Diagnostics",
      ],
      performance: {
        sales: { value: "$35,750", change: "+7.8%", target: "$40,000" },
        team: { value: "4.6/5.0", change: "+0.2", target: "4.5/5.0" },
        customers: { value: "94%", change: "+5%", target: "90%" },
      },
      schedule: [
        { day: language === "ru" ? "Понедельник" : "Monday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Вторник" : "Tuesday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Среда" : "Wednesday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Четверг" : "Thursday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Пятница" : "Friday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Суббота" : "Saturday", hours: "-" },
        { day: language === "ru" ? "Воскресенье" : "Sunday", hours: "-" },
      ],
      tasks: [
        {
          title: language === "ru" ? "Проверка зрения" : "Vision Examinations",
          status: language === "ru" ? "В процессе" : "In Progress",
          dueDate: "Ongoing",
        },
        {
          title: language === "ru" ? "Обновление оборудования" : "Equipment Update",
          status: language === "ru" ? "Запланировано" : "Planned",
          dueDate: "10.04.2025",
        },
      ],
    },
    // Добавляем сотрудников для similarPositions
    {
      id: "21",
      name: "Michael Roberts",
      role: language === "ru" ? "Старший менеджер" : "Senior Manager",
      email: "m.roberts@loovis.com",
      phone: "+1 (555) 901-2345",
      location: language === "ru" ? "LOOV 2, Санкт-Петербург" : "LOOV 2, Saint Petersburg",
      joinDate: "15.02.2023",
      avatar: "/avatars/michael-roberts.jpg",
      department: language === "ru" ? "Продажи" : "Sales",
      bio:
        language === "ru"
          ? "Опытный менеджер по продажам с 7-летним стажем в оптической индустрии. Специализируется на развитии команды и увеличении продаж."
          : "Experienced sales manager with 7 years in the optical industry. Specializes in team development and sales growth.",
      skills: [
        language === "ru" ? "Управление продажами" : "Sales Management",
        language === "ru" ? "Развитие команды" : "Team Development",
        language === "ru" ? "Анализ рынка" : "Market Analysis",
        language === "ru" ? "CRM" : "CRM",
      ],
      performance: {
        sales: { value: "$58,900", change: "+9.5%", target: "$60,000" },
        team: { value: "4.7/5.0", change: "+0.2", target: "4.5/5.0" },
        customers: { value: "93%", change: "+4%", target: "90%" },
      },
      schedule: [
        { day: language === "ru" ? "Понедельник" : "Monday", hours: "12:00 - 21:00" },
        { day: language === "ru" ? "Вторник" : "Tuesday", hours: "12:00 - 21:00" },
        { day: language === "ru" ? "Среда" : "Wednesday", hours: "12:00 - 21:00" },
        { day: language === "ru" ? "Четверг" : "Thursday", hours: "12:00 - 21:00" },
        { day: language === "ru" ? "Пятница" : "Friday", hours: "12:00 - 21:00" },
        { day: language === "ru" ? "Суббота" : "Saturday", hours: "-" },
        { day: language === "ru" ? "Воскресенье" : "Sunday", hours: "-" },
      ],
      tasks: [
        {
          title: language === "ru" ? "Анализ продаж" : "Sales Analysis",
          status: language === "ru" ? "В процессе" : "In Progress",
          dueDate: "18.03.2025",
        },
        {
          title: language === "ru" ? "Обучение персонала" : "Staff Training",
          status: language === "ru" ? "Запланировано" : "Planned",
          dueDate: "25.03.2025",
        },
      ],
    },
    {
      id: "31",
      name: "Lisa Wong",
      role: language === "ru" ? "Старший мастер" : "Senior Crafter",
      email: "l.wong@loovis.com",
      phone: "+1 (555) 012-3456",
      location: language === "ru" ? "LOOV 3, Казань" : "LOOV 3, Kazan",
      joinDate: "01.03.2023",
      avatar: "/avatars/lisa-wong.jpg",
      department: language === "ru" ? "Производство" : "Production",
      bio:
        language === "ru"
          ? "Опытный мастер с 8-летним стажем в оптической индустрии. Специализируется на изготовлении и ремонте очков."
          : "Experienced craftsman with 8 years in the optical industry. Specializes in eyeglasses manufacturing and repair.",
      skills: [
        language === "ru" ? "Изготовление очков" : "Eyeglasses Manufacturing",
        language === "ru" ? "Ремонт оправ" : "Frame Repair",
        language === "ru" ? "Контроль качества" : "Quality Control",
        language === "ru" ? "Обучение персонала" : "Staff Training",
      ],
      performance: {
        sales: { value: "$42,500", change: "+6.2%", target: "$45,000" },
        team: { value: "4.8/5.0", change: "+0.3", target: "4.5/5.0" },
        customers: { value: "97%", change: "+2%", target: "95%" },
      },
      schedule: [
        { day: language === "ru" ? "Понедельник" : "Monday", hours: "12:00 - 21:00" },
        { day: language === "ru" ? "Вторник" : "Tuesday", hours: "12:00 - 21:00" },
        { day: language === "ru" ? "Среда" : "Wednesday", hours: "12:00 - 21:00" },
        { day: language === "ru" ? "Четверг" : "Thursday", hours: "12:00 - 21:00" },
        { day: language === "ru" ? "Пятница" : "Friday", hours: "12:00 - 21:00" },
        { day: language === "ru" ? "Суббота" : "Saturday", hours: "-" },
        { day: language === "ru" ? "Воскресенье" : "Sunday", hours: "-" },
      ],
      tasks: [
        {
          title: language === "ru" ? "Обновление оборудования" : "Equipment Update",
          status: language === "ru" ? "В процессе" : "In Progress",
          dueDate: "15.03.2025",
        },
        {
          title: language === "ru" ? "Обучение новых мастеров" : "Training New Crafters",
          status: language === "ru" ? "Запланировано" : "Planned",
          dueDate: "01.04.2025",
        },
      ],
    },
    {
      id: "51",
      name: "David Roberts",
      role: language === "ru" ? "Менеджер по обслуживанию" : "Care Manager",
      email: "d.roberts@loovis.com",
      phone: "+1 (555) 123-4567",
      location: language === "ru" ? "LOOV 2, Санкт-Петербург" : "LOOV 2, Saint Petersburg",
      joinDate: "01.06.2023",
      avatar: "/avatars/david-roberts.jpg",
      department: language === "ru" ? "Обслуживание клиентов" : "Customer Service",
      bio:
        language === "ru"
          ? "Опытный менеджер по обслуживанию клиентов с 4-летним стажем. Специализируется на улучшении клиентского опыта и решении проблем."
          : "Experienced customer service manager with 4 years of experience. Specializes in improving customer experience and problem-solving.",
      skills: [
        language === "ru" ? "Обслуживание клиентов" : "Customer Service",
        language === "ru" ? "Решение проблем" : "Problem Solving",
        language === "ru" ? "Управление персоналом" : "Personnel Management",
        language === "ru" ? "CRM" : "CRM",
      ],
      performance: {
        sales: { value: "$26,500", change: "+8.2%", target: "$30,000" },
        team: { value: "4.6/5.0", change: "+0.1", target: "4.5/5.0" },
        customers: { value: "94%", change: "+5%", target: "90%" },
      },
      schedule: [
        { day: language === "ru" ? "Понедельник" : "Monday", hours: "12:00 - 21:00" },
        { day: language === "ru" ? "Вторник" : "Tuesday", hours: "12:00 - 21:00" },
        { day: language === "ru" ? "Среда" : "Wednesday", hours: "12:00 - 21:00" },
        { day: language === "ru" ? "Четверг" : "Thursday", hours: "12:00 - 21:00" },
        { day: language === "ru" ? "Пятница" : "Friday", hours: "12:00 - 21:00" },
        { day: language === "ru" ? "Суббота" : "Saturday", hours: "-" },
        { day: language === "ru" ? "Воскресенье" : "Sunday", hours: "-" },
      ],
      tasks: [
        {
          title: language === "ru" ? "Улучшение процесса обслуживания" : "Service Process Improvement",
          status: language === "ru" ? "В процессе" : "In Progress",
          dueDate: "12.03.2025",
        },
        {
          title: language === "ru" ? "Обучение персонала" : "Staff Training",
          status: language === "ru" ? "Запланировано" : "Planned",
          dueDate: "22.03.2025",
        },
      ],
    },
    {
      id: "11", // Изменено с "1" на "11"
      name: "John Anderson",
      role: language === "ru" ? "Старший менеджер" : "Senior Manager",
      email: "j.anderson@loovis.com",
      phone: "+1 (555) 234-5678",
      location: language === "ru" ? "LOOV 1, Москва" : "LOOV 1, Moscow",
      joinDate: "10.01.2023",
      avatar: "/avatars/alex-johnson.jpg",
      department: language === "ru" ? "Управление" : "Management",
      bio:
        language === "ru"
          ? "Опытный менеджер с более чем 10-летним стажем в оптическом ритейле. Специализируется на стратегическом планировании и развитии бизнеса."
          : "Experienced manager with over 10 years in optical retail. Specializes in strategic planning and business development.",
      skills: [
        language === "ru" ? "Стратегическое планирование" : "Strategic Planning",
        language === "ru" ? "Управление персоналом" : "Personnel Management",
        language === "ru" ? "Финансовый анализ" : "Financial Analysis",
        language === "ru" ? "Развитие бизнеса" : "Business Development",
      ],
      performance: {
        sales: { value: "$95,750", change: "+15.2%", target: "$100,000" },
        team: { value: "4.9/5.0", change: "+0.4", target: "4.5/5.0" },
        customers: { value: "97%", change: "+5%", target: "90%" },
      },
      schedule: [
        { day: language === "ru" ? "Понедельник" : "Monday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Вторник" : "Tuesday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Среда" : "Wednesday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Четверг" : "Thursday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Пятница" : "Friday", hours: "9:00 - 18:00" },
        { day: language === "ru" ? "Суббота" : "Saturday", hours: "-" },
        { day: language === "ru" ? "Воскресенье" : "Sunday", hours: "-" },
      ],
      tasks: [
        {
          title: language === "ru" ? "Стратегическое планирование" : "Strategic Planning",
          status: language === "ru" ? "В процессе" : "In Progress",
          dueDate: "20.03.2025",
        },
        {
          title: language === "ru" ? "Анализ финансовых показателей" : "Financial Analysis",
          status: language === "ru" ? "Запланировано" : "Planned",
          dueDate: "25.03.2025",
        },
        {
          title: language === "ru" ? "Обучение руководителей" : "Management Training",
          status: language === "ru" ? "Завершено" : "Completed",
          dueDate: "10.03.2025",
        },
      ],
    },
  ]

  useEffect(() => {
    if (id) {
      // Преобразуем id в строку для корректного сравнения
      const idStr = id.toString()
      console.log("Looking for member with ID:", idStr)
      console.log(
        "Available IDs:",
        teamMembers.map((m) => m.id),
      )
      const foundMember = teamMembers.find((m) => m.id === idStr)
      if (foundMember) {
        console.log("Found member:", foundMember.name)
        setMember(foundMember)
      } else {
        console.error(`Member with ID ${idStr} not found`)
      }
      setLoading(false)
    }
  }, [id, language])

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>
  }

  if (!member) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">{language === "ru" ? "Сотрудник не найден" : "Employee Not Found"}</h1>
        <Button onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === "ru" ? "Вернуться назад" : "Go Back"}
        </Button>
      </div>
    )
  }

  return (
    <div className="container py-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        {language === "ru" ? "Вернуться к команде" : "Back to Team"}
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Профиль */}
        <Card className="col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold">{member.name}</h2>
              <p className="text-gray-500 mb-2">{member.role}</p>
              <Badge variant="outline">{member.department}</Badge>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span>{member.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span>{member.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                <span>
                  {language === "ru" ? "Присоединился: " : "Joined: "}
                  {member.joinDate}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Основная информация */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          {/* Биография */}
          <Card>
            <CardHeader>
              <CardTitle>{language === "ru" ? "О сотруднике" : "About"}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{member.bio}</p>
            </CardContent>
          </Card>

          {/* Навыки */}
          <Card>
            <CardHeader>
              <CardTitle>{language === "ru" ? "Навыки" : "Skills"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Показатели эффективности */}
          <Card>
            <CardHeader>
              <CardTitle>{language === "ru" ? "Показатели эффективности" : "Performance Metrics"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      {language === "ru" ? "Продажи" : "Sales"}: {member.performance.sales.value}{" "}
                      <span className="text-green-600">{member.performance.sales.change}</span>
                    </span>
                    <span className="text-sm text-gray-500">
                      {language === "ru" ? "Цель" : "Target"}: {member.performance.sales.target}
                    </span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      {language === "ru" ? "Работа в команде" : "Team Work"}: {member.performance.team.value}{" "}
                      <span className="text-green-600">{member.performance.team.change}</span>
                    </span>
                    <span className="text-sm text-gray-500">
                      {language === "ru" ? "Цель" : "Target"}: {member.performance.team.target}
                    </span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">
                      {language === "ru" ? "Удовлетворенность клиентов" : "Customer Satisfaction"}:{" "}
                      {member.performance.customers.value}{" "}
                      <span className="text-green-600">{member.performance.customers.change}</span>
                    </span>
                    <span className="text-sm text-gray-500">
                      {language === "ru" ? "Цель" : "Target"}: {member.performance.customers.target}
                    </span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* График работы */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>{language === "ru" ? "График работы" : "Work Schedule"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {member.schedule.map((item, index) => (
                <div key={index} className="flex justify-between py-1 border-b last:border-0">
                  <span className="font-medium">{item.day}</span>
                  <span>{item.hours}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Текущие задачи */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>{language === "ru" ? "Текущие задачи" : "Current Tasks"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {member.tasks.map((task, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-medium">{task.title}</h4>
                    <Badge
                      variant={
                        task.status === (language === "ru" ? "Завершено" : "Completed")
                          ? "success"
                          : task.status === (language === "ru" ? "В процессе" : "In Progress")
                            ? "default"
                            : "secondary"
                      }
                    >
                      {task.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-gray-500">
                    {language === "ru" ? "Срок: " : "Due date: "}
                    {task.dueDate}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* История активности */}
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>{language === "ru" ? "История активности" : "Activity History"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="min-w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Building className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">
                    {language === "ru" ? "Перевод в новое подразделение" : "Transferred to a new department"}
                  </p>
                  <p className="text-sm text-gray-500">10.03.2025</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="min-w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">
                    {language === "ru" ? "Получил квартальную премию" : "Received quarterly bonus"}
                  </p>
                  <p className="text-sm text-gray-500">01.03.2025</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="min-w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Building className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">
                    {language === "ru"
                      ? "Успешно завершил обучение по новой программе"
                      : "Successfully completed training on the new program"}
                  </p>
                  <p className="text-sm text-gray-500">15.02.2025</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
