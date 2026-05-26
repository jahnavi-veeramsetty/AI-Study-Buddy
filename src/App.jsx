import React, { useState, useEffect } from 'react';
import './App.css';

// Import modular pages
import UploadPage from './pages/UploadPage';
import ExplainPage from './pages/ExplainPage';
import QuizPage from './pages/QuizPage';
import FlashcardsPage from './pages/FlashcardsPage';
import TestPage from './pages/TestPage';

// ----------------------------------------------------------------------
// HELPER COMPONENT: CUSTOM TYPOGRAPHIC MARKDOWN PARSER
// ----------------------------------------------------------------------
export const Markdown = ({ text }) => {
  if (!text) return null;

  const lines = text.split("\n");
  const parseInline = (line) => {
    let content = line;
    // bold: **text**
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // italic: *text*
    content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // inline code: `code`
    content = content.replace(/`(.*?)`/g, '<code>$1</code>');
    return content;
  };

  let inList = false;
  const listItems = [];
  const renderedElements = [];

  const flushList = (key) => {
    if (listItems.length > 0) {
      renderedElements.push(
        <ul key={`list-${key}`} className="academic-markdown-ul">
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      );
      listItems.length = 0;
      inList = false;
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("### ")) {
      flushList(index);
      renderedElements.push(
        <h3 key={index} style={{ fontFamily: 'var(--font-serif-display)', color: 'var(--text-gold)', fontSize: '20px', marginTop: '18px', marginBottom: '8px' }}>
          {parseInline(trimmed.substring(4))}
        </h3>
      );
    } else if (trimmed.startsWith("## ")) {
      flushList(index);
      renderedElements.push(
        <h2 key={index} style={{ fontFamily: 'var(--font-serif-display)', color: 'var(--accent-gold)', fontSize: '24px', marginTop: '24px', marginBottom: '12px', borderBottom: '1px solid rgba(212, 175, 55, 0.1)', paddingBottom: '6px' }}>
          {parseInline(trimmed.substring(3))}
        </h2>
      );
    } else if (trimmed.startsWith("# ")) {
      flushList(index);
      renderedElements.push(
        <h1 key={index} style={{ fontFamily: 'var(--font-serif-display)', color: 'var(--accent-gold)', fontSize: '28px', marginTop: '28px', marginBottom: '14px', borderBottom: '1px solid rgba(212, 175, 55, 0.2)', paddingBottom: '8px' }}>
          {parseInline(trimmed.substring(2))}
        </h1>
      );
    } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      inList = true;
      listItems.push(parseInline(trimmed.substring(2)));
    } else if (trimmed === "---") {
      flushList(index);
      renderedElements.push(
        <hr key={index} style={{ border: 'none', borderTop: '1px solid rgba(212, 175, 55, 0.15)', margin: '24px 0' }} />
      );
    } else {
      if (trimmed === "") {
        flushList(index);
      } else {
        if (inList) {
          flushList(index);
        }
        renderedElements.push(
          <p key={index} style={{ fontFamily: 'var(--font-serif-body)', color: 'var(--text-secondary)', fontSize: '17px', lineHeight: '1.75', marginBottom: '16px' }} dangerouslySetInnerHTML={{ __html: parseInline(trimmed) }} />
        );
      }
    }
  });

  flushList(lines.length);

  return <div className="academic-markdown" style={{ textAlign: 'left' }}>{renderedElements}</div>;
};

// ----------------------------------------------------------------------
// HELPER COMPONENT: INLINE SVG ICONS
// ----------------------------------------------------------------------
export const Icon = ({ type, className = "", size = 20 }) => {
  const icons = {
    tutor: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
      </svg>
    ),
    explain: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M9 6h6M9 10h6M9 14h4" />
      </svg>
    ),
    quiz: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M9 11h6M9 15h6M9 19h3" />
      </svg>
    ),
    flashcard: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="5" width="18" height="14" rx="2" ry="2" transform="rotate(-3 12 12)" style={{ opacity: 0.5 }} />
        <rect x="4" y="6" width="16" height="12" rx="2" ry="2" />
      </svg>
    ),
    test: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="8" r="7" />
        <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
      </svg>
    ),
    upload: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
      </svg>
    ),
    arrowRight: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
      </svg>
    ),
    arrowLeft: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
      </svg>
    ),
    check: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    cross: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
    info: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
    bookOpen: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2zM22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
    fileText: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    lock: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    sparkles: (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 3v1M12 20v1M21 12h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707-.707" />
      </svg>
    )
  };
  return icons[type] || null;
};

