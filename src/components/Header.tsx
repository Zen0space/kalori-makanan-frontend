import React from "react";
import { motion } from "framer-motion";
import { Menu, X, Code2, FileText, Sparkles } from "lucide-react";
import { Button } from "./ui";
import { useAuth } from "../context/AuthContext";

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: any) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  setCurrentPage,
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { id: "home", label: "Home", icon: <Sparkles className="w-4 h-4" /> },
    {
      id: "docs",
      label: "Documentation",
      icon: <FileText className="w-4 h-4" />,
    },
    { id: "examples", label: "Examples", icon: <Code2 className="w-4 h-4" /> },
  ];

  if (isAuthenticated) {
    navItems.push({
      id: "dashboard",
      label: "Dashboard",
      icon: <Sparkles className="w-4 h-4" />,
    });
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-800">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <button
              onClick={() => setCurrentPage("home")}
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white"
            >
              <span className="text-2xl">🍽️</span>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Kalori Makanan
              </span>
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(item.id)}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all
                  ${
                    currentPage === item.id
                      ? "bg-primary text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                `}
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.button>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Welcome, {user?.name}
                </span>
                <Button variant="secondary" size="sm" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    window.open(
                      "https://kalori-makanan-kkm.onrender.com/docs",
                      "_blank",
                    )
                  }
                >
                  API Docs
                </Button>
                <Button
                  variant="gradient"
                  size="sm"
                  onClick={() => setCurrentPage("auth")}
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`
                    w-full flex items-center space-x-2 px-4 py-2 rounded-lg text-left text-sm font-medium transition-all
                    ${
                      currentPage === item.id
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <p className="px-4 text-sm text-gray-600 dark:text-gray-400">
                      Logged in as {user?.name}
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={logout}
                      className="w-full"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        window.open(
                          "https://kalori-makanan-kkm.onrender.com/docs",
                          "_blank",
                        )
                      }
                      className="w-full"
                    >
                      API Docs
                    </Button>
                    <Button
                      variant="gradient"
                      size="sm"
                      onClick={() => {
                        setCurrentPage("auth");
                        setIsMenuOpen(false);
                      }}
                      className="w-full"
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};
