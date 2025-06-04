"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Определяем порядок задач для последовательного выполнения
const TASK_ORDER = [
  // Этап 1: Подготовка
  "task1",
  "task2",
  "task3",
  "task4",
  "task5",
  "task6",
  // Этап 2: Строительство
  "task7",
  "task8",
  "task9",
  "task10",
  "task11",
  "task12",
  "task13",
  "task14",
  "task15",
  "task16",
  "task17",
  // Этап 3: Подготовка к открытию
  "task18",
  "task19",
  "task20",
  "task21",
  "task22",
  "task23",
  // Этап 4: Запуск
  "task24",
  "task25",
  "task26",
  "task27",
  "task28",
]

// Определяем количество пунктов в чеклисте для каждой задачи
const CHECKLIST_LENGTHS: Record<string, number> = {
  task1: 5,
  task2: 7,
  task3: 6,
  task4: 6,
  task5: 5,
  task6: 5,
  task7: 5,
  task8: 5,
  task9: 5,
  task10: 5,
  task11: 5,
  task12: 5,
  task13: 5,
  task14: 5,
  task15: 5,
  task16: 5,
  task17: 5,
  task18: 5,
  task19: 5,
  task20: 5,
  task21: 5,
  task22: 5,
  task23: 5,
  task24: 5,
  task25: 5,
  task26: 5,
  task27: 5,
  task28: 5,
}

