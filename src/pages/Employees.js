import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Table from "../components/ui/Table";
import { FormInput, FormSelect } from "../components/ui/Form";
import { useNotification } from "../components/ui/Notification";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideInUp = keyframes`
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// Icônes
const SearchIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 21L16.65 16.65"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PlusIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5V19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18 6L6 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 6L18 18"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Composants stylisés
const EmployeesContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-out;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  animation: ${slideInUp} 0.5s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const PageTitleContainer = styled.div`
  flex: 1;
`;

const PageTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.sizes["3xl"]};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const PageDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  max-width: 800px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  animation: ${slideInUp} 0.5s ease-out;
  animation-delay: 0.1s;
  animation-fill-mode: both;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const SearchInputContainer = styled.div`
  flex: 1;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`;

const SearchIconWrapper = styled.div`
  position: absolute;
  left: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.text.hint};
`;

const SearchInput = styled.input`
  width: 100%;
  height: 44px;
  padding: ${({ theme }) => `0 ${theme.spacing.md} 0 ${theme.spacing.xl}`};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}33`};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.hint};
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
  }
`;

const TableContainer = styled.div`
  animation: ${slideInUp} 0.5s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${({ theme }) => theme.spacing.md};
  animation: ${fadeIn} 0.3s ease-out;
`;

const ModalContent = styled(Card)`
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideInUp} 0.3s ease-out;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.sizes.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => `${theme.colors.primary}11`};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const FormRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.small};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};

  ${({ status, theme }) => {
    switch (status) {
      case "active":
        return `
          background-color: ${theme.colors.success}22;
          color: ${theme.colors.success};
        `;
      case "inactive":
        return `
          background-color: ${theme.colors.error}22;
          color: ${theme.colors.error};
        `;
      case "vacation":
        return `
          background-color: ${theme.colors.warning}22;
          color: ${theme.colors.warning};
        `;
      default:
        return `
          background-color: ${theme.colors.primary}22;
          color: ${theme.colors.primary};
        `;
    }
  }}
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const LoadingSpinner = styled.div`
  border: 4px solid ${({ theme }) => theme.colors.text.hint};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.p`
  margin-top: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  color: ${({ theme }) => theme.colors.text.primary};
`;

