from django.shortcuts import render, redirect
from .forms import GameScoreForm
from .models import PacmanGameScore
# Create your views here.

def pacman(request):
    game_scores = PacmanGameScore.objects.all()[:5]
    all_game_scores = PacmanGameScore.objects.all()
    game_won = False

    if request.method == 'POST':
        form = GameScoreForm(request.POST)
        if form.is_valid():
            current_user = request.user
            if current_user.is_authenticated:
                form.instance.user = current_user
            else:
                form.instance.user_name = form.cleaned_data.get('user_name')
            form.save() 
            return redirect('index')
    else:
        form = GameScoreForm()
    
    context = {
        'form': form,
        'game_scores': game_scores,
        'all_game_scores': all_game_scores,
        'game_won': game_won,
    }
    template = 'pacman/pacman.html'
    return render(request, template, context)

def pacman_leaderboard(request):
   
    context = {
        
    }

    template = 'pacman/pacman-leaderboard.html'

    return render(request, template, context)

