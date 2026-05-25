import React from 'react';

// Socratic Explanation Page Component
export default function ExplainPage({
  explainDifficulty,
  setExplainDifficulty,
  explainQuery,
  setExplainQuery,
  explainLoading,
  explainOutput,
  explainError,
  handleExplain,
  studyMaterial,
  Icon,
  Markdown,
  AcademicLoading,
}) {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Selection Card */}
      <div className="editorial-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', borderRadius: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(194, 149, 31, 0.15)', paddingBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ color: 'var(--accent-gold)' }}><Icon type="explain" size={24} /></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontWeight: '600', letterSpacing: '0.05em' }}>DIFFICULTY:</span>
            <div className="difficulty-selector">
              {['ELI10', 'Normal', 'PhD'].map((diff) => (
                <button
                  key={diff}
                  className={`difficulty-btn ${explainDifficulty === diff ? 'active' : ''}`}
                  onClick={() => setExplainDifficulty(diff)}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: 'var(--text-gold)', fontWeight: '600', letterSpacing: '0.05em', fontFamily: 'var(--font-sans)' }}>SPECIFIC TOPIC OF INTEREST (OPTIONAL)</span>
          <input
            type="text"
            className="editorial-input"
            placeholder="e.g. 'Explain the air vents in Pergamum' (leave blank to explain the entire text)"
            value={explainQuery}
            onChange={(e) => setExplainQuery(e.target.value)}
            style={{ borderRadius: '6px' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
          <button
            className="editorial-btn"
            onClick={handleExplain}
            disabled={explainLoading || !studyMaterial.trim()}
            style={{ padding: '12px 28px', fontSize: '15px' }}
          >
            <Icon type="sparkles" size={18} />
            {explainLoading ? "Consulting Archives..." : "Generate Academic Explanation"}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {explainError && (
        <div style={{ padding: '16px', backgroundColor: 'var(--error-bg)', border: '1px solid var(--error-border)', color: 'var(--error-text)', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Icon type="info" size={20} />
          <div style={{ flexGrow: '1', fontSize: '15.5px' }}>{explainError}</div>
          <button className="editorial-btn-secondary" onClick={handleExplain} style={{ padding: '6px 12px', fontSize: '13px', borderColor: 'var(--error-border)', color: 'var(--error-text)' }}>Retry</button>
        </div>
      )}

      {/* Loading Indicator */}
      {explainLoading && (
        <div className="editorial-card" style={{ padding: '32px', borderRadius: '12px' }}>
          <AcademicLoading type="explain" />
        </div>
      )}

      {/* Output Card - Scrollable Max-height bounds to completely prevent bloating */}
      {explainOutput && !explainLoading && (
        <div className="editorial-card fade-in" style={{ padding: '40px', borderLeft: '3px solid var(--accent-gold)', borderRadius: '12px', maxHeight: '420px', overflowY: 'auto', textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(194, 149, 31, 0.15)', paddingBottom: '12px' }}>
            <span className="academic-badge">TUTOR EXEGESIS — {explainDifficulty.toUpperCase()} EDITION</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>ACADEMIC SYSTEM</span>
          </div>
          <Markdown text={explainOutput} />
        </div>
      )}
    </div>
  );
}
