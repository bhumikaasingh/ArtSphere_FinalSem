import React from 'react';
import './ContactForm.css';

function ContactForm() {
    return (
        <div className="contact-container">
            <div className="contact-form-wrapper">
                <form className="contact-form">
                    <h1>Get in Touch</h1>
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input type="text" id="name" className="input-field" placeholder="Your Name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Your Email</label>
                        <input type="email" id="email" className="input-field" placeholder="Your Email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Your Message</label>
                        <textarea id="message" className="textarea-field" placeholder="Write your message here..."></textarea>
                    </div>
                    <button type="submit" className="submit-button">Send</button>
                </form>
            </div>
        </div>
    );
}

export default ContactForm;