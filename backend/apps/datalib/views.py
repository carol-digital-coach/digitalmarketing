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
        services_list = []
        

        service_queryset = models.Services.objects.prefetch_related('service_main_keypoints').all()
        
        for service in service_queryset:
        
            service_data = serializers.ServiceSerializers(service).data
            
        
            service_points = service.service_main_keypoints.all() #type: ignore
            points_data = serializers.ServiceMainKeyPoints(service_points, many=True).data
            

            service_data['keypoints'] = points_data #type: ignore
            services_list.append(service_data)
        
        return response.Response({
            "data": services_list,
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
        
        # Get the service with all related data using prefetch_related
        service_instance = models.Services.objects.prefetch_related(
            'service_packages__package_list',  # Prefetch packages and their lists
            'service_main_keypoints'  # Prefetch keypoints
        ).get(id=service_id)
        
        # Serialize the main service
        service_serializer = serializers.ServiceSerializers(service_instance)
        
        # Get service packages
        service_packages_queryset = service_instance.service_packages.all() #type: ignore
        service_packages = serializers.ServicePackages(
            service_packages_queryset,
            many=True
        )
        
        # Get service main points
        service_listpoints = service_instance.service_main_keypoints.all() #type: ignore
        service_main_points = serializers.ServiceMainKeyPoints(
            service_listpoints,
            many=True
        )
        
        # Get packages pricing details
        pricing_details = []
        
        for package in service_packages_queryset:
            package_list_queryset = package.package_list.all()
            package_list = serializers.PackageListSerializer(
                package_list_queryset,
                many=True
            ).data
            
            pricing_details.append({
                "package_id": str(package.id),
                "package_name": package.name if hasattr(package, 'name') else "",  # Adjust field name
                "package_list": package_list
            })
        
        return response.Response({
            "data": service_serializer.data,
            "packages": service_packages.data,
            "keypoints": service_main_points.data,
            "pricing_details": pricing_details
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
    
        package_list_queryset = package_obj.package_list.all() #type: ignore
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
