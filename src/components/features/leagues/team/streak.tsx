import { FC } from "react";
import { Team } from "@/utils/yahoo/types/common";
import { HiFire } from "react-icons/hi";
import { IoSnowOutline } from "react-icons/io5";

type Props = {
  team?: Team;
};

const StreakBadge: FC<Props> = ({ team }) => {
  const streak = team?.teamStandings?.streak;
  const type = streak?.type;
  const count = Number(streak?.value);
  const significant = count > 2;

  return (
    <div className="flex items-center gap-[0.2rem] text-2xl">
      {/* <span className="font-medium">{count}</span> */}
      {significant && type === "win" && (
        <HiFire className="text-orange-600 dark:text-orange-500" />
      )}
      {significant && type === "loss" && (
        <IoSnowOutline className="text-sky-600 dark:text-sky-500" />
      )}
    </div>
  );
};

export default StreakBadge;
