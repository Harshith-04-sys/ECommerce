import React from 'react';
import CategoryCard from './CategoryCard';
import './home.css';

const categories = [
  {
    id: 1,
    name: 'Books',
    image: '/category-images/books.jpg'
  },
  {
    id: 2,
    name: 'Jewellery',
    image: '/category-images/jewellery.jpg'
  },
  {
    id: 3,
    name: 'Clothes/Shoes',
    image: '/category-images/clothes.jpg'
  },
  {
    id: 4,
    name: 'Electronics',
    image: '/category-images/electronics.jpg'
  },
  {
    id: 5,
    name: 'Fruits',
    image: '/category-images/fruits.jpg'
  },
  {
    id: 6,
    name: 'Shoes',
    image: '/category-images/shoes.jpg'
  }
];

export default function CategoryGrid() {
  return (
    <div className="category-grid-section">
      <div className="section-header">
        <h2 className="section-title">Shop by Category</h2>
        <p className="section-subtitle">Browse our curated collections</p>
      </div>
      
      <div className="category-grid fade-in">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
