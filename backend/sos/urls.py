from django.urls import path
from .views import SOSListCreateView, SOSDetailView

urlpatterns = [
    path("", SOSListCreateView.as_view(), name="sos-list"),
    path("<int:pk>/", SOSDetailView.as_view(), name="sos-detail"),
]