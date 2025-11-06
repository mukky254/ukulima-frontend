import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { Product } from '../types';
import { Search, Filter, Plus, Star, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');

  useEffect(() => {
    loadProducts();
  }, [searchTerm, category, priceRange]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (searchTerm) params.search = searchTerm;
      if (category) params.category = category;
      
      const response = await productsAPI.getAll(params);
      setProducts(response.data.products);
    } catch (error) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Vegetables',
    'Fruits',
    'Grains',
    'Livestock',
    'Dairy',
    'Poultry'
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
          <p className="text-gray-600 mt-2">Find fresh produce from trusted farmers</p>
        </div>
        <Link to="/products/create" className="btn-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>List Product</span>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="input-field"
            >
              <option value="">Any Price</option>
              <option value="0-100">Under ₦100</option>
              <option value="100-500">₦100 - ₦500</option>
              <option value="500-1000">₦500 - ₦1,000</option>
              <option value="1000-5000">₦1,000 - ₦5,000</option>
              <option value="5000+">Over ₦5,000</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="card group hover:scale-105 transition-transform duration-300">
              <div className="relative overflow-hidden">
                <img
                  src={product.images[0] || '/api/placeholder/300/200'}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  {product.specifications.organic && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Organic
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 flex-1">
                    {product.name}
                  </h3>
                  <div className="text-lg font-bold text-green-600 ml-2">
                    ₦{product.price}
                    <span className="text-sm text-gray-500 font-normal">/{product.unit}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviewCount})
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{product.location.city}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    By {product.farmer.profile?.businessName || product.farmer.name}
                  </span>
                  <span className={`text-sm font-medium ${
                    product.quantity > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
                  </span>
                </div>

                <button className="w-full mt-4 btn-primary text-sm py-2">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setCategory('');
              setPriceRange('');
            }}
            className="btn-secondary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
