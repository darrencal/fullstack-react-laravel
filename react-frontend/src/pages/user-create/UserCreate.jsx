import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserCreate.css';

const UserCreate = () => {
    const navigate = useNavigate();

    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({});

    useEffect(() => {
        let mounted = true;

        const fetchRoles = async () => {
            const res = await axios.get('roles');

            if (mounted) {
                setRoles(res.data.data);
            }
        }

        fetchRoles()
            .catch(err => console.error(err));

        return () => mounted = false;
    }, []);

    const { first_name, last_name, email, password, role_id } = formData;

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('/users', {
            first_name,
            last_name,
            email,
            password,
            role_id,
        });

        navigate('/users');
    }

    return (
        <main>
            <form className="card user-create-form" onSubmit={handleSubmit}>
                <h1 className="form-title">Create User</h1>
                
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

                <label htmlFor="password" className="form-label">Role</label>
                <select 
                name="role_id" 
                className="form-input" 
                onChange={handleChange}
                >
                    <option>- Select Role -</option>
                    {roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
                </select>

                <div className="buttons">
                    <input type="submit" value="Create" className="btn btn-primary" />{' '}
                    <button onClick={() => navigate('/users')} className="btn">Cancel</button>
                </div>
            </form>
        </main>    
    )
}

export default UserCreate;
