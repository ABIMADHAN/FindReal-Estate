import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Lifestyle.css';

gsap.registerPlugin(ScrollTrigger);

const LIFESTYLE_ITEMS = [
  {
    id: 1,
    num: '01',
    label: 'The Setting',
    title: 'Landscapes that\ndefine the horizon',
    desc: 'Each property is situated within a landscape chosen for its natural character — whether a coastal promontory, a forested hillside, or a quiet agricultural plain. The setting is never incidental.',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=900&q=80&auto=format&fit=crop',
    alt: 'Contemporary residence overlooking a verdant landscape at dusk',
    reversed: false,
  },
  {
    id: 2,
    num: '02',
    label: 'The Interior',
    title: 'Rooms built for\nquiet contemplation',
    desc: 'Interiors are planned with the same care as the exterior — rooms that feel considered rather than styled, with generous natural light, honest materials and crafted details that reward close attention.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80&auto=format&fit=crop',
    alt: 'Minimal luxury interior with soft light filtering through tall windows',
    reversed: true,
  },
  {
    id: 3,
    num: '03',
    label: 'The Garden',
    title: 'Private gardens\nshaped by seasons',
    desc: 'Outdoor spaces are conceived as extensions of the interior — terraces for evening dining, walled gardens for morning stillness, pools that reflect the sky at changing hours of the day.',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=900&q=80&auto=format&fit=crop',
    alt: 'Architectural terrace with swimming pool overlooking mature garden',
    reversed: false,
  },
];

export default function Lifestyle() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from('.lifestyle__header', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.lifestyle__header',
          start: 'top 80%',
          once: true,
        },
      });

      // Each item reveals
      gsap.utils.toArray('.lifestyle__item').forEach((item, i) => {
        const img  = item.querySelector('.lifestyle__item-image img');
        const text = item.querySelector('.lifestyle__item-text');

        // Image clip reveal
        gsap.from(item.querySelector('.lifestyle__item-image'), {
          clipPath: 'inset(0 100% 0 0)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: item,
            start: 'top 75%',
            once: true,
          },
        });

        // Subtle image parallax
        if (img) {
          gsap.to(img, {
            yPercent: -6,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        }

        // Text stagger
        if (text) {
          gsap.from(text.children, {
            opacity: 0,
            y: 25,
            stagger: 0.12,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 70%',
              once: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="lifestyle"
      className="lifestyle"
      ref={sectionRef}
      aria-labelledby="lifestyle-heading"
    >
      <div className="lifestyle__header">
        <div>
          <span className="section-label" style={{ marginBottom: '1.25rem', display: 'block' }}>
            The SOLEN Life
          </span>
          <h2 id="lifestyle-heading" className="lifestyle__heading">
            A considered way<br />
            of <em>living</em>
          </h2>
        </div>
        <p className="lifestyle__intro">
          Beyond the architecture lies a quality of life shaped by landscape, craft, and
          the particular light of each location. These are not simply properties — they are
          environments that sustain a way of living.
        </p>
      </div>

      <div className="lifestyle__compositions">
        {LIFESTYLE_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`lifestyle__item${item.reversed ? ' lifestyle__item--reversed' : ''}`}
          >
            <div className="lifestyle__item-image">
              <img src={item.image} alt={item.alt} loading="lazy" />
              <span className="lifestyle__item-image-accent" aria-hidden="true" />
            </div>

            <div className="lifestyle__item-text">
              <div className="lifestyle__item-num" aria-hidden="true">{item.num}</div>
              <div className="lifestyle__item-label">
                <span className="section-label">{item.label}</span>
              </div>
              <h3 className="lifestyle__item-title">
                {item.title.split('\n').map((line, i) => (
                  <span key={i} style={{ display: 'block' }}>{line}</span>
                ))}
              </h3>
              <p className="lifestyle__item-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
