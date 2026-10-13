import { useState, useEffect } from "react";

function Quiz({ onNavigate }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes timer
  const [hasConfirmed, setHasConfirmed] = useState(false);

  const questions = [
    {
      id: 1,
      topic: "JS Fundamentals • Ch. 1",
      points: 10,
      question: "Which keyword in JavaScript declares a block-scoped variable that cannot be re-assigned?",
      options: [
        { key: "A", text: "var" },
        { key: "B", text: "const" },
        { key: "C", text: "let" },
        { key: "D", text: "function" }
      ],
      correctKey: "B",
      explanation: "'const' creates immutable bindings within block scope."
    },
    {
      id: 2,
      topic: "Asynchronous JS • Ch. 2",
      points: 10,
      question: "What is the output order of 'console.log(1)', 'setTimeout(() => console.log(2), 0)', and 'console.log(3)'?",
      options: [
        { key: "A", text: "1, 2, 3" },
        { key: "B", text: "2, 1, 3" },
        { key: "C", text: "1, 3, 2" },
        { key: "D", text: "3, 1, 2" }
      ],
      correctKey: "C",
      explanation: "Synchronous logs execute first (1, 3), followed by macro-task callback from event loop (2)."
    },
    {
      id: 3,
      topic: "React Core • Ch. 3",
      points: 10,
      question: "Which React hook is primarily used for managing local reactive state in functional components?",
      options: [
        { key: "A", text: "useEffect" },
        { key: "B", text: "useContext" },
        { key: "C", text: "useMemo" },
        { key: "D", text: "useState" }
      ],
      correctKey: "D",
      explanation: "'useState' declares state variable and setter function inside components."
    },
    {
      id: 4,
      topic: "ES6 Features • Ch. 4",
      points: 10,
      question: "What does the spread operator '...' do when applied to an array in JavaScript?",
      options: [
        { key: "A", text: "Expands the array elements into individual arguments/elements" },
        { key: "B", text: "Sorts the elements in ascending numerical order" },
        { key: "C", text: "Freezes the object preventing modifications" },
        { key: "D", text: "Deletes duplicate entries from the collection" }
      ],
      correctKey: "A",
      explanation: "Spread syntax expands iterables into places where zero or more elements are expected."
    },
    {
      id: 5,
      topic: "Web Architecture • Ch. 5",
      points: 10,
      question: "In hybrid app architectures, how does JavaScript interact with native platform hardware?",
      options: [
        { key: "A", text: "Direct hardware memory pointers" },
        { key: "B", text: "Through a native bridge or JSI (JavaScript Interface)" },
        { key: "C", text: "Via raw assembly interrupt vectors" },
        { key: "D", text: "Browsers run directly on kernel rings" }
      ],
      correctKey: "B",
      explanation: "Hybrid frameworks bridge JavaScript threads with native Objective-C/Swift/Java/Kotlin threads."
    }
  ];

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, timeLeft]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const currentQ = questions[currentIdx];
  const progressPercent = ((currentIdx + 1) / questions.length) * 100;

  function handleSelectOption(key) {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQ.id]: key
    }));
  }

  function handleNext() {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsSubmitted(true);
    }
  }

  function handlePrev() {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  }

  // Calculate results
  let correctCount = 0;
  questions.forEach(q => {
    if (selectedAnswers[q.id] === q.correctKey) {
      correctCount++;
    }
  });
  const scorePercent = Math.round((correctCount / questions.length) * 100);
  const totalPoints = correctCount * 10;

  // Render Celebratory Result Screen
  if (isSubmitted) {
    return (
      <div className="w-full flex-1 flex flex-col items-center justify-between p-6 overflow-y-auto no-scrollbar pb-24 text-center bg-background text-on-surface">
        <div className="w-full max-w-sm space-y-5 pt-4">
          {/* Victory Illustration / Trophy */}
          <div className="relative w-36 h-36 mx-auto rounded-3xl bg-gradient-to-tr from-primary to-primary-container p-3 shadow-xl shadow-primary-container/30 flex items-center justify-center">
            <img 
              src="/assets/quiz_win.png" 
              alt="Victory Trophy" 
              className="w-full h-full object-contain drop-shadow-md"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '<span class="material-symbols-outlined text-white text-6xl">emoji_events</span>';
              }}
            />
          </div>

          <div>
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary-fixed/50 text-secondary text-xs font-bold mb-2">
              <span className="material-symbols-outlined text-sm fill-icon">military_tech</span>
              <span>Passed with Distinction</span>
            </div>
            <h1 className="font-headline text-2xl font-bold text-on-surface">
              Quiz Completed!
            </h1>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Great performance on JavaScript & Architecture Fundamentals.
            </p>
          </div>

          {/* Score Stat Cards */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-3 shadow-2xs">
              <span className="text-[10px] text-outline uppercase font-semibold block">Score</span>
              <span className="font-headline text-xl font-bold text-primary">{scorePercent}%</span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-3 shadow-2xs">
              <span className="text-[10px] text-outline uppercase font-semibold block">Correct</span>
              <span className="font-headline text-xl font-bold text-secondary">{correctCount}/{questions.length}</span>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-3 shadow-2xs">
              <span className="text-[10px] text-outline uppercase font-semibold block">Points</span>
              <span className="font-headline text-xl font-bold text-amber-600">+{totalPoints}</span>
            </div>
          </div>

          {/* Quick Answers Review */}
          <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-3.5 text-left space-y-2">
            <span className="text-xs font-bold text-on-surface block">Answers Breakdown</span>
            <div className="space-y-1.5 text-xs">
              {questions.map((q, i) => {
                const isRight = selectedAnswers[q.id] === q.correctKey;
                return (
                  <div key={q.id} className="flex items-center justify-between py-1 border-b border-outline-variant/20 last:border-none">
                    <span className="text-on-surface line-clamp-1 flex-1 pr-2">
                      Q{i+1}. {q.question}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      isRight ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                    }`}>
                      {isRight ? "Correct" : "Wrong"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full max-w-sm space-y-2 pt-4">
          <button
            type="button"
            onClick={() => {
              setSelectedAnswers({});
              setCurrentIdx(0);
              setIsSubmitted(false);
              setTimeLeft(300);
            }}
            className="w-full h-12 rounded-xl bg-surface-container border border-outline-variant/50 text-on-surface text-xs font-bold hover:bg-surface-container-high active:scale-98 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">replay</span>
            <span>Retake Quiz</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="w-full h-12 rounded-xl bg-primary text-white text-xs font-bold shadow-md hover:bg-primary/90 active:scale-98 transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">home</span>
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    );
  }

  // Active Quiz View
  return (
    <div className="w-full flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar pb-24 text-left">
      {/* Quiz Navigation Top Bar */}
      <div>
        <nav className="w-full px-5 py-3 flex items-center justify-between sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/20">
          <button
            type="button"
            onClick={() => onNavigate("home")}
            className="w-9 h-9 rounded-full bg-surface-container-lowest border border-outline-variant/40 flex items-center justify-center text-on-surface hover:bg-surface-container active:scale-95 transition-all shadow-2xs"
            aria-label="Exit Quiz"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>

          <div className="h-9 px-3.5 bg-surface-container-lowest border border-outline-variant/40 rounded-full flex items-center gap-1.5 shadow-2xs">
            <span className="text-xs font-bold text-on-surface">
              Question {currentIdx + 1} <span className="text-outline font-normal">/ {questions.length}</span>
            </span>
          </div>

          <div className="h-9 px-3 bg-surface-container-lowest border border-outline-variant/40 rounded-full flex items-center gap-1.5 shadow-2xs">
            <span className="material-symbols-outlined text-primary-container text-base">timer</span>
            <span className="text-xs font-mono font-bold text-primary">{formatTimer(timeLeft)}</span>
          </div>
        </nav>

        {/* Linear Progress Bar */}
        <div className="w-full h-1.5 bg-surface-container-high overflow-hidden">
          <div 
            className="h-full bg-primary-container transition-all duration-300 rounded-r-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Quiz Content Canvas */}
        <main className="px-5 pt-4 space-y-4">
          {/* Topic & Points Badge */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-surface-container-high text-primary border border-outline-variant/30">
              {currentQ.topic}
            </span>

            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-amber-600 fill-icon">bolt</span>
              +{currentQ.points} pts
            </span>
          </div>

          {/* Question Box */}
          <section className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/40 shadow-2xs space-y-2">
            <span className="text-[10px] text-outline uppercase font-bold tracking-wider">
              Single Choice Question
            </span>
            <h2 className="font-headline text-base font-bold text-on-surface leading-snug">
              {currentQ.question}
            </h2>
          </section>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((option) => {
              const isSelected = selectedAnswers[currentQ.id] === option.key;

              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => handleSelectOption(option.key)}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all active:scale-99 ${
                    isSelected
                      ? "bg-primary/5 border-primary shadow-xs ring-2 ring-primary/20"
                      : "bg-surface-container-lowest border-outline-variant/50 hover:bg-surface-container text-on-surface shadow-2xs"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    isSelected 
                      ? "bg-primary text-white" 
                      : "bg-surface-container text-on-surface-variant"
                  }`}>
                    {option.key}
                  </div>

                  <span className={`text-xs font-medium flex-1 ${isSelected ? "text-primary font-bold" : "text-on-surface"}`}>
                    {option.text}
                  </span>

                  {isSelected && (
                    <span className="material-symbols-outlined text-primary text-base fill-icon">
                      check_circle
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </main>
      </div>

      {/* Bottom Sticky Action Bar */}
      <footer className="w-full px-5 py-3 border-t border-outline-variant/20 bg-surface/90 backdrop-blur-md flex items-center justify-between gap-3 sticky bottom-0 z-30">
        <button
          type="button"
          disabled={currentIdx === 0}
          onClick={handlePrev}
          className="h-12 px-4 rounded-xl border border-outline-variant/50 text-xs font-semibold text-on-surface-variant hover:bg-surface-container disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>Prev</span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedAnswers[currentQ.id]}
          className="flex-1 h-12 rounded-xl bg-gradient-to-r from-primary-container to-primary text-white text-xs font-bold shadow-md shadow-primary/20 hover:brightness-105 active:scale-98 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
        >
          <span>{currentIdx === questions.length - 1 ? "Submit Quiz" : "Next Question"}</span>
          <span className="material-symbols-outlined text-sm">
            {currentIdx === questions.length - 1 ? "check_circle" : "arrow_forward"}
          </span>
        </button>
      </footer>
    </div>
  );
}

export default Quiz;
