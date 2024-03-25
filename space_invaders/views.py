from django.shortcuts import render, redirect
from .forms import GameScoreForm
from .models import GameScore
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

# Create your views here.

def space_invaders(request):
    game_scores = GameScore.objects.all()[:5]
    all_game_scores = GameScore.objects.all()
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
            return redirect('space_invaders')
    else:
        form = GameScoreForm()
    
    context = {
        'form': form,
        'game_scores': game_scores,
        'all_game_scores': all_game_scores,
        'game_won': game_won,
    }

    template = 'space_invaders/space-invaders.html'

    return render(request, template, context)

def space_invaders_leaderboard(request):
    all_game_scores = GameScore.objects.all()
    
    paginator = Paginator(all_game_scores, 15)
    page_number = request.GET.get('page')
    try:
        game_scores = paginator.page(page_number)
    except PageNotAnInteger:
        game_scores = paginator.page(1)
    except EmptyPage:
        game_scores = paginator.page(paginator.num_pages)

    context = {
        'game_scores': game_scores,
    }

    template = 'space_invaders/space-invaders-leaderboard.html'

    return render(request, template, context)

