import { QuestionnaireAnswers } from '@/types/questionnaire';

/** 新类型结构 */
export interface AlgorithmType {
  code: string;
  name: string;
  emoji: string;
  description: string;
  strengths: string[];
  challenges: string[];
  bestMatch: string;
}

/** 你提供的类型库 */
export const algorithmTypes: Record<string, AlgorithmType> = {
  "DL-01": {
    code: "DL-01",
    name: "The Analyst",
    emoji: "💻",
    description:
      "Rational, structured, and calm under pressure. You plan carefully, communicate clearly, and prefer sustainable growth over drama.",
    strengths: [
      "Consistent follow-through and reliability",
      "Clear communication and realistic expectations",
      "Long-term thinking and steady improvement"
    ],
    challenges: [
      "May overanalyze instead of feeling in the moment",
      "Slow to act on intuition",
      "Can treat emotions like KPIs"
    ],
    bestMatch:
      "QA-07 (The Intuitive) or PM-02 (The Empath) — partners who soften logic with warmth and instinct"
  },
  "PM-02": {
    code: "PM-02",
    name: "The Empath",
    emoji: "💞",
    description:
      "Intuitive and emotionally fluent. You read the room, notice micro-signals, and create psychological safety in relationships.",
    strengths: [
      "High emotional awareness and active listening",
      "De-escalates conflict with care",
      "Makes others feel seen and understood"
    ],
    challenges: [
      "May absorb others’ emotions and forget your own needs",
      "Can avoid necessary confrontation",
      "Boundaries blur when keeping the peace"
    ],
    bestMatch:
      "FD-03 (The Protector) or CO-08 (The Leader) — grounding and structure that amplify your warmth"
  },
  "FD-03": {
    code: "FD-03",
    name: "The Protector",
    emoji: "🛡️",
    description:
      "Grounded, loyal, and steady. You build trust slowly and show love through dependable actions. Safety is your love language.",
    strengths: [
      "Reliable and committed once you choose",
      "Creates a calm, secure environment",
      "Strong boundaries and respect for commitments"
    ],
    challenges: [
      "Takes time to open up emotionally",
      "Can tilt into over-protectiveness",
      "Caution may lead to missed chances"
    ],
    bestMatch:
      "PM-02 (The Empath) or RG-06 (The Spark) — warmth or playfulness that complements your steadiness"
  },
  "OS-04": {
    code: "OS-04",
    name: "The Visionary",
    emoji: "🌙",
    description:
      "Creative, idealistic, and expressive. You seek meaning and beauty, turning ordinary moments into memorable stories.",
    strengths: [
      "Inspires optimism and possibility",
      "Creates meaningful, poetic experiences",
      "Emotionally open and authentic"
    ],
    challenges: [
      "May idealize and overlook red flags",
      "Routine logistics can feel draining",
      "Needs grounding during high emotion"
    ],
    bestMatch:
      "DL-01 (The Analyst) or FD-03 (The Protector) — partners who turn vision into reality and offer stability"
  },
  "SD-05": {
    code: "SD-05",
    name: "The Observer",
    emoji: "📡",
    description:
      "Perceptive and thoughtful. You pick up subtle cues others miss and prefer respectful, direct conversation to reach the real feelings.",
    strengths: [
      "Reads context and unspoken needs well",
      "Navigates complex emotions with nuance",
      "Strong non-verbal communication"
    ],
    challenges: [
      "May over-interpret mixed signals",
      "Sometimes assumes instead of asking",
      "Can get stuck analyzing tone/subtext"
    ],
    bestMatch:
      "FD-03 (The Protector) or CO-08 (The Leader) — clarity and structure that reduce ambiguity"
  },
  "RG-06": {
    code: "RG-06",
    name: "The Spark",
    emoji: "⚡",
    description:
      "Energetic, curious, and spontaneous. You light up rooms and keep relationships fresh with novelty and shared adventures.",
    strengths: [
      "Brings playfulness and momentum",
      "Creative with dates and surprises",
      "Open to change and growth"
    ],
    challenges: [
      "Routine and long timelines can feel heavy",
      "May avoid slower, deeper conversations",
      "Needs consistency to build trust"
    ],
    bestMatch:
      "FD-03 (The Protector) or PM-02 (The Empath) — partners who balance your energy with calm or warmth"
  },
  "QA-07": {
    code: "QA-07",
    name: "The Intuitive",
    emoji: "✨",
    description:
      "Romantic realist with strong gut sense. You follow vibes, trust chemistry, and bring magic to everyday connection.",
    strengths: [
      "Accurate intuition about people and timing",
      "Turns shared time into memorable moments",
      "Keeps the relationship emotionally alive"
    ],
    challenges: [
      "Idealism can ignore practical issues",
      "Hard to stay grounded during conflict",
      "Needs clearer routines and boundaries"
    ],
    bestMatch:
      "DL-01 (The Analyst) or SD-05 (The Observer) — partners who ground instinct with clarity"
  },
  "CO-08": {
    code: "CO-08",
    name: "The Leader",
    emoji: "👑",
    description:
      "Decisive, confident, and intentional. You set direction, communicate clearly, and prefer partners who show up as fully as you do.",
    strengths: [
      "States needs and boundaries directly",
      "Takes initiative and follows through",
      "Creates structure that helps love grow"
    ],
    challenges: [
      "May come across as controlling",
      "Vulnerability can feel uncomfortable",
      "Needs practice sharing the steering wheel"
    ],
    bestMatch:
      "RG-06 (The Spark) or PM-02 (The Empath) — playfulness or emotional depth that complements your drive"
  }
};

