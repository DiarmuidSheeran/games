from django.shortcuts import render


# Create your views here.

def snake(request):
    
    context = {
        
    }
    template = 'snake/snake.html'
    return render(request, template, context)

def snake_leaderboard(request):
    
    context = {
      
    }

    template = 'snake/snake-leaderboard.html'

    return render(request, template, context)
