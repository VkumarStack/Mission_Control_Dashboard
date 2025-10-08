import MapView from "../components/MapView";
import NotificationsPanel from "../components/NotificationsPanel";
import FireWardenChat from "../components/FireWardenChat";

export default function Dashboard() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', padding: '20px'}}>
      <h1>🚒 Mission Control Dashboard</h1>
      <MapView />
      <NotificationsPanel />
      <FireWardenChat />
    </div>
  );
}