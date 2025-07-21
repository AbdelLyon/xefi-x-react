// Chart.test.tsx
import type { Mock } from "vitest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { Chart } from "@/chart";
import type { JSX } from "react";

vi.mock(
  "react-chartjs-2",
  (): {
    Chart: Mock<
      ({
        options,
      }: {
        options: { plugins: { title: { text: string } } };
      }) => JSX.Element
    >;
  } => ({
    Chart: vi.fn(
      ({ options }): JSX.Element => (
        <div data-testid="mock-chart">{options?.plugins?.title?.text}</div>
      ),
    ),
  }),
);

describe("Composant Chart", (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
  });

  const mockBarData = {
    labels: ["Rouge", "Bleu", "Jaune"],
    datasets: [
      {
        label: "Jeu de données en barres",
        data: [10, 20, 30],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const mockLineData = {
    labels: ["Jan", "Fév", "Mar"],
    datasets: [
      {
        label: "Jeu de données en ligne",
        data: [5, 10, 15],
        borderColor: "#FF6384",
        tension: 0.1,
      },
    ],
  };

  const mockDoughnutData = {
    labels: ["A", "B", "C"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const mockPolarAreaData = {
    labels: ["Rouge", "Bleu", "Jaune"],
    datasets: [
      {
        data: [11, 16, 7],
        backgroundColor: ["#FF6384", "#4BC0C0", "#FFCE56"],
      },
    ],
  };

  describe("Snapshots", (): void => {
    it("devrait correspondre au snapshot avec les props par défaut", (): void => {
      const { container } = render(<Chart type="bar" data={mockBarData} />);
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot avec un titre personnalisé", (): void => {
      const { container } = render(
        <Chart type="bar" data={mockBarData} title="Graphique de test" />,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot pour un graphique en ligne", (): void => {
      const { container } = render(
        <Chart
          type="line"
          data={mockLineData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot pour un graphique en donut", (): void => {
      const { container } = render(
        <Chart
          type="doughnut"
          data={mockDoughnutData}
          options={{
            color: "red",
          }}
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait correspondre au snapshot pour un graphique en aire polaire", (): void => {
      const { container } = render(
        <Chart
          type="polarArea"
          data={mockPolarAreaData}
          options={{
            scales: {
              r: {
                beginAtZero: true,
              },
            },
          }}
        />,
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("Configuration des options", (): void => {
    it("devrait correctement configurer les options de légende", (): void => {
      const { container } = render(
        <Chart
          type="doughnut"
          data={mockDoughnutData}
          options={{
            plugins: {
              legend: {
                position: "right",
                labels: {
                  padding: 20,
                },
              },
            },
          }}
        />,
      );
      expect(container).toMatchSnapshot();
    });

    it("devrait fusionner correctement les options par défaut avec les options personnalisées", (): void => {
      const customOptions = {
        responsive: false,
        plugins: {
          legend: {
            position: "bottom" as const,
          },
        },
      };

      const { container } = render(
        <Chart type="bar" data={mockBarData} options={customOptions} />,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
