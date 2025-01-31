import { useState } from 'react';
import '../styles/ComplaintStatus.css';

export default function ComplaintStatus() {
  const [complaintId, setComplaintId] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setComplaint(null);

    try {
      const response = await fetch(`http://localhost:5000/api/complaints/${complaintId}`);
      const data = await response.json();
      
      if (response.ok) {
        setComplaint(data);
      } else {
        setError(data.message || 'Complaint not found');
      }
    } catch (error) {
      setError('Error fetching complaint status');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'approved';
      case 'Rejected': return 'rejected';
      case 'Resolved': return 'resolved';
      default: return 'pending';
    }
  };

  return (
    <div className="status-container">
      <div className="status-box">
        <h2>Check Complaint Status</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              value={complaintId}
              onChange={(e) => setComplaintId(e.target.value)}
              placeholder="Enter Complaint ID"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Checking...' : 'Check Status'}
            </button>
          </div>
        </form>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {complaint && (
          <div className="status-details">
            <h3>Complaint Details</h3>
            <div className="detail-item">
              <span>Complaint ID:</span>
              <span>{complaint.complaintId}</span>
            </div>
            <div className="detail-item">
              <span>Status:</span>
              <span className={`status-badge ${getStatusColor(complaint.status)}`}>
                {complaint.status}
              </span>
            </div>
            <div className="detail-item">
              <span>Details:</span>
              <span>{complaint.complaintDetail}</span>
            </div>
            <div className="detail-item">
              <span>Submitted Date:</span>
              <span>{new Date(complaint.submittedDate).toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
