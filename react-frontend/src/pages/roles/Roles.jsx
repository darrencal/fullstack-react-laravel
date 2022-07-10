import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Roles.css';

const Roles = () => {
    const navigate = useNavigate();

    const [roles, setRoles] = useState([]);

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

    const deleteRole = async (id) => {
        if (window.confirm('Are you sure you want to delete this role?')) {
            await axios.delete(`/roles/${id}`);

            setRoles(roles.filter(role => role.id !== id));
        }
    }

    return (
        <main>
            <div className="roles">
                <h1 className="page-title">Roles</h1>
                <div className="toolbar">
                    <button onClick={() => navigate('/roles/create')} className="btn btn-primary">Add</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!roles.length && <tr><td colSpan={4} className="text-primary"><h3>Loading roles...</h3></td></tr>}
                        {roles.map(({id, name}) => (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>
                                    <button className="btn" onClick={() => navigate(`/roles/${id}/edit`)}>Edit</button>{' '}
                                    <button className="btn btn-danger" onClick={() => deleteRole(id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </main>
    )
}

export default Roles;
