from rest_framework import serializers
from . import models


class UserModelSerializer(serializers.ModelSerializer):
    class Meta: 
        model = models.PbUser
        fields = "__all__"
