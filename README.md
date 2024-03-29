# About SPIVES

SPIVES is a mobile App that helps football players increase their visibility by allowing them to create a profile where they can create cards, upload videos that can then be seen
by Agents and scouts around the world thus increasing their chances of being part of professional clubs like Barcelona or MAN City.

## Table of Contents (Optional)

* [Installation](#installation)
* [Usage](#usage)
* [Contributing (Optional)](#contributing)
* [Installation-MacOs](#installation-macos)
* [Installation-Windows](#installation-windows)
* [Continue](#continue)
* [Commands used-OS X or Linux](#commands-used-os-x-or-linux)
* [Commands used-Windows](#commands-used-windows)
* [Libraries](#libraries)
* [Best Practices](#best-practices)
* [Contribution](#contribution)
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

## Installation-MacOS

Always refer to the [Django Installation](https://docs.djangoproject.com/en/5.0/intro/tutorial01/)

1. Clone this repo and navigate to the spives folder
2. Set Up Virtual Environment: `python3 -m venv spives-env`
3. Activate Virtual Environment: `source spives-env/bin/activate`

## Installation-Windows

1. Clone this repo and navigate to the spives folder
2. Set Up Virtual Environment: `python -m venv spives-env`
3. Activate Virtual Environment: `source spives-env\Scripts\activate`

## Continue

1. Install all dependecies: `pip install -r requirements.txt`
2. Create `.env` file in the root folder.
3. Perform Initial Database Migrations: `python3 manage.py migrate`
4. (Optional) Create Superuser: `python3 manage.py createsuperuser`
5. Run Development Server: `python3 manage.py runserver`

## Commands used-OS X or Linux

* `mkdir gospives`
* `cd gospives`
* `python3 -m venv spives-env`
* `source spives/bin/activate`
* `python -m pip install --upgrade pip`
* `python -m pip install Django`
* `django-admin startproject gospives .`
* `python3 manage.py migrate`
* `python3 manage.py runserver`
* Add these dependencies to your requirements.txt file:`pip freeze > requirements.txt`
* Protect SECRET_KEYS - `pip install python-dotenv`

## Commands used-Windows

* `mkdir gospives`
* `cd gospives`
* `python -m venv spives-env`
* `source spives-env\Scripts\activate.bat`
* `python -m pip install Django`
* `django-admin startproject gospives .`
* `python manage.py migrate`
* `python manage.py runserver`
* Add these dependencies to your requirements.txt file:`pip freeze > requirements.txt`
* Protect SECRET_KEYS - `pip install python-dotenv`

## Libraries

1. [Django REST framework](https://www.django-rest-framework.org/)
2. [django-cors-headers](https://pypi.org/project/django-cors-headers/)
3. [django-rest-auth](https://django-rest-auth.readthedocs.io/en/latest/installation.html)
4. [django-allauth](https://docs.allauth.org/en/latest/installation/quickstart.html)

## Best Practices

1. Keep Django Updated: Always stay on the latest version of Django. Regularly update your project to benefit from security fixes and improvements. Major releases occur approximately every 9 months, with minor releases addressing security and bugs almost monthly (<https://learndjango.com/tutorials/django-best-practices-security>)

2. Environment Variables:
    * Use environment variables to manage settings between local development and production environments. These variables allow you to switch configurations seamlessly.
    * Consider using packages like `environs` to handle environment variables effectively.

3. DEBUG Mode:
In your `settings.py`, ensure that the `DEBUG` setting is set to `False` in production. Debug mode provides detailed error pages, which can be a security risk if exposed publicly. Read more on: (<https://learndjango.com/tutorials/django-best-practices-security>)

4. SECRET_KEY:
    * Keep the `SECRET_KEY` confidential. It’s used for cryptographic signing and should never be shared or exposed.
    * Generate a strong, random `SECRET_KEY` during project setup.

5. Authorization and Authentication:
    * Implement robust authorization and authentication mechanisms. Use Django’s built-in features like user authentication, permissions, and groups.
    * Avoid custom authentication solutions unless necessary.

6. Secure Configurations:
    * Properly configure the application settings. Guard against common vulnerabilities like cross-site scripting (XSS) and cross-site request forgery (CSRF).
    * Use HTTPS to encrypt data in transit.

7. Rate Limiting and Brute-Force Protection:
    * Implement rate limiting to prevent brute-force attacks.
    * Consider using packages like `django_ratelimit` or `django-axes`.

8. Third-Party Dependencies:
    * Regularly review and update third-party packages. Vulnerabilities in dependencies can impact the application’s security.
    * Use tools like `pip-tools` to manage dependencies efficiently.

9. Security Audits:
    * Perform automated security audits regularly. Tools like `Lynis` can help identify potential issues.
    * Monitor logs and track suspicious activity.

10. Database Security:
    * Secure your database connections. Use strong passwords and restrict access.
    * Avoid using default database credentials.

## Contribution

Please refer to the CONTRIBUTING.md for guidance.

## Additional Information

* website: <https://gospives.com>
* E-mail: <contributions@gospives.com>
