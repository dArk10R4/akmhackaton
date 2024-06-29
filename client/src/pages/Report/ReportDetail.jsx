import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Select, Space } from "antd";

import reportService from "../../services/reportService";

function ReportDetail() {
  const navigate = useNavigate();
  const [report, setReport] = useState({
    reportId: "",
    status: "not assigned",
    date: "",
    incidentType: "",
    severity: "",
    description: "",
  });

  const [fetching, setFetching] = useState(false);

  const { reportId } = useParams();
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  function deleteReport() {
    reportService.deleteReport(reportId).then((response) => {
      console.log(response);
      navigate("/reports");
    });
  }

  const handleChange = (value) => {
    setFetching(true);
    console.log(`selected ${value}`);
    reportService.updateReportStatus(reportId, value).then((response) => {
        setReport({ ...report, status: value });
        console.log(response);
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setFetching(false);
        });

  };

  useEffect(() => {
    console.log(reportId);
    reportService
      .getReportById(reportId)
      .then((response) => {
        console.log(response);
        setReport(response.data.report);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="report-page mb-10">
        <div className="flex items-center">
          <div className="line"></div>
          <img
            className="shrink-0 w-12 h-12 mx-2"
            src="data:image/jpeg;base64,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"
            alt="Logo"
          />
          <div className="line"></div>
        </div>
        <div className="report-info">
          <p className="text-4xl mt-10">
            <strong>Report ID:</strong>
          </p>
          <p className="mb-5 mt-4 text-lg"> {report.reportId || "id"}</p>
          <p>
            <strong className="text-4xl mb-4">Date:</strong>
          </p>
          <p className="mb-5 mt-4 text-lg"> {formatDate(report.reportDate)}</p>
          <p>
            <strong className="text-4xl mb-4">Status:</strong>
          </p>
          {/* <p className="mb-5 mt-4 text-lg">{report.status}</p> */}
          <Select className="mb-5 mt-4 text-lg"
            defaultValue={report.status}
            style={{
              width: 120,
            }}
            loading={fetching}
            onChange={handleChange}
            options={[
              {
                value: "not assigned",
                label: "Not assigned",
              },
              {
                value: "assigned",
                label: "Assigned",
              },
              {
                value: "under investigation",
                label: "Under Investigation",
              },
              {
                value: "closed",
                label: "Closed",
              },
            ]}
          />

          <hr className="dotted" />
          <p>
            <strong className="text-4xl mb-4">Incident type:</strong>
          </p>
          <p className="mb-5 mt-4 text-lg">{report.incidentType}</p>
          <p>
            <strong className="text-4xl mb-5">Severity:</strong>
          </p>
          <p className="mb-5 mt-4 text-lg"> {report.severity} </p>
        </div>
        <hr className="dotted" />
        <div className="mb-4">
          <h2 className="text-4xl mb-4 font-bold">Description</h2>
          <p className="mb-5 mt-4 text-lg"> {report.description} </p>
        </div>
        <div className="flex items-center">
          <div className="line"></div>
          <img
            className="shrink-0 w-12 h-12 mx-2"
            src="data:image/jpeg;base64,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"
            alt="Logo"
          />
          <div className="line"></div>
        </div>

        <div className="middle-section">
          <h2 className="text-4xl mb-5 font-bold">Risk analysis</h2>
          <p> </p>
        </div>

        <div className="top-sections">
          <p className="text-2xl mb-3 font-bold">Incident assessment</p>
          <p className="mb-5 mt-3 text-lg">
            {" "}
            {report?.riskAnalysis?.incidentAssessment}{" "}
          </p>
          <p className="text-2xl mb-4 font-bold">
            Potential Business Consequences
          </p>
          <p className="mb-5 mt-3 text-lg">
            {" "}
            {report?.riskAnalysis?.potentialBusinessConsequences}{" "}
          </p>
          <p className="text-2xl mb-3 font-bold">Mitigation and remediation</p>
          <p className="mb-5 mt-3 text-lg">
            {" "}
            {report?.riskAnalysis?.mitigationsAndRemediations}{" "}
          </p>
        </div>

        <div className="flex mt-8 items-center">
          <div className="line"></div>
          <img
            className="shrink-0 w-12 h-12 mx-2"
            src="data:image/jpeg;base64,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"
            alt="Logo"
          />
          <div className="line"></div>
        </div>
        <button onClick={deleteReport} className="mt-8 bg-red-700 px-8 py-4">
          DELETE
        </button>
      </div>
    </div>
  );
}

export default ReportDetail;
