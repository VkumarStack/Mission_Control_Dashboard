import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export default function NotificationsPanel() {
  useEffect(() => {
    // Example: Simulate urgent notification
    const timer = setTimeout(() => {
      toast.error("🔥 Fire spreading rapidly near Zone 3!");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return <ToastContainer position="bottom-right" />;
}