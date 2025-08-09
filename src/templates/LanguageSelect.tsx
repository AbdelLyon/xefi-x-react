import type { JSX } from "react"
import { forwardRef } from "react"
import type { SelectProps as UISelectProps, Selection } from "@heroui/react"
import { Select as UISelect, SelectItem } from "@heroui/react"
import { mergeTailwindClasses } from "@/utils"
import { Tooltip } from "@/tooltip"

export interface Language {
  code: string
  flag: React.ReactNode
  label?: string
}

interface LanguageSelectProps
  extends Omit<UISelectProps, "children" | "value" | "onSelectionChange"> {
  languages: Language[]
  value?: Selection
  defaultValue?: Selection
  onSelectionChange?: (key: Selection) => void
  size?: "sm" | "md" | "lg"
}

const defaultClassNames = {
  base: "max-w-xs",
  trigger:
    "border border-border bg-transparent data-[focus-visible=true]:outline-0 data-[focus=true]:border-outline data-[hover=true]:bg-transparent data-[hover=true]:border-outline min-h-unit-11",
  listbox: "data-[focus=true]:outline-0",
  value: "flex items-center justify-center",
  popoverContent: "bg-white dark:bg-background",
} as const

export const LanguageSelect = forwardRef<
  HTMLSelectElement,
  LanguageSelectProps
>(
  (
    {
      languages = [],
      value,
      defaultValue,
      classNames,
      size = "md",
      "aria-label": ariaLabel = "Sélectionner une langue",
      ...props
    },
    ref
  ): JSX.Element => {
    const mergedClassNames = {
      base: mergeTailwindClasses(defaultClassNames.base, classNames?.base),
      trigger: mergeTailwindClasses(
        defaultClassNames.trigger,
        classNames?.trigger
      ),
      value: mergeTailwindClasses(defaultClassNames.value, classNames?.value),
      popoverContent: mergeTailwindClasses(
        defaultClassNames.popoverContent,
        classNames?.popoverContent
      ),
      listbox: mergeTailwindClasses(
        defaultClassNames.listbox,
        classNames?.listbox
      ),
    }

    return (
      <UISelect
        ref={ref}
        classNames={mergedClassNames}
        selectedKeys={value}
        defaultSelectedKeys={defaultValue}
        size={size}
        aria-label={ariaLabel}
        renderValue={(items) => {
          if (!items.length) {
            return null
          }
          const selectedItem = items[0]
          const selectedLanguage = languages.find(
            (lang) => lang.code === selectedItem.key
          )
          return (
            <Tooltip
              trigger={
                <div className="flex w-full items-center justify-center">
                  {selectedLanguage?.flag}
                </div>
              }
              content={selectedLanguage?.label || selectedLanguage?.code}
            />
          )
        }}
        {...props}
      >
        {languages.map(
          (language): JSX.Element => (
            <SelectItem
              key={language.code}
              aria-label={`Langue: ${language.label || language.code}`}
              className="text-small"
            >
              <Tooltip
                trigger={
                  <div className="flex w-full items-center justify-center">
                    {language.flag}
                  </div>
                }
                content={language?.label || language?.code}
              />
            </SelectItem>
          )
        )}
      </UISelect>
    )
  }
)

LanguageSelect.displayName = "LanguageSelect"
