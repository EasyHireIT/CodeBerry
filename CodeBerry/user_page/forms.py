from django.forms import ModelForm
from .models import UserCreatorModel
from django import forms
from .user_choices import *


class UserCreatorForm(ModelForm):
    user_phone_number = forms.CharField(
        widget=forms.TextInput(
            attrs={"type": "tel", "name": "tel", "placeholder": "", "class": "selected-option"}))

    user_education = forms.CharField(
        widget=forms.Select(choices=user_education_choices,
                            attrs={"type": "text", "class": "user-information"}))

    user_work_period = forms.CharField(
        widget=forms.Select(choices=user_work_period_choices,
                            attrs={"type": "text", "class": "user-information"}))

    user_employment_type = forms.CharField(
        widget=forms.SelectMultiple(choices=user_employment_type_choices,
                                    attrs={"type": "text", "class": "user-information"}))

    user_relocation = forms.CharField(
        widget=forms.Select(choices=user_relocation_choices,
                            attrs={"type": "text", "class": "user-information"}))

    user_employment_form = forms.CharField(
        widget=forms.SelectMultiple(choices=user_employment_form_choices,
                                    attrs={"type": "text", "class": "user-information"}))

    user_contact = forms.CharField(
        widget=forms.SelectMultiple(choices=user_contact_choices,
                                    attrs={"type": "text", "class": "user-information"}))

    user_languages = forms.CharField(
        widget=forms.SelectMultiple(choices=user_languages_choices,
                                    attrs={"type": "text", "id": "user-languages"}))

    user_skills = forms.CharField(
        widget=forms.SelectMultiple(choices=user_skills_choices,
                                    attrs={"type": "text", "id": "skills-menu"}))

    user_salary = forms.DecimalField(
        widget=forms.NumberInput(
            attrs={"type": "number", "id": "salary", "value": "0", "onkeyup": "range.value=this.value"}))

    class Meta:
        model = UserCreatorModel
        fields = '__all__'
