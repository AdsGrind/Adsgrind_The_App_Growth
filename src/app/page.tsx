"use client";

import { 
  HeroSection, 
  BrandsMarquee, 
  StatsSection, 
  AboutUsSection,
  MarketOpportunity,
  ServicesPreview, 
  TrafficSources,
  AdFormats,
  AudienceReach,
  CaseStudy,
  TestimonialsSection, 
  WhyChooseUs,
  FAQSection,
  ConnectSection, 
  CTASection 
} from '@/components/home';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <BrandsMarquee />
      <StatsSection />
      <AboutUsSection />
      <MarketOpportunity />
      <ServicesPreview />
      <TrafficSources />
      <AdFormats />
      <AudienceReach />
      <CaseStudy />
      <WhyChooseUs />
      <TestimonialsSection />
      <FAQSection />
      <ConnectSection />
      <CTASection />
    </div>
  );
}
