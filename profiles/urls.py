from django.urls import path
from . import views

urlpatterns = [
    path('profile/', views.profile_view, name='profile'),
    path('edit-bio/', views.edit_bio, name='edit_bio'),
]