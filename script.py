import os
import json
import requests
import asyncio


async def translate(text_to_be_translated, python_flask_server_port_number):
    try:
        response = await requests.post(
            f"http://localhost:{python_flask_server_port_number}/",
            json={
                "content": input_text_filter(text_to_be_translated),
                "message": "translate sentences",
            },
        )
        translation_text = response.json()
        translated_text = translation_filter(translation_text)

        return translated_text
    except Exception as error:
        print(f"Error during translation: {error}")
        return None


async def process_and_replace_messages_with_translation(
    json_file_path, python_flask_server_ports
):
    try:
        with open(json_file_path, "r", encoding="utf-8") as file:
            json_data = json.load(file)

        for i, entry in enumerate(json_data):
            if "message" in entry:
                server_index = i % len(python_flask_server_ports)
                server_port = python_flask_server_ports[server_index]
                translation_response = await translate(entry["message"], server_port)
                entry["message"] = translation_response

        with open(json_file_path, "w", encoding="utf-8") as file:
            json.dump(json_data, file, indent=2, ensure_ascii=False)

        print(
            f"Processing complete for {json_file_path}. "
            f"Updated JSON data with translations written to the file."
        )
    except Exception as error:
        print(
            f"Error processing and replacing messages with translations for {json_file_path}: {error}"
        )


async def translate_json_files_in_directory(directory_path, python_flask_server_ports):
    try:
        for file in os.listdir(directory_path):
            if file.endswith(".json"):
                file_path = os.path.join(directory_path, file)
                await process_and_replace_messages_with_translation(
                    file_path, python_flask_server_ports
                )
                print(f"{file} done")

        print("All files in the directory processed.")
    except Exception as error:
        print(f"Error processing JSON files in the directory: {error}")


def input_text_filter(text):
    return text


def translation_filter(translation_text):
    result = translation_text

    result = result.replace("\n", "<br>")
    result = result.replace("{", "")
    result = result.replace("�", "")
    result = result.rstrip("カ")
    result = result.rstrip("987")
    result = result.lstrip(":")

    return result


directory_path = (
    r" "  # Replace with your directory path
)
python_flask_server_ports = [ ]  # Replace with your Flask Port(s)


async def main():
    await translate_json_files_in_directory(directory_path, python_flask_server_ports)


asyncio.run(main())
