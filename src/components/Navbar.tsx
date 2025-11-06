import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  ShoppingBag, 
  LogOut, 
  Menu, 
  X,
  MessageCircle,
  PlusCircle
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-green-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-2xl font-bold text-gradient hover:scale-105 transition-transform duration-300"
          >
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌱</span>
            </div>
            <span>Ukulima</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/products" 
              className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300 hover:scale-105"
            >
              Marketplace
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/products/create" 
                  className="flex items-center space-x-1 text-green-600 hover:text-green-700 font-medium transition-colors duration-300"
                >
                  <PlusCircle size={18} />
                  <span>Sell</span>
                </Link>
                <Link 
                  to="/orders" 
                  className="flex items-center space-x-1 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300"
                >
                  <ShoppingBag size={18} />
                  <span>Orders</span>
                </Link>
                <Link 
                  to="/chat" 
                  className="flex items-center space-x-1 text-gray-700 hover:text-green-600 font-medium transition-colors duration-300"
                >
                  <MessageCircle size={18} />
                  <span>Messages</span>
                </Link>
                <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-gray-700 font-medium">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors duration-300 p-2 rounded-lg hover:bg-red-50"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-300"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-green-50 transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slide-up">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-green-600 font-medium py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Marketplace
              </Link>
              
              {user ? (
                <>
                  <Link 
                    to="/products/create" 
                    className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <PlusCircle size={18} />
                    <span>Sell Products</span>
                  </Link>
                  <Link 
                    to="/orders" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600 font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShoppingBag size={18} />
                    <span>My Orders</span>
                  </Link>
                  <Link 
                    to="/chat" 
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-600 font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <MessageCircle size={18} />
                    <span>Messages</span>
                  </Link>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-700 font-medium">{user.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 text-red-500 hover:text-red-600 font-medium py-2 w-full"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col space-y-3 pt-4 border-t border-gray-200">
                  <Link 
                    to="/login" 
                    className="text-gray-700 hover:text-green-600 font-medium py-2 text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="btn-primary text-center"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
