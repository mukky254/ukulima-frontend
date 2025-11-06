import React from 'react';
import { Product } from '../types';
import { Star, MapPin, ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onToggleFavorite 
}) => {
  const isOrganic = product.specifications.organic;
  const isPesticideFree = product.specifications.pesticideFree;

  return (
    <div className="card group hover:scale-105 transition-all duration-300">
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <Link to={`/products/${product._id}`}>
          <img
            src={product.images[0] || '/api/placeholder/300/200'}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {isOrganic && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
              Organic
            </span>
          )}
          {isPesticideFree && (
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
              Pesticide Free
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite?.(product)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white transition-all duration-300 shadow-lg"
        >
          <Heart size={18} />
        </button>

        {/* Quick Add to Cart */}
        {product.quantity > 0 && (
          <button
            onClick={() => onAddToCart?.(product)}
            className="absolute bottom-3 right-3 p-2 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300"
          >
            <ShoppingCart size={18} />
          </button>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <Link 
            to={`/products/${product._id}`}
            className="flex-1 group-hover:text-green-600 transition-colors duration-300"
          >
            <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight">
              {product.name}
            </h3>
          </Link>
          <div className="text-lg font-bold text-green-600 ml-2 whitespace-nowrap">
            ₦{product.price.toLocaleString()}
            <span className="text-sm text-gray-500 font-normal">/{product.unit}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Specifications */}
        <div className="flex items-center space-x-4 mb-3 text-xs text-gray-500">
          {product.specifications.grade && (
            <span>Grade {product.specifications.grade}</span>
          )}
          {product.specifications.variety && (
            <span>{product.specifications.variety}</span>
          )}
        </div>

        {/* Rating and Location */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 font-medium">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">
              ({product.reviewCount})
            </span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{product.location.city}</span>
          </div>
        </div>

        {/* Seller and Stock Info */}
        <div className="flex items-center justify-between">
          <Link 
            to={`/seller/${product.farmer.id}`}
            className="text-sm text-gray-500 hover:text-green-600 transition-colors duration-300"
          >
            By {product.farmer.profile?.businessName || product.farmer.name}
          </Link>
          <span className={`text-sm font-medium ${
            product.quantity > 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart?.(product)}
          disabled={product.quantity === 0}
          className="w-full mt-4 btn-primary text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-none"
        >
          {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
