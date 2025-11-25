import axiosClient from './axiosClient'

export const createReport = (formData) =>
  // Let the browser/axios set the Content-Type (including boundary)
  // when sending FormData. Setting it manually can break the multipart boundary.
  axiosClient.post('/api/reports/create', formData)

export const getMyReports = (params = {}) =>
  axiosClient.get('/api/reports/my-reports', { params })

export const getNearbyReports = (params = {}) =>
  axiosClient.get('/api/reports/nearby', { params })

export const getReportById = (reportId) =>
  axiosClient.get(`/api/reports/${reportId}`)

export const upvoteReport = (reportId) =>
  axiosClient.patch(`/api/reports/${reportId}/upvote`)

export const getAllReports = (params) => axiosClient.get('/reports', { params }) // for admin
export const updateReport = (id, body) => axiosClient.patch(`/reports/${id}`, body)
export const deleteReport = (id) => axiosClient.delete(`/reports/${id}`)
export default {
  createReport,
  getMyReports,
  getNearbyReports,
  getReportById,
  upvoteReport,
}
