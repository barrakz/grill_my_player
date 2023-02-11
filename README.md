<h1>Grill My Player App</h1>

<h3>Documentation </h3>

Django project for the final project of the "Python from Scratch" bootcamp at the Software Development Academy.

The project was a two-person group project and was completed using the Django framework with the REST framework. The project allows users to rate the performance of each player on the Polish national soccer team after each match. The application calculates the average rating for each player and also allows users to log in and associate their ratings with their account.


To set up the project, you will need to have Django and the REST framework installed. Clone the project repository and navigate to the project directory in your terminal. Run the following commands to install the necessary dependencies:


```pip install -r requirements.txt```
Next, run the following command to apply the database migrations:


```python manage.py migrate```
Finally, start the development server by running the following command:


```python manage.py runserver```
The application should now be running and accessible at ```http://localhost:8000/``` You can log in or create an account using the provided functionality, and you will be able to rate the players and view the calculated average ratings.
