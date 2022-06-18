import { useState, useEffect, useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import './Login.css';

const Login = () => {
  const { token, error, login } = useContext(AuthContext);
  
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    login({
      email,
      password,
    });
  }

  if (token) return <Navigate replace to='/' />;

  return (
    <div className="auth-page">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">Sign in</h1>

        {error && <p className='form-error'>{error}</p>}
        
        <label htmlFor="email" className="form-label">Email</label>
        <input 
          type="email" 
          name="email" 
          className="form-input"
          onChange={handleChange} 
        />

        <label htmlFor="password" className="form-label">Password</label>
        <input 
          type="password" 
          name="password" 
          className="form-input" 
          onChange={handleChange}
        />
        
        <input type="submit" value="Login" className="btn-primary" />

        <p>Dont have an account? <Link to={'/register'}>Register</Link></p>
      </form>
    </div>
  )
}

export default Login;
