'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Container from '@/components/Container';
import Link from 'next/link';

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

import { Button } from '@/components/ui/button';

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // closed by default

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-40 transition-all duration-300',
        isScrolled ? 'py-3 bg-white/80 backdrop-blur-md shadow-sm' : 'py-5'
      )}
    >
      <Container className="flex items-center justify-between">
        {/* Brand (clicking goes to hero) */}
        <Link
          href="#hero"
          className="text-xl font-bold tracking-tight"
        >
          Royal Coast Limo Service
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-black transition-colors"
            >
              {item.name}
            </a>
          ))}

          {/* Auth (styled Sign In with your Button) */}
          <SignedOut>
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen((p) => !p)}
          className="md:hidden p-2 text-gray-800 z-50"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Overlay Menu */}
        <div
          className={cn(
            'fixed inset-0 bg-white/95 backdrop-blur-md z-40 flex flex-col items-center justify-center',
            'transition-opacity duration-300 md:hidden',
            isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          )}
        >
          <div className="flex flex-col items-center space-y-8 text-xl">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-800 hover:text-black transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}

            <div className="pt-2">
              <SignedOut>
                <SignInButton mode="modal">
                  <Button onClick={() => setIsMenuOpen(false)}>Sign In</Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </div>
      </Container>
    </nav>
  );
}
