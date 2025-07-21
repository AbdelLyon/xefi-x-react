export const GRID_VARIANTS = {
  bordered: {
    thead: "bg-content1-100 rounded-none",
    th: "h-14 bg-content1-100 py-4 text-left whitespace-nowrap backdrop-blur-sm border-b border-border/40 transition-all duration-200 group-hover:bg-content1-200",
    tr: "py-4 border-b border-border last:border-b-0 hover:bg-content1-200 h-12 transition-all duration-200 hover:shadow-sm group",
    td: "py-4 h-12 max-h-12 py-1 text-left truncate max-w-0 transition-all duration-200 group-hover:bg-content1-200",
  },
  striped: {
    thead: "bg-content1-100 rounded-none",
    th: "h-14 bg-content1-100 py-4 text-left whitespace-nowrap backdrop-blur-sm border-b border-border/40 transition-all duration-200 group-hover:bg-content1-200",
    tr: "py-4 even:bg-content1-100 h-12 hover:bg-content1-200 border-0 transition-all duration-200 hover:shadow-sm group",
    td: "py-4 h-12 max-h-12 py-1 text-left truncate max-w-0 transition-all duration-200 group-hover:bg-content1-200",
  },
  unstyled: {
    thead: "bg-content1-100 rounded-none",
    th: "h-14 bg-content1-100  py-4 text-left whitespace-nowrap backdrop-blur-sm border-b border-border/40 transition-all duration-200 group-hover:bg-content1-200",
    tr: "py-4 hover:bg-content1-200 h-12 border-0 transition-all duration-200 hover:shadow-sm group",
    td: "py-4 h-12 max-h-12 py-1 text-left truncate max-w-0 transition-all duration-200 group-hover:bg-content1-200",
  },
};