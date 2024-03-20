from django.urls import path
from . import views

urlpatterns = [
    path(
        'game/',
        views.space_invaders,
        name='space_invaders'
    ),
]