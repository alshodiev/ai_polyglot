from django.urls import path
from .views import LessonListView, ProcessAudioView


urlpatterns = [
    path('lessons/', LessonListView.as_view(), name='lesson-list'),
    path('lessons/<int:pk>/', LessonListView.as_view(), name = 'lesson-detail'),
    path('process-audio/', ProcessAudioView.as_view(), name='process_audio'),

]
