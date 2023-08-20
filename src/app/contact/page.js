import React from 'react';
import './contact.css';

export default function Contact() {
  return (
    <div className="contact-us-container">
      <h1 className="contact-us-heading">Contact Us</h1>
      <p className="contact-us-description">
        We'd love to hear from you! If you have any questions, feedback, or inquiries, please don't hesitate to reach out to us using the contact information below or by filling out the contact form.
      </p>
      <div className="contact-info">
        <h2 className="contact-info-heading">Contact Information</h2>
        <p className="contact-info-item">
          <strong>Address:</strong> 123 Main Street, City, Country
        </p>
        <p className="contact-info-item">
          <strong>Phone:</strong> 123-456-7890
        </p>
        <p className="contact-info-item">
          <strong>Email:</strong> info@example.com
        </p>
      </div><br />
      <div className="contact-form">
        <h2 className="contact-form-heading">Contact Form</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" className="form-control"></textarea>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  )
}