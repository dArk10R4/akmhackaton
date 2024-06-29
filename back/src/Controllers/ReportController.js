const Report = require("../Models/ReportModel");
const upload = require("../Middlewares/uploadMiddleware");
const path = require("path");
const { validateStatus } = require("../Util/ValidateReport");
const { generateReportWithText } = require("../Util/GenerateReport");
const mongoose = require("mongoose");
const fs = require("fs");

async function createReport(req, res) {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    } else {
      //   const { severity, CVE, description, incidentAssessment, potentialBusinessConsequences, mitigationsAndRemediations, references, conclusion, reportOwner, inputText, aiAnswer } = req.body;

      const images = req.files?.map((file) => file.path);

      if (!req.body.prompt) {
        return res.status(400).json({ message: "Prompt is required" });
      }
      try {
        let parsedData = {};
        if (images.length > 0) {
          const image = {
            inlineData: {
              data: Buffer.from(fs.readFileSync(images[0])).toString("base64"),
              mimeType: "image/png",
            },
          };
          history = [];

          const reports = await Report.find({
            reportOwner: new mongoose.Types.ObjectId(req.user.id),
          });

            for (let i = 0; i < reports.length; i++) {
                history.push({ 
                        "role": "user",
                        "parts": [
                            reports[i].inputText,
                        ]    
                });
                history.push({
                    "role": "model",
                    "parts": [
                        reports[i].aiAnswer,
                        ],
                  });
            }
    

          parsedData = await generateReportWithText([
            req.body.prompt + " and image",
            image,
          ], history);
        } else {
          parsedData = await generateReportWithText(req.body.prompt);
        }

        // Extract data from the provided JSON object
        // console.log(parsedData);
        const newReport = new Report({
          severity: parsedData.severityNumber,
          description: parsedData.Description,
          incidentType: parsedData["Incident Type"],
          riskAnalysis: {
            incidentAssessment: parsedData["Incident Assessment"],
            mitigationsAndRemediations:
              parsedData["Mitigation and Remediation"],
            potentialBusinessConsequences:
              parsedData["Potential Business Consequences"],
          },
          reportOwner: new mongoose.Types.ObjectId(req.user.id), // Replace with actual user ID
          inputText: parsedData.inputText,
          aiAnswer: parsedData.aiAnswer,
          images: images,
        });

        await newReport.save();

        return res.status(201).json({ message: "Report created", newReport });
      } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Invalid data" });
      }

      return res.status(200).json(parsedData);
    }
  });
}

async function getImage(req, res) {
  const { imageName } = req.params;
  res.sendFile(path.join(__dirname, `../uploads/images/${imageName}`));
}

async function getReportById(req, res) {
  const { reportId } = req.params;

  try {
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    return res.status(200).json({ report });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function getReports(req, res) {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    let reports;

    if (req.user.type === "admin") {
      reports = await Report.find();
    } else {
      reports = await Report.find({ reportOwner: req.user.id });
    }

    return res.status(200).json({ reports });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

async function updateReportStatus(req, res) {
  const { reportId } = req.params;
  const { status } = req.body;

  if (!validateStatus(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    report.status = status;
    await report.save();

    return res.status(200).json({ report });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
}

module.exports = {
  createReport,
  getImage,
  getReportById,
  updateReportStatus,
  getReports,
};
