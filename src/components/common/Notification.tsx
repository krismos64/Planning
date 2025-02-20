export type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationProps {
  type: NotificationType;
  message: string;
  onClose: () => void;
}

const Notification = ({ type, message, onClose }: NotificationProps) => {
  const bgColor = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  }[type];

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md border ${bgColor} shadow-lg max-w-md z-50`}
    >
      <div className="flex justify-between items-start">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Notification;
