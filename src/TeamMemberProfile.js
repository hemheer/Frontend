import React, { useState, useEffect } from 'react';

function TeamSection() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '1rem' }}>
      <h2 style={{ textAlign: 'center', color: '#f7e9b0', marginBottom: '2rem' }}>Our Team</h2>
      {loading && <div style={{ color: '#ececec', textAlign: 'center' }}>Loading...</div>}
      {error && <div style={{ color: '#e57373', textAlign: 'center' }}>{error}</div>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        {team.map(member => (
          <div key={member.id} style={{
            background: '#232323',
            borderRadius: 18,
            padding: '1.5rem',
            minWidth: 220,
            maxWidth: 260,
            textAlign: 'center',
            color: '#ececec',
            boxShadow: '0 2px 12px rgba(247,233,176,0.04)'
          }}>
            <h3 style={{ color: '#f7e9b0', marginBottom: 8 }}>{member.name}</h3>
            <p style={{ fontWeight: 600, marginBottom: 8 }}>{member.role}</p>
            {member.photo && (
              <img
                src={`https://node-api-render-sdiq.onrender.com/uploads/${member.photo}`}
                alt={member.name}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: 'cover',
                  borderRadius: 16,
                  marginBottom: 12,
                  boxShadow: '0 0 0 2px #f7e9b0, 0 2px 8px rgba(247,233,176,0.10)'
                }}
              />
            )}
            {member.bio && <p style={{ fontSize: '0.98rem', color: '#ececec' }}>{member.bio}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamSection; 