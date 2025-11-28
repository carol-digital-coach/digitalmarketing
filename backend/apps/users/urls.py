from django.urls import path, include
from . import serialilzers, views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)
from . import views

urlpatterns = [
    path("signup/", views.create_user_account, name="create-account"),
    path("signin/", views.CustomTokenObatainPairView.as_view(), name="signin"),
    path("verify/token/", TokenVerifyView.as_view(), name="verify-token"),
    path("refresh/token/", TokenRefreshView.as_view(), name="refresh-token"),
    path("get-users/", views.get_user, name="get-user"),
    path("get-cookie/", views.CustomTokenObatainPairView.as_view(), name="get-cookie"),
    path("get-user/", views.get_authenticate_user, name="user-auth")
]
