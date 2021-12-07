from django.urls import path
from . import views

app_name = 'smalltext'
urlpatterns = [
    path('', views.home_view, name='home'),
    path('input/', views.abstract_input, name='input'),
    path('topics/', views.save_topics, name='topics'),
    path('pdfinput/', views.pdf_input, name='pdfinput'),
]