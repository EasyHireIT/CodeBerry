# Generated by Django 4.2.4 on 2023-10-25 20:29

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('title_tag', models.CharField(max_length=255)),
                ('tag', models.CharField(default='Java', max_length=255)),
                ('company_name', models.CharField(max_length=255)),
                ('job_position', models.CharField(max_length=255)),
                ('starting_date', models.CharField(max_length=255)),
                ('company_size', models.IntegerField()),
                ('suggested_salary', models.IntegerField()),
                ('work_location', models.CharField(max_length=255)),
                ('agreement_type', models.CharField(max_length=255)),
                ('required_experience', models.IntegerField()),
                ('required_technology_familiarity', models.IntegerField()),
                ('body', models.TextField()),
                ('post_date', models.DateField(auto_now_add=True)),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
