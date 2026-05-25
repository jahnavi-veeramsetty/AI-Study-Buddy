import React from 'react';

// Socratic Examination Page Component
export default function QuizPage({
  quizType,
  setQuizType,
  quizLength,
  setQuizLength,
  quizLoading,
  handleGenerateQuiz,
  generatedQuiz,
  quizSubmitted,
  quizFeedback,
  quizAnswers,
  handleSelectMCQ,
  handleShortAnswerChange,
  handleSubmitQuiz,
  quizGradingLoading,
  quizError,
  studyMaterial,
  Icon,
  AcademicLoading,
}) {
  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      
      {/* Configuration Card */}
      <div className="editorial-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', borderRadius: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(194, 149, 31, 0.15)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ color: 'var(--accent-gold)' }}><Icon type="quiz" size={24} /></div>
            <h2 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '22px', margin: '0' }}>Formulate Examination Paper</h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Quiz Type Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-gold)', fontWeight: '600', fontFamily: 'var(--font-sans)', letterSpacing: '0.05em' }}>QUESTION METHODOLOGY</span>
            <div style={{ display: 'flex', gap: '8px', backgroundColor: 'var(--bg-darker)', padding: '4px', borderRadius: '6px', border: '1px solid rgba(194, 149, 31, 0.15)' }}>
              <button
                className={`difficulty-btn ${quizType === 'mcq' ? 'active' : ''}`}
                style={{ flex: 1 }}
                onClick={() => setQuizType('mcq')}
              >
                Multiple Choice
              </button>
              <button
                className={`difficulty-btn ${quizType === 'short' ? 'active' : ''}`}
                style={{ flex: 1 }}
                onClick={() => setQuizType('short')}
              >
                Short Answer Essay
              </button>
            </div>
          </div>

          {/* Quiz Length Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-gold)', fontWeight: '600', fontFamily: 'var(--font-sans)', letterSpacing: '0.05em' }}>EXAM LENGTH (QUESTIONS)</span>
            <div style={{ display: 'flex', gap: '8px', backgroundColor: 'var(--bg-darker)', padding: '4px', borderRadius: '6px', border: '1px solid rgba(194, 149, 31, 0.15)' }}>
              {[5, 7, 10].map((num) => (
                <button
                  key={num}
                  className={`difficulty-btn ${quizLength === num ? 'active' : ''}`}
                  style={{ flex: 1 }}
                  onClick={() => setQuizLength(num)}
                >
                  {num} Questions
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
          <button
            className="editorial-btn"
            onClick={handleGenerateQuiz}
            disabled={quizLoading}
            style={{ padding: '12px 28px', fontSize: '15px' }}
          >
            <Icon type="sparkles" size={18} />
            {quizLoading ? "Compiling Examination..." : "Draft Examination"}
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {quizError && (
        <div style={{ padding: '16px', backgroundColor: 'var(--error-bg)', border: '1px solid var(--error-border)', color: 'var(--error-text)', borderRadius: '8px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Icon type="info" size={20} />
          <div style={{ flexGrow: '1', fontSize: '15px' }}>{quizError}</div>
          <button className="editorial-btn-secondary" onClick={handleGenerateQuiz} style={{ padding: '6px 12px', fontSize: '13px', borderColor: 'var(--error-border)', color: 'var(--error-text)' }}>Retry</button>
        </div>
      )}

      {/* Generating Loader */}
      {quizLoading && (
        <div className="editorial-card" style={{ padding: '32px', borderRadius: '12px' }}>
          <AcademicLoading type="quiz" />
        </div>
      )}

      {/* Render Generated Quiz */}
      {generatedQuiz && !quizLoading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Running Score (If Graded) */}
          {quizSubmitted && quizFeedback && (
            <div className="editorial-card fade-in" style={{ padding: '24px 32px', backgroundColor: 'var(--bg-card)', borderLeft: '4px solid var(--accent-gold)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif-display)', fontSize: '22px', margin: '0', color: 'var(--text-gold)' }}>Examination Result Card</h3>
                <span style={{ fontSize: '14.5px', color: 'var(--text-secondary)' }}>Evaluated using direct context reference</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span style={{ fontSize: '36px', fontFamily: 'var(--font-serif-display)', fontWeight: 'bold', color: 'var(--text-primary)' }}>{quizFeedback.score}</span>
                <span style={{ fontSize: '20px', color: 'var(--text-secondary)' }}>/ {quizFeedback.total}</span>
                <span style={{ fontSize: '15px', color: 'var(--text-gold)', marginLeft: '12px', fontFamily: 'var(--font-sans)', fontWeight: '600' }}>
                  ({Math.round((quizFeedback.score / quizFeedback.total) * 100)}%)
                </span>
              </div>
            </div>
          )}

          {/* Question Cards */}
          {generatedQuiz.map((q, idx) => {
            const feedback = quizSubmitted && quizFeedback
              ? (quizType === 'mcq'
                  ? quizFeedback.details[idx]
                  : quizFeedback.details.find(d => d.questionIdx === idx))
              : null;

            let cardBorder = 'rgba(194, 149, 31, 0.18)';
            let cardBackground = 'var(--bg-card)';
            if (quizSubmitted && feedback) {
              if (quizType === 'mcq') {
                cardBorder = feedback.isCorrect ? 'var(--success-border)' : 'var(--error-border)';
                cardBackground = feedback.isCorrect ? 'var(--success-bg)' : 'var(--error-bg)';
              } else {
                if (feedback.grade === 'Correct') {
                  cardBorder = 'var(--success-border)';
                  cardBackground = 'var(--success-bg)';
                } else if (feedback.grade === 'Partially Correct') {
                  cardBorder = 'var(--warning-border)';
                  cardBackground = 'var(--warning-bg)';
                } else {
                  cardBorder = 'var(--error-border)';
                  cardBackground = 'var(--error-bg)';
                }
              }
            }

            return (
              <div
                key={idx}
                className="editorial-card fade-in"
                style={{
                  padding: '28px',
                  borderColor: cardBorder,
                  backgroundColor: cardBackground,
                  borderRadius: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontWeight: '500' }}>QUESTION {idx + 1} OF {generatedQuiz.length}</span>
                  {quizSubmitted && feedback && (
                    <span style={{
                      fontSize: '13px',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: '700',
                      color: (quizType === 'mcq'
                        ? (feedback.isCorrect ? 'var(--success-text)' : 'var(--error-text)')
                        : (feedback.grade === 'Correct' ? 'var(--success-text)' : feedback.grade === 'Partially Correct' ? 'var(--warning-text)' : 'var(--error-text)'))
                    }}>
                      {quizType === 'mcq'
                        ? (feedback.isCorrect ? "CORRECT ✓" : "INCORRECT ✗")
                        : feedback.grade.toUpperCase()}
                    </span>
                  )}
                </div>

                <h3 style={{ fontSize: '19px', fontFamily: 'var(--font-serif-body)', color: 'var(--text-primary)', margin: '0', textAlign: 'left' }}>{q.question}</h3>

                {/* MCQ Render Options */}
                {quizType === 'mcq' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
                    {q.options.map((opt, optIdx) => {
                      const optionLetter = opt.charAt(0); // A, B, C, D
                      const isSelected = quizAnswers[idx] === optionLetter;
                      const isCorrectAnswer = q.answer === optionLetter;
                      
                      let containerClass = `gold-radio-container ${isSelected ? 'selected' : ''}`;
                      let optionStyle = { borderRadius: '6px' };
                      
                      if (quizSubmitted) {
                        if (isCorrectAnswer) {
                          optionStyle = { border: '1px solid var(--success-border)', backgroundColor: 'var(--success-bg)', color: 'var(--success-text)', borderRadius: '6px' };
                        } else if (isSelected && !isCorrectAnswer) {
                          optionStyle = { border: '1px solid var(--error-border)', backgroundColor: 'var(--error-bg)', color: 'var(--error-text)', borderRadius: '6px' };
                        }
                      }

                      return (
                        <div
                          key={optIdx}
                          className={containerClass}
                          style={optionStyle}
                          onClick={() => !quizSubmitted && handleSelectMCQ(idx, optionLetter)}
                        >
                          <div className="gold-radio-circle" style={quizSubmitted && isCorrectAnswer ? { borderColor: 'var(--success-text)' } : {}}>
                            <div className="gold-radio-inner" style={quizSubmitted && isCorrectAnswer ? { backgroundColor: 'var(--success-text)' } : {}}></div>
                          </div>
                          <span style={{ fontSize: '15.5px' }}>{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Short Answer Text Area */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <textarea
                      className="editorial-textarea"
                      style={{ minHeight: '90px', fontSize: '15px', padding: '12px', borderRadius: '6px' }}
                      placeholder="Compose your brief essay response here..."
                      value={quizAnswers[idx] || ''}
                      onChange={(e) => !quizSubmitted && handleShortAnswerChange(idx, e.target.value)}
                      disabled={quizSubmitted}
                    />
                  </div>
                )}

                {/* Individual Feedback Details */}
                {quizSubmitted && feedback && (
                  <div className="fade-in" style={{ marginTop: '10px', padding: '18px', backgroundColor: 'var(--bg-darker)', borderRadius: '8px', borderLeft: '3px solid var(--accent-gold)', textAlign: 'left' }}>
                    {quizType === 'mcq' ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <span style={{ fontSize: '13px', color: 'var(--text-gold)', fontWeight: '700', fontFamily: 'var(--font-sans)' }}>TUTOR EXPLANATION:</span>
                        <p style={{ fontSize: '15.5px', color: 'var(--text-secondary)', margin: '0', lineHeight: '1.6' }}>{feedback.explanation}</p>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          <span style={{ fontSize: '13px', color: 'var(--text-gold)', fontWeight: '700', fontFamily: 'var(--font-sans)' }}>TUTOR FEEDBACK ({feedback.score} pts):</span>
                          <p style={{ fontSize: '15.5px', color: 'var(--text-secondary)', margin: '0', lineHeight: '1.6' }}>{feedback.feedback}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid rgba(194, 149, 31, 0.12)', paddingTop: '10px' }}>
                          <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '700', fontFamily: 'var(--font-sans)' }}>EXAM RUBRIC REFERENCE (EXPECTED):</span>
                          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', fontStyle: 'italic', margin: '0', lineHeight: '1.6' }}>{q.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}

          {/* Submit Box */}
          {!quizSubmitted ? (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button
                className="editorial-btn"
                style={{ padding: '14px 40px' }}
                onClick={handleSubmitQuiz}
                disabled={quizGradingLoading}
              >
                <Icon type="lock" size={18} />
                {quizGradingLoading ? "Tutor is Evaluating..." : "Submit Examination Paper"}
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
              <button className="editorial-btn-secondary" onClick={() => { handleGenerateQuiz(); }} style={{ padding: '12px 24px' }}>
                Reset & Retake Test
              </button>
              <button className="editorial-btn" onClick={handleGenerateQuiz} style={{ padding: '12px 24px' }}>
                <Icon type="sparkles" size={18} />
                Generate Fresh Examination
              </button>
            </div>
          )}

          {/* Grading Process Indicator */}
          {quizGradingLoading && (
            <div className="editorial-card" style={{ padding: '32px', borderRadius: '12px' }}>
              <AcademicLoading type="test" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
