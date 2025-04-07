#!/usr/bin/env python3
import os
import sys
import argparse
from PIL import Image, ImageEnhance, ImageFilter, ImageOps, ImageFont, ImageDraw
import numpy as np
import PyPDF2
from pdf2image import convert_from_path
import random

# Configure Poppler path (critical for Windows)
poppler_path = r"C:\Users\jessy\Downloads\Release-24.08.0-0\poppler-24.08.0\Library\bin"
os.environ["PATH"] += os.pathsep + poppler_path

def create_classified_look(input_pdf, output_pdf=None):
    """Convert a PDF to a classified document style with dirty paper effect"""
    print(f"Processing PDF: {input_pdf}")
    
    # Convert PDF to images using poppler
    images = convert_from_path(input_pdf, dpi=300, poppler_path=poppler_path)
    
    processed_images = []
    
    for i, img in enumerate(images):
        print(f"Processing page {i+1}/{len(images)}")
        
        # Convert to grayscale
        img = img.convert('L')
        
        # Add paper texture
        texture = create_paper_texture(img.size)
        img = Image.blend(img, texture, 0.3)
        
        # Add noise
        img = add_noise(img, intensity=0.03)
        
        # Add some blur
        img = img.filter(ImageFilter.GaussianBlur(radius=0.5))
        
        # Adjust contrast
        enhancer = ImageEnhance.Contrast(img)
        img = enhancer.enhance(1.2)
        
        # Add classified markings
        img = add_classified_marks(img)
        
        processed_images.append(img)
    
    # Save as PDF
    if not output_pdf:
        base_name = os.path.splitext(input_pdf)[0]
        output_pdf = f"{base_name}_classified.pdf"
    
    print(f"Saving output to: {output_pdf}")
    processed_images[0].save(
        output_pdf, "PDF", resolution=300.0, 
        save_all=True, append_images=processed_images[1:]
    )
    
    return output_pdf

def create_paper_texture(size):
    """Create a dirty paper texture"""
    texture = Image.new('L', size, 255)
    pixels = texture.load()
    
    for i in range(size[0]):
        for j in range(size[1]):
            if random.random() < 0.05:  # Dark spots
                pixels[i, j] = random.randint(200, 230)
            elif random.random() < 0.1:  # Light spots
                pixels[i, j] = random.randint(230, 245)
    
    # Add stains
    draw = ImageDraw.Draw(texture)
    for _ in range(random.randint(3, 10)):
        x, y = random.randint(0, size[0]), random.randint(0, size[1])
        radius = random.randint(10, 50)
        darkness = random.randint(180, 220)
        draw.ellipse([x, y, x+radius, y+radius], fill=darkness)
    
    texture = texture.filter(ImageFilter.GaussianBlur(radius=1.5))
    return texture

def add_noise(img, intensity=0.05):
    """Add random noise to the image"""
    arr = np.array(img)
    noise = np.random.randint(0, 100, arr.shape, dtype='uint8')
    mask = np.random.random(arr.shape) < intensity
    arr[mask] = np.clip(arr[mask] - noise[mask], 0, 255)
    return Image.fromarray(arr)

def add_classified_marks(img):
    """Add classified document markings"""
    draw = ImageDraw.Draw(img)
    width, height = img.size
    
    try:
        font = ImageFont.truetype("Courier.ttf", 20)  # Monospace font
    except:
        font = ImageFont.load_default()  # Fallback
    
    # Add TOP SECRET banners
    banner_height = 30
    draw.rectangle([0, 0, width, banner_height], fill="black")
    draw.rectangle([0, height-banner_height, width, height], fill="black")
    
    # Add classification text
    classified_text = "TOP SECRET//NOFORN"
    text_width = draw.textlength(classified_text, font=font)
    draw.text(
        ((width - text_width)/2, (banner_height - 20)/2), 
        classified_text, 
        fill="white", 
        font=font
    )
    draw.text(
        ((width - text_width)/2, height - banner_height + (banner_height - 20)/2), 
        classified_text, 
        fill="white", 
        font=font
    )
    
    # Add random classification markings
    markings = ["CONFIDENTIAL", "SECRET", "TOP SECRET", "EYES ONLY", "NOFORN"]
    for _ in range(random.randint(5, 15)):
        text = random.choice(markings)
        x = random.randint(0, width)
        y = random.randint(banner_height, height - banner_height)
        size = random.randint(15, 40)
        draw.text((x, y), text, fill=180, font=font.font_variant(size=size))
    
    return img

def main():
    parser = argparse.ArgumentParser(description='Convert PDF to classified document style')
    parser.add_argument('input_pdf', help='Input PDF file path')
    parser.add_argument('-o', '--output', help='Output PDF file path (optional)')
    
    args = parser.parse_args()
    
    if not os.path.exists(args.input_pdf):
        print(f"Error: Input file '{args.input_pdf}' not found!")
        sys.exit(1)
    
    output_file = create_classified_look(args.input_pdf, args.output)
    print(f"Success! Classified document created at: {output_file}")

if __name__ == "__main__":
    print("""
    PDF Classified Document Converter
    ---------------------------------
    Provide a PDF file to convert it to a classified document style.
    Example usage: python classified_converter.py input.pdf -o output.pdf
    """)
    main()