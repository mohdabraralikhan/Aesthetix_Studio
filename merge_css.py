
import os

try:
    with open('fonts.css', 'r', encoding='utf-8') as f:
        fonts_content = f.read()
    
    with open('index.css', 'r', encoding='utf-8') as f:
        index_content = f.read()
        
    with open('index.css', 'w', encoding='utf-8') as f:
        f.write(fonts_content + '\n' + index_content)
        
    print("Successfully merged fonts.css into index.css")
except Exception as e:
    print(f"Error: {e}")
