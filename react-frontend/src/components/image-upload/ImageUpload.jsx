import axios from 'axios';
import './ImageUpload.css';

const ImageUpload = ({ imageUrl, onChange }) => {
    const uploadImage = async (e) => {
        const files = e.target.files;

        if (files === null) return;

        const data = new FormData();
        data.append('image', files[0]);

        const res = await axios.post('images/upload', data);
        console.log(res)

        onChange(res.data.url);
    }

    return (
        <div className="image-upload">
            <input 
                type="text" 
                name="imageUrl" 
                className="form-input" 
                value={imageUrl}
                onChange={(e) => onChange(e.target.value)}
            />
            <label className="form-label btn">
                Upload
                <input type="file" hidden onChange={uploadImage} />
            </label>
        </div>
    )
}

export default ImageUpload;
