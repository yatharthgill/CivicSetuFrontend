import { useEffect, useState } from "react";
import { getMyReports } from "../../api/reportsApi";
import ReportCard from "../../components/ReportCard";

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReports = async () => {
      setLoading(true)
      setError(null)
      try{
        const res = await getMyReports()
        setReports(res.data.data.reports || [])
      }catch(err){
        console.error(err)
        setError(err?.response?.data?.message || err.message || 'Failed to load reports')
      }finally{ setLoading(false) }
    }
    loadReports()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">My Reports</h1>

        {loading && <p>Loading reports...</p>}
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md">{error}</div>}

        {!loading && reports.length === 0 && (
          <p className="text-gray-600">You have no reports yet. Create one to get started.</p>
        )}

        <div className="grid gap-4 mt-4">
          {reports.map((r) => (
            <ReportCard key={r._id} report={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
