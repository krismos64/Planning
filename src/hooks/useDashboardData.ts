import { useState, useEffect } from "react";
import { api } from "../services/api";

interface DashboardData {
  employees: {
    _id: string;
    name: string;
    role: string;
    contractHours: number;
    workedHours: number;
  }[];
  workloadData: {
    date: string;
    plannedHours: number;
    actualHours: number;
  }[];
  employeeDistributionData: {
    role: string;
    count: number;
  }[];
  vacationTrendData: {
    month: string;
    requests: number;
    approved: number;
    rejected: number;
  }[];
  overtimeData: {
    department: string;
    hours: number;
    cost: number;
  }[];
}

// Données fictives étendues pour le dashboard
const defaultData: DashboardData = {
  employees: [
    {
      _id: "1",
      name: "Jean Dupont",
      role: "Développeur Senior",
      contractHours: 35,
      workedHours: 37,
    },
    {
      _id: "2",
      name: "Marie Martin",
      role: "Designer UI/UX",
      contractHours: 35,
      workedHours: 35,
    },
    {
      _id: "3",
      name: "Bob Johnson",
      role: "Managers",
      contractHours: 170,
      workedHours: 165,
    },
    {
      _id: "4",
      name: "Alice Brown",
      role: "Support",
      contractHours: 155,
      workedHours: 160,
    },
    {
      _id: "5",
      name: "Charlie Davis",
      role: "Marketing",
      contractHours: 150,
      workedHours: 145,
    },
    {
      _id: "6",
      name: "Eve Wilson",
      role: "RH",
      contractHours: 80,
      workedHours: 75,
    },
    {
      _id: "7",
      name: "Frank Miller",
      role: "Commercial",
      contractHours: 40,
      workedHours: 35,
    },
  ],
  workloadData: [
    { date: "Lundi", plannedHours: 160, actualHours: 155 },
    { date: "Mardi", plannedHours: 165, actualHours: 170 },
    { date: "Mercredi", plannedHours: 170, actualHours: 165 },
    { date: "Jeudi", plannedHours: 155, actualHours: 160 },
    { date: "Vendredi", plannedHours: 150, actualHours: 145 },
    { date: "Samedi", plannedHours: 80, actualHours: 75 },
    { date: "Dimanche", plannedHours: 40, actualHours: 35 },
  ],
  employeeDistributionData: [
    { role: "Développeurs", count: 12 },
    { role: "Designers", count: 5 },
    { role: "Managers", count: 3 },
    { role: "Support", count: 8 },
    { role: "Marketing", count: 4 },
    { role: "RH", count: 2 },
    { role: "Commercial", count: 6 },
  ],
  vacationTrendData: [
    { month: "Jan", requests: 15, approved: 12, rejected: 3 },
    { month: "Fév", requests: 18, approved: 15, rejected: 3 },
    { month: "Mar", requests: 12, approved: 10, rejected: 2 },
    { month: "Avr", requests: 20, approved: 16, rejected: 4 },
  ],
  overtimeData: [
    { department: "Dev", hours: 45, cost: 2250 },
    { department: "Design", hours: 30, cost: 1500 },
    { department: "Support", hours: 25, cost: 1250 },
    { department: "Marketing", hours: 15, cost: 750 },
  ],
};

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData>(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      if (process.env.NODE_ENV === "development") {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setData(defaultData);
      } else {
        const [employees, workload, distribution, vacations, overtime] =
          await Promise.all([
            api.employees.getAll(),
            api.stats.getWorkloadData(),
            api.stats.getEmployeeDistribution(),
            api.stats.getVacationTrends(),
            api.stats.getOvertimeData(),
          ]);

        setData({
          employees,
          workloadData: workload,
          employeeDistributionData: distribution,
          vacationTrendData: vacations,
          overtimeData: overtime,
        });
      }
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des données");
      setData(defaultData);
    } finally {
      setLoading(false);
    }
  };

  // Charger les données initiales
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Mettre à jour les données toutes les 5 minutes
  useEffect(() => {
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error, refetch: fetchDashboardData };
};
