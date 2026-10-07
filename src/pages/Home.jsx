import { useState, useEffect } from 'react'
import ApplicationForm from '../components/ApplicationForm.jsx'
import ApplicationList from '../components/ApplicationList.jsx'

// Durumlar ve her birinin Bootstrap rengi
const statusColors = {
    Applied: 'primary',
    Interview: 'warning',
    Accepted: 'success',
    Rejected: 'danger',
}
// Her durumun ikonu
const statusIcons = {
    Applied: 'bi-send',
    Interview: 'bi-people',
    Accepted: 'bi-check-circle',
    Rejected: 'bi-x-circle',
}

function Home() {
    // Başvuru listesi: ilk açılışta LocalStorage'dan okunur
    const [applications, setApplications] = useState(() => {
        const saved = localStorage.getItem('applications')
        return saved ? JSON.parse(saved) : []
    })

    // Form görünür mü?
    const [showForm, setShowForm] = useState(false)

    // Düzenlenen başvuru (null ise yeni başvuru ekleniyor demektir)
    const [editingApplication, setEditingApplication] = useState(null)

    // Arama ve filtre değerleri
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')
    const [sortOrder, setSortOrder] = useState('newest')

    // applications her değiştiğinde LocalStorage'a kaydet
    useEffect(() => {
        localStorage.setItem('applications', JSON.stringify(applications))
    }, [applications])

    // Arama ve filtreye uyan başvurular
    const filteredApplications = applications.filter((app) => {
        const search = searchTerm.toLowerCase()

        const matchesSearch =
            app.companyName.toLowerCase().includes(search) ||
            app.position.toLowerCase().includes(search)

        const matchesStatus = statusFilter === 'All' || app.status === statusFilter

        return matchesSearch && matchesStatus
    })

    // Filtrelenmiş listeyi tarihe göre sırala
    const sortedApplications = [...filteredApplications].sort((a, b) => {
        if (sortOrder === 'newest') {
            return b.applicationDate.localeCompare(a.applicationDate)
        }
        return a.applicationDate.localeCompare(b.applicationDate)
    })

    // CREATE: Yeni başvuru ekleme
    function addApplication(newApplication) {
        const applicationWithId = { ...newApplication, id: Date.now() }
        setApplications([...applications, applicationWithId])
        setShowForm(false)
    }

    // UPDATE: Mevcut başvuruyu güncelleme
    function updateApplication(updatedApplication) {
        setApplications(
            applications.map((app) =>
                app.id === updatedApplication.id ? updatedApplication : app
            )
        )
        setEditingApplication(null)
        setShowForm(false)
    }

    // DELETE: Başvuruyu silme
    function deleteApplication(id) {
        if (window.confirm('Are you sure you want to delete this application?')) {
            setApplications(applications.filter((app) => app.id !== id))
        }
    }

    // Edit butonuna basılınca formu dolu şekilde aç
    function startEdit(application) {
        setEditingApplication(application)
        setShowForm(true)
    }

    // "Add New Application" butonuna basılınca boş formu aç
    function handleNewClick() {
        setEditingApplication(null)
        setShowForm(true)
    }

    // Formu kapat
    function cancelForm() {
        setEditingApplication(null)
        setShowForm(false)
    }

    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="mb-0">My Applications</h2>
                    <p className="text-muted mb-0">Track and manage your job applications</p>
                </div>
                <button className="btn btn-primary" onClick={handleNewClick}>
                    <i className="bi bi-plus-lg me-1"></i>
                    Add New Application
                </button>
            </div>

            {/* Durum özet kartları */}
            <div className="row g-3 mb-4">
                {Object.keys(statusColors).map((status) => (
                    <div className="col-6 col-md-3" key={status}>
                        <div className={`card text-center text-bg-${statusColors[status]}`}>
                            <div className="card-body">
                                <h6 className="card-title mb-1">
                                    <i className={`bi ${statusIcons[status]} me-1`}></i>
                                    {status}
                                </h6>
                                <p className="fs-3 fw-bold mb-0">
                                    {applications.filter((app) => app.status === status).length}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showForm && (
                <ApplicationForm
                    key={editingApplication ? editingApplication.id : 'new'}
                    onAdd={addApplication}
                    onUpdate={updateApplication}
                    onCancel={cancelForm}
                    editingApplication={editingApplication}
                />
            )}

            <div className="row g-3 mb-3 align-items-center">
                <div className="col-12 col-lg-5">
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="bi bi-search"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by company or position..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="col-6 col-lg-2">
                    <select
                        className="form-select"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="All">All Statuses</option>
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                <div className="col-6 col-lg-2">
                    <select
                        className="form-select"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>
                </div>

                <div className="col-12 col-lg-3 text-lg-end">
                    <span className="fw-semibold">
                        Total Applications:{' '}
                        <span className="badge text-bg-dark">{applications.length}</span>
                    </span>
                </div>
            </div>

            <ApplicationList
                applications={sortedApplications}
                onEdit={startEdit}
                onDelete={deleteApplication}
            />
        </div>
    )
}

export default Home