from django.urls import path
from . import views

urlpatterns = [
    path('fire-status/', views.fire_status, name='fire_status'),
    path('data-at-time/', views.data_at_time, name='data_at_time'),
    path('data-between/', views.data_between, name='data_between'),
    path('recent-data/', views.recent_data, name='recent_data'),
]