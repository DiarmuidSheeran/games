from django.urls import path
from . import views

urlpatterns = [
    path(
        'game/',
        views.snake,
        name='snake'
    ),
    path(
        'game/snake_leaderboard',
        views.snake_leaderboard,
        name='snake_leaderboard'
    ),
]