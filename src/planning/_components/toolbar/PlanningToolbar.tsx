"use client";

import { DateValue } from "@internationalized/date";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@xefi/x-react/card";
import { RangeValue } from "@xefi/x-react/datepicker";
import { Switch } from "@xefi/x-react/form";
import { IconX } from "@xefi/x-react/icons";
import { addToast } from "@xefi/x-react/toast";
import dayjs from "dayjs";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import { LeaveType } from "@/models/Leave";
import {
  ExportLeavesRequest,
  leaveExportService,
} from "@/services/api/leave/LeaveExportService";
import { leaveImportService } from "@/services/api/leave/LeaveImportService";
import { Filter } from "@/services/types";
import { ViewMode, usePlanningStore } from "@/store/usePlanningStore";
import { useUserStore } from "@/store/useUserStore";

import { usePlanningQueries } from "../../_hooks/usePlanningQueries";
import { LeaveTypeLegend } from "../legend/LeaveTypeLegend";
import { LegendToggleButton } from "../legend/LegendToggleButton";
import { StatusLegend } from "../legend/StatusLegend";

import { ExportModal } from "./ExportModal";
import { FilterControls } from "./FilterControls";
import { ImportModal } from "./ImportModal";
import { SettingsDropdown } from "./SettingsDropdown";
import { TodayButton } from "./TodayButton";
import { ViewModeSelector } from "./ViewModeSelector";

type SelectedOptions = {
  sites?: number[];
  teams?: number[];
  users?: number[];
};

interface ImportError {
  [key: string]: string[] | undefined;
}

interface PlanningToolbarProps {
  leaveTypes: LeaveType[];
  selectedTeams: Set<string>;
  setSelectedTeams: Dispatch<SetStateAction<Set<string>>>;
}

