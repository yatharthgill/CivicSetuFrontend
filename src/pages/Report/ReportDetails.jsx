import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReportById, upvoteReport } from "../../api/reportsApi";

export default function ReportDetails() {
  const { reportId } = useParams();
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [upvoting, setUpvoting] = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError(null)
      try{
        const res = await getReportById(reportId)
        setReport(res.data.data.report)
      }catch(err){
        console.error(err)
        setError(err?.response?.data?.message || err.message || 'Failed to load report')
      }finally{ setLoading(false) }
    }
    load()
  }, [reportId])

  const handleUpvote = async () => {
    setUpvoting(true)
    try{
      await upvoteReport(reportId)
      const res = await getReportById(reportId)
      setReport(res.data.data.report)
    }catch(err){
      console.error(err)
    }finally{ setUpvoting(false) }
  }

  if (loading) return <p className="p-5">Loading...</p>
  if (error) return <div className="p-5 bg-red-100 border border-red-400 text-red-700">{error}</div>

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-gray-800">{report.title}</h1>
        <p className="mt-2 text-gray-700">{report.description}</p>

        <p className="mt-4 text-gray-700">Severity: <span className="font-medium">{report.severity}</span></p>

        <button
          className="bg-orange-600 text-white px-4 py-2 mt-3 rounded"
          onClick={handleUpvote}
          disabled={upvoting}
        >
          {upvoting ? '...' : `Upvote (${report.upvotes || 0})`}
        </button>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {report.media?.map((m) => (
            <img src={m.url} key={m.url} alt="media" className="rounded w-full object-cover" />
          ))}
        </div>
      </div>
    </div>
  );
}
