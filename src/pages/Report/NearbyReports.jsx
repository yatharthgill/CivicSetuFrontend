import { useState } from "react";
import { getNearbyReports } from "../../api/reportsApi";
import ReportCard from "../../components/ReportCard";

export default function NearbyReports() {
  const [reports, setReports] = useState([]);
  const [coords, setCoords] = useState({ lat: "", lng: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNearby = async () => {
    setLoading(true)
    setError(null)
    try{
      const res = await getNearbyReports({ lat: coords.lat, lng: coords.lng, radius: 3000, limit: 20 })
      setReports(res.data.data.reports || [])
    }catch(err){
      console.error(err)
      setError(err?.response?.data?.message || err.message || 'Failed to load nearby reports')
    }finally{ setLoading(false) }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Nearby Reports</h1>

        <div className="flex gap-3">
          <input
            className="border p-3 rounded w-1/3"
            placeholder="Lat"
            value={coords.lat}
            onChange={(e) => setCoords({ ...coords, lat: e.target.value })}
          />
          <input
            className="border p-3 rounded w-1/3"
            placeholder="Lng"
            value={coords.lng}
            onChange={(e) => setCoords({ ...coords, lng: e.target.value })}
          />

          <button
            onClick={fetchNearby}
            className="bg-orange-600 text-white px-4 py-2 rounded"
            disabled={!coords.lat || !coords.lng || loading}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mt-4">{error}</div>}

        <div className="grid gap-4 mt-5">
          {reports.map((r) => (
            <ReportCard key={r._id} report={r} />
          ))}
        </div>
      </div>
    </div>
  );
}
