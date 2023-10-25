from django.shortcuts import get_object_or_404, render, redirect
from django.contrib.auth import logout
from django.urls import reverse
from django.http import HttpResponse, HttpResponseRedirect

from .models import WorkOffer


def home(request):
    latest_offers_list = WorkOffer.objects.all().values()  # .order_by("-pub_date")
    context = {"latest_offers_list": latest_offers_list}
    return render(request, "CodeBerry/main_page/index.html", context)


def offerPanel(request, offer_id):
    offer = get_object_or_404(WorkOffer, pk=offer_id)
    context = {"offer": offer}
    return render(request, "CodeBerry/main_page/offer.html", context)


def offerSendCV(request, offer_id):
    offer = get_object_or_404(WorkOffer, pk=offer_id)
    try:
        selected_choice = WorkOffer.start_work_period.get_choices()
    except (KeyError, WorkOffer.DoesNotExist):
        # Redisplay the question voting form.
        return render(
            request,
            "CodeBerry/main_page/offer.html",
            {
                "choice": offer,
                "error_message": "You didn't select a choice.",
            },
        )
    else:
        # selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse("main:offerSendCV", args=(offer.id,)))


def loginPanel(request):
    return render(request, "CodeBerry/google_auth/login.html")


def logoutPanel(request):
    logout(request)
    return redirect("main:home")


def registerPanel(request):
    return HttpResponse("registerPanel")


def handle_404(request, exception):
    return render(request, "CodeBerry/errors/404.html", status=404)
