import Link from "next/link";
import Image from "next/image";
import { Github, ExternalLink, Heart } from "lucide-react";

const footerLinks = {
  product: [
    { name: "Documentation", href: "/docs" },
    { name: "API Examples", href: "/examples" },
    {
      name: "Swagger Docs",
      href: "https://kalori-makanan-kkm.onrender.com/docs",
      external: true,
    },
    {
      name: "ReDoc",
      href: "https://kalori-makanan-kkm.onrender.com/redoc",
      external: true,
    },
  ],
  resources: [
    { name: "Getting Started", href: "/docs#getting-started" },
    { name: "API Reference", href: "/docs#endpoints" },
    { name: "Response Examples", href: "/docs#response-examples" },
    { name: "Integration Guide", href: "/examples" },
  ],
  developers: [
    {
      name: "API Status",
      href: "https://kalori-makanan-kkm.onrender.com/health",
      external: true,
    },
    {
      name: "GitHub",
      href: "https://github.com/Zen0space/kalori-makanan-kkm",
      external: true,
    },
    { name: "Rate Limiting", href: "/docs#rate-limiting" },
    { name: "Support", href: "/docs#support" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="container-max py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center">
                <Image
                  src="/assets/Logo-nobg.png"
                  alt="Kalori Makanan Logo"
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-lg text-gray-900">
                Kalori Makanan
              </span>
            </Link>
            <p className="text-sm text-gray-600 max-w-xs">
              Fast & reliable REST API for food calorie data. Access nutritional
              information for 750+ Malaysian and international foods.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/Zen0space/kalori-makanan-kkm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 inline-flex items-center space-x-1"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Developers</h3>
            <ul className="space-y-3">
              {footerLinks.developers.map((link) => (
                <li key={link.name}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 inline-flex items-center space-x-1"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="container-max py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>
                © {new Date().getFullYear()} Kalori Makanan API. Made with
              </span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>in Malaysia</span>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <Link
                href="/docs"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Terms
              </Link>
              <Link
                href="/docs"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Privacy
              </Link>
              <a
                href="https://kalori-makanan-kkm.onrender.com/health"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 inline-flex items-center space-x-1"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span>API Status</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
