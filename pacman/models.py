from django.db import models
from django.contrib.auth.models import User

class PacmanGameScore(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    user_name = models.CharField(max_length=100)
    score = models.IntegerField()
    level = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-score', 'created_at']

    def __str__(self):
        if self.user:
            return f"{self.user.username} - {self.score}"
        else:
            return f"{self.user_name} - {self.score}"
