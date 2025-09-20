import logo from '../assets/logo.png'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Story', href: '#about' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' }
    ],
    collections: [
      { name: 'Diamond Collection', href: '#collections' },
      { name: 'Gold Collection', href: '#collections' },
      { name: 'Pearl Collection', href: '#collections' },
      { name: 'Custom Design', href: '#' }
    ],
    services: [
      { name: 'Jewelry Repair', href: '#' },
      { name: 'Custom Design', href: '#' },
      { name: 'Appraisal', href: '#' },
      { name: 'Insurance', href: '#' }
    ],
    support: [
      { name: 'Contact Us', href: '#contact' },
      { name: 'FAQ', href: '#' },
      { name: 'Shipping Info', href: '#' },
      { name: 'Returns', href: '#' }
    ]
  }

  const socialLinks = [
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      href: '#',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    }
  ]

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="footer-logo">
              <img src={logo} alt="Manivra Jewels" />
            </div>
            <p className="footer-description">
              Crafting exceptional jewelry for over three decades. Each piece tells a story of elegance, 
              luxury, and timeless beauty that will be treasured for generations.
            </p>
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="social-link"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="footer-links">
            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4>Collections</h4>
              <ul>
                {footerLinks.collections.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4>Services</h4>
              <ul>
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="footer-newsletter">
          <div className="newsletter-content">
            <h4>Stay Updated</h4>
            <p>Subscribe to our newsletter for the latest collections, exclusive offers, and jewelry care tips.</p>
          </div>
          <div className="newsletter-form">
            <form className="subscribe-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="footer-copyright">
              <p>&copy; {currentYear} Manivra Jewels. All rights reserved.</p>
            </div>
            <div className="footer-legal">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: linear-gradient(135deg, var(--navy-dark), var(--navy-primary));
          color: var(--white);
          padding: 4rem 0 0;
        }

        .footer-main {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 4rem;
          margin-bottom: 3rem;
        }

        .footer-brand {
          max-width: 400px;
        }

        .footer-logo img {
          height: 60px;
          width: auto;
          margin-bottom: 1.5rem;
        }

        .footer-description {
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 2rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .footer-social {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          width: 45px;
          height: 45px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          transition: var(--transition-smooth);
          backdrop-filter: blur(10px);
        }

        .social-link:hover {
          transform: translateY(-2px);
          backdrop-filter: blur(15px);
        }

        .social-link:nth-child(1) {
          background: rgba(24, 119, 242, 0.8); /* Facebook Blue with transparency */
        }

        .social-link:nth-child(1):hover {
          background: rgba(24, 119, 242, 1);
        }

        .social-link:nth-child(2) {
          background: linear-gradient(45deg, rgba(240, 148, 51, 0.8) 0%, rgba(230, 104, 60, 0.8) 25%, rgba(220, 39, 67, 0.8) 50%, rgba(204, 35, 102, 0.8) 75%, rgba(188, 24, 136, 0.8) 100%); /* Instagram Gradient with transparency */
        }

        .social-link:nth-child(2):hover {
          background: linear-gradient(45deg, rgba(240, 148, 51, 1) 0%, rgba(230, 104, 60, 1) 25%, rgba(220, 39, 67, 1) 50%, rgba(204, 35, 102, 1) 75%, rgba(188, 24, 136, 1) 100%);
        }

        .social-link:nth-child(3) {
          background: rgba(29, 161, 242, 0.8); /* Twitter Blue with transparency */
        }

        .social-link:nth-child(3):hover {
          background: rgba(29, 161, 242, 1);
        }

        .social-link:nth-child(4) {
          background: rgba(0, 119, 181, 0.8); /* LinkedIn Blue with transparency */
        }

        .social-link:nth-child(4):hover {
          background: rgba(0, 119, 181, 1);
        }

        .social-link:nth-child(5) {
          background: rgba(255, 0, 0, 0.8); /* YouTube Red with transparency */
        }

        .social-link:nth-child(5):hover {
          background: rgba(255, 0, 0, 1);
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
        }

        .footer-column h4 {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          color: var(--white);
        }

        .footer-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-column li {
          margin-bottom: 0.8rem;
        }

        .footer-column a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: var(--transition-smooth);
          font-size: 0.95rem;
        }

        .footer-column a:hover {
          color: var(--gold-accent);
        }

        .footer-newsletter {
          background: rgba(255, 255, 255, 0.05);
          padding: 2rem;
          border-radius: 15px;
          margin-bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .newsletter-content h4 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          color: var(--white);
        }

        .newsletter-content p {
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        .subscribe-form {
          display: flex;
          gap: 1rem;
          min-width: 300px;
        }

        .newsletter-input {
          flex: 1;
          padding: 0.8rem 1rem;
          border: 2px solid rgba(255, 255, 255, 0.2);
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.1);
          color: var(--white);
          font-size: 0.95rem;
          transition: var(--transition-smooth);
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .newsletter-input:focus {
          outline: none;
          border-color: var(--gold-accent);
          background: rgba(255, 255, 255, 0.15);
        }

        .newsletter-btn {
          padding: 0.8rem 2rem;
          background: linear-gradient(135deg, var(--gold-accent), #f4d03f);
          color: var(--white);
          border: none;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-smooth);
          white-space: nowrap;
        }

        .newsletter-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-medium);
        }

        .footer-bottom {
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem 0;
        }

        .footer-bottom-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-copyright p {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
        }

        .footer-legal {
          display: flex;
          gap: 2rem;
        }

        .footer-legal a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.9rem;
          transition: var(--transition-smooth);
        }

        .footer-legal a:hover {
          color: var(--gold-accent);
        }

        @media (max-width: 1024px) {
          .footer-main {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .footer-links {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .footer {
            padding: 3rem 0 0;
          }

          .footer-links {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-newsletter {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
          }

          .subscribe-form {
            width: 100%;
            max-width: 400px;
          }

          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }

          .footer-legal {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .footer-newsletter {
            padding: 1.5rem;
          }

          .subscribe-form {
            flex-direction: column;
            gap: 1rem;
          }

          .newsletter-btn {
            width: 100%;
          }

          .footer-legal {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer
