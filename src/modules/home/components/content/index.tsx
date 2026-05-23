import { CalendarWorkout } from "../calendarWorkout";
import { CurrentWorkout } from "../currentWorkout";
import { UserCard } from "../userCard";

export function HomePage() {
  return (
    <div className="grid gap-6 px-4 sm:px-6 py-6 min-h-screen text-zinc-100 font-sans">
      <div className="max-w-6xl mx-auto w-full grid gap-6">
        <UserCard />
        <CurrentWorkout />
        <CalendarWorkout />
      </div>
    </div>
  );
}