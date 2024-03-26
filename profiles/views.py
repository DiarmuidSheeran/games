from django.shortcuts import render, redirect
from .models import Profile
from .forms import ProfileForm
from django.contrib.auth.decorators import login_required  

@login_required
def profile_view(request):
    profile = Profile.objects.get(user=request.user)
    return render(request, 'profiles/profile.html', {'profile': profile})

@login_required
def edit_bio(request):
    if request.method == 'POST':
        form = ProfileForm(request.POST, instance=request.user.profile)
        if form.is_valid():
            form.save()
            return redirect('profile')
    else:
        form = ProfileForm(instance=request.user.profile)
    return render(request, 'profiles/edit_bio.html', {'form': form})