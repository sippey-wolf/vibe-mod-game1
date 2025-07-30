/**
 * The Cold Case of Eleanor Ash - Asset Manager
 * Handles loading and management of game assets
 */

class AssetManager {
    constructor() {
        this.assets = {
            images: new Map(),
            audio: new Map(),
            fonts: new Map()
        };
        
        this.loadingPromises = [];
        this.isLoading = false;
        this.loadProgress = 0;
        
        console.log('Asset Manager initialized');
    }
    
    // Image loading
    loadImage(name, src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            
            img.onload = () => {
                this.assets.images.set(name, img);
                console.log(`Image loaded: ${name}`);
                resolve(img);
            };
            
            img.onerror = () => {
                console.error(`Failed to load image: ${name} from ${src}`);
                reject(new Error(`Failed to load image: ${name}`));
            };
            
            img.src = src;
        });
    }
    
    // Audio loading
    loadAudio(name, src) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            
            audio.addEventListener('canplaythrough', () => {
                this.assets.audio.set(name, audio);
                console.log(`Audio loaded: ${name}`);
                resolve(audio);
            });
            
            audio.addEventListener('error', () => {
                console.error(`Failed to load audio: ${name} from ${src}`);
                reject(new Error(`Failed to load audio: ${name}`));
            });
            
            audio.src = src;
            audio.load();
        });
    }
    
    // Font loading
    loadFont(name, src) {
        return new Promise((resolve, reject) => {
            const font = new FontFace(name, `url(${src})`);
            
            font.load().then((loadedFont) => {
                document.fonts.add(loadedFont);
                this.assets.fonts.set(name, loadedFont);
                console.log(`Font loaded: ${name}`);
                resolve(loadedFont);
            }).catch((error) => {
                console.error(`Failed to load font: ${name} from ${src}`, error);
                reject(error);
            });
        });
    }
    
    // Batch loading
    async loadAssets(assetList) {
        this.isLoading = true;
        this.loadProgress = 0;
        this.loadingPromises = [];
        
        const totalAssets = assetList.length;
        let loadedAssets = 0;
        
        for (const asset of assetList) {
            let promise;
            
            switch (asset.type) {
                case 'image':
                    promise = this.loadImage(asset.name, asset.src);
                    break;
                case 'audio':
                    promise = this.loadAudio(asset.name, asset.src);
                    break;
                case 'font':
                    promise = this.loadFont(asset.name, asset.src);
                    break;
                default:
                    console.warn(`Unknown asset type: ${asset.type}`);
                    continue;
            }
            
            // Track progress
            promise.then(() => {
                loadedAssets++;
                this.loadProgress = loadedAssets / totalAssets;
            }).catch(() => {
                loadedAssets++;
                this.loadProgress = loadedAssets / totalAssets;
            });
            
            this.loadingPromises.push(promise);
        }
        
        try {
            await Promise.all(this.loadingPromises);
            this.isLoading = false;
            console.log('All assets loaded successfully');
        } catch (error) {
            this.isLoading = false;
            console.error('Some assets failed to load:', error);
            throw error;
        }
    }
    
    // Asset retrieval
    getImage(name) {
        return this.assets.images.get(name);
    }
    
    getAudio(name) {
        return this.assets.audio.get(name);
    }
    
    getFont(name) {
        return this.assets.fonts.get(name);
    }
    
    // Audio playback with volume control
    playSound(name, volume = 1.0, loop = false) {
        const audio = this.getAudio(name);
        if (audio) {
            // Clone audio for multiple simultaneous plays
            const audioClone = audio.cloneNode();
            audioClone.volume = volume;
            audioClone.loop = loop;
            
            audioClone.play().catch(error => {
                console.warn(`Failed to play sound ${name}:`, error);
            });
            
            return audioClone;
        } else {
            console.warn(`Audio not found: ${name}`);
            return null;
        }
    }
    
    // Create simple sound effects programmatically
    createSimpleSound(name, frequency = 440, duration = 0.2, type = 'sine') {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = type;
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
            
            // Store a function to recreate the sound
            this.assets.audio.set(name, () => {
                const newOscillator = audioContext.createOscillator();
                const newGainNode = audioContext.createGain();
                
                newOscillator.connect(newGainNode);
                newGainNode.connect(audioContext.destination);
                
                newOscillator.frequency.value = frequency;
                newOscillator.type = type;
                
                newGainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                newGainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
                
                newOscillator.start(audioContext.currentTime);
                newOscillator.stop(audioContext.currentTime + duration);
            });
            
            console.log(`Created simple sound: ${name}`);
        } catch (error) {
            console.warn(`Failed to create simple sound ${name}:`, error);
        }
    }
    
    // Preload common game sounds
    preloadGameSounds() {
        // Create simple sound effects
        this.createSimpleSound('move', 220, 0.1, 'square');
        this.createSimpleSound('push', 180, 0.15, 'sawtooth');
        this.createSimpleSound('place_correct', 440, 0.3, 'sine');
        this.createSimpleSound('fragment_select', 330, 0.2, 'triangle');
        this.createSimpleSound('level_complete', 523, 0.5, 'sine');
        this.createSimpleSound('evidence_collected', 659, 0.4, 'sine');
        
        console.log('Game sounds preloaded');
    }
    
    // Enhanced playSound method for programmatic sounds
    playSound(name, volume = 1.0) {
        const sound = this.assets.audio.get(name);
        if (sound) {
            if (typeof sound === 'function') {
                // Programmatic sound
                sound();
            } else {
                // Audio file
                const audioClone = sound.cloneNode();
                audioClone.volume = volume;
                audioClone.play().catch(error => {
                    console.warn(`Failed to play sound ${name}:`, error);
                });
                return audioClone;
            }
        } else {
            console.warn(`Sound not found: ${name}`);
        }
        return null;
    }
    
    // Utility methods
    hasAsset(type, name) {
        return this.assets[type] && this.assets[type].has(name);
    }
    
    removeAsset(type, name) {
        if (this.assets[type]) {
            return this.assets[type].delete(name);
        }
        return false;
    }
    
    clearAssets(type = null) {
        if (type) {
            if (this.assets[type]) {
                this.assets[type].clear();
            }
        } else {
            Object.values(this.assets).forEach(assetMap => assetMap.clear());
        }
    }
    
    getLoadProgress() {
        return this.loadProgress;
    }
    
    isAssetLoading() {
        return this.isLoading;
    }
    
    // Debug methods
    listAssets() {
        console.log('Loaded Assets:');
        Object.entries(this.assets).forEach(([type, assetMap]) => {
            console.log(`${type}:`, Array.from(assetMap.keys()));
        });
    }
    
    getAssetCount() {
        let total = 0;
        Object.values(this.assets).forEach(assetMap => {
            total += assetMap.size;
        });
        return total;
    }
}