// app/shop/page.tsx
'use client';

import { Suspense, useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Product, FilterOptions, filterProducts, getCategoriesFromProducts, getPriceRangeFromProducts } from "../../utils/filterProducts";
import { allProducts } from "@/app/Desktop/data/products";

// Skeletal Loading component for Suspense fallback
function ShopLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-12">
        {/* Results Banner Skeleton */}
        <div className="mb-6">
          <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 shadow-sm animate-pulse">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-3">
                <div className="h-6 bg-gray-200 rounded w-64"></div>
                <div className="flex items-center gap-2">
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-8 bg-gray-200 rounded-lg w-20"></div>
                <div className="h-8 bg-gray-200 rounded-lg w-24"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Shop Content Skeleton */}
        <div className="bg-white rounded-lg p-4">
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

          {/* Pagination Skeleton */}
          <div className="mt-8 flex justify-center">
            <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-64"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main shop content component that uses useSearchParams
function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get initial values from URL
  const initialSearchQuery = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialCategories = searchParams.get('categories')?.split(',') || [];
  
  // Validate and prepare products data
  const safeProducts = useMemo(() => {
    if (!allProducts || !Array.isArray(allProducts)) {
      console.error('Invalid products data, using empty array');
      return [];
    }
    return allProducts.map(product => ({
      ...product,
      inStock: product.inStock !== false,
    }));
  }, []);

  // Get categories and price range
  const categories = useMemo(() => getCategoriesFromProducts(safeProducts), [safeProducts]);
  const priceRange = useMemo(() => getPriceRangeFromProducts(safeProducts), [safeProducts]);

  // Initialize filters with values from URL
  const [filters, setFilters] = useState<FilterOptions>(() => {
    const initialCategoriesArray = initialCategory 
      ? [initialCategory] 
      : initialCategories.length > 0 
        ? initialCategories 
        : [];
    
    return {
      searchQuery: initialSearchQuery,
      minPrice: 0,
      maxPrice: priceRange.max || 5000,
      categories: initialCategoriesArray,
      sortBy: 'default',
      showOnSale: false,
      showInStock: true,
      showNewArrivals: false,
      showBestSellers: false,
    };
  });

  // Update max price when priceRange is calculated
  useEffect(() => {
    if (priceRange.max && priceRange.max !== filters.maxPrice) {
      setFilters(prev => ({
        ...prev,
        maxPrice: priceRange.max,
      }));
    }
  }, [priceRange.max]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Filter and sort products
  const filteredProducts = useMemo(() => 
    filterProducts(safeProducts, filters),
    [safeProducts, filters]
  );

  // Pagination calculations
  const { totalPages, indexOfLastProduct, indexOfFirstProduct, currentProducts } = useMemo(() => {
    const total = Math.ceil(filteredProducts.length / productsPerPage) || 1;
    const last = Math.min(currentPage * productsPerPage, filteredProducts.length);
    const first = (currentPage - 1) * productsPerPage;
    const products = filteredProducts.slice(first, last);
    
    return {
      totalPages: total,
      indexOfLastProduct: last,
      indexOfFirstProduct: first,
      currentProducts: products,
    };
  }, [filteredProducts, currentPage, productsPerPage]);

  // Update URL when filters change - debounced
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams();
      
      if (filters.searchQuery.trim()) {
        params.set('search', filters.searchQuery.trim());
      }
      
      if (filters.categories.length === 1) {
        params.set('category', filters.categories[0]);
      } else if (filters.categories.length > 1) {
        params.set('categories', filters.categories.join(','));
      }
      
      const queryString = params.toString();
      const newUrl = queryString ? `/shop?${queryString}` : '/shop';
      
      const currentUrl = window.location.pathname + window.location.search;
      if (newUrl !== currentUrl) {
        router.replace(newUrl, { scroll: false });
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [filters.searchQuery, filters.categories, router]);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Handle filter change
  const handleFilterChange = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  // Clear all filters
  const handleClearFilters = useCallback(() => {
    setFilters({
      searchQuery: '',
      minPrice: 0,
      maxPrice: priceRange.max || 5000,
      categories: [],
      sortBy: 'default',
      showOnSale: false,
      showInStock: true,
      showNewArrivals: false,
      showBestSellers: false,
    });
    setCurrentPage(1);
    router.push('/shop');
  }, [priceRange.max, router]);

  // Dynamically import ShopContent component to avoid circular dependencies
  const DynamicShopContent = useMemo(() => 
    dynamic(() => import('./ShopContent'), { 
      loading: () => (
        <div className="min-h-screen bg-gray-50">
          <div className="container-custom py-12">
            {/* Shop Content Skeleton */}
            <div className="bg-white rounded-lg p-4">
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

              {/* Pagination Skeleton */}
              <div className="mt-8 flex justify-center">
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-64"></div>
              </div>
            </div>
          </div>
        </div>
      ),
      ssr: false 
    }), 
  []);

  // Loading state
  if (safeProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container-custom py-12">
          <div className="bg-white rounded-lg p-4">
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

            {/* Pagination Skeleton */}
            <div className="mt-8 flex justify-center">
              <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-64"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-4">
        {/* Search Results Banner */}
        {(filters.searchQuery || filters.categories.length > 0) && (
          <div className="container-custom mb-6">
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {filters.searchQuery ? (
                      <>Search Results for: <span className="text-green-700">"{filters.searchQuery}"</span></>
                    ) : filters.categories.length > 0 ? (
                      <>Products in: <span className="text-green-700">{filters.categories.join(', ')}</span></>
                    ) : null}
                  </h2>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-sm text-gray-700">
                      Found <span className="font-bold">{filteredProducts.length}</span> product{filteredProducts.length !== 1 ? 's' : ''}
                    </span>
                    {(filters.showOnSale || filters.showNewArrivals || filters.showBestSellers) && (
                      <span className="text-sm text-gray-500">•</span>
                    )}
                    {filters.showOnSale && (
                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">On Sale</span>
                    )}
                    {filters.showNewArrivals && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">New Arrivals</span>
                    )}
                    {filters.showBestSellers && (
                      <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">Best Sellers</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-3">
                  {filteredProducts.length > 0 && (
                    <div className="text-sm text-gray-600 bg-white px-3 py-1.5 rounded-lg border">
                      Page {currentPage} of {totalPages}
                    </div>
                  )}
                  <button
                    onClick={handleClearFilters}
                    className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Shop Content */}
        <DynamicShopContent
          categories={categories}
          filters={filters}
          setFilters={handleFilterChange}
          filteredProducts={filteredProducts}
          currentProducts={currentProducts}
          currentPage={currentPage}
          totalPages={totalPages}
          indexOfFirstProduct={indexOfFirstProduct}
          indexOfLastProduct={indexOfLastProduct}
          productsPerPage={productsPerPage}
          onPageChange={handlePageChange}
          initialSearchQuery={initialSearchQuery}
          allProducts={safeProducts}
        />
      </div>
    </div>
  );
}

// Main export with Suspense boundary
export default function Shop() {
  return (
    <Suspense fallback={<ShopLoading />}>
      <ShopContent />
    </Suspense>
  );
}