from django.db import models

#Services models
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

# Service offers keypoints
class ServicesOffers(models.Model):
    title = models.CharField(
        help_text="Provide package offer.",
        max_length=100,
        null=False,
        blank=False
    )
    
    service = models.ForeignKey(
        Services,
        on_delete=models.CASCADE,
        related_name='service_offer'
    )
    
    def __str__(self):
        return f"Created service offer {self.title}"
    
    
#Services Package names e.g Standard, Starter ,Growth 
class ServicesPackages(models.Model):
    name = models.CharField(
        help_text="Provide a package name e.g Starter, Standard, Growth",
        max_length=100,
        null=False,
        blank=False
    )
    
    service = models.ForeignKey(
        Services,
        on_delete=models.CASCADE,
        related_name="serivece_packages"
    )
    
    def __str__(self):
        return f"Created package {self.name}"
    
    
# Courses model  
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