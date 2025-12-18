from rest_framework import decorators, response, status
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
import json
from django.db import transaction


@decorators.api_view(['GET'])
def get_services(request):
    try:
        services_list = []

        service_queryset = models.Services.objects.prefetch_related(
            'service_main_keypoints').all()

        for service in service_queryset:

            service_data = serializers.ServiceSerializers(service).data

            service_points = service.service_main_keypoints.all()  # type: ignore
            points_data = serializers.ServiceMainKeyPoints(
                service_points, many=True).data

            service_data['keypoints'] = points_data  # type: ignore
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
        service_packages_queryset = service_instance.service_packages.all()  # type: ignore
        service_packages = serializers.ServicePackages(
            service_packages_queryset,
            many=True
        )

        # Get service main points
        service_listpoints = service_instance.service_main_keypoints.all()  # type: ignore
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
                # Adjust field name
                "package_name": package.name if hasattr(package, 'name') else "",
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

# get single package


@decorators.api_view(["GET"])
def get_package(request):
    try:
        package_id = request.GET.get("package-id")

        package_obj = models.ServicesPackages.objects.get(id=package_id)

        package_instance = serializers.ServicePackages(package_obj)

        package_list_queryset = package_obj.package_list.all()  # type: ignore
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


# get all packages created
@decorators.api_view(["GET"])
def get_all_package(request):
    try:
        package_data = serializers.ServicePackages(
            models.ServicesPackages.objects.all(),
            many=True
        )

        return response.Response({
            "data": package_data.data
        }, status=status.HTTP_200_OK)

    except Exception as e:
        return response.Response({
            "message": str(e),
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@decorators.api_view(["POST"])
def _create_service(request):
    try:
        request_body = json.load(request)
        print(request_body['title'])

        # creating a service
        # Below is the service model, used to create an instance of the record
        new_service = models.Services.objects.create(
            title=request_body['title'],
            short_description=request_body['short_description']
        )
        # Below is service serializer, used to return a readable version of the
        # djongo models.
        new_service_serializer = serializers.ServiceSerializers(
            new_service
        )

        # creating service mainpoints service <-> mainkeypoints one to many
        # relationship
        created_service_points = []
        for mainPoint in request_body["service_points"]:
            new_service_mainpoints = models.ServicesMainKeyPoints.objects.create(
                title=mainPoint["title"], service=new_service)

            service_mainpoints_serializer = serializers.ServiceMainKeyPoints(
                new_service_mainpoints
            )

            # Add the created services to the array
            created_service_points.append(service_mainpoints_serializer.data)

        # Instance creation of service pricing, service <-> packages one to many
        # relationship
        created_pricing_packages = []
        packages_keypoints = []

        # First, create all the pricing packages
        for pricing_packages in request_body["service_package"]:
            service_pricing_package = models.ServicesPackages.objects.create(
                name=pricing_packages["name"],
                description=pricing_packages["description"],
                min_price=pricing_packages["min_price"],
                max_price=pricing_packages["max_price"],
                service=new_service
            )

            service_package_serialzer = serializers.ServicePackages(
                service_pricing_package
            )

            created_pricing_packages.append(service_package_serialzer.data)

        for i, package_data in enumerate(created_pricing_packages):
            if i < len(request_body.get("service_package_points", [])):
                package_points = request_body["service_package_points"][i]

                for point in package_points["package"]:
                    package_instance = models.ServicesPackages.objects.get(
                        id=package_data["id"])

                    package_details = models.PackagesList.objects.create(
                        title=point["title"],
                        package=package_instance
                    )

                    package_data_serialized = serializers.PackageListSerializer(
                        package_details)
                    packages_keypoints.append(package_data_serialized.data)

        return response.Response({
            "data": {
                "message": "service created",
                "data": {
                    "service": new_service_serializer.data,
                    "services_mainpoints": created_service_points,
                    "pricing_packages": created_pricing_packages,
                    "pricing_lists": packages_keypoints
                }
            }
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return response.Response({
            "error": str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
