from django import forms
from .models import GameScore

class GameScoreForm(forms.ModelForm):
    class Meta:
        model = GameScore
        fields = ['user_name', 'score']