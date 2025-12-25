import requests
import re
import os

# Configuration
FONTS_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Space+Grotesk:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@300;400;500&display=swap"
USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
OUTPUT_DIR = "public/fonts"
CSS_OUTPUT_FILE = "fonts.css"

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

print(f"Fetching CSS from {FONTS_URL}...")
headers = {"User-Agent": USER_AGENT}
response = requests.get(FONTS_URL, headers=headers)
response.raise_for_status()

css_content = response.text
print("CSS fetched. Parsing...")

# Regex to find src: url(...)
# We also want to capture font-family and font-weight to name files meaningfully
# This simple regex extracts the URL. A more robust parser would be better but this suffices for Google Fonts structure.
# Google Fonts returns @font-face blocks. We will iterate through them.

font_face_blocks = re.split(r'}\s*', css_content)

local_css = "/* Local Fonts */\n"

for block in font_face_blocks:
    if "@font-face" not in block:
        continue
    
    # Extract details
    family_match = re.search(r"font-family:\s*'([^']+)'", block)
    weight_match = re.search(r"font-weight:\s*(\d+)", block)
    style_match = re.search(r"font-style:\s*(\w+)", block)
    url_match = re.search(r"src:\s*url\(([^)]+)\)", block)
    
    if family_match and url_match:
        family = family_match.group(1)
        weight = weight_match.group(1) if weight_match else "400"
        style = style_match.group(1) if style_match else "normal"
        url = url_match.group(1)
        
        # Clean family name
        clean_family = family.replace(" ", "")
        filename = f"{clean_family}-{weight}-{style}.woff2"
        filepath = os.path.join(OUTPUT_DIR, filename)
        
        # Download font
        if not os.path.exists(filepath):
            print(f"Downloading {filename}...")
            font_data = requests.get(url).content
            with open(filepath, "wb") as f:
                f.write(font_data)
        else:
            print(f"Skipping {filename} (exists)")
            
        # Generate local CSS
        # Replace the remote URL with the local path
        local_block = block.replace(url, f"/fonts/{filename}") + "}"
        local_css += local_block + "\n"

# Check if we got content
if len(local_css) > 20:
    with open(CSS_OUTPUT_FILE, "w") as f:
        f.write(local_css)
    print(f"Generated {CSS_OUTPUT_FILE}")
else:
    print("Failed to generate CSS content.")
