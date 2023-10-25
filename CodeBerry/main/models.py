from django.db import models


class WorkOffer(models.Model):
    offer_title = models.CharField(max_length=200)

    def __str__(self):
        return self.offer_title


# from django.contrib.gis.db import models
# from django.core.validators import MaxValueValidator, MinValueValidator

class JobAnnouncement(models.Model):
    announcement_title = models.CharField(max_length=200, null=True, blank=True)
    company_name = models.CharField(max_length=100, null=True, blank=True)
    job_position = models.CharField(max_length=200, null=True, blank=True)
    job_start_date = models.DateTimeField(null=True, blank=True)
    company_size = models.IntegerField(null=True, blank=True)
    suggested_salary = models.IntegerField(null=True, blank=True)
    upload_resume = models.FileField(upload_to='resume', null=True, blank=True)
    # job_location = models.PointField(geography=True, spatial_index=True)
    # required_experience = models.IntegerField(null=True, blank=True,
    #                                           validators=[MinValueValidator(0), MaxValueValidator(10)])
    # required_technology_skill = models.IntegerField(null=True, blank=True,
    #                                                 validators=[MinValueValidator(1), MaxValueValidator(5)])
    announcement_content = models.CharField(max_length=2000, null=True, blank=True)
    redirect_link = models.URLField(max_length=200, db_index=True, unique=True, blank=True)
    # agreement_type = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(0), MaxValueValidator(2)])
    is_remote = models.BooleanField()
    is_hybrid = models.BooleanField()
    is_promoted = models.BooleanField()

    def __str__(self):
        return f'{self.announcement_title} - {self.company_name}'
