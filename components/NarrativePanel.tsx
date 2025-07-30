'use client';

import { useState, useEffect } from 'react';

interface NarrativePanelProps {
  currentLevel: number;
}

const narrativeContent = {
  1: {
    intro: "The apartment's been untouched since the investigation.\nEleanor's belongings are boxed and stacked like an afterthought.\n\nOn the desk: a broken frame, glass missing.\n\nYou recognize the photo.\nOr part of it.\n\nIt's time to put the pieces together.",
    outro: "You stare at the full photo.\n\nEleanor, smiling.\n\nBeside her, a man—mid-30s, confident, arm around her shoulders.\nHe wasn't in the report.\nWasn't in any of the case files.\n\nWhy tear him out?"
  },
  2: {
    intro: "You pull the old case box from storage.\n\nTucked deep in the bottom: an evidence envelope never logged.\n\nInside, a letter—shredded, but not burned.\nThe ink still bleeds a little when touched.\n\nYou lay the pieces out on a light table.\nTime to read what she never sent.",
    outro: "\"If you come near me again, I'll go to the police.\nYou don't control me anymore.\nI'm done being afraid of you.\"\n\nSigned: E.\n\nYou flip the envelope.\nOne initial in pencil: D.\n\nSomeone she feared.\nSomeone she warned."
  },
  3: {
    intro: "You return to Eleanor's bedroom—the scene of her death.\n\nEverything's just as the old photos showed.\nWhich is the problem.\n\nThe placement was too clean.\n\nThe forensics didn't match.\n\nYou lay out the original scene diagram.\nAnd begin to move things.\nTo see what really happened.",
    outro: "The bloodstain was never by the bed.\n\nThe chair was knocked over near the door—not the window.\n\nThe outline—wrong angle, wrong posture.\n\nSomeone moved her.\nSomeone staged this.\n\nAnd someone closed the file before anyone could ask why."
  }
};

export default function NarrativePanel({ currentLevel }: NarrativePanelProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'intro' | 'playing' | 'outro'>('intro');

  const typewriterEffect = (text: string, callback?: () => void) => {
    setIsTyping(true);
    setDisplayText('');
    
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setIsTyping(false);
        if (callback) callback();
      }
    }, 50);

    return timer;
  };

  useEffect(() => {
    // Show intro when level changes
    const content = narrativeContent[currentLevel as keyof typeof narrativeContent];
    if (content) {
      setCurrentPhase('intro');
      const timer = typewriterEffect(content.intro, () => {
        setShowContinue(true);
      });

      return () => clearInterval(timer);
    }
  }, [currentLevel]);

  const handleContinue = () => {
    setShowContinue(false);
    setCurrentPhase('playing');
    setDisplayText('');
  };

  const skipTypewriter = () => {
    if (isTyping) {
      const content = narrativeContent[currentLevel as keyof typeof narrativeContent];
      if (content) {
        const fullText = currentPhase === 'intro' ? content.intro : content.outro;
        setDisplayText(fullText);
        setIsTyping(false);
        if (currentPhase === 'intro') {
          setShowContinue(true);
        }
      }
    }
  };

  if (currentPhase === 'playing') {
    return (
      <div style={{
        background: 'rgba(0, 0, 0, 0.8)',
        border: '1px solid #4a4a4a',
        borderRadius: '8px',
        padding: '1.5rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h3 style={{
          color: '#ffb347',
          fontFamily: 'Special Elite, monospace',
          fontSize: '1.1rem',
          marginBottom: '1rem',
          borderBottom: '1px solid #4a4a4a',
          paddingBottom: '0.5rem'
        }}>
          Investigation Notes
        </h3>
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#8a8a8a'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔍</div>
            <p style={{ fontStyle: 'italic' }}>Examining the evidence...</p>
          </div>
          <div style={{ fontSize: '0.9rem' }}>
            <p style={{ marginBottom: '0.5rem' }}><strong>Controls:</strong></p>
            <p style={{ marginBottom: '0.3rem' }}>Arrow Keys / WASD: Move</p>
            <p style={{ marginBottom: '0.3rem' }}>Space/Enter: Interact</p>
            <p style={{ marginBottom: '0.3rem' }}>H: Hint</p>
            <p style={{ marginBottom: '0.3rem' }}>Ctrl+Z: Undo</p>
            <p>Ctrl+R: Reset</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.8)',
      border: '1px solid #4a4a4a',
      borderRadius: '8px',
      padding: '1.5rem',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h3 style={{
        color: '#ffb347',
        fontFamily: 'Special Elite, monospace',
        fontSize: '1.1rem',
        marginBottom: '1rem',
        borderBottom: '1px solid #4a4a4a',
        paddingBottom: '0.5rem'
      }}>
        Case File
      </h3>
      
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div 
          style={{
            color: '#8a8a8a',
            lineHeight: '1.6',
            whiteSpace: 'pre-line',
            cursor: 'pointer'
          }}
          onClick={skipTypewriter}
        >
          {displayText}
          {isTyping && (
            <span style={{
              display: 'inline-block',
              width: '8px',
              height: '20px',
              background: '#ffb347',
              marginLeft: '4px',
              animation: 'blink 1s infinite'
            }}></span>
          )}
        </div>
        
        {showContinue && (
          <button
            onClick={handleContinue}
            style={{
              background: 'linear-gradient(145deg, #2d2d2d, #4a4a4a)',
              color: '#f5f5dc',
              border: '2px solid #ffb347',
              padding: '0.8rem 1.5rem',
              fontSize: '1rem',
              fontFamily: 'Special Elite, monospace',
              cursor: 'pointer',
              borderRadius: '5px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginTop: '1.5rem',
              alignSelf: 'center'
            }}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}