from django.db import models

# Create your models here.

class Services(models.Model):
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
    
    
class Courses(models.Model):
    
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