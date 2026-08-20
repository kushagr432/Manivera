import { useState } from 'react'
import chaitanyaImg from '../assets/chanto.png'
import rishabhImg from '../assets/rishabh.png'
import saurabhImg from '../assets/saurabh.png'
import { smoothScrollTo } from '../utils/smoothScroll'
const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('story')

  const tabs = [
    { id: 'story', label: 'Our Story', icon: '📖' },
    { id: 'craftsmanship', label: 'Craftsmanship', icon: '🔨' },
    { id: 'values', label: 'Our Values', icon: '💎' }
  ]

  const tabContent = {
    story: {
      title: "A Legacy of Excellence",
      content: "For over a decades, Manivra Jewels has been crafting exceptional jewelry that tells stories of love, celebration, and timeless elegance. Founded by master craftsman Chaitanya Jain, our brand has grown from a small workshop to a globally recognized name in luxury jewelry.",
      highlights: [
        "Founded in 1990 by master craftsman Saurabh Jain",
        "Over 30 years of jewelry expertise",
        "Handcrafted pieces using traditional techniques",
        "Globally recognized for quality and design"
      ],
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    craftsmanship: {
      title: "Masterful Craftsmanship",
      content: "Every piece in our collection is meticulously crafted by skilled artisans who have dedicated their lives to perfecting the art of jewelry making. We combine traditional techniques with modern innovation to create pieces that are both timeless and contemporary.",
      highlights: [
        "Hand-selected precious stones and metals",
        "Traditional handcrafting techniques",
        "Modern design innovation",
        "Rigorous quality control standards"
      ],
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    },
    values: {
      title: "Our Core Values",
      content: "At Manivra Jewels, we believe that jewelry is more than just an accessory – it's a symbol of love, commitment, and personal expression. Our values guide everything we do, from sourcing materials to crafting each piece.",
      highlights: [
        "Ethical sourcing of all materials",
        "Commitment to environmental responsibility",
        "Supporting local artisan communities",
        "Creating pieces that last generations"
      ],
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
    }
  }

  const stats = [
    { number: "10+", label: "Years of Excellence" },
    { number: "10K+", label: "Happy Customers" },
    { number: "1000+", label: "Unique Designs" },
    { number: "15+", label: "Countries Served" }
  ]

  return (
    <section id="about" className="section section-bg-pattern">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About Manivra Jewels</h2>
          <p className="section-subtitle">
            Discover the passion, craftsmanship, and values that make us a trusted name in luxury jewelry
          </p>
        </div>

        {/* Stats Section */}
        <div className="stats-section">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label" style={{color: 'var(--navy-primary)'}}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabbed Content */}
        <div className="about-content">
          <div className="about-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`about-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="about-tab-content">
            <div className="tab-content-wrapper">
              <div className="tab-text">
                <h3>{tabContent[activeTab as keyof typeof tabContent].title}</h3>
                <p>{tabContent[activeTab as keyof typeof tabContent].content}</p>
                
                <div className="highlights">
                  {tabContent[activeTab as keyof typeof tabContent].highlights.map((highlight, index) => (
                    <div key={index} className="highlight-item">
                      <div className="highlight-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20,6 9,17 4,12"/>
                        </svg>
                      </div>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                <div className="tab-actions">
                  <button 
                    className="btn-luxury"
                    onClick={() => smoothScrollTo('collections')}
                  >
                    Explore Our Collection
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => smoothScrollTo('contact')}
                  >
                    Get in Touch
                  </button>
                </div>
              </div>

              <div className="tab-image">
                <img 
                  src={tabContent[activeTab as keyof typeof tabContent].image} 
                  alt={tabContent[activeTab as keyof typeof tabContent].title}
                />
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h4>Handcrafted Excellence</h4>
                    <p>Every piece tells a story</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h3 className="text-center mb-4">Meet Our Master Craftsmen</h3>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src={saurabhImg} alt="Rajesh Manivra" />
              </div>
              <div className="member-info">
                <h4>Saurabh Jain</h4>
                <p className="member-role">Founder & Master Craftsman</p>
                <p className="member-bio">With over 10 years of experience, Saurabh Jain leads our design team and ensures every piece meets our exacting standards.</p>
              </div>
            </div>

            <div className="team-member">
              <div className="member-image">
                <img src={chaitanyaImg} alt="Kavita Singh" />
              </div>
              <div className="member-info">
                <h4>Chaitany Jain</h4>
                <p className="member-role">Head of Design</p>
                <p className="member-bio">Chaitanya brings modern design sensibilities to our traditional craftsmanship, creating pieces that appeal to contemporary tastes.</p>
              </div>
            </div>

            <div className="team-member">
              <div className="member-image">
                <img src={rishabhImg} alt="Amit Patel" />
              </div>
              <div className="member-info">
                <h4>Rishabh Jain</h4>
                <p className="member-role">Master Gemologist</p>
                <p className="member-bio">Rishabh ensures that only the finest gems make it into our collections, with his expert eye for quality and authenticity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .stats-section {
          margin: 4rem 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .stat-item {
          text-align: center;
          padding: 2rem;
          background: var(--white);
          border-radius: 15px;
          box-shadow: var(--shadow-light);
          transition: var(--transition-smooth);
        }

        .stat-item:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-medium);
          color: var(--navy-primary);
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 700;
          color: var(--navy-primary);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--navy-primary);
        }

        .about-content {
          margin: 4rem 0;
        }

        .about-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .about-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          background: var(--white);
          border: 2px solid var(--silver-light);
          border-radius: 50px;
          cursor: pointer;
          transition: var(--transition-smooth);
          font-weight: 500;
          color: var(--text-dark);
        }

        .about-tab:hover {
          border-color: var(--navy-primary);
          transform: translateY(-2px);
        }

        .about-tab.active {
          background: linear-gradient(135deg, var(--navy-primary), var(--navy-light));
          border-color: var(--navy-primary);
          color: var(--white);
        }

        .tab-icon {
          font-size: 1.2rem;
        }

        .tab-content-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .tab-text h3 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: var(--text-dark);
        }

        .tab-text p {
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 2rem;
          color: var(--text-light);
        }

        .highlights {
          margin-bottom: 2rem;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .highlight-icon {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, var(--navy-primary), var(--navy-light));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--white);
          flex-shrink: 0;
        }

        .highlight-item span {
          color: var(--text-dark);
          font-weight: 500;
        }

        .tab-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .btn-luxury {
          background: linear-gradient(135deg, var(--navy-primary), var(--navy-light));
          color: var(--white);
          border: none;
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 1.1rem;
          cursor: pointer;
          transition: var(--transition-smooth);
          text-decoration: none;
          display: inline-block;
          box-shadow: var(--shadow-medium);
        }

        .btn-luxury:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-heavy);
          background: linear-gradient(135deg, var(--navy-light), var(--navy-primary));
        }

        .btn {
          padding: 1rem 2rem;
          border-radius: 50px;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: var(--transition-smooth);
          text-decoration: none;
          display: inline-block;
        }

        .btn-secondary {
          background: transparent;
          color: var(--navy-primary);
          border: 2px solid var(--navy-primary);
        }

        .btn-secondary:hover {
          background: var(--navy-primary);
          color: var(--white);
          transform: translateY(-2px);
        }

        .tab-image {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: var(--shadow-medium);
        }

        .tab-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          transition: var(--transition-smooth);
        }

        .image-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(26, 35, 126, 0.8) 0%,
            rgba(13, 20, 66, 0.6) 100%
          );
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: var(--transition-smooth);
        }

        .tab-image:hover .image-overlay {
          opacity: 1;
        }

        .tab-image:hover img {
          transform: scale(1.05);
        }

        .overlay-content {
          text-align: center;
          color: var(--white);
        }

        .overlay-content h4 {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }

        .team-section {
          margin: 4rem 0;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .team-member {
          background: var(--white);
          border-radius: 20px;
          padding: 2rem;
          text-align: center;
          box-shadow: var(--shadow-light);
          transition: var(--transition-smooth);
        }

        .team-member:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-medium);
        }

        .member-image {
          width: 120px;
          height: 120px;
          margin: 0 auto 1.5rem;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid var(--silver-light);
        }

        .member-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .member-info h4 {
          font-size: 1.3rem;
          margin-bottom: 0.5rem;
          color: var(--text-dark);
        }

        .member-role {
          color: var(--navy-primary);
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .member-bio {
          color: var(--text-light);
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .tab-content-wrapper {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .tab-image img {
            height: 300px;
          }

          .about-tabs {
            gap: 0.5rem;
          }

          .about-tab {
            padding: 0.8rem 1.5rem;
            font-size: 0.9rem;
          }

          .tab-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .stat-number {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .team-grid {
            grid-template-columns: 1fr;
          }

          .about-tab {
            padding: 0.6rem 1rem;
          }

          .tab-label {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}

export default AboutUs
