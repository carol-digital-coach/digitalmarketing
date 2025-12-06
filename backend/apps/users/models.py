from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from . import managers
import uuid

class PbUser(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(
        help_text="Provide a username",
        max_length=10,
        null=False,
        blank=False
    )
    
    email = models.EmailField(
        help_text="Provide email",
        null=False,
        blank=False,
        unique=True
    )
    
    
    user_avatar = models.URLField(null=True, blank=True)
    
    password = models.CharField(
        help_text="Provide password",
        null=False,
        blank=False
    )
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "user_avatar"]
    
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    
    objects = managers.PbUserManager()
    
    
    def __str__(self):
        return f"{self.username}"