// Composant Employees
const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // État du formulaire d'employé
  const [employeeForm, setEmployeeForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    status: "active",
  });

  const { showNotification } = useNotification();

  // Charger les données des employés
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true);

        // Simuler le chargement des données
        setTimeout(() => {
          // Simuler les employés
          const mockEmployees = [
            {
              id: 1,
              firstName: "Sophie",
              lastName: "Martin",
              email: "sophie.martin@example.com",
              phone: "06 12 34 56 78",
              department: "Marketing",
              position: "Chef de projet",
              status: "active",
              hireDate: "2020-05-15",
            },
            {
              id: 2,
              firstName: "Thomas",
              lastName: "Dubois",
              email: "thomas.dubois@example.com",
              phone: "06 23 45 67 89",
              department: "Développement",
              position: "Développeur senior",
              status: "active",
              hireDate: "2019-03-10",
            },
            {
              id: 3,
              firstName: "Julie",
              lastName: "Leroy",
              email: "julie.leroy@example.com",
              phone: "06 34 56 78 90",
              department: "Ressources Humaines",
              position: "Responsable RH",
              status: "vacation",
              hireDate: "2018-09-22",
            },
            {
              id: 4,
              firstName: "Lucas",
              lastName: "Bernard",
              email: "lucas.bernard@example.com",
              phone: "06 45 67 89 01",
              department: "Développement",
              position: "Développeur frontend",
              status: "active",
              hireDate: "2021-01-05",
            },
            {
              id: 5,
              firstName: "Emma",
              lastName: "Petit",
              email: "emma.petit@example.com",
              phone: "06 56 78 90 12",
              department: "Design",
              position: "UI/UX Designer",
              status: "inactive",
              hireDate: "2020-11-18",
            },
          ];

          setEmployees(mockEmployees);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Erreur lors du chargement des employés:", error);
        showNotification({
          type: "error",
          title: "Erreur",
          message: "Impossible de charger les employés.",
        });
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [showNotification]);

  // Filtrer les employés
  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
    const searchMatch =
      searchTerm === "" ||
      fullName.includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    const departmentMatch =
      departmentFilter === "" || employee.department === departmentFilter;
    const statusMatch = statusFilter === "" || employee.status === statusFilter;

    return searchMatch && departmentMatch && statusMatch;
  });

  // Obtenir les départements uniques
  const departments = [
    ...new Set(employees.map((employee) => employee.department)),
  ];

  // Colonnes pour la table des employés
  const employeeColumns = [
    {
      key: "name",
      title: "Nom",
      render: (row) => `${row.firstName} ${row.lastName}`,
    },
    {
      key: "email",
      title: "Email",
    },
    {
      key: "department",
      title: "Département",
    },
    {
      key: "position",
      title: "Poste",
    },
    {
      key: "status",
      title: "Statut",
      render: (row) => {
        const statusLabels = {
          active: "Actif",
          inactive: "Inactif",
          vacation: "En congé",
        };

        return (
          <StatusBadge status={row.status}>
            {statusLabels[row.status]}
          </StatusBadge>
        );
      },
    },
    {
      key: "actions",
      title: "Actions",
      render: (row) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            handleEditEmployee(row);
          }}
        >
          Modifier
        </Button>
      ),
    },
  ];

  // Gérer le clic sur un employé
  const handleEmployeeClick = (employee) => {
    handleEditEmployee(employee);
  };

  // Gérer l'édition d'un employé
  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);

    // Préremplir le formulaire avec les données de l'employé
    setEmployeeForm({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      position: employee.position,
      status: employee.status,
    });

    setShowAddEmployeeModal(true);
  };

  // Réinitialiser le formulaire d'employé
  const resetEmployeeForm = () => {
    setEmployeeForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      status: "active",
    });
    setSelectedEmployee(null);
  };

  // Gérer la soumission du formulaire d'employé
  const handleEmployeeFormSubmit = (e) => {
    e.preventDefault();

    // Valider le formulaire
    if (
      !employeeForm.firstName ||
      !employeeForm.lastName ||
      !employeeForm.email
    ) {
      showNotification({
        type: "error",
        title: "Erreur",
        message: "Veuillez remplir tous les champs obligatoires.",
      });
      return;
    }

    // Créer l'objet employé
    const newEmployee = {
      id: selectedEmployee ? selectedEmployee.id : Date.now(),
      ...employeeForm,
      hireDate: selectedEmployee
        ? selectedEmployee.hireDate
        : new Date().toISOString().split("T")[0],
    };

    // Mettre à jour les employés
    if (selectedEmployee) {
      // Modifier un employé existant
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === selectedEmployee.id ? newEmployee : emp))
      );

      showNotification({
        type: "success",
        title: "Succès",
        message: "L'employé a été modifié avec succès.",
      });
    } else {
      // Ajouter un nouvel employé
      setEmployees((prev) => [...prev, newEmployee]);

      showNotification({
        type: "success",
        title: "Succès",
        message: "L'employé a été ajouté avec succès.",
      });
    }

    // Fermer le modal
    setShowAddEmployeeModal(false);
  };

  // Gérer la suppression d'un employé
  const handleDeleteEmployee = () => {
    if (!selectedEmployee) return;

    // Supprimer l'employé
    setEmployees((prev) =>
      prev.filter((emp) => emp.id !== selectedEmployee.id)
    );

    showNotification({
      type: "success",
      title: "Succès",
      message: "L'employé a été supprimé avec succès.",
    });

    // Fermer le modal
    setShowAddEmployeeModal(false);
  };

  return (
    <EmployeesContainer>
      {isLoading ? (
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Chargement des employés...</LoadingText>
        </LoadingContainer>
      ) : (
        <>
          <PageHeader>
            <PageTitleContainer>
              <PageTitle>Employés</PageTitle>
              <PageDescription>
                Gérez les informations de vos employés et consultez leur statut.
              </PageDescription>
            </PageTitleContainer>

            <ActionButtons>
              <Button
                leftIcon={<PlusIcon />}
                onClick={() => {
                  resetEmployeeForm();
                  setShowAddEmployeeModal(true);
                }}
              >
                Nouvel employé
              </Button>
            </ActionButtons>
          </PageHeader>

          <SearchContainer>
            <SearchInputContainer>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <SearchInput
                type="text"
                placeholder="Rechercher un employé..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchInputContainer>

            <FiltersContainer>
              <FormSelect
                id="department-filter"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                options={[
                  { value: "", label: "Tous les départements" },
                  ...departments.map((dept) => ({ value: dept, label: dept })),
                ]}
              />

              <FormSelect
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                options={[
                  { value: "", label: "Tous les statuts" },
                  { value: "active", label: "Actif" },
                  { value: "inactive", label: "Inactif" },
                  { value: "vacation", label: "En congé" },
                ]}
              />
            </FiltersContainer>
          </SearchContainer>

          <TableContainer>
            <Table
              columns={employeeColumns}
              data={filteredEmployees}
              onRowClick={handleEmployeeClick}
              pagination={true}
              emptyStateTitle="Aucun employé trouvé"
              emptyStateMessage="Aucun employé ne correspond à vos critères de recherche."
            />
          </TableContainer>

          {/* Modal d'ajout/modification d'employé */}
          {showAddEmployeeModal && (
            <Modal onClick={() => setShowAddEmployeeModal(false)}>
              <ModalContent
                variant="elevated"
                padding="2rem"
                onClick={(e) => e.stopPropagation()}
              >
                <ModalHeader>
                  <ModalTitle>
                    {selectedEmployee ? "Modifier l'employé" : "Nouvel employé"}
                  </ModalTitle>
                  <CloseButton onClick={() => setShowAddEmployeeModal(false)}>
                    <CloseIcon />
                  </CloseButton>
                </ModalHeader>

                <form onSubmit={handleEmployeeFormSubmit}>
                  <FormRow>
                    <FormInput
                      label="Prénom"
                      id="employee-first-name"
                      value={employeeForm.firstName}
                      onChange={(e) =>
                        setEmployeeForm({
                          ...employeeForm,
                          firstName: e.target.value,
                        })
                      }
                      placeholder="Prénom"
                      required
                    />

                    <FormInput
                      label="Nom"
                      id="employee-last-name"
                      value={employeeForm.lastName}
                      onChange={(e) =>
                        setEmployeeForm({
                          ...employeeForm,
                          lastName: e.target.value,
                        })
                      }
                      placeholder="Nom"
                      required
                    />
                  </FormRow>

                  <FormRow>
                    <FormInput
                      label="Email"
                      id="employee-email"
                      type="email"
                      value={employeeForm.email}
                      onChange={(e) =>
                        setEmployeeForm({
                          ...employeeForm,
                          email: e.target.value,
                        })
                      }
                      placeholder="Email"
                      required
                    />

                    <FormInput
                      label="Téléphone"
                      id="employee-phone"
                      value={employeeForm.phone}
                      onChange={(e) =>
                        setEmployeeForm({
                          ...employeeForm,
                          phone: e.target.value,
                        })
                      }
                      placeholder="Téléphone"
                    />
                  </FormRow>

                  <FormRow>
                    <FormInput
                      label="Département"
                      id="employee-department"
                      value={employeeForm.department}
                      onChange={(e) =>
                        setEmployeeForm({
                          ...employeeForm,
                          department: e.target.value,
                        })
                      }
                      placeholder="Département"
                    />

                    <FormInput
                      label="Poste"
                      id="employee-position"
                      value={employeeForm.position}
                      onChange={(e) =>
                        setEmployeeForm({
                          ...employeeForm,
                          position: e.target.value,
                        })
                      }
                      placeholder="Poste"
                    />
                  </FormRow>

                  <FormSelect
                    label="Statut"
                    id="employee-status"
                    value={employeeForm.status}
                    onChange={(e) =>
                      setEmployeeForm({
                        ...employeeForm,
                        status: e.target.value,
                      })
                    }
                    options={[
                      { value: "active", label: "Actif" },
                      { value: "inactive", label: "Inactif" },
                      { value: "vacation", label: "En congé" },
                    ]}
                  />

                  <ModalFooter>
                    {selectedEmployee && (
                      <Button
                        variant="outline"
                        color="error"
                        onClick={handleDeleteEmployee}
                        type="button"
                      >
                        Supprimer
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      onClick={() => setShowAddEmployeeModal(false)}
                      type="button"
                    >
                      Annuler
                    </Button>
                    <Button type="submit">
                      {selectedEmployee ? "Modifier" : "Ajouter"}
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>
          )}
        </>
      )}
    </EmployeesContainer>
  );
};

export default Employees;
