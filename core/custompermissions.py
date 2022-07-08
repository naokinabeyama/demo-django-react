from rest_framework import permissions


# ログインしたユーザーIDと同じプロフィールIDだけcreate, deleteなどできるようにする
class ProfilPermission(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.userPro.id == request.user.id


# 投稿IDと投稿したユーザーIDが一緒のユーザーだけ変更できる
class PostPermission(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.userPost.id == request.user.id
