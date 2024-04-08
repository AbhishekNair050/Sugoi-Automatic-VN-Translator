# Sugoi-Automatic-VN-Translator

This script automates the translation process for Japanese visual novels using Sugoi Translator, facilitating localization efforts for international audiences. Sugoi Translator is a machine translation service hosted locally using Flask servers.

### Instructions:

1. **Extract Text Using VNTextPatch**:
   - Use [VNTextPatch](https://github.com/arcusmaximus/VNTranslationTools) to extract text from the visual novel and save it in JSON format. Ensure each JSON file contains an array of objects with a "message" property containing the text to be translated.

2. **Start Sugoi Translator Servers**:
   - Run Sugoi Translator servers locally. These servers can be set up on any number of instances, CPU or GPU-based, each listening on a specific port.

3. **Set Directory Path and Ports**:
   - Update `directoryPath` with the directory path containing the JSON files to be translated.
   - Modify `pythonFlaskServerPorts` to include the ports of Sugoi Translator servers.

4. **Run the Script**:
   - Execute the script to process JSON files, translate text using Sugoi Translator, and replace original text with translations.

### Usage Example:

```javascript
const directoryPath = 'C:\\path\\to\\json\\files'; // Update with directory path containing JSON files
const pythonFlaskServerPorts = [14366, 14367, 14368]; // Update with Sugoi Translator ports

(async () => {
  await translateJsonFilesInDirectory(directoryPath, pythonFlaskServerPorts);
})();
```

### Additional Notes:

- **Text Filtering**:
  - Modify input and translation text filtering functions as needed for preprocessing or postprocessing text.

- **Error Handling**:
  - Script handles errors during translation and file processing. Check console output for error messages.

- **Customization**:
  - Customize translation filters and other functions as per specific requirements.

- **Limitation**:
  - The script may have difficulty translating Ruby text. Ruby text is used in Japanese to provide pronunciation guides for difficult characters or foreign words. For example:
  
    ```
    こんにちは、私の名前は太郎（たろう）です。
    ```
    
    Here, "太郎" is the main text, while "たろう" is the Ruby text providing the pronunciation guide. Ruby text may need to be replaced manually after translation.

By following these instructions, the script streamlines the translation process for Japanese visual novels using Sugoi Translator, ensuring accurate localization for international audiences while acknowledging the limitation regarding Ruby text translation.
