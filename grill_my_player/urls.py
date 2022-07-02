"""grill_my_player URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from grill import views
from rest_framework.routers import DefaultRouter

from grill.views import UserViewSet

urlpatterns = [
    path('models-rest/', include("grill.urls")),
    path('admin/', admin.site.urls),
    path("grill/", include("grill.urls_class")),
    path("players-api/", views.players_list),
    path("players-api/<int:id>", views.player_detail),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


]

urlpatterns = format_suffix_patterns(urlpatterns)

router = DefaultRouter()
router.register('user', UserViewSet, basename='user')

urlpatterns += router.urls