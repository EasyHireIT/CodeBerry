from django.contrib import admin
from .models import WorkOffer, JobAnnouncement

admin.site.register(JobAnnouncement)


class WorkOfferAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {"fields": ["offer_title", "company_name", "job_position"]}),
        ("Date information", {"fields": ["start_work_period", "pub_date"]}),
    ]

    list_display = ["offer_title", "company_name", "job_position", "pub_date"]
    list_filter = ["pub_date"]
    search_fields = ["company_name", "offer_title", "job_position"]


admin.site.register(WorkOffer, WorkOfferAdmin)