const downloadError = (errors: ImportError | undefined) => {
  if (!errors) return;

  const blob = new Blob([JSON.stringify(errors, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `import-errors-${dayjs().format("DD-MM-YYYY")}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
};


const ADMIN_PROFILES = ["ADMINISTRATEUR", "ADMINISTRATEURMANAGER"];

export const PlanningToolbar = ({
  leaveTypes,
  selectedTeams,
  setSelectedTeams,
}: PlanningToolbarProps) => {
  const queryClient = useQueryClient();
  const { currentUser } = useUserStore();

  const {
    viewMode,
    setViewMode,
    reversePrimary,
    setReversePrimary,
    setCurrentDate,
    setFilters,
    setUsers,
    setPage,
    filters,
    isTagsDisplay,
  } = usePlanningStore();

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [showLegends, setShowLegends] = useState(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [exportFileName, setExportFileName] = useState("");

  const [selectedSites, setSelectedSites] = useState<Set<string>>(new Set());
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [dateRange, setDateRange] = useState<RangeValue<DateValue> | null>(
    null,
  );
  const [resetKey, setResetKey] = useState(0);

  const isAdmin = ADMIN_PROFILES.includes(currentUser?.profile?.label ?? "");

  const { resetFilters: resetQueriesFilters } = usePlanningQueries();

  const importMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const file = formData.get("file");
      if (!file || !(file instanceof File)) {
        throw new Error("Aucun fichier trouvé dans les données");
      }
      return await leaveImportService.importLeaves(formData);
    },
    onMutate: () => {
      addToast({ description: "Chargement de votre fichier en cours..." });
    },
    onSuccess: async (res) => {
      const responseData = res?.data || res;

      if (responseData?.success === "PartiallySucces") {
        addToast({
          color: "warning",
          description: responseData.message || "Import partiellement réussi",
          timeout: 5000,
          shouldShowTimeoutProgress: true,
          variant: "solid",
        });
        if (responseData.errors) {
          downloadError(responseData.errors);
        }
      } else {
        addToast({
          color: "success",
          description: responseData?.message || "Import réussi",
          timeout: 5000,
          shouldShowTimeoutProgress: true,
          variant: "solid",
        });
      }

      const queriesToInvalidate = [
        "users-planning",
        "leaves",
        "usersGrouped",
        "planningteams",
      ];
      queriesToInvalidate.forEach((queryKey) => {
        queryClient.invalidateQueries({ queryKey: [queryKey] });
      });

      setSelectedFile(null);
      setIsImportModalOpen(false);
    },
    onError: (err: unknown) => {
      console.error("Erreur d'import:", err);
      const error = err as {
        message?: string;
        response?: { data?: { message?: string } };
      };
      addToast({
        color: "danger",
        description:
          error.response?.data?.message ||
          error.message ||
          "Une erreur est survenue lors de l'import",
        timeout: 5000,
        shouldShowTimeoutProgress: true,
        variant: "solid",
      });
    },
  });

  const downloadModelMutation = useMutation({
    mutationFn: async () => {
      return leaveExportService.exportLeavesModel();
    },
    onSuccess: (response) => {
      const newBlob = new Blob([response], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(newBlob);
      const link = document.createElement("a");
      link.setAttribute("download", "modele_import_des_absences.xlsx");
      link.setAttribute("href", url);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      addToast({ color: "success", description: "Téléchargement réussi" });
    },
    onError: (err) => {
      console.error("Erreur de téléchargement:", err);
      addToast({
        color: "danger",
        description: "Une erreur s'est produite lors du téléchargement",
        timeout: 5000,
        shouldShowTimeoutProgress: true,
        variant: "solid",
      });
    },
  });

  const exportMutation = useMutation({
    mutationFn: async ({ fileName }: { fileName: string }) => {
      const updatedFilter = filters.map((item) => {
        if (!item.field) return item;
        const fieldMappings: Record<string, string> = {
          id: "user_id",
          "site.id": "user.site_id",
          "tags.id": "user.tags.id",
        };

        return fieldMappings[item.field]
          ? { ...item, field: fieldMappings[item.field] }
          : item;
      });

      const startDateFilter = filters.find(
        (item) => item.field === "start_date",
      );
      const endDateFilter = filters.find((item) => item.field === "end_date");

      const exportRequest: ExportLeavesRequest = {
        filename: fileName,
        ...(startDateFilter &&
          endDateFilter && {
            start_date: dayjs(startDateFilter.value as string).format(
              "YYYY-MM-DD",
            ),
            end_date: dayjs(endDateFilter.value as string).format("YYYY-MM-DD"),
          }),
        is_treat: 0,
        filters: [
          ...updatedFilter,
          {
            field: "leave_type.leave_type_category_id",
            operator: "=" as const,
            value: 2,
          },
        ],
        ...(isTagsDisplay && {
          scopes: [{ name: "tagsUserLeave" }],
        }),
      };

      const response = await leaveExportService.exportLeaves(exportRequest);

      let blob: Blob;
      if (typeof response === "string") {
        blob = new Blob([response], { type: "text/csv;charset=utf-8;" });
      } else if (response instanceof Blob) {
        blob = response;
      } else {
        throw new Error("Format de réponse non supporté");
      }

      return { blob, fileName };
    },
    onSuccess: ({ blob, fileName }) => {
      try {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        const today = dayjs().format("DD-MM-YYYY");
        const downloadName =
          fileName && fileName !== today
            ? `${fileName}-${today}.csv`
            : `${today}.csv`;

        link.setAttribute("href", url);
        link.setAttribute("download", downloadName);
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);

        addToast({
          color: "success",
          description: "Export réussi",
          timeout: 5000,
          shouldShowTimeoutProgress: true,
          variant: "solid",
        });
        setExportFileName("");
        setIsExportModalOpen(false);
      } catch (error) {
        console.error("Erreur lors de la création de l'URL:", error);
        addToast({
          color: "danger",
          description: "Erreur lors du téléchargement du fichier",
          timeout: 5000,
          shouldShowTimeoutProgress: true,
          variant: "solid",
        });
      }
    },
    onError: (err) => {
      console.error("Erreur d'export:", err);
      addToast({
        color: "danger",
        description: "Erreur lors de l'export",
        timeout: 5000,
        shouldShowTimeoutProgress: true,
        variant: "solid",
      });
    },
  });

  const handleRemoveFile = useCallback((file: File) => {
    setFiles(prev => prev.filter(f => f !== file));
    setSelectedFile(null);
  }, []);

  const handleSetFiles = useCallback((newFiles: File[]) => {
    setFiles(newFiles);
    setSelectedFile(newFiles[0] || null);
  }, []);

  const handleImport = useCallback(() => {
    if (!selectedFile) {
      addToast({
        color: "warning",
        description: "Veuillez sélectionner un fichier avant d'importer",
        timeout: 5000,
        shouldShowTimeoutProgress: true,
        variant: "solid",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name);
    importMutation.mutate(formData);
  }, [selectedFile, importMutation]);

  const handleExport = useCallback(() => {
    exportMutation.mutate({ fileName: exportFileName });
  }, [exportFileName, exportMutation]);

  const applyFilters = useCallback(
    (
      newOptions: SelectedOptions,
      newDateRange?: { start: DateValue; end: DateValue } | null,
    ) => {
      const newFilters = Object.entries(newOptions)
        .filter(
          ([key, values]) => key !== "dates" && values && values.length > 0,
        )
        .map(([filterKey, values]) => {
          const filterMappings: Record<string, string> = {
            sites: "site.id",
            teams: "tags.id",
            users: "id",
          };

          const field = filterMappings[filterKey];
          return field
            ? {
                field,
                operator: "in" as const,
                value: values,
              }
            : null;
        })
        .filter(Boolean) as Filter[];

      const currentDateRange =
        newDateRange === null ? null : newDateRange || dateRange;
      if (currentDateRange?.start && currentDateRange?.end) {
        newFilters.push(
          {
            field: "start_date",
            operator: ">=",
            value: dayjs(currentDateRange.start.toString()).format(
              "YYYY-MM-DD",
            ),
          },
          {
            field: "end_date",
            operator: "<=",
            value: dayjs(currentDateRange.end.toString()).format("YYYY-MM-DD"),
          },
        );
      }

      setFilters(newFilters);
      setSelectedOptions(newOptions);
      setPage(1);
      setUsers([]);
    },
    [dateRange, setFilters, setPage, setUsers],
  );

  const createSelectionHandler = useCallback(
    (
      setSelectedKeys: React.Dispatch<React.SetStateAction<Set<string>>>,
      optionKey: keyof SelectedOptions,
    ) => {
      return (keys: Set<React.Key> | React.Key | null) => {
        if (!keys) {
          setSelectedKeys(new Set());
          const newOptions: SelectedOptions = { ...selectedOptions };
          delete newOptions[optionKey];
          applyFilters(newOptions);
          return;
        }

        const keySet = keys instanceof Set ? keys : new Set([keys]);

        const stringKeys = new Set(Array.from(keySet).map(String));
        setSelectedKeys(stringKeys);

        const selectedIds = Array.from(keySet).map(Number);

        const newOptions: SelectedOptions = { ...selectedOptions };
        if (selectedIds.length > 0) {
          newOptions[optionKey] = selectedIds;
        } else {
          delete newOptions[optionKey];
        }

        applyFilters(newOptions);
      };
    },
    [selectedOptions, applyFilters],
  );

  const handleSiteSelection = createSelectionHandler(setSelectedSites, "sites");

  const handleTeamSelection = createSelectionHandler(setSelectedTeams, "teams");
  const handleUserSelection = createSelectionHandler(setSelectedUsers, "users");

  const handleDateRangeChange = useCallback(
    (range: { start: DateValue; end: DateValue } | null) => {
      setViewMode("dateSelected");
      setDateRange(range);
      if (range?.start && range?.end) {
        applyFilters(selectedOptions, {
          start: range.start,
          end: range.end,
        });
      }
    },
    [selectedOptions, applyFilters, setViewMode],
  );

  const resetAllFilters = useCallback(() => {
    setSelectedSites(new Set());
    setSelectedTeams(new Set());
    setSelectedUsers(new Set());
    setSelectedOptions({});
    setFilters([]);
    setUsers([]);
    setPage(1);
    setDateRange(null);
    resetQueriesFilters();
    setResetKey((prev) => prev + 1);
  }, [setFilters, setUsers, setPage, resetQueriesFilters, setSelectedTeams]);

  const goToToday = useCallback(() => {
    const currentOptions = { ...selectedOptions };
    setDateRange(null);
    setCurrentDate(dayjs());
    setViewMode("week");

    applyFilters(currentOptions, null);

    setUsers([]);
    setPage(1);
  }, [
    selectedOptions,
    applyFilters,
    setCurrentDate,
    setViewMode,
    setUsers,
    setPage,
  ]);

  const handleViewModeChange = useCallback(
    (newViewMode: ViewMode) => {
      setViewMode(newViewMode);
      const currentOptions = { ...selectedOptions };
      setDateRange(null);

      applyFilters(currentOptions, null);

      setUsers([]);
      setPage(1);
      queryClient.invalidateQueries({ queryKey: ["users-planning"] });
    },
    [
      setViewMode,
      selectedOptions,
      applyFilters,
      setUsers,
      setPage,
      queryClient,
    ],
  );

  const toggleLegends = useCallback(() => {
    const newShowLegends = !showLegends;
    setShowLegends(newShowLegends);
    localStorage.setItem("show_legends", newShowLegends.toString());
  }, [showLegends]);

  const closeImportModal = useCallback(() => {
    setIsImportModalOpen(false);
    setSelectedFile(null);
    setFiles([]);
  }, []);

  const closeExportModal = useCallback(() => {
    setIsExportModalOpen(false);
  }, []);

  useEffect(() => {
    const savedPeriod = localStorage.getItem("planning_period");
    if (savedPeriod && ["twomonths", "month", "week"].includes(savedPeriod)) {
      setViewMode(savedPeriod as ViewMode);
    }

    const savedReversePrimary = localStorage.getItem("reverse_primary");
    if (savedReversePrimary !== null) {
      setReversePrimary(savedReversePrimary === "true");
    }

    const savedShowLegends = localStorage.getItem("show_legends");
    if (savedShowLegends !== null) {
      setShowLegends(savedShowLegends === "true");
    }
  }, [setViewMode, setReversePrimary]);

  useEffect(() => {
    localStorage.setItem("planning_period", viewMode);
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem("reverse_primary", reversePrimary.toString());
  }, [reversePrimary]);

  return (
    <>
      <div className="w-full bg-background">
        <div className="flex items-center justify-end py-2">
          <div className="flex items-center gap-2">
            <ViewModeSelector
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange}
            />
            {isAdmin && (
              <SettingsDropdown
                onDownloadModel={() => downloadModelMutation.mutate()}
                onOpenImportModal={() => setIsImportModalOpen(true)}
                onOpenExportModal={() => setIsExportModalOpen(true)}
              />
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-wrap items-end justify-between gap-2">
          <FilterControls
            selectedSites={selectedSites}
            selectedTeams={selectedTeams}
            selectedUsers={selectedUsers}
            dateRange={dateRange}
            onSiteSelection={handleSiteSelection}
            onTeamSelection={handleTeamSelection}
            onUserSelection={handleUserSelection}
            onDateRangeChange={handleDateRangeChange}
            onResetFilters={resetAllFilters}
            resetKey={resetKey}
          />
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <TodayButton onGoToToday={goToToday} />

            <LegendToggleButton
              showLegends={showLegends}
              onToggle={toggleLegends}
            />

            <div className="flex items-center gap-2 bg-background px-3 py-1.5">
              <span className="text-xs opacity-70 transition">
                Inverser couleurs type/statut
              </span>
              <Switch
                size="sm"
                classNames={{
                  wrapper: "h-5 w-9 border border-border/40",
                  thumb: "size-3",
                }}
                isSelected={reversePrimary}
                onValueChange={() => setReversePrimary(!reversePrimary)}
              />
            </div>
          </div>
        </div>
      </div>

      <ImportModal
        isOpen={isImportModalOpen}
        onClose={closeImportModal}
        selectedFile={selectedFile}
        onImport={handleImport}
        isImporting={importMutation.isPending}
        files={files}
        setFiles={handleSetFiles}
        handleRemoveFile={handleRemoveFile}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={closeExportModal}
        exportFileName={exportFileName}
        onFileNameChange={setExportFileName}
        onExport={handleExport}
        isExporting={exportMutation.isPending}
      />

      {showLegends && (
        <Card
          classNames={{
            base: "fixed bottom-3 right-3 z-50 overflow-hidden transition-all duration-300 ease-in-out",
          }}
          header={
            <IconX
              className="absolute right-2 cursor-pointer opacity-70 hover:opacity-90"
              onClick={() => setShowLegends(false)}
              size={18}
            />
          }
        >
          <div className="flex">
            <LeaveTypeLegend leaveTypes={leaveTypes} />
            <StatusLegend />
          </div>
        </Card>
      )}
    </>
  );
};
