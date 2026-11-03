import {
  areas,
  challengeLead,
  questions,
  recommendationLibrary,
  stages,
  type Area,
  type AreaId,
  type ChallengeId,
  type Recommendation,
  type ScoredQuestion,
} from '../content/assessment';

export type Answers = Record<string, number | string | undefined>;

export type AreaResult = Area & {
  score: number;
  max: number;
  pct: number;
  level: 'Needs attention' | 'Developing' | 'Strong';
};

export type ServiceFit = {
  bookkeeping: 'cleanup' | 'monthly' | null;
  digitalTools: boolean;
};

export type AssessmentResult = {
  overallPct: number;
  stage: (typeof stages)[number];
  areaResults: AreaResult[];
  recommendations: Recommendation[];
  serviceFit: ServiceFit;
  challenge?: ChallengeId;
};

const scoredQuestions = questions.filter((q): q is ScoredQuestion => q.kind === 'scored');

/** Rules that decide when a recommendation applies. `a` maps question id → points. */
const triggers: Record<string, (a: Record<string, number>) => boolean> = {
  cleanup: (a) => a.current <= 1,
  catchupLight: (a) => a.current === 2,
  separate: (a) => a.separation <= 1,
  system: (a) => a.tracking <= 1,
  monthlyReview: (a) => a.reports <= 1 || a.profit <= 1,
  profitability: (a) => a.margins <= 1,
  invoicing: (a) => a.invoicing <= 1,
  documentation: (a) => a.processes <= 1,
  admin: (a) => a.admin <= 1,
  taxes: (a) => a.taxes <= 1,
  goals: (a) => a.goals <= 1,
  confidence: (a) => a.decisions <= 1,
};

/** Area each recommendation belongs to (for prioritizing the weakest areas). */
const recArea: Record<string, AreaId> = {
  cleanup: 'bookkeeping',
  catchupLight: 'bookkeeping',
  separate: 'bookkeeping',
  system: 'bookkeeping',
  monthlyReview: 'visibility',
  profitability: 'visibility',
  invoicing: 'systems',
  documentation: 'systems',
  admin: 'systems',
  taxes: 'planning',
  goals: 'planning',
  confidence: 'planning',
};

/** Question whose answer drives each recommendation (lower answer = more urgent). */
const recQuestion: Record<string, string> = {
  cleanup: 'current',
  catchupLight: 'current',
  separate: 'separation',
  system: 'tracking',
  monthlyReview: 'reports',
  profitability: 'margins',
  invoicing: 'invoicing',
  documentation: 'processes',
  admin: 'admin',
  taxes: 'taxes',
  goals: 'goals',
  confidence: 'decisions',
};

function levelFor(pct: number): AreaResult['level'] {
  if (pct < 40) return 'Needs attention';
  if (pct < 70) return 'Developing';
  return 'Strong';
}

export function isComplete(answers: Answers): boolean {
  return questions.every((q) => answers[q.id] !== undefined);
}

export function scoreAssessment(answers: Answers, maxRecommendations = 4): AssessmentResult {
  const points: Record<string, number> = {};
  for (const q of scoredQuestions) {
    const v = answers[q.id];
    points[q.id] = typeof v === 'number' ? v : 0;
  }

  const areaResults: AreaResult[] = areas.map((area) => {
    const qs = scoredQuestions.filter((q) => q.area === area.id);
    const max = qs.reduce((sum, q) => sum + Math.max(...q.options.map((o) => o.value)), 0);
    const score = qs.reduce((sum, q) => sum + points[q.id], 0);
    const pct = max === 0 ? 0 : Math.round((score / max) * 100);
    return { ...area, score, max, pct, level: levelFor(pct) };
  });

  const totalMax = areaResults.reduce((s, a) => s + a.max, 0);
  const totalScore = areaResults.reduce((s, a) => s + a.score, 0);
  const overallPct = totalMax === 0 ? 0 : Math.round((totalScore / totalMax) * 100);
  const stage = [...stages].reverse().find((s) => overallPct >= s.min) ?? stages[0];

  const areaPct = Object.fromEntries(areaResults.map((a) => [a.id, a.pct])) as Record<AreaId, number>;

  // 1. Every recommendation whose rule fires.
  const triggered = Object.keys(triggers).filter((id) => triggers[id](points));

  // 2. Weakest areas first; within an area, the lowest-scoring answer first.
  triggered.sort((x, y) => {
    const byArea = areaPct[recArea[x]] - areaPct[recArea[y]];
    if (byArea !== 0) return byArea;
    return points[recQuestion[x]] - points[recQuestion[y]];
  });

  // 3. Lead with the person's self-identified biggest challenge, if it applies.
  const challenge = answers.challenge as ChallengeId | undefined;
  const ordered: string[] = [];
  if (challenge) {
    let lead = challengeLead[challenge];
    if (lead === 'cleanup' && !triggered.includes('cleanup') && triggered.includes('catchupLight')) {
      lead = 'catchupLight';
    }
    if (triggered.includes(lead)) ordered.push(lead);
  }
  for (const id of triggered) if (!ordered.includes(id)) ordered.push(id);

  const recommendations = ordered.slice(0, maxRecommendations).map((id) => recommendationLibrary[id]);
  if (recommendations.length < 2) recommendations.push(recommendationLibrary.keepGoing);

  // 4. Which FINCH offerings may fit.
  let bookkeeping: ServiceFit['bookkeeping'] = null;
  if (points.current <= 1) bookkeeping = 'cleanup';
  else if (areaPct.bookkeeping < 70 || points.tracking <= 2 || challenge === 'taxes') bookkeeping = 'monthly';
  const digitalTools = areaPct.systems < 70 || areaPct.visibility < 70 || areaPct.planning < 70;

  return { overallPct, stage, areaResults, recommendations, serviceFit: { bookkeeping, digitalTools }, challenge };
}
