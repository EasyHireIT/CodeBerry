from django.db import models
from django.core.validators import RegexValidator
from django.core.validators import FileExtensionValidator


# Model for CodeBerry User.
class UserCreatorModel(models.Model):
    user_id = models.Index
    user_name = models.CharField(max_length=50, blank=True, null=True)
    user_phone_number = models.CharField(max_length=15, blank=True, null=True)
    user_email = models.EmailField(max_length=30, null=True, blank=True)
    user_education = models.CharField(max_length=50, blank=True, null=True)
    user_notice_period = models.CharField(max_length=50, blank=True, null=True)
    user_work_model = models.CharField(max_length=50, blank=True, null=True)
    user_relocation = models.CharField(max_length=50, blank=True, null=True)
    user_relocation_cities = models.CharField(max_length=100, blank=True, null=True)
    user_work_contract = models.CharField(max_length=50, blank=True, null=True)
    user_contact = models.CharField(max_length=50, blank=True, null=True)
    user_languages = models.CharField(max_length=200, blank=True, null=True)
    user_skills = models.CharField(max_length=200, blank=True, null=True)
    user_contract_salary = models.DecimalField(max_digits=5, decimal_places=0, blank=True, null=True)
    user_commission_salary = models.DecimalField(max_digits=5, decimal_places=0, blank=True, null=True)
    user_b2b_salary = models.DecimalField(max_digits=5, decimal_places=0, blank=True, null=True)
    user_bio = models.TextField(blank=True, null=True)
    user_repo_link = models.CharField(max_length=80, blank=True, null=True)
    user_linkedin = models.CharField(max_length=80, blank=True, null=True)
    user_cv = models.FileField(null=True, blank=True, upload_to=r'files/',
                               validators=[FileExtensionValidator(allowed_extensions=["pdf"])])

    def __str__(self):
        return self.user_name
