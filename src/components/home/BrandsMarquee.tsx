import React from 'react';
import Image from 'next/image';

const brands = [
  { name: 'Albert', logo: '/images/albert.jpeg' },
  { name: 'Betterment', logo: '/images/betterment.jpeg' },
  { name: 'FloatMe', logo: '/images/floatme.jpeg' },
  { name: 'Remitly', logo: '/images/remitly.jpeg' },
  { name: 'Sendwave', logo: '/images/sendwave.jpeg' },
  { name: 'Super.com', logo: '/images/super.com.jpeg' },
];

export const BrandsMarquee = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-950 transition-colors duration-500 overflow-hidden pause-on-hover">
      <div className="container mx-auto px-6 mb-12 md:mb-20 text-center">
        <h2 className="font-display font-medium text-2xl md:text-5xl tracking-tight text-white uppercase italic">
          BRANDS THAT TRUST US
        </h2>
        <div className="w-16 md:w-24 h-0.5 bg-red-600 mx-auto mt-4 md:mt-6"></div>
      </div>
      
      <div className="relative flex overflow-hidden">
        {/* Infinite scrolling track */}
        <div className="animate-marquee whitespace-nowrap flex items-center py-8 md:py-12">
          {[...brands, ...brands, ...brands].map((brand, idx) => (
            <div 
              key={`${brand.name}-${idx}`} 
              className="px-8 md:px-16 flex-shrink-0 flex flex-col items-center group cursor-pointer"
            >
              <div className="brand-card transition-all duration-300 transform group-hover:scale-110">
                <div className="relative h-10 w-24 md:h-24 md:w-56 mb-2">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain transition-all duration-500 mix-blend-multiply dark:mix-blend-normal"
                  />
                </div>
                <p className="brand-name">{brand.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
