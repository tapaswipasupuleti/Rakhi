from django.db import models
from users.models import User


class Contact(models.Model):
    RELATIONSHIP_CHOICES = [
        ("Mother", "Mother"),
        ("Father", "Father"),
        ("Brother", "Brother"),
        ("Sister", "Sister"),
        ("Friend", "Friend"),
        ("Guardian", "Guardian"),
        ("Other", "Other"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="contacts"
    )

    name = models.CharField(max_length=100)

    relationship = models.CharField(
        max_length=20,
        choices=RELATIONSHIP_CHOICES
    )

    phone_number = models.CharField(max_length=15)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.relationship})"