from rest_framework import serializers
from .models import SOSAlert


class SOSSerializer(serializers.ModelSerializer):
    class Meta:
        model = SOSAlert
        fields = "__all__"
        read_only_fields = ["user", "created_at"]