import { CalendarWorkout } from "../calendarWorkout";
import { CurrentWorkout } from "../currentWorkout";
import { UserCard } from "../userCard";

export function HomePage() {
  return (
    <div className="grid gap-6 px-4 sm:px-6 pt-4 pb-8 min-h-[calc(100vh-64px)] text-zinc-100 font-sans">
      <div className="max-w-6xl mx-auto w-full grid gap-6">
        <UserCard />
        <CurrentWorkout />
        <CalendarWorkout />
      </div>
    </div>
  );
}