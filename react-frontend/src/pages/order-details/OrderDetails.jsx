import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './OrderDetails.css';

const OrderDetails = () => {
    const params = useParams();
    const id = params.id;

    const navigate = useNavigate();

    const [order, setOrder] = useState({});
    const [orderItems, setOrderitems] = useState([]);

    useEffect(() => {
        let mounted = true;

        const fetchOrderData = async () => {
            const res = await axios.get(`/orders/${id}`);
            const order = res.data.data;

            if (mounted) {
                setOrder({
                    first_name: order.first_name,
                    last_name: order.last_name,
                    email: order.email,
                    total: order.total,
                });
                setOrderitems(order.order_items);
            }
        }

        fetchOrderData()
            .catch(err => console.error(err));

        return () => mounted = false;
    }, [id]);

    const {first_name, last_name, email, total} = order;

    return (
        <main>
            <div className="order-details">
                <h1>Order #{id}</h1>
                <div className="row">
                    <span className="label">Name:</span>
                    <span className="value">{first_name} {last_name}</span>
                </div>
                <div className="row">
                    <span className="label">Email:</span>
                    <span className="value">{email}</span>
                </div>
                <div className="row">
                    <span className="label">Total:</span>
                    <span className="value">${total !== undefined ? total.toFixed(2) : ''}</span>
                </div>
            </div>
            <div className="order-items">
                <table>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems.length === 0 && <tr><td colSpan={3}>No items found.</td></tr>}
                        {orderItems.map(({id, product_name, price, quantity}) => (
                            <tr key={id}>
                                <td>{product_name}</td>
                                <td>${price.toFixed(2)}</td>
                                <td>{quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="buttons">
                <button className="btn btn-primary" onClick={() => navigate('/orders')}>Back</button>
            </div>           
        </main>
    )
}

export default OrderDetails;
