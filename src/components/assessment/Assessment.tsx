import { useEffect, useRef, useState } from 'react';
import { questions } from '../../content/assessment';
import { isComplete, scoreAssessment, type Answers } from '../../lib/assessment';
import { Button } from '../Button';
import Icon from '../Icon';
import ResultsView from './ResultsView';

const STORAGE_KEY = 'finch-clarity-assessment-v1';

type Saved = { answers: Answers; step: number; finished: boolean };

function load(): Saved | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}

function save(state: Saved | null) {
  try {
    if (state) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    else sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable (private mode etc.). The assessment still works, it just won't resume. */
  }
}

/**
 * Business Clarity Assessment
 * Runs entirely in the browser. No data is sent anywhere.
 * Progress is kept in sessionStorage so a refresh doesn't lose answers.
 */
export default function Assessment() {
  const saved = useRef(load()).current;
  const [started, setStarted] = useState(Boolean(saved));
  const [step, setStep] = useState(saved?.step ?? 0);
  const [answers, setAnswers] = useState<Answers>(saved?.answers ?? {});
  const [finished, setFinished] = useState(saved?.finished ?? false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const hasInteracted = useRef(false);

  const total = questions.length;
  const question = questions[step];
  const current = answers[question.id];
  const progress = Math.round(((finished ? total : step) / total) * 100);

  useEffect(() => {
    if (started) save({ answers, step, finished });
  }, [answers, step, finished, started]);

  // Move focus to the question (or results) when the view changes, for keyboard and screen-reader users.
  useEffect(() => {
    if (!hasInteracted.current) return;
    headingRef.current?.focus({ preventScroll: true });
    const top = topRef.current?.getBoundingClientRect().top ?? 0;
    if (top < 0 || top > window.innerHeight * 0.4) {
      topRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, [step, finished, started]);

  const begin = () => {
    hasInteracted.current = true;
    setStarted(true);
  };

  const choose = (value: number | string) => {
    setAnswers((a) => ({ ...a, [question.id]: value }));
  };

  const next = () => {
    hasInteracted.current = true;
    if (step < total - 1) setStep(step + 1);
    else if (isComplete(answers)) setFinished(true);
  };

  const back = () => {
    hasInteracted.current = true;
    if (step > 0) setStep(step - 1);
  };

  const restart = () => {
    hasInteracted.current = true;
    setAnswers({});
    setStep(0);
    setFinished(false);
    setStarted(true);
    save(null);
  };

  return (
    <div ref={topRef} className="scroll-mt-24">
      {!started ? (
        <div className="card p-7 text-center sm:p-12">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-finch-100 text-finch-700">
            <Icon name="compass" className="h-7 w-7" />
          </span>
          <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">Business Clarity Assessment</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-700">
            Answer {total} quick questions about your finances, bookkeeping habits, and operations. You'll get a clarity
            score across four areas and personalized next steps.
          </p>
          <ul className="mx-auto mt-6 flex max-w-lg flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink-700">
            <li className="flex items-center gap-1.5"><Icon name="clock" className="h-4 w-4 text-finch-600" /> About 3 minutes</li>
            <li className="flex items-center gap-1.5"><Icon name="shield" className="h-4 w-4 text-finch-600" /> No email required</li>
            <li className="flex items-center gap-1.5"><Icon name="check" className="h-4 w-4 text-finch-600" /> Answers stay on your device</li>
          </ul>
          <Button variant="primary" className="mt-8" onClick={begin}>
            Start the assessment
            <Icon name="arrowRight" className="h-4 w-4" />
          </Button>
        </div>
      ) : finished ? (
        <ResultsView result={scoreAssessment(answers)} onRestart={restart} headingRef={headingRef} />
      ) : (
        <div className="card overflow-hidden">
          <div className="border-b border-cream-200 px-5 pt-5 pb-4 sm:px-8">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-ink-800">
                Question {step + 1} of {total}
              </span>
              <span className="text-ink-600">{progress}% complete</span>
            </div>
            <div
              className="mt-3 h-2 overflow-hidden rounded-full bg-cream-200"
              role="progressbar"
              aria-label="Assessment progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div className="h-full rounded-full bg-finch-500 transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <form
            className="px-5 py-7 sm:px-8 sm:py-9"
            onSubmit={(e) => {
              e.preventDefault();
              if (current !== undefined) next();
            }}
          >
            <fieldset>
              <legend className="w-full">
                <h2 ref={headingRef} tabIndex={-1} className="text-2xl leading-snug font-semibold outline-none sm:text-[1.75rem]">
                  {question.prompt}
                </h2>
                {question.help && <p className="mt-2 text-ink-600">{question.help}</p>}
              </legend>

              <div className="mt-6 grid gap-3">
                {question.options.map((opt, i) => {
                  const id = `${question.id}-${i}`;
                  const checked = current === opt.value;
                  return (
                    <label
                      key={id}
                      htmlFor={id}
                      className={`flex min-h-14 cursor-pointer items-center gap-4 rounded-xl border-2 px-4 py-3.5 transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-finch-600 ${
                        checked ? 'border-ink-900 bg-ink-50' : 'border-cream-300 bg-white hover:border-ink-300'
                      }`}
                    >
                      <input
                        id={id}
                        type="radio"
                        name={question.id}
                        value={String(opt.value)}
                        checked={checked}
                        onChange={() => choose(opt.value)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          checked ? 'border-ink-900 bg-ink-900' : 'border-ink-300'
                        }`}
                      >
                        {checked && <span className="h-2 w-2 rounded-full bg-cream-50" />}
                      </span>
                      <span className="text-[1.02rem] leading-snug text-ink-900">{opt.label}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-8 flex items-center justify-between gap-3">
              <Button variant="ghost" onClick={back} disabled={step === 0} className={step === 0 ? 'invisible' : ''}>
                <Icon name="arrowLeft" className="h-4 w-4" />
                Back
              </Button>
              <Button type="submit" variant="primary" disabled={current === undefined}>
                {step === total - 1 ? 'See my results' : 'Next'}
                <Icon name="arrowRight" className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
