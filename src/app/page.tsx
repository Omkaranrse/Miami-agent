import {
  getFeaturedProperties,
  getSpotlightProperties,
} from "@/lib/properties";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustIndicators } from "@/components/home/TrustIndicators";
import { FeaturedProperties } from "@/components/home/FeaturedProperties";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { AboutPreview } from "@/components/home/AboutPreview";
import { NeighborhoodShowcase } from "@/components/home/NeighborhoodShowcase";
import { PropertySpotlight } from "@/components/home/PropertySpotlight";
import { TeamPreview } from "@/components/home/TeamPreview";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { FinalCTA } from "@/components/home/FinalCTA";

export default async function HomePage() {
  const [featuredProperties, spotlightProperties] = await Promise.all([
    getFeaturedProperties(),
    getSpotlightProperties(),
  ]);

  return (
    <>
      <HeroSection />
      <TrustIndicators />
      <FeaturedProperties properties={featuredProperties} />
      <ServicesOverview />
      <AboutPreview />
      <NeighborhoodShowcase />
      <PropertySpotlight properties={spotlightProperties} />
      <TeamPreview />
      <VideoShowcase />
      <InstagramFeed />
      <FinalCTA />
    </>
  );
}
