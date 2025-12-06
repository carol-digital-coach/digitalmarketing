from django.db import models
import uuid


#Services models
class Services(models.Model):
    
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    
    title = models.CharField(
        help_text="Services title",
        blank=False,
        null=False
    )
    
    
    short_description = models.CharField(
        help_text="Description",
        blank=False,
        null=False
    )
        
    
    def __str__(self):
        return f"{self.title}"


# Service offers keypoints
class ServicesMainKeyPoints(models.Model):
    
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    
    title = models.CharField(
        help_text="Provide package offer.",
        max_length=100,
        null=False,
        blank=False
    )
    
    
    service = models.ForeignKey(
        Services,
        on_delete=models.CASCADE,
        related_name='service_main_keypoints'
    )
    
    def __str__(self):
        return f"{self.title}"
    
    
    
#Services Package names e.g Standard, Starter ,Growth 
class ServicesPackages(models.Model):
    
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    
    name = models.CharField(
        help_text="Provide a package name e.g Starter, Standard, Growth",
        max_length=100,
        null=False,
        blank=False
    )
    
    description = models.CharField(
        max_length=200,
        help_text="provide offers description",
        null=False,
        blank=False,
        default="no description"
    )
    
    min_price = models.FloatField(
        null=False,
        blank=False,
        help_text="Provide pricing for the package",
        default=0.00
    )
    
    max_price = models.FloatField(
        null=False,
        blank=False,
        help_text="Provide pricing for the package",
        default=0.00
    )
    
    service = models.ForeignKey(
        Services,
        on_delete=models.CASCADE,
        related_name="service_packages"
    )
    
    def __str__(self):
        return f"{self.name}"
    
    
#Sevices sub key points    
class PackagesKeyPoints(models.Model):
    
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    
    title = models.CharField(
        help_text="Provide package offer.",
        max_length=100,
        null=False,
        blank=False
    )
    
    
    service = models.ForeignKey(
        ServicesPackages,
        on_delete=models.CASCADE,
        related_name='service_sub_keypoints'
    )
    
    def __str__(self):
        return f"{self.title}"  
    


#Package list
class PackagesList(models.Model):
    
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    
    title = models.CharField(
        help_text="Provide package offer.",
        max_length=100,
        null=False,
        blank=False
    )
    
    
    package = models.ForeignKey(
        ServicesPackages,
        on_delete=models.CASCADE,
        related_name='package_list'
    )
    
    def __str__(self):
        return f"{self.title}"  
  
    
# Courses model  
class Courses(models.Model):
    
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    
    title = models.CharField(
        help_text="Services title",
        blank=False,
        null=False
    )
    
    
    short_description = models.CharField(
        help_text="Description",
        blank=False,
        null=False
    )
    
    
    service_keypoints = models.CharField(
        help_text="Services keypoints",
        blank=False,
        null=False
    )
    
    
    def __str__(self):
        return f"{self.title}, {self.short_description}"