from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from datetime import datetime, date
from ckeditor.fields import RichTextField


class Tag(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

    def get_absolute_url(self):
        return reverse('hr_page:home')


class Post(models.Model):
    title = models.CharField(max_length=255)
    title_tag = models.CharField(max_length=255)
    tag = models.CharField(max_length=255, default='Java')
    company_name = models.CharField(max_length=255)
    job_position = models.CharField(max_length=255)
    starting_date = models.CharField(max_length=255)
    company_size = models.IntegerField()
    suggested_salary = models.IntegerField()
    work_location = models.CharField(max_length=255)
    agreement_type = models.CharField(max_length=255)
    required_experience = models.IntegerField()
    required_technology_familiarity = models.IntegerField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    # body = models.TextField()
    body = RichTextField(blank=True, null=True)
    post_date = models.DateField(auto_now_add=True)
    follows = models.ManyToManyField(User, related_name='announcements')

    def total_follows(self):
        return self.follows.count()
    
    def __str__(self):
        return self.title + ' | ' + str(self.author)

    # def get_absolute_url(self):
    #     return reverse('article-detail', args=(str(self.id)))

    def get_absolute_url(self):
        return reverse("hr_page:article-detail", kwargs={"pk": self.pk})
    