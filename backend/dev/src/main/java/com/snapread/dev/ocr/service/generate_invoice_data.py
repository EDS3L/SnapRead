import sys
import json
import google.generativeai as genai
from PIL import Image
import fitz
import os

def extract_data_from_image(image_path, model, prompt_path):
    try:
        img = Image.open(image_path)
    except Exception as e:
        print(f"Błąd otwierania obrazu: {e}", file=sys.stderr)
        sys.exit(1)

    try:
        with open(prompt_path, "r", encoding="utf-8") as prompt_file:
            prompt = prompt_file.read()
    except Exception as e:
        print(f"Błąd odczytu pliku z promptem: {e}", file=sys.stderr)
        sys.exit(1)

    response = model.generate_content([img, prompt])
    return response.text

def process_pdf(pdf_path, model, prompt_path):
    doc = fitz.open(pdf_path)
    extracted_data = []

    for page_number in range(len(doc)):
        page = doc[page_number]
        image_path = f"page_{page_number + 1}.png"
        pix = page.get_pixmap()
        pix.save(image_path)

        try:
            response = extract_data_from_image(image_path, model, prompt_path)
            print(f"Debug - Odpowiedź modelu dla strony {page_number + 1}:\n{response}")
            json_response = json.loads(response)
            extracted_data.append(json_response)
        except json.JSONDecodeError:
            print(f"Błąd parsowania JSON na stronie {page_number + 1}: Odpowiedź modelu:\n{response}", file=sys.stderr)
            extracted_data.append({"error": f"Nie można sparsować JSON na stronie {page_number + 1}"})
        except Exception as e:
            print(f"Błąd przetwarzania strony {page_number + 1}: {e}", file=sys.stderr)
            extracted_data.append({"error": f"Błąd przetwarzania strony {page_number + 1}"})

        os.remove(image_path)

    return extracted_data

def main(file_path, prompt_path):
    ***REMOVED***
    model = genai.GenerativeModel(model_name="gemini-1.5-flash")

    try:
        with fitz.open(file_path) as _:
            pass
        results = process_pdf(file_path, model, prompt_path)
    except:
        response = extract_data_from_image(file_path, model, prompt_path)
        results = [json.loads(response)]

    print(json.dumps(results, indent=4, ensure_ascii=False))

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("", file=sys.stderr)
        sys.exit(1)

    file_path = sys.argv[1]
    prompt_path = sys.argv[2]
    main(file_path, prompt_path)
