import React from 'react';

const SplitText = ({ children, className, style }) => {
  if (typeof children !== 'string') return children;
  
  return (
    <span className={className} style={{ ...style, display: 'inline-block', overflow: 'hidden', verticalAlign: 'top' }}>
      {children.split('').map((char, i) => (
        <span 
          key={i} 
          className="char-liquid" 
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
