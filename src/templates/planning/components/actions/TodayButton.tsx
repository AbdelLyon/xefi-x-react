import { Button } from "@/button"
import { IconCalendar } from "@tabler/icons-react"
import { Tooltip } from "@/tooltip"

interface TodayButtonProps {
  onClick?: () => void
  disabled?: boolean
  label?: string
  className?: string
}

export const TodayButton: React.FC<TodayButtonProps> = ({
  onClick,
  disabled = false,
  label = "Aujourd'hui",
  className = "",
}) => {
  return (
    <Tooltip
      content="Aller à aujourd'hui"
      trigger={
        <Button
          variant="light"
          size="sm"
          leftIcon={<IconCalendar className="size-4" />}
          onClick={onClick}
          isDisabled={disabled}
          className={`hover:bg-default-100 ${className}`}
        >
          {label}
        </Button>
      }
    ></Tooltip>
  )
}
