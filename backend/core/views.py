from django.http import JsonResponse


def home(request):
    return JsonResponse({
        "project": "Rakhi",
        "version": "1.0",
        "status": "Running"
    })