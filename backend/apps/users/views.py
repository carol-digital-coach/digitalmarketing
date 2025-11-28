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
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication


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
        
        
@decorators.api_view(["GET"])
def get_user(request):
    try:
        users = models.PbUser.objects.all()
        users_data = serialilzers.UserModelSerializer(users, many=True)
        return response.Response({
            "users": users_data.data
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return response.Response({
            "message": "Users not found",
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class CustomTokenObatainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == status.HTTP_200_OK:
            access_token = response.data["access"] #type: ignore
            refresh_token = response.data["refresh"] #type: ignore
            
            response.set_cookie(
                key="access_cookie",
                value=access_token,
                httponly=True,
                samesite="Lax",
                max_age=1800,
                secure=True
            )
            
            response.set_cookie(
                key="refresh_cookie",
                value=refresh_token,
                httponly=True,
                samesite="Lax",
                max_age=30480,
                secure=True
            )
            
            
            
        # del response.data["access"]  #type: ignore
        # del response.data["refresh"]  #type: ignore  
        return response
    

class CookieAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get("access_cookie")
        
        if access_token is None:
            return None
        
        validate_token = self.get_validated_token(access_token)
        return self.get_user(validate_token), validate_token


    
@decorators.api_view(["GET"])
@decorators.authentication_classes([CookieAuthentication])
@decorators.permission_classes([permissions.IsAuthenticated])
def get_authenticate_user(request):
    user = request.user
    if user:
        return response.Response({
            "message": "authenticated",
            "user" : {
                "username" : user.username,
                "email": user.email,
                "super_user": user.is_superuser,
            }
        }, status=status.HTTP_200_OK)
        
    return response.Response({
        "message" : "No user found, user unauthenticated"
    }, status=status.HTTP_400_BAD_REQUEST)


