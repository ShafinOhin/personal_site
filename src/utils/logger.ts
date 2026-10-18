/**
 * Low-cardinality structured logger with stable message strings.
 * Provides consistent error handling and telemetry without noisy console output.
 */

type LogLevel = 'info' | 'warn' | 'error';

interface LogContext {
  component: string;
  action: string;
  detail?: string;
}

export function logEvent(level: LogLevel, message: string, context: LogContext): void {
  const payload = {
    timestamp: new Date().toISOString(),
    level,
    message,
    component: context.component,
    action: context.action,
    detail: context.detail ?? 'none',
  };

  if (level === 'error') {
    console.error('[ohin.me]', payload);
    return;
  }

  if (level === 'warn') {
    console.warn('[ohin.me]', payload);
    return;
  }

  if (import.meta.env.DEV) {
    console.info('[ohin.me]', payload);
  }
}
