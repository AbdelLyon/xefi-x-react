"use client";

import { IconChevronLeft, IconChevronRight } from "@xefi/x-react/icons";

interface NavigationControlsProps {
  onPreviousPeriod: () => void;
  onNextPeriod: () => void;
  title: string;
  isLoading?: boolean;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  onPreviousPeriod,
  onNextPeriod,
  title,
  isLoading = false,
}) => {
  const buttonBaseClass =
    "flex size-8 items-center justify-center rounded-full border border-border/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20";
  const buttonDisabledClass =
    "cursor-not-allowed text-foreground-300 opacity-50";
  const buttonEnabledClass =
    "text-foreground-500 hover:bg-content1-100 hover:text-primary active:scale-95";

  return (
    <div className="flex w-full items-center justify-center gap-3 rounded-tr-md bg-gradient-to-b from-content1-100 to-content1-100/40 p-3 dark:from-content1/10 dark:to-content1/60">
      <button
        className={`${buttonBaseClass} ${
          isLoading ? buttonDisabledClass : buttonEnabledClass
        }`}
        onClick={onPreviousPeriod}
        disabled={isLoading}
        aria-label="Période précédente"
        type="button"
      >
        <IconChevronLeft size={18} />
      </button>

      <div className="relative flex justify-center">
        <div className="flex items-center space-x-6 rounded-lg border border-border/50 bg-content1 px-6 py-1.5">
          <div className="relative text-center">
            {isLoading ? (
              <div className="flex items-center gap-2 py-[4px]">
                <div className="size-3 animate-pulse rounded-full bg-primary/30" />
                <span className="text-xs font-semibold capitalize text-foreground-400">
                  Chargement...
                </span>
              </div>
            ) : (
              <span
                className="text-xs font-semibold capitalize text-primary transition-colors duration-200"
                data-testid="period-title"
                title={title}
              >
                {title}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        className={`${buttonBaseClass} ${
          isLoading ? buttonDisabledClass : buttonEnabledClass
        }`}
        onClick={onNextPeriod}
        disabled={isLoading}
        aria-label="Période suivante"
        type="button"
      >
        <IconChevronRight size={18} />
      </button>
    </div>
  );
};
