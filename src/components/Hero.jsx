import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import '../styles/Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const trackRef = useRef(null);
  const pinnedRef = useRef(null);
  const mainContentRef = useRef(null);
  const textCutoutRef = useRef(null);
  const cloudSurgeRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Initial subtle entrance for text & clouds
      gsap.from(mainContentRef.current, {
        opacity: 0,
        y: 35,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.2,
      });

      if (prefersReduced) return;

      // ── GSAP ScrollTrigger Matching Video Timeline ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top top',
          end: '+=200%',
          pin: pinnedRef.current,
          scrub: 1.0,
          anticipatePin: 1,
        },
      });

      // 1. Fade & scale out the top "Find What Moves You" hero content
      tl.to(
        mainContentRef.current,
        {
          opacity: 0,
          scale: 0.92,
          y: -35,
          duration: 0.3,
          ease: 'power2.inOut',
        },
        0
      );

      // 2. Reveal the F▶ND Real Estate image-masked cutout
      tl.to(
        textCutoutRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: 'power2.inOut',
        },
        0.15
      );

      // 3. Volumetric white cloud surge engulfs the cutout
      tl.to(
        cloudSurgeRef.current,
        {
          opacity: 1,
          y: '0%',
          duration: 0.45,
          ease: 'power3.inOut',
        },
        0.48
      );

      // 4. Fade out the cutout behind the clouds
      tl.to(
        textCutoutRef.current,
        {
          opacity: 0,
          scale: 0.96,
          duration: 0.3,
          ease: 'power2.inOut',
        },
        0.62
      );
    }, trackRef);

    return () => ctx.revert();
  }, []);

  const scrollToProperties = (e) => {
    e.preventDefault();
    document.querySelector('#why-find')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="hero-track" ref={trackRef}>
      <section id="hero" className="hero-pinned" ref={pinnedRef} aria-label="FIND Real Estate Hero">
        {/* ── 1. Sky Gradient Background ── */}
        <div className="hero__sky-bg" aria-hidden="true" />

        {/* ── 2. Atmospheric Clouds at Base (No house image at initial load) ── */}
        <div className="hero__clouds-base" aria-hidden="true" />

        {/* ── 3. Main Hero Typography & Call-To-Action (Top View on Initial Reload) ── */}
        <div className="hero__main-content" ref={mainContentRef}>
          <h1 className="hero__main-title">Find What Moves You</h1>
          <p className="hero__main-sub">
            Expert agents. Real guidance. A clear path to find what’s next.
          </p>
          <a href="#properties" className="hero__btn-find" onClick={scrollToProperties}>
            Find Properties
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>

        {/* ── 4. Morphing Image-Masked Cutout (Appears upon scroll) ── */}
        <div className="hero__cutout-container" aria-hidden="true">
          <div className="hero__text-cutout" ref={textCutoutRef}>
            <div className="hero__cutout-title">F▶ND</div>
            <div className="hero__cutout-sub">Real Estate</div>
          </div>
        </div>

        {/* ── 5. Volumetric Cloud Surge Layer (Transitions to next section) ── */}
        <div
          className="hero__cloud-surge"
          ref={cloudSurgeRef}
          style={{ transform: 'translateY(25%)' }}
          aria-hidden="true"
        >
          <div className="hero__cloud-surge-overlay" />
        </div>
      </section>
    </div>
  );
}
