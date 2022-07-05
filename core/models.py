from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings


def profileUpload_path(instance, filename):
    ext = filename.split('.')[-1]
    return '/'.join(['image', str(instance.userPro.id)+str(instance.username)+str('.')+str(ext)])



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
    age = models.IntegerField(verbose_name='年齢', max_length=3)
    # 性別
    gender = models.IntegerField(verbose_name='性別', max_length=2)
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
    userPost = models.ForeignKey(
        User,
        related_name='userPost',
        on_delete=models.CASCADE
    )
    


# 友達申請
class Friend(models.Model):
    # 友達申請
    request = models.BooleanField(default=False)
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
    
