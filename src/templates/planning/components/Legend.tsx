import { Button } from "@/button"
import { IconEye, IconEyeOff } from "@tabler/icons-react"
import { Popover } from "@/popover"
import { Tooltip } from "@/tooltip"
import { mergeTailwindClasses } from "@/utils"
import { useCallback } from "react"

import type { LegendConfig, LegendItem } from "../types/planning.types"

interface LegendProps {
  config: LegendConfig
  className?: string
  position?: "bottom" | "top" | "left" | "right"
  compact?: boolean
}

export const Legend: React.FC<LegendProps> = ({
  config,
  className = "",
  position = "bottom",
  compact = false,
}) => {
  const handleToggle = useCallback(
    (itemId: string, visible: boolean) => {
      config.onToggle?.(itemId, visible)
    },
    [config]
  )

  const renderLegendItem = useCallback(
    (item: LegendItem, isVisible: boolean = true) => (
      <div
        key={item.id}
        className={mergeTailwindClasses(
          "flex items-center gap-2 px-2 py-1 rounded-md transition-all",
          config.toggleable && "cursor-pointer hover:bg-default-100",
          !isVisible && "opacity-50"
        )}
        onClick={() => config.toggleable && handleToggle(item.id, !isVisible)}
      >
        {/* Color indicator */}
        <div
          className="size-3 rounded-full border border-border/20"
          style={{ backgroundColor: item.color }}
        />

        {/* Label */}
        <span
          className={mergeTailwindClasses(
            "text-xs font-medium",
            isVisible ? "text-foreground-700" : "text-foreground-500"
          )}
        >
          {item.label}
        </span>

        {/* Count */}
        {item.count !== undefined && (
          <span className="text-xs text-foreground-500">({item.count})</span>
        )}

        {/* Toggle icon */}
        {config.toggleable && (
          <div className="ml-auto">
            {isVisible ? (
              <IconEye className="size-3 text-foreground-400" />
            ) : (
              <IconEyeOff className="size-3 text-foreground-400" />
            )}
          </div>
        )}
      </div>
    ),
    [config.toggleable, handleToggle]
  )

  if (!config.enabled || config.items.length === 0) {
    return null
  }

  const visibleItems = config.items.filter((item) => item.visible !== false)
  const hiddenItems = config.items.filter((item) => item.visible === false)

  if (compact) {
    return (
      <Popover
        placement={position}
        trigger={
          <Button
            variant="light"
            size="sm"
            className={mergeTailwindClasses("hover:bg-default-100", className)}
          >
            Légende ({visibleItems.length})
            {hiddenItems.length > 0 && (
              <span className="ml-1 text-xs text-foreground-500">
                +{hiddenItems.length} masqués
              </span>
            )}
          </Button>
        }
      >
        <div className="max-w-xs p-3">
          <h4 className="mb-3 text-sm font-semibold">Légende</h4>

          {/* Visible items */}
          {visibleItems.length > 0 && (
            <div className="mb-3 space-y-1">
              <h5 className="text-xs font-medium uppercase tracking-wide text-foreground-600">
                Visible
              </h5>
              {visibleItems.map((item) => renderLegendItem(item, true))}
            </div>
          )}

          {/* Hidden items */}
          {hiddenItems.length > 0 && (
            <div className="space-y-1">
              <h5 className="text-xs font-medium uppercase tracking-wide text-foreground-600">
                Masqué
              </h5>
              {hiddenItems.map((item) => renderLegendItem(item, false))}
            </div>
          )}

          {/* Toggle all */}
          {config.toggleable && config.items.length > 1 && (
            <div className="mt-3 border-t border-border pt-3">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="light"
                  className="flex-1 text-xs"
                  onClick={() => {
                    config.items.forEach((item) => handleToggle(item.id, true))
                  }}
                >
                  Tout afficher
                </Button>
                <Button
                  size="sm"
                  variant="light"
                  className="flex-1 text-xs"
                  onClick={() => {
                    config.items.forEach((item) => handleToggle(item.id, false))
                  }}
                >
                  Tout masquer
                </Button>
              </div>
            </div>
          )}
        </div>
      </Popover>
    )
  }

  return (
    <div
      className={mergeTailwindClasses(
        "rounded-lg border border-border bg-background p-3",
        className
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <h4 className="text-sm font-semibold">Légende</h4>

        {config.toggleable && (
          <Tooltip
            content="Gérer la visibilité"
            trigger={
              <Button size="sm" variant="light" className="px-2 text-xs">
                <IconEye className="size-3" />
              </Button>
            }
          ></Tooltip>
        )}
      </div>

      {/* Items grid */}
      <div
        className={mergeTailwindClasses(
          "grid gap-1",
          config.items.length > 6 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1"
        )}
      >
        {/* Visible items */}
        {visibleItems.map((item) => renderLegendItem(item, true))}

        {/* Hidden items */}
        {hiddenItems.map((item) => renderLegendItem(item, false))}
      </div>

      {/* Summary */}
      {config.items.length > 0 && (
        <div className="mt-3 border-t border-border pt-2 text-xs text-foreground-500">
          {visibleItems.length} élément{visibleItems.length !== 1 ? "s" : ""}{" "}
          visible{visibleItems.length !== 1 ? "s" : ""}
          {hiddenItems.length > 0 && (
            <span>
              , {hiddenItems.length} masqué{hiddenItems.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      )}
    </div>
  )
}
