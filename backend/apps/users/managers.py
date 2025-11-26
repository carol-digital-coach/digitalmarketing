from django.contrib.auth.models import BaseUserManager

class PbUserManager(BaseUserManager):
    def create_user(
        self, 
        username,
        email, 
        password,
        admin
    ):
        required_fields = {
            "username" : username,
            "email" : email,
            "password" : password,
            "admin" : admin
        }
        
        missing_fields = [
            field for field, value in  required_fields.items() if not value
        ]
        
        if missing_fields:
            raise ValueError(f"The following fields should be provided {missing_fields}")
        
        email = self.normalize_email(email)
        user = self.model(
            username= username,
            email= email,
            admin = admin
        )
        
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(
        self,
        username,
        email,
        password,
        admin
    ):
        required_fields = {
            "username" : username,
            "email" : email,
            "password" : password,
            "admin" : admin
        }
        
        missing_fields = [
            value for field, value in  required_fields.items() if not value
        ]
        
        if missing_fields:
            raise ValueError(f"The following fields should be provided {missing_fields}")
        
        email = self.normalize_email(email)
        user = self.model(
            username= username,
            email= email,
            admin = admin
        )
        
        user.set_password(password)
        user.is_superuser = True
        user.is_staff = True
        user.is_verified = True
        user.save(using=self._db)
        return user