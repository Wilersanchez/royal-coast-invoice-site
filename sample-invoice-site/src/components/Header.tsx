import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

import Container from '@/components/Container';
import Link from 'next/link';


const Header = () =>  {
    return (
        <header className='mt-8 mb-12'>
            <Container>
            <div className='flex justify-between items-center gap-4'>
                <p className='font-bold'>
                    <Link href='/dashboard'>
                        Transportation/Courier Services 
                    </Link>
                </p>
            
            <div className='flex justify-between items-center gap-4'>
                <SignedOut>
                <SignInButton />
                </SignedOut>
                <SignedIn>
                <UserButton />
                </SignedIn>
            </div>
        </div>
        </Container>
    </header>
    )
}

export default Header;