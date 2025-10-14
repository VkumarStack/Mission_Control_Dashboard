import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
// Mock data
const mockFireData = [
  { id: 'F-1', lat: 34.0899, lng: -118.4639, intensity: 85, status: 'Active', size: 75 },
  { id: 'F-2', lat: 34.0599, lng: -118.4239, intensity: 65, status: 'Active', size: 45 },
  { id: 'F-3', lat: 34.0799, lng: -118.4039, intensity: 90, status: 'Critical', size: 120 },
  { id: 'F-4', lat: 34.0499, lng: -118.4539, intensity: 50, status: 'Contained', size: 30 }
];

const mockDroneData = [
  { id: 'D-1', lat: 34.0850, lng: -118.4550, battery: 85, water: 60, status: 'Active' },
  { id: 'D-2', lat: 34.0650, lng: -118.4350, battery: 45, water: 90, status: 'Active' },
  { id: 'D-3', lat: 34.0750, lng: -118.4150, battery: 92, water: 88, status: 'Active' },
  { id: 'D-4', lat: 34.0550, lng: -118.4450, battery: 25, water: 55, status: 'Low Battery' },
  { id: 'D-5', lat: 34.0700, lng: -118.4300, battery: 68, water: 15, status: 'Low Water' },
  { id: 'D-6', lat: 34.0820, lng: -118.4420, battery: 5, water: 8, status: 'Critical' }
];

// Helper function to get color based on resource level
const getResourceColor = (level) => {
  if (level >= 70) return '#00ff88';
  if (level >= 40) return '#ffd93d';
  if (level >= 10) return '#ff6b35';
  return '#ff3b3b';
};

// Helper function to get fire color based on intensity
const getFireColor = (intensity) => {
  if (intensity >= 80) return '#ff3b3b';
  if (intensity >= 60) return '#ff6b35';
  return '#ff9b3b';
};

// Custom drone icon (triangle)
const createDroneIcon = () => {
  return L.divIcon({
    className: 'custom-drone-icon',
    html: `<svg width="24" height="24" viewBox="0 0 24 24">
      <polygon points="12,4 4,20 20,20" fill="#00d4ff" stroke="#ffffff" stroke-width="1.5"/>
    </svg>`,
    iconSize: [24, 24],
    iconAnchor: [12, 16]
  });
};

// Custom resource indicator icons
const createBatteryIcon = (level) => {
  const color = getResourceColor(level);
  return L.divIcon({
    className: 'custom-battery-icon',
    html: `<svg width="16" height="16" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="7" fill="${color}" stroke="#0d1119" stroke-width="1.5"/>
    </svg>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
};

const createWaterIcon = (level) => {
  const color = getResourceColor(level);
  return L.divIcon({
    className: 'custom-water-icon',
    html: `<svg width="16" height="16" viewBox="0 0 16 16">
      <rect x="1" y="1" width="14" height="14" rx="2" fill="${color}" stroke="#0d1119" stroke-width="1.5"/>
    </svg>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });
};

