'use client';

interface FinalScreenProps {
  onEndGame: () => void;
  evidence: {
    photo: boolean;
    letter: boolean;
    scene: boolean;
  };
}

export default function FinalScreen({ onEndGame, evidence }: FinalScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-noir-black via-noir-dark-gray to-noir-green/20 flex items-center justify-center">
      <div className="text-center max-w-4xl px-8">
        <h1 className="font-typewriter text-5xl text-noir-green mb-8 tracking-wider drop-shadow-lg">
          CASE RECONSTRUCTED
        </h1>
        
        <div className="bg-black/80 rounded-lg p-8 mb-8 border-2 border-noir-green">
          <div className="space-y-6">
            {/* Evidence Summary */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className={`p-4 rounded border ${
                evidence.photo 
                  ? 'bg-noir-green/20 border-noir-green' 
                  : 'bg-noir-gray/20 border-noir-gray'
              }`}>
                <div className="text-3xl mb-2">📷</div>
                <div className="text-lg font-semibold text-noir-cream mb-1">
                  Photograph
                </div>
                <div className="text-noir-light-gray">
                  Eleanor was not alone.
                </div>
                {evidence.photo && (
                  <div className="text-noir-green text-2xl mt-2">✅</div>
                )}
              </div>

              <div className={`p-4 rounded border ${
                evidence.letter 
                  ? 'bg-noir-green/20 border-noir-green' 
                  : 'bg-noir-gray/20 border-noir-gray'
              }`}>
                <div className="text-3xl mb-2">✉️</div>
                <div className="text-lg font-semibold text-noir-cream mb-1">
                  Letter
                </div>
                <div className="text-noir-light-gray">
                  She was afraid of someone named "D."
                </div>
                {evidence.letter && (
                  <div className="text-noir-green text-2xl mt-2">✅</div>
                )}
              </div>

              <div className={`p-4 rounded border ${
                evidence.scene 
                  ? 'bg-noir-green/20 border-noir-green' 
                  : 'bg-noir-gray/20 border-noir-gray'
              }`}>
                <div className="text-3xl mb-2">🔍</div>
                <div className="text-lg font-semibold text-noir-cream mb-1">
                  Scene
                </div>
                <div className="text-noir-light-gray">
                  The suicide was staged.
                </div>
                {evidence.scene && (
                  <div className="text-noir-green text-2xl mt-2">✅</div>
                )}
              </div>
            </div>

            {/* Final Revelation */}
            <div className="border-t border-noir-gray pt-6">
              <div className="space-y-4 text-xl text-noir-cream leading-relaxed">
                <p className="text-2xl font-bold text-noir-green">
                  This was never a suicide.
                </p>
                <p className="text-2xl font-bold text-noir-green">
                  This was erasure.
                </p>
              </div>
            </div>

            {/* Case Status */}
            <div className="bg-noir-green/10 border border-noir-green rounded-lg p-6 mt-6">
              <div className="text-noir-green font-typewriter text-xl tracking-wider">
                FORWARDING TO DISTRICT ATTORNEY'S OFFICE
              </div>
              <div className="text-noir-light-gray mt-2">
                Case Status: REOPENED FOR INVESTIGATION
              </div>
            </div>
          </div>
        </div>

        {/* Game Stats */}
        <div className="bg-black/60 rounded-lg p-6 mb-8 border border-noir-gray">
          <h3 className="text-noir-amber font-typewriter text-lg mb-4">
            Investigation Complete
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl text-noir-amber font-bold">
                {Object.values(evidence).filter(Boolean).length}
              </div>
              <div className="text-noir-light-gray">Evidence Pieces</div>
            </div>
            <div>
              <div className="text-2xl text-noir-amber font-bold">3</div>
              <div className="text-noir-light-gray">Levels Completed</div>
            </div>
            <div>
              <div className="text-2xl text-noir-amber font-bold">100%</div>
              <div className="text-noir-light-gray">Case Solved</div>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="text-center mb-8">
          <p className="text-noir-light-gray italic mb-2">
            "Justice delayed is justice denied, but justice discovered is justice served."
          </p>
          <p className="text-sm text-noir-gray">
            Thank you for playing The Cold Case of Eleanor Ash
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onEndGame}
            className="detective-button text-lg px-8 py-3"
          >
            New Investigation
          </button>
          
          <button
            onClick={() => window.location.reload()}
            className="bg-noir-gray hover:bg-noir-light-gray text-noir-cream border-2 border-noir-gray hover:border-noir-light-gray px-8 py-3 rounded font-typewriter uppercase tracking-wide transition-all duration-300"
          >
            Restart Game
          </button>
        </div>

        {/* Easter Egg */}
        <div className="mt-12 text-xs text-noir-gray opacity-50">
          <p>Eleanor Ash: 1987-2012</p>
          <p>"The truth will always find a way."</p>
        </div>
      </div>
    </div>
  );
}