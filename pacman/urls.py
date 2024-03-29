from django.urls import path
from . import views

urlpatterns = [
    path(
        'game/',
        views.pacman,
        name='pacman'
    ),
    path(
        'game/pacman_leaderboard',
        views.pacman_leaderboard,
        name='pacman_leaderboard'
    ),
]