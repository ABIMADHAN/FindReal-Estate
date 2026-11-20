import { Globe, Camera, Hash, Rss } from 'lucide-react';
import '../styles/Footer.css';

const NAV_COL1 = [
  { label: 'All Residences', href: '#properties' },
  { label: 'Villas', href: '#properties' },
  { label: 'Penthouses', href: '#properties' },
  { label: 'Estates', href: '#properties' },
];

const NAV_COL2 = [
  { label: 'Our Approach', href: '#intro' },
  { label: 'Architecture Story', href: '#story' },
  { label: 'Lifestyle', href: '#lifestyle' },
  { label: 'Why SOLEN', href: '#why-us' },
];

const NAV_COL3 = [
  { label: 'Enquire', href: '#contact' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Legal Notice', href: '#' },
];

const SOCIALS = [
  { icon: Camera, label: 'Instagram', href: '#' },
  { icon: Hash, label: 'X (Twitter)', href: '#' },
  { icon: Globe, label: 'LinkedIn', href: '#' },
  { icon: Rss, label: 'Newsletter', href: '#' },
];

const handleAnchor = (e, href) => {
  if (href.startsWith('#') && href.length > 1) {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">SOLEN<span>.</span></div>
            <p className="footer__tagline">
              A curated portfolio of contemporary architectural residences in exceptional
              European locations. Sample content — not a live property listing.
            </p>
            <nav className="footer__socials" aria-label="Social media links">
              {SOCIALS.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="footer__social-link"
                  aria-label={label}
                  onClick={(e) => handleAnchor(e, href)}
                >
                  <Icon size={16} aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>

          {/* Col 1 */}
          <div>
            <p className="footer__col-title">Residences</p>
            <nav className="footer__col-links" aria-label="Residence types">
              {NAV_COL1.map(({ label, href }) => (
                <a key={label} href={href} onClick={(e) => handleAnchor(e, href)}>
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 2 */}
          <div>
            <p className="footer__col-title">The Brand</p>
            <nav className="footer__col-links" aria-label="Brand sections">
              {NAV_COL2.map(({ label, href }) => (
                <a key={label} href={href} onClick={(e) => handleAnchor(e, href)}>
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3 */}
          <div>
            <p className="footer__col-title">Connect</p>
            <nav className="footer__col-links" aria-label="Contact and legal">
              {NAV_COL3.map(({ label, href }) => (
                <a key={label} href={href} onClick={(e) => handleAnchor(e, href)}>
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {year} SOLEN Residences. Demo content — all properties and prices are fictional.
          </p>
          <nav className="footer__legal" aria-label="Legal links">
            <a href="#">Privacy</a>
            <a href="#">Cookies</a>
            <a href="#">Disclaimer</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
