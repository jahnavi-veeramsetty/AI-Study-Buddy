import React from 'react';

// Socratic Intake Page Component - Gorgeous Dashboard Feature Showcase
export default function UploadPage({
  uploadLoading,
  uploadError,
  uploadExtractedText,
  uploadedFileName,
  imagePreviewUrl,
  showFullPreview,
  setShowFullPreview,
  handleDragOver,
  handleDrop,
  handleFileChange,
  handleConfirmUseMaterial,
  loadSampleManuscript,
  Icon,
  studyMaterial,
  onReplaceFile,
  groqApiKey,
  onChangeGroqKey,
}) {
  const hasMaterial = studyMaterial && studyMaterial.trim().length > 0;

  return (
    <div className="grid-upload fade-in">

      {/* Left Column: Premium Welcome & Feature Insights */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', textAlign: 'left' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span className="academic-badge" style={{ alignSelf: 'flex-start' }}>ACADEMIC PEDAGOGY</span>
          <h2 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '36px', lineHeight: '1.2', color: 'var(--text-primary)', fontWeight: '800', letterSpacing: '-0.03em' }}>
            Elevate Study Notes Into Cognitive Mastery
          </h2>
          <p style={{ fontFamily: 'var(--font-serif-body)', color: 'var(--text-secondary)', fontSize: '16.5px', lineHeight: '1.65', margin: '8px 0 0 0' }}>
            KL Study Buddy bridges the gap between text reading and intellectual memory. Simply upload your lecture transcripts, PDF textbooks, or visual pages to unlock real-time active recall tools.
          </p>
        </div>

        {/* Feature Highlights Showcase */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            {
              title: "Socratic Explanations",
              desc: "Request deep-dive exegesis tailored to ELI10, Normal, or academic PhD difficulty levels.",
              icon: "explain",
              bg: "linear-gradient(135deg, rgba(29, 78, 216, 0.04) 0%, rgba(59, 130, 246, 0.04) 100%)",
              border: "rgba(29, 78, 216, 0.08)"
            },
            {
              title: "Adaptive Examinations",
              desc: "Draft multiple-choice or short essay assessments with real-time rubric evaluation.",
              icon: "quiz",
              bg: "linear-gradient(135deg, rgba(59, 130, 246, 0.04) 0%, rgba(96, 165, 250, 0.04) 100%)",
              border: "rgba(59, 130, 246, 0.08)"
            },
            {
              title: "Active-Recall Flashcards",
              desc: "Consolidate facts in long-term memory with spatial active-recall card deck loops.",
              icon: "flashcard",
              bg: "linear-gradient(135deg, rgba(96, 165, 250, 0.04) 0%, rgba(29, 78, 216, 0.04) 100%)",
              border: "rgba(96, 165, 250, 0.08)"
            },
            {
              title: "Oral Proctoring Board",
              desc: "Defend your thesis in interactive oral tests proctored with performance critiques.",
              icon: "test",
              bg: "linear-gradient(135deg, rgba(29, 78, 216, 0.04) 0%, rgba(59, 130, 246, 0.04) 100%)",
              border: "rgba(29, 78, 216, 0.08)"
            }
          ].map((feat, idx) => (
            <div
              key={idx}
              className="editorial-card"
              style={{
                padding: '20px',
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
                background: feat.bg,
                borderColor: feat.border,
                borderRadius: '14px',
                transition: 'var(--transition-smooth)'
              }}
            >
              <div style={{
                color: 'var(--accent-gold)',
                backgroundColor: '#ffffff',
                padding: '10px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 10px rgba(15, 23, 42, 0.03)',
                border: '1px solid rgba(226, 232, 240, 0.8)',
                flexShrink: 0
              }}>
                <Icon type={feat.icon} size={20} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', textAlign: 'left' }}>
                <h4 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '16px', color: 'var(--text-primary)', margin: '0', fontWeight: '700' }}>
                  {feat.title}
                </h4>
                <p style={{ fontFamily: 'var(--font-serif-body)', fontSize: '13.5px', color: 'var(--text-secondary)', margin: '0', lineHeight: '1.45' }}>
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Tutor Settings: Groq API Key Input */}
        <div className="editorial-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', borderLeft: '4px solid var(--accent-gold)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ color: 'var(--accent-gold)' }}><Icon type="lock" size={16} /></div>
            <h4 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '15px', color: 'var(--text-primary)', margin: '0', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Tutor Engine Settings
            </h4>
          </div>
          <p style={{ fontFamily: 'var(--font-serif-body)', fontSize: '13px', color: 'var(--text-secondary)', margin: '0', lineHeight: '1.4' }}>
            Configure your personal Groq API Key to power exegesis, quizzes, and live proctor tests. Key is stored locally in your browser.
          </p>
          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <input
              type="password"
              placeholder="Enter your Groq API Key (gsk_...)"
              value={groqApiKey}
              onChange={(e) => onChangeGroqKey(e.target.value)}
              className="editorial-input"
              style={{ padding: '10px 14px', fontSize: '13.5px', fontFamily: 'var(--font-mono)' }}
            />
          </div>
        </div>
      </div>

      {/* Right Column: Upload Intake Area & Preview Workspace */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Workspace Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', textAlign: 'left' }}>
          <div style={{ color: 'var(--accent-gold)' }}><Icon type="upload" size={20} /></div>
          <h3 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '18px', margin: '0', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Manuscript Workspace</h3>
        </div>

        {/* Toggle between Upload Dropzone and Active Manuscript details */}
        {!hasMaterial ? (
          <>
            {/* Drag & Drop Area */}
            <div
              className="editorial-card"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              style={{
                padding: '56px 24px',
                textAlign: 'center',
                border: '2.5px dashed rgba(29, 78, 216, 0.18)',
                backgroundColor: 'var(--bg-card)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                cursor: 'pointer',
                borderRadius: '16px',
                transition: 'var(--transition-smooth)'
              }}
              onClick={() => document.getElementById('file-loader').click()}
            >
              <input
                id="file-loader"
                type="file"
                accept=".txt,.pdf,image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />

              <div style={{ color: 'var(--accent-gold-muted)', padding: '16px', borderRadius: '50%', border: '1px solid rgba(29, 78, 216, 0.12)', backgroundColor: 'var(--accent-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon type="upload" size={32} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '20px', margin: '0', fontWeight: '700' }}>Import Study Manuscripts</h3>
                <p style={{ fontFamily: 'var(--font-serif-body)', color: 'var(--text-secondary)', fontSize: '14.5px', maxWidth: '340px', margin: '0 auto', lineHeight: '1.5' }}>
                  Drag and drop lecture scrolls here, or click to browse. Supports <strong>PDFs</strong>, <strong>Photos</strong>, and <strong>Text</strong> files.
                </p>
              </div>
            </div>

            {/* Load Sample Trigger */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button className="editorial-btn-secondary" onClick={loadSampleManuscript} style={{ width: '100%', padding: '12px 24px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Icon type="bookOpen" size={16} />
                Load Sample Classical Library Vault Notes
              </button>
            </div>
          </>
        ) : (
          <div className="editorial-card fade-in" style={{ padding: '28px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '20px', borderLeft: '4px solid var(--accent-gold)', textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'start', gap: '16px' }}>
              <div style={{
                color: 'var(--accent-gold)',
                backgroundColor: 'var(--accent-gold-light)',
                padding: '12px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Icon type="fileText" size={24} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                <span className="academic-badge" style={{ alignSelf: 'flex-start', marginBottom: '6px' }}>Active Manuscript</span>
                <h4 style={{ fontSize: '18px', color: 'var(--text-primary)', fontWeight: '700', fontFamily: 'var(--font-serif-display)', margin: '0', wordBreak: 'break-all' }}>
                  {uploadedFileName || 'Sample_Manuscript.txt'}
                </h4>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', fontFamily: 'var(--font-serif-body)', margin: '6px 0 0 0', lineHeight: '1.4' }}>
                  Ready for Socratic queries, quizzes, active recall flashcards, and interactive exams.
                </p>
              </div>
            </div>

            {/* Visual Image Preview Thumbnail (Collapsible inside the card) */}
            {imagePreviewUrl && (
              <div className="img-preview-card" style={{ margin: '0', padding: '8px', borderRadius: '10px', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'center' }}>
                <img src={imagePreviewUrl} alt="Manuscript Preview" className="img-preview-thumbnail" style={{ maxHeight: '160px', borderRadius: '8px' }} />
              </div>
            )}

            <button
              className="editorial-btn-secondary"
              style={{ width: '100%', padding: '12px 24px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              onClick={onReplaceFile}
            >
              <Icon type="cross" size={16} />
              Replace Active File
            </button>
          </div>
        )}

        {/* Parsing State */}
        {uploadLoading && (
          <div className="editorial-card" style={{ padding: '32px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center' }}>
              <div style={{
                width: '28px',
                height: '28px',
                border: '3px solid var(--accent-gold)',
                borderRadius: '50%',
                animation: 'spin 1.2s linear infinite',
                borderTopColor: 'transparent'
              }}></div>
              <p style={{ fontFamily: 'var(--font-serif-display)', fontStyle: 'italic', fontSize: '16px', color: 'var(--text-gold)', margin: '0' }}>
                "Decoding manuscript filaments & visual glyphs..."
              </p>
            </div>
          </div>
        )}

        {/* Error States */}
        {uploadError && (
          <div style={{ padding: '16px 20px', backgroundColor: 'var(--error-bg)', border: '1px solid var(--error-border)', color: 'var(--error-text)', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Icon type="info" size={20} />
            <div style={{ flexGrow: '1', fontSize: '14.5px', textAlign: 'left' }}>{uploadError}</div>
          </div>
        )}
      </div>
    </div>
  );
}
