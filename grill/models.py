from django.db import models


class Match(models.Model):
    teams = models.CharField(max_length=50)
    date = models.DateField()
    score = models.CharField(max_length=5)

    def __str__(self):
        return f"{self.teams}"


class Team(models.Model):
    name = models.CharField(max_length=50)
    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name="match")

    def __str__(self):
        return f"{self.name}"


class Player(models.Model):
    name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birth_date = models.IntegerField()
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="players")

    def __str__(self):
        return f"{self.name} {self.last_name}"


class Rating(models.Model):
    rate = models.IntegerField()
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="ratings")

    def __str__(self):
        return f"{self.rate}"


class Comment(models.Model):
    comment_text = models.CharField(max_length=1000)
    player = models.ForeignKey(Player, on_delete=models.CASCADE, related_name="comments")

    def __str__(self):
        return f"{self.comment_text}"

