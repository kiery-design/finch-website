import type { ReactNode } from 'react';
import Icon from './Icon';

type Props = {
  children: ReactNode;
  /** 'public' shows to all visitors; 'dev' only appears in local development. */
  audience?: 'public' | 'dev';
  className?: string;
};

/**
 * A clearly styled notice for features that depend on an outside service
 * that isn't connected yet. Use it so visitors never think something works when it doesn't.
 */
export default function IntegrationNotice({ children, audience = 'public', className = '' }: Props) {
  if (audience === 'dev' && !import.meta.env.DEV) return null;
  return (
    <div
      className={`${className} flex gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed ${
        audience === 'dev'
          ? 'border-dashed border-finch-500 bg-finch-50 text-finch-700'
          : 'border-ink-300/60 bg-ink-50 text-ink-800'
      }`}
    >
      <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
      <div>
        {audience === 'dev' && <strong className="font-semibold">Dev note: </strong>}
        {children}
      </div>
    </div>
  );
}
