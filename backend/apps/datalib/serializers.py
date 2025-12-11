from . import models
from rest_framework import (
    serializers
)


class ServiceSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Services
        fields = "__all__"
        
        
class ServiceMainKeyPoints(serializers.ModelSerializer):
    class Meta:
        model = models.ServicesMainKeyPoints
        fields = "__all__"
  
        
class ServiceSubKeyPoints(serializers.ModelSerializer):
    class Meta:
        model = models.PackagesKeyPoints
        fields = "__all__"
        
        
class ServicePackages(serializers.ModelSerializer):
    class Meta:
        model = models.ServicesPackages
        fields = "__all__"
        
        
class PackageListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.PackagesList
        fields = "__all__"
        
        
class Courses(serializers.ModelSerializer):
    class Meta:
        model = models.Courses
        fields = "__all__"
        
        