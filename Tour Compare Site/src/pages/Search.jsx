import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PackageCard from '../components/PackageCard';
import ComparisonModal from '../components/ComparisonModel';
import { SearchIcon, SlidersHorizontal, X, Check } from 'lucide-react';
import { usePackages } from '../utils/data';

const Search = () => {
  const { packages, getFilteredPackages } = usePackages();
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [minRating, setMinRating] = useState(0);
  const [foodAndAccommodation, setFoodAndAccommodation] = useState(undefined);
  const [travelGuide, setTravelGuide] = useState(undefined);
  const [transportation, setTransportation] = useState(undefined);
  const [sortBy, setSortBy] = useState('default');
  
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
  const [filteredPackages, setFilteredPackages] = useState(packages);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  // Apply filters and sorting
  useEffect(() => {
    let filtered = getFilteredPackages({
      searchQuery,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      minRating,
      features: {
        foodAndAccommodation,
        travelGuide,
        transportation,
      },
    });
    
    // Apply sorting
    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredPackages(filtered);
  }, [packages, searchQuery, priceRange, minRating, foodAndAccommodation, travelGuide, transportation, sortBy]);
  
  const togglePackageSelection = (pkg) => {
    if (selectedPackages.some((p) => p.id === pkg.id)) {
      setSelectedPackages(selectedPackages.filter((p) => p.id !== pkg.id));
    } else {
      if (selectedPackages.length < 2) {
        setSelectedPackages([...selectedPackages, pkg]);
      }
    }
  };
  
  const isPackageSelected = (pkg) => {
    return selectedPackages.some((p) => p.id === pkg.id);
  };
  
  const clearFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 5000]);
    setMinRating(0);
    setFoodAndAccommodation(undefined);
    setTravelGuide(undefined);
    setTransportation(undefined);
    setSortBy('default');
  };
  
  const compareSelectedPackages = () => {
    if (selectedPackages.length < 2) {
      return;
    }
    setIsComparisonModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Find Your Perfect Package
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Search and filter from our wide range of packages to find the perfect match.
            </p>
            
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search destinations, packages, etc."
                className="w-full pl-10 py-3 pr-4 border border-gray-300 rounded-full text-base focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className="flex items-center gap-2 py-2 px-4 border border-gray-300 rounded-md"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
              </button>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-2 px-4 border border-gray-300 rounded-md bg-white"
              >
                <option value="default">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating: High to Low</option>
              </select>
              
              {(searchQuery || priceRange[0] > 0 || priceRange[1] < 5000 || minRating > 0 || 
                foodAndAccommodation !== undefined || travelGuide !== undefined || 
                transportation !== undefined) && (
                <button
                  onClick={clearFilters}
                  className="py-2 px-4 text-sm text-gray-600 hover:text-gray-900"
                >
                  Clear All
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              {selectedPackages.length > 0 && (
                <div className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  {selectedPackages.length} selected
                </div>
              )}
              <button
                onClick={compareSelectedPackages}
                disabled={selectedPackages.length < 2}
                className={`py-2 px-4 rounded-md text-white font-medium ${
                  selectedPackages.length < 2 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-primary hover:bg-primary/90'
                }`}
              >
                Compare
              </button>
            </div>
          </div>
          
          {/* Active filters */}
          {(foodAndAccommodation !== undefined || 
            travelGuide !== undefined || 
            transportation !== undefined) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {foodAndAccommodation !== undefined && (
                <div className="py-1 px-3 border border-gray-300 rounded-full text-sm flex items-center">
                  Food & Accommodation {foodAndAccommodation ? <Check className="ml-1 h-3 w-3 text-green-500" /> : <X className="ml-1 h-3 w-3 text-red-500" />}
                </div>
              )}
              {travelGuide !== undefined && (
                <div className="py-1 px-3 border border-gray-300 rounded-full text-sm flex items-center">
                  Travel Guide {travelGuide ? <Check className="ml-1 h-3 w-3 text-green-500" /> : <X className="ml-1 h-3 w-3 text-red-500" />}
                </div>
              )}
              {transportation !== undefined && (
                <div className="py-1 px-3 border border-gray-300 rounded-full text-sm flex items-center">
                  Transportation {transportation ? <Check className="ml-1 h-3 w-3 text-green-500" /> : <X className="ml-1 h-3 w-3 text-red-500" />}
                </div>
              )}
            </div>
          )}
          
          {/* Mobile Filters */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Filter Packages</h3>
                  <button 
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="p-6 space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Price Range</h4>
                    <div className="px-2">
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>₹{priceRange[0]}</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Minimum Rating</h4>
                    <div className="px-2">
                      <input
                        type="range"
                        min="0"
                        max="5"
                        step="0.5"
                        value={minRating}
                        onChange={(e) => setMinRating(parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                    <div className="flex items-center text-sm">
                      <span>{minRating} and above</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Features</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="food"
                          checked={foodAndAccommodation === true}
                          onChange={(e) => setFoodAndAccommodation(e.target.checked ? true : undefined)}
                          className="rounded border-gray-300"
                        />
                        <label
                          htmlFor="food"
                          className="text-sm font-medium"
                        >
                          Food & Accommodation
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="guide"
                          checked={travelGuide === true}
                          onChange={(e) => setTravelGuide(e.target.checked ? true : undefined)}
                          className="rounded border-gray-300"
                        />
                        <label
                          htmlFor="guide"
                          className="text-sm font-medium"
                        >
                          Travel Guide
                        </label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="transport"
                          checked={transportation === true}
                          onChange={(e) => setTransportation(e.target.checked ? true : undefined)}
                          className="rounded border-gray-300"
                        />
                        <label
                          htmlFor="transport"
                          className="text-sm font-medium"
                        >
                          Transportation
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    className="w-full py-2 border border-gray-300 rounded-md text-sm"
                    onClick={clearFilters}
                  >
                    Clear All Filters
                  </button>
                  
                  <button
                    className="w-full py-2 bg-primary text-white rounded-md text-sm"
                    onClick={() => setIsMobileFilterOpen(false)}
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {filteredPackages.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No packages found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters to find packages.
              </p>
              <button 
                onClick={clearFilters}
                className="py-2 px-6 bg-primary text-white rounded-md"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  isSelected={isPackageSelected(pkg)}
                  onSelect={() => togglePackageSelection(pkg)}
                  showSelectButton
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <ComparisonModal
        packages={selectedPackages}
        isOpen={isComparisonModalOpen}
        onClose={() => setIsComparisonModalOpen(false)}
      />
      
      <Footer />
    </div>
  );
};

export default Search;
