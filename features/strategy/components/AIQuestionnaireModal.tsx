'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, ChevronLeft, Sparkles, Loader2 } from 'lucide-react';
import { RiskLevel } from '@/types';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    score: number; // Lower score = conservative, Higher = aggressive
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'What is your primary investment goal?',
    options: [
      { text: 'Capital preservation with minimal risk', score: 1 },
      { text: 'Steady growth with moderate risk', score: 2 },
      { text: 'Maximum returns, willing to accept high volatility', score: 3 },
    ],
  },
  {
    id: 2,
    question: 'What is your investment time horizon?',
    options: [
      { text: 'Short-term (less than 1 year)', score: 1 },
      { text: 'Medium-term (1-3 years)', score: 2 },
      { text: 'Long-term (3+ years)', score: 3 },
    ],
  },
  {
    id: 3,
    question: 'How would you react to a 20% portfolio decline?',
    options: [
      { text: 'Withdraw immediately to prevent further losses', score: 1 },
      { text: 'Hold and wait for recovery', score: 2 },
      { text: 'Invest more to buy the dip', score: 3 },
    ],
  },
  {
    id: 4,
    question: 'What is your experience with DeFi protocols?',
    options: [
      { text: 'Beginner - New to DeFi', score: 1 },
      { text: 'Intermediate - Some experience', score: 2 },
      { text: 'Advanced - Very experienced', score: 3 },
    ],
  },
  {
    id: 5,
    question: 'What percentage of your portfolio are you allocating to DeFi?',
    options: [
      { text: 'Less than 10% - Small allocation', score: 1 },
      { text: '10-30% - Moderate allocation', score: 2 },
      { text: 'More than 30% - Significant allocation', score: 3 },
    ],
  },
];

interface AIQuestionnaireModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (riskLevel: RiskLevel) => void;
}

export function AIQuestionnaireModal({ isOpen, onClose, onComplete }: AIQuestionnaireModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    riskLevel: RiskLevel;
    reasoning: string;
  } | null>(null);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // All questions answered, analyze
      analyzeAnswers(newAnswers);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  const analyzeAnswers = async (allAnswers: number[]) => {
    setIsAnalyzing(true);

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Calculate average score
    const avgScore = allAnswers.reduce((sum, score) => sum + score, 0) / allAnswers.length;

    let riskLevel: RiskLevel;
    let reasoning: string;

    if (avgScore <= 1.6) {
      riskLevel = 'conservative';
      reasoning = `Based on your responses, a Conservative strategy is recommended. Your preference for capital preservation, shorter time horizon, and cautious approach to market volatility indicate that you value stability over high returns. You're likely new to DeFi or prefer to allocate a smaller portion of your portfolio, which aligns perfectly with low-risk protocols. This strategy focuses on established, audited protocols like Aave and Lido with predictable yields of 5-8% APY, minimizing exposure to smart contract risks and market volatility.`;
    } else if (avgScore <= 2.3) {
      riskLevel = 'balanced';
      reasoning = `Based on your responses, a Balanced strategy is recommended. You demonstrate a moderate risk tolerance with goals for steady growth while accepting some volatility. Your medium-term investment horizon and intermediate DeFi experience suggest you're comfortable with a diversified approach. This strategy combines stable lending protocols with moderate-yield opportunities, targeting 8-15% APY. You'll benefit from exposure to both blue-chip protocols and promising mid-tier platforms, balancing security with growth potential across multiple DeFi sectors.`;
    } else {
      riskLevel = 'aggressive';
      reasoning = `Based on your responses, an Aggressive strategy is recommended. Your willingness to embrace volatility for maximum returns, long-term investment horizon, and advanced DeFi knowledge position you perfectly for high-yield opportunities. You're prepared to weather significant market swings and see them as buying opportunities. This strategy targets 15-30%+ APY through emerging protocols, leveraged yield farming, and innovative DeFi primitives. While risks are higher, your substantial portfolio allocation and experience enable you to capitalize on the most lucrative opportunities in the DeFi ecosystem.`;
    }

    setResult({ riskLevel, reasoning });
    setIsAnalyzing(false);
  };

  const handleComplete = () => {
    if (result) {
      onComplete(result.riskLevel);
      handleClose();
    }
  };

  const handleClose = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
    setIsAnalyzing(false);
    onClose();
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="relative p-6 border-b border-zinc-800 bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-indigo-500/20">
                    <Sparkles className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">AI Risk Assessment</h2>
                </div>
                <p className="text-zinc-400">
                  Answer 5 questions to get a personalized strategy recommendation
                </p>

                {/* Progress Bar */}
                {!result && !isAnalyzing && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-zinc-400 mb-2">
                      <span>Question {currentQuestion + 1} of {questions.length}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {!result && !isAnalyzing && (
                    <motion.div
                      key={currentQuestion}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold text-white">
                        {questions[currentQuestion].question}
                      </h3>

                      <div className="space-y-3">
                        {questions[currentQuestion].options.map((option, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAnswer(option.score)}
                            className="w-full p-4 rounded-xl bg-zinc-800 border border-zinc-700 hover:border-indigo-500 text-left transition-all group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-white font-medium">{option.text}</span>
                              <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                            </div>
                          </motion.button>
                        ))}
                      </div>

                      {/* Back Button */}
                      {currentQuestion > 0 && (
                        <button
                          onClick={handleBack}
                          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          Back to previous question
                        </button>
                      )}
                    </motion.div>
                  )}

                  {isAnalyzing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-12 text-center"
                    >
                      <Loader2 className="w-12 h-12 text-indigo-400 animate-spin mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-white mb-2">
                        Analyzing Your Risk Profile
                      </h3>
                      <p className="text-zinc-400">
                        AI is processing your answers to determine the optimal strategy...
                      </p>
                    </motion.div>
                  )}

                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-6"
                    >
                      {/* Result Badge */}
                      <div className="text-center">
                        <div
                          className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                            result.riskLevel === 'conservative'
                              ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                              : result.riskLevel === 'balanced'
                              ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                              : 'bg-gradient-to-br from-orange-500 to-red-600'
                          }`}
                        >
                          <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {result.riskLevel.charAt(0).toUpperCase() + result.riskLevel.slice(1)}{' '}
                          Strategy
                        </h3>
                        <p className="text-sm text-zinc-400">Recommended for you</p>
                      </div>

                      {/* Reasoning */}
                      <div className="p-6 rounded-xl bg-zinc-800 border border-zinc-700">
                        <h4 className="text-lg font-semibold text-white mb-3">
                          Why this strategy fits you:
                        </h4>
                        <p className="text-zinc-300 leading-relaxed">{result.reasoning}</p>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={handleComplete}
                        className="w-full p-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold transition-all flex items-center justify-center gap-2"
                      >
                        Apply {result.riskLevel.charAt(0).toUpperCase() + result.riskLevel.slice(1)}{' '}
                        Strategy
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
