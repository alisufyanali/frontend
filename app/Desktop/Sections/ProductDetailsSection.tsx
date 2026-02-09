// app/Desktop/Sections/ProductDetailsSection.tsx
"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { FaShoppingCart, FaStar, FaHeart, FaRegHeart, FaCheckCircle, FaLeaf, FaShieldAlt, FaBolt, FaWhatsapp, FaUser, FaThumbsUp, FaImages } from "react-icons/fa";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishList";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import VideoProductsSection from "./ProductDetails/VideoProductsSection";
import RecommendedProductsSection from "./ProductDetails/RecommendedProductsSection";
import DirectionToUse from "../components/directiontouse";
import InfiniteScrollingReviews from "./ProductDetails/InfiniteScrollingReviews";

// Skeletal Loading Components
function ProductDetailsSectionSkeleton() {
  return (
    <div className="w-full bg-white animate-pulse">
      {/* Video Section Skeleton */}
      <div className="w-full h-64 bg-gray-200"></div>
      
      {/* Product Info Tabs Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs Navigation Skeleton */}
        <div className="border-b border-gray-200 mb-6">
          <div className="flex gap-8 overflow-x-auto pb-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-24 h-6 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>

        {/* Tab Content Skeleton */}
        <div className="bg-white rounded-lg p-6 space-y-6">
          {/* Description Skeleton */}
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-64"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-11/12"></div>
              <div className="h-4 bg-gray-200 rounded w-10/12"></div>
            </div>
            
            {/* Benefits Skeleton */}
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-48"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-64"></div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Feature Cards Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-4 bg-gray-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Banners Skeleton */}
      <div className="space-y-4">
        <div className="w-full h-64 bg-gray-200"></div>
        <div className="w-full h-64 bg-gray-200"></div>
      </div>
      
      {/* Bottom Bar Skeleton */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-14 h-14 bg-gray-200 rounded-lg"></div>
              <div className="space-y-2 flex-1 min-w-0">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <div className="w-24 h-8 bg-gray-200 rounded"></div>
                <div className="w-32 h-8 bg-gray-200 rounded-lg"></div>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
                <div className="h-10 bg-gray-200 rounded-lg flex-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProductDetailsSectionProps {
  product?: any;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpful: number;
  images?: string[];
}

export default function ProductDetailsSection({ product }: ProductDetailsSectionProps) {
  const productDetailsBanner1 = '/images/productdetailsbanner1.png';
  const productDetailsBanner2 = '/images/productdetailsbanner2.png';
  
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '15ml');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'reviews' | 'howToUse'>('description');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const sectionRef = useRef<HTMLDivElement>(null);
  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  
  const productId = product?.productId || product?.id;
  const isWishlisted = productId ? isInWishlist(productId) : false;

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!(token && user));
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Generate sample reviews
  const generateReviews = useCallback((pageNum: number) => {
    const newReviews: Review[] = [];
    const reviewCount = pageNum === 1 ? 5 : 3;
    
    for (let i = 0; i < reviewCount; i++) {
      const id = (pageNum - 1) * 3 + i + 1;
      const ratings = [4, 4.5, 5, 5, 4.5, 5, 4, 5, 4.5, 5];
      const authors = [
        "Ahmad Raza", "Fatima Khan", "Usman Ali", "Sana Malik", "Bilal Ahmed",
        "Zainab Hassan", "Omar Farooq", "Ayesha Siddiqui", "Haris Mahmood", "Nida Shah"
      ];
      const comments = [
        "This product exceeded my expectations! The quality is outstanding and it works exactly as described. I've been using it for a month and can see visible improvements.",
        "Excellent Ayurvedic product. I appreciate that it's 100% natural without any chemicals. My skin feels rejuvenated and healthier.",
        "The delivery was fast and packaging was secure. The product itself is pure and authentic. Will definitely purchase again.",
        "I was skeptical at first but this product has proven to be worth every penny. The texture is perfect and absorption is quick.",
        "As someone with sensitive skin, I'm always cautious. This product didn't cause any irritation and actually soothed my skin. Highly recommend!",
        "Traditional Ayurveda at its best! The herbal fragrance is pleasant and the results speak for themselves. My go-to product now.",
        "Quality is top-notch. You can tell it's made with care and attention to detail. The effects are noticeable within days.",
        "Sustainable packaging and pure ingredients. I love that the company is environmentally conscious while delivering premium quality.",
        "Perfect for daily use. It has become an essential part of my skincare routine. The natural glow it gives is incredible.",
        "Worth the investment. While it's priced higher than some alternatives, the purity and effectiveness justify every rupee spent."
      ];
      const dates = [
        "2 days ago", "1 week ago", "2 weeks ago", "3 weeks ago", "1 month ago",
        "2 months ago", "3 months ago", "4 months ago", "5 months ago", "6 months ago"
      ];
      
      newReviews.push({
        id,
        author: authors[(id - 1) % authors.length],
        rating: ratings[(id - 1) % ratings.length],
        date: dates[(id - 1) % dates.length],
        comment: comments[(id - 1) % comments.length],
        verified: Math.random() > 0.3,
        helpful: Math.floor(Math.random() * 50),
        images: Math.random() > 0.7 ? ['/images/review1.jpg', '/images/review2.jpg', '/images/review3.jpg'] : undefined
      });
    }
    
    return newReviews;
  }, []);

  // Load reviews
  const loadReviews = useCallback(() => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    setTimeout(() => {
      const newReviews = generateReviews(page);
      
      if (page === 1) {
        setReviews(newReviews);
      } else {
        setReviews(prev => [...prev, ...newReviews]);
      }
      
      if (page >= 3) {
        setHasMore(false);
      }
      
      setPage(prev => prev + 1);
      setLoading(false);
    }, 800);
  }, [page, loading, hasMore, generateReviews]);

  // Handle scroll for infinite loading
  const handleScroll = useCallback(() => {
    if (!reviewsContainerRef.current || loading || !hasMore) return;
    
    const container = reviewsContainerRef.current;
    const { scrollTop, scrollHeight, clientHeight } = container;
    
    if (scrollHeight - scrollTop <= clientHeight + 100) {
      loadReviews();
    }
  }, [loading, hasMore, loadReviews]);

  // Initialize reviews and scroll listener
  useEffect(() => {
    if (activeTab === 'reviews' && reviews.length === 0) {
      loadReviews();
    }
  }, [activeTab, reviews.length, loadReviews]);

  // Add scroll listener when reviews tab is active
  useEffect(() => {
    const container = reviewsContainerRef.current;
    if (activeTab === 'reviews' && container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [activeTab, handleScroll]);

  // Show/hide bottom bar on scroll
  useEffect(() => {
    const handleMainScroll = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.offsetTop;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition >= sectionTop - 300) {
          setShowBottomBar(true);
        } else {
          setShowBottomBar(false);
        }
      }
    };
    
    window.addEventListener('scroll', handleMainScroll);
    handleMainScroll();
    
    return () => {
      window.removeEventListener('scroll', handleMainScroll);
    };
  }, []);

  // Show skeleton loading
  if (isLoading) {
    return <ProductDetailsSectionSkeleton />;
  }

  // Helper function to render stars
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`w-4 h-4 ${
              index < Math.floor(rating)
                ? 'text-yellow-400 fill-yellow-400'
                : index < rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  // Add to cart functionality
  const handleAddToCart = () => {
    if (!productId) {
      toast.error('Failed to add item to cart!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: productId,
        img: product?.img || product?.selectedImage || '/images/placeholder.jpg',
        nameEn: product?.nameEn || 'Product',
        nameUr: product?.nameUr || '',
        price: product?.price || 0,
        size: selectedSize,
        category: product?.category || "Herbal Oils"
      });
    }

    toast.success(`Added ${quantity} × ${product?.nameEn || 'Product'} (${selectedSize}) to cart!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const handleBuyNow = () => {
    if (!productId) {
      toast.error('Failed to add item to cart!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: productId,
        img: product?.img || product?.selectedImage || '/images/placeholder.jpg',
        nameEn: product?.nameEn || 'Product',
        nameUr: product?.nameUr || '',
        price: product?.price || 0,
        size: selectedSize,
        category: product?.category || "Herbal Oils"
      });
    }

    toast.success(
      <div>
        <div className="font-semibold">Added to cart! Redirecting...</div>
        <div className="text-sm opacity-90">{product?.nameEn || 'Product'} (×{quantity})</div>
      </div>, 
      {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
      }
    );

    setTimeout(() => {
      window.location.href = '/cart';
    }, 1600);
  };

  // Toggle wishlist with login check
  const toggleWishlist = () => {
    if (!productId) return;
    
    // Check if user is logged in
    if (!isLoggedIn) {
      toast.warning(
        <div>
          <div className="font-semibold">Please login to add to wishlist</div>
          <div className="text-sm opacity-90 mt-1">Save your favorite products by logging in</div>
        </div>,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        }
      );
      
      // Redirect to login after a delay
      setTimeout(() => {
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
      }, 1500);
      return;
    }
    
    if (isWishlisted) {
      removeFromWishlist(productId);
      toast.info('Removed from wishlist', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    } else {
      addToWishlist({
        id: productId,
        img: product?.img || product?.selectedImage || '/images/placeholder.jpg',
        nameEn: product?.nameEn || 'Product',
        nameUr: product?.nameUr || '',
        price: product?.price || 0,
        oldPrice: product?.oldPrice,
        rating: product?.rating,
        reviews: product?.reviews,
        inStock: true,
        category: product?.category || "Herbal Oils"
      });
      toast.success('Added to wishlist!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  const handleWhatsAppOrder = () => {
    if (!product) return;
    
    const totalPrice = (product?.price || 0) * quantity;
    
    const message = `🌟 *New Order Request* 🌟\n\n` +
      `*Product:* ${product?.nameEn || 'Product'}\n` +
      `*Price:* PKR ${(product?.price || 0).toLocaleString()}\n` +
      `*Size:* ${selectedSize}\n` +
      `*Quantity:* ${quantity}\n` +
      `*Total:* PKR ${totalPrice.toLocaleString()}\n\n` +
      `*Customer Details:*\n` +
      `Please provide your:\n` +
      `1. Full Name\n` +
      `2. Delivery Address\n` +
      `3. Phone Number\n\n` +
      `_This order was placed via Pansari Inn website_`;
    
    const whatsappUrl = `https://wa.me/923001234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'howToUse', label: 'How to Use' },
  ];

  // Calculate review statistics
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 4.8;
    
  const ratingDistribution = {
    5: reviews.filter(r => r.rating >= 4.5).length,
    4: reviews.filter(r => r.rating >= 3.5 && r.rating < 4.5).length,
    3: reviews.filter(r => r.rating >= 2.5 && r.rating < 3.5).length,
    2: reviews.filter(r => r.rating >= 1.5 && r.rating < 2.5).length,
    1: reviews.filter(r => r.rating < 1.5).length,
  };

  return (
    <>
      <ToastContainer />
      
      <div ref={sectionRef} className="w-full bg-white relative">
        <VideoProductsSection />
        
        {/* Product Info Tabs Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex gap-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-4 px-2 font-medium text-sm whitespace-nowrap transition border-b-2 ${
                    activeTab === tab.id
                      ? 'text-green-700 border-green-700'
                      : 'text-gray-600 border-transparent hover:text-green-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg p-6">
            {activeTab === 'description' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Product Description</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {product?.description || "Experience the power of pure Ayurvedic wellness with our premium herbal product. Crafted using traditional methods and the finest natural ingredients, this product delivers authentic results you can trust."}
                  </p>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Key Benefits</h3>
                  <ul className="space-y-2">
                    {product?.benefits?.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <FaCheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    )) || (
                      <>
                        <li className="flex items-start gap-3">
                          <FaCheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <span className="text-gray-700">100% Natural & Organic ingredients</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FaCheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <span className="text-gray-700">Clinically tested for safety and efficacy</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <FaCheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                          <span className="text-gray-700">Free from harmful chemicals and preservatives</span>
                        </li>
                      </>
                    )}
                  </ul>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                      <FaLeaf className="w-8 h-8 text-green-700" />
                      <div>
                        <p className="font-semibold text-gray-900">100% Natural</p>
                        <p className="text-sm text-gray-600">Organic ingredients</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <FaShieldAlt className="w-8 h-8 text-blue-700" />
                      <div>
                        <p className="font-semibold text-gray-900">Safe & Tested</p>
                        <p className="text-sm text-gray-600">Quality assured</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-lg">
                      <FaCheckCircle className="w-8 h-8 text-amber-700" />
                      <div>
                        <p className="font-semibold text-gray-900">Certified</p>
                        <p className="text-sm text-gray-600">Ayurvedic formula</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Ingredients</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span className="font-semibold text-gray-900 min-w-[120px]">Main Extract:</span>
                      <span className="text-gray-700">Pure herbal extract (100% organic)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold text-gray-900 min-w-[120px]">Base Oil:</span>
                      <span className="text-gray-700">Cold-pressed carrier oil</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold text-gray-900 min-w-[120px]">Preservative:</span>
                      <span className="text-gray-700">Natural vitamin E (tocopherol)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-semibold text-gray-900 min-w-[120px]">Essential Oils:</span>
                      <span className="text-gray-700">Therapeutic grade aromatics</span>
                    </li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-4 italic">
                    * All ingredients are sourced from certified organic farms and processed using traditional Ayurvedic methods.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Reviews Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                    <p className="text-gray-600 mt-1">Read what our customers say about this product</p>
                  </div>
                  <button className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-600 transition whitespace-nowrap">
                    Write a Review
                  </button>
                </div>

                {/* Rating Summary */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Overall Rating */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="text-5xl font-bold text-gray-900">
                        {averageRating.toFixed(1)}
                      </div>
                      <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-6 h-6 ${
                              i < Math.floor(averageRating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600 mt-2">
                        {reviews.length} customer reviews
                      </p>
                    </div>

                    {/* Rating Distribution */}
                    <div className="md:col-span-2 space-y-3">
                      {[5, 4, 3, 2, 1].map((stars) => {
                        const count = ratingDistribution[stars as keyof typeof ratingDistribution];
                        const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                        
                        return (
                          <div key={stars} className="flex items-center gap-3">
                            <span className="w-12 text-sm font-medium text-gray-700">
                              {stars} stars
                            </span>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-600 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="w-12 text-sm text-gray-600 text-right">
                              {count}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Reviews List with Infinite Scroll */}
                <div 
                  ref={reviewsContainerRef}
                  className="space-y-6 max-h-[600px] overflow-y-auto pr-2"
                  style={{ scrollbarWidth: 'thin' }}
                >
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                    >
                      {/* Review Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <FaUser className="w-6 h-6 text-green-700" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-900">
                                {review.author}
                              </h3>
                              {review.verified && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full flex items-center gap-1">
                                  <FaCheckCircle className="w-3 h-3" />
                                  Verified Purchase
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                              {renderStars(review.rating)}
                              <span className="text-gray-500 text-sm">
                                {review.date}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Review Content */}
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {review.comment}
                      </p>

                      {/* Review Images */}
                      {review.images && review.images.length > 0 && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <FaImages className="w-4 h-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-700">
                              Customer Photos
                            </span>
                          </div>
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            {review.images.map((img, idx) => (
                              <div
                                key={idx}
                                className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 cursor-pointer hover:border-green-500 transition"
                              >
                                <img
                                  src={img}
                                  alt={`Review ${review.id} image ${idx + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Review Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition">
                          <FaThumbsUp className="w-4 h-4" />
                          <span className="text-sm font-medium">
                            Helpful ({review.helpful})
                          </span>
                        </button>
                        <button className="text-sm text-gray-500 hover:text-gray-700 px-3 py-1 hover:bg-gray-100 rounded transition">
                          Report
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Loading Indicator */}
                  {loading && (
                    <div className="flex justify-center py-8">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 border-3 border-gray-300 border-t-green-600 rounded-full animate-spin"></div>
                        <p className="text-gray-600">Loading more reviews...</p>
                      </div>
                    </div>
                  )}

                  {/* End Message */}
                  {!hasMore && reviews.length > 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p className="font-medium">You've reached the end of reviews</p>
                      <p className="text-sm mt-1">Share your experience by writing a review!</p>
                    </div>
                  )}

                  {/* No Reviews Message */}
                  {!loading && reviews.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <FaStar className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No Reviews Yet
                      </h3>
                      <p className="text-gray-600 max-w-md mx-auto">
                        Be the first to share your experience with this product. Your review will help others make informed decisions.
                      </p>
                      <button className="mt-6 px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-600 transition">
                        Write the First Review
                      </button>
                    </div>
                  )}
                </div>
            <InfiniteScrollingReviews/>
              </div>
            )}
            {activeTab === 'howToUse' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">How to Use</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-3">Usage Instructions</h3>
                    <ol className="space-y-3">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-700 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</span>
                        <span className="text-gray-700">Take 2-3 drops of the product on your palm</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-700 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</span>
                        <span className="text-gray-700">Gently massage into the affected area in circular motions</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-700 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</span>
                        <span className="text-gray-700">Leave it on for at least 30 minutes or overnight for best results</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-700 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</span>
                        <span className="text-gray-700">Rinse with lukewarm water (if applicable)</span>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="font-semibold text-amber-900 mb-2">⚠️ Important Notes:</p>
                    <ul className="space-y-1 text-sm text-amber-800">
                      <li>• For external use only</li>
                      <li>• Do a patch test before first use</li>
                      <li>• Avoid contact with eyes</li>
                      <li>• Store in a cool, dry place</li>
                      <li>• Keep out of reach of children</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Banners */}
        <div className="w-full">
          <img 
            src={productDetailsBanner1} 
            alt="Product Details Banner 1" 
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div className="w-full">
          <img 
            src={productDetailsBanner2} 
            alt="Product Details Banner 2" 
            className="w-full h-auto object-cover"
          />
        </div>
        
        <DirectionToUse/>
        <RecommendedProductsSection />
        
        {/* Enhanced Bottom Bar */}
        {showBottomBar && product && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 animate-slide-up">
            <div className="max-w-7xl mx-auto px-4 py-3">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 md:gap-4">
                {/* Product Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                    <img 
                      src={product.img || product.selectedImage || '/images/placeholder.jpg'} 
                      alt={product.nameEn} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm truncate">
                      {product.nameEn}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-lg font-bold text-green-700">
                        PKR {(product.price || 0)?.toLocaleString()}
                      </span>
                      {product.oldPrice && (
                        <span className="text-xs text-gray-500 line-through">
                          PKR {product.oldPrice.toLocaleString()}
                        </span>
                      )}
                      <div className="flex items-center gap-1">
                        <FaStar className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs text-gray-600">{product.rating || 4.8}</span>
                      </div>
                      {product.points && (
                        <div className="hidden sm:flex items-center gap-1 text-xs bg-amber-50 px-2 py-0.5 rounded">
                          <FaBolt className="w-2 h-2 text-amber-600" />
                          <span className="text-amber-700">{product.points * quantity} points</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full md:w-auto">
                  {/* Top Row: Size, Quantity, Wishlist */}
                  <div className="flex items-center gap-2 justify-between sm:justify-start">
                    {/* Size Selector */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="flex gap-1 overflow-x-auto">
                        {product.sizes.slice(0, 3).map((size: string) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`px-2 py-1 text-xs font-medium rounded border transition whitespace-nowrap ${
                              selectedSize === size
                                ? 'bg-green-700 text-white border-green-700'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-green-700'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Quantity */}
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        className="px-3 py-2 hover:bg-gray-100 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={quantity === 1}
                      >
                        −
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300 font-semibold text-sm min-w-[40px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(q => q + 1)}
                        className="px-3 py-2 hover:bg-gray-100 transition text-sm"
                      >
                        +
                      </button>
                    </div>

                    {/* Wishlist with login check */}
                    <button 
                      onClick={toggleWishlist}
                      className="p-2.5 border border-gray-300 rounded-lg hover:bg-red-50 hover:border-red-300 transition flex-shrink-0"
                      title={!isLoggedIn ? "Login to add to wishlist" : isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      {isWishlisted ? (
                        <FaHeart className="w-5 h-5 text-red-500" />
                      ) : (
                        <FaRegHeart className="w-5 h-5 text-gray-600" />
                      )}
                    </button>
                  </div>

                  {/* Bottom Row: Action Buttons */}
                  <div className="flex items-center gap-2">
                    {/* Subtotal Display - Mobile Only */}
                    <div className="sm:hidden text-xs mr-auto">
                      <div className="text-gray-700">Total:</div>
                      <div className="font-bold text-green-700">
                        PKR {((product.price || 0) * quantity).toLocaleString()}
                      </div>
                    </div>

                    {/* WhatsApp Button - Mobile Only */}
                    <button 
                      onClick={handleWhatsAppOrder}
                      className="sm:hidden p-2.5 bg-[#25D366] text-white rounded-lg hover:bg-[#1da851] transition flex-shrink-0"
                      title="Order on WhatsApp"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                    </button>

                    {/* Add to Cart */}
                    <button 
                      onClick={handleAddToCart}
                      className="flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-white border-2 border-green-700 text-green-700 rounded-lg font-semibold hover:bg-green-50 transition text-sm flex-1 sm:flex-none justify-center"
                    >
                      <FaShoppingCart className="w-4 h-4" />
                      <span className="hidden xs:inline">Add to Cart</span>
                      <span className="xs:hidden">Cart</span>
                    </button>

                    {/* Buy Now */}
                    <button 
                      onClick={handleBuyNow}
                      className="px-3 sm:px-5 py-2.5 bg-green-700 text-white rounded-lg font-semibold hover:bg-green-600 transition text-sm flex-1 sm:flex-none"
                    >
                      <span className="hidden sm:inline">Buy Now</span>
                      <span className="sm:hidden">Buy</span>
                    </button>

                    {/* WhatsApp Button - Desktop Only */}
                    <button 
                      onClick={handleWhatsAppOrder}
                      className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-[#25D366] text-white rounded-lg font-semibold hover:bg-[#1da851] transition text-sm"
                      title="Order on WhatsApp"
                    >
                      <FaWhatsapp className="w-4 h-4" />
                      <span className="hidden lg:inline">WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <style jsx>{`
          @keyframes slide-up {
            from {
              transform: translateY(100%);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          .animate-slide-up {
            animation: slide-up 0.3s ease-out;
          }
        `}</style>
      </div>
    </>
  );
}