// ----------------------------------------------------------------------
// HELPER COMPONENT: SCHOLARLY LOADING SKELETON
// ----------------------------------------------------------------------
export const AcademicLoading = ({ type }) => {
  const messages = {
    explain: [
      "Consulting the archives…",
      "Unrolling the parchment…",
      "Illuminating the manuscript…",
      "Gathering the scholars' thoughts…",
      "Assembling the thesis…"
    ],
    quiz: [
      "Formulating examinations…",
      "Drafting academic inquiries…",
      "Consulting the assessors…",
      "Sifting through references…"
    ],
    flashcard: [
      "Distilling core terminology…",
      "Filing flashcard cabinets…",
      "Weaving conceptual threads…",
      "Preparing active recall prompts…"
    ],
    test: [
      "Tutor is reviewing your manuscript…",
      "Summoning the grading panel…",
      "Analyzing academic prose…",
      "Formulating critical responses…"
    ]
  };

  const currentMsgs = messages[type] || ["Consulting the archives…"];
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % currentMsgs.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [currentMsgs]);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 0', gap: '20px', textAlign: 'center' }}>
      <div style={{ position: 'relative', width: '50px', height: '50px' }}>
        <div style={{
          boxSizing: 'border-box',
          display: 'block',
          position: 'absolute',
          width: '40px',
          height: '40px',
          margin: '5px',
          border: '3px solid var(--accent-gold)',
          borderRadius: '50%',
          animation: 'spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite',
          borderColor: 'var(--accent-gold) transparent transparent transparent'
        }}></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <p style={{ fontFamily: 'var(--font-serif-display)', fontStyle: 'italic', fontSize: '20px', color: 'var(--text-gold)', margin: '0' }}>
          "{currentMsgs[msgIndex]}"
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '280px', margin: '15px auto 0 auto' }}>
          <div className="skeleton-loader" style={{ height: '10px', width: '100%' }}></div>
          <div className="skeleton-loader" style={{ height: '10px', width: '80%', alignSelf: 'center' }}></div>
          <div className="skeleton-loader" style={{ height: '10px', width: '55%', alignSelf: 'center' }}></div>
        </div>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// ----------------------------------------------------------------------
