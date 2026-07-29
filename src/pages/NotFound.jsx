import { Link } from 'react-router-dom';
import { ArrowLeft } from 'phosphor-react';

const NotFound = () => {
  return (
    <div style={{ 
      height: '100vh', 
      width: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'var(--color-bg)', 
      color: 'var(--color-ivory)',
      textAlign: 'center',
      padding: '0 5vw'
    }}>
      <span className="subtitle-mono" style={{ fontSize: '0.7rem', color: 'var(--color-gold)', letterSpacing: '8px', textTransform: 'uppercase', marginBottom: '2rem' }}>Error 404</span>
      <h1 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontFamily: 'var(--font-heading)', lineHeight: 0.9, marginBottom: '3rem' }}>
        A Story<br/>Not Found.
      </h1>
      <p style={{ color: 'var(--color-taupe)', maxWidth: '500px', lineHeight: 1.8, marginBottom: '4rem', fontSize: '1.1rem' }}>
        The page you're looking for doesn't exist, or it may have moved.
      </p>
      <Link to="/" className="interactive btn-premium-diamond" style={{ display: 'inline-flex', padding: '1rem 3rem' }}>
        <span className="btn-icon" style={{ marginLeft: 0, marginRight: '1rem' }}><ArrowLeft weight="bold" /></span>
        <span className="btn-text">Return Home</span>
      </Link>
    </div>
  );
};

export default NotFound;
