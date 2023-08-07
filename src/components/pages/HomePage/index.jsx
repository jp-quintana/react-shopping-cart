import HeroSection from './HeroSection';
import ProductSliderSection from './ProductSliderSection';
import SlideshowSection from './SlideshowSection';
import CollectionsSection from './CollectionsSection';

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <SlideshowSection />
      <ProductSliderSection
        titleBottom="New Arrivals"
        sortBy={{ field: 'price', direction: 'desc' }}
      />
      <CollectionsSection />
      <ProductSliderSection
        titleTop="Everyday"
        titleBottom="Essentials"
        sortBy={{ field: 'createdAt', direction: 'asc' }}
      />
    </>
  );
};

export default HomePage;
