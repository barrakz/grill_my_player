
# Usefull git commands
Get updated data from branch
```
git pull origin master
```

Create a new branch from branch you are on
```
git checkout -b new-branch
```

Add ALL files to staging area (before commit)
```
git add .
```

Add specific file to staging area (before commit)
```
git add file1
```

Commit change and write commit message
```
git commit -m "This is my new commit message"
```

Push your commited changes to branch you are on
```
git push origin head
```

# How to, all python django stuff
To go inside virtual env
```
source venv/bin/activate
```

To install deps
```
pip install -r requirements.txt
```

To save deps
```
pip freeze > requirements.txt
```


## Some cmds


creating django apps
```
python manage.py startapp nameoftheapp
```

update db with migration
```
python manage.py migrate
```

creating migrations from models
```
python manage.py makemigrations
```

create superuser
```
python manage.py createsuperuser
```


## access to objects from terminal
```
python3 manage.py shell
```


# Development
To run dev server:
```
python manage.py runserver
```

## Create run confgiuration in Pycharm:
![image](https://user-images.githubusercontent.com/8228270/142775105-2946b706-27f2-4ca9-a867-8a18916bb9f7.png)
