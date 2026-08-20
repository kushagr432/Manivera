import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'
import { adminPath, showAdminLinkInHeader } from '../config/env'
import { smoothScrollTo } from '../utils/smoothScroll'

interface NavItem {
  name: string
  href: string
  onClick?: () => void
  external?: boolean
}

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems: NavItem[] = [
    { name: 'Home', href: '#home', onClick: () => smoothScrollTo('home') },
    { name: 'Collections', href: '#collections', onClick: () => smoothScrollTo('collections') },
    { name: 'Categories', href: '#categories', onClick: () => smoothScrollTo('categories') },
    { name: 'About Us', href: '#about', onClick: () => smoothScrollTo('about') },
    { name: 'Contact', href: '#contact', onClick: () => smoothScrollTo('contact') },
    // Admin entry point; hide it in production with VITE_SHOW_ADMIN_LINK=false
    ...(showAdminLinkInHeader
      ? [{ name: 'Admin', href: adminPath(), external: true }]
      : [])
  ]

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <div className="logo">
            <img src={logo} alt="Manivra Jewels" />
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <ul className="nav-list">
              {navItems.map((item) => (
                <li key={item.name} className="nav-item">
                  <a 
                    href={item.href} 
                    className="nav-link"
                    onClick={(e) => {
                      if (!item.external && item.onClick) {
                        e.preventDefault()
                        item.onClick()
                      }
                      setIsMobileMenuOpen(false)
                    }}
                    {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Action Buttons */}
          <div className="header-actions">
            <button className="btn-icon" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <button className="btn-icon" aria-label="Wishlist">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <button className="btn-icon" aria-label="Shopping Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`nav-mobile ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul className="nav-list-mobile">
            {navItems.map((item) => (
              <li key={item.name} className="nav-item-mobile">
                <a 
                  href={item.href} 
                  className="nav-link-mobile"
                  onClick={(e) => {
                    if (!item.external && item.onClick) {
                      e.preventDefault()
                      item.onClick()
                    }
                    setIsMobileMenuOpen(false)
                  }}
                  {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <style>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(26, 35, 126, 0.1);
          transition: var(--transition-smooth);
        }

        .header.scrolled {
          background: rgba(255, 255, 255, 0.98);
          box-shadow: var(--shadow-light);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
        }

        .logo img {
          height: 50px;
          width: auto;
        }

        .nav-desktop {
          display: flex;
        }

        .nav-list {
          display: flex;
          list-style: none;
          gap: 2rem;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          font-weight: 500;
          color: var(--text-dark);
          text-decoration: none;
          transition: var(--transition-smooth);
          position: relative;
        }

        .nav-link:hover {
          color: var(--navy-primary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--navy-primary);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .btn-icon {
          background: none;
          border: none;
          color: var(--text-dark);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: var(--transition-smooth);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-icon:hover {
          background: var(--navy-primary);
          color: var(--white);
          transform: translateY(-2px);
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
        }

        .hamburger {
          display: flex;
          flex-direction: column;
          width: 25px;
          height: 20px;
          position: relative;
        }

        .hamburger span {
          display: block;
          height: 2px;
          width: 100%;
          background: var(--text-dark);
          border-radius: 1px;
          transition: var(--transition-smooth);
          transform-origin: center;
        }

        .hamburger span:not(:last-child) {
          margin-bottom: 4px;
        }

        .hamburger.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.active span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.active span:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -6px);
        }

        .nav-mobile {
          display: none;
          background: var(--white);
          border-top: 1px solid rgba(26, 35, 126, 0.1);
          padding: 1rem 0;
        }

        .nav-mobile.active {
          display: block;
        }

        .nav-list-mobile {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item-mobile {
          border-bottom: 1px solid rgba(26, 35, 126, 0.1);
        }

        .nav-link-mobile {
          display: block;
          padding: 1rem 0;
          color: var(--text-dark);
          text-decoration: none;
          font-weight: 500;
          transition: var(--transition-smooth);
        }

        .nav-link-mobile:hover {
          color: var(--navy-primary);
          padding-left: 1rem;
        }

        @media (max-width: 768px) {
          .nav-desktop {
            display: none;
          }

          .mobile-menu-btn {
            display: block;
          }

          .header-actions {
            gap: 0.5rem;
          }

          .btn-icon {
            padding: 0.3rem;
          }
        }
      `}</style>
    </header>
  )
}

export default Header
