"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDown, ArrowUp, Download, Filter } from "lucide-react"
import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { MobileAnalytics } from "@/components/mobile-optimized/MobileAnalytics"
import { useMobile } from "@/hooks/use-mobile"

export default function AnalyticsPage() {
  const [period, setPeriod] = useState("month")
  const [location, setLocation] = useState("all")
  const { t, language } = useLanguage()
  const isMobile = useMobile()

  // Добавим эффект для обновления данных при изменении периода или локации
  useEffect(() => {
    // Здесь можно добавить логику для обновления данных в зависимости от выбранного периода и локации
  }, [period, location])

  // Если мобильное устройство, отображаем мобильную версию
  if (isMobile) {
    return <MobileAnalytics />
  }

  // Обновим метрики в зависимости от выбранного периода и локации
  const getMetricsForPeriodAndLocation = () => {
    // Базовые метрики
    const baseMetrics = [
      {
        title: t("total_revenue"),
        value: "$84,254",
        change: "+8.2%",
        trend: "up",
      },
      {
        title: t("sales_count"),
        value: "2,500",
        change: "+16%",
        trend: "up",
      },
      {
        title: t("vision_tests"),
        value: "5,000",
        change: "+10%",
        trend: "up",
      },
      {
        title: t("conversion_rate"),
        value: "50%",
        change: "+12%",
        trend: "up",
      },
    ]

    // Модификаторы для разных периодов
    const periodModifiers = {
      day: {
        revenue: "$2,845",
        salesCount: "85",
        visionTests: "165",
        conversionRate: "48%",
        revenueChange: "+5.1%",
        salesChange: "+12%",
        visionChange: "+8%",
        conversionChange: "+7%",
      },
      week: {
        revenue: "$19,876",
        salesCount: "580",
        visionTests: "1,150",
        conversionRate: "49%",
        revenueChange: "+6.8%",
        salesChange: "+14%",
        visionChange: "+9%",
        conversionChange: "+10%",
      },
      month: {
        revenue: "$84,254",
        salesCount: "2,500",
        visionTests: "5,000",
        conversionRate: "50%",
        revenueChange: "+8.2%",
        salesChange: "+16%",
        visionChange: "+10%",
        conversionChange: "+12%",
      },
      quarter: {
        revenue: "$254,760",
        salesCount: "7,500",
        visionTests: "15,000",
        conversionRate: "51%",
        revenueChange: "+9.5%",
        salesChange: "+18%",
        visionChange: "+12%",
        conversionChange: "+14%",
      },
      year: {
        revenue: "$1,025,400",
        salesCount: "30,000",
        visionTests: "60,000",
        conversionRate: "52%",
        revenueChange: "+11.2%",
        salesChange: "+20%",
        visionChange: "+15%",
        conversionChange: "+16%",
      },
    }

    // Модификаторы для разных локаций
    const locationModifiers = {
      all: {
        multiplier: 1.0,
      },
      loov1: {
        multiplier: 0.4,
      },
      loov2: {
        multiplier: 0.35,
      },
      loov3: {
        multiplier: 0.25,
      },
    }

    // Получаем модификаторы для выбранного периода и локации
    const periodMod = periodModifiers[period]
    const locationMod = locationModifiers[location]

    // Применяем модификаторы к базовым метрикам
    return [
      {
        title: t("total_revenue"),
        value: period === "month" && location === "all" ? baseMetrics[0].value : periodMod.revenue,
        change: periodMod.revenueChange,
        trend: "up",
      },
      {
        title: t("sales_count"),
        value: period === "month" && location === "all" ? baseMetrics[1].value : periodMod.salesCount,
        change: periodMod.salesChange,
        trend: "up",
      },
      {
        title: t("vision_tests"),
        value: period === "month" && location === "all" ? baseMetrics[2].value : periodMod.visionTests,
        change: periodMod.visionChange,
        trend: "up",
      },
      {
        title: t("conversion_rate"),
        value: period === "month" && location === "all" ? baseMetrics[3].value : periodMod.conversionRate,
        change: periodMod.conversionChange,
        trend: "up",
      },
    ]
  }

  // Обновим отображение метрик
  const metrics = getMetricsForPeriodAndLocation()

  const topProducts = [
    { name: "Очки Ray-Ban Wayfarer", sales: 245, revenue: "$36,750", trend: "up" },
    { name: "Контактные линзы Acuvue", sales: 189, revenue: "$28,350", trend: "up" },
    { name: "Очки Oakley Holbrook", sales: 156, revenue: "$23,400", trend: "down" },
    { name: "Солнцезащитные очки Persol", sales: 132, revenue: "$19,800", trend: "up" },
    { name: "Оправы Gucci", sales: 98, revenue: "$14,700", trend: "down" },
  ]

  // Данные для графиков
  const salesData = [
    { name: "Янв", revenue: 65000, sales: 1200, target: 70000 },
    { name: "Фев", revenue: 59000, sales: 1100, target: 65000 },
    { name: "Мар", revenue: 80000, sales: 1500, target: 75000 },
    { name: "Апр", revenue: 81000, sales: 1600, target: 80000 },
    { name: "Май", revenue: 56000, sales: 1000, target: 70000 },
    { name: "Июн", revenue: 55000, sales: 1000, target: 65000 },
    { name: "Июл", revenue: 40000, sales: 900, target: 60000 },
    { name: "Авг", revenue: 65000, sales: 1200, target: 70000 },
    { name: "Сен", revenue: 73000, sales: 1400, target: 75000 },
    { name: "Окт", revenue: 82000, sales: 1600, target: 80000 },
    { name: "Ноя", revenue: 78000, sales: 1500, target: 75000 },
    { name: "Дек", revenue: 90000, sales: 1800, target: 85000 },
  ]

  const salesDataEn = [
    { name: "Jan", revenue: 65000, sales: 1200, target: 70000 },
    { name: "Feb", revenue: 59000, sales: 1100, target: 65000 },
    { name: "Mar", revenue: 80000, sales: 1500, target: 75000 },
    { name: "Apr", revenue: 81000, sales: 1600, target: 80000 },
    { name: "May", revenue: 56000, sales: 1000, target: 70000 },
    { name: "Jun", revenue: 55000, sales: 1000, target: 65000 },
    { name: "Jul", revenue: 40000, sales: 900, target: 60000 },
    { name: "Aug", revenue: 65000, sales: 1200, target: 70000 },
    { name: "Sep", revenue: 73000, sales: 1400, target: 75000 },
    { name: "Oct", revenue: 82000, sales: 1600, target: 80000 },
    { name: "Nov", revenue: 78000, sales: 1500, target: 75000 },
    { name: "Dec", revenue: 90000, sales: 1800, target: 85000 },
  ]

  const currentSalesData = language === "ru" ? salesData : salesDataEn

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">{t("analytics")}</h1>
          <p className="text-gray-600">{t("business_performance")}</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>{t("export")}</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>{t("filters")}</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger>
              <SelectValue placeholder={t("select_period")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">{t("day")}</SelectItem>
              <SelectItem value="week">{t("week")}</SelectItem>
              <SelectItem value="month">{t("month")}</SelectItem>
              <SelectItem value="quarter">{t("quarter")}</SelectItem>
              <SelectItem value="year">{t("year")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder={t("select_location")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("all_locations")}</SelectItem>
              <SelectItem value="loov1">LOOV 1</SelectItem>
              <SelectItem value="loov2">LOOV 2</SelectItem>
              <SelectItem value="loov3">LOOV 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex flex-col">
                <p className="text-sm text-gray-500">{metric.title}</p>
                <p className="text-2xl font-bold mt-1">{metric.value}</p>
                <div className="flex items-center mt-2 text-sm">
                  {metric.trend === "up" ? (
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>
                    {metric.change} {t("compared_to_last")}{" "}
                    {period === "day"
                      ? t("day")
                      : period === "week"
                        ? t("week")
                        : period === "month"
                          ? t("month")
                          : period === "quarter"
                            ? t("quarter")
                            : t("year")}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="sales" className="mb-8">
        <TabsList className="grid w-full grid-cols-4 max-w-md">
          <TabsTrigger value="sales">{t("sales")}</TabsTrigger>
          <TabsTrigger value="customers">{t("customers")}</TabsTrigger>
          <TabsTrigger value="products">{t("products")}</TabsTrigger>
          <TabsTrigger value="staff">{t("staff")}</TabsTrigger>
        </TabsList>
        <TabsContent value="sales" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>{t("sales_dynamics")}</CardTitle>
                <CardDescription>{t("sales_comparison")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={currentSalesData}
                      margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t("top_products")}</CardTitle>
                <CardDescription>{t("best_selling_products")}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-gray-500 mr-2">
                            {product.sales} {language === "ru" ? "продаж" : "sales"}
                          </span>
                          {product.trend === "up" ? (
                            <ArrowUp className="h-3 w-3 text-green-500" />
                          ) : (
                            <ArrowDown className="h-3 w-3 text-red-500" />
                          )}
                        </div>
                      </div>
                      <span className="font-bold">{product.revenue}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("customer_analysis")}</CardTitle>
              <CardDescription>{t("customer_behavior")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-gray-500 py-8">{t("select_date_range_to_view_data")}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("product_analysis")}</CardTitle>
              <CardDescription>{t("product_sales_info")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-gray-500 py-8">{t("select_date_range_to_view_data")}</div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="staff" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("staff_analysis")}</CardTitle>
              <CardDescription>{t("staff_performance")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-gray-500 py-8">{t("select_date_range_to_view_data")}</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
