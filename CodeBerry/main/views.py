from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import logout
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from .models import WorkOffer, UserApplicationData, Favorite
from .models import UserApplicationForm


def home(request):
    latest_offers_list = WorkOffer.objects.all().values()
    user_application_data = UserApplicationData.objects.all()

    # Check if the favorites filter is applied
    if request.GET.get('favorites'):
        latest_offers_list = latest_offers_list.filter(favorite__user=request.user)

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
    return redirect('main:home')


def registerPanel(request):
    return render(request, "CodeBerry/auth/register.html")

@login_required
def toggle_favorite(request, work_offer_id):
    work_offer = get_object_or_404(WorkOffer, pk=work_offer_id)
    user = request.user

    try:
        favorite = Favorite.objects.get(user=user, work_offer=work_offer)
        favorite.delete()  # Remove from favorites
        return JsonResponse({'message': 'Removed from favorites'})
    except Favorite.DoesNotExist:
        Favorite.objects.create(user=user, work_offer=work_offer)  # Add to favorites
        return JsonResponse({'message': 'Added to favorites'})

def handle_404(request, exception):
    return render(request, "CodeBerry/errors/404.html", status=404)
