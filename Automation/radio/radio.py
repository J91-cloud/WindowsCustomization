import pygame
import requests
import io

# Radio Stream URL
radio_url = "https://radio-dai.rogersdigitalmedia.com/hls/chi/rogers/tor590.stream/48k/ga5TgFVL3v6-174345824-9984.aac"

# Initialize Pygame mixer for audio
pygame.mixer.init(frequency=44100, size=-16, channels=2)

# Function to stream and play the audio
def play_radio_stream(url):
    try:
        # Fetch the stream using requests
        response = requests.get(url, stream=True)
        if response.status_code == 200:
            print("Streaming started...")
            # Use a buffer to pass the audio data to pygame
            audio_buffer = io.BytesIO(response.content)

            # Play audio
            pygame.mixer.music.load(audio_buffer)
            pygame.mixer.music.play()
            while pygame.mixer.music.get_busy():  # Keep the program running while the audio is playing
                pygame.time.Clock().tick(10)
        else:
            print(f"Error: Unable to access stream (HTTP {response.status_code})")
    except Exception as e:
        print(f"An error occurred: {e}")

# Start playing the radio stream
play_radio_stream(radio_url)
