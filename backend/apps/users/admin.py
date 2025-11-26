from django.contrib import admin
from django.contrib.admin import ModelAdmin
from . import models


@admin.register(models.PbUser)
class UserModels(ModelAdmin):
    list_display = ["username", "email", "admin"]
