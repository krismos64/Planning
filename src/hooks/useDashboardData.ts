import { useState, useEffect } from "react";
import { api } from "../services/api";

interface DashboardData {
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

// Données par défaut pour le développement
const defaultData: DashboardData = {
  workloadData: [
    { date: "Lun", plannedHours: 160, actualHours: 155 },
    { date: "Mar", plannedHours: 165, actualHours: 170 },
    { date: "Mer", plannedHours: 170, actualHours: 165 },
    { date: "Jeu", plannedHours: 155, actualHours: 160 },
    { date: "Ven", plannedHours: 150, actualHours: 145 },
  ],
  employeeDistributionData: [
    { role: "Développeurs", count: 12 },
    { role: "Designers", count: 5 },
    { role: "Managers", count: 3 },
    { role: "Support", count: 8 },
    { role: "Marketing", count: 4 },
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
  const [data, setData] = useState<DashboardData>(defaultData); // Initialiser avec les données par défaut
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      if (process.env.NODE_ENV === "development") {
        // En développement, simuler un délai et retourner les données par défaut
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setData(defaultData);
      } else {
        // En production, faire les vrais appels API
        const [workload, distribution, vacations, overtime] = await Promise.all(
          [
            api.stats.getWorkloadData(),
            api.stats.getEmployeeDistribution(),
            api.stats.getVacationTrends(),
            api.stats.getOvertimeData(),
          ]
        );

        setData({
          workloadData: workload,
          employeeDistributionData: distribution,
          vacationTrendData: vacations,
          overtimeData: overtime,
        });
      }
      setError(null);
    } catch (err) {
      setError("Erreur lors du chargement des données");
      // En cas d'erreur, utiliser les données par défaut
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
