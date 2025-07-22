import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { initialDiamonds } from './Gallery';
import './Gallery.css';

function DiamondDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  let diamond = location.state?.diamond;

  // Fallback: if user refreshes, find diamond by id from initialDiamonds
  if (!diamond && location.pathname) {
    const id = parseInt(location.pathname.split('/').pop(), 10);
    diamond = initialDiamonds.find(d => d.id === id);
  }

  // Placeholder details (replace with real data as needed)
  const details = {
    weight: diamond?.weight || '1.25 carats',
    dimensions: diamond?.dimensions || '6.5 x 6.5 x 4.0 mm',
    color: diamond?.color || 'D',
    clarity: diamond?.clarity || 'VS1',
    cut: diamond?.cut || diamond?.name || 'Brilliant Cut',
    origin: diamond?.origin || 'South Africa',
    certificate: diamond?.certificate || 'GIA',
  };

  if (!diamond) {
    return (
      <div className="gallery-container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <h2>Diamond not found</h2>
          <button className="upload-btn" onClick={() => navigate('/')}>Back to Gallery</button>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-container" style={{ maxWidth: 800, margin: '2.5rem auto' }}>
      <div className="diamond-details-flex">
        <img src={diamond.src} alt={diamond.alt} className="gallery-img diamond-details-img" />
        <div className="diamond-details-info">
          <div className="gallery-name diamond-details-name">{diamond.name || 'Diamond'}</div>
          <div className="diamond-details-table">
            <div><span>Weight:</span> {details.weight}</div>
            <div><span>Dimensions:</span> {details.dimensions}</div>
            <div><span>Color:</span> {details.color}</div>
            <div><span>Clarity:</span> {details.clarity}</div>
            <div><span>Cut:</span> {details.cut}</div>
            <div><span>Origin:</span> {details.origin}</div>
            <div><span>Certificate:</span> {details.certificate}</div>
          </div>
        </div>
      </div>
      <div className="modal-desc diamond-details-desc">{diamond.desc}</div>
      <div className="diamond-details-actions">
        <button className="upload-btn" style={{ marginTop: '1.2rem' }} onClick={() => navigate('/')}>Back to Gallery</button>
        <button className="enquiry-btn" style={{ marginTop: '1.2rem', marginLeft: '1.2rem' }} onClick={() => navigate('/contact')}>Enquiry</button>
      </div>
    </div>
  );
}

export default DiamondDetails; 