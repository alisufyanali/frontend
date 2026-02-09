// Desktop/components/footer/Newsletter.tsx
"use client";

import { FormEvent, useState } from 'react';

interface NewsletterProps {
  textStyle: React.CSSProperties;
  buttonColor: string;
}

export default function Newsletter({ textStyle, buttonColor }: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    
    // Create JSON data
    const formData = {
      email: email.trim(),
      timestamp: new Date().toISOString(),
      source: 'newsletter',
      status: 'subscribed'
    };
    
    // Output JSON to console
    console.log('Newsletter Subscription Data:', JSON.stringify(formData, null, 2));
    
    // You can also:
    // 1. Send to an API endpoint
    // 2. Store in localStorage
    // 3. Display a success message
    
    // Simulate API call delay
    setTimeout(() => {
      setSubscribedEmail(email);
      setEmail('');
      setIsSubmitting(false);
      
      // Show success alert
      alert(`Subscription successful!\n\nJSON Data:\n${JSON.stringify(formData, null, 2)}`);
    }, 500);
  };

  return (
    <div className="md:w-1/4 flex flex-col">
      <h3 
        className="text-sm font-bold mb-2" 
        style={{ 
          fontFamily: 'Poppins',
          letterSpacing: '0.4px',
          textTransform: 'uppercase'
        }}
      >
        Newsletter
      </h3>
      <p 
        style={{ 
          ...textStyle, 
          fontSize: '12px',
          lineHeight: '1.5',
          letterSpacing: '0.1px',
          fontWeight: 400 
        }} 
        className="mb-3"
      >
        Get updates on new products and exclusive offers!
      </p>
      
      {subscribedEmail ? (
        <div className="bg-green-50 text-green-700 p-3 rounded-md mb-3">
          <p className="text-sm font-medium">
            Thank you for subscribing with: 
          </p>
          <p className="text-xs mt-1">{subscribedEmail}</p>
          <button 
            onClick={() => setSubscribedEmail(null)}
            className="text-xs mt-2 text-green-600 hover:text-green-800 underline"
          >
            Subscribe another email
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded text-gray-900 w-full text-xs"
            style={{ 
              backgroundColor: '#D9D9D9A6', 
              ...textStyle, 
              fontSize: '12px',
              letterSpacing: '0.1px',
              fontWeight: 400 
            }}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-white hover:opacity-90 transition-opacity font-semibold w-full disabled:opacity-70"
            style={{
              height: '36px',
              borderRadius: '30px',
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: '12px',
              lineHeight: '100%',
              backgroundColor: buttonColor,
              letterSpacing: '0.2px'
            }}
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      )}
  
    </div>
  );
}