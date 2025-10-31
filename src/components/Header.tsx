import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

import Container from '@/components/Container';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="mt-8 mb-12">
      <Container>
        <div className="flex justify-between items-center gap-4">
          {/* Left: Nav links */}
          <nav className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl">
              Home
            </Link>
            <a href="#services" className="text-gray-700 hover:text-black transition-colors">
              Services
            </a>
            <a href="#contact" className="text-gray-700 hover:text-black transition-colors">
              Contact
            </a>
          </nav>

          {/* Right: Auth */}
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal" forceRedirectUrl={"/dashboard"}>
                <Button>Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton/>
            </SignedIn>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;