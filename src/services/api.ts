import { config } from "../config";

const API_URL = config.apiUrl;

export const api = {
  baseUrl: API_URL,
  employees: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/employees`);
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des employés");
      return response.json();
    },

    create: async (employeeData: any) => {
      const response = await fetch(`${API_URL}/employees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });
      if (!response.ok)
        throw new Error("Erreur lors de la création de l'employé");
      return response.json();
    },

    update: async (id: string, employeeData: any) => {
      const response = await fetch(`${API_URL}/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });
      if (!response.ok)
        throw new Error("Erreur lors de la mise à jour de l'employé");
      return response.json();
    },

    delete: async (id: string) => {
      const response = await fetch(`${API_URL}/employees/${id}`, {
        method: "DELETE",
      });
      if (!response.ok)
        throw new Error("Erreur lors de la suppression de l'employé");
      return response.json();
    },
  },

  planning: {
    getWeeklyPlanning: async (weekStart: Date) => {
      const response = await fetch(
        `${API_URL}/planning?weekStart=${weekStart.toISOString()}`
      );
      if (!response.ok)
        throw new Error("Erreur lors de la récupération du planning");
      return response.json();
    },

    createShift: async (data: {
      date: Date;
      employeeId: string;
      startTime: string;
      endTime: string;
    }) => {
      const response = await fetch(`${API_URL}/planning/shifts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Erreur lors de la création du shift");
      return response.json();
    },

    deleteShift: async (shiftId: string) => {
      const response = await fetch(`${API_URL}/planning/shifts/${shiftId}`, {
        method: "DELETE",
      });
      if (!response.ok)
        throw new Error("Erreur lors de la suppression du shift");
      return response.json();
    },
  },

  stats: {
    getDashboardStats: async () => {
      const response = await fetch(`${API_URL}/stats/dashboard`);
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des statistiques");
      return response.json();
    },

    getEmployeeStats: async (employeeId: string) => {
      const response = await fetch(`${API_URL}/stats/employee/${employeeId}`);
      if (!response.ok)
        throw new Error(
          "Erreur lors de la récupération des statistiques de l'employé"
        );
      return response.json();
    },
  },

  vacations: {
    getAll: async () => {
      const response = await fetch(`${API_URL}/vacations`);
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des demandes de congé");
      return response.json();
    },

    create: async (data: {
      employeeId: string;
      startDate: Date;
      endDate: Date;
      reason: string;
    }) => {
      const response = await fetch(`${API_URL}/vacations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok)
        throw new Error("Erreur lors de la création de la demande de congé");
      return response.json();
    },

    update: async (id: string, data: any) => {
      const response = await fetch(`${API_URL}/vacations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok)
        throw new Error("Erreur lors de la mise à jour de la demande de congé");
      return response.json();
    },
  },

  auth: {
    login: async (email: string, password: string) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error("Erreur d'authentification");
      return response.json();
    },

    checkAuth: async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/auth/check`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Token invalide");
      return response.json();
    },
  },
};
