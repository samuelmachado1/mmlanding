import { AsyncLocalStorage } from 'node:async_hooks';

import type { ClippingsStore } from './types.js';

interface ApiRequestContext {
  oidcToken?: string;
  storeSnapshot?: ClippingsStore;
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

export function setStoreSnapshot(store: ClippingsStore): void {
  const ctx = storage.getStore();
  if (ctx) {
    ctx.storeSnapshot = store;
  }
}

export function getStoreSnapshot(): ClippingsStore | undefined {
  return storage.getStore()?.storeSnapshot;
}
