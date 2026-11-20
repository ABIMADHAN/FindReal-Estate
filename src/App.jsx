import './styles/globals.css';
import Navbar            from './components/Navbar';
import Hero              from './components/Hero';
import IntroStatement    from './components/IntroStatement';
import FeaturedProperties from './components/FeaturedProperties';
import ArchitectureStory from './components/ArchitectureStory';
import Lifestyle         from './components/Lifestyle';
import WhyUs             from './components/WhyUs';
import ContactCTA        from './components/ContactCTA';
import Footer            from './components/Footer';

export default function App() {
  return (
    <>
      <a href="#hero" className="visually-hidden" id="skip-to-content">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        <Hero />
        <IntroStatement />
        <FeaturedProperties />
        <ArchitectureStory />
        <Lifestyle />
        <WhyUs />
        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}
