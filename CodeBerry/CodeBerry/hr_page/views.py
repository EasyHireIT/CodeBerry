from django.shortcuts import render
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView
from .models import Post, Tag
from .forms import PostForm, EditForm
from django.urls import reverse_lazy


class HomeView(ListView):
    model = Post
    template_name = 'CodeBerry/hr_page/home.html'
    ordering = ['-post_date', '-id']

    def get_context_data(self, *args, **kwargs):
        tag_menu = Tag.objects.all()
        context = super(HomeView, self).get_context_data(*args, **kwargs)
        context["tag_menu"] = tag_menu
        return context


def TagView(request, requested_tag):
    tag_posts = Post.objects.filter(tag__iexact=requested_tag.replace('-', ' '))
    return render(request, 'CodeBerry/hr_page/tags.html', {'requested_tag': requested_tag.title().replace('-', ' '), 'tag_posts': tag_posts})


class ArticleDetailView(DetailView):
    model = Post
    template_name = 'CodeBerry/hr_page/article_details.html'


class AddAnnouncementView(CreateView):
    model = Post
    form_class = PostForm
    template_name = 'CodeBerry/hr_page/add_announcement.html'
    # fields = '__all__'
    # fields = ('title', 'body')


class AddTagView(CreateView):
    model = Tag
    template_name = 'CodeBerry/hr_page/add_tag.html'
    fields = "__all__"


class UpdateAnnouncementView(UpdateView):
    model = Post
    form_class = EditForm
    template_name = 'CodeBerry/hr_page/update_announcement.html'
    # fields = ('title', 'title_tag', 'body')


class DeleteAnnouncementView(DeleteView):
    model = Post
    template_name = 'CodeBerry/hr_page/delete_announcement.html'
    success_url = reverse_lazy('hr_page:home')