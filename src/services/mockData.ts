// Nouveau fichier pour centraliser les données fictives
export const mockEmployees = [
  {
    _id: "1",
    name: "Jean Dupont",
    role: "Développeur Senior",
    contractHours: 35,
    workedHours: 37,
    extraHours: 2,
    vacationDaysTotal: 25,
    vacationDaysUsed: 12,
    vacationDaysRemaining: 13,
    availability: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
  },
  {
    _id: "2",
    name: "Marie Martin",
    role: "Designer UI/UX",
    contractHours: 35,
    workedHours: 35,
    extraHours: 0,
    vacationDaysTotal: 25,
    vacationDaysUsed: 8,
    vacationDaysRemaining: 17,
    availability: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
  },
  {
    _id: "3",
    name: "Pierre Dubois",
    role: "Chef de Projet",
    contractHours: 35,
    workedHours: 40,
    extraHours: 5,
    vacationDaysTotal: 25,
    vacationDaysUsed: 15,
    vacationDaysRemaining: 10,
    availability: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
  },
  {
    _id: "4",
    name: "Sophie Bernard",
    role: "Développeur Full-Stack",
    contractHours: 35,
    workedHours: 38,
    extraHours: 3,
    vacationDaysTotal: 25,
    vacationDaysUsed: 5,
    vacationDaysRemaining: 20,
    availability: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
  },
  // ... ajout de 4 autres employés fictifs
];

export const mockVacationRequests = [
  {
    _id: "1",
    employeeId: "1",
    employeeName: "Jean Dupont",
    startDate: new Date("2024-04-15"),
    endDate: new Date("2024-04-19"),
    status: "En attente",
    reason: "Vacances d'été",
  },
  {
    _id: "2",
    employeeId: "2",
    employeeName: "Marie Martin",
    startDate: new Date("2024-05-20"),
    endDate: new Date("2024-05-24"),
    status: "Approuvé",
    reason: "Congés personnels",
  },
  {
    _id: "3",
    employeeId: "3",
    employeeName: "Pierre Dubois",
    startDate: new Date("2024-06-10"),
    endDate: new Date("2024-06-21"),
    status: "En attente",
    reason: "Vacances familiales",
  },
  // ... autres demandes de congés
];

export const mockPlanning = {
  weeklySchedules: [
    {
      employee: mockEmployees[0],
      weekStart: new Date("2024-03-25"),
      weekEnd: new Date("2024-03-31"),
      schedules: [
        {
          date: new Date("2024-03-25"),
          shifts: [
            {
              startTime: "09:00",
              endTime: "17:00",
              type: "normal",
            },
          ],
        },
        // ... autres jours
      ],
    },
    {
      employee: mockEmployees[1],
      weekStart: new Date("2024-03-25"),
      weekEnd: new Date("2024-03-31"),
      schedules: [
        {
          date: new Date("2024-03-25"),
          shifts: [
            {
              startTime: "09:00",
              endTime: "17:00",
              type: "normal",
            },
          ],
        },
        {
          date: new Date("2024-03-26"),
          shifts: [
            {
              startTime: "10:00",
              endTime: "18:00",
              type: "formation",
            },
          ],
        },
        // ... autres jours
      ],
    },
    // ... autres semaines
  ],
};

export const mockChartData = {
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
    { month: "Janvier", requests: 15, approved: 12, rejected: 3 },
    { month: "Février", requests: 18, approved: 15, rejected: 3 },
    { month: "Mars", requests: 12, approved: 10, rejected: 2 },
    { month: "Avril", requests: 20, approved: 16, rejected: 4 },
    { month: "Mai", requests: 25, approved: 20, rejected: 5 },
    { month: "Juin", requests: 30, approved: 25, rejected: 5 },
  ],
  overtimeData: [
    { department: "Développement", hours: 45, cost: 2250 },
    { department: "Design", hours: 30, cost: 1500 },
    { department: "Support", hours: 25, cost: 1250 },
    { department: "Marketing", hours: 15, cost: 750 },
    { department: "RH", hours: 10, cost: 500 },
    { department: "Commercial", hours: 20, cost: 1000 },
  ],
  monthlyStats: {
    totalEmployees: 40,
    activeProjects: 12,
    averageUtilization: 85,
    totalVacationDays: 120,
  },
};
