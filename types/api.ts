export type ApiRequestState = 'idle' | 'loading' | 'success' | 'error';

export interface ApiError {
  type: 'network' | 'server' | 'notfound' | 'ratelimit' | 'invalid' | 'unknown';
  message: string;
  originalError?: Error;
  canRetry: boolean;
  suggestion?: string;
}