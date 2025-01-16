from django.contrib import admin
from .models import User, Lesson

# Registering my models here
admin.site.register(User)
admin.site.register(Lesson)