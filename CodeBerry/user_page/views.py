from django.shortcuts import render, redirect
from .models import UserCreatorModel
from .forms import UserCreatorForm
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import UserCreationForm


# TODO
# edit, delete for user creator
# check how to get phone number extension

def home(request):
    user_creator = UserCreatorModel.objects.all()
    context = {'user_creator': user_creator}
    return render(request, 'CodeBerry/user_page/home.html', context)


def create_user_page(request):
    user_form = UserCreatorForm()
    if request.method == 'POST':
        user_form = UserCreatorForm(request.POST, request.FILES)
        if user_form.is_valid():
            user_form.save()
            # instance = UserCreatorModel(user_cv=request.FILES["file"])
            # instance.save(0)
            return redirect("user_page:home")

    context = {'user_form': user_form}
    return render(request, 'CodeBerry/user_page/user_creator.html', context)
