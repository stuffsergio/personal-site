import { describe, expect, it } from 'vitest';
import { selectRepresentation } from '../src/server/acceptNegotiation.js';

describe('selectRepresentation', () => {
  it('prefers markdown when Accept is text/markdown', () => {
    expect(selectRepresentation('text/markdown')).toBe('markdown');
  });

  it('prefers html for typical browser Accept', () => {
    expect(
      selectRepresentation('text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'),
    ).toBe('html');
  });

  it('respects q values', () => {
    expect(selectRepresentation('text/html;q=0.5, text/markdown;q=0.9')).toBe('markdown');
  });
});
