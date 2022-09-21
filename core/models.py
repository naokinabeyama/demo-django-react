from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings
from django.core.validators import MaxValueValidator


# プロフィール画像保存先
def profileUpload_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['image', str(instance.userPro.id)+str(instance.username)+str('.')+str(ext)])

# 投稿画像保存先
def postUpload_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['postImage', str(instance.userPost.id)+str(instance.title)+str('.')+str(ext)])


# email&password認証にカスタマイズ
class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):

        if not email:
            raise ValueError('emailがないよ')
        
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user
    
    # 管理者カスタム
    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    # ID
    id = models.AutoField(primary_key=True)
    # メールアドレス
    email = models.CharField(max_length=255, unique=True)
    # ログイン許可
    is_active = models.BooleanField(default=True)
    # 管理者権限
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email


# ユーザープロフィール
class Profile(models.Model):
    userPro = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        related_name='userPro',
        on_delete=models.CASCADE
    )
    # ユーザーネーム
    username = models.CharField(verbose_name='ユーザーネーム', max_length=30)
    # 年齢
    age = models.IntegerField(verbose_name='年齢', validators=[MaxValueValidator(100)])
    # 性別
    gender = models.IntegerField(verbose_name='性別', validators=[MaxValueValidator(2)])
    # 自己紹介
    introduction = models.TextField(verbose_name='自己紹介', max_length=1200)
    # プロフィール画像
    img = models.ImageField(verbose_name='プロフィール画像', blank=True, null=True, upload_to=profileUpload_path)
    # 登録日時
    created_at = models.DateTimeField(verbose_name='登録日時', auto_now_add=True)
    # 更新日時
    updated_at = models.DateTimeField(verbose_name='更新日時', auto_now=True)

    class Meta:
        db_table = 'profile'

    def __str__(self):
        return self.username


# 投稿
class Post(models.Model):
    # ID
    id = models.AutoField(primary_key=True)
    userPost = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='userPost',
        on_delete=models.CASCADE
    )
    # 投稿画像
    postImage = models.ImageField(verbose_name='投稿画像', upload_to=postUpload_path)
    # タイトル
    title = models.CharField(verbose_name='タイトル', max_length=30)
    # 説明
    text = models.TextField(verbose_name='説明', max_length=1200)
    # 投稿日時
    created_at = models.DateTimeField(verbose_name='投稿日時', auto_now_add=True)
    # 更新日時
    updated_at = models.DateTimeField(verbose_name='更新日時', auto_now=True)

    class Meta:
        db_table = 'post'
    
    def __str__(self):
        return self.title


# コメント
class Comment(models.Model):
    postComment = models.ForeignKey(
        settings.POST_MODEL,
        related_name='postComment',
        on_delete=models.CASCADE
    )
    userComment = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='userComment',
        on_delete=models.CASCADE
    )
    # コメント
    comment = models.TextField(verbose_name='コメント', max_length=1200)
    # コメント日時
    created_at = models.DateTimeField(verbose_name='コメント日時', auto_now_add=True)

    class Meta:
        db_table = 'Comment'
    
    def __str__(self):
        return str(self.postComment.title) + ':' + self.comment


# お気に入り
class Favorid(models.Model):
    postFavorid = models.ForeignKey(
        settings.POST_MODEL,
        related_name='postFavorid',
        on_delete=models.CASCADE
    )
    userFavorid = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='userFavorid',
        on_delete=models.CASCADE
    )
    # お気に入り
    favorid = models.BooleanField(verbose_name='お気に入り', default=False)

    class Meta:
        db_table = 'favorid'
    
    def __str__(self):
        return str(Post.title) + ':' + str(self.favorid)


# 友達申請
class Friend(models.Model):
    # 友達申請
    request = models.BooleanField(verbose_name='友達申請', default=False)
    # 友達申請(送信元)
    follow = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='follow',
        on_delete=models.CASCADE
    )
    # 友達申請(受信元)
    follower = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='follower',
        on_delete=models.CASCADE
    )

    class Meta:
        db_table = 'friend'
        constraints = [
            models.UniqueConstraint(
                fields=["follow", "follower"],
                name="friend_request_unique"
            ),
        ]
    
    def __str__(self):
        return str(self.follow) + '----->' + str(self.follower)
    