const LiveMapComponent = () => {
  const [showFires, setShowFires] = useState(true);
  const [showDrones, setShowDrones] = useState(true);
  const [showResources, setShowResources] = useState(true);
  const [currentTime, setCurrentTime] = useState(50); // 0-100 for slider

  return (
    <div className="w-full h-screen p-4" style={{ backgroundColor: '#0a0e1a' }}>
      <div className="flex gap-4 h-full">
        {/* Left Sidebar - Controls */}
        <div className="w-72 rounded-lg p-4 flex flex-col" style={{ backgroundColor: '#1f2937' }}>
          <h2 className="text-xl font-bold text-white mb-6">Layer Controls</h2>

          {/* Toggle Checkboxes */}
          <div className="space-y-4 mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showFires}
                onChange={(e) => setShowFires(e.target.checked)}
                className="w-5 h-5 accent-green-500"
              />
              <div className="w-4 h-4 rounded-full bg-orange-500"></div>
              <span className="text-white">Active Fires</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showDrones}
                onChange={(e) => setShowDrones(e.target.checked)}
                className="w-5 h-5 accent-green-500"
              />
              <svg width="16" height="16" viewBox="0 0 24 24">
                <polygon points="12,4 4,20 20,20" fill="#00d4ff"/>
              </svg>
              <span className="text-white">Drones</span>
            </label>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={showResources}
                onChange={(e) => setShowResources(e.target.checked)}
                className="w-5 h-5 accent-green-500"
              />
              <div className="w-4 h-4 bg-yellow-400 rounded"></div>
              <span className="text-white">Resources</span>
            </label>
          </div>
          
          <hr className="border-gray-700 my-4" />
          
          {/* Resource Legend */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Resource Status</h3>
            
            <div className="mb-4">
              <p className="text-sm text-gray-400 mb-2">Water Level:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-400 rounded"></div>
                  <span className="text-xs text-white">High (70-100%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                  <span className="text-xs text-white">Medium (40-69%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded"></div>
                  <span className="text-xs text-white">Low (10-39%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded"></div>
                  <span className="text-xs text-white">Critical (&lt;10%)</span>
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-gray-400 mb-2">Battery Level:</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-white">High (70-100%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                  <span className="text-xs text-white">Medium (40-69%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                  <span className="text-xs text-white">Low (10-39%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-white">Critical (&lt;10%)</span>
                </div>
              </div>
            </div>
          </div>
          
          <hr className="border-gray-700 my-4" />
          
          {/* Quick Stats */}
          <div className="mt-auto space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Active Fires:</span>
              <span className="text-orange-500 font-bold">{mockFireData.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Drones Online:</span>
              <span className="text-cyan-400 font-bold">{mockDroneData.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Avg Battery:</span>
              <span className="text-green-400 font-bold">
                {Math.round(mockDroneData.reduce((sum, d) => sum + d.battery, 0) / mockDroneData.length)}%
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Avg Water:</span>
              <span className="text-yellow-400 font-bold">
                {Math.round(mockDroneData.reduce((sum, d) => sum + d.water, 0) / mockDroneData.length)}%
              </span>
            </div>
          </div>
        </div>
        
        {/* Map Container */}
        <div className="flex-1 flex flex-col bg-gray-800 rounded-lg overflow-hidden">
          <div className="flex-1">
            <MapContainer 
              center={[34.0699, -118.4439]} 
              zoom={13} 
              style={{ height: "100%", width: "100%" }}
              className="z-0"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              
              {/* Fire Markers */}
              {showFires && mockFireData.map(fire => (
                <Circle
                  key={fire.id}
                  center={[fire.lat, fire.lng]}
                  radius={fire.size * 10}
                  pathOptions={{
                    color: getFireColor(fire.intensity),
                    fillColor: getFireColor(fire.intensity),
                    fillOpacity: 0.6,
                    weight: 2
                  }}
                >
                  <Popup>
                    <div className="text-sm">
                      <strong>{fire.id}</strong><br/>
                      Status: {fire.status}<br/>
                      Intensity: {fire.intensity}%<br/>
                      Size: {fire.size} acres
                    </div>
                  </Popup>
                </Circle>
              ))}
              
              {/* Drone Markers */}
              {showDrones && mockDroneData.map(drone => (
                <React.Fragment key={drone.id}>
                  {/* Main drone marker */}
                  <Marker 
                    position={[drone.lat, drone.lng]} 
                    icon={createDroneIcon()}
                  >
                    <Popup>
                      <div className="text-sm">
                        <strong>{drone.id}</strong><br/>
                        Status: {drone.status}<br/>
                        Battery: {drone.battery}%<br/>
                        Water: {drone.water}%
                      </div>
                    </Popup>
                  </Marker>
                  
                  {/* Resource indicators */}
                  {showResources && (
                    <>
                      {/* Battery indicator (above drone) */}
                      <Marker 
                        position={[drone.lat + 0.002, drone.lng]} 
                        icon={createBatteryIcon(drone.battery)}
                      />
                      
                      {/* Water indicator (below drone) */}
                      <Marker 
                        position={[drone.lat - 0.002, drone.lng]} 
                        icon={createWaterIcon(drone.water)}
                      />
                    </>
                  )}
                </React.Fragment>
              ))}
            </MapContainer>
          </div>
          
          {/* Timeline Control */}
          <div className="bg-gray-800 p-4 border-t border-gray-700">
            <div className="flex items-center gap-4">
              <h3 className="text-white font-semibold whitespace-nowrap">Historical Timeline</h3>
              
              {/* Play/Pause Button */}
              <button className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center hover:bg-gray-600">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <polygon points="3,2 3,14 13,8" fill="#00d4ff"/>
                </svg>
              </button>
              
              {/* Slider */}
              <div className="flex-1 flex flex-col gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={currentTime}
                  onChange={(e) => setCurrentTime(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>12:00 PM</span>
                  <span className="text-cyan-400 font-semibold">
                    {Math.floor(12 + (currentTime / 100) * 6)}:{String(Math.floor((currentTime % 100) * 0.6)).padStart(2, '0')} PM
                  </span>
                  <span>6:00 PM</span>
                </div>
              </div>
              
              {/* Speed Control */}
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">Speed:</span>
                <select className="bg-gray-700 text-white px-3 py-1 rounded text-sm">
                  <option>0.5x</option>
                  <option selected>1x</option>
                  <option>2x</option>
                  <option>5x</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMapComponent;