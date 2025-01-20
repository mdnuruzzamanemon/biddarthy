'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaFacebook, FaYoutube, FaInstagram, FaLinkedin } from 'react-icons/fa'
import logo from "../app/client/images/logo.jpg"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms' },
  ]

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebook, href: 'https://facebook.com/biddarthy' },
    { name: 'YouTube', icon: FaYoutube, href: 'https://youtube.com/biddarthy' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com/biddarthy' },
    { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com/company/biddarthy' },
  ]

  return (
    <footer className="bg-[#13284D] text-white">
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
              />
            </Link>
            <p className="text-gray-300 text-sm">
              Empowering students with quality education and guidance for their successful future.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-300">
              <p>Email: info@biddarthy.com</p>
              <p>Phone: +880 1234-567890</p>
              <p>Address: Your Address Here,<br />City, Country</p>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  <social.icon className="text-2xl" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">
              © {currentYear} Biddarthy. All rights reserved.
            </div>
            <div className="text-gray-300 text-sm flex items-center space-x-1">
              <span>Developed with ❤️ by</span>
              <a 
                href="https://pirhotech.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-gray-300 transition-colors font-medium"
              >
                PiRhoTech
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 