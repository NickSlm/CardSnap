import os
import re
from PIL import Image, ImageOps
import pytesseract
import easyocr

# If Tesseract isn't in your System PATH, uncomment the line below and point to it:
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

image_path = "cardsnap_debug.jpg"

if not os.path.exists(image_path):
    print(f"Error: Could not find {image_path}")
    exit()

# Load image using Pillow
img = Image.open(image_path)


try:
    # Initialize reader (downloads model on first run, 'en' = English)
    reader = easyocr.Reader(['en'], gpu=False) 
    
    # Read text from image
    result = reader.readtext(image_path)
    
    if result:
        # result returns coordinates, text, and confidence score
        for bbox, text, prob in result:
            print(f"EasyOCR Detected: '{text}' (Confidence: {prob:.2f})")
            
            # Clean up text just like your original C# function
            cleaned = re.sub(r'\s+', '', text)
            print(f"Cleaned Text: '{cleaned}'")
    else:
        print("EasyOCR found no text.")
except Exception as e:
    print(f"EasyOCR failed: {e}")