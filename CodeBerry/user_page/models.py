from django.db import models
from django.core.validators import RegexValidator
from django.core.validators import FileExtensionValidator


# Model for EasyHire User.
class UserCreatorModel(models.Model):
    user_id = models.Index
    user_name = models.CharField(max_length=50, blank=True, null=True, verbose_name="Imię i nazwisko")
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$',
                                 message="Oczekiwany format numeru: +99999999999. Limit 15 cyfr")
    user_phone_number = models.CharField(validators=[phone_regex], max_length=15, blank=True,
                                         verbose_name="Numer telefonu", null=True)
    user_email = models.EmailField(max_length=30, null=True, verbose_name="Adres e-mail", blank=True)
    user_education = models.CharField(max_length=50, blank=True, null=True)
    user_work_period = models.CharField(max_length=50, blank=True, null=True)
    user_employment_type = models.CharField(max_length=50, blank=True, null=True)
    user_relocation = models.CharField(max_length=50, blank=True, null=True)
    user_employment_form = models.CharField(max_length=50, blank=True, null=True)
    user_contact = models.CharField(max_length=50, blank=True, null=True)
    user_languages = models.CharField(max_length=200, blank=True, null=True)
    user_skills = models.CharField(max_length=200, blank=True, null=True)
    user_salary = models.DecimalField(max_digits=5, decimal_places=0, blank=True, null=True)
    user_bio = models.TextField(blank=True, null=True, verbose_name="Bio")
    user_repo_link = models.CharField(max_length=80, blank=True, null=True,
                                      verbose_name="Link do repozytorium z projektami")
    user_linkedin = models.CharField(max_length=80, blank=True, null=True, verbose_name="Twój Linkedin")
    user_cv = models.FileField(null=True, blank=True, upload_to=r'files/',
                               validators=[FileExtensionValidator(allowed_extensions=["pdf"])])

    def __str__(self):
        return self.user_name
