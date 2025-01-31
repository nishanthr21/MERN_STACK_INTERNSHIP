import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthForm.css";

export default function AuthForm() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
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
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        navigate('/complaint');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="container">
      
      <div className="form-box">
        <h2>{isLogin ? "Login" : "Change Password"}</h2>
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
          {!isLogin && <input type="password" placeholder="Confirm New Password" required />}
          <button type="submit">{isLogin ? "Login" : "Change Password"}</button>
        </form>
        <p>
          {isLogin ? "Forgot your password?" : "Remembered your password?"} 
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Change Password" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
}