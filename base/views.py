from django.shortcuts import render

# Create your views here.
def index(request):

    template = 'base/index.html'

    return render(request, template)