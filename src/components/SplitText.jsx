import React from 'react';

const SplitText = ({ children, className, style }) => {
  if (typeof children !== 'string') return children;
  
  const words = children.split(' ');

  return (
    <span 
      className={className} 
      style={{ 
        ...style, 
        display: 'inline-block', 
        verticalAlign: 'top',
        wordBreak: 'normal',
        overflowWrap: 'normal',
        whiteSpace: 'normal'
      }}
    >
      {words.map((word, wIdx) => (
        <span 
          key={wIdx} 
          style={{ 
            display: 'inline-block', 
            whiteSpace: 'nowrap',
            wordBreak: 'normal',
            overflowWrap: 'normal'
          }}
        >
          {word.split('').map((char, cIdx) => (
            <span 
              key={cIdx} 
              className="char-liquid" 
              style={{ display: 'inline-block' }}
            >
              {char}
            </span>
          ))}
          {wIdx < words.length - 1 && (
            <span className="char-liquid" style={{ display: 'inline-block' }}>
              {'\u00A0'}
            </span>
          )}
        </span>
      ))}
    </span>
  );
};

export default SplitText;


