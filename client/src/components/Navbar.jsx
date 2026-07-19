import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-card shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src="/govroom-logo.png" alt="GoVroom" className="h-10 w-auto object-contain scale-[1.8] origin-left z-10 relative drop-shadow-md" />
            </Link>
          </div>
          
          {/* Links Section */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {user.role === 'agency' && (
                  <>
                    <Link to="/agency/fleet" className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      My Fleet
                    </Link>
                    <Link to="/agency/bookings" className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                      Bookings
                    </Link>
                  </>
                )}
                
                {user.role === 'customer' && (
                  <Link to="/customer/rentals" className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    My Rentals
                  </Link>
                )}
                
                {user.role === 'admin' && (
                  <Link to="/admin/dashboard" className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                    Admin Panel
                  </Link>
                )}
                <Button 
                  onClick={handleLogout} 
                  variant="destructive" 
                  size="sm"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-muted-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="bg-primary text-primary-foreground hover:bg-primary px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}
