"use client"

import { useLanguage } from "@/contexts/language-context"
import { MobileMetricsGrid } from "./MobileMetricsGrid"
import { MobileFilterBar } from "./MobileFilterBar"
import { MobileChartContainer } from "./MobileChartContainer"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Area, AreaChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function MobileAnalytics() {
  const { t, language } = useLanguage()
  const [period, setPeriod] = useState("month")
  const [location, setLocation] = useState("all")

  // Метрики для аналитики
  const metrics = [
    {
      title: t("total_revenue"),
      value: "$84,254",
      change: "+8.2%",
      trend: "up" as const,
      period: t("compared_to_last_month"),
    },
    {
      title: t("sales_count"),
      value: "2,500",
      change: "+16%",
      trend: "up" as const,
      period: t("compared_to_last_month"),
    },
    {
      title: t("vision_tests"),
      value: "5,000",
      change: "+10%",
      trend: "up" as const,
      period: t("compared_to_last_month"),
    },
    {
      title: t("conversion_rate"),
      value: "50%",
      change: "+12%",
      trend: "up" as const,
      period: t("compared_to_last_month"),
    },
  ]

  // Опции для фильтров
  const periodOptions = [
    { value: "day", label: t("day") },
    { value: "week", label: t("week") },
    { value: "month", label: t("month") },
    { value: "quarter", label: t("quarter") },
    { value: "year", label: t("year") },
  ]

  const locationOptions = [
    { value: "all", label: t("all_locations") },
    { value: "loov1", label: "LOOV 1" },
    { value: "loov2", label: "LOOV 2" },
    { value: "loov3", label: "LOOV 3" },
  ]

  // Данные для графиков
  const salesData = [
    { name: language === "ru" ? "Янв" : "Jan", revenue: 65000, target: 70000 },
    { name: language === "ru" ? "Фев" : "Feb", revenue: 59000, target: 65000 },
    { name: language === "ru" ? "Мар" : "Mar", revenue: 80000, target: 75000 },
    { name: language === "ru" ? "Апр" : "Apr", revenue: 81000, target: 80000 },
    { name: language === "ru" ? "Май" : "May", revenue: 56000, target: 70000 },
    { name: language === "ru" ? "Июн" : "Jun", revenue: 55000, target: 65000 },
  ]

  const categoryData = [
    { name: language === "ru" ? "Очки" : "Glasses", value: 40 },
    { name: language === "ru" ? "Контактные линзы" : "Contact Lenses", value: 30 },
    { name: language === "ru" ? "Солнцезащитные очки" : "Sunglasses", value: 20 },
    { name: language === "ru" ? "Аксессуары" : "Accessories", value: 10 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  // Топ продукты
  const topProducts = [
    { name: "Очки Ray-Ban Wayfarer", sales: 245, revenue: "$36,750", trend: "up" },
    { name: "Контактные линзы Acuvue", sales: 189, revenue: "$28,350", trend: "up" },
    { name: "Очки Oakley Holbrook", sales: 156, revenue: "$23,400", trend: "down" },
    { name: "Солнцезащитные очки Persol", sales: 132, revenue: "$19,800", trend: "up" },
    { name: "Оправы Gucci", sales: 98, revenue: "$14,700", trend: "down" },
  ]

  return (
    <div className="p-4">
      <MobileFilterBar
        periodOptions={periodOptions}
        locationOptions={locationOptions}
        onPeriodChange={setPeriod}
        onLocationChange={setLocation}
        defaultPeriod={period}
        defaultLocation={location}
      />

      {/* Компактная сетка метрик */}
      <MobileMetricsGrid metrics={metrics} compact={true} />

      {/* Вкладки для разных типов аналитики */}
      <Tabs defaultValue="sales" className="mt-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="sales">{t("sales")}</TabsTrigger>
          <TabsTrigger value="customers">{t("customers")}</TabsTrigger>
          <TabsTrigger value="products">{t("products")}</TabsTrigger>
          <TabsTrigger value="staff">{t("staff")}</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="mt-2">
          <MobileChartContainer title={t("sales_dynamics")} description={t("sales_comparison")} defaultExpanded={true}>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.3}
                    name={language === "ru" ? "Выручка" : "Revenue"}
                  />
                  <Area
                    type="monotone"
                    dataKey="target"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                    name={language === "ru" ? "Цель" : "Target"}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </MobileChartContainer>

          <MobileChartContainer title={t("top_products")} description={t("best_selling_products")}>
            <div className="space-y-3">
              {topProducts.slice(0, 3).map((product, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-sm">{product.name}</p>
                    <div className="flex items-center mt-0.5">
                      <span className="text-xs text-gray-500 mr-2">
                        {product.sales} {language === "ru" ? "продаж" : "sales"}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-sm">{product.revenue}</span>
                </div>
              ))}
            </div>
          </MobileChartContainer>
        </TabsContent>

        <TabsContent value="products" className="mt-2">
          <MobileChartContainer
            title={t("sales_by_category")}
            description={t("sales_category_percentage")}
            defaultExpanded={true}
          >
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </MobileChartContainer>
        </TabsContent>

        <TabsContent value="customers" className="mt-2">
          <MobileChartContainer
            title={t("customer_analysis")}
            description={t("customer_behavior")}
            defaultExpanded={true}
          >
            <div className="text-center text-sm text-gray-500 py-4">{t("select_date_range_to_view_data")}</div>
          </MobileChartContainer>
        </TabsContent>

        <TabsContent value="staff" className="mt-2">
          <MobileChartContainer title={t("staff_analysis")} description={t("staff_performance")} defaultExpanded={true}>
            <div className="text-center text-sm text-gray-500 py-4">{t("select_date_range_to_view_data")}</div>
          </MobileChartContainer>
        </TabsContent>
      </Tabs>
    </div>
  )
}
