import { Link } from 'react-router-dom';
import { siteMeta } from '../data/portfolio';

const Footer = () => {
  return (
    <footer className="global-footer" style={{ background: 'var(--color-bg)', color: 'var(--color-ivory)', borderTop: '1px solid rgba(253, 251, 247, 0.05)', position: 'relative', zIndex: 5, overflow: 'hidden' }}>
      
      {/* 1. STRATEGIC ATELIERS & DIRECTORY */}
      <div style={{ padding: '8vh 5vw', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem' }}>
        
        {/* Ateliers Column */}
        <div className="footer-ateliers-wrap" style={{ gridColumn: '1 / 6', display: 'flex', gap: '4rem' }}>
           <div>
             <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'block', marginBottom: '1.5rem' }}>Kerala Studio</span>
             <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--color-ivory)' }}>Manjeri, Kerala</h4>
             <p style={{ color: 'var(--color-taupe)', fontSize: '0.75rem', lineHeight: 2, textTransform: 'uppercase', letterSpacing: '1px' }}>
                THURAKKAL JUNCTION<br/>MANJERI, KERALA 676121<br/>
                <span style={{ color: 'rgba(212, 175, 55, 0.5)' }}>INDIA</span>
             </p>
           </div>
           <div>
             <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'block', marginBottom: '1.5rem' }}>Dubai Studio</span>
             <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--color-ivory)' }}>Dubai, UAE</h4>
             <p style={{ color: 'var(--color-taupe)', fontSize: '0.75rem', lineHeight: 2, textTransform: 'uppercase', letterSpacing: '1px' }}>
                IN5, PRODUCTION CITY<br/>DUBAI<br/>
                <span style={{ color: 'rgba(212, 175, 55, 0.5)' }}>UNITED ARAB EMIRATES</span>
             </p>
           </div>
        </div>

        {/* Directory Column */}
        <div className="footer-directory-wrap" style={{ gridColumn: '7 / 13', display: 'flex', justifyContent: 'flex-end', gap: '6rem' }}>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'block', marginBottom: '1rem', opacity: 0.8 }}>Explore</span>
              <Link to="/gallery" className="interactive footer-link-modern">Photography</Link>
              <Link to="/stories" className="interactive footer-link-modern">Wedding Films</Link>
              <Link to="/what-we-do" className="interactive footer-link-modern">Our Services</Link>
              <Link to="/about" className="interactive footer-link-modern">About Us</Link>
           </div>

           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'block', marginBottom: '1rem', opacity: 0.8 }}>Contact</span>
              <a href={`https://wa.me/${siteMeta.contact.indiaDesk.wa}`} target="_blank" rel="noopener noreferrer" className="interactive footer-link-modern">Kerala Studio</a>
              <a href={`https://wa.me/${siteMeta.contact.uaeDesk.wa}`} target="_blank" rel="noopener noreferrer" className="interactive footer-link-modern">Dubai Studio</a>
              <a href={`https://instagram.com/${siteMeta.contact.instagram}`} target="_blank" rel="noopener noreferrer" className="interactive footer-link-modern">Instagram</a>
              <a href={`mailto:${siteMeta.contact.email}`} className="interactive footer-link-modern">Email Us</a>
           </div>
        </div>

      </div>

      {/* 2. MONUMENTAL BRANDING: Outlined Title */}
      <div style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', margin: '1vh 0 2vh', position: 'relative' }}>
         <h1 className="footer-giant-title">IMC Weddings<span style={{ color: 'var(--color-gold)', opacity: 0.5 }}>.</span></h1>

         {/* Cinematic Signature Layer */}
         <div style={{ position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
            <p style={{ fontFamily: 'var(--font-signature)', fontSize: 'clamp(1.2rem, 3vw, 2.2rem)', color: 'var(--color-ivory)', opacity: 0.8, pointerEvents: 'none' }}>
               Kerala &amp; Dubai
            </p>
         </div>
      </div>

      {/* 3. FOOTER BOTTOM: Rights & Meta */}
      <div className="footer-bottom-bar" style={{ padding: '2rem 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <span style={{ fontSize: '0.55rem', color: 'var(--color-gold)', letterSpacing: '2px', fontWeight: 600 }}>IMC WEDDINGS</span>
          <span style={{ fontSize: '0.65rem', color: 'rgba(253, 251, 247, 0.4)', letterSpacing: '1px' }}>
            © {new Date().getFullYear()} / KERALA &amp; DUBAI / MADE BY <a href="https://brandliftonline.in/" target="_blank" rel="noopener noreferrer" className="interactive" style={{ color: 'var(--color-gold)', textDecoration: 'none', transition: 'opacity 0.3s' }}>BRANDLIFT ONLINE</a>
          </span>
        </div>


      </div>
      
    </footer>
  );
};

export default Footer;
