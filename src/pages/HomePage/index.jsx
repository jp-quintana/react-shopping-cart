import HeroSection from 'components/pages/home/HeroSection';
import SlideshowSection from 'components/pages/home/SlideshowSection';
import CollectionsSection from 'components/pages/home/CollectionsSection';

export const HomePage = () => {
  return (
    <>
      <HeroSection />
      <SlideshowSection />
      <CollectionsSection />
    </>
  );
};

export default HomePage;
