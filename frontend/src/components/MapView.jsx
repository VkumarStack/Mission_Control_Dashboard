import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

export default function MapView() {
  const [fires, setFires] = useState([]);

  useEffect(() => {
    apiClient.get('fire-status/').then(res => setFires(res.data.active_fires));
  }, []);

  return (
    <MapContainer center={[34.0699, -118.4439]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {fires.map(fire => (
        <Marker key={fire.id} position={[fire.lat, fire.lng]}>
          <Popup>Fire #{fire.id}: {fire.status}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}