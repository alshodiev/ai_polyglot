from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .models import Lesson
from .serializers import LessonSerializer
import torch
from transformers import Wav2Vec2Processor, Wav2Vec2ForCTC, pipeline
from transformers import GPTNeoForCausalLM, GPT2Tokenizer
from pydub import AudioSegment
from pydub.utils import which
AudioSegment.converter = which("ffmpeg")
AudioSegment.ffprobe = which("ffprobe")

import soundfile as sf
import os
import logging
logger = logging.getLogger(__name__)

# Load Hugging Face models
stt_model_name = "facebook/wav2vec2-base-960h"
processor = Wav2Vec2Processor.from_pretrained(stt_model_name)
stt_model = Wav2Vec2ForCTC.from_pretrained(stt_model_name)
feedback_model_name = "EleutherAI/gpt-neo-1.3B"
feedback_pipeline = pipeline("text-generation", model=feedback_model_name)


class LessonListView(APIView):
    permission_classes = [AllowAny]

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

# Convert to 16kHz mono .wav
def convert_to_wav(input_path, output_path):
    try:
        audio = AudioSegment.from_file(input_path)
        audio = audio.set_frame_rate(16000).set_channels(1)
        audio.export(output_path, format="wav")
        logger.info(f"Audio converted to {output_path}")
    except Exception as e:
        logger.error(f"Error converting audio: {str(e)}")
        raise RuntimeError(f"Audio conversion failed: {str(e)}")

class ProcessAudioView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        logger.info("Received a request to /process-audio/")
        
        if "file" not in request.FILES:
            logger.error("No audio file provided in the request.")
            return Response({"error": "Audio file not provided."}, status=status.HTTP_400_BAD_REQUEST)
        
        audio_file = request.FILES["file"]
        if not audio_file.name.endswith(".wav"):
            logger.error("Invalid file format.")
            return Response({"error": "Only .wav files are supported."}, status=status.HTTP_400_BAD_REQUEST)

        # Save the audio file locally
        # audio_path = f"temp_{audio_file.name}"
        
        desktop_path = os.path.join(os.path.expanduser("~"), "Desktop")
        audio_path = os.path.join(desktop_path, audio_file.name)
        converted_path = f"converted_{audio_file.name}"
        try:
            with open(audio_path, "wb") as f:
                f.write(audio_file.read())
            logger.info(f"File saved at: {os.path.abspath(audio_path)}")

            # Convert to 16kHz mono .wav
            convert_to_wav(audio_path, converted_path)

            # Load the audio for processing
            audio_input, sample_rate = sf.read(converted_path)
            logger.info(f"Audio sample rate: {sample_rate}, Length: {len(audio_input)}")
            
            # Perform STT processing
            inputs = processor(audio_input, sampling_rate=16000, return_tensors="pt", padding=True)
            with torch.no_grad():
                logits = stt_model(inputs.input_values).logits
            predicted_ids = torch.argmax(logits, dim=-1)
            transcription = processor.batch_decode(predicted_ids)[0]
            logger.info(f"Transcription completed: {transcription}")

            # Generate feedback using GPT
            feedback_prompt = f"Analyze this text for vocabulary, grammar, and pronunciation improvements:\n\n{transcription}\n\nProvide feedback in this format:\n- Vocabulary:\n- Grammar:\n- Pronunciation:"
            feedback = feedback_pipeline(feedback_prompt, max_length=150, num_return_sequences=1)[0]["generated_text"]
            logger.info("Feedback generated successfully.")

            return Response({"transcription": transcription, "feedback": feedback})

        except Exception as e:
            logger.error(f"Error during processing: {str(e)}")
            return Response({"error": f"Error during processing: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        finally:
            # Clean up temporary files
            for path in [audio_path, converted_path]:
                if os.path.exists(path):
                    os.remove(path)
                    logger.info(f"Temporary file {path} deleted.")
