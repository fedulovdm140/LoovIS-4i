"use client"

import type React from "react"
import { memo, forwardRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string
  error?: string
  success?: string
  required?: boolean
  description?: string
  type?: string
  multiline?: boolean
  rows?: number
  leftIcon?: React.ComponentType<{ className?: string }>
  rightIcon?: React.ComponentType<{ className?: string }>
}

export const FormField = memo(
  forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(
    (
      {
        label,
        error,
        success,
        required,
        description,
        type = "text",
        multiline = false,
        rows = 3,
        leftIcon: LeftIcon,
        rightIcon: RightIcon,
        className,
        ...props
      },
      ref,
    ) => {
      const [showPassword, setShowPassword] = useState(false)
      const [isFocused, setIsFocused] = useState(false)

      const isPassword = type === "password"
      const inputType = isPassword ? (showPassword ? "text" : "password") : type

      const inputClasses = cn(
        "w-full px-4 py-3 text-base border-2 rounded-xl transition-all duration-200",
        "focus:outline-none focus:ring-4 focus:ring-blue-500/20",
        "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
        "placeholder:text-gray-400",
        // Отступы для иконок
        LeftIcon && "pl-12",
        (RightIcon || isPassword) && "pr-12",
        // Состояния
        error && "border-red-300 focus:border-red-500 bg-red-50/50",
        success && "border-green-300 focus:border-green-500 bg-green-50/50",
        !error && !success && isFocused && "border-blue-500 bg-blue-50/50",
        !error && !success && !isFocused && "border-gray-300 hover:border-gray-400 bg-white",
        className,
      )

      const Element = multiline ? "textarea" : "input"

      return (
        <div className="space-y-2">
          {/* Label */}
          <label className="block text-sm font-semibold text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {/* Description */}
          {description && <p className="text-sm text-gray-500 leading-relaxed">{description}</p>}

          {/* Input Container */}
          <div className="relative">
            {/* Left Icon */}
            {LeftIcon && (
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                <LeftIcon className="h-5 w-5 text-gray-400" />
              </div>
            )}

            {/* Input/Textarea */}
            <Element
              ref={ref as any}
              type={inputType}
              rows={multiline ? rows : undefined}
              className={inputClasses}
              aria-invalid={!!error}
              aria-describedby={
                error
                  ? `${props.id}-error`
                  : success
                    ? `${props.id}-success`
                    : description
                      ? `${props.id}-description`
                      : undefined
              }
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...props}
            />

            {/* Right Icon / Password Toggle */}
            {(RightIcon || isPassword) && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                {isPassword ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="p-1 h-auto hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </Button>
                ) : RightIcon ? (
                  <RightIcon className="h-5 w-5 text-gray-400" />
                ) : null}
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div id={`${props.id}-error`} className="flex items-start space-x-2 text-red-600">
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p className="text-sm leading-relaxed">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div id={`${props.id}-success`} className="flex items-start space-x-2 text-green-600">
              <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p className="text-sm leading-relaxed">{success}</p>
            </div>
          )}
        </div>
      )
    },
  ),
)

FormField.displayName = "FormField"
