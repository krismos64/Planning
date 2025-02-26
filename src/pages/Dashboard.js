import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";

// Composants stylisés
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const WelcomeCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 2rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const WelcomeTitle = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
`;

const WelcomeText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.1rem;
  line-height: 1.6;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const StatCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.small};
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StatTitle = styled.h3`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const RecentActivitiesCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  padding: 1.5rem;
  box-shadow: ${({ theme }) => theme.shadows.medium};
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1.5rem;
`;

const ActivityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ActivityItem = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  gap: 1rem;

  &:last-child {
    border-bottom: none;
  }
`;

const ActivityIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => `${theme.colors.primary}22`};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
`;

const ActivityContent = styled.div`
  flex: 1;
`;

const ActivityTitle = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.25rem;
`;

const ActivityTime = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

// Composant Dashboard
const Dashboard = () => {
  const { user } = useAuth();

  // Données fictives pour les statistiques
  const stats = [
    { title: "Employés", value: "24" },
    { title: "Événements planifiés", value: "156" },
    { title: "Demandes de congés", value: "8" },
    { title: "Taux de complétion", value: "87%" },
  ];

  // Données fictives pour les activités récentes
  const activities = [
    {
      id: 1,
      icon: "👤",
      title: "Sophie Martin a été ajoutée",
      time: "Il y a 2 heures",
    },
    {
      id: 2,
      icon: "📅",
      title: "Réunion d'équipe planifiée",
      time: "Il y a 3 heures",
    },
    {
      id: 3,
      icon: "🏖️",
      title: "Demande de congés approuvée",
      time: "Il y a 5 heures",
    },
    {
      id: 4,
      icon: "📊",
      title: "Rapport mensuel généré",
      time: "Il y a 1 jour",
    },
  ];

  return (
    <DashboardContainer>
      <WelcomeCard>
        <WelcomeTitle>Bonjour, {user?.name || "Utilisateur"} 👋</WelcomeTitle>
        <WelcomeText>
          Bienvenue sur votre tableau de bord SmartPlanning AI. Consultez les
          statistiques clés et les activités récentes.
        </WelcomeText>
      </WelcomeCard>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <StatTitle>{stat.title}</StatTitle>
            <StatValue>{stat.value}</StatValue>
          </StatCard>
        ))}
      </StatsGrid>

      <RecentActivitiesCard>
        <CardTitle>Activités récentes</CardTitle>
        <ActivityList>
          {activities.map((activity) => (
            <ActivityItem key={activity.id}>
              <ActivityIcon>{activity.icon}</ActivityIcon>
              <ActivityContent>
                <ActivityTitle>{activity.title}</ActivityTitle>
                <ActivityTime>{activity.time}</ActivityTime>
              </ActivityContent>
            </ActivityItem>
          ))}
        </ActivityList>
      </RecentActivitiesCard>
    </DashboardContainer>
  );
};

export default Dashboard;
