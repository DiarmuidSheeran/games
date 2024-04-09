from django.contrib import admin
from .models import PacmanGameScore

@admin.register(PacmanGameScore)
class PacmanGameScoreAdmin(admin.ModelAdmin):
    list_display = ('user','user_name', 'score', 'level', 'created_at')
    search_fields = ('user_name',)
    list_filter = ('created_at',)