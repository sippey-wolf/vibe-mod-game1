/**
 * The Cold Case of Eleanor Ash - Story Manager
 * Handles narrative text display, pacing, and story progression
 */

class StoryManager {
    constructor(gameEngine) {
        this.game = gameEngine;
        this.currentText = '';
        this.isTyping = false;
        this.typewriterSpeed = 50; // ms per character
        this.typewriterTimer = null;
        
        // Story content
        this.narrativeContent = {
            level1: {
                intro: "The apartment's been untouched since the investigation.\nEleanor's belongings are boxed and stacked like an afterthought.\n\nOn the desk: a broken frame, glass missing.\n\nYou recognize the photo.\nOr part of it.\n\nIt's time to put the pieces together.",
                outro: "You stare at the full photo.\n\nEleanor, smiling.\n\nBeside her, a man—mid-30s, confident, arm around her shoulders.\nHe wasn't in the report.\nWasn't in any of the case files.\n\nWhy tear him out?"
            },
            level2: {
                intro: "You pull the old case box from storage.\n\nTucked deep in the bottom: an evidence envelope never logged.\n\nInside, a letter—shredded, but not burned.\nThe ink still bleeds a little when touched.\n\nYou lay the pieces out on a light table.\nTime to read what she never sent.",
                outro: "\"If you come near me again, I'll go to the police.\nYou don't control me anymore.\nI'm done being afraid of you.\"\n\nSigned: E.\n\nYou flip the envelope.\nOne initial in pencil: D.\n\nSomeone she feared.\nSomeone she warned."
            },
            level3: {
                intro: "You return to Eleanor's bedroom—the scene of her death.\n\nEverything's just as the old photos showed.\nWhich is the problem.\n\nThe placement was too clean.\n\nThe forensics didn't match.\n\nYou lay out the original scene diagram.\nAnd begin to move things.\nTo see what really happened.",
                outro: "The bloodstain was never by the bed.\n\nThe chair was knocked over near the door—not the window.\n\nThe outline—wrong angle, wrong posture.\n\nSomeone moved her.\nSomeone staged this.\n\nAnd someone closed the file before anyone could ask why."
            }
        };
        
        console.log('Story Manager initialized');
    }
    
    showLevelIntro(levelNumber) {
        const content = this.narrativeContent[`level${levelNumber}`];
        if (!content) {
            console.error('No narrative content for level', levelNumber);
            return;
        }
        
        this.game.showNarrative();
        this.displayText(content.intro, () => {
            this.showContinueButton();
        });
        
        console.log(`Showing Level ${levelNumber} intro`);
    }
    
    showLevelOutro(levelNumber) {
        const content = this.narrativeContent[`level${levelNumber}`];
        if (!content) {
            console.error('No narrative content for level', levelNumber);
            return;
        }
        
        this.game.showNarrative();
        this.displayText(content.outro, () => {
            this.showContinueButton();
        });
        
        console.log(`Showing Level ${levelNumber} outro`);
    }
    
    displayText(text, onComplete = null) {
        const narrativeElement = document.getElementById('narrative-text');
        const continueButton = document.getElementById('continue-button');
        
        // Hide continue button during typing
        continueButton.style.display = 'none';
        
        // Clear previous text
        narrativeElement.innerHTML = '';
        this.currentText = text;
        this.isTyping = true;
        
        // Start typewriter effect
        if (this.game.settings.reducedMotion) {
            // Skip animation for reduced motion
            narrativeElement.innerHTML = this.formatText(text);
            this.isTyping = false;
            if (onComplete) onComplete();
        } else {
            this.startTypewriter(narrativeElement, text, onComplete);
        }
    }
    
    startTypewriter(element, text, onComplete) {
        let currentIndex = 0;
        const formattedText = this.formatText(text);
        
        // Create a temporary div to parse HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = formattedText;
        const textContent = tempDiv.textContent || tempDiv.innerText;
        
        const typeNextChar = () => {
            if (currentIndex < textContent.length) {
                // Calculate how much of the formatted text to show
                const progress = currentIndex / textContent.length;
                const htmlLength = formattedText.length;
                const showLength = Math.floor(progress * htmlLength);
                
                // Find the appropriate cutoff point that doesn't break HTML tags
                let cutoffText = formattedText.substring(0, showLength);
                
                // Simple approach: show character by character of plain text
                element.textContent = textContent.substring(0, currentIndex + 1);
                
                currentIndex++;
                this.typewriterTimer = setTimeout(typeNextChar, this.typewriterSpeed);
            } else {
                // Typing complete - show full formatted text
                element.innerHTML = formattedText;
                this.isTyping = false;
                if (onComplete) onComplete();
            }
        };
        
        typeNextChar();
    }
    
    formatText(text) {
        // Convert line breaks to HTML
        return text.replace(/\n/g, '<br>');
    }
    
    showContinueButton() {
        const continueButton = document.getElementById('continue-button');
        continueButton.style.display = 'inline-block';
        continueButton.classList.add('fade-in');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            continueButton.classList.remove('fade-in');
        }, 500);
    }
    
    skipTypewriter() {
        if (this.isTyping && this.typewriterTimer) {
            clearTimeout(this.typewriterTimer);
            this.typewriterTimer = null;
            this.isTyping = false;
            
            // Show complete text immediately
            const narrativeElement = document.getElementById('narrative-text');
            narrativeElement.innerHTML = this.formatText(this.currentText);
            
            this.showContinueButton();
        }
    }
    
    // Special narrative moments
    showOpeningSequence() {
        const openingText = "Twelve years ago, Eleanor Ash was found dead in her apartment.\nThe official cause: suicide.\n\nYou were a rookie then—barely on the case, quickly reassigned.\n\nLast week, an envelope arrived. No return address.\nInside: a photo fragment, and a single line in shaky ink:\n\n\"You missed something.\"\n\nNow you're back where it all started.";
        
        this.displayText(openingText, () => {
            this.showContinueButton();
        });
    }
    
    showFinalReveal() {
        const finalText = "CASE RECONSTRUCTED\n\n✅ Photograph: Eleanor was not alone.\n✅ Letter: She was afraid of someone named \"D.\"\n✅ Scene: The suicide was staged.\n\nThis was never a suicide.\n\nThis was erasure.\n\nFORWARDING TO DISTRICT ATTORNEY'S OFFICE";
        
        this.displayText(finalText);
    }
    
    // Hint system integration
    showHint(hintText) {
        const originalText = this.currentText;
        const hintElement = document.getElementById('narrative-text');
        
        // Show hint with different styling
        hintElement.innerHTML = `<div class="hint-text">💡 ${hintText}</div>`;
        
        // Return to original text after delay
        setTimeout(() => {
            if (originalText) {
                hintElement.innerHTML = this.formatText(originalText);
            }
        }, 3000);
    }
    
    // Accessibility features
    announceText(text) {
        // For screen readers
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.position = 'absolute';
        announcement.style.left = '-10000px';
        announcement.textContent = text.replace(/\n/g, ' ');
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Event handlers
    handleClick() {
        if (this.isTyping) {
            this.skipTypewriter();
        }
    }
    
    handleKeyPress(key) {
        if (key === ' ' || key === 'enter') {
            if (this.isTyping) {
                this.skipTypewriter();
            }
        }
    }
    
    // Cleanup
    cleanup() {
        if (this.typewriterTimer) {
            clearTimeout(this.typewriterTimer);
            this.typewriterTimer = null;
        }
        this.isTyping = false;
        console.log('Story Manager cleaned up');
    }
}