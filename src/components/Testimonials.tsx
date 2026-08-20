import { useEffect, useState } from 'react'
import chhaviImg from '../assets/chhavi.png'
import guptaImg from '../assets/gupta.png'
import kushImg from '../assets/kush.png'
import sakshiImg from '../assets/sakshi.png'
import sanviImg from '../assets/sanvi.png'

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Bride",
      location: "Delhi, India",
      image: sanviImg,
      rating: 5,
      text: "My engagement ring from Manivra Jewels is absolutely stunning. The craftsmanship is exceptional, and the diamond sparkles like nothing I've ever seen. Every time I look at it, I'm reminded of our special day.",
      product: "Eternal Diamond Ring"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Husband",
      location: "Chandigarh, India",
      image: guptaImg,
      rating: 5,
      text: "I've been a customer for over 10 years, and Manivra Jewels never disappoints. Their attention to detail and customer service is outstanding. The gold chain I bought for my wife's birthday is still as beautiful as the day I bought it.",
      product: "Classic Gold Chain"
    },
    {
      id: 3,
      name: "Kavita Singh",
      role: "Fashion Designer",
      location: "Jaipur, India",
      image: sakshiImg,
      rating: 5,
      text: "As a fashion designer, I'm very particular about quality and design. Manivra Jewels exceeds my expectations every time. Their pearl earrings are the perfect finishing touch to any elegant outfit.",
      product: "Pearl Drop Earrings"
    },
    {
      id: 4,
      name: "Amit Gupta",
      role: "Business Executive",
      location: "Gurgaon, India",
      image: kushImg,
      rating: 5,
      text: "The luxury watch I purchased from Manivra Jewels is not just a timepiece, it's a work of art. The combination of traditional craftsmanship and modern design is simply perfect. Highly recommended!",
      product: "Luxury Gold Watch"
    },
    {
      id: 5,
      name: "Sunita Agarwal",
      role: "Doctor",
      location: "Lucknow, India",
      image: chhaviImg,
      rating: 5,
      text: "I bought a diamond tennis bracelet for my mother's 60th birthday, and she absolutely loves it! The quality is exceptional, and the customer service team was incredibly helpful throughout the entire process.",
      product: "Diamond Tennis Bracelet"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={index < rating ? "#d4af37" : "#e0e0e0"}
        stroke={index < rating ? "#d4af37" : "#e0e0e0"}
        strokeWidth="2"
      >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))
  }

  return (
    <section className="section section-bg-dark">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title" style={{ color: 'var(--white)' }}>What Our Customers Say</h2>
          <p className="section-subtitle" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Discover why thousands of customers trust Manivra Jewels for their most precious moments
          </p>
        </div>

        <div className="testimonials-container">
          <div className="testimonial-slider">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="testimonial-rating">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>
                
                <blockquote className="testimonial-text">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>

                <div className="testimonial-product">
                  <span className="product-label">Featured Product:</span>
                  <span className="product-name">{testimonials[currentTestimonial].product}</span>
                </div>

                <div className="testimonial-author">
                  <div className="author-image">
                    <img 
                      src={testimonials[currentTestimonial].image} 
                      alt={testimonials[currentTestimonial].name}
                    />
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">{testimonials[currentTestimonial].name}</h4>
                    <p className="author-role">{testimonials[currentTestimonial].role}</p>
                    <p className="author-location">{testimonials[currentTestimonial].location}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              className="testimonial-nav testimonial-nav-prev"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15,18 9,12 15,6"/>
              </svg>
            </button>
            <button 
              className="testimonial-nav testimonial-nav-next"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="testimonial-dots">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.id}
                  className={`testimonial-dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => goToTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="testimonial-stats">
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Customer Satisfaction</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4.9/5</div>
              <div className="stat-label">Average Rating</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50K+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .testimonials-container {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
        }

        .testimonial-slider {
          position: relative;
          background: var(--white);
          border-radius: 20px;
          padding: 3rem;
          box-shadow: var(--shadow-heavy);
          margin-bottom: 3rem;
        }

        .testimonial-card {
          text-align: center;
        }

        .testimonial-rating {
          display: flex;
          justify-content: center;
          gap: 0.2rem;
          margin-bottom: 2rem;
        }

        .testimonial-text {
          font-size: 1.3rem;
          line-height: 1.7;
          color: var(--text-dark);
          margin-bottom: 2rem;
          font-style: italic;
          position: relative;
        }

        .testimonial-text::before {
          content: '"';
          font-size: 4rem;
          color: var(--navy-primary);
          position: absolute;
          top: -1rem;
          left: -2rem;
          font-family: serif;
        }

        .testimonial-text::after {
          content: '"';
          font-size: 4rem;
          color: var(--navy-primary);
          position: absolute;
          bottom: -2rem;
          right: -2rem;
          font-family: serif;
        }

        .testimonial-product {
          background: var(--cream);
          padding: 1rem 1.5rem;
          border-radius: 50px;
          display: inline-block;
          margin-bottom: 2rem;
        }

        .product-label {
          font-size: 0.9rem;
          color: var(--text-light);
          margin-right: 0.5rem;
        }

        .product-name {
          font-weight: 600;
          color: var(--navy-primary);
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .author-image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid var(--navy-primary);
        }

        .author-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .author-info {
          text-align: left;
        }

        .author-name {
          font-size: 1.2rem;
          color: var(--text-dark);
          margin-bottom: 0.2rem;
        }

        .author-role {
          color: var(--navy-primary);
          font-weight: 600;
          margin-bottom: 0.2rem;
        }

        .author-location {
          color: var(--text-light);
          font-size: 0.9rem;
        }

        .testimonial-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: var(--navy-primary);
          color: var(--white);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-smooth);
          border: none;
          z-index: 2;
        }

        .testimonial-nav:hover {
          background: var(--navy-light);
          transform: translateY(-50%) scale(1.1);
        }

        .testimonial-nav-prev {
          left: -25px;
        }

        .testimonial-nav-next {
          right: -25px;
        }

        .testimonial-dots {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          margin-top: 2rem;
        }

        .testimonial-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid var(--white);
          background: transparent;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .testimonial-dot.active {
          background: var(--gold-accent);
          border-color: var(--gold-accent);
        }

        .testimonial-dot:hover {
          border-color: var(--gold-accent);
          transform: scale(1.2);
        }

        .testimonial-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          text-align: center;
        }

        .stat-item {
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 15px;
          backdrop-filter: blur(10px);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--gold-accent);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: var(--white);
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .testimonial-slider {
            padding: 2rem;
            margin: 0 1rem 3rem;
          }

          .testimonial-text {
            font-size: 1.1rem;
          }

          .testimonial-text::before,
          .testimonial-text::after {
            font-size: 3rem;
          }

          .testimonial-text::before {
            left: -1rem;
          }

          .testimonial-text::after {
            right: -1rem;
          }

          .testimonial-nav {
            width: 40px;
            height: 40px;
          }

          .testimonial-nav-prev {
            left: -20px;
          }

          .testimonial-nav-next {
            right: -20px;
          }

          .testimonial-author {
            flex-direction: column;
            text-align: center;
          }

          .author-info {
            text-align: center;
          }

          .testimonial-stats {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .testimonial-slider {
            padding: 1.5rem;
          }

          .testimonial-text {
            font-size: 1rem;
          }

          .testimonial-nav {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}

export default Testimonials
