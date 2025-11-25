import React, { useEffect, useState } from "react";
import { getAllReports, deleteReport } from "../../api/reportsApi";

export default function AdminPanel() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  // Fetch reports without React Query
  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await getAllReports();
        setReports(res.data.data.reports);
      } catch (error) {
        console.error("Failed to load reports", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReports();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteReport(id);
      setReports((prev) => prev.filter((r) => r._id !== id)); // remove instantly
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6">
      {/* Left section */}
      <div className="col-span-3 bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold">Admin — All Reports</h3>

        <div className="mt-4 space-y-3">
          {reports.map((r) => (
            <div
              key={r._id}
              className="p-3 border rounded flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{r.title}</div>
                <div className="text-sm text-gray-500">
                  {r.category} • {r.severity} • Upvotes {r.upvotes}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelected(r)}
                  className="px-3 py-1 bg-amber-500 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(r._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right sidebar */}
      <aside className="bg-white p-6 rounded shadow">
        <h4 className="font-semibold">Selected</h4>

        {selected ? (
          <div className="mt-3 space-y-2">
            <div className="font-medium">{selected.title}</div>
            <div className="text-sm">Status: {selected.status}</div>
            <div className="text-sm">Severity: {selected.severity}</div>

            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1 bg-green-600 text-white rounded">
                Save
              </button>
              <button
                onClick={() => setSelected(null)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-2">
            Select a report to edit
          </p>
        )}
      </aside>
    </div>
  );
}
