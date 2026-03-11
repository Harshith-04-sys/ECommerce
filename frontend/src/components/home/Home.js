import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSlider from './HeroSlider';
import CategoryGrid from './CategoryGrid';
import MetaData from '../layouts/MetaData';
import './home.css';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery.trim()}`);
      setSearchQuery('');
    }
  };

  return (
    <div className="home-container">
      <MetaData title="Shopify - Your Premium Shopping Destination" />
      
      <div className="home-wrapper">
        {/* Hero Slider */}
        <HeroSlider />

        {/* Search Bar */}
        <div className="home-search-section">
          <form onSubmit={handleSearch}>
            <div className="home-search-wrapper">
              <i className="fa fa-search home-search-icon"></i>
              <input
                type="text"
                className="home-search-input"
                placeholder="Search for products, categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </div>

        {/* Category Grid */}
        <CategoryGrid />
      </div>
    </div>
  );
}
