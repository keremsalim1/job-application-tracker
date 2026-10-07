// Duruma göre Bootstrap badge rengini belirler
function getBadgeClass(status) {
    if (status === 'Applied') return 'text-bg-primary'
    if (status === 'Interview') return 'text-bg-warning'
    if (status === 'Accepted') return 'text-bg-success'
    if (status === 'Rejected') return 'text-bg-danger'
    return 'text-bg-secondary'
}

// "2026-10-07" → "Oct 7, 2026"
function formatDate(dateString) {
    const [year, month, day] = dateString.split('-')
    const date = new Date(year, month - 1, day)

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

function ApplicationList({ applications, onEdit, onDelete }) {
    // Hiç başvuru yoksa bilgi mesajı göster
    if (applications.length === 0) {
        return (
            <div className="alert alert-info">
                <i className="bi bi-info-circle me-2"></i>
                No applications found.
            </div>
        )
    }

    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>Company</th>
                        <th>Position</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app) => (
                        <tr key={app.id}>
                            <td>{app.companyName}</td>
                            <td>{app.position}</td>
                            <td>{formatDate(app.applicationDate)}</td>
                            <td>
                                <span className={`badge ${getBadgeClass(app.status)}`}>
                                    {app.status}
                                </span>
                            </td>
                            <td>{app.notes || '-'}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-outline-primary me-2"
                                    onClick={() => onEdit(app)}
                                >
                                    <i className="bi bi-pencil me-1"></i>
                                    Edit
                                </button>
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => onDelete(app.id)}
                                >
                                    <i className="bi bi-trash me-1"></i>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ApplicationList