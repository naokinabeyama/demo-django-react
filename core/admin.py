from django.contrib import admin
from core import models


admin.site.register(models.User)
admin.site.register(models.Profile)
admin.site.register(models.Post)
admin.site.register(models.Friend)
admin.site.register(models.Comment)
admin.site.register(models.Favorid)
