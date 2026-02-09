// app/Desktop/components/navbar.tsx
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import SearchBarWrapper from './navbar/SearchBarWrapper';
import CartSidebar from './sidebar';
import { useCart } from '../../context/CartContext';

// Import React Icons
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube, 
  FaWhatsapp,
  FaShoppingCart,
  FaUser,
  FaTruck,
  FaBars,
  FaLeaf,
  FaGift,
  FaChevronDown,
  FaTimes,
  FaChevronRight,
  FaSearch
} from 'react-icons/fa';

// Import all products from data
import { allProducts } from '@/app/Desktop/data/products';

// Categories data - dynamically generated from products
const getCategoriesFromProducts = () => {
  const categoriesSet = new Set<string>();
  allProducts.forEach(product => {
    if (product.category) {
      categoriesSet.add(product.category);
    }
  });
  
  // Convert to array and sort alphabetically
  return Array.from(categoriesSet)
    .sort()
    .map(category => ({
      name: category,
      slug: category.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      count: allProducts.filter(p => p.category === category).length
    }));
};

// Navigation links
const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'By Concern', href: '/concern' },
  { name: 'Category', href: '/category' },
  { name: 'Offers', href: '/offers' },
  { name: 'Rewards', href: '/rewards' },
  { name: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { getCartCount, getCartTotal } = useCart();
  const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState(false);
  const [isCartSidebarOpen, setIsCartSidebarOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  
  // Get categories from products
  const categories = getCategoriesFromProducts();
  
  // Filter categories based on search
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(categorySearch.toLowerCase())
  );
  
  // Format mock products for search suggestions
  const mockProducts = allProducts.map(product => ({
    id: product.id.toString(),
    name: product.nameEn,
    slug: product.nameEn.toLowerCase().replace(/\s+/g, '-'),
    price: product.price,
    salePrice: product.oldPrice || undefined,
    image: product.img,
    category: product.category,
    rating: product.rating,
    isBestSeller: product.isBestSeller || false,
    description: product.description,
  }));

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  // Open cart sidebar function
  const openCartSidebar = () => {
    setIsCartSidebarOpen(true);
  };

  // Close cart sidebar function
  const closeCartSidebar = () => {
    setIsCartSidebarOpen(false);
  };

  // Close category sidebar
  const closeCategorySidebar = () => {
    setIsCategorySidebarOpen(false);
    setCategorySearch('');
  };

  return (
    <>
     <header className="w-full fixed top-0 left-0 z-40">
        {/* Top Header - Green Background */}
        <div className="bg-green-700 text-white py-2">
          <div className="mx-[4%]">
            <div className="flex items-center justify-between">
              {/* Left - Social Icons */}
              <div className="flex items-center gap-4">
                <a 
                  href="https://facebook.com/pansariin.pk" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:opacity-80 transition hover:scale-110"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-4 h-4" />
                </a>
                <a 
                  href="https://instagram.com/pansariin.pk" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:opacity-80 transition hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-4 h-4" />
                </a>
                <a 
                  href="https://twitter.com/pansariin" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:opacity-80 transition hover:scale-110"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-4 h-4" />
                </a>
                <a 
                  href="https://youtube.com/pansariin" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:opacity-80 transition hover:scale-110"
                  aria-label="YouTube"
                >
                  <FaYoutube className="w-4 h-4" />
                </a>
              </div>

              {/* Center - Text */}
              <div className="hidden md:block">
                <p className="text-sm font-semibold flex items-center gap-2">
                  <FaLeaf className="w-4 h-4" />
                  100% Ayurvedic & Herbal Products
                </p>
              </div>

              {/* Right - WhatsApp */}
              <a 
                href="https://wa.me/923001234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition group"
                aria-label="WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:block">+92 300 1234567</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="bg-white">
          {/* Upper Navbar */}
          <div className="mx-[4%] py-4">
            <div className="flex items-center justify-between gap-6">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0" aria-label="Pansariin.pk Home">
                <div className="relative w-48 h-12">
                  <Image
                    src="/images/logo.png"
                    alt="Pansariin.pk Logo"
                    fill
                    className="object-contain"
                    priority
                    sizes="192px"
                  />
                </div>
              </Link>

              {/* Desktop Search Bar */}
              <div className="flex-1 max-w-2xl hidden lg:block">
                <SearchBarWrapper 
                  placeholder="Search for products..."
                  variant="desktop"
                  mockProducts={mockProducts}
                  className="w-full"
                />
              </div>

              {/* Right - Cart, Sign In, Track Order */}
              <div className="flex items-center gap-4">
                {/* Track Order */}
                <Link 
                  href="/track-order" 
                  className="hidden xl:flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition group"
                  aria-label="Track Order"
                >
                  <FaTruck className="w-5 h-5" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-green-700 transition">Track Order</span>
                </Link>

                {/* Sign In */}
                <Link 
                  href="/login" 
                  className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition group"
                  aria-label="Sign In"
                >
                  <FaUser className="w-5 h-5" />
                  <span className="hidden lg:block text-sm font-medium text-gray-700 group-hover:text-green-700 transition">Sign In</span>
                </Link>

                {/* Cart Button - Opens Sidebar */}
                <button
                  onClick={openCartSidebar}
                  className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition group relative"
                  aria-label="Shopping Cart"
                >
                  <div className="relative">
                    <FaShoppingCart className="w-5 h-5" />
                    {cartCount > 0 && (
                      <span 
                        className="absolute -top-2 -right-2 w-5 h-5 bg-green-700 text-white text-xs rounded-full flex items-center justify-center font-bold"
                        aria-label={`${cartCount} items in cart`}
                      >
                        {cartCount > 9 ? '9+' : cartCount}
                      </span>
                    )}
                  </div>
                  <div className="hidden lg:flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-700 group-hover:text-green-700 transition">Cart</span>
                    {cartCount > 0 && (
                      <span className="text-xs text-gray-500">
                        PKR {cartTotal.toLocaleString()}
                      </span>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Lower Navbar */}
          <div>
            <div className="mx-[4%] py-3">
              <div className="flex items-center justify-between">
                {/* Left - Categories Button (Opens Sidebar) */}
                <button
                  onClick={() => setIsCategorySidebarOpen(true)}
                  className="flex items-center gap-3 px-6 py-2.5 bg-green-700 text-white rounded-full hover:bg-green-600 transition font-medium shadow-sm"
                  aria-label="Browse Categories"
                >
                  <FaBars className="w-4 h-4" />
                  <span>All Categories</span>
                  <FaChevronDown className="w-3 h-3" />
                </button>

                {/* Center - Navigation Links */}
                <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.href}
                      href={link.href} 
                      className={`text-sm font-medium transition ${
                        isActive(link.href) 
                          ? 'text-green-700 font-semibold' 
                          : 'text-gray-700 hover:text-green-700'
                      }`}
                      aria-current={isActive(link.href) ? 'page' : undefined}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                {/* Right - Become Affiliate Button */}
                <Link 
                  href="/affiliate" 
                  className="hidden lg:flex items-center gap-2 px-6 py-2.5 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition font-semibold text-sm shadow-sm hover:shadow-md group"
                  aria-label="Become an Affiliate"
                >
                  <FaGift className="w-4 h-4" />
                  Become an Affiliate
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden bg-white px-4 py-3">
          <SearchBarWrapper 
            placeholder="Search for products..."
            variant="mobile"
            mockProducts={mockProducts}
            className="w-full"
          />
        </div>

        {/* Simple Mobile Navigation */}
        <div className="lg:hidden bg-white">
          <div className="mx-[4%] py-2">
            <nav className="flex items-center justify-around" aria-label="Mobile navigation">
              {navLinks.slice(0, 4).map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`text-xs font-medium transition px-2 py-1 ${
                    isActive(link.href) 
                      ? 'text-green-700' 
                      : 'text-gray-700 hover:text-green-700'
                  }`}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

       
      </header>

      {/* Category Sidebar - LEFT SIDE */}
      {isCategorySidebarOpen && (
        <div className="fixed inset-0 z-50">
          {/* Blur Overlay */}
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300"
            onClick={closeCategorySidebar}
          />
          
          {/* Sidebar */}
          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300">
            {/* Header - Green */}
            <div className="bg-green-700 text-white p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold">Browse Categories</h2>
                <button 
                  onClick={closeCategorySidebar}
                  className="p-1 hover:bg-green-600 rounded transition"
                  aria-label="Close categories"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
              
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  placeholder="Search categories..."
                  className="w-full px-3 py-2 pl-9 bg-white/10 text-white placeholder-white/60 rounded text-sm focus:outline-none focus:ring-1 focus:ring-white/50"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-white/60" />
              </div>
            </div>

            {/* Categories List */}
            <div className="h-[calc(100vh-140px)] overflow-y-auto">
              {filteredCategories.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500">No categories found</p>
                  <button
                    onClick={() => setCategorySearch('')}
                    className="mt-2 text-sm text-green-700 hover:text-green-800"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <div className="p-2">
                  {filteredCategories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/shop?category=${category.slug}`}
                      onClick={closeCategorySidebar}
                      className="flex items-center justify-between p-3 hover:bg-green-50 rounded transition border-b border-gray-100 last:border-b-0 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded flex items-center justify-center group-hover:bg-green-200 transition">
                          <FaLeaf className="w-4 h-4 text-green-700" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-black group-hover:text-green-700 text-sm">
                            {category.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {category.count} product{category.count !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <FaChevronRight className="w-3 h-3 text-gray-400 group-hover:text-green-700" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Simple View All Button */}
            <div className="absolute bottom-0 left-0 right-0 p-3 border-t bg-white">
              <Link
                href="/shop"
                onClick={closeCategorySidebar}
                className="block w-full py-2.5 bg-green-700 text-white text-center rounded hover:bg-green-600 transition text-sm font-medium"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar - RIGHT SIDE */}
      <CartSidebar 
        isOpen={isCartSidebarOpen}
        onClose={closeCartSidebar}
      />
    </>
  );
}