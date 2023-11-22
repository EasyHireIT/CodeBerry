user_education_choices = [
    ("bachelor", "Licencjat"),
    ("engineer", "Inżynier"),
    ("master", "Magister"),
    ("phd", "Doktor"),
    ("unspecified", "Nie chcę podawać"),
]

user_work_period_choices = [
    ("immediately", "Od zaraz"),
    ("month", "1 miesiąc"),
    ("three_months", "3 miesiące"),
    ("more_months", "3+ miesiące"),
]

user_employment_type_choices = [
    ("remotely", "Zdalnie"),
    ("hybrid", "Hybrydowo"),
    ("stationary", "Stacjonarnie"),
]

user_relocation_choices = [
    ("yes", "Tak"),
    ("no", "Nie"),
]

user_employment_form_choices = [
    ("contract", "UoP"),
    ("commission", "UZ"),
    ("b2b", "B2B"),
    ("internship", "Staż"),
]

user_contact_choices = [
    ("phone", "Telefon"),
    ("email", "Email"),
    ("chat", "Czat"),
]

user_languages_choices = [
    ("english", "Angielski"),
    ("german", "Niemiecki"),
    ("spanish", "Hiszpański"),
]

user_skills_choices = [
    ("Język programowania", (
        ("python", "Python"),
        ("csharp", "C#"),
        ("c++", "C++"),
        ("go", "Go"),
        ("java", "Java"),
        ("c", "C"),
        ("typescript", "Typescript"),
        ("embeddedc", "C embedded"),
        ("cobol", "cobol"),
        ("kotlin", "Kotlin"),
    )),
    ("Frameworki i biblioteki", (
        ("django", "Django"),
        ("aspnet", "ASP .NET"),
    )),
    ("Narzędzia", (
        ("azure", "Azure"),
        ("browserstack", "BrowserStack"),
        ("buddy", "Buddy"),
        ("cmake", "CMake"),
        ("circleci", "CircleCI"),
        ("docker", "Docker"),
        ("eclipse", "Eclipse"),
    )),
    ("Metodyka pracy", (
        ("agile", "Agile"),
        ("scrum", "Scrum"),
        ("kanban", "Kanban"),
        ("lean", "Lean"),
        ("prince2", "Prince2"),
        ("sixsigma", "SixSigma"),
    )),
    ("Systemy zarządzania", (
        ("asana", "Asana"),
        ("agile", "Agile"),
        ("bitbucket", "BitBucket"),
        ("cherwell", "Cherwell"),
        ("dynamics365", "Dynamics 365"),
        ("freshdesk", "FreshDesk"),
    )),
]
