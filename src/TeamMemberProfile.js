import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Gallery.css';

const profiles = {
  'vikram-shah': {
    name: 'Vikram Shah',
    role: 'Proprietor',
    image: '/images/vikram-shah.jpg',
    experience: 'Over 25 years of experience in the diamond industry. Founder and visionary behind Vikramdeep Impex and RC Jewels. Renowned for his leadership, integrity, and commitment to excellence.'
  },
  'kevin-parikh': {
    name: 'Kevin Parikh',
    role: 'Chief Financial Officer',
    image: '/images/kevin-parikh.jpg',
    experience: 'Joined in 2016. Manages all financial operations for both companies. Expert in financial strategy, compliance, and growth management.'
  },
  'deepak-shah': {
    name: 'Deepak Shah',
    role: 'Head of Sales',
    image: '/images/deepak-shah.jpg',
    experience: 'Over 35 years of experience in the diamond industry. Leads the sales team with expertise and dedication.'
  }
};

function TeamMemberProfile() {
  const { name } = useParams();
  const navigate = useNavigate();
  const profile = profiles[name];

  if (!profile) {
    return (
      <div className="gallery-container" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>
          <h2>Team Member Not Found</h2>
          <button className="upload-btn" onClick={() => navigate('/about')}>Back to About Us</button>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-container team-profile-container">
      <div className="team-profile-img-wrap">
        <img src={profile.image} alt={profile.name} className="team-profile-img" />
      </div>
      <div className="team-profile-name">{profile.name}</div>
      <div className="team-profile-role">{profile.role}</div>
      <div className="team-profile-exp">{profile.experience}</div>
      <button className="upload-btn" style={{ marginTop: '2rem' }} onClick={() => navigate('/about')}>Back to About Us</button>
    </div>
  );
}

export default TeamMemberProfile; 