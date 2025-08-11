import { useTranslation } from "react-i18next";

const status = [
  {
    id: 1,
    tag: "VALIDATED",
    name: "Validé",
    color: "#9DD400",
  },
  {
    id: 2,
    tag: "SUBMITTED",
    name: "Soumis à validation",
    color: "#FFBE0B",
  },
  {
    id: 3,
    tag: "TRANSMITTED",
    name: "Transmis en paie",
    color: "#5FAEDB",
  },
];

type PropsItem = {
  label: string;
  color: string;
};

const StatusLegendItem = ({ label, color }: PropsItem) => {
  return (
    <div className="flex items-center gap-x-2 rounded p-0.5 transition-colors duration-200 hover:bg-gray-50">
      <div
        className="h-2 w-5 min-w-[16px] rounded-full shadow-sm"
        style={{ background: color }}
      ></div>
      <p style={{ fontSize: 11 }} className="truncate opacity-70">
        {label ?? ""}
      </p>
    </div>
  );
};

export const StatusLegend = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2 className="mb-2 text-base font-semibold text-red-600">
        {t("status")}
      </h2>
      <div className="flex flex-col gap-y-2">
        {status.map((status, index) => (
          <div key={index}>
            <StatusLegendItem label={status.name} color={status.color} />
          </div>
        ))}
      </div>
    </div>
  );
};
