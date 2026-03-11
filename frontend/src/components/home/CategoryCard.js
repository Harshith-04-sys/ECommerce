import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home.css';

export default function CategoryCard({ category }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to search with category filter
    navigate(`/search?category=${category.name}`);
  };

  return (
    <div className="category-card" onClick={handleClick}>
      <img
        src={category.image}
        alt={category.name}
        className="category-card-image"
      />
      <div className="category-card-overlay">
        <h3 className="category-card-name">{category.name}</h3>
        <div className="category-card-arrow">→</div>
      </div>
    </div>
  );
}
