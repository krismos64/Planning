import { useState, useEffect } from "react";
import styled from "styled-components";
import DataTable from "../components/ui/DataTable";
import Button from "../components/ui/Button";
import { FormInput, FormSelect } from "../components/ui/Form";
import { useNotification } from "../components/ui/Notification";
import Modal from "../components/ui/Modal";

// Composants stylisés
const PageContainer = styled.div`
  padding: 2rem;
`;

const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const HeaderLeft = styled.div`
  flex: 1;
`;

const HeaderRight = styled.div`
  display: flex;
  gap: 1rem;

  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const PageDescription = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0.5rem 0 0 0;
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  color: ${({ theme, active }) =>
    active ? theme.colors.primary : theme.colors.text.secondary};
  background: none;
  border: none;
  border-bottom: 2px solid
    ${({ theme, active }) => (active ? theme.colors.primary : "transparent")};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme, active }) =>
      active ? theme.colors.primary : theme.colors.text.primary};
  }
`;

const TabBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary : `${theme.colors.text.disabled}33`};
  color: ${({ theme, active }) =>
    active ? "white" : theme.colors.text.secondary};
  font-size: 0.75rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
  margin-left: 0.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

// Icônes
const PlusIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5V19M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ExportIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 10V16M12 16L9 13M12 16L15 13M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H17C18.1046 3 19 3.89543 19 5V19C19 20.1046 18.1046 21 17 21Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FilterIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 6H21M6 12H18M10 18H14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Composant principal
const Employees = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [filters, setFilters] = useState({
    department: "",
    role: "",
    status: "",
  });

  const { showNotification } = useNotification();

  // Charger les employés
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("/api/employees");
      const data = await response.json();
      setEmployees(data);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors du chargement des employés:", error);
      showNotification({
        type: "error",
        title: "Erreur",
        message: "Impossible de charger la liste des employés.",
      });
      setLoading(false);
    }
  };

  // Filtrer les employés
  const filteredEmployees = employees.filter((employee) => {
    if (activeTab !== "all" && employee.status !== activeTab) return false;
    if (filters.department && employee.department !== filters.department)
      return false;
    if (filters.role && employee.role !== filters.role) return false;
    if (filters.status && employee.status !== filters.status) return false;
    return true;
  });

  // Définir les colonnes pour le tableau
  const columns = [
    {
      id: "name",
      header: "Nom",
      accessor: (employee) => `${employee.firstName} ${employee.lastName}`,
      sortable: true,
    },
    {
      id: "email",
      header: "Email",
      accessor: (employee) => employee.email,
      sortable: true,
    },
    {
      id: "department",
      header: "Département",
      accessor: (employee) => employee.department,
      sortable: true,
    },
    {
      id: "role",
      header: "Rôle",
      accessor: (employee) => employee.role,
      sortable: true,
    },
    {
      id: "status",
      header: "Statut",
      accessor: (employee) => employee.status,
      sortable: true,
      type: "status",
    },
    {
      id: "startDate",
      header: "Date d'embauche",
      accessor: (employee) => employee.startDate,
      sortable: true,
      type: "date",
    },
  ];

  // Gérer l'ajout/modification d'un employé
  const handleSubmit = async (data) => {
    try {
      const url = editingEmployee
        ? `/api/employees/${editingEmployee.id}`
        : "/api/employees";

      const method = editingEmployee ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la sauvegarde");
      }

      showNotification({
        type: "success",
        title: "Succès",
        message: editingEmployee
          ? "Employé modifié avec succès"
          : "Nouvel employé ajouté avec succès",
      });

      setShowModal(false);
      fetchEmployees();
    } catch (error) {
      console.error("Erreur:", error);
      showNotification({
        type: "error",
        title: "Erreur",
        message: "Une erreur est survenue lors de la sauvegarde.",
      });
    }
  };

  // Gérer la suppression d'un employé
  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet employé ?")) {
      return;
    }

    try {
      const response = await fetch(`/api/employees/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }

      showNotification({
        type: "success",
        title: "Succès",
        message: "Employé supprimé avec succès",
      });

      fetchEmployees();
    } catch (error) {
      console.error("Erreur:", error);
      showNotification({
        type: "error",
        title: "Erreur",
        message: "Une erreur est survenue lors de la suppression.",
      });
    }
  };

  // Compter les employés par statut
  const countByStatus = {
    all: employees.length,
    active: employees.filter((e) => e.status === "active").length,
    pending: employees.filter((e) => e.status === "pending").length,
    inactive: employees.filter((e) => e.status === "inactive").length,
  };

  return (
    <PageContainer>
      <PageHeader>
        <HeaderLeft>
          <PageTitle>Employés</PageTitle>
          <PageDescription>
            Gérez les employés de votre entreprise
          </PageDescription>
        </HeaderLeft>
        <HeaderRight>
          <Button onClick={() => window.print()}>
            <ExportIcon />
            Exporter
          </Button>
          <Button
            primary
            onClick={() => {
              setEditingEmployee(null);
              setShowModal(true);
            }}
          >
            <PlusIcon />
            Ajouter un employé
          </Button>
        </HeaderRight>
      </PageHeader>

      <TabsContainer>
        <Tab active={activeTab === "all"} onClick={() => setActiveTab("all")}>
          Tous
          <TabBadge active={activeTab === "all"}>{countByStatus.all}</TabBadge>
        </Tab>
        <Tab
          active={activeTab === "active"}
          onClick={() => setActiveTab("active")}
        >
          Actifs
          <TabBadge active={activeTab === "active"}>
            {countByStatus.active}
          </TabBadge>
        </Tab>
        <Tab
          active={activeTab === "pending"}
          onClick={() => setActiveTab("pending")}
        >
          En attente
          <TabBadge active={activeTab === "pending"}>
            {countByStatus.pending}
          </TabBadge>
        </Tab>
        <Tab
          active={activeTab === "inactive"}
          onClick={() => setActiveTab("inactive")}
        >
          Inactifs
          <TabBadge active={activeTab === "inactive"}>
            {countByStatus.inactive}
          </TabBadge>
        </Tab>
      </TabsContainer>

      <FormGrid>
        <FormSelect
          label="Département"
          value={filters.department}
          onChange={(e) =>
            setFilters({ ...filters, department: e.target.value })
          }
        >
          <option value="">Tous les départements</option>
          <option value="Marketing">Marketing</option>
          <option value="Développement">Développement</option>
          <option value="Design">Design</option>
          <option value="Finance">Finance</option>
          <option value="RH">RH</option>
        </FormSelect>

        <FormSelect
          label="Rôle"
          value={filters.role}
          onChange={(e) => setFilters({ ...filters, role: e.target.value })}
        >
          <option value="">Tous les rôles</option>
          <option value="Manager">Manager</option>
          <option value="Senior">Senior</option>
          <option value="Junior">Junior</option>
          <option value="Stagiaire">Stagiaire</option>
        </FormSelect>

        <FormSelect
          label="Statut"
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="pending">En attente</option>
          <option value="inactive">Inactif</option>
        </FormSelect>
      </FormGrid>

      <DataTable
        title={`Liste des employés (${filteredEmployees.length})`}
        data={filteredEmployees}
        columns={columns}
        loading={loading}
        pagination={true}
        pageSize={10}
        onRowClick={(employee) => {
          setEditingEmployee(employee);
          setShowModal(true);
        }}
        emptyStateTitle="Aucun employé trouvé"
        emptyStateMessage="Il n'y a pas d'employés correspondant à vos critères de recherche."
      />

      {showModal && (
        <Modal
          title={editingEmployee ? "Modifier un employé" : "Ajouter un employé"}
          onClose={() => {
            setShowModal(false);
            setEditingEmployee(null);
          }}
        >
          <EmployeeForm
            employee={editingEmployee}
            onSubmit={handleSubmit}
            onDelete={
              editingEmployee
                ? () => handleDelete(editingEmployee.id)
                : undefined
            }
          />
        </Modal>
      )}
    </PageContainer>
  );
};

// Formulaire d'employé (à implémenter)
const EmployeeForm = ({ employee, onSubmit, onDelete }) => {
  const [formData, setFormData] = useState({
    firstName: employee?.firstName || "",
    lastName: employee?.lastName || "",
    email: employee?.email || "",
    department: employee?.department || "",
    role: employee?.role || "",
    status: employee?.status || "active",
    startDate: employee?.startDate || new Date().toISOString().split("T")[0],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGrid>
        <FormInput
          label="Prénom"
          value={formData.firstName}
          onChange={(e) =>
            setFormData({ ...formData, firstName: e.target.value })
          }
          required
        />
        <FormInput
          label="Nom"
          value={formData.lastName}
          onChange={(e) =>
            setFormData({ ...formData, lastName: e.target.value })
          }
          required
        />
        <FormInput
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <FormSelect
          label="Département"
          value={formData.department}
          onChange={(e) =>
            setFormData({ ...formData, department: e.target.value })
          }
          required
        >
          <option value="">Sélectionner un département</option>
          <option value="Marketing">Marketing</option>
          <option value="Développement">Développement</option>
          <option value="Design">Design</option>
          <option value="Finance">Finance</option>
          <option value="RH">RH</option>
        </FormSelect>
        <FormSelect
          label="Rôle"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          required
        >
          <option value="">Sélectionner un rôle</option>
          <option value="Manager">Manager</option>
          <option value="Senior">Senior</option>
          <option value="Junior">Junior</option>
          <option value="Stagiaire">Stagiaire</option>
        </FormSelect>
        <FormSelect
          label="Statut"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          required
        >
          <option value="active">Actif</option>
          <option value="pending">En attente</option>
          <option value="inactive">Inactif</option>
        </FormSelect>
        <FormInput
          label="Date d'embauche"
          type="date"
          value={formData.startDate}
          onChange={(e) =>
            setFormData({ ...formData, startDate: e.target.value })
          }
          required
        />
      </FormGrid>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        {onDelete && (
          <Button type="button" onClick={onDelete} danger>
            Supprimer
          </Button>
        )}
        <Button type="submit" primary>
          {employee ? "Enregistrer" : "Ajouter"}
        </Button>
      </div>
    </form>
  );
};

export default Employees;
