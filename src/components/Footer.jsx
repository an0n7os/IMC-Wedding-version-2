import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'phosphor-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="global-footer" style={{ background: 'var(--color-bg)', color: 'var(--color-ivory)', borderTop: '1px solid rgba(253, 251, 247, 0.05)', position: 'relative', zIndex: 5, overflow: 'hidden' }}>
      
      {/* 1. ARCHITECTURAL HEADER: Mission & Return to Origin */}
      <div style={{ padding: '8vh 5vw 4vh 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(253, 251, 247, 0.05)' }}>
        <div style={{ maxWidth: '600px' }}>
           <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', letterSpacing: '4px', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '2rem' }}>The Archive Ritual</h3>
           <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1, fontFamily: 'var(--font-heading)', marginBottom: '3rem' }}>
             Preserving Love,<br/>One Legacy At A Time.
           </h2>
           <Link to="/inquire" className="interactive btn-premium-diamond" style={{ display: 'inline-flex', padding: '1.2rem 3rem', textDecoration: 'none' }} data-cursor="explore">
             <span className="btn-text">Start Your Narrative</span>
             <span className="btn-icon"><ArrowUpRight weight="bold" /></span>
           </Link>
        </div>

        {/* Return to Origin (Magnetic Top Button) */}
        <div 
          onClick={scrollToTop}
          className="interactive magnetic-btn" 
          data-cursor="view"
          style={{ 
            width: '120px', height: '120px', borderRadius: '50%', border: '1px solid rgba(212, 175, 55, 0.3)', 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            transition: 'all 0.6s var(--ease-cinematic)'
          }}
        >
           <span style={{ fontSize: '0.5rem', color: 'var(--color-gold)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '0.8rem' }}>Origin</span>
           <div style={{ fontSize: '1.5rem', color: 'var(--color-ivory)', transform: 'rotate(-45deg)' }}>&rarr;</div>
        </div>
      </div>

      {/* 2. STRATEGIC ATELIERS & DIRECTORY */}
      <div style={{ padding: '8vh 5vw', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '4rem' }}>
        
        {/* Ateliers Column */}
        <div style={{ gridColumn: '1 / 6', display: 'flex', gap: '4rem' }}>
           <div>
             <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'block', marginBottom: '1.5rem' }}>// Atelier I (Creative Vault)</span>
             <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--color-ivory)' }}>Manjeri, India</h4>
             <p style={{ color: 'var(--color-taupe)', fontSize: '0.75rem', lineHeight: 2, textTransform: 'uppercase', letterSpacing: '1px' }}>
                THURAKKAL JUNCTION<br/>KERALA 676121<br/>
                <span style={{ color: 'rgba(212, 175, 55, 0.5)' }}>11.1197° N, 76.1205° E</span>
             </p>
           </div>
           <div>
             <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'block', marginBottom: '1.5rem' }}>// Atelier II (Strategy)</span>
             <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--color-ivory)' }}>Dubai, UAE</h4>
             <p style={{ color: 'var(--color-taupe)', fontSize: '0.75rem', lineHeight: 2, textTransform: 'uppercase', letterSpacing: '1px' }}>
                IN5, PRODUCTION CITY<br/>UNITED ARAB EMIRATES<br/>
                <span style={{ color: 'rgba(212, 175, 55, 0.5)' }}>25.0428° N, 55.1578° E</span>
             </p>
           </div>
        </div>

        {/* Directory Column */}
        <div style={{ gridColumn: '7 / 13', display: 'flex', justifyContent: 'flex-end', gap: '6rem' }}>
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'block', marginBottom: '1rem', opacity: 0.8 }}>Archives</span>
              <Link to="/gallery" className="interactive footer-link-modern" data-cursor="nav-hover">Photography</Link>
              <Link to="/stories" className="interactive footer-link-modern" data-cursor="nav-hover">Cinematography</Link>
              <Link to="/what-we-do" className="interactive footer-link-modern" data-cursor="nav-hover">Atelier Mission</Link>
              <Link to="/about" className="interactive footer-link-modern" data-cursor="nav-hover">The Dream Weavers</Link>
           </div>

           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <span style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '4px', color: 'var(--color-gold)', display: 'block', marginBottom: '1rem', opacity: 0.8 }}>Connection</span>
              <a href="https://wa.me/919544330088" target="_blank" rel="noopener noreferrer" className="interactive footer-link-modern">India Desk</a>
              <a href="https://wa.me/971547720088" target="_blank" rel="noopener noreferrer" className="interactive footer-link-modern">Dubai Desk</a>
              <a href="https://instagram.com/_imcweddings_" target="_blank" rel="noopener noreferrer" className="interactive footer-link-modern">Journal</a>
              <a href="mailto:info@imcweddings.com" className="interactive footer-link-modern">Direct Email</a>
           </div>
        </div>

      </div>

      {/* 3. MONUMENTAL BRANDING: Outlined Title */}
      <div style={{ width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', marginTop: '4vh', position: 'relative' }}>
         <h1 className="footer-giant-title">IMC Weddings<span style={{ color: 'var(--color-gold)', opacity: 0.5 }}>.</span></h1>
         
         {/* Cinematic Signature Layer */}
         <div style={{ position: 'absolute', bottom: '20%', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
            <p style={{ fontFamily: 'var(--font-signature)', fontSize: 'clamp(2rem, 6vw, 4rem)', color: 'var(--color-ivory)', opacity: 0.8, pointerEvents: 'none' }}>
               Established for the soul.
            </p>
         </div>
      </div>

      {/* 4. FOOTER BOTTOM: Rights & Meta */}
      <div className="footer-bottom-bar" style={{ padding: '3rem 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <span style={{ fontSize: '0.55rem', color: 'var(--color-gold)', letterSpacing: '2px', fontWeight: 600 }}>IMC® FLAGSHIP</span>
          <span style={{ fontSize: '0.65rem', color: 'rgba(253, 251, 247, 0.4)', letterSpacing: '1px' }}>
            © {new Date().getFullYear()} / ARCHIVING LEGACIES GLOBALLY / MADE BY <a href="https://brandliftonline.in/" target="_blank" rel="noopener noreferrer" className="interactive" style={{ color: 'var(--color-gold)', textDecoration: 'none', transition: 'opacity 0.3s' }} data-cursor="explore">BRANDLIFT ONLINE</a>
          </span>
        </div>
        
        <div style={{ display: 'flex', gap: '3rem' }}>
          <span className="interactive footer-link-modern" data-cursor="view" style={{ fontSize: '0.6rem', opacity: 0.5 }}>Legal Notice</span>
          <span className="interactive footer-link-modern" data-cursor="view" style={{ fontSize: '0.6rem', opacity: 0.5 }}>Private Domain</span>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
