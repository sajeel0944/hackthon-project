// components/Hero.jsx
'use client';

interface HeroProps {
  title: string;
  subTitle: string;
  description: string;
}

export default function Hero({ title, subTitle, description }: HeroProps) {
  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        
        .hero-gradient {
          background: linear-gradient(135deg, 
            #0c4a6e 0%, 
            #075985 25%, 
            #0369a1 50%, 
            #0284c7 75%, 
            #0ea5e9 100%);
          position: relative;
          overflow: hidden;
        }

        .hero-gradient::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 80%, rgba(14, 165, 233, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(2, 132, 199, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.02); }
        }

        .badge-glow {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 8px 32px rgba(2, 132, 199, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          animation: badge-pulse 2s ease-in-out infinite;
        }

        @keyframes badge-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 8px 32px rgba(2, 132, 199, 0.3); }
          50% { transform: scale(1.05); box-shadow: 0 12px 40px rgba(2, 132, 199, 0.5); }
        }

        .text-glow {
          text-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
        }

        .font-inter {
          font-family: 'Inter', sans-serif;
        }

        .hero-content {
          position: relative;
          z-index: 10;
        }

        .gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .dark .gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #bae6fd 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <div className="hero-gradient min-h-screen flex items-center justify-center relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-sky-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-bounce delay-500"></div>
        </div>

        <div className="container mx-auto px-4 py-20">
          <div className="hero-content text-center max-w-6xl mx-auto">
            {/* Premium Badge */}
            <div className="inline-flex items-center justify-center mb-8">
              <div className="badge-glow text-white px-6 py-3 rounded-full text-sm font-semibold tracking-wide uppercase font-inter">
                <span className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span>{title}</span>
                </span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight tracking-tight font-inter text-glow">
              <span className="gradient-text">{subTitle}</span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-4xl mx-auto mb-12 font-inter font-light opacity-90">
              {description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="group relative bg-white text-blue-900 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl font-inter">
                <span className="relative z-10 flex items-center space-x-2">
                  <span>Get Started</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white to-blue-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button className="group relative border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white/10 hover:scale-105 backdrop-blur-sm font-inter">
                <span className="relative z-10 flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Watch Demo</span>
                </span>
              </button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2 font-inter">99.9%</div>
                <div className="text-blue-200 text-sm font-medium">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2 font-inter">24/7</div>
                <div className="text-blue-200 text-sm font-medium">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2 font-inter">10K+</div>
                <div className="text-blue-200 text-sm font-medium">Clients</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}