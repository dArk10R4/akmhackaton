const fs = require("fs-extra");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");
const Tesseract = require("tesseract.js");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

// Configure the Gemini API with your API key
const apiKey = "AIzaSyBQidFWdAfugbQtGhlK2mq6nudj4228EOU";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

// Function to load previous incidents from a JSON file
const loadPreviousIncidents = async () => {
  const filePath = "previous_incidents.json";
  if (await fs.pathExists(filePath)) {
    return fs.readJson(filePath);
  }
  return {};
};

// Function to save incidents to a JSON file
const saveIncidents = async (incidents) => {
  await fs.writeJson("previous_incidents.json", incidents, { spaces: 4 });
};

// Function to check if the incident type has occurred before
const checkPreviousIncidents = (incidentType, incidents) => {
  if (incidentType in incidents) {
    return true;
  } else {
    incidents[incidentType] = 1;
    return false;
  }
};

// Function to enhance security solutions if the incident is repeated
const enhanceSecuritySolutions = (incidentType) => {
  return `Enhanced security solutions for repeated incident type: ${incidentType}. Implement multi-factor authentication, regular security audits, and comprehensive employee training.`;
};

// Function to construct the prompt for the AI model
const constructPrompt = async (inputText, previousIncident) => {
  const disclaimer = `Note: This report is generated for the purpose of cybersecurity threat intelligence and analysis. No harmful content or payloads are intended. The goal is to provide security solutions and methods for protection against cyber threats.\n\n`;

  const prompt = `## Cybersecurity Incident Report\n
  - Incident Type: [AI to fill in based on input text] Provide a detailed analysis of the incident type detected in the system. This section should include at least two sentences explaining the nature of the incident and its immediate implications.

  - Severity: Use NIST NVD for severity scoring (x/10). This section provides a severity score based on the National Institute of Standards and Technology's (NIST) National Vulnerability Database (NVD), reflecting the criticality of the detected incident.

  - Description: [AI to fill in based on input text] Offer a comprehensive description of the incident, detailing its origin, method of infiltration, and the immediate impact on the system. This section should consist of at least five sentences.

  - About Attack: [AI to fill in based on input text] Provide an in-depth exploration of the attack vectors employed in the incident. Discuss the tactics, techniques, and procedures (TTPs) used by the attacker. This section should be at least five sentences long.

  - Risk Analysis: [AI to fill in based on input text] Conduct a thorough risk assessment that evaluates the potential repercussions of the incident. Consider aspects such as data breaches, service disruptions, and regulatory non-compliance. This section should include at least five sentences.

  - Incident Assessment: [AI to fill in based on input text] Assess the scope and magnitude of the incident, gauging its impact on organizational operations and data security measures. This section should consist of at least three sentences.

  - Potential Business Consequences: [AI to fill in based on input text] Analyze the potential business ramifications stemming from the incident. Discuss possible financial losses, reputational damage, and legal liabilities. This section should be detailed and thorough.

  - Mitigation and Remediation: ${
    previousIncident
      ? enhanceSecuritySolutions(previousIncident)
      : "[AI to fill in based on input text]"
  } Provide recommendations for mitigating the incident's impact and preventing future occurrences. Suggestions should include implementing robust cybersecurity measures, conducting regular security audits, and other relevant actions. This section should consist of at least three sentences.

  - Site URL: [AI to fill in based on input text] Provide the relevant URL associated with the incident, offering additional context or reference points for further investigation.

  give output as json format like {
  "Incident Type": "STRING",
  "Severity": "STRING",
  "Description": "STRING",
  "About Attack": "STRING",
  "Risk Analysis": "STRING",
  "Incident Assessment": "STRING",
  "Potential Business Consequences": "STRING",
  "Mitigation and Remediation": "STRING",
  "Site URL": "STRING"
  } i want to put it in a json file
  Input Text: ${inputText}
  `;

  return disclaimer + prompt;
};

// Function to generate a report based on input data
const generateReport = async (inputData) => {
  let inputText = "";
  const chatSession = model.startChat({
    generationConfig,

    history: [],
  });
  const result = await chatSession.sendMessage("test");
  console.log(result.response.text());

  if (typeof inputData === "string" && (await fs.pathExists(inputData))) {
    try {
      inputText = await fs.readFile(inputData, "utf8");
    } catch (err) {
      // If the input is an image, use OCR to extract text
      const {
        data: { text },
      } = await Tesseract.recognize(inputData, "eng");
      inputText = text;
    }
  } else {
    inputText = inputData;
  }

  // Load previous incidents
  //   const incidents = await loadPreviousIncidents();

  // Check if the incident has occurred before (Placeholder: this should be replaced with actual detection logic)
  const incidentType = "Detected Incident Type";
  //   const previousIncident = checkPreviousIncidents(incidentType, incidents);
};

function parseIncidentReport(data, userPrompt) {
  console.log(data);

  let parsedData = data.replace("```json", "").replaceAll("```", "");
  parsedData = JSON.parse(parsedData);
  console.log(parsedData);
  try {
    // console.log(parsedData);
    if (parsedData.Severity) {
      parsedData["severityNumber"] = parseInt(
        parsedData.Severity.split("/")[0].split('(')[1]
      );
    }
  } catch (error) {
    console.log(error);
    parsedData["severityNumber"] = -1;
  }
  parsedData["aiAnswer"] = data;
  parsedData["inputText"] = userPrompt;

  return parsedData;

  // return {
  //   incidentType: extractField(data["Incident Type"]),
  //   severity: extractField(data["Severity"]),
  //   description: extractField(data["Description"]),
  //   aboutAttack: extractField(data["About Attack"]),
  //   riskAnalysis: extractField(data["Risk Analysis"]),
  //   incidentAssessment: extractField(data["Incident Assessment"]),
  //   potentialBusinessConsequences: extractField(data["Potential Business Consequences"]),
  //   mitigationAndRemediation: extractField(data["Mitigation and Remediation"]),
  //   siteURL: extractField(data["Site URL"]),
  //   inputText: "undefined", // Adjust as needed
  //   aiAnswer: "undefined", // Adjust as needed
  // };
}

function extractField(field) {
  // Replace '**' with '**' to make it bold in Markdown format
  return field.replace(/\*\*/g, "**");
}

// generateReport("Test");

async function generateReportWithText(text, history = []) {
  let promt = await constructPrompt(text, "");
  const chatSession = model.startChat({
    generationConfig,

    history: history,
  });

  const result = await chatSession.sendMessage(promt);
  // console.log(result.response.text());

  return parseIncidentReport(result.response.text(), promt);
}

module.exports = { generateReportWithText };
