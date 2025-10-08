from django.urls import path
from . import views

urlpatterns = [
    path('fire-status/', views.fire_status, name='fire_status'),
]