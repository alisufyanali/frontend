// app/shop/ShopContent.tsx
'use client';

import { useState, memo, lazy, Suspense } from 'react';
import { FilterOptions, Product } from "../../utils/filterProducts";
import SearchFilterBar from "../../components/SearchFilterBar";
import CategoryMenuButton from "../../components/categoriesmenubutton";
import Pagination from "./Pagination";

// Lazy load ProductGrid to avoid circular dependencies
const ProductGrid = lazy(() => import('./ProductGrid'));

// Loading component for ProductGrid
function ProductGridLoading() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 animate-pulse">
          <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Skeletal loading for the entire ShopContent
function ShopContentLoading() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-6">
      {/* Search and Filter Bar Skeleton */}
      <div className="mb-6">
        <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Category Menu Button Skeleton */}
      <div className="mb-6">
        <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-48"></div>
      </div>

      {/* Results Info Skeleton */}
      <div className="my-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-64"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
        </div>
        <div className="h-5 bg-gray-200 rounded animate-pulse w-40"></div>
      </div>

      {/* Product Grid Skeleton */}
      <ProductGridLoading />

      {/* Pagination Skeleton */}
      <div className="mt-8 flex justify-center">
        <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-64"></div>
      </div>
    </div>
  );
}

interface ShopContentProps {
  categories: string[];
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  filteredProducts: Product[];
  currentProducts: Product[];
  currentPage: number;
  totalPages: number;
  indexOfFirstProduct: number;
  indexOfLastProduct: number;
  productsPerPage: number;
  onPageChange: (page: number) => void;
  initialSearchQuery?: string;
  allProducts: Product[];
  isLoading?: boolean; // Add loading prop
}

function ShopContent({
  categories,
  filters,
  setFilters,
  filteredProducts,
  currentProducts,
  currentPage,
  totalPages,
  indexOfFirstProduct,
  indexOfLastProduct,
  productsPerPage,
  onPageChange,
  initialSearchQuery = '',
  allProducts,
  isLoading = false // Default to false
}: ShopContentProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Show loading skeleton if isLoading is true
  if (isLoading) {
    return <ShopContentLoading />;
  }

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  const clearAllFilters = () => {
    setFilters({
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
  };

  // Generate category data with product counts
  const categoryData = categories.map(category => {
    const count = allProducts.filter(product => 
      product.category?.toLowerCase() === category.toLowerCase()
    ).length;
    
    return {
      name: category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      count: count,
      slug: category
    };
  });

  // Get sort label
  const getSortLabel = () => {
    switch (filters.sortBy) {
      case 'price-low':
        return 'Price: Low to High';
      case 'price-high':
        return 'Price: High to Low';
      case 'rating':
        return 'Highest Rated';
      case 'name':
        return 'Name (A-Z)';
      default:
        return 'Default';
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8 py-6">
      {/* Search and Filter Bar */}
      <SearchFilterBar
        onFilterChange={setFilters}
        productCount={filteredProducts.length}
        categories={categories}
        onViewModeChange={handleViewModeChange}
        initialSearchQuery={initialSearchQuery}
      />

      {/* Category Menu Button */}
      <div className="mb-6">
        <CategoryMenuButton categories={categoryData} />
      </div>

      {/* Results Info */}
      <div className="my-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base sm:text-lg font-semibold text-gray-900">
            Showing {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} of {filteredProducts.length} products
          </h2>
          {filters.searchQuery && (
            <p className="text-sm text-gray-600 mt-1">
              Results for "<span className="font-medium">{filters.searchQuery}</span>"
            </p>
          )}
          {(filters.categories.length > 0 || filters.showOnSale || filters.minPrice > 0 || filters.maxPrice < 5000) && (
            <p className="text-sm text-gray-500 mt-1">
              {filters.categories.length > 0 && `${filters.categories.length} categories selected • `}
              {filters.showOnSale && `On sale only • `}
              {(filters.minPrice > 0 || filters.maxPrice < 5000) && `Price: PKR ${filters.minPrice} - PKR ${filters.maxPrice}`}
            </p>
          )}
        </div>
        {filters.sortBy !== 'default' && (
          <div className="text-sm text-gray-600">
            Sorted by: <span className="font-medium">
              {getSortLabel()}
            </span>
          </div>
        )}
      </div>

      {/* Product Grid with Suspense */}
      <Suspense fallback={<ProductGridLoading />}>
        <ProductGrid products={currentProducts} viewMode={viewMode} />
      </Suspense>

      {/* No Results State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">
            {filters.searchQuery 
              ? `No results found for "${filters.searchQuery}". Try adjusting your search term.`
              : 'Try adjusting your filters to find what you\'re looking for.'}
          </p>
          <button
            onClick={clearAllFilters}
            className="mt-4 px-6 py-3 bg-[#197B33] text-white rounded-lg hover:bg-[#156529] transition-colors font-medium"
          >
            Clear All Filters & Search
          </button>
        </div>
      )}

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}

export default ShopContent;