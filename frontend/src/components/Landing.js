import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

// Landing page shown before hitting the data-heavy Home page
// Keeps things static/lightweight so users see content instantly
export default function Landing() {
  return (
    <section className="landing">
      <div className="landing__content">
        <p className="landing__eyebrow">Shopify Editions</p>
        <h1>Premium finds, crafted with care</h1>
        <p className="landing__subtitle">
          A warm, elegant storefront with secure checkout, curated products, and a soothing shopping flow.
        </p>
        <div className="landing__cta">
          <Link className="cta_button" to="/shop">
            Enter Store
          </Link>
          <a className="cta_link" href="#landing-highlights">
            See highlights
          </a>
        </div>
      </div>

      <div className="landing__orbital">
        <div className="orbital__card floating">
          <span className="pill">3D cards</span>
          <strong>Soft depth</strong>
          <small>Hover to feel the lift</small>
        </div>
        <div className="orbital__card floating delay">
          <span className="pill pill-gold">Glass UI</span>
          <strong>Frosted nav</strong>
          <small>Gentle blur + glow</small>
        </div>
        <div className="orbital__card floating slow">
          <span className="pill pill-emerald">Motion</span>
          <strong>Parallax hero</strong>
          <small>Perspective & tilt</small>
        </div>
      </div>

      <div id="landing-highlights" className="landing__highlights">
        <article>
          <h3>Fast checkout</h3>
          <p>Stripe-powered payments keep your cart flowing.</p>
        </article>
        <article>
          <h3>Curated products</h3>
          <p>Backed by MongoDB Atlas for smooth discovery.</p>
        </article>
        <article>
          <h3>Secure accounts</h3>
          <p>JWT-authenticated API with protected routes.</p>
        </article>
      </div>
    </section>
  );
}
