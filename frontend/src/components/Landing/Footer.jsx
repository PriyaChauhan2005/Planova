import React from 'react';
import { Twitter, Instagram, Github, Mail } from 'lucide-react';
import logoIcon from '../../assets/logo.png';
import brandName from '../../assets/brand.png';

/**
 * Enhanced Footer Component
 * Integrates official brand assets and improved responsive spacing.
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: 'Features', href: '#features' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Download', href: '#download' },
    ],
    Company: [
      { name: 'About Us', href: '#about' },
      { name: 'Blog', href: '#blog' },
      { name: 'Careers', href: '#careers' },
    ],
    Support: [
      { name: 'Help Center', href: '#help' },
      { name: 'Contact', href: '#contact' },
      { name: 'Privacy', href: '#privacy' },
    ],
  };

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-6 font-jakarta">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Identity Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img src={logoIcon} alt="Planova Icon" className="h-10 w-auto" />
              <img src={brandName} alt="Planova Brand" className="h-6 w-auto" />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-8">
              Empowering students to build sustainable discipline through smart task management and consistency tracking.
            </p>
            <div className="flex items-center gap-5 text-gray-400">
              <a href="#" className="hover:text-planova-mint transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-planova-mint transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-planova-mint transition-colors"><Github size={20} /></a>
              <a href="#" className="hover:text-planova-mint transition-colors"><Mail size={20} /></a>
            </div>
          </div>

          {/* Dynamic Link Mapping */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-bold text-planova-dark mb-7 text-xs uppercase tracking-[0.15em]">
                {category}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-sm text-gray-500 hover:text-planova-mint hover:translate-x-1 inline-block transition-all duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter / CTA Section */}
          <div className="lg:col-span-1">
             <h4 className="font-bold text-planova-dark mb-7 text-xs uppercase tracking-[0.15em]">
                Newsletter
              </h4>
              <p className="text-gray-500 text-xs mb-4">Get productivity tips delivered to your inbox.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="w-full bg-planova-soft border border-gray-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-planova-mint transition-colors"
                />
              </div>
          </div>
        </div>

        {/* Legal & Bottom Bar */}
        <div className="pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-planova-dark transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-planova-dark transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-planova-dark transition-colors">Cookie Policy</a>
          </div>
          <p className="text-gray-400 text-[11px] font-medium">
            © {currentYear} Planova. Built for student excellence.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;