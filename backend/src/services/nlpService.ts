/**
 * nlpService.ts
 * Local NLP engine using node-nlp (NLP.js).
 * NO external API calls — completely free and offline.
 */

import { NlpManager } from 'node-nlp';
import { findAnswerInKnowledgeBase } from './knowledgeBase';

const manager = new NlpManager({ languages: ['en'], forceNER: true, nlu: { log: false } });
let isTrained = false;

function trainNLP() {
  if (isTrained) return;

  // -- Greetings --
  manager.addDocument('en', 'hello', 'greeting');
  manager.addDocument('en', 'hi', 'greeting');
  manager.addDocument('en', 'hey', 'greeting');
  manager.addDocument('en', 'hi there', 'greeting');
  manager.addDocument('en', 'good morning', 'greeting');
  manager.addDocument('en', 'good evening', 'greeting');
  manager.addDocument('en', 'howdy', 'greeting');
  manager.addAnswer('en', 'greeting', "Hi there! ?? I'm your AI Tutor! I can help you with Mathematics, Physics, Chemistry, Biology, English, and Computer Science. What topic would you like to explore? ??");
  manager.addAnswer('en', 'greeting', "Hello! ?? Ask me anything about Maths, Physics, Chemistry, Biology, English, or Computer Science!");

  // -- Farewells --
  manager.addDocument('en', 'bye', 'farewell');
  manager.addDocument('en', 'goodbye', 'farewell');
  manager.addDocument('en', 'thank you', 'farewell');
  manager.addDocument('en', 'thanks', 'farewell');
  manager.addAnswer('en', 'farewell', "Great work today! ?? Keep studying and you'll ace your exams! See you soon!");
  manager.addAnswer('en', 'farewell', "You're welcome! ?? Come back anytime you need help. Happy learning!");

  // -- How are you --
  manager.addDocument('en', 'how are you', 'howAreYou');
  manager.addDocument('en', 'how are you doing', 'howAreYou');
  manager.addAnswer('en', 'howAreYou', "I'm doing great! ?? Always ready to help you learn. What subject are we tackling today?");

  // -- Quiz request --
  manager.addDocument('en', 'quiz me', 'quiz.request');
  manager.addDocument('en', 'give me a quiz', 'quiz.request');
  manager.addDocument('en', 'test me', 'quiz.request');
  manager.addDocument('en', 'ask me questions', 'quiz.request');
  manager.addDocument('en', 'i want to practice', 'quiz.request');
  manager.addDocument('en', 'give me practice questions', 'quiz.request');
  manager.addAnswer('en', 'quiz.request', "Love that energy! ?? Head over to the **Quizzes** section in the app to take a full quiz on any subject!");
  manager.addAnswer('en', 'quiz.request', "Quiz time! ?? Go to the **Quizzes** screen and pick your subject. You can generate quizzes and track your score!");

  // -- Motivation --
  manager.addDocument('en', 'i dont understand', 'motivation');
  manager.addDocument('en', 'i do not understand', 'motivation');
  manager.addDocument('en', 'i dont get it', 'motivation');
  manager.addDocument('en', 'this is hard', 'motivation');
  manager.addDocument('en', 'i am struggling', 'motivation');
  manager.addDocument('en', 'i give up', 'motivation');
  manager.addDocument('en', 'i cant do this', 'motivation');
  manager.addDocument('en', 'i am confused', 'motivation');
  manager.addDocument('en', 'help me i am stuck', 'motivation');
  manager.addDocument('en', 'this is confusing', 'motivation');
  manager.addAnswer('en', 'motivation', "Don't worry — every expert was once a beginner! ?? Tell me which topic is confusing you and I'll break it down step by step!");
  manager.addAnswer('en', 'motivation', "You've got this! ?? Tell me what's confusing you and I'll explain it in a completely new way that makes sense!");

  // -- Mathematics --
  manager.addDocument('en', 'explain mathematics', 'explain.maths');
  manager.addDocument('en', 'help with maths', 'explain.maths');
  manager.addDocument('en', 'what is algebra', 'explain.maths');
  manager.addDocument('en', 'what is calculus', 'explain.maths');
  manager.addDocument('en', 'what is trigonometry', 'explain.maths');
  manager.addDocument('en', 'what is a quadratic equation', 'explain.maths');
  manager.addDocument('en', 'explain quadratic', 'explain.maths');
  manager.addDocument('en', 'what is pythagoras', 'explain.maths');
  manager.addDocument('en', 'pythagorean theorem', 'explain.maths');
  manager.addDocument('en', 'what is derivative', 'explain.maths');
  manager.addDocument('en', 'what is integral', 'explain.maths');
  manager.addDocument('en', 'how to find area of circle', 'explain.maths');
  manager.addDocument('en', 'what is prime number', 'explain.maths');
  manager.addDocument('en', 'mean median mode', 'explain.maths');
  manager.addDocument('en', 'what is a fraction', 'explain.maths');
  manager.addDocument('en', 'sin cos tan', 'explain.maths');
  manager.addDocument('en', 'what is linear equation', 'explain.maths');
  manager.addDocument('en', 'maths question', 'explain.maths');
  manager.addDocument('en', 'math problem', 'explain.maths');
  manager.addAnswer('en', 'explain.maths', "?? Let me search our knowledge base for the answer...");

  // -- Physics --
  manager.addDocument('en', 'explain physics', 'explain.physics');
  manager.addDocument('en', 'help with physics', 'explain.physics');
  manager.addDocument('en', 'what is newtons law', 'explain.physics');
  manager.addDocument('en', 'what is gravity', 'explain.physics');
  manager.addDocument('en', 'what is force', 'explain.physics');
  manager.addDocument('en', 'what is kinetic energy', 'explain.physics');
  manager.addDocument('en', 'what is potential energy', 'explain.physics');
  manager.addDocument('en', 'what is ohms law', 'explain.physics');
  manager.addDocument('en', 'speed of light', 'explain.physics');
  manager.addDocument('en', 'what is refraction', 'explain.physics');
  manager.addDocument('en', 'what is thermodynamics', 'explain.physics');
  manager.addDocument('en', 'electric current and voltage', 'explain.physics');
  manager.addDocument('en', 'what is sound wave', 'explain.physics');
  manager.addDocument('en', 'physics question', 'explain.physics');
  manager.addAnswer('en', 'explain.physics', "? Let me look that up in our knowledge base for you...");

  // -- Chemistry --
  manager.addDocument('en', 'explain chemistry', 'explain.chemistry');
  manager.addDocument('en', 'help with chemistry', 'explain.chemistry');
  manager.addDocument('en', 'what is an atom', 'explain.chemistry');
  manager.addDocument('en', 'what is periodic table', 'explain.chemistry');
  manager.addDocument('en', 'what is chemical reaction', 'explain.chemistry');
  manager.addDocument('en', 'what is acid and base', 'explain.chemistry');
  manager.addDocument('en', 'what is ph scale', 'explain.chemistry');
  manager.addDocument('en', 'what is covalent bond', 'explain.chemistry');
  manager.addDocument('en', 'what is ionic bond', 'explain.chemistry');
  manager.addDocument('en', 'what is mole concept', 'explain.chemistry');
  manager.addDocument('en', 'balancing chemical equations', 'explain.chemistry');
  manager.addDocument('en', 'what is oxidation', 'explain.chemistry');
  manager.addDocument('en', 'what is water made of', 'explain.chemistry');
  manager.addDocument('en', 'states of matter', 'explain.chemistry');
  manager.addDocument('en', 'chemistry question', 'explain.chemistry');
  manager.addAnswer('en', 'explain.chemistry', "?? Let me find the answer from our knowledge base...");

  // -- Biology --
  manager.addDocument('en', 'explain biology', 'explain.biology');
  manager.addDocument('en', 'help with biology', 'explain.biology');
  manager.addDocument('en', 'what is a cell', 'explain.biology');
  manager.addDocument('en', 'what is dna', 'explain.biology');
  manager.addDocument('en', 'what is rna', 'explain.biology');
  manager.addDocument('en', 'what is photosynthesis', 'explain.biology');
  manager.addDocument('en', 'what is cellular respiration', 'explain.biology');
  manager.addDocument('en', 'what is mitosis', 'explain.biology');
  manager.addDocument('en', 'what is meiosis', 'explain.biology');
  manager.addDocument('en', 'what is an ecosystem', 'explain.biology');
  manager.addDocument('en', 'how does the heart work', 'explain.biology');
  manager.addDocument('en', 'what are enzymes', 'explain.biology');
  manager.addDocument('en', 'what is natural selection', 'explain.biology');
  manager.addDocument('en', 'what is evolution', 'explain.biology');
  manager.addDocument('en', 'what is the immune system', 'explain.biology');
  manager.addDocument('en', 'biology question', 'explain.biology');
  manager.addAnswer('en', 'explain.biology', "?? Let me search our knowledge base for the answer...");

  // -- English --
  manager.addDocument('en', 'explain english grammar', 'explain.english');
  manager.addDocument('en', 'help with english', 'explain.english');
  manager.addDocument('en', 'what is a noun', 'explain.english');
  manager.addDocument('en', 'what is a verb', 'explain.english');
  manager.addDocument('en', 'what is an adjective', 'explain.english');
  manager.addDocument('en', 'what is a metaphor', 'explain.english');
  manager.addDocument('en', 'what is a simile', 'explain.english');
  manager.addDocument('en', 'subject verb agreement', 'explain.english');
  manager.addDocument('en', 'what is active voice', 'explain.english');
  manager.addDocument('en', 'what is passive voice', 'explain.english');
  manager.addDocument('en', 'what is synonym', 'explain.english');
  manager.addDocument('en', 'what is antonym', 'explain.english');
  manager.addDocument('en', 'what is compound sentence', 'explain.english');
  manager.addDocument('en', 'essay structure', 'explain.english');
  manager.addDocument('en', 'what is tone and mood', 'explain.english');
  manager.addDocument('en', 'punctuation rules', 'explain.english');
  manager.addDocument('en', 'what is thesis statement', 'explain.english');
  manager.addDocument('en', 'english question', 'explain.english');
  manager.addDocument('en', 'grammar help', 'explain.english');
  manager.addAnswer('en', 'explain.english', "?? Let me find the answer from our knowledge base...");

  // -- Computer Science --
  manager.addDocument('en', 'explain computer science', 'explain.cs');
  manager.addDocument('en', 'help with coding', 'explain.cs');
  manager.addDocument('en', 'what is an algorithm', 'explain.cs');
  manager.addDocument('en', 'what is a variable', 'explain.cs');
  manager.addDocument('en', 'what is ram and rom', 'explain.cs');
  manager.addDocument('en', 'what is an operating system', 'explain.cs');
  manager.addDocument('en', 'what is html css javascript', 'explain.cs');
  manager.addDocument('en', 'what is ip address', 'explain.cs');
  manager.addDocument('en', 'what is database', 'explain.cs');
  manager.addDocument('en', 'what is sql', 'explain.cs');
  manager.addDocument('en', 'what is binary code', 'explain.cs');
  manager.addDocument('en', 'what is cpu and gpu', 'explain.cs');
  manager.addDocument('en', 'what is cloud computing', 'explain.cs');
  manager.addDocument('en', 'computer science question', 'explain.cs');
  manager.addDocument('en', 'programming question', 'explain.cs');
  manager.addDocument('en', 'coding question', 'explain.cs');
  manager.addDocument('en', 'what is oop', 'explain.cs');
  manager.addAnswer('en', 'explain.cs', "?? Let me look that up in our knowledge base for you...");

  // -- Study Tips --
  manager.addDocument('en', 'how to study better', 'study.tips');
  manager.addDocument('en', 'how to improve my memory', 'study.tips');
  manager.addDocument('en', 'how to prepare for exam', 'study.tips');
  manager.addDocument('en', 'how to manage time', 'study.tips');
  manager.addDocument('en', 'reduce exam stress', 'study.tips');
  manager.addDocument('en', 'what is pomodoro technique', 'study.tips');
  manager.addDocument('en', 'how to take notes', 'study.tips');
  manager.addDocument('en', 'how many hours to study', 'study.tips');
  manager.addDocument('en', 'how to stay focused', 'study.tips');
  manager.addDocument('en', 'study tips', 'study.tips');
  manager.addDocument('en', 'exam tips', 'study.tips');
  manager.addAnswer('en', 'study.tips', "?? Great study question! Let me find expert advice...");

  // -- Capabilities --
  manager.addDocument('en', 'what can you do', 'capabilities');
  manager.addDocument('en', 'what can you help with', 'capabilities');
  manager.addDocument('en', 'what subjects do you know', 'capabilities');
  manager.addDocument('en', 'what do you teach', 'capabilities');
  manager.addAnswer('en', 'capabilities', "I can help you with these subjects:\n\n• **Mathematics** — Algebra, Calculus, Trigonometry\n• **Physics** — Newton Laws, Electricity, Energy\n• **Chemistry** — Atoms, Reactions, pH Scale\n• **Biology** — Cells, DNA, Photosynthesis, Evolution\n• **English** — Grammar, Essay Writing, Literary Devices\n• **Computer Science** — Algorithms, HTML/CSS, Databases\n• **Study Tips** — Memory, Revision Techniques, Focus\n\nJust ask your question! ??");
}

