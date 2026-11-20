import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, Gem, Shield, Users } from 'lucide-react';
import '../styles/WhyUs.css';

gsap.registerPlugin(ScrollTrigger);

const PILLARS = [
  {
    id: 1,
    num: '01',
    icon: Compass,
    title: 'Curatorial Precision',
    desc: 'Every property in our portfolio is selected through a rigorous process — location, architecture, construction quality, and the intangible quality of its atmosphere all considered in depth.',
  },
  {
    id: 2,
    num: '02',
    icon: Gem,
    title: 'Material Integrity',
    desc: 'We work only with residences whose materials have been chosen for longevity. Stone, timber, glass and plaster selected to respond to their environment over decades.',
  },
  {
    id: 3,
    num: '03',
    icon: Shield,
    title: 'Discreet Counsel',
    desc: 'Our advisory is personal and confidential. We guide clients through every stage of acquisition with clarity, patience and total discretion — no high-pressure sales.',
  },
  {
    id: 4,
    num: '04',
    icon: Users,
    title: 'Lasting Relationship',
    desc: 'The acquisition is the beginning. We remain available to our clients long after handover — for guidance, connections, and occasional conversation about remarkable architecture.',
  },
];

export default function WhyUs() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from('.whyus__header', {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true,
        },
      });

      gsap.from('.pillar', {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.whyus__pillars',
          start: 'top 80%',
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why-us"
      className="whyus"
      ref={sectionRef}
      aria-labelledby="whyus-heading"
    >
      <div className="whyus__inner">
        <div className="whyus__header">
          <span className="section-label">Our Distinction</span>
          <h2 id="whyus-heading" className="whyus__heading">
            A different kind of <em>counsel</em>
          </h2>
          <p className="whyus__subheading">
            We believe that the right home is found through patience, discernment, and
            a genuine understanding of what endures. These are the values we bring to every conversation.
          </p>
        </div>

        <div className="whyus__pillars">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div key={pillar.id} className="pillar">
                <div className="pillar__icon" aria-hidden="true">
                  <Icon size={28} strokeWidth={1.25} />
                </div>
                <div className="pillar__num" aria-hidden="true">{pillar.num}</div>
                <h3 className="pillar__title">{pillar.title}</h3>
                <p className="pillar__desc">{pillar.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
