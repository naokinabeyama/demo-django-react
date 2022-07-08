from rest_framework import viewsets, authentication, permissions, generics
from post import serializers
from core.models import Post, Comment, Favorid
from core import custompermissions



# 投稿
class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = serializers.PostSerializer
    authentication_classes = (authentication.TokenAuthentication, )
    permission_classes = (permissions.IsAuthenticated, custompermissions.PostPermission)

    def perform_create(self, serializer):
        serializer.save(userPost=self.request.user)


# ログインユーザーの投稿
class MyPostListView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = serializers.PostSerializer
    authentication_classes = (authentication.TokenAuthentication, )
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        return self.queryset.filter(userPost=self.request.user)


# コメント
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = serializers.CommentSerializer
    authentication_classes = (authentication.TokenAuthentication, )
    permission_classes = (permissions.IsAuthenticated, )

    def perform_create(self, serializer):
        serializer.save(userComment=self.request.user.id)


# お気に入り
class Favorid(viewsets.ModelViewSet):
    queryset = Favorid.object.all()
    serializer_class = serializers.FavoridSerializer
    authentication_classes = (authentication.TokenAuthentication, )
    permission_classes = (permissions.IsAuthenticated, )


# ログインユーザーのお気に入り
class MyFavoridListView(generics.ListAPIView):
    queryset = Favorid.object.all()
    serializer_class = serializers.FavoridSerializer
    authentication_classes = (authentication.TokenAuthentication, )
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        return self.queryset.filter(userFavorid=self.request.user.id)
