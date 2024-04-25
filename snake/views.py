from django.shortcuts import render, redirect
from .forms import GameScoreForm
from .models import SnakeGameScore
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


# Create your views here.

def snake(request):
    
    game_scores = SnakeGameScore.objects.all()[:5]
    all_game_scores = SnakeGameScore.objects.all()
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
            return redirect('snake')
    else:
        form = GameScoreForm()

    context = {
        'form': form,
        'game_scores': game_scores,
        'all_game_scores': all_game_scores,
        'game_won': game_won,
    }
    template = 'snake/snake.html'
    return render(request, template, context)

def snake_leaderboard(request):
    
    context = {
      
    }

    template = 'snake/snake-leaderboard.html'

    return render(request, template, context)
