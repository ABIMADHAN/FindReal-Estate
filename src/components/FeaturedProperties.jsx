import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Bed, Bath, Square, ArrowRight, X, Compass, Calendar } from 'lucide-react';
import { properties, categories } from '../data/properties.js';
import '../styles/FeaturedProperties.css';

gsap.registerPlugin(ScrollTrigger);

function PropertyCard({ property, index, onSelect }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 60,
        duration: 0.95,
        delay: (index % 3) * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, cardRef);

    return () => ctx.revert();
  }, [index]);

  // Interactive 3D Card Tilt on Hover
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;

    if (glowRef.current) {
      glowRef.current.style.opacity = '1';
      glowRef.current.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(182, 151, 103, 0.18), transparent 70%)`;
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    if (glowRef.current) {
      glowRef.current.style.opacity = '0';
    }
  };

  return (
    <article
      ref={cardRef}
      className="property-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(property)}
      tabIndex={0}
      role="button"
      aria-haspopup="dialog"
      aria-label={`${property.name}, ${property.location} — ${property.type}. Press enter to view architectural sheet.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(property);
        }
      }}
    >
      <div ref={glowRef} className="property-card__glow" aria-hidden="true" />

      <div className="property-card__image-wrap">
        <img
          src={property.image}
          alt={`${property.name} — contemporary ${property.type} in ${property.location}`}
          loading="lazy"
        />
        <span className="property-card__tag">{property.tag}</span>

        <div className="property-card__overlay" aria-hidden="true">
          <span className="property-card__view">
            Architectural Dossier <ArrowRight size={14} />
          </span>
        </div>
      </div>

      <div className="property-card__body">
        <div className="property-card__location">
          <MapPin size={12} aria-hidden="true" />
          <span>{property.location}</span>
        </div>

        <h3 className="property-card__name">{property.name}</h3>
        <p className="property-card__desc">{property.description}</p>

        <div className="property-card__meta" aria-label="Property specifications">
          <div className="property-card__meta-item">
            <Bed size={13} aria-hidden="true" />
            <span>{property.beds} Suites</span>
          </div>
          <div className="property-card__meta-item">
            <Bath size={13} aria-hidden="true" />
            <span>{property.baths} Baths</span>
          </div>
          <div className="property-card__meta-item">
            <Square size={13} aria-hidden="true" />
            <span>{property.area}</span>
          </div>
        </div>

        <p className="property-card__price">{property.price}</p>
      </div>
    </article>
  );
}

export default function FeaturedProperties() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from('.properties__header', {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filtered =
    activeCategory === 'all'
      ? properties
      : properties.filter((p) => p.category === activeCategory);

  return (
    <section id="properties" className="properties" ref={sectionRef} aria-labelledby="properties-heading">
      <div className="properties__header">
        <div>
          <span className="section-label" style={{ color: 'var(--brass)', marginBottom: '1rem', display: 'block' }}>
            Curated Portfolio
          </span>
          <h2 id="properties-heading" className="properties__heading">
            Selected <em>Residences</em>
          </h2>
        </div>

        <div className="properties__filters" role="tablist" aria-label="Filter residences by type">
          {categories.map(({ key, label }) => (
            <button
              key={key}
              role="tab"
              aria-selected={activeCategory === key}
              className={`filter-btn${activeCategory === key ? ' active' : ''}`}
              onClick={() => setActiveCategory(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div
        className="properties__grid"
        role="tabpanel"
        aria-label={`${categories.find((c) => c.key === activeCategory)?.label} listings`}
      >
        {filtered.length > 0 ? (
          filtered.map((property, i) => (
            <PropertyCard
              key={property.id}
              property={property}
              index={i}
              onSelect={setSelectedProperty}
            />
          ))
        ) : (
          <p className="properties__empty">No residences in this category.</p>
        )}
      </div>

      {/* ── Interactive Property Dossier Modal ── */}
      {selectedProperty && (
        <div
          className="property-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={() => setSelectedProperty(null)}
        >
          <div
            className="property-modal__content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="property-modal__close"
              onClick={() => setSelectedProperty(null)}
              aria-label="Close dossier"
            >
              <X size={20} />
            </button>

            <div className="property-modal__img">
              <img src={selectedProperty.image} alt={selectedProperty.name} />
              <div className="property-modal__badge">{selectedProperty.tag}</div>
            </div>

            <div className="property-modal__body">
              <div className="property-card__location" style={{ marginBottom: '0.5rem' }}>
                <MapPin size={14} aria-hidden="true" />
                <span>{selectedProperty.location}</span>
              </div>

              <h2 id="modal-title" className="property-modal__title">
                {selectedProperty.name}
              </h2>

              <p className="property-modal__desc">
                {selectedProperty.description}
              </p>

              <div className="property-modal__specs">
                <div className="spec-card">
                  <span className="spec-label">Bedrooms</span>
                  <strong className="spec-val">{selectedProperty.beds} Suites</strong>
                </div>
                <div className="spec-card">
                  <span className="spec-label">Bathrooms</span>
                  <strong className="spec-val">{selectedProperty.baths} Marble Baths</strong>
                </div>
                <div className="spec-card">
                  <span className="spec-label">Total Living Area</span>
                  <strong className="spec-val">{selectedProperty.area}</strong>
                </div>
                <div className="spec-card">
                  <span className="spec-label">Acquisition Status</span>
                  <strong className="spec-val" style={{ color: 'var(--brass)' }}>Private Treaty</strong>
                </div>
              </div>

              <div className="property-modal__actions">
                <a
                  href={`mailto:enquiries@solenresidences.example.com?subject=Enquiry:%20${encodeURIComponent(selectedProperty.name)}`}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Request Private Dossier
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
