import { Link } from "react-router-dom";

export default function ReportCard({ report }) {
  return (
    <Link to={`/report/${report._id}`}>
      <div className="p-4 border rounded shadow hover:bg-gray-50">

        <h2 className="text-lg font-semibold">{report.title}</h2>
        <p className="text-gray-600">{report.category}</p>

        <p className="mt-1 text-sm">Severity: {report.severity}</p>

        <p className="text-sm text-gray-400">
          Upvotes: {report.upvotes}
        </p>

      </div>
    </Link>
  );
}
