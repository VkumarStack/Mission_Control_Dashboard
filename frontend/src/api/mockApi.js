const HOURS_24 = 24 * 60 * 60 * 1000;
const now = Date.now();

export const HOURS = HOURS_24;
export const START_TIME = now - HOURS_24;
export const END_TIME = now;

// Mock timestamped data - timestamps are in milliseconds
const mockFireData = [
  // Fire F-1 evolution over time
  { id: 'F-1', lat: 34.0899, lng: -118.4639, intensity: 60, status: 'Active', size: 45, timestamp: now - HOURS_24 },
  { id: 'F-1', lat: 34.0899, lng: -118.4639, intensity: 75, status: 'Active', size: 60, timestamp: now - (HOURS_24 * 0.5) },
  { id: 'F-1', lat: 34.0899, lng: -118.4639, intensity: 85, status: 'Active', size: 75, timestamp: now - (HOURS_24 * 0.1) },
  // Fire F-2 evolution
  { id: 'F-2', lat: 34.0599, lng: -118.4239, intensity: 45, status: 'Active', size: 30, timestamp: now - (HOURS_24 * 0.8) },
  { id: 'F-2', lat: 34.0599, lng: -118.4239, intensity: 55, status: 'Active', size: 38, timestamp: now - (HOURS_24 * 0.4) },
  { id: 'F-2', lat: 34.0599, lng: -118.4239, intensity: 65, status: 'Active', size: 45, timestamp: now - (HOURS_24 * 0.1) },
  // Fire F-3 evolution
  { id: 'F-3', lat: 34.0799, lng: -118.4039, intensity: 70, status: 'Active', size: 80, timestamp: now - (HOURS_24 * 0.7) },
  { id: 'F-3', lat: 34.0799, lng: -118.4039, intensity: 85, status: 'Critical', size: 100, timestamp: now - (HOURS_24 * 0.3) },
  { id: 'F-3', lat: 34.0799, lng: -118.4039, intensity: 90, status: 'Critical', size: 120, timestamp: now - (HOURS_24 * 0.05) },
  // Fire F-4 evolution
  { id: 'F-4', lat: 34.0499, lng: -118.4539, intensity: 65, status: 'Active', size: 40, timestamp: now - (HOURS_24 * 0.6) },
  { id: 'F-4', lat: 34.0499, lng: -118.4539, intensity: 50, status: 'Contained', size: 35, timestamp: now - (HOURS_24 * 0.2) },
  { id: 'F-4', lat: 34.0499, lng: -118.4539, intensity: 40, status: 'Contained', size: 30, timestamp: now },
];

const mockDroneData = [
  // Drone D-1 evolution
  { id: 'D-1', lat: 34.0850, lng: -118.4550, battery: 100, water: 95, status: 'Active', timestamp: now - HOURS_24 },
  { id: 'D-1', lat: 34.0870, lng: -118.4530, battery: 90, water: 75, status: 'Active', timestamp: now - (HOURS_24 * 0.5) },
  { id: 'D-1', lat: 34.0850, lng: -118.4550, battery: 85, water: 60, status: 'Active', timestamp: now - (HOURS_24 * 0.1) },
  // Drone D-2 evolution
  { id: 'D-2', lat: 34.0650, lng: -118.4350, battery: 95, water: 100, status: 'Active', timestamp: now - (HOURS_24 * 0.8) },
  { id: 'D-2', lat: 34.0640, lng: -118.4360, battery: 65, water: 95, status: 'Active', timestamp: now - (HOURS_24 * 0.4) },
  { id: 'D-2', lat: 34.0650, lng: -118.4350, battery: 45, water: 90, status: 'Active', timestamp: now - (HOURS_24 * 0.1) },
  // Drone D-3 evolution
  { id: 'D-3', lat: 34.0750, lng: -118.4150, battery: 88, water: 92, status: 'Active', timestamp: now - (HOURS_24 * 0.7) },
  { id: 'D-3', lat: 34.0760, lng: -118.4140, battery: 90, water: 90, status: 'Active', timestamp: now - (HOURS_24 * 0.3) },
  { id: 'D-3', lat: 34.0750, lng: -118.4150, battery: 92, water: 88, status: 'Active', timestamp: now - (HOURS_24 * 0.05) },
  // Drone D-4 evolution
  { id: 'D-4', lat: 34.0550, lng: -118.4450, battery: 80, water: 85, status: 'Active', timestamp: now - (HOURS_24 * 0.6) },
  { id: 'D-4', lat: 34.0560, lng: -118.4440, battery: 45, water: 65, status: 'Active', timestamp: now - (HOURS_24 * 0.3) },
  { id: 'D-4', lat: 34.0550, lng: -118.4450, battery: 25, water: 55, status: 'Low Battery', timestamp: now - (HOURS_24 * 0.1) },
  // Drone D-5 evolution
  { id: 'D-5', lat: 34.0700, lng: -118.4300, battery: 100, water: 80, status: 'Active', timestamp: now - (HOURS_24 * 0.5) },
  { id: 'D-5', lat: 34.0710, lng: -118.4290, battery: 82, water: 40, status: 'Active', timestamp: now - (HOURS_24 * 0.25) },
  { id: 'D-5', lat: 34.0700, lng: -118.4300, battery: 68, water: 15, status: 'Low Water', timestamp: now - (HOURS_24 * 0.05) },
  // Drone D-6 evolution
  { id: 'D-6', lat: 34.0820, lng: -118.4420, battery: 75, water: 70, status: 'Active', timestamp: now - (HOURS_24 * 0.4) },
  { id: 'D-6', lat: 34.0825, lng: -118.4425, battery: 35, water: 30, status: 'Low Battery', timestamp: now - (HOURS_24 * 0.15) },
  { id: 'D-6', lat: 34.0820, lng: -118.4420, battery: 5, water: 8, status: 'Critical', timestamp: now - (HOURS_24 * 0.02) },
];

// Helper to get most recent records per id at or before targetTime
const getDataAtTime = (data, targetTime) => {
  const grouped = data.reduce((acc, item) => {
    if (!acc[item.id]) acc[item.id] = [];
    acc[item.id].push(item);
    return acc;
  }, {});
  const result = [];
  Object.keys(grouped).forEach(id => {
    const sorted = grouped[id].sort((a, b) => a.timestamp - b.timestamp);
    const mostRecent = sorted.filter(item => item.timestamp <= targetTime).pop();
    if (mostRecent) result.push(mostRecent);
  });
  return result;
};

// Simulated API call: returns { fires, drones } at given timestamp
export const fetchDataAtTime = (targetTime) => {
  return new Promise((resolve) => {
    // Simulate network latency
    setTimeout(() => {
      const fires = getDataAtTime(mockFireData, targetTime);
      const drones = getDataAtTime(mockDroneData, targetTime);
      resolve({ fires, drones });
    }, 250); // 250ms delay
  });
};

// New: return all data items where timestamp is within [startTime, endTime]
// resolves to { fires: [...], drones: [...] } (each item retains timestamp)
export const fetchDataBetween = (startTime, endTime) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const fires = mockFireData.filter(item => item.timestamp >= startTime && item.timestamp <= endTime);
      const drones = mockDroneData.filter(item => item.timestamp >= startTime && item.timestamp <= endTime);
      resolve({ fires, drones });
    }, 250); // simulated latency
  });
};