import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  ArrowRight, 
  Shield, 
  Truck, 
  Sprout, 
  Users, 
  TrendingUp,
  Star,
  CheckCircle
} from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: <Sprout className="w-8 h-8 text-green-600" />,
      title: "Fresh from Farm",
      description: "Direct connection between farmers and buyers for the freshest produce"
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Secure Payments",
      description: "Escrow protection and multiple payment options including M-Pesa"
    },
    {
      icon: <Truck className="w-8 h-8 text-green-600" />,
      title: "Fast Delivery",
      description: "Optimized logistics and real-time tracking for your orders"
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Community Trust",
      description: "Verified farmers and buyers with transparent ratings and reviews"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Farmers" },
    { number: "50K+", label: "Products Listed" },
    { number: "100K+", label: "Happy Customers" },
    { number: "₦5B+", label: "Transactions" }
  ];

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-8 py-12">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Connect Directly with{' '}
            <span className="text-gradient">Local Farmers</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Kenya's premier agricultural marketplace. Buy fresh produce directly from trusted farmers 
            or sell your harvest to genuine buyers nationwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {!user ? (
              <>
                <Link to="/register" className="btn-primary text-lg px-8 py-4">
                  Start Selling Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/products" className="btn-secondary text-lg px-8 py-4">
                  Browse Marketplace
                </Link>
              </>
            ) : (
              <Link to="/products" className="btn-primary text-lg px-8 py-4">
                Browse Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-12">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Ukulima?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're revolutionizing agricultural trade with technology that benefits everyone in the supply chain.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="card p-6 text-center hover:scale-105 transition-transform duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg rounded-3xl p-8 md:p-12 text-center text-white max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of farmers and buyers already trading on Ukulima Marketplace.
          </p>
          {!user && (
            <Link 
              to="/register" 
              className="inline-flex items-center bg-white text-green-600 font-semibold px-8 py-4 rounded-xl hover:scale-105 transition-transform duration-300 hover:shadow-2xl"
            >
              Create Free Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
