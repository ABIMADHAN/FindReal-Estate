import { useEffect, useRef, useState } from 'react';
import { storyChapters } from '../data/properties.js';
import '../styles/ArchitectureStory.css';

export default function ArchitectureStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);

  // Scroll-driven chapter switching
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const { top, height } = section.getBoundingClientRect();
      const scrollProgress = -top / (height - window.innerHeight);
      const clamped = Math.max(0, Math.min(1, scrollProgress));
      const idx = Math.min(
        storyChapters.length - 1,
        Math.floor(clamped * storyChapters.length)
      );
      setActiveIndex(idx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollHeight = storyChapters.length * 100;

  return (
    <section
      id="story"
      ref={sectionRef}
      className="arch-story"
      aria-labelledby="story-heading"
      style={{ height: `${scrollHeight}vh` }}
    >
      {/* ── Desktop Pinned Photographic Chapter View ── */}
      <div className="arch-story__sticky-container" ref={stickyRef}>
        {/* Full-bleed Architectural Plates */}
        {storyChapters.map((chapter, i) => (
          <div
            key={chapter.id}
            className={`arch-story__scene${i === activeIndex ? ' active' : ''}`}
            aria-hidden={i !== activeIndex}
          >
            <img
              src={chapter.image}
              alt={chapter.headline}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}

        <div className="arch-story__scene-overlay" aria-hidden="true" />

        {/* Chapter Caption Content */}
        <div className="arch-story__caption">
          <div className="arch-story__caption-inner">
            <div className="arch-story__chapter-num">
              <span>Chapter {String(activeIndex + 1).padStart(2, '0')} · Architectural Study</span>
            </div>
            <h2 id="story-heading" className="arch-story__headline">
              {storyChapters[activeIndex].headline}
            </h2>
            <p className="arch-story__body">
              {storyChapters[activeIndex].body}
            </p>
          </div>
        </div>

        {/* Chapter Progress Dots Navigation */}
        <nav className="arch-story__progress" aria-label="Story chapter navigation">
          {storyChapters.map((chapter, i) => (
            <button
              key={chapter.id}
              className={`arch-story__dot${i === activeIndex ? ' active' : ''}`}
              aria-label={`Go to chapter ${i + 1}: ${chapter.headline}`}
              aria-current={i === activeIndex ? 'true' : undefined}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </nav>
      </div>

      {/* ── Mobile Fallback Stacked Layout ── */}
      <div className="arch-story__mobile" aria-label="Architecture story chapters">
        {storyChapters.map((chapter, i) => (
          <article key={chapter.id} className="arch-story__mobile-chapter">
            <div className="arch-story__mobile-img">
              <img src={chapter.image} alt={chapter.headline} loading="lazy" />
            </div>
            <span className="section-label" style={{ color: 'var(--brass)', marginBottom: '0.75rem', display: 'block' }}>
              Chapter {String(i + 1).padStart(2, '0')}
            </span>
            <h2 className="arch-story__mobile-headline">{chapter.headline}</h2>
            <p className="arch-story__mobile-body">{chapter.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
