const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    reportId: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    reportDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["not assigned", "assigned", "under investigation", "closed"],
      default: "not assigned",
    },
    severity: {
      type: Number,
      min: -1,
      max: 10,
      required: true,
    },
    incidentType: {
      type: String,
      required: true,
    },
    // CVE: {
    //   type: [String],
    //   required: true,
    // },
    description: {
      type: String,
      required: true,
    },
    riskAnalysis: {
      incidentAssessment: { type: [String], required: true },
      potentialBusinessConsequences: { type: [String], required: true },
      mitigationsAndRemediations: { type: [String], required: true },
      references: { type: [String], required: true },
    },
    // conclusion: {
    //   type: String,
    //   required: true,
    // },
    reportOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    inputText: {
        type: String,
        default: "",
        required: true
    },
    images: {
        type: [String],
    },
    aiAnswer: {
        type: String,
        required: true
    }
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
