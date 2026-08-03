from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import SOSAlert
from .serializers import SOSSerializer


class SOSListCreateView(generics.ListCreateAPIView):
    serializer_class = SOSSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SOSAlert.objects.filter(user=self.request.user).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class SOSDetailView(generics.RetrieveAPIView):
    serializer_class = SOSSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SOSAlert.objects.filter(user=self.request.user)