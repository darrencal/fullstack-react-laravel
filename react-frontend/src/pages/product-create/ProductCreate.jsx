import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import'./ProductCreate.css';

const ProductCreate = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({});

    const {name, description, price} = formData;

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post('products', {
            name: name,
            description: description,
            price: parseFloat(price),
        });

        navigate('/products');
    }

    return (
        <main>
            <form className="card product-create-form" onSubmit={handleSubmit}>
                <h1 className="form-title">Create Product</h1>

                <label htmlFor="name" className="form-label">Name</label>
                <input 
                    type="text" 
                    name="name" 
                    className="form-input" 
                    onChange={handleChange}
                />
                
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    name="description" 
                    className="form-input" 
                    onChange={handleChange}
                >
                </textarea>

                <label htmlFor="image" className="form-label">Image</label>
                <input type="file" name="image" className="form-input" />

                <label htmlFor="price" className="form-label">Price</label>
                <input 
                    type="number" 
                    name="price" 
                    className="form-input" 
                    onChange={handleChange}
                />

                <div className="buttons">
                    <input type="submit" value="Create" className="btn btn-primary" />{' '}
                    <button onClick={() => navigate('/products')} className="btn">Cancel</button>
                </div>
            </form>
        </main>
    )
}

export default ProductCreate;
