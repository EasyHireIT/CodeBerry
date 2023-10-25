from .models import Tag


def navbar_context(request):
    return {'tag_menu': Tag.objects.all(),}