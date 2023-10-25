from django.urls import path
from . import views

urlpatterns = [
    # path('signin/', views.loginPage, name="login"),
    # path('logout/', views.logoutUser, name="logout"),
    # path('register/', views.registerPage, name="register"),

    path('', views.home, name="home"),
    #
    # path('user/<str:pk>/', views.user_account, name="user-account"),
    # path('submit-profile', views.submitOptions, name="submit-profile"),
    # path('update-option/<str:pk>/', views.updateOption, name="update-option"),
    # path('delete-option/<str:pk>/', views.deleteOption, name="delete-option"),
]
