import React, { useEffect, useState } from 'react';
import './AboutUs.css';
import logo from './logo.svg';
import { useNavigate } from 'react-router-dom';

function RCJewelsLogo() {
  return (
    <span className="rcjewels-logo">
      <span className="rcjewels-logo-text">RC Jewels</span>
    </span>
  );
}

function TeamSection() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://node-api-render-sdiq.onrender.com/api/about/team')
      .then(response => response.json())
      .then(data => {
        setTeam(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching team.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="aboutus-section animate-up">
      <h2>Our Team</h2>
      {loading && <div className="team-loading">Loading team...</div>}
      {error && <div className="team-error">{error}</div>}
      <div className="team-list">
        {team.map(member => (
          <div 
            className="team-member" 
            key={member.id} 
            onClick={() => navigate(`/team/${member.name.toLowerCase().replace(/ /g, '-')}`)} 
            style={{ cursor: 'pointer' }}
          >
            {member.photo && (
              <img 
                src={`https://node-api-render-sdiq.onrender.com/uploads/${member.photo}`} 
                alt={member.name} 
                className="team-img" 
              />
            )}
            <div className="team-info">
              <div className="team-name">{member.name}</div>
              <div className="team-role">{member.role}</div>
              {member.bio && <div className="team-bio">{member.bio}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutUs() {
  useEffect(() => {
    const revealOnScroll = () => {
      document.querySelectorAll('.animate-fadein, .animate-up').forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
          el.classList.add('visible');
        }
      });
    };
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);

  return (
    <div className="aboutus-outer">
      <div className="aboutus-hero aboutus-hero-replica">
        {/* <img src={logo} alt="Vikramdeep Impex Logo" className="aboutus-logo aboutus-logo-replica" /> */}
        <div className="aboutus-hero-heading">
          <span>ABOUT</span>
          <span>VIKRAMDEEP IMPEX</span>
        </div>
        <div className="aboutus-hero-divider"></div>
        <div className="aboutus-hero-desc">
          Vikramdeep Impex was established in 2010, and it was promoted by Late. Rameshchandra Shah, who belongs to Surat, Gujarat. He chose to have Manufacturing Management Setup at Surat, Gujarat and Sales & Marketing office in the hub of Mumbai.
        </div>
      </div>
      <div className="aboutus-section animate-up">
        <h2>Who We Are</h2>
        <p>
          <strong>Established in 2010</strong>, Vikramdeep Impex is in the import and export of cut and polished diamonds. With decades of experience and a commitment to excellence, we source and deliver the finest diamonds from all over the world. Our company is built on trust, transparency, and a passion for perfection, serving clients in every major diamond market.
        </p>
      </div>
      <div className="aboutus-divider" />
      <div className="aboutus-section animate-up">
        <h2>Our Subsidiary</h2>
        <p>
          <RCJewelsLogo /> is a subsidiary of Vikramdeep Impex, established in 2019, further expanding our reach and expertise in the diamond industry.
        </p>
      </div>
      <div className="aboutus-divider" />
      <div className="aboutus-section animate-up">
        <h2>Our Mission</h2>
        <p>
          To connect the world with the brilliance of diamonds, ensuring quality, authenticity, and customer satisfaction at every step.
        </p>
      </div>
      <div className="aboutus-divider" />
      <div className="aboutus-section animate-up">
        <h2>Why Choose Us?</h2>
        <ul className="aboutus-values">
          <li><strong>Unmatched Quality:</strong> Every diamond is hand-selected and certified for brilliance and authenticity.</li>
          <li><strong>Global Trust:</strong> Serving clients worldwide with transparency and integrity since 2010.</li>
          <li><strong>Expertise & Innovation:</strong> Decades of experience and a forward-thinking approach to the diamond trade.</li>
          <li><strong>Customer-Centric:</strong> Personalized service and support at every step of your journey.</li>
        </ul>
      </div>
      <div className="aboutus-divider" />
      <div className="aboutus-section animate-up">
        <h2>Major Activities</h2>
        <ul>
          <li>Import and export of cut and polished diamonds</li>
          <li>Global sourcing and distribution</li>
          <li>Quality assurance and certification</li>
          <li>Customer-centric service</li>
        </ul>
      </div>
      <div className="aboutus-divider" />
      <TeamSection />
    </div>
  );
}

export default AboutUs; 