import React, { useState } from 'react';
import { IconMail, IconSend, IconUser, IconAt } from '@tabler/icons-react';
import { useLanguage } from '../context/LanguageContext';
import SectionHeader from './SectionHeader';
import './Contact.css';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    
    try {
      const response = await fetch('https://formspree.io/f/mvzvnylv', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Formspree error:', error);
      setStatus('error');
    }
  };

  const contactT = (t as any).contact;

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <SectionHeader 
          icon={<IconMail />} 
          title={contactT.title} 
        />

        <div className="contact-card">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-grid">
              {/* Name Field */}
              <div className="input-group">
                <label htmlFor="name" className="input-label">
                  <IconUser size={16} />
                  {contactT.nameLabel}
                </label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="contact-input"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="input-group">
                <label htmlFor="email" className="input-label">
                  <IconAt size={16} />
                  {contactT.emailLabel}
                </label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder=" "
                    className="contact-input"
                  />
                </div>
              </div>
            </div>

            {/* Message Field */}
            <div className="input-group">
              <label htmlFor="message" className="input-label">
                <IconMail size={16} />
                {contactT.messageLabel}
              </label>
              <div className="input-wrapper">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder=" "
                  className="contact-input contact-textarea"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={`contact-submit-btn${status === 'sending' ? ' sending' : ''}`}
              disabled={status === 'sending'}
            >
              <span className="btn-content">
                {status === 'sending' ? '...' : contactT.sendButton}
                <IconSend size={18} stroke={1.5} />
              </span>
              <div className="btn-glow" />
            </button>

            {status === 'success' && (
              <p className="contact-status success">{contactT.success}</p>
            )}
            {status === 'error' && (
              <p className="contact-status error">{contactT.error}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
