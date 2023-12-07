from django.urls import path
from .views import HomeView, ArticleDetailView, AddAnnouncementView, UpdateAnnouncementView, DeleteAnnouncementView, AddTagView, TagView, FollowView, FollowedListView

app_name = "hr_page"

urlpatterns = [
    path('', HomeView.as_view(), name="home"),
    path('article/<int:pk>', ArticleDetailView.as_view(), name="article-detail"),
    path('add_announcement/', AddAnnouncementView.as_view(), name="add_announcement"),
    path('add_tag/', AddTagView.as_view(), name="add_tag"),
    path('article/edit/<int:pk>', UpdateAnnouncementView.as_view(), name="update_announcement"),
    path('article/<int:pk>/delete', DeleteAnnouncementView.as_view(), name="delete_announcement"),
    path('tag/<str:requested_tag>/', TagView, name='tag'),
    path('followed/', FollowedListView.as_view(), name='view_followed'),
    path('followed/<int:pk>', FollowView, name='follow_post'),
]
