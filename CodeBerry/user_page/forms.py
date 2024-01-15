from django.forms import ModelForm
from .models import UserCreatorModel
from django import forms
from .user_choices import *


class UserCreatorForm(ModelForm):
    user_phone_number = forms.CharField(
        widget=forms.TextInput(
            attrs={"type": "tel", "name": "tel", "placeholder": ""}))

    user_education = forms.CharField(
        widget=forms.SelectMultiple(choices=user_education_choices,
                            attrs={"type": "text", "class": "user-education"}))

    user_notice_period = forms.CharField(
        widget=forms.Select(choices=user_notice_period_choices,
                            attrs={"type": "text", "class": "user-notice-period"}))

    user_work_model = forms.CharField(
        widget=forms.SelectMultiple(choices=user_work_model_choices,
                                    attrs={"type": "text", "class": "user-work-model"}))

    user_relocation = forms.CharField(
        widget=forms.Select(choices=user_relocation_choices,
                            attrs={"type": "text", "class": "user-relocation"}),
                            initial='no')

    user_relocation_cities = forms.CharField(
        widget=forms.SelectMultiple(choices=user_relocation_cities_choices,
                                    attrs={"type": "text", "id":"relocation-cities"}))

    user_work_contract = forms.CharField(
        widget=forms.SelectMultiple(choices=user_work_contract_choices,
                                    attrs={"type": "text", "class": "user-work-contract"}))

    user_contact = forms.CharField(
        widget=forms.SelectMultiple(choices=user_contact_choices,
                                    attrs={"type": "text", "class": "user-contact"}))

    user_languages = forms.CharField(
        widget=forms.SelectMultiple(choices=user_languages_choices,
                                    attrs={"type": "text", "id": "user-languages"}))

    user_skills = forms.CharField(
        widget=forms.SelectMultiple(choices=user_skills_choices,
                                    attrs={"type": "text", "id": "skills-menu"}))

    user_contract_salary = forms.DecimalField(
        widget=forms.NumberInput(
            attrs={"type": "number", "id": "salary_contract", "class" : "salary-input", "onkeyup": "contractSlider.value=this.value", "readonly" : "readonly" }))

    user_commission_salary = forms.DecimalField(
        widget=forms.NumberInput(
            attrs={"type": "number", "id": "salary_commission", "class" : "salary-input", "onkeyup": "commissionSlider.value=this.value", "readonly" : "readonly"}))

    user_b2b_salary = forms.DecimalField(
        widget=forms.NumberInput(
            attrs={"type": "number", "id": "salary_b2b", "class" : "salary-input", "onkeyup": "b2bSlider.value=this.value", "readonly" : "readonly"}))
   
    class Meta:
        model = UserCreatorModel
        fields = '__all__'
