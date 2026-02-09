import { FaArrowRight } from 'react-icons/fa';

interface FooterBannerProps {
  className?: string;
}

const FooterBanner = ({ className = '' }: FooterBannerProps) => {
  return (
    <div className={`relative w-full min-h-[400px] flex items-center justify-center ${className}`}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover"
        style={{
          backgroundImage: 'url(/images/whisk.png)',
          filter: 'brightness(0.4) contrast(1.1) saturate(0.8)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
        <div className="text-white text-lg md:text-xl font-light mb-3">
          Expert Herbal Guidance, Naturally
        </div>
        
        <h1 className="text-white text-xl md:text-2xl lg:text-3xl font-bold leading-tight mb-4">
          Discover trusted Ayurvedic and herbal solutions
        </h1>
        
        <p className="text-white text-sm md:text-base opacity-90 leading-relaxed mb-6 max-w-2xl mx-auto">
          Discover trusted Ayurvedic and herbal solutions carefully crafted to support your health and wellness. 
          Each product is made using time-tested ingredients and expert knowledge, helping you choose the right remedy for your everyday needs.
        </p>
        
        {/* Shop Now Button - Using a form instead of button with onClick */}
        <form action="/shop" method="get">
          <button
            type="submit"
            className="me-bgcolor-y flex items-center justify-center gap-4 font-bold text-white uppercase tracking-wide 
                     mx-auto rounded-[50px] hover:opacity-90 transition-opacity duration-300"
            style={{
              width: '175px',
              height: '59px',
              paddingTop: '16px',
              paddingRight: '24px',
              paddingBottom: '16px',
              paddingLeft: '24px',
              gap: '16px',
              border: 'none',
              outline: 'none'
            }}
            aria-label="Shop Now"
          >
            <span className="text-sm">Shop Now</span>
            <FaArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default FooterBanner;