import React from 'react';

// Socratic Active Recall Flashcards Deck Component
export default function FlashcardsPage({
  flashcards,
  flashcardsLoading,
  handleGenerateFlashcards,
  currentCardIdx,
  setCurrentCardIdx,
  isCardFlipped,
  setIsCardFlipped,
  flashcardsError,
  studyMaterial,
  handlePrevCard,
  handleNextCard,
  Icon,
  AcademicLoading,
}) {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Generation Card */}
      {!flashcards && !flashcardsLoading && (
        <div className="editorial-card" style={{ padding: '48px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', borderRadius: '12px' }}>
          <div style={{ color: 'var(--accent-gold-muted)', padding: '16px', borderRadius: '50%', border: '1px solid rgba(194, 149, 31, 0.15)', backgroundColor: 'var(--accent-gold-light)' }}>
            <Icon type="flashcard" size={40} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '520px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '26px', margin: '0' }}>Draft Active Recall Flashcards</h2>
            <p style={{ fontFamily: 'var(--font-serif-body)', color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.6', margin: '0' }}>
              Convert this study material into 10–15 customized active recall cards. Utilize spatial memory layers and 3D card flips to consolidate conceptual details in long-term memory.
            </p>
          </div>
          <button className="editorial-btn" onClick={handleGenerateFlashcards} style={{ padding: '12px 28px', fontSize: '15px' }}>
            <Icon type="sparkles" size={18} />
            Generate Flashcard Stack
          </button>
        </div>
      )}

      {/* Error Banner */}
      {flashcardsError && (
        <div style={{ padding: '16px', backgroundColor: 'var(--error-bg)', border: '1px solid var(--error-border)', color: 'var(--error-text)', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Icon type="info" size={20} />
          <div style={{ flexGrow: '1', fontSize: '15px' }}>{flashcardsError}</div>
          <button className="editorial-btn-secondary" onClick={handleGenerateFlashcards} style={{ padding: '6px 12px', fontSize: '13px', borderColor: 'var(--error-border)', color: 'var(--error-text)' }}>Retry</button>
        </div>
      )}

      {/* Loader */}
      {flashcardsLoading && (
        <div className="editorial-card" style={{ padding: '32px', borderRadius: '12px' }}>
          <AcademicLoading type="flashcard" />
        </div>
      )}

      {/* Flashcard Slider Box */}
      {flashcards && !flashcardsLoading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
          
          {/* Navigation Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '480px', fontSize: '14px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            <span>STACK DECK INDEX</span>
            <span>CARD {currentCardIdx + 1} OF {flashcards.length}</span>
          </div>

          {/* 3D Flip Card Scene */}
          <div className="flashcard-scene" onClick={() => setIsCardFlipped(!isCardFlipped)}>
            <div className={`flashcard-card ${isCardFlipped ? 'is-flipped' : ''}`}>
              {/* Front Face */}
              <div className="flashcard-face flashcard-front">
                <span className="academic-badge" style={{ marginBottom: '16px' }}>FRONT / QUERY</span>
                <h3 style={{ fontSize: '22px', fontFamily: 'var(--font-serif-display)', color: 'var(--text-primary)', margin: '0', lineHeight: '1.4' }}>
                  {flashcards[currentCardIdx].front}
                </h3>
                <span style={{ fontSize: '13px', color: 'var(--text-gold)', opacity: 0.6, position: 'absolute', bottom: '16px', fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Click Card or Press Space to Flip
                </span>
              </div>
              {/* Back Face */}
              <div className="flashcard-face flashcard-back">
                <span className="academic-badge" style={{ marginBottom: '16px', color: 'var(--accent-gold-muted)', borderColor: 'var(--border-parchment)' }}>BACK / EXEGESIS</span>
                <p style={{ fontSize: '17px', fontFamily: 'var(--font-serif-body)', color: 'var(--text-parchment)', margin: '0', lineHeight: '1.6' }}>
                  {flashcards[currentCardIdx].back}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Slider Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '10px' }}>
            <button className="editorial-btn" style={{ padding: '10px 18px' }} onClick={handlePrevCard}>
              <Icon type="arrowLeft" size={18} />
              Previous
            </button>
            <button className="editorial-btn" style={{ padding: '10px 18px' }} onClick={handleNextCard}>
              Next
              <Icon type="arrowRight" size={18} />
            </button>
          </div>

          {/* Quick Deck Controls */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            <button className="editorial-btn-secondary" onClick={() => { handleGenerateFlashcards(); }}>
              Clear & Rebuild Stack
            </button>
          </div>

          <div style={{ fontSize: '13.5px', color: 'var(--text-muted)', fontFamily: 'var(--font-sans)', textAlign: 'center', marginTop: '8px' }}>
            <Icon type="info" size={14} className="inline mr-1" style={{ verticalAlign: 'text-bottom', marginRight: '4px' }} />
            Tip: You can use your keyboard <strong>Left / Right arrows</strong> to navigate and <strong>Spacebar</strong> to flip.
          </div>
        </div>
      )}
    </div>
  );
}
