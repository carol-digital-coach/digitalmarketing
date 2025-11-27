from rest_framework import (
    decorators,
    permissions,
    response,
    status
)

from . import (
    models,
    serialilzers,
    managers
)

import json
import requests


@decorators.api_view(["POST"])
def create_user_account(request):
    try:
        data = json.loads(request.body)
        
        new_user = models.PbUser.objects.create_user(
            username=data.get("username"),
            email=data.get("email"),
            password=data.get("password"),
            user_avatar=f"https://ui-avatars.com/api/?name={data.get("username")}"
        )
        
        return response.Response({
            "success" : True,
            "message" : "user created successfully"
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return response.Response({
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)