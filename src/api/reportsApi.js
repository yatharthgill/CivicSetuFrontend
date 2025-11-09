import axiosClient from './axiosClient'

export const createReport = (formData) =>
  axiosClient.post('/api/reports/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const getMyReports = (params = {}) =>
  axiosClient.get('/api/reports/my-reports', { params })

export const getNearbyReports = (params = {}) =>
  axiosClient.get('/api/reports/nearby', { params })

export const getReportById = (reportId) =>
  axiosClient.get(`/api/reports/${reportId}`)

export const upvoteReport = (reportId) =>
  axiosClient.patch(`/api/reports/${reportId}/upvote`)

export default {
  createReport,
  getMyReports,
  getNearbyReports,
  getReportById,
  upvoteReport,
}
