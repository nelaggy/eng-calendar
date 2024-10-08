import CalLinks from "@/lib/components/CalLinks";
import { CalendarView } from "@/lib/components/calendar/CalendarView";
import { Calendars } from "@/lib/components/Calendars";
import { Logout } from "@/lib/components/LogoutButton";
import { getGroups, getCalendar, getUser } from "@/lib/server/fetch";
import { Metadata } from "next";

export const runtime = "edge";

export const metadata: Metadata = {
  title: "Calendar",
};

export default async function Page() {
  const groups = await getGroups();
  const user = await getUser();
  const events = await getCalendar(user);
  return (
    <div className="p-4">
      <div className="invisible text-6xl sm:visible text-center">Calendar</div>
      <div className="flex space-y-4 flex-col md:flex-row md:space-x-4 p-4">
        <div>
          <Calendars cals={groups}>
            <CalLinks />
          </Calendars>
        </div>
        <CalendarView events={events} />
      </div>

      <Logout />
    </div>
  );
}
