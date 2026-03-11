import React from 'react';
import SkeletonCard from './SkeletonCard';
import './SkeletonCard.css';

/**
 * SkeletonGrid Component
 * Renders a grid of skeleton cards while products are loading
 * @param {number} count - Number of skeleton cards to display (default: 8)
 */
export default function SkeletonGrid({ count = 8 }) {
  return (
    <section id="products" className="container mt-5">
      <div className="row">
        <div className="skeleton-grid col-12">
          {Array.from({ length: count }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
