import os
from PIL import Image

image_dir = "public/images"
extensions = ['.png', '.jpg', '.jpeg']

print(f"Checking {image_dir}...")

for filename in os.listdir(image_dir):
    name, ext = os.path.splitext(filename)
    if ext.lower() in extensions:
        input_path = os.path.join(image_dir, filename)
        output_path = os.path.join(image_dir, name + ".webp")
        
        try:
            with Image.open(input_path) as img:
                img.save(output_path, "WEBP", quality=80)
                
            old_size = os.path.getsize(input_path)
            new_size = os.path.getsize(output_path)
            print(f"Converted {filename}: {old_size/1024:.1f}KB -> {new_size/1024:.1f}KB ({100 - (new_size/old_size*100):.1f}% reduction)")
        except Exception as e:
            print(f"Error converting {filename}: {e}")
