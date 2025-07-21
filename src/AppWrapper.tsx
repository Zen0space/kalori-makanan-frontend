import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Auth from "./components/Auth";
import Home from "./screen/Home";
import Dashboard from "./screen/Dashboard";
import { Documentation } from "./screen/Documentation";
import { Examples } from "./screen/Examples";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

type PageType = "home" | "dashboard" | "docs" | "examples" | "auth";

const AppContent: React.FC = () => {
  const { user, isAuthenticated, isLoading, login } = useAuth();
  const [currentPage, setCurrentPage] = useState<PageType>("home");

  // Public pages that don't require authentication
  const publicPages: PageType[] = ["home", "docs", "examples"];
  const isPublicPage = publicPages.includes(currentPage);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth page if user is not authenticated and trying to access protected pages
  if (!isAuthenticated && !isPublicPage && currentPage !== "auth") {
    return <Auth onAuthSuccess={login} />;
  }

  // Show auth page when explicitly navigating to it
  if (currentPage === "auth" && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="pt-16">
          <Auth onAuthSuccess={login} />
        </div>
      </div>
    );
  }

  // Redirect authenticated users from auth page to dashboard
  if (currentPage === "auth" && isAuthenticated) {
    setCurrentPage("dashboard");
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main content with padding for fixed header */}
      <main className="pt-16">
        {currentPage === "home" && <Home />}
        {currentPage === "dashboard" && isAuthenticated && (
          <Dashboard user={user!} />
        )}
        {currentPage === "docs" && <Documentation />}
        {currentPage === "examples" && <Examples />}
      </main>

      <Footer />
    </div>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default AppWrapper;
