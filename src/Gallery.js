import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Gallery.css';

// Dummy admin flag for demonstration
const isAdmin = true;

export const API_BASE_URL = "https://node-api-render-sdiq.onrender.com";

export const initialDiamonds = [
  { id: 1, src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80', alt: 'Diamond 1', name: 'Brilliant Cut', desc: 'A classic round brilliant diamond, known for its exceptional sparkle.' },
  { id: 2, src: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80', alt: 'Diamond 2', name: 'Princess Cut', desc: 'A modern princess cut diamond, prized for its sharp lines and brilliance.' },
  { id: 3, src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80', alt: 'Diamond 3', name: 'Emerald Cut', desc: 'An elegant emerald cut diamond, admired for its clarity and step facets.' },
];

function Gallery() {
  const [diamonds, setDiamonds] = useState([]);
  const [modalImg, setModalImg] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const gridRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    setFadeIn(true);
    setLoading(true);
    setError(null);
    fetch(`${API_BASE_URL}/api/gallery`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch gallery');
        return res.json();
      })
      .then(data => {
        setDiamonds(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not load gallery.');
        setLoading(false);
      });
    // Use Intersection Observer for smooth transitions
    const items = gridRef.current?.querySelectorAll('.gallery-item');
    if (!items) return;
    const observer = new window.IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    items.forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const handleImageClick = (diamond) => {
    navigate(`/diamond/${diamond.id}`, { state: { diamond } });
  };

  return (
    <div className={`gallery-container gallery-fadein${fadeIn ? ' visible' : ''}`}>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Cut & Polished Diamonds Gallery</h1>
          <p>Discover our curated selection of the world’s finest diamonds, each handpicked for its brilliance and beauty.</p>
        </div>
      </div>
      <div className="gallery-intro">
        <p>
          Vikramdeep Impex brings you a showcase of our most exquisite cut and polished diamonds. Each piece is a testament to our commitment to quality, authenticity, and timeless elegance.
        </p>
      </div>
      {/* Upload button and section removed */}
      {loading && <div className="gallery-loading">Loading gallery...</div>}
      {error && <div className="gallery-error">{error}</div>}
      <div className="gallery-grid" ref={gridRef}>
        {diamonds.map((diamond) => (
          <div className="gallery-item" key={diamond.id} onClick={() => handleImageClick(diamond)}>
            <img src={diamond.src} alt={diamond.alt} className="gallery-img" />
            <div className="gallery-info">
              <div className="gallery-name">{diamond.name || 'Diamond'}</div>
            </div>
          </div>
        ))}
      </div>
      {/* ... existing modal code ... */}
    </div>
  );
}

export default Gallery; 