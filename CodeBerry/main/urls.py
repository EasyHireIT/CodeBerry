from django.urls import path
from . import views
from django.views.static import serve  # static and media files -> accesible when DEBUG=FALSE

app_name = "main"
urlpatterns = [

    path('', views.home, name='home'),
    # path('offer/<int:offer_id>/', views.offerPanel, name='offerPanel'),
    # path('offer/<int:offer_id>/apply', views.offerSendCV, name='offerSendCV'),

    path('logout/', views.logoutPanel, name='logout'),

    path('login/', views.loginPanel, name='loginPanel'),
    path('register/', views.registerPanel, name='registerPanel'),

    path('toggle_favorite/<int:work_offer_id>/', views.toggle_favorite, name='toggle_favorite'),
]
