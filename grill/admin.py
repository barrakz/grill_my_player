from django.contrib import admin


from .models import Match, Team, Player, Rating

admin.site.register(Match)
admin.site.register(Team)
admin.site.register(Player)
admin.site.register(Rating)
# admin.site.register(Comment)
