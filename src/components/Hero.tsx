import { useEffect, useState } from 'react'
import { smoothScrollTo } from '../utils/smoothScroll'

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      title: "Welcome to Manivra Jewels",
      subtitle: "Your destination for stunning gold and diamond jewelry",
      description: "Discover our exquisite collection of handcrafted jewelry that embodies elegance, luxury, and timeless beauty.",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "Explore Collection"
    },
    {
      title: "Diamond Collection",
      subtitle: "Brilliant cuts that capture every ray of light",
      description: "Our master craftsmen create pieces that showcase the natural beauty and brilliance of the finest diamonds.",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "View Diamonds"
    },
    {
      title: "Gold Masterpieces",
      subtitle: "Timeless elegance in every piece",
      description: "From classic yellow gold to contemporary rose gold, our collection celebrates the enduring beauty of precious metals.",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      cta: "Shop Gold"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [heroSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section id="home" className="hero">
      <div className="hero-slider">
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="hero-overlay"></div>
            <div className="container">
              <div className="hero-content">
                <div className="hero-text">
                  <h1 className="hero-title animate-fadeInUp">
                    {slide.title}
                  </h1>
                  <h2 className="hero-subtitle animate-fadeInUp">
                    {slide.subtitle}
                  </h2>
                  <p className="hero-description animate-fadeInUp">
                    {slide.description}
                  </p>
                  <div className="hero-actions animate-fadeInUp">
                    <button 
                      className="btn-luxury"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        if (slide.cta === "Shop Gold") {
                          smoothScrollTo('categories')
                        } else if (slide.cta === "View Diamonds") {
                          smoothScrollTo('collections')
                        } else {
                          smoothScrollTo('collections')
                        }
                      }}
                    >
                      {slide.cta}
                    </button>
                    <button 
                      className="btn btn-secondary"
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        smoothScrollTo('about');
                      }}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button 
          className="hero-nav hero-nav-prev"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15,18 9,12 15,6"/>
          </svg>
        </button>
        <button 
          className="hero-nav hero-nav-next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6"/>
          </svg>
        </button>

        {/* Slide Indicators */}
        <div className="hero-indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`hero-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="hero-floating-elements">
        <div className="floating-diamond diamond-1"></div>
        <div className="floating-diamond diamond-2"></div>
        <div className="floating-diamond diamond-3"></div>
        <div className="floating-sparkle sparkle-1"></div>
        <div className="floating-sparkle sparkle-2"></div>
        <div className="floating-sparkle sparkle-3"></div>
      </div>

      <style>{`
        .hero {
          position: relative;
          height: 100vh;
          overflow: hidden;
        }

        .hero-slider {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .hero-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0;
          transition: opacity 1s ease-in-out;
          display: flex;
          align-items: center;
        }

        .hero-slide.active {
          opacity: 1;
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            rgba(26, 35, 126, 0.7) 0%,
            rgba(13, 20, 66, 0.8) 50%,
            rgba(26, 35, 126, 0.6) 100%
          );
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 600px;
          color: var(--white);
        }

        .hero-title {
          font-size: 4rem;
          font-weight: 700;
          margin-bottom: 1rem;
          line-height: 1.1;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .hero-subtitle {
          font-size: 1.5rem;
          font-weight: 400;
          margin-bottom: 1.5rem;
          color: var(--silver-light);
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
        }

        .hero-description {
          font-size: 1.1rem;
          margin-bottom: 2.5rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          max-width: 500px;
        }

        .hero-actions {
          display: flex;
          gap: 1.5rem;
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
          color: var(--white);
          border: 2px solid var(--white);
        }

        .btn-secondary:hover {
          background: var(--white);
          color: var(--navy-primary);
          transform: translateY(-2px);
        }

        .hero-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.1);
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: var(--white);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-smooth);
          backdrop-filter: blur(10px);
          z-index: 3;
        }

        .hero-nav:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: var(--gold-accent);
          transform: translateY(-50%) scale(1.1);
        }

        .hero-nav-prev {
          left: 2rem;
        }

        .hero-nav-next {
          right: 2rem;
        }

        .hero-indicators {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 0.5rem;
          z-index: 3;
        }

        .hero-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.5);
          background: transparent;
          cursor: pointer;
          transition: var(--transition-smooth);
        }

        .hero-indicator.active {
          background: var(--gold-accent);
          border-color: var(--gold-accent);
        }

        .hero-indicator:hover {
          border-color: var(--white);
          transform: scale(1.2);
        }

        .hero-floating-elements {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .floating-diamond {
          position: absolute;
          width: 20px;
          height: 20px;
          background: linear-gradient(45deg, var(--gold-accent), var(--silver-primary));
          clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
          animation: float 6s ease-in-out infinite;
        }

        .diamond-1 {
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .diamond-2 {
          top: 60%;
          right: 15%;
          animation-delay: 2s;
        }

        .diamond-3 {
          bottom: 30%;
          left: 20%;
          animation-delay: 4s;
        }

        .floating-sparkle {
          position: absolute;
          width: 8px;
          height: 8px;
          background: var(--white);
          border-radius: 50%;
          animation: sparkle 3s ease-in-out infinite;
        }

        .sparkle-1 {
          top: 30%;
          right: 20%;
          animation-delay: 1s;
        }

        .sparkle-2 {
          top: 70%;
          left: 15%;
          animation-delay: 3s;
        }

        .sparkle-3 {
          bottom: 20%;
          right: 30%;
          animation-delay: 5s;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
          }

          .hero-description {
            font-size: 1rem;
          }

          .hero-actions {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }

          .hero-nav {
            width: 40px;
            height: 40px;
          }

          .hero-nav-prev {
            left: 1rem;
          }

          .hero-nav-next {
            right: 1rem;
          }

          .hero-indicators {
            bottom: 1rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem;
          }

          .hero-subtitle {
            font-size: 1rem;
          }

          .hero-content {
            max-width: 100%;
            padding: 0 1rem;
          }
        }
      `}</style>
    </section>
  )
}

export default Hero
