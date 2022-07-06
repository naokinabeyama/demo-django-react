from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from core.models import Profile, Friend

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'emial', 'password')
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = get_user_model().objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%Y-%m-%d', read_only=True)
    updated_at = serializers.DateTimeField(format='%Y-%m-%d', read_only=True)

    class Meta:
        model = Profile
        fields = ('id', 'userPro', 'username', 'age', 'gender', 'introductioin', 'img', 'created_at', 'updated_at')
        extra_kwargs = {'userPro': {'read_only': True}}

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ('id', 'follow', 'follower', 'request')
        
