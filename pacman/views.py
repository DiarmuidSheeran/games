from django.shortcuts import render

# Create your views here.

def pacman(request):

    context = {
        
    }
    template = 'pacman/pacman.html'
    return render(request, template, context)

def pacman_leaderboard(request):
   
    context = {
        
    }

    template = 'pacman/pacman-leaderboard.html'

    return render(request, template, context)

