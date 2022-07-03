import { useState, useEffect, useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import './Register.css';

const Register = () => {
  const { token, error, register } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
  });

  const { first_name, last_name, email, password, password_confirm } = formData;

  useEffect(() => {
    if (token) navigate('/');
  }, [token]);

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = async (e) => {
    e.preventDefault();

    await register({
      first_name,
      last_name,
      email,
      password,
      password_confirm
    });

    if (!error) navigate('/login');
  }

  if (token) return <Navigate replace to='/' />;

  return (
    <div className="auth-page">
      <form className="form" onSubmit={handleSubmit}>
        <h1 className="form-title">Register</h1>

        {error && <p className='form-error'>{error}</p>}
        
        <label htmlFor="first_name" className="form-label">First Name</label>
        <input 
          type="text" 
          name="first_name" 
          className="form-input" 
          onChange={handleChange}
        />
        
        <label htmlFor="last_name" className="form-label">Last Name</label>
        <input 
          type="text" 
          name="last_name" 
          className="form-input" 
          onChange={handleChange}
        />
        
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

        <label htmlFor="password_confirm" className="form-label">Confirm Password</label>
        <input 
          type="password" 
          name="password_confirm" 
          className="form-input" 
          onChange={handleChange}
        />
        
        <input type="submit" value="Register" className="btn btn-primary" />

        <p>Already have an account? <Link to={'/login'}>Sign in</Link></p>
      </form>
    </div>
  )
}

export default Register;
