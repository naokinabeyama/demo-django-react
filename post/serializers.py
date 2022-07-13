from rest_framework import serializers
from core.models import Post, Comment, Favorid


# 投稿
class PostSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%Y-%m-%d', read_only=True)
    updated_at = serializers.DateTimeField(format='%Y-%m-%d', read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'userPost', 'postImage', 'title', 'text', 'created_at', 'updated_at')
        extra_kwargs = {'userPost': {'read_only': True}}


# コメント
class CommentSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%Y-%m-%d', read_only=True) 

    class Meta:
        model = Comment
        fields = ('id', 'userComment', 'postComment', 'comment', 'created_at')
        extra_kwargs = {'userComment': {'read_only': True}}


# お気に入り
class FavoridSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorid
        fields = ('id', 'postFavorid', 'userFavorid', 'favorid')
        extra_kwargs = {'userFavorid': {'read_only': True}}
