from django.db import models

class User(models.Model):
    username = models.CharField(max_length = 100)
    email = models.EmailField(unique = True)
    progress = models.JSONField()

class Lesson(models.Model):
    title = models.CharField(max_length = 100)
    content = models.TextField()
    language = models.CharField(max_length = 50)

