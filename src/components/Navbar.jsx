import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { List, X } from 'phosphor-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      padding: isScrolled ? '0.7rem 0' : '1.5rem 0',
      zIndex: 1000,
      transition: 'all 0.6s var(--ease-cinematic)',
      background: isScrolled ? 'rgba(10, 10, 10, 0.8)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(253, 251, 247, 0.05)' : 'none'
    }}>
      <div className="container-wide" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="interactive" data-cursor="explore" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="/images/new logo png.png"
            alt="IMC WEDDINGS"
            className="navbar-logo"
            style={{
              height: isScrolled ? 'clamp(32px, 5vw, 36px)' : 'clamp(48px, 8vw, 55px)',
              width: 'auto',
              transition: 'all 0.6s var(--ease-cinematic)',
              filter: 'brightness(1.3) contrast(1.1)',
              objectFit: 'contain',
            }}
          />
          <span style={{ 
            marginLeft: '0.6rem', 
            color: 'var(--color-ivory)', 
            fontFamily: "'Inter', sans-serif", 
            fontSize: isScrolled ? '0.85rem' : '1.1rem',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            transition: 'all 0.6s var(--ease-cinematic)',
            fontWeight: 400,
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            IMC <span style={{ color: 'var(--color-gold)', opacity: 0.9, fontSize: '0.85em', fontWeight: 300, letterSpacing: '4px' }}>Weddings</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', alignItems: 'center' }} className="d-none-mobile">
          <li><Link to="/about" className="interactive nav-link" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2.5px', color: 'var(--color-ivory)', opacity: 0.8 }} data-cursor="explore">About</Link></li>
          <li><Link to="/what-we-do" className="interactive nav-link" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2.5px', color: 'var(--color-ivory)', opacity: 0.8 }} data-cursor="explore">What We Do</Link></li>
          <li><Link to="/gallery" className="interactive nav-link" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2.5px', color: 'var(--color-ivory)', opacity: 0.8 }} data-cursor="view">Gallery</Link></li>
          <li><Link to="/stories" className="interactive nav-link" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2.5px', color: 'var(--color-ivory)', opacity: 0.8 }} data-cursor="play">Stories</Link></li>
          <li><Link to="/info" className="interactive nav-link" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '2.5px', color: 'var(--color-ivory)', opacity: 0.8 }} data-cursor="explore">Info</Link></li>
          <li style={{ marginLeft: '-2rem' }}><Link to="/inquire" className="btn-transparent-gold interactive" style={{ padding: '0.8rem 2.2rem', color: 'var(--color-ivory)' }} data-cursor="explore">Inquire</Link></li>
        </ul>

        {/* Mobile Toggle */}
        <button className="interactive d-show-mobile" onClick={() => setIsMenuOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--color-ivory)', fontSize: '1.8rem', padding: '0.5rem' }}>
          <List />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`} style={{
        position: 'fixed',
        top: 0,
        right: isMenuOpen ? '0' : '-100%',
        width: '100%',
        height: '100vh',
        backgroundColor: 'var(--color-bg)',
        zIndex: 2000,
        transition: 'right 0.6s var(--ease-cinematic)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2.5rem'
      }}>
        <button className="interactive" onClick={() => setIsMenuOpen(false)} style={{ position: 'absolute', top: '2.5rem', right: '4vw', background: 'none', border: 'none', color: 'var(--color-ivory)', fontSize: '2rem' }}>
          <X />
        </button>
        
        <Link to="/about" className="interactive" style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--color-ivory)', textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>About</Link>
        <Link to="/what-we-do" className="interactive" style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--color-ivory)', textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>What We Do</Link>
        <Link to="/gallery" className="interactive" style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--color-ivory)', textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>Gallery</Link>
        <Link to="/stories" className="interactive" style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--color-ivory)', textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>Stories</Link>
        <Link to="/info" className="interactive" style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--color-ivory)', textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>Info</Link>
        <Link to="/inquire" className="interactive" style={{ fontSize: '3rem', fontFamily: 'var(--font-heading)', color: 'var(--color-gold)', textDecoration: 'none' }} onClick={() => setIsMenuOpen(false)}>Inquire</Link>
      </div>
    </nav>
  );
};

export default Navbar;
