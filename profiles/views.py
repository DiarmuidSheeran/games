from django.shortcuts import render
from .models import Profile
from django.contrib.auth.decorators import login_required  

@login_required
def profile_view(request):
    profile = Profile.objects.get(user=request.user)
    return render(request, 'profiles/profile.html', {'profile': profile})