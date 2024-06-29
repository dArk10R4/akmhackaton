
const Report = require('../Models/ReportModel'); // Adjust the path as needed

async function isUsersImage(req, res, next) {
  const imageName = req.params.imageName || req.body.imageName;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const report = await Report.findOne({ images: imageName });

    if (!report) {
      return res.status(404).json({ message: "Image not found" });
    }

    const userId = report.reportOwner.toString();

    if (req.user.type === "admin" || req.user.id === userId) {
      return next();
    } else {
      return res.status(403).json({ message: "Access denied. Admins only or owner only." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

async function hasPermissionToReport(req, res, next) {
  const reportId = req.params.reportId || req.body.reportId;

  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const report = await Report.findById(reportId);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    const userId = report.reportOwner.toString();

    if (req.user.type === "admin" || req.user.id === userId) {
      return next();
    } else {
      return res.status(403).json({ message: "Access denied. Admins only or owner only." });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
}

module.exports = { isUsersImage, hasPermissionToReport };
