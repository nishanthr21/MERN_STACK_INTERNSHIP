import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthForm.css"; 

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/admin/dashboard'); // We'll create this route for the admin dashboard
      } else {
        setError('Invalid admin credentials');
      }
    } catch (error) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Warden Login</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email" 
            required 
          />
          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password" 
            required 
          />
          <button type="submit">Login as Warden</button>
        </form>
      </div>
    </div>
  );
}
