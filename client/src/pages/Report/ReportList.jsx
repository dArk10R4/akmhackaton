import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import reportService from "../../services/reportService";

function ReportList() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    reportService.getReports().then((response) => {
      setReports(response.data.reports);
    });
  }, []);
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="my-10 box-border">
      <h1>My Reports</h1>
      <section id="reports-list ">
        {/* <div class="report-controls">
          <div class="summary">
            <h2>Reports Summary</h2>
            <p>
              Total Reports: <span id="total-reports"></span>
            </p>
            <p>
              Owned Reports: <span id="owned-reports"></span>
            </p>
          </div>
        </div> */}
        <div id="reports-container box-border  overflow-hidden ">
          {reports.map((report, index) => {
            return (
              <Link to={`/reports/${report._id}`} key={index}>
                <div
                  className="report text-black shadow rounded-lg box-border hover:shadow-lg transition duration-300 cursor-pointer  p-10 flex gap-5 my-5 items-center bg-white"
                  key={index}
                >
                  <div className="report-icon w-20 h-20 bg-cover bg-center bg-[url(https://cdn-icons-png.flaticon.com/512/3093/3093748.png)]"></div>
                  <div className="report-info text-left">
                    <h3 className="text-2xl mb-5">
                      {" "}
                      <b>REPORT ID: </b> {report._id}
                    </h3>
                    <p className="text-lg mb-3">
                      <b>Type: </b>
                      {report.incidentType}
                    </p>
                    <p className="text-lg mb-3">
                      <b>Type: </b>
                      {formatDate(report.reportDate)}
                    </p>

                    <p className="text-lg mb-3">
                      <b>Status: </b> {report.status}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default ReportList;
