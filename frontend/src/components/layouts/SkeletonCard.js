import React from 'react';
import './SkeletonCard.css';

/**
 * SkeletonCard Component
 * Displays a shimmer loading skeleton that matches the product card layout
 * Used while product data is being fetched from the API
 */
export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      {/* Image placeholder */}
      <div className="skeleton skeleton-image"></div>
      
      {/* Title placeholders - two lines */}
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-title-short"></div>
      
      {/* Rating placeholder */}
      <div className="skeleton skeleton-rating"></div>
      
      {/* Price placeholder */}
      <div className="skeleton skeleton-price"></div>
      
      {/* Button placeholder */}
      <div className="skeleton skeleton-button"></div>
    </div>
  );
}
