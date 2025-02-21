import { ReactNode } from "react";

export interface ComponentProps {
  children?: ReactNode;
}

export interface Employee {
  _id: string;
  name: string;
  role: string;
  contractHours: number;
  workedHours: number;
}

export interface Schedule {
  date: Date;
  shifts: Shift[];
}

export interface Shift {
  id: string;
  employeeId: string;
  employeeName: string;
  startTime: string;
  endTime: string;
}

export interface VacationRequest {
  _id: string;
  employeeId: string;
  employeeName: string;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: "En attente" | "Approuvé" | "Refusé";
}

export interface DaySchedule {
  date: Date;
  shifts: Shift[];
}

export interface Planning {
  _id: string;
  startDate: Date;
  endDate: Date;
  type: "jour" | "semaine" | "mois" | "année";
  weeklySchedules: WeeklySchedule[];
}

export interface WeeklySchedule {
  employee: Employee;
  weekStart: Date;
  weekEnd: Date;
  schedules: DaySchedule[];
  isAutoGenerated: boolean;
  status: "brouillon" | "publié" | "archivé";
}

export interface Shift {
  employee: Employee;
  startTime: string;
  endTime: string;
  type: "normal" | "congé" | "absence" | "formation";
}
