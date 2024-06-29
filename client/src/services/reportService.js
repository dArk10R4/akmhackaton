import axiosInstance from "./axiosInstance";

async function getReports() {
  return axiosInstance.get(`/report`);
}

export default {
  getReports,
};
