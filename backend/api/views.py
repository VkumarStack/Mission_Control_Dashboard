from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
import time

@api_view(['GET'])
def fire_status(request):
    # Mock response for now
    data = {
        "active_fires": [
            {"id": 1, "lat": 34.0522, "lng": -118.2437, "status": "contained"},
            {"id": 2, "lat": 35.0522, "lng": -117.2437, "status": "spreading"},
        ]
    }
    return Response(data)

# --- New: Mock data endpoints ---
now_ms = int(time.time() * 1000)

MOCK_FIRE_DATA = [
    {"id": "F-1", "lat": 34.0899, "lng": -118.4639, "intensity": 60, "status": "Active", "size": 45, "timestamp": now_ms - 24*60*60*1000},
    {"id": "F-1", "lat": 34.0899, "lng": -118.4639, "intensity": 75, "status": "Active", "size": 60, "timestamp": now_ms - (24*60*60*1000)//2},
    {"id": "F-1", "lat": 34.0899, "lng": -118.4639, "intensity": 85, "status": "Active", "size": 75, "timestamp": now_ms - (24*60*60*1000)//10},
    {"id": "F-2", "lat": 34.0599, "lng": -118.4239, "intensity": 45, "status": "Active", "size": 30, "timestamp": now_ms - int(24*60*60*1000*0.8)},
    {"id": "F-2", "lat": 34.0599, "lng": -118.4239, "intensity": 55, "status": "Active", "size": 38, "timestamp": now_ms - int(24*60*60*1000*0.4)},
    {"id": "F-2", "lat": 34.0599, "lng": -118.4239, "intensity": 65, "status": "Active", "size": 45, "timestamp": now_ms - int(24*60*60*1000*0.1)},
    {"id": "F-3", "lat": 34.0799, "lng": -118.4039, "intensity": 70, "status": "Active", "size": 80, "timestamp": now_ms - int(24*60*60*1000*0.7)},
    {"id": "F-3", "lat": 34.0799, "lng": -118.4039, "intensity": 85, "status": "Critical", "size": 100, "timestamp": now_ms - int(24*60*60*1000*0.3)},
    {"id": "F-3", "lat": 34.0799, "lng": -118.4039, "intensity": 90, "status": "Critical", "size": 120, "timestamp": now_ms - int(24*60*60*1000*0.05)},
    {"id": "F-4", "lat": 34.0499, "lng": -118.4539, "intensity": 65, "status": "Active", "size": 40, "timestamp": now_ms - int(24*60*60*1000*0.6)},
    {"id": "F-4", "lat": 34.0499, "lng": -118.4539, "intensity": 50, "status": "Contained", "size": 35, "timestamp": now_ms - int(24*60*60*1000*0.2)},
    {"id": "F-4", "lat": 34.0499, "lng": -118.4539, "intensity": 40, "status": "Contained", "size": 30, "timestamp": now_ms},
]

MOCK_DRONE_DATA = [
    {"id": "D-1", "lat": 34.0850, "lng": -118.4550, "battery": 100, "water": 95, "status": "Active", "timestamp": now_ms - 24*60*60*1000},
    {"id": "D-1", "lat": 34.0870, "lng": -118.4530, "battery": 90, "water": 75, "status": "Active", "timestamp": now_ms - (24*60*60*1000)//2},
    {"id": "D-1", "lat": 34.0850, "lng": -118.4550, "battery": 85, "water": 60, "status": "Active", "timestamp": now_ms - (24*60*60*1000)//10},
    {"id": "D-2", "lat": 34.0650, "lng": -118.4350, "battery": 95, "water": 100, "status": "Active", "timestamp": now_ms - int(24*60*60*1000*0.8)},
    {"id": "D-2", "lat": 34.0640, "lng": -118.4360, "battery": 65, "water": 95, "status": "Active", "timestamp": now_ms - int(24*60*60*1000*0.4)},
    {"id": "D-2", "lat": 34.0650, "lng": -118.4350, "battery": 45, "water": 90, "status": "Active", "timestamp": now_ms - int(24*60*60*1000*0.1)},
    {"id": "D-3", "lat": 34.0750, "lng": -118.4150, "battery": 88, "water": 92, "status": "Active", "timestamp": now_ms - int(24*60*60*1000*0.7)},
    {"id": "D-3", "lat": 34.0760, "lng": -118.4140, "battery": 90, "water": 90, "status": "Active", "timestamp": now_ms - int(24*60*60*1000*0.3)},
    {"id": "D-3", "lat": 34.0750, "lng": -118.4150, "battery": 92, "water": 88, "status": "Active", "timestamp": now_ms - int(24*60*60*1000*0.05)},
    {"id": "D-4", "lat": 34.0550, "lng": -118.4450, "battery": 80, "water": 85, "status": "Active", "timestamp": now_ms - int(24*60*60*1000*0.6)},
    {"id": "D-4", "lat": 34.0560, "lng": -118.4440, "battery": 45, "water": 65, "status": "Active", "timestamp": now_ms - int(24*60*60*1000*0.3)},
    {"id": "D-4", "lat": 34.0550, "lng": -118.4450, "battery": 25, "water": 55, "status": "Low Battery", "timestamp": now_ms - int(24*60*60*1000*0.1)},
    {"id": "D-5", "lat": 34.0700, "lng": -118.4300, "battery": 100, "water": 80, "status": "Active", "timestamp": now_ms - int(24*60*60*1000*0.5)},
    {"id": "D-5", "lat": 34.0710, "lng": -118.4290, "battery": 82, "water": 40, "status": "Active", "timestamp": now_ms - int(24*60*60*1000*0.25)},
    {"id": "D-5", "lat": 34.0700, "lng": -118.4300, "battery": 68, "water": 15, "status": "Low Water", "timestamp": now_ms - int(24*60*60*1000*0.05)},
    {"id": "D-6", "lat": 34.0820, "lng": -118.4420, "battery": 75, "water": 70, "status": "Active", "timestamp": now_ms - int(24*60*60*1000*0.4)},
    {"id": "D-6", "lat": 34.0825, "lng": -118.4425, "battery": 35, "water": 30, "status": "Low Battery", "timestamp": now_ms - int(24*60*60*1000*0.15)},
    {"id": "D-6", "lat": 34.0820, "lng": -118.4420, "battery": 5, "water": 8, "status": "Critical", "timestamp": now_ms - int(24*60*60*1000*0.02)},
]

def _group_most_recent(data, target_ts):
    grouped = {}
    for item in data:
        grouped.setdefault(item['id'], []).append(item)
    result = []
    for id_, items in grouped.items():
        items_sorted = sorted(items, key=lambda x: x['timestamp'])
        candidates = [it for it in items_sorted if it['timestamp'] <= target_ts]
        if candidates:
            result.append(candidates[-1])
    return result

@api_view(['GET'])
def data_at_time(request):
    """
    Query param: ts (milliseconds). If omitted, uses current time.
    Returns: { "fires": [...], "drones": [...] }
    """
    ts_param = request.query_params.get('ts') or request.query_params.get('timestamp')
    try:
        target_ts = int(ts_param) if ts_param is not None else int(time.time() * 1000)
    except (ValueError, TypeError):
        return Response({"detail": "invalid timestamp"}, status=status.HTTP_400_BAD_REQUEST)

    fires = _group_most_recent(MOCK_FIRE_DATA, target_ts)
    drones = _group_most_recent(MOCK_DRONE_DATA, target_ts)
    return Response({"fires": fires, "drones": drones})

@api_view(['GET'])
def data_between(request):
    """
    Query params: start, end (milliseconds). Both required.
    Returns: { "fires": [...], "drones": [...] } (items retain timestamps)
    """
    start = request.query_params.get('start')
    end = request.query_params.get('end')
    try:
        start_ts = int(start)
        end_ts = int(end)
    except (ValueError, TypeError):
        return Response({"detail": "start and end must be integer milliseconds"}, status=status.HTTP_400_BAD_REQUEST)

    fires = [f for f in MOCK_FIRE_DATA if start_ts <= f['timestamp'] <= end_ts]
    drones = [d for d in MOCK_DRONE_DATA if start_ts <= d['timestamp'] <= end_ts]
    return Response({"fires": fires, "drones": drones})

@api_view(['GET'])
def recent_data(request):
    """
    Returns all fire/drone records from now-24h to now.
    """
    now_ms = int(time.time() * 1000)
    start_ts = now_ms - 24*60*60*1000
    fires = [f for f in MOCK_FIRE_DATA if start_ts <= f['timestamp'] <= now_ms]
    drones = [d for d in MOCK_DRONE_DATA if start_ts <= d['timestamp'] <= now_ms]
    return Response({"fires": fires, "drones": drones})