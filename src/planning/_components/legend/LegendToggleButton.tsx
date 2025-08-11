import { Button } from "@xefi/x-react/button";
import { IconEye, IconEyeOff } from "@xefi/x-react/icons";

interface LegendToggleButtonProps {
  showLegends: boolean;
  onToggle: () => void;
}

export const LegendToggleButton = ({
  showLegends,
  onToggle,
}: LegendToggleButtonProps) => {
  return (
    <Button
      size="sm"
      variant="bordered"
      color="default"
      onClick={onToggle}
      className="w-36 rounded-md border border-border opacity-70 transition hover:opacity-100"
      aria-label={showLegends ? "Masquer la légende" : "Afficher la légende"}
      endContent={
        <>
          {showLegends ? (
            <IconEyeOff className="size-4" />
          ) : (
            <IconEye className="size-4" />
          )}
        </>
      }
    >
      <span className="hidden sm:inline">
        {showLegends ? "Masquer" : "Afficher"} la légende
      </span>
    </Button>
  );
};
