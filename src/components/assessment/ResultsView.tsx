import type { RefObject } from 'react';
import { Link } from 'react-router-dom';
import type { AssessmentResult } from '../../lib/assessment';
import { Button, ButtonLink } from '../Button';
import Icon from '../Icon';
import EmailSignup from './EmailSignup';

type Props = {
  result: AssessmentResult;
  onRestart: () => void;
  headingRef: RefObject<HTMLHeadingElement | null>;
};

const levelStyles = {
  'Needs attention': { bar: 'bg-finch-500', chip: 'bg-finch-100 text-finch-700' },
  Developing: { bar: 'bg-ink-500', chip: 'bg-cream-200 text-ink-800' },
  Strong: { bar: 'bg-ink-900', chip: 'bg-ink-100 text-ink-900' },
};

function ScoreRing({ pct }: { pct: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-36 w-36 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden="true">
        <circle cx="60" cy="60" r={r} fill="none" stroke="currentColor" strokeWidth="10" className="text-white/10" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (pct / 100) * c}
          className="text-finch-500 transition-[stroke-dashoffset] duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-4xl font-semibold text-cream-50">{pct}</span>
        <span className="text-xs text-cream-200/80">out of 100</span>
      </div>
    </div>
  );
}

export default function ResultsView({ result, onRestart, headingRef }: Props) {
  const { overallPct, stage, areaResults, recommendations, serviceFit } = result;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="overflow-hidden rounded-2xl bg-ink-900 p-7 text-cream-100 sm:p-10">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
          <ScoreRing pct={overallPct} />
          <div>
            <p className="eyebrow text-finch-300">Your clarity snapshot</p>
            <h2 ref={headingRef} tabIndex={-1} className="mt-2 text-3xl font-semibold text-cream-50 outline-none sm:text-4xl">
              {stage.name}
            </h2>
            <p className="mt-3 max-w-xl leading-relaxed text-cream-200/90">{stage.summary}</p>
            <p className="sr-only">Overall clarity score: {overallPct} out of 100.</p>
          </div>
        </div>
      </div>

      {/* Area breakdown */}
      <section className="card p-6 sm:p-8" aria-labelledby="areas-heading">
        <h3 id="areas-heading" className="text-xl font-semibold">
          Your four clarity areas
        </h3>
        <ul className="mt-6 space-y-6">
          {areaResults.map((a) => (
            <li key={a.id}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="font-semibold text-ink-900">{a.name}</p>
                  <p className="text-sm text-ink-600">{a.short}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${levelStyles[a.level].chip}`}>
                  {a.level} · {a.pct}%
                </span>
              </div>
              <div
                className="mt-2.5 h-2.5 overflow-hidden rounded-full bg-cream-200"
                role="img"
                aria-label={`${a.name}: ${a.pct} percent, ${a.level}`}
              >
                <div className={`h-full rounded-full ${levelStyles[a.level].bar}`} style={{ width: `${Math.max(a.pct, 3)}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Recommendations */}
      <section aria-labelledby="recs-heading">
        <h3 id="recs-heading" className="px-1 text-2xl font-semibold">
          Your recommended next steps
        </h3>
        <p className="mt-1 px-1 text-ink-600">Prioritized from your answers. Start with the first one.</p>
        <ol className="mt-5 space-y-4">
          {recommendations.map((rec, i) => (
            <li key={rec.id} className="card p-6 sm:p-8">
              <div className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-finch-500 font-display font-semibold text-ink-950">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  <h4 className="font-display text-xl font-semibold">{rec.title}</h4>
                  <p className="mt-2 leading-relaxed text-ink-700">{rec.why}</p>
                  <ul className="mt-4 space-y-2">
                    {rec.steps.map((s) => (
                      <li key={s} className="flex gap-2.5 text-ink-800">
                        <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-finch-600" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                  {rec.cta && (
                    <Link
                      to={rec.cta.to}
                      className="no-print mt-5 inline-flex items-center gap-1.5 font-semibold text-finch-700 underline-offset-4 hover:underline"
                    >
                      {rec.cta.label}
                      <Icon name="arrowRight" className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* How FINCH can help */}
      {(serviceFit.bookkeeping || serviceFit.digitalTools) && (
        <section className="no-print rounded-2xl bg-cream-100 p-6 sm:p-8" aria-labelledby="help-heading">
          <h3 id="help-heading" className="text-xl font-semibold">
            Where FINCH could help
          </h3>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {serviceFit.bookkeeping && (
              <div className="rounded-xl bg-white p-5 shadow-card">
                <p className="font-semibold">
                  {serviceFit.bookkeeping === 'cleanup' ? 'Cleanup & catch-up bookkeeping' : 'Monthly bookkeeping'}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
                  {serviceFit.bookkeeping === 'cleanup'
                    ? 'Get your books accurate and current, then build from a clean starting point.'
                    : 'Keep your books consistently current so your reports are always ready when you need them.'}
                </p>
                <ButtonLink to="/contact?topic=bookkeeping" variant="primary" className="mt-4 w-full !text-sm">
                  Request a consultation
                </ButtonLink>
              </div>
            )}
            {serviceFit.digitalTools && (
              <div className="rounded-xl bg-white p-5 shadow-card">
                <p className="font-semibold">FINCH digital tools</p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
                  Dashboards, Notion systems, and financial tools for building clarity on your own schedule.
                </p>
                <ButtonLink to="/shop" variant="secondary" className="mt-4 w-full !text-sm">
                  Browse the digital shop
                </ButtonLink>
              </div>
            )}
          </div>
        </section>
      )}

      <EmailSignup />

      <div className="no-print flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button variant="secondary" onClick={() => window.print()}>
          <Icon name="printer" className="h-4 w-4" />
          Print or save as PDF
        </Button>
        <Button variant="ghost" onClick={onRestart}>
          <Icon name="refresh" className="h-4 w-4" />
          Retake the assessment
        </Button>
      </div>

      <p className="text-center text-xs leading-relaxed text-ink-600">
        This assessment is a general self-check for educational purposes. It is not financial, tax, or legal advice.
      </p>
    </div>
  );
}
