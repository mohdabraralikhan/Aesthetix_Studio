import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-studio-base flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        {/* Decorative Grid */}
        <div className="mb-12 relative">
          <div className="inline-flex items-center justify-center w-32 h-32 relative">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-studio-blue/10 to-transparent" />
            
            {/* Large 404 */}
            <div className="relative">
              <div className="font-display text-8xl font-bold text-studio-blue opacity-20 absolute inset-0 blur">
                404
              </div>
              <div className="font-display text-8xl font-bold text-studio-blue relative">
                404
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white border border-gray-200 p-12 shadow-sm">
          <h1 className="font-display text-5xl font-medium mb-6">Page Not Found</h1>
          
          <p className="text-gray-600 font-light text-lg mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>

          {/* Search/Help Text */}
          <div className="mb-12 p-8 bg-gray-50 border border-gray-100">
            <p className="text-sm text-gray-600 mb-4">
              This could happen if:
            </p>
            <ul className="text-sm text-gray-600 space-y-2 text-left">
              <li>✓ The link you followed was broken or outdated</li>
              <li>✓ You accidentally typed the wrong URL</li>
              <li>✓ The page has been moved or deleted</li>
              <li>✓ You don't have permission to access this resource</li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-studio-dark text-white font-medium hover:bg-gray-800 transition-colors"
            >
              Go Home
            </button>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-8 py-3 border border-gray-200 text-gray-800 font-medium hover:bg-gray-50 transition-colors"
            >
              Admin Dashboard
            </button>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-3 border border-gray-200 text-gray-800 font-medium hover:bg-gray-50 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>

        {/* Footer Help */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">
            Still need help?
          </p>
          <a href="/contact" className="inline-block text-studio-blue font-medium text-sm hover:underline">
            Contact support
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
