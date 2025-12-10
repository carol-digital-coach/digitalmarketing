from django.contrib import admin
from django.contrib.admin import ModelAdmin
from . import models


# Register your models here.
@admin.register(models.Services)
class Services(ModelAdmin):
    list_display = ["title"]
  
    
@admin.register(models.ServicesMainKeyPoints)
class ServiceMainKeyPoints(ModelAdmin):
    list_display = ["title"]
  
    
@admin.register(models.PackagesKeyPoints)
class PackageList(ModelAdmin):
    list_display = ["title"]
    
    
@admin.register(models.PackagesList)
class ServiceSubKeyPoints(ModelAdmin):
    list_display = ["title"]
   
    
@admin.register(models.ServicesPackages)
class ServicePackage(ModelAdmin):
    list_display = ["name"]
    
    
@admin.register(models.Courses)
class Courses(ModelAdmin):
    list_display = ["title"]
