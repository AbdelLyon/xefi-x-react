export const SchoolHolidayZonesSkeleton = ({
  periodDays,
  zonesCount,
}: {
  periodDays: number;
  zonesCount: number;
}) => {
  return (
    <>
      {Array.from({ length: zonesCount }).map((_, zoneIndex) => (
        <div className="contents" key={`zone-skeleton-${zoneIndex}`}>
          {Array.from({ length: periodDays }).map((_, dayIndex) => (
            <div
              key={`zone-${zoneIndex}-day-${dayIndex}`}
              className="my-[1.5px] h-[2px] animate-pulse rounded-sm bg-foreground-200 opacity-30"
            />
          ))}
        </div>
      ))}
    </>
  );
};
