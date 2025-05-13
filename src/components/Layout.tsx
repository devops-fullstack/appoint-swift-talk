
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { getTranslation } from "@/translations";
import { Home, User, CreditCard, Settings, Users, Shield } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { language } = useApp();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const t = (path: string) => getTranslation(language, path);
  
  const navItems = [
    { path: "/", label: t("navigation.home"), icon: <Home className="h-5 w-5" /> },
    { path: "/account", label: t("navigation.account"), icon: <User className="h-5 w-5" /> },
    { path: "/profile", label: t("navigation.profile"), icon: <CreditCard className="h-5 w-5" /> },
    { path: "/settings", label: t("navigation.settings"), icon: <Settings className="h-5 w-5" /> },
    { path: "/contacts", label: t("navigation.contacts"), icon: <Users className="h-5 w-5" /> },
    { path: "/privacy", label: t("navigation.privacy"), icon: <Shield className="h-5 w-5" /> },
  ];

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold text-primary">
            AppointmentPro
          </Link>
          
          <button 
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
          
          <nav className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === item.path
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </header>
      
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-16 right-0 left-0 z-20">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === item.path
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={toggleMenu}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      
      <footer className="bg-white shadow-inner">
        <div className="container mx-auto px-4 py-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} AppointmentPro. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
