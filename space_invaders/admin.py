from django.contrib import admin
from .models import GameScore

@admin.register(GameScore)
class GameScoreAdmin(admin.ModelAdmin):
    list_display = ('user','user_name', 'score', 'created_at')
    search_fields = ('user_name',)
    list_filter = ('created_at',)
