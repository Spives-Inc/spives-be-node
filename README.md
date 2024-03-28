# SPIVES

SPIVES is a mobile App that helps futebol increase their visibility by allowing them to create a profile where they can create cards, upload videos that can then be seen
by Agents and scouts around the world thus increasing their chances of being part of professional clubs like Barcelona or MAN City.

## Table of Contents (Optional)

* [Installation](#installation)
* [Usage](#usage)
* [Contributing (Optional)](#contributing)
* [License](#license)
* [Additional Information (Optional)](#additional-information)

## Installation

Here are the steps to install and run the project:

1. Install dependencies ...
2. Clone the repository ...
3. Run the project ...

## Usage

Here's how to use the project functionalities:

* ... (instructions with code snippets or screenshots)

## Contributing

We welcome contributions to this project! Here's how you can get involved:

* Below are contribution guidelines to follow:


## License

This project is licensed under the MIT license.

Copyright (c) 2024. goSpives.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## INSTALLATION (MAC OS)

- Always refer to the [Django Installation](https://docs.djangoproject.com/en/5.0/intro/tutorial01/)

1. Clone this repo and navigate to the spives folder
2. Set Up Virtual Environment: `python3 -m venv spives-env`
3. Activate Virtual Environment: `source spives-env/bin/activate`

## INSTALLATION (WINDOWS OS)

1. Clone this repo and navigate to the spives folder
2. Set Up Virtual Environment: `python -m venv spives-env`
3. Activate Virtual Environment: `source spives-env\Scripts\activate`

## CONTINUE ...

4. Install all dependecies: `pip install -r requirements.txt`
5. Create `.env` file in the root folder.
6. Perform Initial Database Migrations: `python3 manage.py migrate`
7. (Optional) Create Superuser: `python3 manage.py createsuperuser`
8. Run Development Server: `python3 manage.py runserver`

## COMMANDS USED: OS X or Linux

- `mkdir gospives`
- `cd gospives`
- `python3 -m venv spives-env`
- `source spives/bin/activate`
- `python -m pip install --upgrade pip`
- `python -m pip install Django`
- `django-admin startproject gospives .`
- `python3 manage.py migrate`
- `python3 manage.py runserver`
- Add these dependencies to your requirements.txt file:`pip freeze > requirements.txt`

## COMMANDS USED: Windows

- `mkdir gospives`
- `cd gospives`
- `python -m venv spives-env`
- `source spives-env\Scripts\activate.bat`
- `python -m pip install Django`
- `django-admin startproject gospives .`
- `python manage.py migrate`
- `python manage.py runserver`
- Add these dependencies to your requirements.txt file:`pip freeze > requirements.txt`

## LIBRARIES

1.  [Django REST framework](https://www.django-rest-framework.org/)
2.  [django-cors-headers](https://pypi.org/project/django-cors-headers/)
3.  [django-rest-auth](https://django-rest-auth.readthedocs.io/en/latest/installation.html)
4.  [django-allauth](https://docs.allauth.org/en/latest/installation/quickstart.html)

## BEST PRACTICES

We will put here the best practices to contribute

## CONTRIBUTION
Please refer to the CONTRIBUTING.md

## TUTORIAL
Please refer to this for a tutorial on how to add Tags app to the project:

## Additional Information

* website: https://gospives.com
* E-mail: contributions@gospives.com
