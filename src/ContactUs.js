import React, { useState } from 'react';
import './ContactUs.css';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const API_BASE_URL = "https://node-api-render-sdiq.onrender.com";

function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '', captcha: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [captchaNums, setCaptchaNums] = useState({ a: getRandomInt(1, 10), b: getRandomInt(1, 10) });

  const validate = () => {
    const errs = {};
    if (!form.name || form.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!form.message || form.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }
    if (parseInt(form.captcha, 10) !== captchaNums.a + captchaNums.b) {
      errs.captcha = 'Incorrect answer to the CAPTCHA.';
    }
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setApiError("");
    setApiSuccess("");
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Regenerate CAPTCHA if failed
      setCaptchaNums({ a: getRandomInt(1, 10), b: getRandomInt(1, 10) });
      setForm({ ...form, captcha: '' });
      return;
    }
    setLoading(true);
    fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, message: form.message })
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data.success) {
          setApiSuccess('Thank you for contacting us!');
          setSubmitted(true);
        } else {
          setApiError(data.error || 'Failed to send message.');
        }
      })
      .catch(() => {
        setLoading(false);
        setApiError('Failed to send message.');
      });
  };

  return (
    <div className="contactus-container">
      <h1>Contact Us</h1>
      <div className="contact-details">
        <p><strong>Email:</strong> info@vikrmdeepimpex.com</p>
        <p><strong>Phone:</strong> +91 12345 67890</p>
        <p><strong>Address:</strong> 101, Diamond Plaza, Mumbai, India</p>
      </div>
      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        {errors.name && <div className="form-error">{errors.name}</div>}
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        {errors.email && <div className="form-error">{errors.email}</div>}
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        {errors.message && <div className="form-error">{errors.message}</div>}
        <div className="captcha-row">
          <label htmlFor="captcha">What is {captchaNums.a} + {captchaNums.b}?</label>
          <input
            type="text"
            name="captcha"
            id="captcha"
            placeholder="Enter answer"
            value={form.captcha}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
        {errors.captcha && <div className="form-error">{errors.captcha}</div>}
        <button type="submit" disabled={loading}>Send Message</button>
        {loading && <div className="form-loading">Sending...</div>}
        {apiError && <div className="form-error">{apiError}</div>}
        {apiSuccess && <div className="form-success">{apiSuccess}</div>}
        {submitted && !apiError && <div className="thankyou-msg">Thank you for contacting us!</div>}
      </form>
    </div>
  );
}

export default ContactUs; 