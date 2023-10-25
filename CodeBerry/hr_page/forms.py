from django import forms
from .models import Post, Tag

# choices = [('Java', 'Java'), ('JavaScript', 'JavaScript'), ('Python', 'Python'),]
choices = Tag.objects.all().values_list('name', 'name')  # This returns a QuerySet, and we want a list
choice_list = []  # This is a list

for item in choices:  # And we fill the list here, from the QuerySet
    choice_list.append(item)


class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ("__all__")

        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Wpisz tytuł ogłoszenia...'}),
            'title_tag': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Wpisz skrócony tytuł...'}),
            'tag': forms.Select(choices=choice_list, attrs={'class': 'form-control'}),
            'company_name': forms.TextInput(attrs={'class': 'form-control'}),
            'job_position': forms.TextInput(attrs={'class': 'form-control'}),
            'starting_date': forms.TextInput(attrs={'class': 'form-control'}),
            'company_size': forms.NumberInput(attrs={'class': 'form-control'}),
            'suggested_salary': forms.NumberInput(attrs={'class': 'form-control'}),
            'work_location': forms.TextInput(attrs={'class': 'form-control'}),
            'agreement_type': forms.TextInput(attrs={'class': 'form-control'}),
            'required_experience': forms.NumberInput(attrs={'class': 'form-control'}),
            'required_technology_familiarity': forms.NumberInput(attrs={'class': 'form-control'}),
            'author': forms.Select(attrs={'class': 'form-control'}),
            'body': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Wpisz treść ogłoszenia...'}),
        }


class EditForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ('__all__')

        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Wpisz tytuł ogłoszenia...'}),
            'title_tag': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Wpisz skrócony tytuł...'}),
            'tag': forms.Select(choices=choice_list, attrs={'class': 'form-control'}),
            'company_name': forms.TextInput(attrs={'class': 'form-control'}),
            'job_position': forms.TextInput(attrs={'class': 'form-control'}),
            'starting_date': forms.TextInput(attrs={'class': 'form-control'}),
            'company_size': forms.NumberInput(attrs={'class': 'form-control'}),
            'suggested_salary': forms.NumberInput(attrs={'class': 'form-control'}),
            'work_location': forms.TextInput(attrs={'class': 'form-control'}),
            'agreement_type': forms.TextInput(attrs={'class': 'form-control'}),
            'required_experience': forms.NumberInput(attrs={'class': 'form-control'}),
            'required_technology_familiarity': forms.NumberInput(attrs={'class': 'form-control'}),
            'body': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Wpisz treść ogłoszenia...'}),
        }