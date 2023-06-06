import HeroSection from 'components/pages/home/HeroSection';
import SlideshowSection from 'components/pages/home/SlideshowSection';
import CollectionsSection from 'components/pages/home/CollectionsSection';
import NewsletterSection from 'components/pages/home/NewsletterSection';

export const Home = () => {
  return (
    <>
      <HeroSection />
      <SlideshowSection />
      <CollectionsSection />
      <NewsletterSection />
    </>
  );
};

export default Home;
