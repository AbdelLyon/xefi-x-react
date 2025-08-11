import "@/index.css";

// Main component
export { Planning } from "./Planning";

// Individual components
export { Header } from "./components/Header";
export { Sidebar } from "./components/Sidebar";
export { PlanningBody } from "./components/PlanningBody";
export { Toolbar } from "./components/Toolbar";
export { Legend } from "./components/Legend";

// Sub-components
export { FilterControls } from "./components/filters/FilterControls";
export { ImportExportActions } from "./components/actions/ImportExportActions";
export { ViewModeSelector } from "./components/selectors/ViewModeSelector";
export { TodayButton } from "./components/actions/TodayButton";

// Types
export type {
  // Core types
  GenericDate,
  PlanningDay,
  PlanningItem,
  PlanningUser,
  PlanningGroup,

  // Configuration types
  ViewMode,
  ViewModeConfig,
  FilterOption,
  FilterConfig,
  ActiveFilter,
  ToolbarAction,
  ImportExportConfig,
  LegendItem,
  LegendConfig,
  SidebarTab,
  SidebarConfig,

  // Main configuration
  PlanningConfig,
  PlanningProps
} from "./types/planning.types";