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
  employeeName: string;
  startDate: Date;
  endDate: Date;
  status: "En attente" | "Approuvé" | "Refusé";
  reason: string;
}

export interface DaySchedule {
  date: Date;
  shifts: Shift[];
}
