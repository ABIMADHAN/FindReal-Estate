import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/IntroStatement.css';

gsap.registerPlugin(ScrollTrigger);

export default function IntroStatement() {
  const sectionRef = useRef(null);
  const skylineRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Reveal statement text on scroll
      gsap.from('.why-find__label, .why-find__statement', {
        opacity: 0,
        y: 40,
        duration: 1.1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      // City Skyline smooth parallax
      if (skylineRef.current) {
        gsap.to(skylineRef.current, {
          yPercent: -10,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: skylineRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div id="why-find" className="why-find-wrapper" ref={sectionRef}>
      {/* ── Editorial Statement Section ── */}
      <section className="why-find__text-section" aria-labelledby="why-heading">
        <div className="why-find__container">
          <div className="why-find__label">
            <span id="why-heading">Why FIND</span>
          </div>

          <div className="why-find__content">
            <h2 className="why-find__statement">
              <span className="why-find__bold">Your life’s changing. Don’t just find a place — find what’s next.</span>{' '}
              <span className="why-find__muted">
                We help you move forward with clarity, confidence, and the right agent by your side.
              </span>
            </h2>
          </div>
        </div>
      </section>

      {/* ── Cinematic City Skyline Showcase (from video) ── */}
      <div className="why-find__skyline-showcase" aria-label="City skyline view">
        <div className="why-find__skyline-inner">
          <img
            ref={skylineRef}
            src="/assets/city-skyline.jpg"
            alt="Panoramic aerial skyline of Manhattan with Empire State Building and classic brownstone avenues"
            className="why-find__skyline-img"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}
