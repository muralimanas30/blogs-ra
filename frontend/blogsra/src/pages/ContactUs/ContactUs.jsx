import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ContactUs.css'; // Import the styles
import { useAuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify

const ContactUs = () => {
    const { backend_domain,IP,getIP } = useAuthContext();
    useEffect(() => {
        // If IP is already set, do nothing
        if (Object.keys(IP).length === 0) {
          getIP();  // Fetch the IP only if it's empty
        }
      }, [IP, getIP]);  // This effect runs only when IP changes
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        ip:IP
    });
    const [loading, setLoading] = useState(false); // State for loading

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Set loading state to true when submitting
        setLoading(true);

        try {
            // Send the POST request to the backend API
            const response = await axios.post(`${backend_domain}/api/v1/contact`, formData);
            
            // Check if the response is successful
            if (response.status === 200 || response.status === 201) {
                // Show success toast notification only if the response is successful
                toast.success('Your message has been sent successfully!');

                // Reset the form data state after successful submission
                setFormData({ name: '', email: '', message: '' });
            } else {
                // If the status is not successful, show an error toast
                toast.error('Something went wrong. Please try again later.');
            }
        } catch (error) {
            // Handle any errors here, such as network issues
            console.error('Error sending message:', error.response?.data || error.message);

            // Show error toast notification
            toast.error('Something went wrong. Please try again later.');
        } finally {
            // Reset loading state after the request is completed
            setLoading(false);
        }
    };

    return (
        <div className="contact-us">

            <section className="contact-section">
                <div className="container">
            {/* Loading overlay */}
            {loading && (
                <div className="loader-overlay">
                    
                </div>
            )}
                    <h2>Contact Us</h2>
                    <p>We’d love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.</p>

                    <form onSubmit={handleSubmit} className="contact-form">
                        <div className="form-group">
                            <label htmlFor="name">Your Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your name"
                                disabled={loading} // Disable inputs when loading
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Your Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                                disabled={loading} // Disable inputs when loading
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Your Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Write your message here"
                                disabled={loading} // Disable inputs when loading
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-button" disabled={loading}>Send Message</button>
                    </form>
                </div>
            </section>

            {/* Toast Container (needed to show toasts) */}
            <ToastContainer position="top-center" autoClose={3000} hideProgressBar newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default ContactUs;
