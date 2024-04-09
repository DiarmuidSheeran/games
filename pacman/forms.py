from django import forms
from .models import PacmanGameScore

class GameScoreForm(forms.ModelForm):
    class Meta:
        model = PacmanGameScore
        fields = ['user_name', 'score', 'level']