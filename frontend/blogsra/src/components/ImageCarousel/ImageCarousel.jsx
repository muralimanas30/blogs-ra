import React from 'react';
import Slider from 'react-slick';
import img0 from '../../assets/carousel/0.png';
import img1 from '../../assets/carousel/1.png';
import img2 from '../../assets/carousel/2.png';
import img3 from '../../assets/carousel/3.png';
import img4 from '../../assets/carousel/4.png';
import img5 from '../../assets/carousel/5.png';
import img6 from '../../assets/carousel/6.png';
import './ImageCarousel.css';

const images = [
    { src: img0, description: "Welcome To BlogsRa" },
    { src: img1, description: "Sample description for image 1" },
    { src: img2, description: "Sample description for image 2" },
    { src: img3, description: "Sample description for image 3" },
    { src: img4, description: "Sample description for image 4" },
    { src: img5, description: "Sample description for image 5" },
    { src: img6, description: "Sample description for image 6" },
];

const settings = {

    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
};

const ImageCarousel = () => {
    return (
        <div className='slider-container'>
            <div className="carousel-wrapper">
                <div className="image-slider">
                    <Slider {...settings}>
                        {images.map((image, index) => (
                            <div title={image.description}
                                key={index} className="image-carousel-1">
                                <img className='image-carousel-1-image' src={image.src} alt={image.description} loading='lazy'/>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="bigFanceText">
                    <h1>Unleash Your Creativity: Start Blogging Today!</h1>
                    <p>Easily create, share, and connect with your audience.</p>
                    <p>Join our community of bloggers and inspire others with your unique voice.</p>
                </div>
            </div>
        </div>
    );
}

export default ImageCarousel;