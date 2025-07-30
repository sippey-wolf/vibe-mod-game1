'use client';

interface VictoryModalProps {
  levelNumber: number;
  onContinue: () => void;
}

const victoryContent = {
  1: {
    title: 'Photo Reconstructed',
    content: 'You stare at the full photo.\n\nEleanor, smiling.\n\nBeside her, a man—mid-30s, confident, arm around her shoulders. He wasn\'t in the report. Wasn\'t in any of the case files.\n\nWhy tear him out?'
  },
  2: {
    title: 'Letter Assembled',
    content: '"If you come near me again, I\'ll go to the police. You don\'t control me anymore. I\'m done being afraid of you."\n\nSigned: E.\n\nYou flip the envelope. One initial in pencil: D.\n\nSomeone she feared. Someone she warned.'
  },
  3: {
    title: 'Truth Revealed',
    content: 'The bloodstain was never by the bed.\n\nThe chair was knocked over near the door—not the window.\n\nThe outline—wrong angle, wrong posture.\n\nSomeone moved her. Someone staged this.\n\nAnd someone closed the file before anyone could ask why.'
  }
};

export default function VictoryModal({ levelNumber, onContinue }: VictoryModalProps) {
  const content = victoryContent[levelNumber as keyof typeof victoryContent];

  if (!content) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
      <div className="bg-noir-dark-gray border-2 border-noir-amber rounded-lg p-8 max-w-2xl w-full mx-4">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-noir-amber font-typewriter text-2xl mb-2">
            Evidence Discovered!
          </h3>
          <h4 className="text-noir-cream text-xl font-semibold">
            {content.title}
          </h4>
        </div>
        
        <div className="bg-black/50 rounded-lg p-6 mb-6 border border-noir-gray">
          <div className="text-noir-light-gray leading-relaxed whitespace-pre-line text-center">
            {content.content}
          </div>
        </div>
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center bg-noir-amber/20 border border-noir-amber rounded-full px-4 py-2">
            <span className="text-noir-amber font-semibold">
              Level {levelNumber} Complete
            </span>
            <span className="ml-2 text-noir-green text-xl">✓</span>
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={onContinue}
            className="detective-button text-lg px-8 py-3"
          >
            {levelNumber < 3 ? 'Continue Investigation' : 'Final Revelation'}
          </button>
        </div>
        
        <div className="mt-6 text-center">
          <div className="flex justify-center space-x-2 mb-2">
            {[1, 2, 3].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-full ${
                  level <= levelNumber 
                    ? 'bg-noir-amber' 
                    : 'bg-noir-gray'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-noir-light-gray">
            {levelNumber}/3 Evidence Pieces Collected
          </p>
        </div>
      </div>
    </div>
  );
}