import React, { useState } from 'react';
import './ContactUs.css'; // Import the styles

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Your message has been sent!');
        // Reset form after submission
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="contact-us">
            {/* Contact Us Section */}
            <section className="contact-section">
                <div className="container">
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
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-button">Send Message</button>
                    </form>
                </div>
            </section>
        </div>
    );
}

export default ContactUs;
