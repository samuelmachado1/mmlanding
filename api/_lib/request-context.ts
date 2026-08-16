import { AsyncLocalStorage } from 'node:async_hooks';

interface ApiRequestContext {
  oidcToken?: string;
}

const storage = new AsyncLocalStorage<ApiRequestContext>();

export function runWithApiContext<T>(
  context: ApiRequestContext,
  fn: () => T | Promise<T>,
): T | Promise<T> {
  return storage.run(context, fn);
}

export function getRequestOidcToken(): string | undefined {
  return storage.getStore()?.oidcToken;
}
