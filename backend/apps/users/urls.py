from django.urls import path, include
from . import serialilzers, views

urlpatterns = [
    path("signup/", views.create_user_account, name="create-account")
]