type ProgressContextType = {
  taskProgress: Record<string, number> // id задачи -> процент выполнения
  clubProgress: Record<string, number> // id клуба -> процент выполнения
  updateTaskChecklistItem: (clubId: string, taskId: string, itemIndex: number, checked: boolean) => void
  getTaskChecklist: (clubId: string, taskId: string) => boolean[]
  resetProgress: () => void // Функция для сброса прогресса
  setClubProgressAndTasks: (clubId: string, progress: number) => void // Новая функция для установки прогресса клуба
  currentTasks: string[] // Текущие задачи в работе
  getCurrentTasks: (clubId: string) => string[] // Функция для получения текущих задач
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export const ProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [taskProgress, setTaskProgress] = useState<Record<string, number>>({})
  const [clubProgress, setClubProgress] = useState<Record<string, number>>({})
  const [taskChecklists, setTaskChecklists] = useState<Record<string, Record<string, boolean[]>>>({})
  const [currentTasks, setCurrentTasks] = useState<string[]>([])
  const [initialized, setInitialized] = useState(false)

  // Загрузка данных при монтировании
  useEffect(() => {
    console.log("ProgressProvider mounted - initializing state")

    try {
      // Загружаем сохраненные данные из localStorage
      const savedTaskChecklists = localStorage.getItem("taskChecklists")
      const savedTaskProgress = localStorage.getItem("taskProgress")
      const savedClubProgress = localStorage.getItem("clubProgress")

      // Инициализируем состояние из localStorage или создаем предустановленные данные для club1
      let initialTaskChecklists = savedTaskChecklists ? JSON.parse(savedTaskChecklists) : {}
      const initialTaskProgress = savedTaskProgress ? JSON.parse(savedTaskProgress) : {}
      let initialClubProgress = savedClubProgress ? JSON.parse(savedClubProgress) : {}

      // Если нет сохраненных данных или нет данных для club1, создаем предустановленные данные
      if (!savedTaskChecklists || !initialTaskChecklists.club1) {
        // Создаем предустановленные данные для club1 с прогрессом 75%
        const club1Tasks: Record<string, boolean[]> = {}

        // Отмечаем все задачи в Этапе 1 и 2 как полностью выполненные
        for (let i = 0; i < 17; i++) {
          const taskId = TASK_ORDER[i]
          const checklistLength = CHECKLIST_LENGTHS[taskId]
          club1Tasks[taskId] = Array(checklistLength).fill(true)
          initialTaskProgress[taskId] = 100
        }

        // Отмечаем некоторые задачи в Этапе 3 как частично выполненные
        // task18 - полностью выполнена
        club1Tasks["task18"] = Array(CHECKLIST_LENGTHS["task18"]).fill(true)
        initialTaskProgress["task18"] = 100

        // task19 - полностью выполнена
        club1Tasks["task19"] = Array(CHECKLIST_LENGTHS["task19"]).fill(true)
        initialTaskProgress["task19"] = 100

        // task20 - полностью выполнена
        club1Tasks["task20"] = Array(CHECKLIST_LENGTHS["task20"]).fill(true)
        initialTaskProgress["task20"] = 100

        // task21 - частично выполнена (3 из 5)
        club1Tasks["task21"] = [true, true, true, false, false]
        initialTaskProgress["task21"] = 60

        // task22 - частично выполнена (2 из 5)
        club1Tasks["task22"] = [true, true, false, false, false]
        initialTaskProgress["task22"] = 40

        // task23 - не выполнена
        club1Tasks["task23"] = Array(CHECKLIST_LENGTHS["task23"]).fill(false)
        initialTaskProgress["task23"] = 0

        // Задачи Этапа 4 не выполнены
        for (let i = 23; i < 28; i++) {
          const taskId = TASK_ORDER[i]
          const checklistLength = CHECKLIST_LENGTHS[taskId]
          club1Tasks[taskId] = Array(checklistLength).fill(false)
          initialTaskProgress[taskId] = 0
        }

        // Добавляем данные для club1
        initialTaskChecklists = {
          ...initialTaskChecklists,
          club1: club1Tasks,
        }

        // Устанавливаем прогресс клуба
        initialClubProgress = {
          ...initialClubProgress,
          club1: 75,
        }
      }

      setTaskChecklists(initialTaskChecklists)
      setTaskProgress(initialTaskProgress)
      setClubProgress(initialClubProgress)

      console.log("Initial data loaded:", {
        checklists: initialTaskChecklists,
        taskProgress: initialTaskProgress,
        clubProgress: initialClubProgress,
      })

      setInitialized(true)
    } catch (error) {
      console.error("Error loading saved data:", error)
      // В случае ошибки инициализируем пустыми объектами
      setTaskChecklists({})
      setTaskProgress({})
      setClubProgress({})
      setInitialized(true)
    }
  }, [])

  // Получение чек-листа задачи
  const getTaskChecklist = (clubId: string, taskId: string): boolean[] => {
    console.log(`Getting checklist for task ${taskId} in club ${clubId}`)
    const clubTasks = taskChecklists[clubId] || {}
    const checklist = clubTasks[taskId] || []
    console.log(`Current checklist:`, checklist)
    return checklist
  }

  // Функция для получения количества пунктов в чеклисте
  const getTaskDataChecklistLength = (taskId: string): number => {
    return CHECKLIST_LENGTHS[taskId] || 5 // По умолчанию 5 пунктов
  }

  // Функция для расчета прогресса задачи
  const calculateTaskProgress = (checklist: boolean[], taskId: string): number => {
    if (!checklist || checklist.length === 0) return 0

    // Получаем количество пунктов в чеклисте из CHECKLIST_LENGTHS
    const totalItems = getTaskDataChecklistLength(taskId)

    // Считаем количество выполненных пунктов
    const completedItems = checklist.filter((item) => item).length

    return Math.round((completedItems / totalItems) * 100)
  }

  // Обновление чек-листа задачи
  const updateTaskChecklistItem = (clubId: string, taskId: string, itemIndex: number, checked: boolean) => {
    console.log(
      `Updating checklist item: clubId=${clubId}, taskId=${taskId}, itemIndex=${itemIndex}, checked=${checked}`,
    )

    // Обновляем чек-лист в состоянии
    setTaskChecklists((prev) => {
      // Получаем текущие задачи клуба или создаем пустой объект
      const clubTasks = prev[clubId] || {}

      // Получаем текущий чек-лист задачи или создаем пустой массив
      const taskChecklist = clubTasks[taskId] || []

      // Создаем новый чек-лист с обновленным значением
      const updatedChecklist = [...taskChecklist]

      // Расширяем чек-лист, если нужно
      while (updatedChecklist.length <= itemIndex) {
        updatedChecklist.push(false)
      }

      // Обновляем значение
      updatedChecklist[itemIndex] = checked

      console.log(`New checklist for task ${taskId}:`, updatedChecklist)

      // Создаем обновленные объекты
      const updatedClubTasks = {
        ...clubTasks,
        [taskId]: updatedChecklist,
      }

      const updatedTaskChecklists = {
        ...prev,
        [clubId]: updatedClubTasks,
      }

      // Сохраняем в localStorage
      localStorage.setItem("taskChecklists", JSON.stringify(updatedTaskChecklists))

      // Немедленно обновляем прогресс задачи
      const taskProgress = calculateTaskProgress(updatedChecklist, taskId)
      updateTaskProgress(taskId, taskProgress)

      // Обновляем прогресс клуба
      updateClubProgress(clubId, updatedTaskChecklists[clubId])

      // Обновляем список текущих задач
      updateCurrentTasks(clubId, updatedTaskChecklists[clubId])

      return updatedTaskChecklists
    })
  }

  // Обновление прогресса задачи
  const updateTaskProgress = (taskId: string, progress: number) => {
    console.log(`Updating progress for task ${taskId} to ${progress}%`)

    setTaskProgress((prev) => {
      const updated = { ...prev, [taskId]: progress }
      localStorage.setItem("taskProgress", JSON.stringify(updated))
      return updated
    })
  }

  // Обновление прогресса клуба
  const updateClubProgress = (clubId: string, clubTasks: Record<string, boolean[]>) => {
    console.log(`Updating progress for club ${clubId}`)

    if (!clubTasks || Object.keys(clubTasks).length === 0) {
      console.log(`No tasks for club ${clubId}`)
      return
    }

    // Считаем средний прогресс по всем задачам
    let totalProgress = 0
    let tasksWithProgress = 0

    Object.entries(clubTasks).forEach(([taskId, checklist]) => {
      if (checklist.length > 0) {
        const taskProgress = calculateTaskProgress(checklist, taskId)
        console.log(`Task ${taskId}: ${taskProgress}%`)
        totalProgress += taskProgress
        tasksWithProgress++
      }
    })

    const clubProgressValue = tasksWithProgress > 0 ? Math.round(totalProgress / tasksWithProgress) : 0
    console.log(`Club ${clubId} progress: ${clubProgressValue}%`)

    setClubProgress((prev) => {
      const updated = { ...prev, [clubId]: clubProgressValue }
      localStorage.setItem("clubProgress", JSON.stringify(updated))
      return updated
    })
  }

  // Функция для установки прогресса клуба и автоматического заполнения задач
  const setClubProgressAndTasks = (clubId: string, progress: number) => {
    console.log(`Setting club ${clubId} progress to ${progress}%`)

    // Определяем, сколько задач должно быть выполнено
    const totalTasks = TASK_ORDER.length
    const tasksToComplete = Math.floor((progress / 100) * totalTasks)

    // Создаем новый объект с чеклистами
    const newClubTasks: Record<string, boolean[]> = {}

    // Заполняем задачи
    TASK_ORDER.forEach((taskId, index) => {
      const checklistLength = getTaskDataChecklistLength(taskId)
      const checklist: boolean[] = []

      if (index < tasksToComplete) {
        // Задача полностью выполнена
        for (let i = 0; i < checklistLength; i++) {
          checklist.push(true)
        }
      } else if (index === tasksToComplete && tasksToComplete < totalTasks) {
        // Частично выполненная задача (если прогресс не кратен количеству задач)
        const remainingProgress = progress - tasksToComplete * (100 / totalTasks)
        const partialProgress = remainingProgress / (100 / totalTasks)
        const itemsToComplete = Math.floor(partialProgress * checklistLength)

        for (let i = 0; i < checklistLength; i++) {
          checklist.push(i < itemsToComplete)
        }
      } else {
        // Задача не выполнена
        for (let i = 0; i < checklistLength; i++) {
          checklist.push(false)
        }
      }

      newClubTasks[taskId] = checklist
    })

    // Обновляем чеклисты
    setTaskChecklists((prev) => {
      const updated = {
        ...prev,
        [clubId]: newClubTasks,
      }
      localStorage.setItem("taskChecklists", JSON.stringify(updated))
      return updated
    })

    // Обновляем прогресс задач
    const newTaskProgress: Record<string, number> = {}
    Object.entries(newClubTasks).forEach(([taskId, checklist]) => {
      newTaskProgress[taskId] = calculateTaskProgress(checklist, taskId)
    })

    setTaskProgress((prev) => {
      const updated = { ...prev, ...newTaskProgress }
      localStorage.setItem("taskProgress", JSON.stringify(updated))
      return updated
    })

    // Обновляем прогресс клуба
    setClubProgress((prev) => {
      const updated = { ...prev, [clubId]: progress }
      localStorage.setItem("clubProgress", JSON.stringify(updated))
      return updated
    })

    // Обновляем список текущих задач
    updateCurrentTasks(clubId, newClubTasks)
  }

  // Функция для определения текущих задач в работе
  const updateCurrentTasks = (clubId: string, clubTasks?: Record<string, boolean[]>) => {
    const tasks = clubTasks || taskChecklists[clubId] || {}
    const currentTasksList: string[] = []

    // Находим первую невыполненную задачу и следующие 2 задачи
    let foundIncomplete = false
    let count = 0

    for (const taskId of TASK_ORDER) {
      const checklist = tasks[taskId] || []
      const progress = calculateTaskProgress(checklist, taskId)

      if (!foundIncomplete && progress < 100) {
        foundIncomplete = true
      }

      if (foundIncomplete) {
        currentTasksList.push(taskId)
        count++

        if (count >= 3) break // Ограничиваем количество текущих задач
      }
    }

    setCurrentTasks(currentTasksList)
  }

  // Функция для получения текущих задач
  const getCurrentTasks = (clubId: string): string[] => {
    if (currentTasks.length === 0) {
      updateCurrentTasks(clubId)
    }
    return currentTasks
  }

  // Функция для сброса прогресса
  const resetProgress = () => {
    console.log("Resetting all progress")

    // Очищаем localStorage
    localStorage.removeItem("taskChecklists")
    localStorage.removeItem("taskProgress")
    localStorage.removeItem("clubProgress")

    // Сбрасываем состояние
    setTaskChecklists({})
    setTaskProgress({})
    setClubProgress({})
    setCurrentTasks([])
  }

  // Эффект для пересчета прогресса при изменении чек-листов
  useEffect(() => {
    if (!initialized) return

    console.log("Recalculating all progress after checklist changes")

    // Пересчитываем прогресс для всех задач и клубов
    Object.entries(taskChecklists).forEach(([clubId, clubTasks]) => {
      // Обновляем прогресс клуба
      updateClubProgress(clubId, clubTasks)

      // Обновляем прогресс каждой задачи
      Object.entries(clubTasks).forEach(([taskId, checklist]) => {
        const progress = calculateTaskProgress(checklist, taskId)
        updateTaskProgress(taskId, progress)
      })

      // Обновляем список текущих задач
      updateCurrentTasks(clubId, clubTasks)
    })
  }, [initialized])

  return (
    <ProgressContext.Provider
      value={{
        taskProgress,
        clubProgress,
        updateTaskChecklistItem,
        getTaskChecklist,
        resetProgress,
        setClubProgressAndTasks,
        currentTasks,
        getCurrentTasks,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export const useProgress = () => {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider")
  }
  return context
}
