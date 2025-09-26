
'use client';

import { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faStar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function PremiumTestimonialSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [testimonialsPerView, setTestimonialsPerView] = useState(3);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "CEO, TechInnovate",
      company: "Enterprise Client",
      image: "/api/placeholder/80/80",
      content: "This platform has revolutionized how we manage our healthcare operations. The AI-driven insights have improved our efficiency by 40% while maintaining the highest security standards.",
      rating: 5,
      since: "2 years"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "CTO, HealthFlow",
      company: "Healthcare Partner",
      image: "/api/placeholder/80/80",
      content: "The seamless integration and real-time analytics have transformed our patient care delivery. Our team collaboration has never been more efficient.",
      rating: 5,
      since: "18 months"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Medical Director",
      company: "City Hospital Network",
      image: "/api/placeholder/80/80",
      content: "Outstanding platform that combines cutting-edge technology with user-friendly design. Our staff adoption rate was 95% within the first month.",
      rating: 5,
      since: "3 years"
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Head of Operations",
      company: "MediCare Solutions",
      image: "/api/placeholder/80/80",
      content: "The predictive analytics and automated reporting have saved us countless hours. Customer support is exceptional and always available.",
      rating: 5,
      since: "1 year"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Healthcare Consultant",
      company: "Global Health Partners",
      image: "/api/placeholder/80/80",
      content: "A game-changer in healthcare technology. The platform's scalability and reliability make it perfect for organizations of any size.",
      rating: 5,
      since: "2.5 years"
    },
    {
      id: 6,
      name: "Robert Martinez",
      role: "IT Director",
      company: "Unity Health System",
      image: "/api/placeholder/80/80",
      content: "Implementation was smooth and the ROI was evident within weeks. The continuous updates and feature enhancements keep us ahead of the curve.",
      rating: 5,
      since: "9 months"
    }
  ];

  // Handle responsive layout
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setTestimonialsPerView(1);
      } else if (window.innerWidth < 1024) {
        setTestimonialsPerView(2);
      } else {
        setTestimonialsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // removed misplaced import

  // Auto-slide functionality
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => 
      prev >= testimonials.length - testimonialsPerView ? 0 : prev + 1
    );
  }, [testimonials.length, testimonialsPerView]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => 
      prev <= 0 ? testimonials.length - testimonialsPerView : prev - 1
    );
  }, [testimonials.length, testimonialsPerView]);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying, nextSlide]);


  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };


  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        .testimonial-section {
          background: linear-gradient(135deg, 
            rgba(248, 250, 252, 0.95) 0%, 
            rgba(241, 245, 249, 0.9) 100%);
          backdrop-filter: blur(10px);
        }

        .testimonial-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            0 0 0 1px rgba(255, 255, 255, 0.1);
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .testimonial-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 
            0 30px 60px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.9),
            0 0 40px rgba(14, 165, 233, 0.15);
        }

        .quote-icon {
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          box-shadow: 0 10px 30px rgba(14, 165, 233, 0.3);
        }

        .nav-button {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .nav-button:hover {
          transform: scale(1.1);
          box-shadow: 
            0 20px 40px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.95);
        }

        .nav-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .pagination-dot {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          background: rgba(203, 213, 225, 0.6);
        }

        .pagination-dot.active {
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          transform: scale(1.2);
          box-shadow: 0 4px 15px rgba(14, 165, 233, 0.3);
        }

        .pagination-dot:hover {
          background: rgba(14, 165, 233, 0.8);
          transform: scale(1.1);
        }

        .star-rating {
          color: #fbbf24;
          text-shadow: 0 2px 10px rgba(251, 191, 36, 0.3);
        }

        .client-avatar {
          background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
          box-shadow: 
            0 8px 25px rgba(14, 165, 233, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        .section-title {
          background: linear-gradient(135deg, #1e293b 0%, #475569 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-subtitle {
          background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .slide-transition {
          transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>

      <section 
        className="testimonial-section py-24 relative overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(14,165,233,0.1)_1px,transparent_0)] bg-[length:60px_60px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-200 mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700 font-inter uppercase tracking-wide">CLIENT TESTIMONIALS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-inter section-title">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-inter section-subtitle font-medium">
              Discover why healthcare organizations worldwide choose our platform for their digital transformation
            </p>
          </div>

          {/* Slider Container */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="nav-button absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center text-gray-700 hover:text-blue-600 disabled:hover:text-gray-700"
              title="Previous testimonials"
              aria-label="Previous testimonials"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
            </button>

            <button
              onClick={nextSlide}
              disabled={currentSlide >= testimonials.length - testimonialsPerView}
              className="nav-button absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full flex items-center justify-center text-gray-700 hover:text-blue-600 disabled:hover:text-gray-700"
              title="Next testimonials"
              aria-label="Next testimonials"
            >
              <FontAwesomeIcon icon={faChevronRight} className="text-lg" />
            </button>

            {/* Testimonials Grid */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-out gap-6"
                style={{ transform: `translateX(-${currentSlide * (100 / testimonialsPerView)}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="flex-shrink-0 testimonial-card rounded-3xl p-8 fade-in"
                    style={{ width: `calc(${100 / testimonialsPerView}% - 1rem)` }}
                  >
                    {/* Quote Icon */}
                    <div className="quote-icon w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                      <FontAwesomeIcon icon={faQuoteLeft} className="text-white text-sm" />
                    </div>

                    {/* Rating */}
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FontAwesomeIcon 
                          key={i} 
                          icon={faStar} 
                          className="star-rating text-lg mr-1" 
                        />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-gray-700 leading-relaxed mb-6 font-inter text-lg">
                      &quot;{testimonial.content}&quot;
                    </p>

                    {/* Client Info */}
                    <div className="flex items-center space-x-4">
                      <div className="client-avatar w-16 h-16 rounded-2xl flex items-center justify-center">
                        <span className="text-white font-bold text-xl font-inter">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg font-inter">{testimonial.name}</h4>
                        <p className="text-gray-600 font-inter">{testimonial.role}</p>
                        <p className="text-sm text-gray-500 font-inter">{testimonial.company} • {testimonial.since}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center space-x-3 mt-12">
            {Array.from({ length: testimonials.length - testimonialsPerView + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`pagination-dot w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'active' : ''
                }`}
                title={`Go to slide ${index + 1}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Progress Indicator */}
          {/* <div className="max-w-md mx-auto mt-8">
            <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                style={{ 
                  width: `${((currentSlide + 1) / (testimonials.length - testimonialsPerView + 1)) * 100}%` 
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2 font-inter">
              <span>Slide {currentSlide + 1}</span>
              <span>{testimonials.length - testimonialsPerView + 1} total</span>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}