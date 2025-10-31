'use client';

import Image from 'next/image';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow text-center px-6 pt-6 pb-6">
        {/* Logo Image */}
        <Image
          src="/royal_coast_transparent.png"
          alt="Royal Coast Logo"
          width={260}
          height={260}
          className="mx-auto mb-2"
        />

        {/* Hero Section */}
        <section
          id="hero"
          className="relative flex flex-col items-center justify-center text-center px-4 py-6"
        >
          <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight font-sans">
              Royal Coast Limo Service
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              We provide customers with reliable transportation and courier services.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="text-center mt-10 mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-lg text-gray-700">
            <div className="bg-gray-50 p-5 rounded">
              24/7 Transportation / Courier Services
            </div>
            <div className="bg-gray-50 p-5 rounded">
              Limo · Airport Shuttle · Charter Bus · Luxury Chauffeurs
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="bg-gray-50 p-6 text-center rounded-lg max-w-lg mx-auto mt-12"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">Contact Us</h2>
          <div className="space-y-1 text-gray-700 text-lg">
            <p>
              Phone 1:{' '}
              <a href="tel:7866420077" className="hover:underline">
                786-642-0077
              </a>
            </p>
            <p>
              Phone 2:{' '}
              <a href="tel:7864935787" className="hover:underline">
                786-493-5787
              </a>
            </p>
            <p>
              Email:{' '}
              <a
                href="mailto:royalcoastlimoservice@gmail.com"
                className="text-blue-600 hover:underline"
              >
                royalcoastlimoservice@gmail.com
              </a>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
