import { useEffect, useState } from 'react';
import axios from 'axios';
import './Users.css';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        let mounted = true;

        const fetchUsers = async () => {
            const res = await axios.get(`/users?page=${page}`);

            if (mounted) {
                setUsers(res.data.data);
                setLastPage(res.data.meta.last_page);
            }
        }

        fetchUsers()
            .catch(err => console.error(err));
        
        return () => {
            mounted = false;
        }
    }, [page]);
    
    const goPrev = () => {
        setUsers([]);
        setPage(page - 1);
    }
    
    const goNext = () => {
        setUsers([]);
        setPage(page + 1);
    }

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            await axios.delete(`/users/${id}`);

            setUsers(users.filter(user => user.id !== id));
        }
    }
    
    return (
        <main>
            <div className="users">
                <h1>Users</h1>
                <div className="toolbar">
                    <button onClick={() => navigate('/users/create')} className="btn btn-primary">Add</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!users.length && <tr><td colSpan={4} className="text-primary"><h3>Loading users...</h3></td></tr>}
                        {users.map(({id, first_name, last_name, email, role: {name: role_name}}) => (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{first_name} {last_name}</td>
                                <td>{email}</td>
                                <td>{role_name}</td>
                                <td>
                                    <button className="btn">Edit</button>{' '}
                                    <button className="btn btn-danger" onClick={() => deleteUser(id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button className="btn" onClick={goPrev} disabled={page === 1}>Prev</button>
                    <button className="btn" onClick={goNext} disabled={page === lastPage}>Next</button>
                </div>
            </div>
        </main>
    )
}

export default Users;