import { format, addDays } from "date-fns";
import fr from "date-fns/locale/fr";

interface Shift {
  id: string;
  employeeId: string;
  employeeName: string;
  startTime: string;
  endTime: string;
}

interface DaySchedule {
  date: Date;
  shifts: Shift[];
}

interface WeeklyPlanningProps {
  weekStart: Date;
  schedule: DaySchedule[];
  onAddShift: (date: Date) => void;
  onDeleteShift: (shiftId: string) => void;
}

const WeeklyPlanning = ({
  weekStart,
  schedule,
  onAddShift,
  onDeleteShift,
}: WeeklyPlanningProps) => {
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="grid grid-cols-7 gap-4">
      {days.map((day, index) => (
        <div key={index} className="border rounded-lg p-4">
          <div className="text-center font-semibold mb-4">
            {format(day, "EEEE d MMMM", { locale: fr })}
          </div>
          <div className="space-y-2">
            {schedule
              .find((s) => s.date.toDateString() === day.toDateString())
              ?.shifts.map((shift) => (
                <div
                  key={shift.id}
                  className="bg-blue-50 p-2 rounded-md text-sm relative group"
                >
                  <div className="font-medium">{shift.employeeName}</div>
                  <div className="text-gray-600">
                    {shift.startTime} - {shift.endTime}
                  </div>
                  <button
                    onClick={() => onDeleteShift(shift.id)}
                    className="absolute top-1 right-1 text-red-500 opacity-0 group-hover:opacity-100"
                  >
                    ×
                  </button>
                </div>
              ))}
            <button
              onClick={() => onAddShift(day)}
              className="w-full mt-2 py-1 px-2 text-sm text-blue-600 border border-blue-300 rounded hover:bg-blue-50"
            >
              + Ajouter un shift
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WeeklyPlanning;
