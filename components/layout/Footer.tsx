"use client"

import Link from "next/link";
import { Gavel, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Live Auctions", href: "/auctions" },
    { name: "Categories", href: "/categories" },
    { name: "List Item", href: "/list-item" },
    { name: "Support", href: "/support" },
    { name: "About Us", href: "/about" },
  ];

  const legalLinks = [
    { name: "Terms of Service", href: "/terms" },
    { name: "Privacy Policy", href: "/terms" },
    { name: "Refund Policy", href: "/terms" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Gavel className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                GO<span className="text-primary">bid</span>
              </span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              Nigeria's premier online auction platform. Buy and sell with confidence through our secure escrow system.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-background/70 hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-background/70 hover:text-primary transition-colors text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-background/70">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-background/70">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span>+234 800 000 0000</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-background/70">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span>support@gobid.ng</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">
            © {currentYear} GObid. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-background/50">
            <span>🇳🇬</span>
            <span>Made with ❤️ in Nigeria</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
