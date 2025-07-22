import React, { useState } from 'react';
import { API_BASE_URL } from './Gallery'; // or define your API base URL here

function AdminUpload() {
  const [file, setFile] = useState(null);
  const [altText, setAltText] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleUpload = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    if (!file) {
      setError('Please select an image.');
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('alt_text', altText);

    try {
      const res = await fetch(`${API_BASE_URL}/api/gallery/upload`, {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        body: formData,
      });
      const data = await res.json();
      setLoading(false);
      if (data.id || data.imageUrl) {
        setSuccess('Image uploaded!');
        setFile(null);
        setAltText('');
      } else {
        setError(data.message || 'Upload failed');
      }
    } catch (err) {
      setLoading(false);
      setError('Upload failed');
    }
  };

  return (
    <div className="gallery-container" style={{ maxWidth: 500, margin: '3rem auto', minHeight: '60vh' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#f7e9b0' }}>Admin Image Upload</h2>
      <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <input type="file" accept="image/jpeg,image/png" onChange={e => setFile(e.target.files[0])} />
        <input type="text" placeholder="Alt text (optional)" value={altText} onChange={e => setAltText(e.target.value)} />
        <button className="upload-btn" type="submit" disabled={loading}>Upload</button>
        {loading && <div className="gallery-loading">Uploading...</div>}
        {success && <div className="upload-success">{success}</div>}
        {error && <div className="upload-error">{error}</div>}
      </form>
    </div>
  );
}

export default AdminUpload; 