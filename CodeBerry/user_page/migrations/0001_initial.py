# Generated by Django 4.2.4 on 2023-10-25 19:33

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserCreatorModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(blank=True, max_length=50, null=True, verbose_name='Imię i nazwisko')),
                ('user_phone_number', models.CharField(blank=True, max_length=15, null=True, validators=[django.core.validators.RegexValidator(message='Oczekiwany format numeru: +99999999999. Limit 15 cyfr', regex='^\\+?1?\\d{9,15}$')], verbose_name='Numer telefonu')),
                ('user_email', models.EmailField(blank=True, max_length=30, null=True, verbose_name='Adres e-mail')),
                ('user_education', models.CharField(blank=True, max_length=50, null=True)),
                ('user_work_period', models.CharField(blank=True, max_length=50, null=True)),
                ('user_employment_type', models.CharField(blank=True, max_length=50, null=True)),
                ('user_relocation', models.CharField(blank=True, max_length=50, null=True)),
                ('user_employment_form', models.CharField(blank=True, max_length=50, null=True)),
                ('user_contact', models.CharField(blank=True, max_length=50, null=True)),
                ('user_languages', models.CharField(blank=True, max_length=200, null=True)),
                ('user_skills', models.CharField(blank=True, max_length=200, null=True)),
                ('user_salary', models.DecimalField(blank=True, decimal_places=0, max_digits=5, null=True)),
                ('user_bio', models.TextField(blank=True, null=True, verbose_name='Bio')),
                ('user_repo_link', models.CharField(blank=True, max_length=80, null=True, verbose_name='Link do repozytorium z projektami')),
                ('user_linkedin', models.CharField(blank=True, max_length=80, null=True, verbose_name='Twój Linkedin')),
                ('user_cv', models.FileField(blank=True, null=True, upload_to='files/', validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['pdf'])])),
            ],
        ),
    ]
