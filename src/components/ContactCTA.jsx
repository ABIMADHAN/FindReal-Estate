import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Mail } from 'lucide-react';
import '../styles/ContactCTA.css';

gsap.registerPlugin(ScrollTrigger);

// Replace with your actual enquiry email address
const ENQUIRY_EMAIL = 'enquiries@solenresidences.example.com';

export default function ContactCTA() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          once: true,
        },
      });

      tl.from('.contact__label', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power3.out',
      })
        .from(
          '.contact__heading',
          {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.4'
        )
        .from(
          '.contact__sub',
          {
            opacity: 0,
            y: 25,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.5'
        )
        .from(
          '.contact__actions > *',
          {
            opacity: 0,
            y: 20,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power3.out',
          },
          '-=0.4'
        );

      // Subtle parallax on the bg image
      gsap.to('.contact__bg img', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      className="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
    >
      <div className="contact__bg" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&q=80&auto=format&fit=crop"
          alt=""
          loading="lazy"
        />
      </div>
      <div className="contact__overlay" aria-hidden="true" />

      <div className="contact__content">
        <div className="contact__label">
          <span className="section-label">Begin the Conversation</span>
        </div>

        <h2 id="contact-heading" className="contact__heading">
          Find Your<br />
          <em>Residence</em>
        </h2>

        <p className="contact__sub">
          We work with a small number of clients at any given time. If you are
          considering a significant acquisition or simply wish to understand the
          landscape, we welcome the conversation.
        </p>

        <div className="contact__actions">
          <a
            href={`mailto:${ENQUIRY_EMAIL}?subject=Residence%20Enquiry`}
            className="btn-contact"
            aria-label="Send an enquiry email to SOLEN Residences"
          >
            Send an Enquiry
            <ArrowRight size={16} aria-hidden="true" />
          </a>

          <a
            href={`mailto:${ENQUIRY_EMAIL}`}
            className="contact__email-link"
            aria-label={`Email us directly at ${ENQUIRY_EMAIL}`}
          >
            <Mail size={14} aria-hidden="true" style={{ marginRight: '0.5rem' }} />
            {ENQUIRY_EMAIL}
          </a>
        </div>
      </div>
    </section>
  );
}
