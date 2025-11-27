from django.urls import path, include
from . import serialilzers, views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpatterns = [
    path("signup/", views.create_user_account, name="create-account"),
    path("signin/", TokenObtainPairView.as_view(), name="signin"),
    path("verify/token/", TokenVerifyView.as_view(), name="verify-token"),
    path("refresh/token/", TokenRefreshView.as_view(), name="refresh-token")
]
