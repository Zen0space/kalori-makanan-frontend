import React from "react";
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Heart, ExternalLink } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "Documentation", href: "#docs" },
      {
        label: "API Reference",
        href: "https://kalori-makanan-kkm.onrender.com/docs",
        external: true,
      },
      { label: "Examples", href: "#examples" },
    ],
    developers: [
      { label: "Getting Started", href: "#docs" },
      { label: "API Examples", href: "#examples" },
      {
        label: "Backend Repository",
        href: "https://github.com/Zen0space/kalori-makanan-kkm",
        external: true,
      },
      {
        label: "API Status",
        href: "https://kalori-makanan-kkm.onrender.com/health",
        external: true,
      },
    ],
    company: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Support", href: "#" },
    ],
  };

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/Zen0space/kalori-makanan-kkm",
      label: "GitHub",
    },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/logo.png"
                alt="Kalori Makanan Malaysia Logo"
                className="w-12 h-12 rounded-lg shadow-sm"
              />
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Kalori Makanan Malaysia
                </span>
                <span className="text-sm font-medium text-green-600 dark:text-green-400">
                  Data by KKM
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-sm">
              Malaysia's most comprehensive food calorie API with 750+ Malaysian
              & international foods. Trusted nutritional data by KKM
              (Kementerian Kesihatan Malaysia).
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links sections */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Product
            </h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3 ml-1" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Developers
            </h3>
            <ul className="space-y-2">
              {footerLinks.developers.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3 ml-1" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                © {currentYear} Kalori Makanan Malaysia. All rights reserved.
              </p>
              <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
                Nutritional data by KKM (Kementerian Kesihatan Malaysia)
              </p>
            </div>
            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 text-sm">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>in Malaysia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
