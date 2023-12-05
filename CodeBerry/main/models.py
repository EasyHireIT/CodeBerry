import datetime
from django.contrib.auth.models import User
from django.db import models
from django.forms import ModelForm, TextInput
from django.utils import timezone
from django.contrib import admin
from django.core.validators import FileExtensionValidator


class WorkOffer(models.Model):
    offer_title = models.CharField(max_length=200)
    company_name = models.CharField(max_length=100, null=True, blank=True)
    job_position = models.CharField(max_length=200, null=True, blank=True)
    pub_date = models.DateTimeField("date published", null=True, blank=True)

    @property
    def is_favorited(self):
        return self.favorite.filter(user=User).exists()

    def __str__(self):
        return self.offer_title

    @admin.display(
        boolean=True,
        ordering="pub_date",
        description="Published recently?",
    )
    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.pub_date <= now

    def __str__(self):
        return self.offer_title


class JobAnnouncement(models.Model):
    announcement_title = models.CharField(max_length=200, null=True, blank=True)
    company_name = models.CharField(max_length=100, null=True, blank=True)
    job_position = models.CharField(max_length=200, null=True, blank=True)
    job_start_date = models.DateTimeField(null=True, blank=True)
    company_size = models.IntegerField(null=True, blank=True)
    suggested_salary = models.IntegerField(null=True, blank=True)
    upload_resume = models.FileField(upload_to='resume', null=True, blank=True)

    announcement_content = models.CharField(max_length=2000, null=True, blank=True)
    redirect_link = models.URLField(max_length=200, db_index=True, unique=True, blank=True)

    is_remote = models.BooleanField()
    is_hybrid = models.BooleanField()
    is_promoted = models.BooleanField()

    def __str__(self):
        return f'{self.announcement_title} - {self.company_name}'


class UserApplicationData(models.Model):
    user_id = models.Index
    user_name = models.CharField(max_length=50, blank=True, null=True, verbose_name="Imię")
    user_surname = models.CharField(max_length=50, blank=True, null=True, verbose_name="Nazwisko")
    user_email = models.EmailField(max_length=30, null=True, verbose_name="Adres e-mail", blank=True)
    user_phone_num = models.CharField(max_length=12, blank=True, null=True)
    user_repo_link = models.CharField(max_length=80, blank=True, null=True, verbose_name="Link do repozytorium")
    user_linkedin = models.CharField(max_length=80, blank=True, null=True, verbose_name="Linkedin")
    user_cv = models.FileField(null=True, blank=True, upload_to=r'files/',
                               validators=[FileExtensionValidator(allowed_extensions=["pdf"])])

    def __str__(self):
        return self.user_name


class UserApplicationForm(ModelForm):
    class Meta:
        model = UserApplicationData
        fields = ["user_name", "user_surname", "user_email", "user_phone_num", "user_repo_link", "user_linkedin",
                  "user_cv"]
        widgets = {
            'user_name': TextInput(attrs={'placeholder': 'Imię'}),
            'user_surname': TextInput(attrs={'placeholder': 'Nazwisko'}),
            'user_email': TextInput(attrs={'placeholder': 'E-mail'}),
            'user_phone_num': TextInput(attrs={'placeholder': 'Nr telefonu'}),
            'user_repo_link': TextInput(attrs={'placeholder': 'Link do repozytorium'}),
            'user_linkedin': TextInput(attrs={'placeholder': 'Linkedin'}),
        }


class Favorite(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    work_offer = models.ForeignKey(WorkOffer, on_delete=models.CASCADE)