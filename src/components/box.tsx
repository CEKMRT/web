// import { SkeletonCard } from "./skeleton";
import ScheduleComponent from "./ui/box";
const BoxComp = () => {
  return (
    <div className="space-y-4 px-4">
      <ScheduleComponent
        apiUrl="http://localhost:8080/schedules/20/Arah%20Bundaran%20HI"
        title="Bundaran HI > Lebak Bulus Grab"
        subtitle="Stasiun Akhir"
      />
      {/* <SkeletonCard /> */}
      <ScheduleComponent
        apiUrl="/api/schedules"
        title="Lebak Bulus Grab > Bundaran HI"
        subtitle="Stasiun Awal"
      />
    </div>
  );
};

export default BoxComp;
