from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import logout
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect

from .models import WorkOffer, UserApplicationData
from .models import UserApplicationForm


def home(request):
    latest_offers_list = WorkOffer.objects.all().values()
    user_application_data = UserApplicationData.objects.all()

    user_application_form = UserApplicationForm()
    if request.method == 'POST':
        user_application_form = UserApplicationForm(request.POST, request.FILES)
        if user_application_form.is_valid():
            user_application_form.save()
            return redirect("main:home")

    context = {"latest_offers_list": latest_offers_list,
               "user_application_data ": user_application_data,
               "user_application_form": user_application_form}
    return render(request, "CodeBerry/main_page/index.html", context)


def loginPanel(request):
    return render(request, "CodeBerry/auth/login.html")


def logoutPanel(request):
    logout(request)
    return redirect("main:home")


def registerPanel(request):
    return render(request, "CodeBerry/auth/register.html")


def handle_404(request, exception):
    return render(request, "CodeBerry/errors/404.html", status=404)
