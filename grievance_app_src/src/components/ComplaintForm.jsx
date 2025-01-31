import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ComplaintForm.css";

export default function ComplaintForm() {
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState({
    plumbing: false,
    electricity: false,
    other: false,
    details: ""
  });
  const [submittedId, setSubmittedId] = useState(null);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setComplaint((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const generateComplaintId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `COMP${timestamp}${random}`.slice(-12);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const complaintId = generateComplaintId();
    
    // Create complaint detail string
    const types = [];
    if (complaint.plumbing) types.push('Plumbing');
    if (complaint.electricity) types.push('Electricity');
    if (complaint.other) types.push('Other');
    
    const complaintDetail = `Type: ${types.join(', ')}\nDetails: ${complaint.details}`;

    try {
      const response = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          complaintId,
          complaintDetail
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmittedId(complaintId);
      } else {
        alert('Error submitting complaint. Please try again.');
      }
    } catch (error) {
      alert('Error submitting complaint. Please try again.');
    }
  };

  const checkStatus = () => {
    navigate('/status');
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Complaint Management System</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <input type="checkbox" name="plumbing" checked={complaint.plumbing} onChange={handleChange} />
            Plumbing Complaints
          </label>
          <label>
            <input type="checkbox" name="electricity" checked={complaint.electricity} onChange={handleChange} />
            Electricity Complaints
          </label>
          <label>
            <input type="checkbox" name="other" checked={complaint.other} onChange={handleChange} />
            Other Complaints
          </label>
          <textarea
            name="details"
            placeholder="Describe your complaint..."
            value={complaint.details}
            onChange={handleChange}
            required
          ></textarea>
          <div className="button-group">
            <button type="submit">Submit Complaint</button>
            <button type="button" onClick={checkStatus} className="status-button">Check Status</button>
          </div>
        </form>
        
        {submittedId && (
          <div className="submission-success">
            <h3>Complaint Submitted Successfully!</h3>
            <p>Your Complaint ID: <span className="complaint-id">{submittedId}</span></p>
            <p className="save-id-message">Please save this ID to check your complaint status later.</p>
          </div>
        )}
      </div>
    </div>
  );
}
