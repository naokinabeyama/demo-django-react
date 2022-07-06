from rest_framework import serializers
from core.models import Post, Comment, Favorid


class PostSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%Y-%m-%d', read_only=True)
    updated_at = serializers.DateTimeField(format='%Y-%m-%d', read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'userPost', 'postImage', 'title', 'text', 'favoridCount', 'created_at', 'updated_at')
        extra_kwargs = {'userPost': {'read_only': True}}


class CommentSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format='%Y-%m-%d', read_only=True) 

    class Meta:
        model = Comment
        fields = ('id', 'postComment', 'comment', 'created_at')
        extra_kwargs = {'postComment': {'read_only': True}}


class FavoridSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorid
        fields = ('id', 'postFavorid', 'favorid')
        extra_kwargs = {'postFavorid': {'read_only': True}}
