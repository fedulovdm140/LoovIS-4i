// Заменим импорты на прямые импорты из @/components/ui/* и другие необходимые импорты

// Импорты из Tabs
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
// Импорты из Button
import { Button } from "@/components/ui/button"
// Импорт Link из next/link
import Link from "next/link"
// Импорты иконок из lucide-react
import { ArrowLeft, MapPin, Building, User, Clock, ChevronUp, ChevronDown } from "lucide-react"
// Импорты из Badge
import { Badge } from "@/components/ui/badge"
// Импорты из Progress
import { Progress } from "@/components/ui/progress"
// Импорты из Card
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// Импорты из Dialog
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// Импорты из Checkbox
import { Checkbox } from "@/components/ui/checkbox"
// Импорты из Textarea
import { Textarea } from "@/components/ui/textarea"
// Импорты из Avatar
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// Импорты из Collapsible
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// Экспортируем все компоненты
export {
  // Tabs
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  // Button
  Button,
  // Link
  Link,
  // Icons
  ArrowLeft,
  MapPin,
  Building,
  User,
  Clock,
  ChevronUp,
  ChevronDown,
  // Badge
  Badge,
  // Progress
  Progress,
  // Card
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  // Dialog
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  // Checkbox
  Checkbox,
  // Textarea
  Textarea,
  // Avatar
  Avatar,
  AvatarImage,
  AvatarFallback,
  // Collapsible
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
}
