// app/offers/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FaTag, 
  FaPercent, 
  FaFire, 
  FaClock,
  FaShoppingCart,
  FaStar,
  FaGift,
  FaBolt,
  FaCheckCircle
} from 'react-icons/fa';
import { FiCopy, FiCheck } from 'react-icons/fi';

interface Offer {
  id: string;
  type: 'discount' | 'bogo' | 'flash' | 'seasonal' | 'bundle';
  title: string;
  description: string;
  discount: string;
  code?: string;
  validUntil: string;
  minPurchase?: number;
  image: string;
  products?: string[];
  featured?: boolean;
}

const offers: Offer[] = [
  {
    id: '1',
    type: 'flash',
    title: 'Flash Sale: 40% OFF',
    description: 'Limited time offer on selected herbal products',
    discount: '40% OFF',
    code: 'FLASH40',
    validUntil: '2026-01-31',
    minPurchase: 2000,
    image: '/images/offers/flash-sale.jpg',
    featured: true
  },
  {
    id: '2',
    type: 'seasonal',
    title: 'Winter Wellness Sale',
    description: 'Get healthy this winter with special discounts',
    discount: '25% OFF',
    code: 'WINTER25',
    validUntil: '2026-02-28',
    minPurchase: 1500,
    image: '/images/offers/winter-sale.jpg',
    featured: true
  },
  {
    id: '3',
    type: 'bogo',
    title: 'Buy 1 Get 1 Free',
    description: 'On all honey products',
    discount: 'BOGO',
    code: 'HONEY2X',
    validUntil: '2026-02-15',
    image: '/images/offers/bogo.jpg'
  },
  {
    id: '4',
    type: 'discount',
    title: 'First Order Discount',
    description: 'New customers get 20% off their first purchase',
    discount: '20% OFF',
    code: 'NEW20',
    validUntil: '2026-12-31',
    minPurchase: 1000,
    image: '/images/offers/new-customer.jpg'
  },
  {
    id: '5',
    type: 'bundle',
    title: 'Skincare Bundle',
    description: 'Complete skincare routine at 30% off',
    discount: '30% OFF',
    code: 'SKIN30',
    validUntil: '2026-03-31',
    image: '/images/offers/bundle.jpg'
  },
  {
    id: '6',
    type: 'discount',
    title: 'Free Shipping',
    description: 'Free shipping on orders above PKR 5,000',
    discount: 'FREE SHIP',
    code: 'FREESHIP',
    validUntil: '2026-12-31',
    minPurchase: 5000,
    image: '/images/offers/free-shipping.jpg'
  }
];