// --- Public API -----------------------------------------------------------------

export async function initNLP(): Promise<void> {
  if (isTrained) return;
  trainNLP();
  await manager.train();
  isTrained = true;
  console.log('NLP.js model trained and ready (local, no API key needed)');
}

export async function processWithNLP(message: string): Promise<string> {
  if (!isTrained) {
    await initNLP();
  }

  const result = await manager.process('en', message);
  const intent = result.intent as string;
  const confidence = result.score as number;

  console.log(`NLP intent: "${intent}" | confidence: ${(confidence * 100).toFixed(1)}%`);

  // Low confidence — fall back to knowledge base keyword search
  if (!intent || intent === 'None' || confidence < 0.45) {
    return findAnswerInKnowledgeBase(message);
  }

  // Subject intents ? search knowledge base for real educational answer
  const kbIntents = ['explain.maths', 'explain.physics', 'explain.chemistry', 'explain.biology', 'explain.english', 'explain.cs', 'study.tips'];
  if (kbIntents.includes(intent)) {
    const kbAnswer = findAnswerInKnowledgeBase(message);
    if (!kbAnswer.includes('PLIS Knowledge Base Notice')) {
      return kbAnswer;
    }
    // KB did not find a match — give the NLP answer + subject guide
    return (result.answer as string || '') + '\n\n' + getSubjectGuide(intent);
  }

  // Conversational intents — return NLP answer directly
  if (result.answer) {
    return result.answer as string;
  }

  return findAnswerInKnowledgeBase(message);
}

