from rest_framework import (
    views,
    decorators,
    response,
    status
    )

from . import (
    models,
    serializers
)

import requests

@decorators.api_view(['GET'])
def get_services(request):
    try:
        services = serializers.ServiceSerializers(
            models.Services.objects.all(),
            many=True
            )
        
        return response.Response({
            "data" : services.data
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return response.Response({
            "message": str(e),
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
@decorators.api_view(['GET'])
def get_single_service(request):
    try:
        service_id = request.GET.get("id")
        if not service_id:
            return response.Response({
                "message": "Service ID is required",
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Get the service instance with related data
        service_instance = models.Services.objects.get(id=service_id)
        
        # Serialize the main service
        service_serializer = serializers.ServiceSerializers(service_instance)

        service_packages_queryset = service_instance.service_packages.all()
        service_packages = serializers.ServicePackages(
            service_packages_queryset,
            many=True
        )
        
        # Get service main points - filter by current service
        service_listpoints = models.ServicesMainKeyPoints.objects.filter(
            service=service_instance
        )
        
        service_main_points = serializers.ServiceMainKeyPoints(
            service_listpoints,
            many=True
        )
        
        return response.Response({
            "data": service_serializer.data,
            "packages": service_packages.data,
            "keypoints": service_main_points.data
        }, status=status.HTTP_200_OK)
        
    except models.Services.DoesNotExist:
        return response.Response({
            "message": "Service not found",
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return response.Response({
            "message": str(e),
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
#get single package
@decorators.api_view(["GET"])
def get_package(request):
    try:
        package_id = request.GET.get("package-id")
        
        package_obj = models.ServicesPackages.objects.get(id=package_id)
        
        package_instance = serializers.ServicePackages(package_obj)
    
        package_list_queryset = package_obj.package_list.all()
        package_list = serializers.PackageListSerializer(
            package_list_queryset,
            many=True
        )
        
        return response.Response({
            "data": package_instance.data,
            "list": package_list.data
        }, status=status.HTTP_200_OK)
        
    except models.ServicesPackages.DoesNotExist:
        return response.Response({
            "message": "Package not found",
        }, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return response.Response({
            "message": str(e),
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
#get all packages created        
@decorators.api_view(["GET"])
def get_all_package(request):
    try:
        package_data = serializers.ServicePackages(
            models.ServicesPackages.objects.all(),
            many=True
        )
        
        return response.Response({
            "data" : package_data.data
        }, status=status.HTTP_200_OK)
        
    except Exception as e:
        return response.Response({
            "message": str(e),
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)