import React from 'react';
import './Blogs.css';

const Blogs = () => {
    return (
        <div className="blog-container">
            <div className="blog-post">
                <h2 className="blog-title">The Tranquility of Forests</h2>
                <p className="blog-content">
                    Forests are the lungs of our planet, offering a serene escape from the bustling city life. Walking through the towering trees and hearing the whispers of the wind is a truly rejuvenating experience.
                </p>
                <img className="blog-image" src="https://via.placeholder.com/400" alt="Forests" />
            </div>
            <div className="blog-post">
                <h2 className="blog-title">Mysteries of the Deep Ocean</h2>
                <p className="blog-content">
                    The ocean covers over 70% of the Earths surface, yet much of it remains unexplored. The vibrant marine life and stunning underwater landscapes offer endless fascination.
                </p>
                <img className="blog-image" src="https://via.placeholder.com/300" alt="Ocean" />
            </div>
            <div className="blog-post">
                <h2 className="blog-title">Some other random event</h2>
                <p className="blog-content">The placeholder images are quite helpful , we can get them from https://via.placeholder</p>
                <img className="blog-image" src="https://via.placeholder.com/300" alt="Mountain Peaks" />
            </div>
            <div className="blog-post">
                <h2 className="blog-title">Sunset Over Rolling Hills</h2>
                <p className="blog-content">
                    Theres something magical about watching the sun set over rolling hills. The blend of orange, pink, and purple hues paints the sky in a breathtaking spectacle.
                </p>
            </div>
        </div>
    );
};

export default Blogs;
