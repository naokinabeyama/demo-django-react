# Generated by Django 3.0.6 on 2022-07-11 09:02

import core.models
from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.CharField(max_length=255, unique=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=30, verbose_name='ユーザーネーム')),
                ('age', models.IntegerField(validators=[django.core.validators.MaxValueValidator(100)], verbose_name='年齢')),
                ('gender', models.IntegerField(validators=[django.core.validators.MaxValueValidator(2)], verbose_name='性別')),
                ('introduction', models.TextField(max_length=1200, verbose_name='自己紹介')),
                ('img', models.ImageField(blank=True, null=True, upload_to=core.models.profileUpload_path, verbose_name='プロフィール画像')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='登録日時')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新日時')),
                ('userPro', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='userPro', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'profile',
            },
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('postImage', models.ImageField(upload_to=core.models.postUpload_path, verbose_name='投稿画像')),
                ('title', models.CharField(max_length=30, verbose_name='タイトル')),
                ('text', models.TextField(max_length=1200, verbose_name='説明')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='投稿日時')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='更新日時')),
                ('userPost', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='userPost', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'post',
            },
        ),
        migrations.CreateModel(
            name='Friend',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('request', models.BooleanField(default=False, verbose_name='友達申請')),
                ('follow', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='follow', to=settings.AUTH_USER_MODEL)),
                ('follower', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='follower', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'friend',
            },
        ),
        migrations.CreateModel(
            name='Favorid',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('favorid', models.BooleanField(default=False, verbose_name='お気に入り')),
                ('postFavorid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='postFavorid', to='core.Post')),
                ('userFavorid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='userFavorid', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'favorid',
            },
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField(max_length=1200, verbose_name='コメント')),
                ('created_at', models.DateTimeField(verbose_name='コメント日時')),
                ('postComment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='postComment', to='core.Post')),
                ('userComment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='userComment', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'Comment',
            },
        ),
        migrations.AddConstraint(
            model_name='friend',
            constraint=models.UniqueConstraint(fields=('follow', 'follower'), name='friend_request_unique'),
        ),
    ]
