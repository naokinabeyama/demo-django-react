from rest_framework import generics, authentication, permissions, viewsets
from api_user import serializers
from core.models import Profile, Friend 
from core import custompermissions
from django.db.models import Q


# 新規ユーザー作成
class CreateUserView(generics.CreateAPIView):
    serializer_class = serializers.UserSerializer


# 全プロフィール
class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    authentication_classes = (authentication.TokenAuthentication, )
    permission_classes = (permissions.IsAuthenticated, custompermissions.ProfilPermission)

    def perform_create(self, serializer):
        serializer.save(userPro=self.request.user)


# ログインユーザーのプロフィール
class MyProfileListView(generics.ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = serializers.ProfileSerializer
    authentication_classes = (authentication.TokenAuthentication, )
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        return self.queryset.filter(userPro=self.request.user)


# 友達申請
class FriendViewSet(viewsets.ModelViewSet):
    queryset = Friend.objects.all()
    serializer_class = serializers.FriendSerializer
    authentication_classes = (authentication.TokenAuthentication, )
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        return self.queryset.filter(Q(follow=self.request.user) | Q(follower=self.request.user))
