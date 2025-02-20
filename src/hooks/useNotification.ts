import { useState } from "react";
import { NotificationType } from "../components/common/Notification";

interface NotificationState {
  type: NotificationType;
  message: string;
}

export const useNotification = () => {
  const [notification, setNotification] = useState<NotificationState | null>(
    null
  );

  const showNotification = (type: NotificationType, message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const hideNotification = () => {
    setNotification(null);
  };

  return {
    notification,
    showNotification,
    hideNotification,
  };
};
