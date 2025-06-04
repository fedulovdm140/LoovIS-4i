"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface NewClubDialogProps {
  isOpen: boolean
  onClose: () => void
}

export default function NewClubDialog({ isOpen, onClose }: NewClubDialogProps) {
  const { t } = useLanguage()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 5

  // Изображения шаблонов
  const retailStoreImage =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BE%D1%82%D0%BA%D1%80%D1%8B%D1%82%D0%B8%D0%B5.jpg-DvDWiOiQHDNtv3epHNXxebyy0B2PlH.jpeg"
  const clinicImage =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%BA%D0%BB%D0%B8%D0%BD%D0%B8%D0%BA%D0%B0-t8VFrQLMhgQmvb6wdWKJgdQmCihm4u.png"
  const darkOpticsImage =
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%D0%94%D0%B0%D1%80%D0%BA%20%D0%BE%D0%BF%D1%82%D0%B8%D0%BA%D0%B0.jpg-DT9hEbzENKolH8V6wb7b2GLjF6SAEk.jpeg"

  // Данные формы
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    region: "",
    legalEntity: "",
    companyOwner: "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    template: "",
    manager: "",
    openingDate: "",
    description: "",
  })

  // Обработчик изменения полей формы
  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  // Переход к следующему шагу
  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  // Переход к предыдущему шагу
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  // Создание нового клуба
  const createClub = () => {
    // В реальном приложении здесь был бы API вызов
    console.log("Creating club with data:", formData)
    onClose()

    // Перенаправление на страницу деталей нового клуба
    // В реальном приложении здесь был бы ID нового клуба
    router.push(`/new-club/details/new-club-1`)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-auto">
        {/* Заголовок */}
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">{t("create_new_club") || "Создать новый клуб"}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Индикатор шагов */}
          <div className="flex items-center mt-4">
            <div className="flex items-center">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index + 1 === step
                        ? "bg-blue-600 text-white"
                        : index + 1 < step
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {index + 1 < step ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < totalSteps - 1 && (
                    <div className={`w-12 h-1 ${index + 1 < step ? "bg-green-500" : "bg-gray-200"}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Содержимое формы */}
        <div className="p-6">
          {/* Шаг 1: Основная информация */}
          {step === 1 && (
            <div>
              <h3 className="font-semibold text-lg mb-4">{t("basic_information") || "Основная информация"}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("club_name") || "Название клуба"}*
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder={t("enter_club_name") || "Введите название клуба"}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("legal_entity") || "Юридическое лицо"}
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={formData.legalEntity}
                    onChange={(e) => handleChange("legalEntity", e.target.value)}
                    placeholder={t("example_loov_retail") || "Например: ООО 'ЛООВ Ритейл'"}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("address") || "Адрес"}*</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  placeholder={t("enter_address") || "Введите адрес"}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("city") || "Город"}*</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={formData.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    placeholder={t("enter_city") || "Введите город"}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t("region") || "Регион"}</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    value={formData.region}
                    onChange={(e) => handleChange("region", e.target.value)}
                    placeholder={t("enter_region") || "Введите регион"}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Шаг 2: Выбор шаблона */}
          {step === 2 && (
            <div>
              <h3 className="font-semibold text-lg mb-4">{t("select_club_template") || "Выберите шаблон клуба"}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    formData.template === "retail" ? "border-blue-500 bg-blue-50" : "hover:border-gray-400"
                  }`}
                  onClick={() => handleChange("template", "retail")}
                >
                  <div className="h-40 mb-4 overflow-hidden rounded-md">
                    <img
                      src={retailStoreImage || "/placeholder.svg"}
                      alt="Retail Store"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium text-center">{t("retail_store") || "Розничный магазин"}</h4>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    formData.template === "clinic" ? "border-blue-500 bg-blue-50" : "hover:border-gray-400"
                  }`}
                  onClick={() => handleChange("template", "clinic")}
                >
                  <div className="h-40 mb-4 overflow-hidden rounded-md">
                    <img src={clinicImage || "/placeholder.svg"} alt="Clinic" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-medium text-center">{t("clinic") || "Клиника"}</h4>
                </div>

                <div
                  className={`border rounded-lg p-4 cursor-pointer transition-all ${
                    formData.template === "dark-optics" ? "border-blue-500 bg-blue-50" : "hover:border-gray-400"
                  }`}
                  onClick={() => handleChange("template", "dark-optics")}
                >
                  <div className="h-40 mb-4 overflow-hidden rounded-md">
                    <img
                      src={darkOpticsImage || "/placeholder.svg"}
                      alt="Dark Optics"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium text-center">{t("dark_optics") || "Дарк оптика"}</h4>
                </div>
              </div>
            </div>
          )}

          {/* Шаг 3: Менеджер и дата открытия */}
          {step === 3 && (
            <div>
              <h3 className="font-semibold text-lg mb-4">
                {t("manager_and_opening_date") || "Менеджер и дата открытия"}
              </h3>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("club_manager") || "Менеджер клуба"}
                </label>
                <select
                  className="w-full p-2 border rounded-md"
                  value={formData.manager}
                  onChange={(e) => handleChange("manager", e.target.value)}
                >
                  <option value="">{t("select_manager") || "Выберите менеджера"}</option>
                  <option value="Sarah Anderson">Sarah Anderson</option>
                  <option value="Alex Johnson">Alex Johnson</option>
                  <option value="Mike Chen">Mike Chen</option>
                  <option value="Emma Wilson">Emma Wilson</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("target_opening_date") || "Планируемая дата открытия"}
                </label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-md"
                  value={formData.openingDate}
                  onChange={(e) => handleChange("openingDate", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Шаг 4: Дополнительная информация */}
          {step === 4 && (
            <div>
              <h3 className="font-semibold text-lg mb-4">{t("additional_info") || "Дополнительная информация"}</h3>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("description") || "Описание"}</label>
                <textarea
                  className="w-full p-2 border rounded-md h-32"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder={
                    t("additional_info_placeholder") || "Добавьте любую дополнительную информацию о клубе..."
                  }
                ></textarea>
              </div>
            </div>
          )}

          {/* Шаг 5: Сводка */}
          {step === 5 && (
            <div>
              <h3 className="font-semibold text-lg mb-4">{t("summary") || "Сводка"}</h3>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">{t("club_name") || "Название клуба"}</h4>
                    <p>{formData.name || "-"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">
                      {t("legal_entity") || "Юридическое лицо"}
                    </h4>
                    <p>{formData.legalEntity || "-"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">{t("location") || "Местоположение"}</h4>
                    <p>
                      {formData.address && formData.city ? `${formData.address}, ${formData.city}` : "-"}
                      {formData.region ? `, ${formData.region}` : ""}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">{t("template") || "Шаблон"}</h4>
                    <p>
                      {formData.template === "retail"
                        ? t("retail_store") || "Розничный магазин"
                        : formData.template === "clinic"
                          ? t("clinic") || "Клиника"
                          : formData.template === "dark-optics"
                            ? t("dark_optics") || "Дарк оптика"
                            : "-"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">{t("manager") || "Менеджер"}</h4>
                    <p>{formData.manager || "-"}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">
                      {t("target_opening_date") || "Планируемая дата открытия"}
                    </h4>
                    <p>{formData.openingDate || "-"}</p>
                  </div>
                </div>

                {formData.description && (
                  <div className="mt-4">
                    <h4 className="font-medium text-sm text-gray-500 mb-1">{t("description") || "Описание"}</h4>
                    <p>{formData.description}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Кнопки навигации */}
        <div className="p-4 border-t bg-gray-50 flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={prevStep}>
              {t("back") || "Назад"}
            </Button>
          ) : (
            <div></div>
          )}

          {step < totalSteps ? (
            <Button onClick={nextStep}>{t("next") || "Далее"}</Button>
          ) : (
            <Button onClick={createClub} className="bg-blue-600 hover:bg-blue-700">
              {t("create_club") || "Создать клуб"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
