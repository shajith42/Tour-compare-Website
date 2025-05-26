import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PackageCard from '../components/PackageCard';
import { ArrowRight } from 'lucide-react';
import { usePackages } from '../utils/data';

const Index = () => {
  const { packages } = usePackages();
  const featuredPackages = packages.slice(0, 3);
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2070"
            alt="Travel background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-white/90"></div>
        </div>

        <div className="container mx-auto px-4 z-10 flex flex-col items-center text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Find Your Perfect <span className="text-primary">Travel Package</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Compare packages side by side and find the perfect match for your dream vacation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/search" className="px-8 py-3 bg-primary text-white rounded-full text-base font-medium hover:bg-primary/90 transition-colors flex items-center justify-center">
                Explore Packages <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link to="/compare" className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-base font-medium hover:bg-white/20 transition-colors flex items-center justify-center">
                Compare Packages
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Packages */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Packages</h2>
            <p className="text-gray-600">
              Discover our most popular travel packages handpicked for exceptional experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPackages.map((pkg) => (
              <div key={pkg.id} style={{ animationDelay: `${featuredPackages.indexOf(pkg) * 150}ms` }}>
                <PackageCard pkg={pkg} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/search" className="px-8 py-3 bg-primary text-white rounded-full text-base font-medium hover:bg-primary/90 transition-colors inline-flex items-center">
              View All Packages <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 md:py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Find Your Perfect Travel Package
              </h2>
              <p className="text-gray-600 mb-6">
                Compare different travel packages side by side to find the perfect match for your preferences and budget.
              </p>
              
              <ul className="space-y-3 mb-8">
                {['Price Comparison', 'Accommodation Options', 'Transportation Details', 'Travel Guide Availability', 'Custom Filtering'].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-flex items-center justify-center rounded-full bg-primary/10 p-1 mr-3">
                      <svg
                        className="h-4 w-4 text-primary"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link to="/compare" className="px-8 py-3 bg-primary text-white rounded-full text-base font-medium hover:bg-primary/90 transition-colors inline-flex items-center">
                Start Comparing
              </Link>
            </div>
            
            <div className="order-1 md:order-2">
              <div className="aspect-square relative max-w-md mx-auto">
                <div className="absolute top-0 left-0 w-3/4 h-3/4 rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=986"
                    alt="Italy vacation"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 w-2/3 h-2/3 rounded-lg overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=883"
                    alt="Venice vacation"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;