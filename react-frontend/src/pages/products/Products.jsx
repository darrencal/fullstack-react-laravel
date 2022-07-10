import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../../components/pagination/Pagination';
import './Products.css';

const Products = () => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        let mounted = true;

        const fetchProducts = async () => {
            const res = await axios.get(`/products?page=${currentPage}`);

            if (mounted) {
                setProducts(res.data.data);
                setLastPage(res.data.meta.last_page);
            }
        }

        fetchProducts()
            .catch(err => console.error(err));
        
        return () => {
            mounted = false;
        }
    }, [currentPage]);

    const handlePageChange = (newPage) => {
        setProducts([]);
        setCurrentPage(newPage);
    }

    const deleteProduct = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            await axios.delete(`/products/${id}`);

            setProducts(products.filter(product => product.id !== id));
        }
    }

    return (
        <main>
            <div className="products">
                <h1 className="page-title">Products</h1>
                <div className="toolbar">
                    <button onClick={() => navigate('/products/create')} className="btn btn-primary">Add</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!products.length && <tr><td colSpan={4} className="text-primary"><h3>Loading products...</h3></td></tr>}
                        {products.map(({id, image_url, name, description, price}) => (
                            <tr key={id}>
                                <td>{id}</td>
                                <td><img src={image_url} className="product-image"/></td>
                                <td>{name}</td>
                                <td className="product-description">{description}</td>
                                <td>{price}</td>
                                <td>
                                    <button className="btn" onClick={() => navigate(`/products/${id}/edit`)}>Edit</button>{' '}
                                    <button className="btn btn-danger" onClick={() => deleteProduct(id)}>Delete</button>
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

export default Products;