/** 旧8类 → 新代码 的映射（已区分 adventurer 与 freeSpirit） */
const OLD_TO_NEW_CODE: Record<
  'intuitive' | 'analyst' | 'observer' | 'adventurer' | 'nurturer' | 'freeSpirit' | 'builder' | 'creative',
  keyof typeof algorithmTypes
> = {
  intuitive: 'QA-07',   // The Intuitive ✨
  analyst: 'DL-01',     // The Analyst 💻
  observer: 'SD-05',    // The Observer 📡
  adventurer: 'CO-08',  // ✅ The Leader 👑（行动/探索导向）
  nurturer: 'PM-02',    // The Empath 💞
  freeSpirit: 'RG-06',  // ✅ The Spark ⚡（自由/轻盈/趣味）
  builder: 'FD-03',     // The Protector 🛡️
  creative: 'OS-04',    // The Visionary 🌙
};

/** 计算：保留原计分逻辑，只在末尾映射到新类型 */
export function calculatePersonalityType(answers: QuestionnaireAnswers): AlgorithmType {
  const scores: Record<string, number> = {
    intuitive: 0,
    analyst: 0,
    observer: 0,
    adventurer: 0,
    nurturer: 0,
    freeSpirit: 0,
    builder: 0,
    creative: 0,
  };

  // Weekend energy
  if (answers.weekend_energy === 'a') scores.observer += 2; // home
  if (answers.weekend_energy === 'b') scores.adventurer += 2; // go out
  if (answers.weekend_energy === 'c') scores.nurturer += 2; // social
  if (answers.weekend_energy === 'd') { scores.adventurer += 1; scores.freeSpirit += 1; } // nature

  // Low-effort date
  if (answers.low_effort_date === 'a') { scores.observer += 1; scores.intuitive += 1; } // coffee & walk
  if (answers.low_effort_date === 'b') scores.nurturer += 2; // cook at home
  if (answers.low_effort_date === 'c') scores.freeSpirit += 2; // drinks/games
  if (answers.low_effort_date === 'd') scores.creative += 2; // museum/bookstore

  // Early stage style
  if (answers.early_stage_style === 'a') scores.analyst += 2; // observe patterns
  if (answers.early_stage_style === 'b') scores.nurturer += 2; // dive in emotionally
  if (answers.early_stage_style === 'c') scores.freeSpirit += 2; // keep it light
  if (answers.early_stage_style === 'd') scores.observer += 2; // build trust slowly

  // Conflict style
  if (answers.conflict_style === 'a') scores.analyst += 2; // analyze
  if (answers.conflict_style === 'b') scores.nurturer += 2; // honest talk
  if (answers.conflict_style === 'c') scores.creative += 2; // shift creatively
  if (answers.conflict_style === 'd') { scores.observer += 1; scores.builder += 1; } // set boundaries

  // Focus next 2–3 years
  if (answers.focus_next_2_3_years === 'a') scores.builder += 2; // stable relationship
  if (answers.focus_next_2_3_years === 'b') { scores.analyst += 1; scores.builder += 1; } // career/startup
  if (answers.focus_next_2_3_years === 'c') { scores.adventurer += 2; scores.freeSpirit += 1; } // travel/freedom
  if (answers.focus_next_2_3_years === 'd') { scores.creative += 1; scores.observer += 1; } // growth/education
  if (answers.focus_next_2_3_years === 'e') scores.nurturer += 2; // family

  // Dating goal
  if (answers.dating_goal === 'Long-term') { scores.builder += 1; scores.nurturer += 1; }
  if (answers.dating_goal === 'Casual') scores.freeSpirit += 2;
  if (answers.dating_goal === 'Friends→maybe more') { scores.observer += 1; scores.freeSpirit += 1; }
  if (answers.dating_goal === 'Just friends') scores.freeSpirit += 1;
  if (answers.dating_goal === 'Not sure') scores.intuitive += 1;

  // 平衡型补偿：多顶分者给 intuitive +1（原逻辑保留）
  const maxScore = Math.max(...Object.values(scores));
  const topScorers = Object.keys(scores).filter(k => scores[k] === maxScore);
  if (topScorers.length > 2) {
    scores.intuitive += 1;
  }

  // 取最高分旧类型并映射到新代码
  const [topOldType] = Object.entries(scores).reduce((a, b) => (b[1] > a[1] ? b : a));
  const code = OLD_TO_NEW_CODE[topOldType as keyof typeof OLD_TO_NEW_CODE] ?? 'QA-07';
  return algorithmTypes[code];
}
