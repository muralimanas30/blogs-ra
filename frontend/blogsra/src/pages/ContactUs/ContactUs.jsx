import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './ContactUs.css';
import { useAuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageCarousel from '../../components/ImageCarousel/ImageCarousel';

const ContactUs = () => {
    const { backend_domain, IP, getIP } = useAuthContext();
    useEffect(() => {

        if (Object.keys(IP).length === 0) {
            getIP();
        }
    }, [IP, getIP]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        ip: IP
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        setLoading(true);

        try {

            const response = await axios.post(`${backend_domain}/api/v1/contact`, formData);


            if (response.status === 200 || response.status === 201) {

                toast.success('Your message has been sent successfully!');


                setFormData({ name: '', email: '', message: '' });
            } else {

                toast.error('Something went wrong. Please try again later.');
            }
        } catch (error) {

            console.error('Error sending message:', error.response?.data || error.message);


            toast.error('Something went wrong. Please try again later.');
        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="contact-us">
            <ImageCarousel />
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
                                disabled={loading}
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
                                disabled={loading}
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
                                disabled={loading}
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-button" disabled={loading}>Send Message</button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;
