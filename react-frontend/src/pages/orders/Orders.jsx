import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../../components/pagination/Pagination';

const Orders = () => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        let mounted = true;

        const fetchOrders = async () => {
            const res = await axios.get(`/orders?page=${currentPage}`);

            if (mounted) {
                setOrders(res.data.data);
                setLastPage(res.data.meta.last_page);
            }
        }

        fetchOrders()
            .catch(err => console.error(err));

        return () => mounted = false;
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setOrders([]);
        setCurrentPage(newPage);
    }

    const handleExport = async () => {
        const res = await axios.get('orders/export', {
            responseType: 'blob',
        });
        const fileUrl = window.URL.createObjectURL(res.data);
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = 'LaRe_orders.csv';
        link.click();
    }
    
    return (
        <main>
            <div className="orders">
                <h1 className="page-title">Orders</h1>
                <div className="toolbar">
                    <button onClick={handleExport} className="btn btn-primary">Export</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!orders.length && <tr><td colSpan={4} className="text-primary"><h3>Loading orders...</h3></td></tr>}
                        {orders.map(({id, first_name, last_name, email, total}) => (
                            <tr key={id}>
                                <td>{id}</td>
                                <td>{first_name} {last_name}</td>
                                <td>{email}</td>
                                <td>{total}</td>
                                <td>
                                    <button className="btn" onClick={() => navigate(`/orders/${id}`)}>View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination currentPage={currentPage} lastPage={lastPage} handlePageChange={handlePageChange} />
            </div>
        </main>
    )
}

export default Orders;
