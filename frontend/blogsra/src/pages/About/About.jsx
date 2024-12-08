import React, { useState, useEffect } from 'react';
import './About.css'; // Import the CSS file for styling

const AboutUs = () => {
    const [scrollPosition, setScrollPosition] = useState(0);

    // Track scroll position for animations
    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="about-us">
            {/* Hero Section */}
            <section className="hero">
                <div className="overlay">
                    <h1>Redefining Excellence</h1>
                    <button className="cta-button">Discover Our Legacy</button>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="our-story">
                <div className="container">
                    <h2>The Journey of Excellence</h2>
                    <p>
                        Our journey began with a vision — to create something beyond ordinary. We believe in quality that speaks for itself, in craftsmanship that is unparalleled, and in innovation that shapes the future. From humble beginnings to industry leaders, every step has been driven by an unwavering commitment to excellence.
                    </p>
                </div>
            </section>

            {/* Values Section */}
            <section className="values">
                <div className="container">
                    <h2>Our Core Values</h2>
                    <div className="values-list">
                        <div className="value-item">
                            <i className="icon">🛠️</i>
                            <h3>Craftsmanship</h3>
                            <p>Meticulous attention to detail is at the heart of everything we do.</p>
                        </div>
                        <div className="value-item">
                            <i className="icon">💡</i>
                            <h3>Innovation</h3>
                            <p>We lead with groundbreaking ideas and forward-thinking solutions.</p>
                        </div>
                        <div className="value-item">
                            <i className="icon">🌍</i>
                            <h3>Sustainability</h3>
                            <p>Our practices and products are built for a sustainable future.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team">
                <div className="container">
                    <h2>Meet Our Team</h2>
                    <div className="team-members">
                        <div className="team-member">
                            <img src="https://via.placeholder.com/150" alt="Founder" />
                            <h3>John Doe</h3>
                            <p>Founder & CEO</p>
                        </div>
                        <div className="team-member">
                            <img src="https://via.placeholder.com/150" alt="Co-Founder" />
                            <h3>Jane Smith</h3>
                            <p>Co-Founder & CTO</p>
                        </div>
                        {/* Add more team members as needed */}
                    </div>
                </div>
            </section>

            {/* Visionary Impact Section */}
            <section className="vision">
                <div className="container">
                    <h2>Our Vision for the Future</h2>
                    <p>
                        We are committed to shaping the future by staying ahead of trends, innovating at the cutting edge, and building a legacy that will stand the test of time.
                    </p>
                    <button className="cta-button">Partner With Us</button>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials">
                <div className="container">
                    <h2>What Our Clients Say</h2>
                    <div className="testimonial-carousel">
                        <div className="testimonial-item">
                            <blockquote>" Working with this team has been a game-changer for our business "</blockquote>
                            <p>- Suresh</p>
                        </div>
                        <div className="testimonial-item">
                            <blockquote>" Their attention to detail and commitment to quality is unmatched "</blockquote>
                            <p>- Ramesh</p>
                        </div>
                        {/* Add more testimonials as needed */}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
