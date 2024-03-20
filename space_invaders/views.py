from django.shortcuts import render, redirect

def space_invaders(request):

    template = 'space_invaders/space-invaders.html'

    return render(request, template)

