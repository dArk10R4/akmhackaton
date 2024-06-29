import axiosInstance from "./axiosInstance";

async function getReports() {
  return axiosInstance.get(`/report`);
}

async function getReportById(reportId) {
  return axiosInstance.get(`/report/${reportId}`);
}

async function deleteReport(reportId) {
  return axiosInstance.delete(`/report/${reportId}`);
}

async function updateReportStatus(reportId, status) {
  return axiosInstance.patch(`/report/${reportId}`, { status });
}

export default {
  getReports,
  getReportById,
  deleteReport,
  updateReportStatus,
};
