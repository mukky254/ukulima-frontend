// src/components/NotFound.tsx
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="text-center card p-12 max-w-md">
        <div className="text-6xl mb-6">🌱</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-primary">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