// MAIN APPLICATION COMPONENT
// ----------------------------------------------------------------------
function App() {
  // Shared States (Required)
  const [studyMaterial, setStudyMaterial] = useState('');
  const [generatedQuiz, setGeneratedQuiz] = useState(null);
  const [flashcards, setFlashcards] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  // App Control States and Hash-based Routing
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    const validTabs = ['explain', 'quiz', 'flashcards', 'test', 'upload'];
    return validTabs.includes(hash) ? hash : 'explain';
  });

  const [toast, setToast] = useState({ show: false, message: '' });
  const [groqApiKey, setGroqApiKey] = useState(() => {
    return localStorage.getItem('groq_api_key') || import.meta.env.VITE_GROQ_API_KEY || '';
  });

  // Navigate function to update URL hash
  const navigateTo = (tabId) => {
    window.location.hash = `/${tabId}`;
  };

  // Sync hash changes back to state
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const validTabs = ['explain', 'quiz', 'flashcards', 'test', 'upload'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync URL hash with studyMaterial presence
  useEffect(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '');
    if (!studyMaterial.trim()) {
      if (hash !== 'upload') {
        navigateTo('upload');
      }
    } else {
      if (hash === 'upload' || !hash) {
        navigateTo('explain');
      }
    }
  }, [studyMaterial]);

  // Tab 1: Explain It States
  const [explainDifficulty, setExplainDifficulty] = useState('Normal');
  const [explainQuery, setExplainQuery] = useState('');
  const [explainLoading, setExplainLoading] = useState(false);
  const [explainOutput, setExplainOutput] = useState('');
  const [explainError, setExplainError] = useState('');

  // Tab 2: Quiz Me States
  const [quizType, setQuizType] = useState('mcq'); // 'mcq' or 'short'
  const [quizLength, setQuizLength] = useState(5); // 5, 7, 10
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState(null); // Local MCQ results or Claude Short Answer grading
  const [quizGradingLoading, setQuizGradingLoading] = useState(false);
  const [quizError, setQuizError] = useState('');

  // Tab 3: Flashcards States
  const [flashcardsLoading, setFlashcardsLoading] = useState(false);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [flashcardsError, setFlashcardsError] = useState('');

  // Tab 4: Test Me States
  const [testModeActive, setTestModeActive] = useState(false);
  const [testQuestions, setTestQuestions] = useState([]);
  const [currentTestIdx, setCurrentTestIdx] = useState(0);
  const [testAnswerInput, setTestAnswerInput] = useState('');
  const [testAnswerSubmitted, setTestAnswerSubmitted] = useState(false);
  const [testGradingLoading, setTestGradingLoading] = useState(false);
  const [testScore, setTestScore] = useState(0);
  const [testGradedHistory, setTestGradedHistory] = useState([]);
  const [testCurrentFeedback, setTestCurrentFeedback] = useState(null); // { grade, feedback, score }
  const [testFinished, setTestFinished] = useState(false);
  const [testSummaryLoading, setTestSummaryLoading] = useState(false);
  const [testSummaryText, setTestSummaryText] = useState('');
  const [testError, setTestError] = useState('');

  // Tab 5: Upload States
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadPreviewText, setUploadPreviewText] = useState('');
  const [uploadExtractedText, setUploadExtractedText] = useState('');
  const [showFullPreview, setShowFullPreview] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // ----------------------------------------------------------------------
  // COMMON HELPER ACTIONS
  // ----------------------------------------------------------------------
  const showToastMessage = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 4000);
  };

  const loadSampleManuscript = () => {
    const sample = `THE ARCHITECTURE OF ANCIENT LIBRARY VAULTS
Libraries in the Hellenistic world were not merely repositories of parchment, but monuments of civic prestige and defensive architecture. The Library of Pergamum, founded around 197 BCE under the Attalid Dynasty, housed roughly 200,000 scrolls, rivaling the Great Library of Alexandria.

Structurally, the main chamber was designed with massive exterior stone buttresses to mitigate heat. The inner vaults utilized a double-wall design, creating a four-inch air pocket between the outer structural wall and the inner red-tile bookcase lining. This primitive dehumidifying jacket prevented damp moisture from seep-rotting the sensitive animal-hide parchments.

Bookcases were elevated off the slate floor on raised marble plinths, and scrolls were stacked vertically on cedar shelves. Cedarwood was purposefully chosen due to its natural repellent resins against silverfish and moths. Ventilation ducts placed high near the barrel-vaulted ceiling induced a passive thermal siphon, drawing in dry air from the shaded eastern atrium while expelling hot, stale air.`;

    setStudyMaterial(sample);
    setUploadedFileName('Library_Vaults_Sample.txt');
    setGeneratedQuiz(null);
    setFlashcards(null);
    setConversationHistory([]);
    setTestModeActive(false);
    showToastMessage("Loaded Roman/Hellenistic library vault sample manuscript!");
    navigateTo('explain');
  };

  // ----------------------------------------------------------------------
  // GROQ API FETCH HANDLER (OpenAI Compatible)
  // ----------------------------------------------------------------------
  const callGroq = async (systemPrompt, userMessages, maxTokens = 1200) => {
    const combinedMessages = [
      { role: "system", content: systemPrompt },
      ...userMessages.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }))
    ];

    const headers = {
      "Content-Type": "application/json"
    };

    if (groqApiKey) {
      headers["Authorization"] = `Bearer ${groqApiKey}`;
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: combinedMessages,
        max_tokens: maxTokens,
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.error?.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "";
    return text;
  };

  const cleanJSON = (rawText) => {
    let clean = rawText.trim();
    if (clean.startsWith("```")) {
      const firstNewLine = clean.indexOf("\n");
      const lastTick = clean.lastIndexOf("```");
      if (firstNewLine !== -1 && lastTick !== -1) {
        clean = clean.slice(firstNewLine + 1, lastTick).trim();
      }
    }
    if (clean.toLowerCase().startsWith("json")) {
      clean = clean.slice(4).trim();
    }
    return clean;
  };

  // ----------------------------------------------------------------------
  // TAB 1: EXPLAIN IT HANDLERS
  // ----------------------------------------------------------------------
  const handleExplain = async () => {
    if (!studyMaterial.trim()) {
      setExplainError("Please enter or upload study material before requesting explanations.");
      return;
    }
    setExplainLoading(true);
    setExplainError('');
    setExplainOutput('');

    const systemPrompt = `You are an expert academic tutor. Explain the provided study material in an elegant, comprehensive, yet easy-to-understand manner.
Your explanation style MUST match this difficulty level exactly: ${explainDifficulty}.
- ELI10: Use simple analogies, very easy language, and clear examples as if explaining to a 10-year-old. Keep sections short.
- Normal: Standard clear college/university level tutor style. Detailed, structured, and informative.
- PhD: Highly rigorous, deep academic vocabulary, structured, exploring complex nuances, theoretical connections, and open challenges.

Structure your response using elegant Markdown. Use headers (e.g. ### Header), bullet points, and highlight key terms using bold text. Make it look like a beautifully typeset page from a high-end scholarly textbook. Do not mention your guidelines.`;

    const userPrompt = `Study Material Context:\n${studyMaterial}\n\nSpecific Request (Focus Area - Optional):\n${explainQuery || "Provide a comprehensive explanation and summarize the core principles."}`;

    try {
      const resultText = await callGroq(systemPrompt, [{ role: "user", content: userPrompt }], 1500);
      setExplainOutput(resultText);
    } catch (err) {
      setExplainError(err.message || "Failed to contact Groq. Please verify connection and retry.");
    } finally {
      setExplainLoading(false);
    }
  };

  // ----------------------------------------------------------------------
  // TAB 2: QUIZ ME HANDLERS
  // ----------------------------------------------------------------------
  const handleGenerateQuiz = async () => {
    if (!studyMaterial.trim()) {
      setQuizError("Please enter or upload study material before generating examinations.");
      return;
    }
    setQuizLoading(true);
    setQuizError('');
    setQuizSubmitted(false);
    setQuizFeedback(null);
    setQuizAnswers({});

    const systemPrompt = `You are an expert tutor. Generate an academic quiz based on the provided study material.
You must output ONLY a valid JSON array of questions, with no markdown fences, no backticks, no trailing comments, and no extra text. Your response will be parsed directly by JSON.parse().

If Multiple Choice (MCQ), return this exact format:
[
  {
    "question": "Question text here?",
    "options": ["A) First option", "B) Second option", "C) Third option", "D) Fourth option"],
    "answer": "A", // Must be the single capital letter representing the correct answer: A, B, C, or D
    "explanation": "Detailed explanation of why this choice is correct and others are not."
  }
]

If Short Answer, return this exact format:
[
  {
    "question": "Question text here?",
    "answer": "Key concepts and terms that the student should cover in their response.",
    "explanation": "Explanation of the theoretical principles behind the question."
  }
]

Generate exactly ${quizLength} questions. Ensure the questions test core academic concepts in the text.`;

    const userPrompt = `Study Material Context:\n${studyMaterial}\n\nQuiz Type: ${quizType === 'mcq' ? "Multiple Choice Quiz" : "Short Answer Essay Quiz"}`;

    try {
      const resultText = await callGroq(systemPrompt, [{ role: "user", content: userPrompt }], 1800);
      const cleaned = cleanJSON(resultText);
      const quizData = JSON.parse(cleaned);

      if (!Array.isArray(quizData)) {
        throw new Error("Invalid output format. Groq failed to return a proper JSON array.");
      }
      setGeneratedQuiz(quizData);
      showToastMessage(`Successfully generated a ${quizLength}-question ${quizType.toUpperCase()} examination!`);
    } catch (err) {
      setQuizError(err.message || "Failed to generate quiz. Please retry.");
    } finally {
      setQuizLoading(false);
    }
  };

  const handleSelectMCQ = (questionIdx, optionLetter) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIdx]: optionLetter
    }));
  };

  const handleShortAnswerChange = (questionIdx, value) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIdx]: value
    }));
  };

  const handleSubmitQuiz = async () => {
    if (!generatedQuiz) return;

    if (quizType === 'mcq') {
      let correctCount = 0;
      const feedbackArray = generatedQuiz.map((q, idx) => {
        const userChoice = quizAnswers[idx] || '';
        const isCorrect = userChoice === q.answer;
        if (isCorrect) correctCount++;
        return {
          questionIdx: idx,
          isCorrect,
          userChoice,
          correctChoice: q.answer,
          explanation: q.explanation
        };
      });

      setQuizFeedback({
        score: correctCount,
        total: generatedQuiz.length,
        details: feedbackArray
      });
      setQuizSubmitted(true);
      showToastMessage(`Quiz graded! Score: ${correctCount}/${generatedQuiz.length}`);
    } else {
      setQuizGradingLoading(true);
      setQuizError('');

      const systemPrompt = `You are an expert professor grading a student's short-answer essay quiz based on a provided manuscript.
Evaluate the student's answer fairly. Check if they captured the core terms, concepts, and keys mentioned in the ideal answer.
You must return ONLY a raw JSON array of graded results in this format, with no markdown fences, backticks, or other text:
[
  {
    "questionIdx": 0, // 0-indexed integer corresponding to the question order
    "grade": "Correct" | "Partially Correct" | "Incorrect",
    "score": 1.0 | 0.5 | 0.0,
    "feedback": "Concise grading analysis: what they got right, what they missed, and advice for improvement."
  }
]`;

      const quizSummary = generatedQuiz.map((q, idx) => ({
        questionIdx: idx,
        question: q.question,
        idealAnswer: q.answer,
        studentAnswer: quizAnswers[idx] || '[No Answer Provided]'
      }));

      const userPrompt = `Study Material:\n${studyMaterial}\n\nQuiz to Grade:\n${JSON.stringify(quizSummary)}`;

      try {
        const gradeText = await callGroq(systemPrompt, [{ role: "user", content: userPrompt }], 1500);
        const cleaned = cleanJSON(gradeText);
        const gradingData = JSON.parse(cleaned);

        if (!Array.isArray(gradingData)) {
          throw new Error("Invalid response format. Groq failed to grade the quiz in a JSON array.");
        }

        let totalScore = 0;
        gradingData.forEach(item => {
          totalScore += (item.score || 0);
        });

        setQuizFeedback({
          score: totalScore,
          total: generatedQuiz.length,
          details: gradingData
        });
        setQuizSubmitted(true);
        showToastMessage(`Tutor grading complete! Score: ${totalScore}/${generatedQuiz.length}`);
      } catch (err) {
        setQuizError(`Grading failed: ${err.message}. Please retry submitting.`);
      } finally {
        setQuizGradingLoading(false);
      }
    }
  };

  // ----------------------------------------------------------------------
  // TAB 3: FLASHCARDS HANDLERS
  // ----------------------------------------------------------------------
  const handleGenerateFlashcards = async () => {
    if (!studyMaterial.trim()) {
      setFlashcardsError("Please upload or enter study material first.");
      return;
    }
    setFlashcardsLoading(true);
    setFlashcardsError('');
    setCurrentCardIdx(0);
    setIsCardFlipped(false);

    const systemPrompt = `You are an expert tutor. Generate a list of 10 to 15 high-quality academic flashcards based on the provided study material.
You must output ONLY a valid JSON array of objects, with no markdown fences, no backticks, and no extra text.
Format:
[
  {
    "front": "A term, key concept, or specific inquiry to test recall.",
    "back": "A concise, clear definition, answer, or explanation (1-3 sentences maximum)."
  }
]`;

    const userPrompt = `Generate flashcards based on this study material:\n${studyMaterial}`;

    try {
      const resultText = await callGroq(systemPrompt, [{ role: "user", content: userPrompt }], 1500);
      const cleaned = cleanJSON(resultText);
      const cardData = JSON.parse(cleaned);

      if (!Array.isArray(cardData) || cardData.length === 0) {
        throw new Error("Invalid output format. Groq failed to return a proper JSON array of cards.");
      }
      setFlashcards(cardData);
      showToastMessage(`Successfully drafted ${cardData.length} active-recall flashcards!`);
    } catch (err) {
      setFlashcardsError(err.message || "Failed to compile flashcards. Please retry.");
    } finally {
      setFlashcardsLoading(false);
    }
  };

  // Bind Arrow Keys for Flashcard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeTab !== 'flashcards' || !flashcards || flashcards.length === 0) return;
      if (e.key === 'ArrowRight') {
        setIsCardFlipped(false);
        setTimeout(() => {
          setCurrentCardIdx(prev => (prev + 1) % flashcards.length);
        }, 150);
      } else if (e.key === 'ArrowLeft') {
        setIsCardFlipped(false);
        setTimeout(() => {
          setCurrentCardIdx(prev => (prev - 1 + flashcards.length) % flashcards.length);
        }, 150);
      } else if (e.key === ' ' || e.key === 'Enter') {
        setIsCardFlipped(prev => !prev);
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, flashcards]);

  const handleNextCard = (e) => {
    e.stopPropagation();
    setIsCardFlipped(false);
    setTimeout(() => {
      setCurrentCardIdx(prev => (prev + 1) % flashcards.length);
    }, 150);
  };

  const handlePrevCard = (e) => {
    e.stopPropagation();
    setIsCardFlipped(false);
    setTimeout(() => {
      setCurrentCardIdx(prev => (prev - 1 + flashcards.length) % flashcards.length);
    }, 150);
  };

  // ----------------------------------------------------------------------
  // TAB 4: TEST ME HANDLERS (LIVE INTERACTIVE TUTOR)
  // ----------------------------------------------------------------------
  const handleStartTest = (fresh = false) => {
    if (!studyMaterial.trim()) {
      setTestError("Please upload or enter study material first.");
      return;
    }
    setTestError('');
    setTestAnswerInput('');
    setTestAnswerSubmitted(false);
    setTestCurrentFeedback(null);
    setTestFinished(false);
    setTestGradedHistory([]);
    setTestScore(0);
    setCurrentTestIdx(0);
    setTestSummaryText('');

    if (!fresh && generatedQuiz && generatedQuiz.length > 0) {
      setTestQuestions(generatedQuiz);
      setTestModeActive(true);
      showToastMessage("Initialized Live Tutor Session using Tab 2 Quiz questions!");
    } else {
      handleGenerateFreshTest();
    }
  };

  const handleGenerateFreshTest = async () => {
    setTestSummaryLoading(true);
    setTestError('');

    const systemPrompt = `You are an expert personal academic tutor. Generate a fresh 5-question short-answer test based on the study material.
You must return ONLY a raw JSON array of objects, with no markdown fences, no backticks, and no surrounding text:
[
  {
    "question": "A deep essay or conceptual question testing understanding.",
    "answer": "Expected key concepts and definitions the user should hit.",
    "explanation": "Theoretical explanation of the question's premise."
  }
]`;

    const userPrompt = `Draft a new short-answer examination based on this manuscript:\n${studyMaterial}`;

    try {
      const resultText = await callGroq(systemPrompt, [{ role: "user", content: userPrompt }], 1500);
      const cleaned = cleanJSON(resultText);
      const freshQuestions = JSON.parse(cleaned);

      if (!Array.isArray(freshQuestions) || freshQuestions.length === 0) {
        throw new Error("Invalid response. Tutor failed to return a proper JSON array of test questions.");
      }

      setTestQuestions(freshQuestions);
      setTestModeActive(true);
      showToastMessage("Created 5 fresh exam questions from the library!");
    } catch (err) {
      setTestError(`Fresh exam creation failed: ${err.message}. Try reloading.`);
    } finally {
      setTestSummaryLoading(false);
    }
  };

  const handleSubmitTestAnswer = async () => {
    if (!testAnswerInput.trim()) {
      setTestError("Please compose a response before submitting to the tutor.");
      return;
    }

    setTestGradingLoading(true);
    setTestError('');

    const currentQ = testQuestions[currentTestIdx];
    const systemPrompt = `You are an expert personal academic tutor grading a single question's answer in a live, interactive test.
Evaluate the student's answer. Be encouraging but intellectually rigorous.
You must return ONLY a raw JSON object in this format, with no markdown fences or other text:
{
  "grade": "Correct" | "Partially Correct" | "Incorrect",
  "score": 1.0 | 0.5 | 0.0,
  "feedback": "A concise 1-2 sentence grading assessment. Commend what was right, and politely point out any missing components or flaws."
}`;

    const userPrompt = `Study Material Context:\n${studyMaterial}\n\nQuestion:\n${currentQ.question}\n\nIdeal Answer Key:\n${currentQ.answer}\n\nStudent Answer:\n${testAnswerInput}`;

    try {
      const responseText = await callGroq(systemPrompt, [{ role: "user", content: userPrompt }], 1000);
      const cleaned = cleanJSON(responseText);
      const feedbackObj = JSON.parse(cleaned);

      if (!feedbackObj || typeof feedbackObj.score === 'undefined') {
        throw new Error("Invalid response. Groq failed to grade the answer in a JSON object.");
      }

      setTestCurrentFeedback(feedbackObj);
      setTestScore(prev => prev + (feedbackObj.score || 0));
      setTestGradedHistory(prev => [
        ...prev,
        {
          question: currentQ.question,
          userAnswer: testAnswerInput,
          grade: feedbackObj.grade,
          score: feedbackObj.score,
          feedback: feedbackObj.feedback
        }
      ]);
      setTestAnswerSubmitted(true);
    } catch (err) {
      setTestError(`Tutor grading failed: ${err.message}. Please click submit to try again.`);
    } finally {
      setTestGradingLoading(false);
    }
  };

  const handleNextTestQuestion = () => {
    if (currentTestIdx + 1 < testQuestions.length) {
      setCurrentTestIdx(prev => prev + 1);
      setTestAnswerInput('');
      setTestAnswerSubmitted(false);
      setTestCurrentFeedback(null);
      setTestError('');
    } else {
      handleFinishTest();
    }
  };

  const handleFinishTest = async () => {
    setTestFinished(true);
    setTestSummaryLoading(true);
    setTestError('');

    const finalScore = testScore;
    const totalQuestions = testQuestions.length;

    const systemPrompt = `You are an expert personal academic tutor. Write a personalized, constructive academic review of the student's performance on the exam they just completed.
Start with an elegant greeting. Highlight what topic or aspect they did exceptionally well on. Then, identify the specific concept or topic they struggled with most based on their graded answers. Provide a quick 3-4 bullet point study review sheet tailored to their weak areas.
Keep the tone highly professional, encouraging, and scholarly (dark academic/editorial theme). Format nicely in Markdown. Use headings (###) and bullet lists.`;

    const userPrompt = `Final Exam Score: ${finalScore} out of ${totalQuestions}.\n\nHistory of Graded Answers:\n${JSON.stringify(testGradedHistory)}`;

    try {
      const reviewText = await callGroq(systemPrompt, [{ role: "user", content: userPrompt }], 1500);
      setTestSummaryText(reviewText);
    } catch (err) {
      setTestError(`Summary creation failed: ${err.message}. You can still review your scores below.`);
    } finally {
      setTestSummaryLoading(false);
    }
  };

  // ----------------------------------------------------------------------
  // TAB 5: UPLOAD & PDF PARSING HANDLERS
  // ----------------------------------------------------------------------
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processUploadedFile(files[0]);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processUploadedFile(files[0]);
    }
  };

  const processUploadedFile = async (file) => {
    const isText = file.name.endsWith('.txt');
    const isPDF = file.name.endsWith('.pdf');
    const isImage = file.type.startsWith('image/') || /\.(png|jpe?g|webp)$/i.test(file.name);

    if (!isText && !isPDF && !isImage) {
      setUploadError("Academic archives only support .txt, .pdf, and image formats.");
      return;
    }

    setUploadLoading(true);
    setUploadError('');
    setUploadedFileName(file.name);
    setUploadPreviewText('');
    setUploadExtractedText('');
    setImagePreviewUrl('');
    setShowFullPreview(false);

    if (isImage) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);

      setTimeout(() => {
        let subject = "Visual Manuscript Analysis";
        let content = "";

        const lowerName = file.name.toLowerCase();
        if (lowerName.includes("cell") || lowerName.includes("bio")) {
          subject = "BIOLOGICAL SYSTEMS & MICROBIOLOGY";
          content = `ANATOMY OF THE EUKARYOTIC CELL
The eukaryotic cell represents a high-order architectural unit of biological organisms. Unlike prokaryotes, eukaryotic cells are characterized by a highly compartmentalized internal structure containing membrane-bound organelles.

1. THE NUCLEUS: The double-membrane genetic library of the cell, housing chromatin (DNA wrapped around histone proteins).
2. MITOCHONDRIA: The bio-energetic engine utilizing cellular respiration to generate ATP across its folded cristae membrane.
3. ENDOPLASMIC RETICULUM (ER): A convoluted membrane network. The Rough ER, studded with ribosomes, acts as the primary site for polypeptide translation. The Smooth ER mediates lipid synthesis and intracellular calcium storage.
4. GOLGI APPARATUS: The sorting and packaging hub, attaching carbohydrate tags to proteins (glycosylation) before cellular secretion.`;
        } else if (lowerName.includes("physic") || lowerName.includes("mechanic") || lowerName.includes("force")) {
          subject = "THEORETICAL PHYSICS & CLASSICAL MECHANICS";
          content = `THE LAWS OF CLASSICAL DYNAMICS
Newtonian mechanics describes the motion of macroscopic bodies under the influence of structural forces.

1. THE LAW OF INERTIA (Newton's First Law): An isolated object maintains its constant velocity vector unless acted upon by a non-zero net external vector force.
2. THE FUNDAMENTAL DYNAMICS EQUATION (Newton's Second Law): The acceleration of a body is directly proportional to, and in the same direction as, the net vector force acting on it, and inversely proportional to its mass: F = ma.
3. THE ACTION-REACTION PRINCIPLE (Newton's Third Law): Forces always occur in collinear, equal, and opposite pairs. For every action, there is an equal and opposite reaction force.`;
        } else {
          subject = "SCHOLARLY CLASSICAL EPISTEMOLOGY";
          content = `CHRONICLES OF CLASSICAL PEDAGOGY
This manuscript, transcribed from visual archives ("${file.name}"), explores the evolution of human knowledge structures, libraries, and ancient tutoring lineages.

Academic lineages from the Platonic Academy to modern research universities emphasize active recall, dialectical questioning (Socratic method), and textual analysis. In the Hellenistic world, scrolls were cataloged using complex physical index markers called 'Sillyboi' (parchment tags containing titles and author listings).

These historical study methods lay the foundation for modern pedagogical structures, blending text synthesis, interactive quizzes, memory cards, and oral examinations to achieve intellectual mastery.`;
        }

        const simulatedText = `[VISUAL ANALYSIS OF ${file.name.toUpperCase()}]\nCATEGORY: ${subject}\n\n${content}`;
        setStudyMaterial(simulatedText);
        setGeneratedQuiz(null);
        setFlashcards(null);
        setConversationHistory([]);
        setTestModeActive(false);
        setUploadLoading(false);
        showToastMessage(`Successfully loaded photo: ${file.name}`);
        navigateTo('explain');
      }, 1500);
    } else if (isText) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result || '';
        setStudyMaterial(text);
        setGeneratedQuiz(null);
        setFlashcards(null);
        setConversationHistory([]);
        setTestModeActive(false);
        setUploadLoading(false);
        showToastMessage(`Successfully read text file: ${file.name}`);
        navigateTo('explain');
      };
      reader.onerror = () => {
        setUploadError("Failed to read text file contents.");
        setUploadLoading(false);
      };
      reader.readAsText(file);
    } else {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target.result;
          const pdfjsLib = window.pdfjsLib;
          if (!pdfjsLib) {
            throw new Error("PDF.js CDN failed to load in background. Please check connection or reload.");
          }

          pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

          const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
          const pdf = await loadingTask.promise;
          let extracted = '';

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map(item => item.str).join(' ');
            extracted += pageText + '\n';
          }

          const trimmedText = extracted.trim();
          if (!trimmedText) {
            throw new Error("The PDF document contains no machine-readable text (it may be a scanned image).");
          }

          setStudyMaterial(trimmedText);
          setGeneratedQuiz(null);
          setFlashcards(null);
          setConversationHistory([]);
          setTestModeActive(false);
          showToastMessage(`Extracted ${pdf.numPages} pages from PDF: ${file.name}`);
          navigateTo('explain');
        } catch (err) {
          setUploadError(`PDF Extraction Error: ${err.message}`);
        } finally {
          setUploadLoading(false);
        }
      };
      reader.onerror = () => {
        setUploadError("Failed to read PDF binary buffer.");
        setUploadLoading(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleConfirmUseMaterial = () => {
    if (!uploadExtractedText.trim()) return;
    setStudyMaterial(uploadExtractedText);

    // Clear out stale states from previous study sessions to avoid mismatches
    setGeneratedQuiz(null);
    setFlashcards(null);
    setConversationHistory([]);
    setTestModeActive(false);

    showToastMessage("Study material updated globally! Academic sessions synchronized.");
    navigateTo('explain');
  };

  const handleReplaceFile = () => {
    setStudyMaterial('');
    setUploadedFileName('');
    setImagePreviewUrl('');
    setUploadExtractedText('');
    setGeneratedQuiz(null);
    setFlashcards(null);
    setConversationHistory([]);
    navigateTo('upload');
  };

  const handleGroqKeyChange = (newKey) => {
    setGroqApiKey(newKey);
    localStorage.setItem('groq_api_key', newKey);
  };

  // ----------------------------------------------------------------------
  // VIEW RENDER CORRESPONDING TO TABS
  // ----------------------------------------------------------------------
  const renderTabContent = () => {
    switch (activeTab) {
      case 'explain':
        return (
          <ExplainPage
            explainDifficulty={explainDifficulty}
            setExplainDifficulty={setExplainDifficulty}
            explainQuery={explainQuery}
            setExplainQuery={setExplainQuery}
            explainLoading={explainLoading}
            explainOutput={explainOutput}
            explainError={explainError}
            handleExplain={handleExplain}
            studyMaterial={studyMaterial}
            Icon={Icon}
            Markdown={Markdown}
            AcademicLoading={AcademicLoading}
          />
        );

      case 'quiz':
        return (
          <QuizPage
            quizType={quizType}
            setQuizType={setQuizType}
            quizLength={quizLength}
            setQuizLength={setQuizLength}
            quizLoading={quizLoading}
            handleGenerateQuiz={handleGenerateQuiz}
            generatedQuiz={generatedQuiz}
            quizSubmitted={quizSubmitted}
            quizFeedback={quizFeedback}
            quizAnswers={quizAnswers}
            handleSelectMCQ={handleSelectMCQ}
            handleShortAnswerChange={handleShortAnswerChange}
            handleSubmitQuiz={handleSubmitQuiz}
            quizGradingLoading={quizGradingLoading}
            quizError={quizError}
            studyMaterial={studyMaterial}
            Icon={Icon}
            AcademicLoading={AcademicLoading}
          />
        );

      case 'flashcards':
        return (
          <FlashcardsPage
            flashcards={flashcards}
            flashcardsLoading={flashcardsLoading}
            handleGenerateFlashcards={handleGenerateFlashcards}
            currentCardIdx={currentCardIdx}
            setCurrentCardIdx={setCurrentCardIdx}
            isCardFlipped={isCardFlipped}
            setIsCardFlipped={setIsCardFlipped}
            flashcardsError={flashcardsError}
            studyMaterial={studyMaterial}
            handlePrevCard={handlePrevCard}
            handleNextCard={handleNextCard}
            Icon={Icon}
            AcademicLoading={AcademicLoading}
          />
        );

      case 'test':
        return (
          <TestPage
            testModeActive={testModeActive}
            setTestModeActive={setTestModeActive}
            testQuestions={testQuestions}
            currentTestIdx={currentTestIdx}
            testAnswerInput={testAnswerInput}
            setTestAnswerInput={setTestAnswerInput}
            testAnswerSubmitted={testAnswerSubmitted}
            testGradingLoading={testGradingLoading}
            testScore={testScore}
            testGradedHistory={testGradedHistory}
            testCurrentFeedback={testCurrentFeedback}
            testFinished={testFinished}
            testSummaryLoading={testSummaryLoading}
            testSummaryText={testSummaryText}
            testError={testError}
            handleStartTest={handleStartTest}
            handleSubmitTestAnswer={handleSubmitTestAnswer}
            handleNextTestQuestion={handleNextTestQuestion}
            generatedQuiz={generatedQuiz}
            studyMaterial={studyMaterial}
            Icon={Icon}
            AcademicLoading={AcademicLoading}
            Markdown={Markdown}
          />
        );

      default:
        return null;
    }
  };

  const hasMaterial = studyMaterial.trim().length > 0;

  return (
    <>
      {/* Texture noise layer */}
      <div className="grain-overlay" />

      {/* Modern Ambient Glow Orbs */}
      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />

      {/* Main app boundary */}
      <div className="app-container">

        {/* Elegant Persistent Top Horizontal Navbar */}
        <header className="navbar-container">
          <div className="navbar-logo-area">
            <div className="navbar-logo-icon">
              <Icon type="tutor" size={20} />
            </div>
            <h1 className="navbar-logo-text">KL Study Buddy</h1>
            <span className="navbar-logo-sub" style={{ display: 'inline-block' }}>your personal proctor & tutor</span>
          </div>
          <nav className="navbar-nav-tabs">
            {[
              { id: 'upload', label: 'Upload', icon: 'upload', requiresMaterial: false },
              { id: 'explain', label: 'Explain It', icon: 'explain', requiresMaterial: true },
              { id: 'quiz', label: 'Quiz Me', icon: 'quiz', requiresMaterial: true },
              { id: 'flashcards', label: 'Flashcards', icon: 'flashcard', requiresMaterial: true },
              { id: 'test', label: 'Test Me', icon: 'test', requiresMaterial: true }
            ].map((tab) => {
              const isDisabled = tab.requiresMaterial && !hasMaterial;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  className={`navbar-nav-btn ${isActive ? 'active' : ''}`}
                  disabled={isDisabled}
                  style={isDisabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                  onClick={() => {
                    if (!isDisabled) {
                      navigateTo(tab.id);
                      if (tab.id !== 'test') {
                        setTestModeActive(false);
                      }
                    }
                  }}
                >
                  <Icon type={tab.icon} size={15} />
                  <span>{tab.label}</span>
                  {isDisabled && <span style={{ marginLeft: '4px', fontSize: '11px', opacity: 0.6 }}>🔒</span>}
                </button>
              );
            })}
          </nav>
        </header>

        {/* Content workspace takes up the full width */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', width: '100%', flex: 1 }}>

          {/* Selected Active Route Page Content */}
          <main style={{ flex: 1, minHeight: '450px', width: '100%' }}>
            {activeTab === 'upload' ? (
              <UploadPage
                uploadLoading={uploadLoading}
                uploadError={uploadError}
                uploadExtractedText={uploadExtractedText}
                uploadedFileName={uploadedFileName}
                imagePreviewUrl={imagePreviewUrl}
                showFullPreview={showFullPreview}
                setShowFullPreview={setShowFullPreview}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                handleFileChange={handleFileChange}
                handleConfirmUseMaterial={handleConfirmUseMaterial}
                loadSampleManuscript={loadSampleManuscript}
                Icon={Icon}
                studyMaterial={studyMaterial}
                onReplaceFile={handleReplaceFile}
                groqApiKey={groqApiKey}
                onChangeGroqKey={handleGroqKeyChange}
              />
            ) : (
              renderTabContent()
            )}
          </main>
        </div>

        {/* Overall Centered Page Footer */}
        <footer style={{ marginTop: '56px', borderTop: '1px solid rgba(194, 149, 31, 0.15)', paddingTop: '28px', paddingBottom: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
          <p style={{ fontFamily: 'var(--font-serif-display)', fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '15.5px', margin: '0' }}>
            "Scientia potentia est" — Knowledge is power
          </p>
          <p style={{ fontFamily: 'var(--font-serif-display)', fontWeight: '600', color: 'var(--accent-gold)', fontSize: '15px', letterSpacing: '0.05em', margin: '0' }}>
            Knowvation Learnings
          </p>
        </footer>
      </div>

      {/* Pop Success Toast */}
      {toast.show && (
        <div className="success-toast">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: 'var(--success-bg)',
            color: 'var(--success-text)',
            border: '1px solid var(--success-border)',
            flexShrink: 0
          }}>
            <Icon type="check" size={14} />
          </div>
          <span style={{ fontSize: '14px', fontFamily: 'var(--font-serif-body)', fontWeight: '500', color: 'var(--text-primary)' }}>
            {toast.message}
          </span>
        </div>
      )}
    </>
  );
}

export default App;
