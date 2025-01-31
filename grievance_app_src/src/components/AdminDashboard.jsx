import { useState, useEffect } from 'react';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchComplaints = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/complaints');
      const data = await response.json();
      setComplaints(data);
      setError(null);
    } catch (err) {
      setError('Error fetching complaints');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const updateComplaintStatus = async (complaintId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/complaints/${complaintId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (data.success) {
        // Refresh complaints list
        fetchComplaints();
      } else {
        alert('Error updating complaint status');
      }
    } catch (error) {
      alert('Error updating complaint status');
    }
  };

  if (loading) {
    return <div className="admin-container"><h2>Loading complaints...</h2></div>;
  }

  if (error) {
    return <div className="admin-container"><h2>Error: {error}</h2></div>;
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Warden Dashboard</h2>
        <p>Manage Student Complaints</p>
      </div>
      
      <div className="complaints-list">
        <h3>Recent Complaints ({complaints.length})</h3>
        {complaints.length === 0 ? (
          <p>No complaints found.</p>
        ) : (
          complaints.map(complaint => (
            <div key={complaint.complaintId} className="complaint-card">
              <div className="complaint-header">
                <span className="complaint-id">ID: {complaint.complaintId}</span>
                <span className={`status-badge ${complaint.status.toLowerCase()}`}>
                  {complaint.status}
                </span>
              </div>
              <div className="complaint-details">
                <p><strong>Details:</strong> {complaint.complaintDetail}</p>
                <p><strong>Submitted:</strong> {new Date(complaint.submittedDate).toLocaleString()}</p>
              </div>
              <div className="complaint-actions">
                {complaint.status === 'Pending' && (
                  <>
                    <button 
                      className="action-button approve"
                      onClick={() => updateComplaintStatus(complaint.complaintId, 'Approved')}
                    >
                      Approve
                    </button>
                    <button 
                      className="action-button reject"
                      onClick={() => updateComplaintStatus(complaint.complaintId, 'Rejected')}
                    >
                      Reject
                    </button>
                  </>
                )}
                {complaint.status === 'Approved' && (
                  <button 
                    className="action-button resolve"
                    onClick={() => updateComplaintStatus(complaint.complaintId, 'Resolved')}
                  >
                    Mark as Resolved
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
