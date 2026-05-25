import React from 'react';

// Socratic Live Tutor Proctoring Page Component
export default function TestPage({
  testModeActive,
  setTestModeActive,
  testQuestions,
  currentTestIdx,
  testAnswerInput,
  setTestAnswerInput,
  testAnswerSubmitted,
  testGradingLoading,
  testScore,
  testGradedHistory,
  testCurrentFeedback,
  testFinished,
  testSummaryLoading,
  testSummaryText,
  testError,
  handleStartTest,
  handleSubmitTestAnswer,
  handleNextTestQuestion,
  generatedQuiz,
  studyMaterial,
  Icon,
  AcademicLoading,
  Markdown,
}) {
  const hasMaterial = studyMaterial && studyMaterial.trim().length > 0;

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Initial Screen */}
      {!testModeActive && !testFinished && (
        <div className="editorial-card" style={{ padding: '48px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', borderRadius: '12px' }}>
          <div style={{ color: 'var(--accent-gold-muted)', padding: '16px', borderRadius: '50%', border: '1px solid rgba(194, 149, 31, 0.15)', backgroundColor: 'var(--accent-gold-light)' }}>
            <Icon type="test" size={40} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '540px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '26px', margin: '0' }}>Interactive Live Tutor Test</h2>
            <p style={{ fontFamily: 'var(--font-serif-body)', color: 'var(--text-secondary)', fontSize: '16px', lineHeight: '1.6', margin: '0' }}>
              In this mode, Claude acts as a live oral examination proctor. You will answer questions one at a time. The tutor grades your response in real-time before you advance, compiling a detailed weak-point analysis summary at the end.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {generatedQuiz && generatedQuiz.length > 0 ? (
              <button className="editorial-btn" onClick={() => handleStartTest(false)} style={{ padding: '12px 24px', fontSize: '15px' }}>
                <Icon type="bookOpen" size={18} />
                Use Quiz Questions from Tab 2
              </button>
            ) : null}
            <button className="editorial-btn" style={generatedQuiz && generatedQuiz.length > 0 ? { border: '1px solid var(--accent-gold-border)' } : { padding: '12px 24px', fontSize: '15px' }} onClick={() => handleStartTest(true)}>
              <Icon type="sparkles" size={18} />
              Generate Fresh Tutor Test
            </button>
          </div>
        </div>
      )}

      {/* Fresh Test Setup Loader */}
      {testSummaryLoading && !testFinished && (
        <div className="editorial-card" style={{ padding: '32px', borderRadius: '12px' }}>
          <AcademicLoading type="quiz" />
        </div>
      )}

      {/* Active Test Screen */}
      {testModeActive && !testFinished && testQuestions.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Live Header Status */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 4px', fontSize: '14px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            <span>EXAM LIVE SESSION</span>
            <span>QUESTION {currentTestIdx + 1} OF {testQuestions.length}</span>
          </div>

          {/* Live Tutor Question Card */}
          <div className="editorial-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(194, 149, 31, 0.15)', paddingBottom: '12px' }}>
              <span className="academic-badge">LIVE ORAL PROCTOR INQUIRY</span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--text-gold)' }}>
                <span>RUNNING SCORE: </span>
                <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{testScore}</span>
                <span>/{currentTestIdx + (testAnswerSubmitted ? 1 : 0)}</span>
              </div>
            </div>

            <h3 style={{ fontSize: '20px', fontFamily: 'var(--font-serif-body)', color: 'var(--text-primary)', margin: '0', lineHeight: '1.4', textAlign: 'left' }}>
              {testQuestions[currentTestIdx].question}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-gold)', fontWeight: '600', fontFamily: 'var(--font-sans)', letterSpacing: '0.05em' }}>YOUR COMPOSED ESSAY RESPONSE</span>
              <textarea
                className="editorial-textarea"
                placeholder="Type your structured explanation here to submit for proctor grading..."
                value={testAnswerInput}
                onChange={(e) => !testAnswerSubmitted && setTestAnswerInput(e.target.value)}
                disabled={testAnswerSubmitted}
                style={{ minHeight: '120px', borderRadius: '6px' }}
              />
            </div>

            {/* Error State */}
            {testError && (
              <div style={{ padding: '12px 16px', backgroundColor: 'var(--error-bg)', border: '1px solid var(--error-border)', color: 'var(--error-text)', borderRadius: '8px', display: 'flex', gap: '10px', alignItems: 'center', fontSize: '14.5px' }}>
                <Icon type="info" size={16} />
                <div>{testError}</div>
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              {!testAnswerSubmitted ? (
                <button
                  className="editorial-btn"
                  onClick={handleSubmitTestAnswer}
                  disabled={testGradingLoading || !testAnswerInput.trim()}
                  style={{ padding: '12px 28px', fontSize: '15px' }}
                >
                  <Icon type="lock" size={18} />
                  {testGradingLoading ? "Tutor is Evaluating..." : "Submit Answer to Tutor"}
                </button>
              ) : (
                <button
                  className="editorial-btn"
                  onClick={handleNextTestQuestion}
                  style={{ padding: '12px 28px', fontSize: '15px' }}
                >
                  <span>{currentTestIdx + 1 === testQuestions.length ? "Finish Exam & Request Summary" : "Advance to Next Question"}</span>
                  <Icon type="arrowRight" size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Tutor Grade Reveal */}
          {testGradingLoading && (
            <div className="editorial-card" style={{ padding: '32px', borderRadius: '12px' }}>
              <AcademicLoading type="test" />
            </div>
          )}

          {testAnswerSubmitted && testCurrentFeedback && !testGradingLoading && (
            <div className="editorial-card fade-in" style={{
              padding: '24px 32px',
              borderRadius: '12px',
              borderLeft: `4px solid ${testCurrentFeedback.grade === 'Correct' ? 'var(--success-text)' :
                testCurrentFeedback.grade === 'Partially Correct' ? 'var(--warning-text)' : 'var(--error-text)'
              }`,
              backgroundColor: `${testCurrentFeedback.grade === 'Correct' ? 'var(--success-bg)' :
                testCurrentFeedback.grade === 'Partially Correct' ? 'var(--warning-bg)' : 'var(--error-bg)'
              }`,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{
                  fontSize: '13px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: '700',
                  letterSpacing: '0.05em',
                  color: testCurrentFeedback.grade === 'Correct' ? 'var(--success-text)' : testCurrentFeedback.grade === 'Partially Correct' ? 'var(--warning-text)' : 'var(--error-text)'
                }}>
                  TUTOR ASSESSMENT: {testCurrentFeedback.grade.toUpperCase()} ({testCurrentFeedback.score} POINTS)
                </span>
              </div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-primary)', fontSize: '16.5px', margin: '0', textAlign: 'left', lineHeight: '1.6' }}>
                "{testCurrentFeedback.feedback}"
              </p>
            </div>
          )}
        </div>
      )}

      {/* Test Finished Summary Report */}
      {testFinished && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Final Score Dashboard */}
          <div className="editorial-card" style={{ padding: '32px', textAlign: 'center', backgroundColor: 'var(--bg-card)', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <span className="academic-badge">EXAMINATION COMPLETED</span>
            <h2 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '32px', margin: '0' }}>Manuscript Defense Summary</h2>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '10px 0' }}>
              <span style={{ fontSize: '48px', fontFamily: 'var(--font-serif-display)', fontWeight: 'bold', color: 'var(--accent-gold)' }}>{testScore}</span>
              <span style={{ fontSize: '24px', color: 'var(--text-secondary)' }}>/ {testQuestions.length}</span>
              <span style={{ fontSize: '18px', color: 'var(--text-gold)', marginLeft: '12px', fontFamily: 'var(--font-sans)', fontWeight: '600' }}>
                ({Math.round((testScore / testQuestions.length) * 100)}%)
              </span>
            </div>

            <button className="editorial-btn-secondary" onClick={() => handleStartTest(true)} style={{ border: '1px solid var(--accent-gold-border)', padding: '12px 28px', fontSize: '15px' }}>
              Retake a Fresh Live Exam
            </button>
          </div>

          {/* Summary Exegesis Loader */}
          {testSummaryLoading && (
            <div className="editorial-card" style={{ padding: '32px', borderRadius: '12px' }}>
              <AcademicLoading type="explain" />
            </div>
          )}

          {/* Custom Scholarly Summary Text */}
          {testSummaryText && !testSummaryLoading && (
            <div className="editorial-card fade-in" style={{ padding: '40px', borderLeft: '3px solid var(--accent-gold)', borderRadius: '12px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid rgba(194, 149, 31, 0.15)', paddingBottom: '12px' }}>
                <span className="academic-badge">TUTOR EXAM PERFORMANCE CRITIQUE</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>ACADEMIC DIAGNOSTICS</span>
              </div>
              <Markdown text={testSummaryText} />
            </div>
          )}

          {/* Question Breakdown Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '22px', borderBottom: '1px solid rgba(194, 149, 31, 0.15)', paddingBottom: '8px', margin: '0', textAlign: 'left' }}>
              Question Transcript Review
            </h3>
            {testGradedHistory.map((graded, idx) => (
              <div key={idx} className="editorial-card" style={{
                padding: '24px',
                borderRadius: '12px',
                borderLeft: `3px solid ${graded.grade === 'Correct' ? 'var(--success-text)' :
                  graded.grade === 'Partially Correct' ? 'var(--warning-text)' : 'var(--error-text)'
                }`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: '8px' }}>
                  <span>QUESTION {idx + 1}</span>
                  <span style={{
                    color: graded.grade === 'Correct' ? 'var(--success-text)' : graded.grade === 'Partially Correct' ? 'var(--warning-text)' : 'var(--error-text)',
                    fontWeight: '700'
                  }}>
                    {graded.grade.toUpperCase()} ({graded.score} POINTS)
                  </span>
                </div>
                <h4 style={{ fontSize: '16.5px', color: 'var(--text-primary)', margin: '0 0 12px 0', fontFamily: 'var(--font-serif-body)', textAlign: 'left' }}>{graded.question}</h4>
                <div style={{ fontSize: '14.5px', color: 'var(--text-secondary)', padding: '12px', backgroundColor: 'var(--bg-darker)', borderRadius: '6px', borderLeft: '2.5px solid rgba(194, 149, 31, 0.1)', textAlign: 'left', lineHeight: '1.6' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '12px', fontWeight: '700', marginBottom: '4px' }}>YOUR SUBMITTED ANSWER:</span>
                  "{graded.userAnswer}"
                </div>
                <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', marginTop: '12px', paddingLeft: '12px', borderLeft: '2px dashed var(--accent-gold-border)', textAlign: 'left', lineHeight: '1.6', margin: '12px 0 0 0' }}>
                  <span style={{ color: 'var(--text-gold)', fontSize: '12.5px', fontWeight: '700', display: 'block', marginBottom: '2px' }}>PROCTOR EXEGESIS:</span>
                  {graded.feedback}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
