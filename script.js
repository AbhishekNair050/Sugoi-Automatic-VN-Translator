const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

async function translateJsonFilesInDirectory(directoryPath, pythonFlaskServerPorts) {
  try {
    const files = await fs.readdir(directoryPath);

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(directoryPath, file);
        await processAndReplaceMessagesWithTranslation(filePath, pythonFlaskServerPorts);
        console.log(`${file} done`);
      }
    }

    console.log('All files in the directory processed.');
  } catch (error) {
    console.error('Error processing JSON files in the directory:', error);
  }
}

async function processAndReplaceMessagesWithTranslation(jsonFilePath, pythonFlaskServerPorts) {
  try {
    const fileContent = await fs.readFile(jsonFilePath, 'utf8');
    const jsonData = JSON.parse(fileContent);

    for (let i = 0; i < jsonData.length; i++) {
      const entry = jsonData[i];

      if (entry.hasOwnProperty('message')) {
        const serverIndex = i % pythonFlaskServerPorts.length;
        const serverPort = pythonFlaskServerPorts[serverIndex];
        const translationResponse = await translate(entry.message, serverPort);
        entry.message = translationResponse;
      }
    }
    await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8');

    console.log(`Processing complete for ${jsonFilePath}. Updated JSON data with translations written to the file.`);
  } catch (error) {
    console.error(`Error processing and replacing messages with translations for ${jsonFilePath}:`, error);
  }
}

async function translate(textToBeTranslated, pythonFlaskServerPortNumber) {
  try {
    const response = await axios.post(`http://localhost:${pythonFlaskServerPortNumber}/`, {
      content: inputTextFilter(textToBeTranslated),
      message: "translate sentences"
    });

    const translationText = response.data;
    const translatedText = translationFilter(translationText);

    return translatedText;
  } catch (error) {
    console.error('Error during translation:', error);
    return null;
  }
}

const directoryPath = 'C:\\Users\\ABHISHEK\\Downloads\\VNTextPatch\\temp'; // Replace with your directory path
const pythonFlaskServerPorts = [14366, 14367, 14368]; // Replace with your ports 

(async () => {
  await translateJsonFilesInDirectory(directoryPath, pythonFlaskServerPorts);
})();

function inputTextFilter(text) {
  return text;
}

function translationFilter(translationText) {
  let result = translationText;

  result = result.replace(/\n/g, "<br>");
  result = result.replace(/{/g, "");
  result = result.replace("�", "");
  result = result.replace(/カ$/, "");
  result = result.replace(/987$/, "?");
  result = result.replace(/^:/, "");

  return result;
}
