import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './BlogForm.css'
const BlogForm = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tags: '',
        file: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value.replace(/[^\p{L}\p{N}\u1F600-\u1F64F\u2700-\u27BF\s]/gu, "")
                .replace(' ', ' ')

        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            file: file ? file : prevData?.file,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = {
            ...formData,
            tags: formData.tags.split(',')
                .map(tag => tag.trim().replace(/[^a-zA-Z0-9]/g, '').replace(' ', "")) // Remove non-alphanumeric characters
                .filter(tag => tag) // Filter out empty tags
                .map(tag => tag.toLowerCase()).join(','),
        };

        onSubmit(postData); // Send the form data to parent
        setFormData({
            title: '',
            content: '',
            tags: '',
            file: null,
        });
        onClose(); // Close the form overlay after submit
    };

    return (
        <div className="blog-form-overlay">
            <div className="blog-form-overlay-content">
                <form onSubmit={handleSubmit}>
                    <div className="blog-form-item">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter post title"
                            autoFocus
                            required
                            maxLength="20"
                        />
                    </div>

                    <div className="blog-form-item">
                        <label htmlFor="content">Content:</label>
                        <textarea
                            id="content"
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            placeholder="Write your post content here"
                            rows="2"
                            required
                            maxLength="250"
                        />
                    </div>

                    <div className="blog-form-item">
                        <label htmlFor="tags">Tags (comma separated):</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            placeholder="Enter tags like 'React, JavaScript'"

                        />
                    </div>

                    <div className="blog-form-item">
                        <label htmlFor="image">Upload Image:</label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    <div className="blog-form-item">
                        <button type="submit">Post</button>
                        <button style={{ backgroundColor: "red" }} type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Prop validation
BlogForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default BlogForm;