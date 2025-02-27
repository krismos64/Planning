import { useState } from "react";
import styled from "styled-components";
import {
  DataTable,
  Button,
  Modal,
  PlusIcon,
  ExportIcon,
} from "../components/ui";
import EmployeeForm from "../components/employees/EmployeeForm";
import { useEmployees } from "../hooks/useEmployees";
import { FormSelect } from "../components/ui/Form";
import { useNotification } from "../components/ui/Notification";

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

// Composant principal
const Employees = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [filters, setFilters] = useState({
    department: "",
    role: "",
    status: "",
  });

  const {
    loading,
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeesByStatus,
  } = useEmployees();

  const { showNotification } = useNotification();

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

  const handleSubmit = async (data) => {
    const success = editingEmployee
      ? await updateEmployee(editingEmployee.id, data)
      : await addEmployee(data);

    if (success) {
      setShowModal(false);
      setEditingEmployee(null);
    }
  };

  const countByStatus = getEmployeesByStatus();

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
                ? () => {
                    const success = deleteEmployee(editingEmployee.id);
                    if (success) {
                      setShowModal(false);
                      setEditingEmployee(null);
                    }
                  }
                : undefined
            }
          />
        </Modal>
      )}
    </PageContainer>
  );
};

export default Employees;
