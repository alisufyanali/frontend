// Desktop/components/footer/ContactInfo.tsx
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';

interface SocialMediaItem {
  name: string;
  icon: React.ReactNode;
  url: string;
}

interface ContactInfoProps {
  textStyle: React.CSSProperties;
  buttonColor: string;
  email?: string;
  phone?: string;
  socialMedia?: SocialMediaItem[];
  logoUrl?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
}

const defaultSocialMedia: SocialMediaItem[] = [
  { 
    name: 'Facebook', 
    icon: <FaFacebook className="w-5 h-5" />, // Increased icon size
    url: 'https://facebook.com'
  },
  { 
    name: 'X', 
    icon: <FaTwitter className="w-5 h-5" />, // Increased icon size
    url: 'https://twitter.com'
  },
  { 
    name: 'YouTube', 
    icon: <FaYoutube className="w-5 h-5" />, // Increased icon size
    url: 'https://youtube.com'
  },
  { 
    name: 'Instagram', 
    icon: <FaInstagram className="w-5 h-5" />, // Increased icon size
    url: 'https://instagram.com'
  }
];

export default function ContactInfo({ 
  textStyle, 
  buttonColor, 
  email = 'pansariinn@gmail.com',
  phone = '+923045779900',
  socialMedia = defaultSocialMedia,
  logoUrl = '/images/logo.png',
  logoAlt = 'Logo',
  logoWidth = 150, // INCREASED from 100 to 150
  logoHeight = 48  // INCREASED from 32 to 48 (maintains aspect ratio)
}: ContactInfoProps) {
  
  return (
    <div className="md:w-1/6 flex flex-col items-start">
      <Image 
        src={logoUrl} 
        alt={logoAlt} 
        width={logoWidth} 
        height={logoHeight} 
        className="mb-3" // Increased margin bottom
        priority // Optional: ensures logo loads quickly
      />
      <p style={{ ...textStyle, fontSize: '12px' }} className="mb-1">
        <a 
          href={`mailto:${email}`} 
          style={{ color: buttonColor, fontSize: '12px' }}
          className="hover:opacity-80 transition-opacity"
        >
          {email}
        </a>
      </p>
      <p style={{ ...textStyle, fontSize: '12px' }} className="mb-3"> {/* Increased margin */}
        <a 
          href={`tel:${phone}`} 
          style={{ color: buttonColor, fontSize: '12px' }}
          className="hover:opacity-80 transition-opacity"
        >
          {phone}
        </a>
      </p>
      <div className="flex gap-4 mt-3"> {/* Increased gap and margin */}
        {socialMedia && socialMedia.length > 0 ? (
          socialMedia.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: buttonColor }}
              className="hover:opacity-80 transition-opacity hover:scale-110 transition-transform duration-200" // Added hover effect
              aria-label={platform.name}
            >
              {platform.icon}
            </a>
          ))
        ) : (
          <p style={{ ...textStyle, fontSize: '11px' }}>No social media links available</p>
        )}
      </div>
    </div>
  );
}