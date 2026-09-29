import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

global.fetch = vi.fn();

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "0px";
  readonly thresholds: number[] = [];

  disconnect(): void {}

  observe(): void {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve(): void {}
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
