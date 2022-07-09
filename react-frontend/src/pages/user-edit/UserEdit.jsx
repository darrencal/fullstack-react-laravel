import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './UserEdit.css';

const UserEdit = () => {
    const params = useParams();
    const id = params.id;
    
    const navigate = useNavigate();

    const [roles, setRoles] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        let mounted = true;

        const fetchUserData = async () => {
            const rolesRes = await axios.get('roles');
            const userRes = await axios.get(`/users/${id}`);
            const user = userRes.data.data;

            if (mounted) {
                setRoles(rolesRes.data.data);
                setUser({
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    role_id: user.role.id,
                });
            }
        }

        fetchUserData()
            .catch(err => console.error(err));

        return () => mounted = false;
    }, [id]);

    const { first_name, last_name, email, password, role_id } = user;

    const handleChange = (e) => setUser({...user, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.put(`/users/${id}`, {
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
            <form className="card user-edit-form" onSubmit={handleSubmit}>
                <h1 className="form-title">Edit User</h1>
                
                <label htmlFor="first_name" className="form-label">First Name</label>
                <input 
                    type="text" 
                    name="first_name" 
                    className="form-input" 
                    value={first_name}
                    onChange={handleChange}
                />
                
                <label htmlFor="last_name" className="form-label">Last Name</label>
                <input 
                    type="text" 
                    name="last_name" 
                    className="form-input"
                    value={last_name} 
                    onChange={handleChange}
                />
                
                <label htmlFor="email" className="form-label">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    className="form-input" 
                    value={email}
                    onChange={handleChange}
                />

                <label htmlFor="password" className="form-label">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    className="form-input" 
                    onChange={handleChange}
                />

                <label htmlFor="role_id" className="form-label">Role</label>
                <select 
                    name="role_id" 
                    className="form-input" 
                    value={role_id}
                    onChange={handleChange}
                >
                    <option>- Select Role -</option>
                    {roles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
                </select>

                <div className="buttons">
                    <input type="submit" value="Save" className="btn btn-primary" />{' '}
                    <button onClick={() => navigate('/users')} className="btn">Cancel</button>
                </div>
            </form>
        </main>
    )
}

export default UserEdit;
