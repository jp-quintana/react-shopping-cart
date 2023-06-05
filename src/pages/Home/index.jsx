import HeroSection from 'components/home/HeroSection';
import SlideshowSection from 'components/home/SlideshowSection';
import CollectionsSection from 'components/home/CollectionsSection';
import NewsletterSection from 'components/home/NewsletterSection';

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
