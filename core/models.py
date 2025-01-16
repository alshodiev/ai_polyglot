from django.db import models

class User(models.Model):
    username = models.CharField(max_length = 100)
    email = models.EmailField(unique = True)
    preferred_language = models.CharField(max_length=50, default='English')
    progress = models.JSONField(default = dict)

    def __str__(self):
        return self.username        


class Lesson(models.Model):
    title = models.CharField(max_length = 100)
    content = models.TextField()
    language = models.CharField(max_length = 50)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.language})"