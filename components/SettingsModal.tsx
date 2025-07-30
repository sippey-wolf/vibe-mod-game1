'use client';

import { useState, useEffect } from 'react';

interface SettingsModalProps {
  onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
  const [settings, setSettings] = useState({
    highContrast: false,
    reducedMotion: false,
    volume: 50
  });

  useEffect(() => {
    // Load settings from localStorage
    const saved = localStorage.getItem('eleanor-ash-settings');
    if (saved) {
      try {
        const parsedSettings = JSON.parse(saved);
        setSettings(prev => ({ ...prev, ...parsedSettings }));
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }
  }, []);

  const updateSetting = (key: keyof typeof settings, value: boolean | number) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    
    // Save to localStorage
    localStorage.setItem('eleanor-ash-settings', JSON.stringify(newSettings));
    
    // Apply settings to document
    applySettings(newSettings);
  };

  const applySettings = (newSettings: typeof settings) => {
    const body = document.body;
    
    // High contrast mode
    if (newSettings.highContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }
    
    // Reduced motion
    if (newSettings.reducedMotion) {
      body.classList.add('reduced-motion');
    } else {
      body.classList.remove('reduced-motion');
    }
    
    // Volume would be handled by the game engine
    // For now, we'll just store it
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="bg-noir-dark-gray border-2 border-noir-amber rounded-lg p-6 max-w-md w-full mx-4">
        <h3 className="text-noir-amber font-typewriter text-xl mb-6 text-center">
          Settings
        </h3>
        
        <div className="space-y-6">
          {/* High Contrast */}
          <div className="flex items-center justify-between">
            <label className="text-noir-cream cursor-pointer">
              High Contrast Mode
            </label>
            <button
              onClick={() => updateSetting('highContrast', !settings.highContrast)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.highContrast ? 'bg-noir-amber' : 'bg-noir-gray'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between">
            <label className="text-noir-cream cursor-pointer">
              Reduce Motion
            </label>
            <button
              onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.reducedMotion ? 'bg-noir-amber' : 'bg-noir-gray'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Volume */}
          <div className="space-y-2">
            <label className="text-noir-cream block">
              Audio Volume: {settings.volume}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={settings.volume}
              onChange={(e) => updateSetting('volume', parseInt(e.target.value))}
              className="w-full h-2 bg-noir-gray rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Keyboard Shortcuts */}
          <div className="border-t border-noir-gray pt-4">
            <h4 className="text-noir-amber font-semibold mb-3">Keyboard Shortcuts</h4>
            <div className="text-sm text-noir-light-gray space-y-1">
              <div className="flex justify-between">
                <span>Move:</span>
                <span>Arrow Keys / WASD</span>
              </div>
              <div className="flex justify-between">
                <span>Interact:</span>
                <span>Space / Enter</span>
              </div>
              <div className="flex justify-between">
                <span>Hint:</span>
                <span>H</span>
              </div>
              <div className="flex justify-between">
                <span>Undo:</span>
                <span>Ctrl+Z</span>
              </div>
              <div className="flex justify-between">
                <span>Reset Level:</span>
                <span>Ctrl+R</span>
              </div>
              <div className="flex justify-between">
                <span>Settings:</span>
                <span>Escape</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={onClose}
            className="detective-button px-6 py-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}