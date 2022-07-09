import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RoleCreate.css';

const RoleCreate = () => {
    const navigate = useNavigate();

    const [permissions, setPermissions] = useState([]);
    const [roleName, setRoleName] = useState('');
    const [rolePermissions, setRolePermissions] = useState([]);

    useEffect(() => {
        let mounted = true;

        const fetchPermissions = async () => {
            const res = await axios.get('permissions');

            if (mounted) {
                setPermissions(res.data.data);
            }
        }

        fetchPermissions()
            .catch(err => console.error(err));

        return () => mounted = false;
    }, []);

    const handleCheck = (id) => {
        // Check if the permission id is in the array
        const isChecked = rolePermissions.includes(id);

        if (isChecked) {
            // Remove it from the array
            setRolePermissions(rolePermissions.filter(pId => pId !== id));
        } else {
            // Add it to the array
            setRolePermissions([...rolePermissions, id]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('/roles', {
            name: roleName,
            permissions: rolePermissions,
        });

        navigate('/roles');
    }

    return (
        <main>
            <form className="card role-create-form" onSubmit={handleSubmit}>
                <h1 className="form-title">Create Role</h1>

                <label htmlFor="name" className="form-label">Name</label>
                <input 
                    type="text" 
                    name="name" 
                    className="form-input" 
                    onChange={(e) => setRoleName(e.target.value)}
                />

                <label className="form-label">Permissions</label>
                <div className="permissions">
                    {permissions.map(({id, name}) => (
                        <div key={id} className="form-checkbox">
                            <input 
                                type="checkbox" 
                                id={`permission${id}`} 
                                value={id}
                                onChange={() => handleCheck(id)}
                            />
                            <label htmlFor={`permission${id}`}>{name}</label>
                        </div>
                    ))}
                </div>

                <div className="buttons">
                    <input type="submit" value="Create" className="btn btn-primary" />{' '}
                    <button onClick={() => navigate('/roles')} className="btn">Cancel</button>
                </div>
            </form>
        </main>
    )
}

export default RoleCreate;
