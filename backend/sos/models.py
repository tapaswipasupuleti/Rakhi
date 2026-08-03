from django.db import models
from users.models import User


class SOSAlert(models.Model):

    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Cancelled", "Cancelled"),
        ("Completed", "Completed"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="sos_alerts"
    )

    latitude = models.DecimalField(
        max_digits=10,
        decimal_places=7,
        null=True,
        blank=True
    )

    longitude = models.DecimalField(
        max_digits=11,
        decimal_places=7,
        null=True,
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    message = models.TextField(
        default="Emergency! I need help."
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return f"{self.user.username} - {self.status}"