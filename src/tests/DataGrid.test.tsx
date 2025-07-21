import type { ColumnDefinition } from "@/datagrid";
import { DataGrid } from "@/datagrid";
import { render, screen, fireEvent } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

class MockIntersectionObserver {
  readonly root: Element | null;
  readonly rootMargin: string;
  readonly thresholds: ReadonlyArray<number>;
  constructor(
    _callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    this.root = options?.root instanceof Element ? options.root : null;
    this.rootMargin = options?.rootMargin ?? "0px";
    this.thresholds = Array.isArray(options?.threshold)
      ? options.threshold
      : [options?.threshold ?? 0];
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = vi.fn(() => []);
}

interface TestData {
  id: number;
  name: string;
  age: number;
}

describe("Composant DataGrid", (): void => {
  beforeEach(() => {
    window.IntersectionObserver = MockIntersectionObserver;
  });

  const testData: TestData[] = [
    { id: 1, name: "John Doe", age: 30 },
    { id: 2, name: "Jane Smith", age: 25 },
    { id: 3, name: "Bob Johnson", age: 35 },
  ];

  const columns: ColumnDefinition<TestData>[] = [
    {
      field: "name",
      header: "Nom",
      sortable: true,
    },
    {
      field: "age",
      header: "Âge",
      sortable: true,
    },
  ];

  const renderDataGrid = (
    props: Partial<Parameters<typeof DataGrid<TestData>>[0]> = {},
  ) => {
    return render(
      <DataGrid<TestData>
        rows={testData}
        columns={columns}
        fetchNextPage={vi.fn()}
        {...props}
      />,
    );
  };

  describe("Snapshots", (): void => {
    it("devrait correspondre au snapshot avec données de base", (): void => {
      const { container } = renderDataGrid();
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot sans données", (): void => {
      const { container } = renderDataGrid({ rows: [] });
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot en état de chargement", (): void => {
      const { container } = renderDataGrid({ isLoading: true });
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec contenu personnalisé des cellules", (): void => {
      const colonnesPersonnalisees = [
        ...columns,
        {
          field: "actions" as const,
          header: "Actions",
          cell: (): ReactNode => <button>Modifier</button>,
        },
      ];

      const { container } = renderDataGrid({ columns: colonnesPersonnalisees });
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec variante de style", (): void => {
      const { container } = renderDataGrid({ variant: "bordered" });
      expect(container).toMatchSnapshot();
    });
  });

  describe("Comportement", (): void => {
    it("devrait gérer le tri des colonnes", (): void => {
      const onSort = vi.fn();
      renderDataGrid({ onSortChange: onSort });

      const enTeteNom = screen.getByText("Nom");
      const boutonTri = enTeteNom
        .closest("div")
        ?.querySelector("[role='button']");

      if (boutonTri) {
        fireEvent.click(boutonTri);
        expect(onSort).toHaveBeenCalledWith("name", "desc");
      }
    });
  });

  describe("Accessibilité", (): void => {
    it("devrait avoir les attributs ARIA corrects", (): void => {
      renderDataGrid();

      expect(screen.getByRole("grid")).toHaveAttribute(
        "aria-label",
        "data-grid",
      );
      expect(screen.getAllByRole("row")).toHaveLength(testData.length + 1);
    });
  });
});
