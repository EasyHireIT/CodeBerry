from django.urls import path
from . import views

app_name = "user_page"

urlpatterns = [
    path('', views.home, name="home"),
    path('user-creator/', views.create_user_page, name='user-creator'),
]
