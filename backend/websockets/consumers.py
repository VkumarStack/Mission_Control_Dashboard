import json
import asyncio
import random
import time
from channels.generic.websocket import AsyncWebsocketConsumer

def _now_ms():
    return int(time.time() * 1000)

# Track intensity for the test fire (starts at 30, grows by 5 each update)
_test_fire_intensity = 30

def growing_fire_update():
    """
    Returns a fire update for a single test location (non-overlapping with existing mock data).
    Intensity increases by 5 each call, capped at 100.
    """
    global _test_fire_intensity
    _test_fire_intensity = min(_test_fire_intensity + 5, 100)
    
    return {
        "type": "fire",
        "payload": {
            "id": "F-TEST",
            "lat": 34.12,  # slightly north of existing fires
            "lng": -118.40,  # slightly east of existing fires
            "intensity": _test_fire_intensity,
            "status": "Active" if _test_fire_intensity < 80 else "Critical",
            "size": 50 + (_test_fire_intensity // 2),  # size grows with intensity
            "timestamp": _now_ms()
        }
    }

class UpdatesConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self._task = asyncio.create_task(self._send_periodic())
        print("WebSocket connected!")

    async def disconnect(self, close_code):
        if hasattr(self, "_task"):
            self._task.cancel()
            try:
                await self._task
            except asyncio.CancelledError:
                pass
        print(f"WebSocket disconnected with code: {close_code}")

    async def _send_periodic(self):
        """Send a growing fire update every 10 seconds."""
        try:
            while True:
                msg = growing_fire_update()
                await self.send(text_data=json.dumps(msg))
                print(f"[WS] Sent fire update: intensity={msg['payload']['intensity']}")
                await asyncio.sleep(10)  # 10s interval
        except asyncio.CancelledError:
            return