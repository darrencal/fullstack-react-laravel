import { useEffect, useState } from 'react';
import axios from 'axios';
import MainContainer from '../../components/main-container/MainContainer';
import './Users.css';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let mounted = true;

        const fetchUsers = async () => {
            const res = await axios.get('users');

            setUsers(res.data.data)
        }

        fetchUsers()
            .catch(err => console.error(err));
        
        return () => {
            mounted = false;
        }
    }, []);
    
    
    return (
        <MainContainer>
            <div className="users">
                <h1>Users</h1>
                <div className="toolbar">
                    <button className="btn btn-primary">Add</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!users.length && <tr><td colSpan={4} className="text-primary">Loading users...</td></tr>}
                        {users.map(({id, first_name, last_name, email, role: {name: role_name}}) => (
                            <tr key={id}>
                                <td>{first_name} {last_name}</td>
                                <td>{email}</td>
                                <td>{role_name}</td>
                                <td>
                                    <button className="btn">Edit</button>{' '}
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </MainContainer>
    )
}

export default Users;