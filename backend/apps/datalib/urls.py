from django.urls import (
    include,
    path
)

from . import (
    views
)

urlpatterns = [
    path("", views.get_services, name="all-services"),
    path("service/", views.get_single_service, name="single-service"),
    path("package/", views.get_package, name="package"),
    path("packages/", views.get_all_package, name="all-packages"),
    path("create-service/", views._create_service, name="create-service")
]