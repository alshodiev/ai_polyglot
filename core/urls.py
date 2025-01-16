from django.urls import path
from .views import LessonListView

urlpatterns = [
    path('lessons/', LessonListView.as_view(), name='lesson-list'),
    path('lessons/<int:pk>/', LessonListView.as_view(), name = 'lesson-detail'),
]
