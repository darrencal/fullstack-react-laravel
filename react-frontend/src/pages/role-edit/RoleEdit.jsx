import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './RoleEdit.css';

const RoleEdit = () => {
    const params = useParams();
    const id = params.id;

    const navigate = useNavigate();

    const [permissions, setPermissions] = useState([]);
    const [roleName, setRoleName] = useState('');
    const [rolePermissions, setRolePermissions] = useState([]);

    useEffect(() => {
        let mounted = true;

        const fetchRoleData = async () => {
            const permissionsRes = await axios.get('permissions');
            const roleRes = await axios.get(`/roles/${id}`);
            const role = roleRes.data.data;

            if (mounted) {
                setPermissions(permissionsRes.data.data);
                setRoleName(role.name);
                setRolePermissions(role.permissions.map(p => p.id));
            }
        }

        fetchRoleData()
            .catch(err => console.error(err));

        return () => mounted = false;
    }, [id]);

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

        await axios.put(`/roles/${id}`, {
            name: roleName,
            permissions: rolePermissions,
        });

        navigate('/roles');
    }

    return (
        <main>
            <form className="card role-edit-form" onSubmit={handleSubmit}>
                <h1 className="form-title">Edit Role</h1>

                <label htmlFor="name" className="form-label">Name</label>
                <input 
                    type="text" 
                    name="name" 
                    className="form-input" 
                    value={roleName}
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
                                checked={rolePermissions.includes(id)}
                                onChange={() => handleCheck(id)}
                            />
                            <label htmlFor={`permission${id}`}>{name}</label>
                        </div>
                    ))}
                </div>

                <div className="buttons">
                    <input type="submit" value="Save" className="btn btn-primary" />{' '}
                    <button onClick={() => navigate('/roles')} className="btn">Cancel</button>
                </div>
            </form>
        </main>
    )
}

export default RoleEdit;
