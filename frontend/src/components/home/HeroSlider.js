import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

const slides = [
  {
    id: 1,
    image: '/category-images/books.jpg',
    title: 'Explore Books',
    description: 'Discover your next favorite read',
    category: 'Books'
  },
  {
    id: 2,
    image: '/category-images/jewellery.jpg',
    title: 'Fine Jewellery',
    description: 'Elegant pieces for every occasion',
    category: 'Jewellery'
  },
  {
    id: 3,
    image: '/category-images/clothes.jpg',
    title: 'Fashion Collection',
    description: 'Trending styles for you',
    category: 'Clothes'
  },
  {
    id: 4,
    image: '/category-images/shoes.jpg',
    title: 'Footwear',
    description: 'Step up your style game',
    category: 'Shoes'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleSlideClick = (category) => {
    // Navigate to search with category filter instead of keyword
    navigate(`/search?category=${category}`);
  };

  // Auto-play slider
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div className="hero-slider">
      <div className="slider-wrapper">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="slide"
              onClick={() => handleSlideClick(slide.category)}
            >
              <img src={slide.image} alt={slide.title} />
              <div className="slide-overlay">
                <h2 className="slide-title">{slide.title}</h2>
                <p className="slide-description">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          className="slider-arrow prev"
          onClick={(e) => {
            e.stopPropagation();
            prevSlide();
          }}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          className="slider-arrow next"
          onClick={(e) => {
            e.stopPropagation();
            nextSlide();
          }}
          aria-label="Next slide"
        >
          ›
        </button>

        {/* Dots Navigation */}
        <div className="slider-controls">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