function getSubjectGuide(intent: string): string {
  const guides: Record<string, string> = {
    'explain.maths': '**Try asking:**\n• "What is a quadratic equation?"\n• "Explain the Pythagorean theorem"\n• "What is sin, cos, tan?"\n• "What is mean, median, mode?"',
    'explain.physics': '**Try asking:**\n• "What is Newton Second Law?"\n• "What is Ohm Law?"\n• "What is kinetic energy?"\n• "What is the speed of light?"',
    'explain.chemistry': '**Try asking:**\n• "What is an atom?"\n• "What is the pH scale?"\n• "What is a covalent bond?"\n• "What is oxidation and reduction?"',
    'explain.biology': '**Try asking:**\n• "What is photosynthesis?"\n• "What is DNA?"\n• "What is mitosis vs meiosis?"\n• "How does the immune system work?"',
    'explain.english': '**Try asking:**\n• "What is a metaphor vs simile?"\n• "What is active voice vs passive voice?"\n• "What is essay structure?"\n• "What is subject verb agreement?"',
    'explain.cs': '**Try asking:**\n• "What is an algorithm?"\n• "What is RAM vs ROM?"\n• "What is SQL?"\n• "What is HTML, CSS, and JavaScript?"',
    'study.tips': '**Try asking:**\n• "How to improve my memory for exams?"\n• "What is the Pomodoro technique?"\n• "How to manage study time?"\n• "How to reduce exam stress?"',
  };
  return guides[intent] || '';
}
