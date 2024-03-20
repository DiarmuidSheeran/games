from django.urls import path
from . import views

urlpatterns = [
    path(
        'game/',
        views.space_invaders,
        name='space_invaders'
    ),
    path(
        'game/space_invaders_leaderboard',
        views.space_invaders_leaderboard,
        name='space_invaders_leaderboard'
    ),
]