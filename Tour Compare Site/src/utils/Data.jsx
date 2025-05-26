import { createContext, useContext, useState, useEffect } from 'react';

// Initial sample packages
const initialPackages = [
  {
    id: '1',
    name: 'Bali Paradise Retreat',
    destination: 'Bali, Indonesia',
    price: 1299,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1024',
    description: 'Experience the ultimate relaxation in beautiful Bali with our all-inclusive paradise retreat package.',
    features: {
      foodAndAccommodation: true,
      travelGuide: true,
      transportation: true,
    },
    duration: '7 days',
    createdAt: new Date('2023-05-15'),
  },
  {
    id: '2',
    name: 'Swiss Alps Adventure',
    destination: 'Interlaken, Switzerland',
    price: 2499,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=1024',
    description: 'Discover the breathtaking beauty of the Swiss Alps with hiking, skiing, and local cultural experiences.',
    features: {
      foodAndAccommodation: true,
      travelGuide: true,
      transportation: false,
    },
    duration: '10 days',
    createdAt: new Date('2023-06-22'),
  },
  {
    id: '3',
    name: 'Tokyo City Explorer',
    destination: 'Tokyo, Japan',
    price: 1899,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=1024',
    description: 'Immerse yourself in the vibrant culture of Tokyo with guided tours to iconic landmarks and hidden gems.',
    features: {
      foodAndAccommodation: true,
      travelGuide: true,
      transportation: true,
    },
    duration: '8 days',
    createdAt: new Date('2023-04-10'),
  },
  {
    id: '4',
    name: 'Greek Island Hopping',
    destination: 'Santorini & Mykonos, Greece',
    price: 1699,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=1024',
    description: 'Experience the magic of the Greek islands with visits to stunning Santorini and lively Mykonos.',
    features: {
      foodAndAccommodation: true,
      travelGuide: false,
      transportation: true,
    },
    duration: '9 days',
    createdAt: new Date('2023-07-05'),
  },
  {
    id: '5',
    name: 'Peruvian Expedition',
    destination: 'Cusco & Machu Picchu, Peru',
    price: 2199,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&q=80&w=1024',
    description: 'Journey through ancient Incan ruins and experience the wonders of Machu Picchu on this guided expedition.',
    features: {
      foodAndAccommodation: true,
      travelGuide: true,
      transportation: true,
    },
    duration: '12 days',
    createdAt: new Date('2023-03-18'),
  },
  {
    id: '6',
    name: 'Safari Adventure',
    destination: 'Serengeti, Tanzania',
    price: 3299,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80&w=1024',
    description: 'Witness the magnificent wildlife of Africa on this unforgettable safari experience through the Serengeti.',
    features: {
      foodAndAccommodation: true,
      travelGuide: true,
      transportation: true,
    },
    duration: '10 days',
    createdAt: new Date('2023-08-30'),
  },
];

// Create a context for packages
export const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
  // Load packages from localStorage or use initial packages
  const [packages, setPackages] = useState(() => {
    const storedPackages = localStorage.getItem('travelPackages');
    return storedPackages ? JSON.parse(storedPackages) : initialPackages;
  });

  // Save packages to localStorage when they change
  useEffect(() => {
    localStorage.setItem('travelPackages', JSON.stringify(packages));
  }, [packages]);

  const addPackage = (newPackage) => {
    setPackages([newPackage, ...packages]);
  };

  const deletePackage = (packageId) => {
    setPackages(packages.filter(pkg => pkg.id !== packageId));
  };

  // Filter function for search page
  const getFilteredPackages = (filters) => {
    return packages.filter(pkg => {
      // Search query filter
      if (
        filters.searchQuery &&
        !pkg.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !pkg.destination.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Price range filter
      if (filters.minPrice !== undefined && pkg.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice !== undefined && pkg.price > filters.maxPrice) {
        return false;
      }

      // Rating filter
      if (filters.minRating !== undefined && pkg.rating < filters.minRating) {
        return false;
      }

      // Features filters
      if (
        filters.features?.foodAndAccommodation !== undefined &&
        pkg.features.foodAndAccommodation !== filters.features.foodAndAccommodation
      ) {
        return false;
      }
      if (
        filters.features?.travelGuide !== undefined &&
        pkg.features.travelGuide !== filters.features.travelGuide
      ) {
        return false;
      }
      if (
        filters.features?.transportation !== undefined &&
        pkg.features.transportation !== filters.features.transportation
      ) {
        return false;
      }

      return true;
    });
  };

  return (
    <PackageContext.Provider 
      value={{ 
        packages, 
        addPackage, 
        deletePackage, 
        getFilteredPackages 
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export const usePackages = () => useContext(PackageContext);

// Export a standalone function for components that don't use the context
export const getFilteredPackages = (packages, filters) => {
  return packages.filter(pkg => {
    // Search query filter
    if (
      filters.searchQuery &&
      !pkg.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !pkg.destination.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Price range filter
    if (filters.minPrice !== undefined && pkg.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice !== undefined && pkg.price > filters.maxPrice) {
      return false;
    }

    // Rating filter
    if (filters.minRating !== undefined && pkg.rating < filters.minRating) {
      return false;
    }

    // Features filters
    if (
      filters.features?.foodAndAccommodation !== undefined &&
      pkg.features.foodAndAccommodation !== filters.features.foodAndAccommodation
    ) {
      return false;
    }
    if (
      filters.features?.travelGuide !== undefined &&
      pkg.features.travelGuide !== filters.features.travelGuide
    ) {
      return false;
    }
    if (
      filters.features?.transportation !== undefined &&
      pkg.features.transportation !== filters.features.transportation
    ) {
      return false;
    }

    return true;
  });
};
