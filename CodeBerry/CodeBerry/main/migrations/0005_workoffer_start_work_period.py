# Generated by Django 4.2.4 on 2023-08-15 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_workoffer_company_name_workoffer_job_position'),
    ]

    operations = [
        migrations.AddField(
            model_name='workoffer',
            name='start_work_period',
            field=models.CharField(blank=True, choices=[('01', 'Od zaraz'), ('02', '1 miesiac'), ('03', '3 miesiace')], max_length=100, null=True),
        ),
    ]