from PIL import Image
import os

input_path = "public/images/hero.webp"
output_path = "public/images/hero-mobile.webp"

try:
    with Image.open(input_path) as img:
        # Resize to 800px width, maintaining aspect ratio
        width = 800
        ratio = width / img.width
        height = int(img.height * ratio)
        
        img = img.resize((width, height), Image.Resampling.LANCZOS)
        img.save(output_path, "WEBP", quality=80)
        
        print(f"Created {output_path}: {img.width}x{img.height}")
        
except Exception as e:
    print(f"Error converting hero: {e}")
