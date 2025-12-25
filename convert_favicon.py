from PIL import Image
import os

input_path = "public/images/favicon.jpg"
output_ico = "public/favicon.ico"
output_png = "public/icon.png"

try:
    with Image.open(input_path) as img:
        # Save as ICO (multisize)
        img.save(output_ico, format='ICO', sizes=[(16, 16), (32, 32), (48, 48), (64, 64)])
        print(f"Created {output_ico}")
        
        # Save as PNG (192x192 for PWA/other uses)
        img.resize((192, 192)).save(output_png, format='PNG')
        print(f"Created {output_png}")
        
except Exception as e:
    print(f"Error converting favicon: {e}")
