import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ImageUpload from '../../components/image-upload/ImageUpload';
import'./ProductEdit.css';

const ProductEdit = () => {
    const params = useParams();
    const id = params.id;

    const navigate = useNavigate();

    const [formData, setFormData] = useState({});

    useEffect(() => {
        let mounted = true;

        const fetchProductData = async () => {
            const res = await axios.get(`products/${id}`);
            const product = res.data.data;

            if (mounted) {
                setFormData({
                    name: product.name,
                    description: product.description,
                    image_url: product.image_url,
                    price: product.price,
                });
            }
        }

        fetchProductData()
            .catch(err => console.error(err));

        return () => mounted = false;
    }, [id]);

    const {name, description, image_url, price} = formData;

    const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const handleImageChange = (url) => setFormData({...formData, image_url: url});

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.put(`products/${id}`, {
            name: name,
            description: description,
            image_url: image_url,
            price: parseFloat(price),
        });

        navigate('/products');
    }

    return (
        <main>
            <form className="card product-edit-form" onSubmit={handleSubmit}>
                <h1 className="form-title">Edit Product</h1>

                <label htmlFor="name" className="form-label">Name</label>
                <input 
                    type="text" 
                    name="name" 
                    className="form-input" 
                    value={name}
                    onChange={handleChange}
                />
                
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    name="description" 
                    className="form-input" 
                    value={description}
                    onChange={handleChange}
                >
                </textarea>

                <label htmlFor="image" className="form-label">Image</label>
                <ImageUpload imageUrl={image_url} onChange={handleImageChange} />

                <label htmlFor="price" className="form-label">Price</label>
                <input 
                    type="number" 
                    name="price" 
                    className="form-input" 
                    value={price}
                    onChange={handleChange}
                />

                <div className="buttons">
                    <input type="submit" value="Save" className="btn btn-primary" />{' '}
                    <button onClick={() => navigate('/products')} className="btn">Cancel</button>
                </div>
            </form>
        </main>
    )
}

export default ProductEdit;
