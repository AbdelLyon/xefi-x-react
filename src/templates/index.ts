import "@/index.css";
export { LanguageSelect, type Language } from "@/templates/LanguageSelect";
export { ProfileDropdown, type ProfileUser, type ProfileAction, type ProfileSection } from "@/templates/ProfileDropdown";
export { HeaderActions, type HeaderActionsProps } from "@/templates/HeaderActions";

// Legacy planning template (kept for compatibility)
export {
  PlanningTemplate,
  type PlanningTemplateProps,
  type PlanningDay as LegacyPlanningDay,
  type PlanningItem as LegacyPlanningItem,
  type PlanningUser as LegacyPlanningUser,
  type PlanningGroup as LegacyPlanningGroup
} from "@/templates/PlanningTemplate";

// New comprehensive planning system
export {
  Planning,
  Header,
  Sidebar,
  PlanningBody,
  Toolbar,
  Legend,
  FilterControls,
  ImportExportActions,
  ViewModeSelector,
  TodayButton,
  type GenericDate,
  type PlanningDay,
  type PlanningItem,
  type PlanningUser,
  type PlanningGroup,
  type ViewMode,
  type ViewModeConfig,
  type FilterOption,
  type FilterConfig,
  type ActiveFilter,
  type ToolbarAction,
  type ImportExportConfig,
  type LegendItem,
  type LegendConfig,
  type SidebarTab,
  type SidebarConfig,
  type PlanningConfig,
  type PlanningProps
} from "@/templates/planning";