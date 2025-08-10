import React, { useState, useRef, useEffect } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const confirmationRef = useRef(null);

  useEffect(() => {
    if (submitted && confirmationRef.current) {
      confirmationRef.current.focus();
    }
  }, [submitted]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = 'Invalid email address.';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;
    }

    console.log('Form submitted:', formData);
    setSubmitted(true);
    setErrors({});
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Contact Us</h2>

      {submitted && (
        <div
          ref={confirmationRef}
          tabIndex={-1}
          role="alert"
          aria-live="polite"
          className="alert alert-success"
          style={{ outline: 'none' }}
        >
          Thanks for reaching out! We’ll get back to you soon.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="row g-3" aria-describedby="form-errors">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">
            Name <span aria-hidden="true" style={{ color: 'red' }}>*</span>
          </label>
          <input
            id="name"
            name="name"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={formData.name}
            onChange={handleChange}
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={errors.name ? 'true' : 'false'}
            required
          />
          {errors.name && (
            <div id="name-error" className="invalid-feedback">
              {errors.name}
            </div>
          )}
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email <span aria-hidden="true" style={{ color: 'red' }}>*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={formData.email}
            onChange={handleChange}
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={errors.email ? 'true' : 'false'}
            required
          />
          {errors.email && (
            <div id="email-error" className="invalid-feedback">
              {errors.email}
            </div>
          )}
        </div>

        <div className="col-12">
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            className="form-control"
            value={formData.subject}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label htmlFor="message" className="form-label">
            Message <span aria-hidden="true" style={{ color: 'red' }}>*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
            value={formData.message}
            onChange={handleChange}
            aria-describedby={errors.message ? 'message-error' : undefined}
            aria-invalid={errors.message ? 'true' : 'false'}
            required
          />
          {errors.message && (
            <div id="message-error" className="invalid-feedback">
              {errors.message}
            </div>
          )}
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-primary px-5">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactUs;
