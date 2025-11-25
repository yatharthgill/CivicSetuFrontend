import React from 'react'

export default function Dashboard(){
  // This is a lightweight dashboard shell — extend with charts (recharts) and metrics
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-3 gap-6">
      <div className="col-span-2 bg-white p-6 rounded shadow"> 
        <h3 className="text-lg font-semibold">Overview</h3>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded">Total Reports<br/><strong>1,234</strong></div>
          <div className="p-4 bg-slate-50 rounded">Open<br/><strong>512</strong></div>
          <div className="p-4 bg-slate-50 rounded">Critical<br/><strong>22</strong></div>
        </div>

        <div className="mt-6">
          <h4 className="font-medium">Recent Reports</h4>
          {/* Replace with dynamic list using react-query */}
          <div className="mt-3 space-y-3">
            <div className="p-3 bg-white rounded shadow-sm">Pothole on Elm Street • Upvotes 12</div>
            <div className="p-3 bg-white rounded shadow-sm">Overflowing drain • Upvotes 8</div>
          </div>
        </div>
      </div>

      <aside className="bg-white p-6 rounded shadow">
        <h4 className="font-semibold">Quick Actions</h4>
        <div className="mt-3 flex flex-col gap-2">
          <button className="px-3 py-2 bg-blue-600 text-white rounded">Create Report</button>
          <button className="px-3 py-2 bg-orange-500 text-white rounded">View Nearby</button>
        </div>
      </aside>
    </div>
  )
}
