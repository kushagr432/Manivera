import { useState } from 'react'

const Contact = () => {
  const [quickMessage, setQuickMessage] = useState('')
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleWhatsAppRedirect = (message: string = '') => {
    setIsRedirecting(true)
    
    // Your WhatsApp number (replace with your actual number)
    const whatsappNumber = '919355568377' // Indian number format without + and spaces
    const defaultMessage = message || 'Hi! I\'m interested in your jewelry collection. Can you help me?'
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(defaultMessage)
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank')
    
    // Reset redirecting state after a short delay
    setTimeout(() => {
      setIsRedirecting(false)
    }, 1000)
  }

  const handleQuickMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (quickMessage.trim()) {
      handleWhatsAppRedirect(quickMessage)
      setQuickMessage('')
    }
  }

  const contactInfo = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      title: "Phone",
      details: ["+91 9355568377", "+91 7988239183"],
      action: "Call Now"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      title: "Email",
      details: ["chinu729@gmail.com", "kushagr998@gmail.com"],
      action: "Send Email"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      title: "Visit Us",
      details: ["Karol Bagh, Delhi", "India"],
      action: "Get Directions"
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12,6 12,12 16,14"/>
        </svg>
      ),
      title: "Store Hours",
      details: ["Mon-Fri: 10AM-8PM", "Sat: 10AM-6PM", "Sun: 12PM-5PM"],
      action: "View Hours"
    }
  ]

  // const subjects = [
  //   "General Inquiry",
  //   "Custom Jewelry Design",
  //   "Repair Services",
  //   "Warranty Information",
  //   "Wholesale Inquiry",
  //   "Other"
  // ]

  return (
    <section id="contact" className="section section-bg-pattern">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="contact-container">
          {/* Contact Information */}
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>Reach out to us through any of these channels, and our team will be happy to assist you.</p>
            
            <div className="contact-methods">
              {contactInfo.map((method, index) => (
                <div key={index} className="contact-method">
                  <div className="method-icon">
                    {method.icon}
                  </div>
                  <div className="method-content">
                    <h4>{method.title}</h4>
                    {method.details.map((detail, idx) => (
                      <p key={idx}>{detail}</p>
                    ))}
                    <button className="method-action">
                      {method.action}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Media */}
            <div className="social-media">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="https://www.instagram.com/manivrajewels?igsh=enJrNW5pN2h0MnVi" className="social-link" aria-label="Facebook">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/manivrajewels?igsh=enJrNW5pN2h0MnVi" className="social-link" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/manivrajewels?igsh=enJrNW5pN2h0MnVi" className="social-link" aria-label="Twitter">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/manivrajewels?igsh=enJrNW5pN2h0MnVi" className="social-link" aria-label="LinkedIn">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* WhatsApp Contact Options */}
          <div className="whatsapp-contact-container">
            <div className="whatsapp-header">
              <div className="whatsapp-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </div>
              <h3>Chat with Us on WhatsApp</h3>
              <p>Get instant responses and personalized assistance for all your jewelry needs</p>
            </div>

            <div className="whatsapp-options">
              <div className="quick-options">
                <h4>Quick Start</h4>
                <div className="option-buttons">
                  <button 
                    className="whatsapp-btn primary"
                    onClick={() => handleWhatsAppRedirect()}
                    disabled={isRedirecting}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    {isRedirecting ? 'Opening...' : 'Start Chat'}
                  </button>
                  
                  <button 
                    className="whatsapp-btn secondary"
                    onClick={() => handleWhatsAppRedirect('I want to see your diamond collection')}
                    disabled={isRedirecting}
                  >
                    💎 Diamond Collection
                  </button>
                  
                  <button 
                    className="whatsapp-btn secondary"
                    onClick={() => handleWhatsAppRedirect('I\'m interested in custom jewelry design')}
                    disabled={isRedirecting}
                  >
                    ✨ Custom Design
                  </button>
                  
                  <button 
                    className="whatsapp-btn secondary"
                    onClick={() => handleWhatsAppRedirect('I need help with jewelry repair')}
                    disabled={isRedirecting}
                  >
                    🔧 Repair Service
                  </button>
                </div>
              </div>

              <div className="custom-message">
                <h4>Send a Custom Message</h4>
                <form onSubmit={handleQuickMessageSubmit} className="message-form">
                  <div className="message-input-group">
                    <input
                      type="text"
                      value={quickMessage}
                      onChange={(e) => setQuickMessage(e.target.value)}
                      placeholder="Type your message here..."
                      className="message-input"
                    />
                    <button 
                      type="submit" 
                      className="send-btn"
                      disabled={!quickMessage.trim() || isRedirecting}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="whatsapp-benefits">
              <h4>Why WhatsApp?</h4>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <div className="benefit-icon">⚡</div>
                  <h5>Instant Response</h5>
                  <p>Get immediate answers to your questions</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">📱</div>
                  <h5>Easy Communication</h5>
                  <p>Chat from your phone or computer</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">🖼️</div>
                  <h5>Share Images</h5>
                  <p>Send photos of jewelry you like</p>
                </div>
                <div className="benefit-item">
                  <div className="benefit-icon">💬</div>
                  <h5>Personal Service</h5>
                  <p>One-on-one consultation with our experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          margin-top: 3rem;
        }

        .contact-info h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: var(--text-dark);
        }

        .contact-info > p {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          color: var(--text-light);
        }

        .contact-methods {
          margin-bottom: 3rem;
        }

        .contact-method {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: var(--white);
          border-radius: 15px;
          box-shadow: var(--shadow-light);
          transition: var(--transition-smooth);
        }

        .contact-method:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-medium);
        }

        .method-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, var(--navy-primary), var(--navy-light));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          flex-shrink: 0;
        }

        .method-content h4 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--text-dark);
        }

        .method-content p {
          margin: 0.2rem 0;
          color: var(--text-light);
        }

        .method-action {
          color: var(--navy-primary);
          font-weight: 600;
          text-decoration: none;
          margin-top: 0.5rem;
          display: inline-block;
          transition: var(--transition-smooth);
          padding: 6px;
        }

        .method-action:hover {
          color: var(--navy-light);
        }

        .social-media h4 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: var(--text-dark);
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          width: 45px;
          height: 45px;
          background: var(--white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          transition: var(--transition-smooth);
          box-shadow: var(--shadow-light);
        }

        .social-link:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-medium);
        }

        .social-link:nth-child(1) {
          background: #1877F2; /* Facebook Blue */
        }

        .social-link:nth-child(1):hover {
          background: #166FE5;
        }

        .social-link:nth-child(2) {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%); /* Instagram Gradient */
        }

        .social-link:nth-child(2):hover {
          background: linear-gradient(45deg, #e0852a 0%, #d55a2f 25%, #d01e36 50%, #c01a59 75%, #b0127b 100%);
        }

        .social-link:nth-child(3) {
          background: #1DA1F2; /* Twitter Blue */
        }

        .social-link:nth-child(3):hover {
          background: #1A91DA;
        }

        .social-link:nth-child(4) {
          background: #0077B5; /* LinkedIn Blue */
        }

        .social-link:nth-child(4):hover {
          background: #005885;
        }

        .whatsapp-contact-container {
          background: var(--white);
          border-radius: 20px;
          padding: 3rem;
          box-shadow: var(--shadow-medium);
        }

        .whatsapp-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .whatsapp-icon {
          color: #25D366;
          margin-bottom: 1.5rem;
          display: flex;
          justify-content: center;
        }

        .whatsapp-header h3 {
          font-size: 2rem;
          margin-bottom: 1rem;
          color: var(--text-dark);
        }

        .whatsapp-header p {
          font-size: 1.1rem;
          color: var(--text-light);
          max-width: 500px;
          margin: 0 auto;
        }

        .whatsapp-options {
          margin-bottom: 3rem;
        }

        .quick-options h4,
        .custom-message h4 {
          font-size: 1.3rem;
          margin-bottom: 1.5rem;
          color: var(--text-dark);
        }

        .option-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .whatsapp-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 1rem 1.5rem;
          border: none;
          border-radius: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
          font-size: 1rem;
        }

        .whatsapp-btn.primary {
          background: linear-gradient(135deg, #25D366, #128C7E);
          color: var(--white);
          box-shadow: var(--shadow-medium);
        }

        .whatsapp-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-heavy);
        }

        .whatsapp-btn.secondary {
          background: var(--cream);
          color: var(--text-dark);
          border: 2px solid var(--silver-light);
        }

        .whatsapp-btn.secondary:hover {
          background: var(--navy-primary);
          color: var(--white);
          border-color: var(--navy-primary);
        }

        .whatsapp-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none !important;
        }

        .custom-message {
          margin-top: 2rem;
        }

        .message-form {
          margin-top: 1rem;
        }

        .message-input-group {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .message-input {
          flex: 1;
          padding: 1rem;
          border: 2px solid var(--silver-light);
          border-radius: 25px;
          font-size: 1rem;
          transition: var(--transition-smooth);
          font-family: inherit;
        }

        .message-input:focus {
          outline: none;
          border-color: #25D366;
          box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.1);
        }

        .send-btn {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #25D366, #128C7E);
          color: var(--white);
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition: var(--transition-smooth);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .send-btn:hover:not(:disabled) {
          transform: scale(1.1);
          box-shadow: var(--shadow-medium);
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .whatsapp-benefits h4 {
          font-size: 1.5rem;
          margin-bottom: 2rem;
          color: var(--text-dark);
          text-align: center;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
        }

        .benefit-item {
          text-align: center;
          padding: 1.5rem;
          background: var(--cream);
          border-radius: 15px;
          transition: var(--transition-smooth);
        }

        .benefit-item:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-light);
        }

        .benefit-icon {
          font-size: 2rem;
          margin-bottom: 1rem;
        }

        .benefit-item h5 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: var(--text-dark);
        }

        .benefit-item p {
          font-size: 0.9rem;
          color: var(--text-light);
          margin: 0;
        }

        @media (max-width: 1024px) {
          .contact-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
        }

        @media (max-width: 768px) {
          .contact-container {
            gap: 2rem;
          }

          .whatsapp-contact-container {
            padding: 2rem;
          }

          .option-buttons {
            grid-template-columns: 1fr;
            gap: 0.8rem;
          }

          .message-input-group {
            flex-direction: column;
            gap: 1rem;
          }

          .send-btn {
            width: 100%;
            height: 50px;
            border-radius: 25px;
          }

          .benefits-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .contact-method {
            padding: 1rem;
          }

          .method-icon {
            width: 40px;
            height: 40px;
          }
        }

        @media (max-width: 480px) {
          .whatsapp-contact-container {
            padding: 1.5rem;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
          }

          .social-links {
            justify-content: center;
          }

          .whatsapp-btn {
            padding: 0.8rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  )
}

export default Contact
