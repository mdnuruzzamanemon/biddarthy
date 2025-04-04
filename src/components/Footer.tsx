"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTelegram, FaYoutube } from "react-icons/fa";
import logo from "../app/client/images/logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebook,
      href: "https://www.facebook.com/share/g/121DBgKH79p/",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      href: "https://youtube.com/@miltonkhandokar-biddarthi?si=NsileSOVoEPNiieO",
    },
    {
      name: "Telegram",
      icon: FaTelegram,
      href: "https://t.me/+5UIb19Smgvc1MDk1",
    },
    // { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com/company/biddarthy' },
  ];

  return (
    <footer className="bg-gradient-to-b from-[#13284D] to-[#0A192F] text-white">
      {/* Top Wave Divider */}
      <div className="relative h-12 overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-16"
          viewBox="0 0 1440 54"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 27L48 22.3C96 18 192 8 288 5.3C384 3 480 8 576 13.5C672 18 768 24 864 29.3C960 35 1056 40 1152 40.5C1248 40 1344 35 1392 32.3L1440 29.7V54H1392C1344 54 1248 54 1152 54C1056 54 960 54 864 54C768 54 672 54 576 54C480 54 384 54 288 54C192 54 96 54 48 54H0V27Z"
            fill="#13284D"
          />
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src={logo}
                alt="Biddarthy Logo"
                width={120}
                height={120}
                className="drop-shadow-lg"
              />
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering students with quality education and guidance for their
              successful future. Join us on the journey to academic excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#f4bc45]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#f4bc45] transition-colors flex items-center"
                  >
                    <span className="mr-2">›</span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#f4bc45]">
              Contact Us
            </h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start">
                <svg
                  className="h-5 w-5 text-[#f4bc45] mt-0.5 mr-3 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>info@biddarthy.com</span>
              </div>
              <div className="flex items-start">
                <svg
                  className="h-5 w-5 text-[#f4bc45] mt-0.5 mr-3 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>+880 1846-838507</span>
              </div>
              <div className="flex items-start">
                <svg
                  className="h-5 w-5 text-[#f4bc45] mt-0.5 mr-3 flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>
                  Farmgate,
                  <br />
                  Dhaka, Bangladesh
                </span>
              </div>
            </div>
          </div>

          {/* Social Links and Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#f4bc45]">
              Connect With Us
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Follow us on social media for updates, educational tips, and more.
            </p>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0A192F] hover:bg-[#f4bc45] text-gray-300 hover:text-[#13284D] h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="text-xl" />
                </a>
              ))}
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="Subscribe to newsletter"
                className="w-full py-2 px-4 bg-[#0A192F] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f4bc45] transition-colors text-sm"
              />
              <button
                type="button"
                className="absolute right-1 top-1 bottom-1 px-3 bg-[#f4bc45] text-[#13284D] rounded-md font-medium text-sm hover:bg-[#f4bc45]/90 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-[#0A192F]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} Biddarthy. All rights reserved.
            </div>
            <div className="text-gray-400 text-sm flex items-center space-x-1">
              <span>Developed with</span>
              <svg
                className="h-4 w-4 text-red-500 mx-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>by</span>
              <a
                href="https://pirhotech.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f4bc45] hover:text-[#f4bc45]/80 transition-colors font-medium ml-1"
              >
                PiRhoTech
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
