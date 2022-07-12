from django.urls import path, include
from post import views
from rest_framework.routers import DefaultRouter

app_name = 'post'

# viewでgenericで作成したメソッドはrouterには追加できない
router = DefaultRouter()
router.register('article', views.PostViewSet)
router.register('comment', views.CommentViewSet)
router.register('favorid', views.FavoridViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('mypost/', views.MyPostListView.as_view(), name='mypost'),
]
