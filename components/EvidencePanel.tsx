'use client';

interface EvidencePanelProps {
  evidence: {
    photo: boolean;
    letter: boolean;
    scene: boolean;
  };
}

export default function EvidencePanel({ evidence }: EvidencePanelProps) {
  return (
    <div style={{
      background: 'rgba(0, 0, 0, 0.8)',
      border: '1px solid #4a4a4a',
      borderRadius: '8px',
      padding: '1.5rem',
      height: '100%'
    }}>
      <h3 style={{
        color: '#ffb347',
        fontFamily: 'Special Elite, monospace',
        fontSize: '1.1rem',
        marginBottom: '1rem',
        borderBottom: '1px solid #4a4a4a',
        paddingBottom: '0.5rem'
      }}>
        Evidence Collected
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Photo Evidence */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.75rem',
          borderRadius: '5px',
          border: `1px solid ${evidence.photo ? '#ffb347' : '#4a4a4a'}`,
          background: evidence.photo ? 'rgba(255, 179, 71, 0.2)' : 'rgba(45, 45, 45, 0.3)',
          opacity: evidence.photo ? 1 : 0.5,
          transition: 'all 0.5s ease'
        }}>
          <div style={{ fontSize: '1.5rem', marginRight: '0.75rem' }}>📷</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#f5f5dc', fontWeight: '500' }}>Reconstructed Photo</div>
            {evidence.photo && (
              <div style={{ fontSize: '0.9rem', color: '#8a8a8a', marginTop: '0.25rem' }}>
                Eleanor with unknown man
              </div>
            )}
          </div>
          {evidence.photo && (
            <div style={{ marginLeft: 'auto', color: '#228b22', fontSize: '1.2rem' }}>✓</div>
          )}
        </div>

        {/* Letter Evidence */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.75rem',
          borderRadius: '5px',
          border: `1px solid ${evidence.letter ? '#ffb347' : '#4a4a4a'}`,
          background: evidence.letter ? 'rgba(255, 179, 71, 0.2)' : 'rgba(45, 45, 45, 0.3)',
          opacity: evidence.letter ? 1 : 0.5,
          transition: 'all 0.5s ease'
        }}>
          <div style={{ fontSize: '1.5rem', marginRight: '0.75rem' }}>✉️</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#f5f5dc', fontWeight: '500' }}>Threatening Letter</div>
            {evidence.letter && (
              <div style={{ fontSize: '0.9rem', color: '#8a8a8a', marginTop: '0.25rem' }}>
                Signed "E", addressed to "D"
              </div>
            )}
          </div>
          {evidence.letter && (
            <div style={{ marginLeft: 'auto', color: '#228b22', fontSize: '1.2rem' }}>✓</div>
          )}
        </div>

        {/* Scene Evidence */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.75rem',
          borderRadius: '5px',
          border: `1px solid ${evidence.scene ? '#ffb347' : '#4a4a4a'}`,
          background: evidence.scene ? 'rgba(255, 179, 71, 0.2)' : 'rgba(45, 45, 45, 0.3)',
          opacity: evidence.scene ? 1 : 0.5,
          transition: 'all 0.5s ease'
        }}>
          <div style={{ fontSize: '1.5rem', marginRight: '0.75rem' }}>🔍</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: '#f5f5dc', fontWeight: '500' }}>Crime Scene Truth</div>
            {evidence.scene && (
              <div style={{ fontSize: '0.9rem', color: '#8a8a8a', marginTop: '0.25rem' }}>
                Scene was staged
              </div>
            )}
          </div>
          {evidence.scene && (
            <div style={{ marginLeft: 'auto', color: '#228b22', fontSize: '1.2rem' }}>✓</div>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <div style={{
        marginTop: '1.5rem',
        paddingTop: '1rem',
        borderTop: '1px solid #4a4a4a'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem'
        }}>
          <span style={{ fontSize: '0.9rem', color: '#8a8a8a' }}>Investigation Progress</span>
          <span style={{ fontSize: '0.9rem', color: '#ffb347' }}>
            {Object.values(evidence).filter(Boolean).length}/3
          </span>
        </div>
        <div style={{
          width: '100%',
          background: '#2d2d2d',
          borderRadius: '10px',
          height: '8px'
        }}>
          <div style={{
            background: '#ffb347',
            height: '8px',
            borderRadius: '10px',
            width: `${(Object.values(evidence).filter(Boolean).length / 3) * 100}%`,
            transition: 'width 0.5s ease'
          }}></div>
        </div>
      </div>

      {/* Case Status */}
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        {Object.values(evidence).filter(Boolean).length === 0 && (
          <p style={{ fontSize: '0.9rem', color: '#8a8a8a', fontStyle: 'italic' }}>
            Begin collecting evidence...
          </p>
        )}
        {Object.values(evidence).filter(Boolean).length === 1 && (
          <p style={{ fontSize: '0.9rem', color: '#8a8a8a', fontStyle: 'italic' }}>
            First clue discovered. Keep investigating...
          </p>
        )}
        {Object.values(evidence).filter(Boolean).length === 2 && (
          <p style={{ fontSize: '0.9rem', color: '#ffb347', fontStyle: 'italic' }}>
            Pattern emerging. One more piece needed...
          </p>
        )}
        {Object.values(evidence).filter(Boolean).length === 3 && (
          <p style={{ fontSize: '0.9rem', color: '#228b22', fontWeight: '600' }}>
            Case ready for reconstruction!
          </p>
        )}
      </div>
    </div>
  );
}