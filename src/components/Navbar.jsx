import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import '../styles/Navbar.css';

const NAV_ITEMS = [
  { label: 'Search', href: '#properties', hasDropdown: false },
  { label: 'Neighborhoods', href: '#lifestyle', hasDropdown: false },
  { label: 'Agents', href: '#why-find', hasDropdown: false },
  { label: 'Join', href: '#contact', hasDropdown: true },
  { label: 'Paperwork', href: '#contact', hasDropdown: true },
  { label: 'Resources', href: '#story', hasDropdown: true },
  { label: 'About', href: '#why-find', hasDropdown: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header className={`navbar${scrolled ? ' scrolled' : ''}`} role="banner">
        {/* Brand Logo matching video */}
        <a href="#hero" className="navbar__logo" onClick={(e) => handleNavClick(e, '#hero')}>
          F<span className="navbar__logo-arrow">▶</span>ND
        </a>

        {/* Desktop Nav Links */}
        <nav className="navbar__nav" aria-label="Primary navigation">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="navbar__nav-item"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              <span>{item.label}</span>
              {item.hasDropdown && <ChevronDown size={13} className="navbar__chevron" />}
            </a>
          ))}
        </nav>

        {/* Sign In Button */}
        <a
          href="#contact"
          className="navbar__cta-signin"
          onClick={(e) => handleNavClick(e, '#contact')}
        >
          Sign In
        </a>

        {/* Mobile Toggle */}
        <button
          ref={toggleRef}
          className="navbar__toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mobile Menu */}
      <nav
        id="mobile-menu"
        className={`navbar__mobile${menuOpen ? ' open' : ''}`}
        aria-label="Mobile navigation"
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          style={{ fontWeight: 700, color: '#000', marginTop: '1rem' }}
        >
          Sign In →
        </a>
      </nav>
    </>
  );
}
