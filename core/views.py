from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Lesson
from .serializers import LessonSerializer

# Create my views here

class LessonListView(APIView):
    def get(self, request):
        try:
            lessons = Lesson.objects.all()
            serializer = LessonSerializer(lessons, many = True)
            return Response(serializer.data)
        except Lesson.DoesNotExist:
            return Response({"error": "Lesson not found"}, status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request):
        serializer = LessonSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)


