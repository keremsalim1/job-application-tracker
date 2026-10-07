import { useState } from 'react'

const emptyForm = {
    companyName: '',
    position: '',
    applicationDate: '',
    status: 'Applied',
    notes: '',
}

function ApplicationForm({ onAdd, onUpdate, onCancel, editingApplication }) {
    // Düzenleme modundaysa formu mevcut verilerle, değilse boş başlat
    const [formData, setFormData] = useState(editingApplication || emptyForm)

    // Herhangi bir input değiştiğinde ilgili alanı güncelle
    function handleChange(e) {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    // Form gönderildiğinde
    function handleSubmit(e) {
        e.preventDefault() // Sayfanın yenilenmesini engeller

        if (editingApplication) {
            onUpdate(formData)
        } else {
            onAdd(formData)
        }
    }

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title mb-3">
                    {editingApplication ? 'Edit Application' : 'New Application'}
                </h5>

                <form onSubmit={handleSubmit}>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Company Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Position</label>
                            <input
                                type="text"
                                className="form-control"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Application Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="applicationDate"
                                value={formData.applicationDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Status</label>
                            <select
                                className="form-select"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="Applied">Applied</option>
                                <option value="Interview">Interview</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                            </select>
                        </div>

                        <div className="col-12">
                            <label className="form-label">Notes</label>
                            <textarea
                                className="form-control"
                                name="notes"
                                rows="3"
                                value={formData.notes}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>

                    <div className="mt-3">
                        <button type="submit" className="btn btn-success me-2">
                            <i className="bi bi-check-lg me-1"></i>
                            {editingApplication ? 'Update' : 'Save'}
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>
                            <i className="bi bi-x-lg me-1"></i>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ApplicationForm