// Skeletal Loading Components
function OffersPageSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 animate-pulse">
      {/* Header Skeleton */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-3">
              <div className="h-8 bg-gray-200 rounded w-64"></div>
              <div className="h-4 bg-gray-200 rounded w-96"></div>
            </div>
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          </div>

          {/* Filter Tabs Skeleton */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-24 h-10 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Featured Offers Skeleton */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="h-8 bg-gray-200 rounded w-48"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="h-6 bg-gray-200 rounded w-32"></div>
                      <div className="h-4 bg-gray-200 rounded w-48"></div>
                      <div className="h-3 bg-gray-200 rounded w-64"></div>
                    </div>
                    <div className="w-20 h-10 bg-gray-200 rounded-lg"></div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-4 bg-gray-200 rounded"></div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-4 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    
                    <div className="h-12 bg-gray-200 rounded-lg"></div>
                    
                    <div className="h-12 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Offers Grid Skeleton */}
        <div>
          <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="h-6 bg-gray-200 rounded w-24"></div>
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                    <div className="w-16 h-8 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-48"></div>
                </div>

                <div className="p-6">
                  <div className="space-y-3 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-40"></div>
                    <div className="h-4 bg-gray-200 rounded w-48"></div>
                  </div>

                  <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>

                  <div className="h-12 bg-gray-200 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to Use Banner Skeleton */}
        <div className="mt-12 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-48"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="text-center p-4 border border-gray-100 rounded-lg space-y-2">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
                    <div className="h-3 bg-gray-200 rounded w-32 mx-auto"></div>
                  </div>
                ))}
              </div>
              <div className="h-3 bg-gray-200 rounded w-64"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | Offer['type']>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const getOfferIcon = (type: Offer['type']) => {
    switch (type) {
      case 'flash':
        return <FaBolt className="w-4 h-4" />;
      case 'seasonal':
        return <FaStar className="w-4 h-4" />;
      case 'bogo':
        return <FaGift className="w-4 h-4" />;
      case 'bundle':
        return <FaShoppingCart className="w-4 h-4" />;
      default:
        return <FaPercent className="w-4 h-4" />;
    }
  };

  const getOfferColor = (type: Offer['type']) => {
    switch (type) {
      case 'flash':
        return 'text-red-600 bg-red-50';
      case 'seasonal':
        return 'text-amber-600 bg-amber-50';
      case 'bogo':
        return 'text-purple-600 bg-purple-50';
      case 'bundle':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-green-600 bg-green-50';
    }
  };

  const filteredOffers = filter === 'all' 
    ? offers 
    : offers.filter(offer => offer.type === filter);

  const featuredOffers = offers.filter(offer => offer.featured);

  // Show skeleton loading
  if (isLoading) {
    return <OffersPageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Special Offers</h1>
              <p className="text-gray-600 mt-2">
                Save big on your favorite herbal products
              </p>
            </div>
            <div className="hidden md:block w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <FaTag className="w-6 h-6 text-green-600" />
            </div>
          </div>

          {/* Filter Tabs - Simplified */}
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                filter === 'all'
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              All Offers
            </button>
            {['flash', 'seasonal', 'bogo', 'bundle', 'discount'].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type as Offer['type'])}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                  filter === type
                    ? `${type === 'flash' ? 'bg-red-600' : 
                       type === 'seasonal' ? 'bg-amber-600' : 
                       type === 'bogo' ? 'bg-purple-600' : 
                       type === 'bundle' ? 'bg-blue-600' : 'bg-green-600'} text-white`
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Featured Offers - Cleaner Design */}
        {featuredOffers.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                <FaFire className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Featured Deals</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredOffers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getOfferColor(offer.type)}`}>
                        {getOfferIcon(offer.type)}
                        {offer.type.toUpperCase()}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                      <p className="text-gray-600">{offer.description}</p>
                    </div>
                    <div className={`text-2xl font-bold px-4 py-2 rounded-lg ${offer.type === 'flash' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      {offer.discount}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaClock className="w-4 h-4" />
                        <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
                      </div>
                      {offer.minPurchase && (
                        <div className="flex items-center gap-2">
                          <FaShoppingCart className="w-4 h-4" />
                          <span>Min: PKR {offer.minPurchase.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    
                    {offer.code && (
                      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Promo Code</p>
                          <span className="font-mono font-bold text-gray-900">{offer.code}</span>
                        </div>
                        <button
                          onClick={() => copyCode(offer.code!)}
                          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition text-sm font-medium flex items-center gap-2"
                        >
                          {copiedCode === offer.code ? (
                            <>
                              <FiCheck className="w-4 h-4" />
                              Copied
                            </>
                          ) : (
                            <>
                              <FiCopy className="w-4 h-4" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                    )}
                    
                    <Link
                      href="/shop"
                      className="block w-full py-3 bg-gray-900 text-white text-center rounded-lg hover:bg-gray-800 transition font-medium"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Offers Grid - Clean Card Design */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Offers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Offer Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-2 ${getOfferColor(offer.type)}`}>
                        {getOfferIcon(offer.type)}
                        {offer.type.toUpperCase()}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{offer.title}</h3>
                    </div>
                    <span className={`text-xl font-bold ${offer.type === 'flash' ? 'text-red-600' : 'text-green-600'}`}>
                      {offer.discount}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{offer.description}</p>
                </div>

                {/* Offer Details */}
                <div className="p-6">
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaClock className="w-4 h-4 text-gray-400" />
                      <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
                    </div>
                    {offer.minPurchase && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaShoppingCart className="w-4 h-4 text-gray-400" />
                        <span>Min. purchase: PKR {offer.minPurchase.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Promo Code */}
                  {offer.code && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Use code</p>
                          <span className="font-mono font-bold text-gray-900">{offer.code}</span>
                        </div>
                        <button
                          onClick={() => copyCode(offer.code!)}
                          className="px-3 py-1.5 bg-gray-900 text-white rounded hover:bg-gray-800 transition text-sm font-medium flex items-center gap-2"
                        >
                          {copiedCode === offer.code ? (
                            <FiCheck className="w-4 h-4" />
                          ) : (
                            <FiCopy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    href="/shop"
                    className="block w-full py-3 bg-gray-900 text-white text-center rounded-lg hover:bg-gray-800 transition font-medium"
                  >
                    View Products
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredOffers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTag className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No offers found</h3>
              <p className="text-gray-600 mb-6">Try selecting a different category</p>
              <button
                onClick={() => setFilter('all')}
                className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition font-medium"
              >
                Show All Offers
              </button>
            </div>
          )}
        </div>

        {/* How to Use Banner - Clean Design */}
        <div className="mt-12 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
              <FaCheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3">How to Use Promo Codes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { step: '1', title: 'Add Products', desc: 'Select items and add to cart' },
                  { step: '2', title: 'Go to Checkout', desc: 'Proceed to checkout page' },
                  { step: '3', title: 'Apply Code', desc: 'Enter promo code in the field' },
                  { step: '4', title: 'Enjoy Savings', desc: 'Complete your purchase' }
                ].map((item) => (
                  <div key={item.step} className="text-center p-4 border border-gray-100 rounded-lg">
                    <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
                      {item.step}
                    </div>
                    <p className="font-medium text-gray-900 mb-1">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                * Terms and conditions apply. Offers cannot be combined unless specified.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}