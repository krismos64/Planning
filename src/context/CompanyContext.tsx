import { createContext, useContext, useState, ReactNode } from "react";

interface CompanyContextType {
  companyLogo: string | null;
  updateCompanyLogo: (logo: string | null) => void;
  companyName: string;
  updateCompanyName: (name: string) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("Mon Entreprise");

  const updateCompanyLogo = (logo: string | null) => {
    setCompanyLogo(logo);
    // Sauvegarder dans le localStorage pour la persistance
    if (logo) {
      localStorage.setItem("companyLogo", logo);
    } else {
      localStorage.removeItem("companyLogo");
    }
  };

  const updateCompanyName = (name: string) => {
    setCompanyName(name);
    localStorage.setItem("companyName", name);
  };

  return (
    <CompanyContext.Provider
      value={{ companyLogo, updateCompanyLogo, companyName, updateCompanyName }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (!context) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return context;
};
