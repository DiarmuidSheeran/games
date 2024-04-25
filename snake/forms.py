from django import forms
from .models import SnakeGameScore

class GameScoreForm(forms.ModelForm):
    class Meta:
        model = SnakeGameScore
        fields = ['user_name', 'score']