declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_API_URL?: string;
    }
  }
}

export const config = {
  apiUrl: process.env.REACT_APP_API_URL || "http://localhost:5000",
  defaultWorkHours: {
    start: "09:00",
    end: "17:00",
  },
  workDays: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
};
