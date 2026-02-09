// app/categories/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { newArrivalProducts, NewArrivalProduct } from '../Desktop/data/newproducts';
import ProductCard from '../Desktop/components/ProductCard';
import SearchFilterBar from '../Desktop/components/SearchFilterBar';
import { FilterOptions } from '../Desktop/utils/filterProducts';

export default function CategoriesPage() {
  // Get all unique categories
  const allCategories = ['All Products', ...Array.from(new Set(newArrivalProducts.map(p => p.category)))];
  
  // State
  const [selectedCategory, setSelectedCategory] = useState<string>('All Products');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filteredProducts, setFilteredProducts] = useState<NewArrivalProduct[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    searchQuery: '',
    minPrice: 0,
    maxPrice: 5000,
    categories: [],
    sortBy: 'default',
    showOnSale: false,
    showInStock: true,
    showNewArrivals: false,
    showBestSellers: false,
  });

  // Initialize with all products
  useEffect(() => {
    setFilteredProducts(newArrivalProducts);
  }, []);

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    
    if (category === 'All Products') {
      setFilters({
        ...filters,
        categories: []
      });
    } else {
      setFilters({
        ...filters,
        categories: [category]
      });
    }
  };

  // Handle filter changes from SearchFilterBar
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    
    // Filter products
    let products = [...newArrivalProducts];

    // Filter by category
    if (selectedCategory !== 'All Products') {
      products = products.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (newFilters.searchQuery) {
      const query = newFilters.searchQuery.toLowerCase();
      products = products.filter(product => 
        product.nameEn.toLowerCase().includes(query) ||
        product.nameUr.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }

    // Filter by price
    products = products.filter(product => 
      product.price >= newFilters.minPrice && product.price <= newFilters.maxPrice
    );

    // Filter by categories from SearchFilterBar
    if (newFilters.categories.length > 0) {
      products = products.filter(product => 
        newFilters.categories.includes(product.category)
      );
    }

    // Filter by sale
    if (newFilters.showOnSale) {
      products = products.filter(product => product.sale);
    }

    // Sort products
    switch (newFilters.sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        products.sort((a, b) => a.nameEn.localeCompare(b.nameEn));
        break;
      default:
        // Keep original order
        break;
    }

    setFilteredProducts(products);
  };

  // Handle view mode change
  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  // Get product count by category
  const getProductCountByCategory = (category: string) => {
    if (category === 'All Products') {
      return newArrivalProducts.length;
    }
    return newArrivalProducts.filter(product => product.category === category).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Simple */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
            Shop by Category
          </h1>
          <p className="text-gray-600 text-center">
            Browse our collection of natural products
          </p>
        </div>
      </div>

      {/* Category Menu Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <div className="flex space-x-1 py-3">
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition ${
                    selectedCategory === category
                      ? 'bg-green-700 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                  <span className={`ml-1 text-xs ${
                    selectedCategory === category ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    ({getProductCountByCategory(category)})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <SearchFilterBar
          onFilterChange={handleFilterChange}
          onViewModeChange={handleViewModeChange}
          productCount={filteredProducts.length}
          categories={allCategories.filter(cat => cat !== 'All Products')}
          initialSearchQuery={searchQuery}
        />

        {/* Results Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {selectedCategory === 'All Products' ? 'All Products' : selectedCategory}
          </h2>
          <p className="text-gray-600 text-sm">
            Showing {filteredProducts.length} products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            : "space-y-4"
          }>
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className={viewMode === 'list' 
                  ? "bg-white rounded-lg border border-gray-200 p-4"
                  : "bg-white rounded-lg border border-gray-200 overflow-hidden"
                }
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              {filters.searchQuery 
                ? `No results found for "${filters.searchQuery}"`
                : 'Try selecting a different category'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All Products');
                handleFilterChange({
                  searchQuery: '',
                  minPrice: 0,
                  maxPrice: 5000,
                  categories: [],
                  sortBy: 'default',
                  showOnSale: false,
                  showInStock: true,
                  showNewArrivals: false,
                  showBestSellers: false,
                });
              }}
              className="px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              View All Products
            </button>
          </div>
        )}

        {/* Simple Stats */}
        {filteredProducts.length > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <div className="text-xl font-bold text-gray-900">{filteredProducts.length}</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <div className="text-xl font-bold text-gray-900">
                {Math.round(filteredProducts.reduce((acc, p) => acc + p.rating, 0) / filteredProducts.length * 10) / 10}
              </div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <div className="text-xl font-bold text-gray-900">
                PKR {Math.round(filteredProducts.reduce((acc, p) => acc + p.price, 0) / filteredProducts.length)}
              </div>
              <div className="text-sm text-gray-600">Avg Price</div>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
              <div className="text-xl font-bold text-gray-900">
                {filteredProducts.filter(p => p.isBestSeller).length}
              </div>
              <div className="text-sm text-gray-600">Best Sellers</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}