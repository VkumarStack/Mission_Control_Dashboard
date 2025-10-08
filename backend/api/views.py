from rest_framework.response import Response
from rest_framework.decorators import api_view

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