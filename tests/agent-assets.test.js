import { describe, expect, it, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

const dist = join(process.cwd(), 'dist');

beforeAll(() => {
  if (!existsSync(join(dist, 'index.html'))) {
    execSync('npm run build', { stdio: 'inherit' });
  }
});

function readDist(file) {
  return readFileSync(join(dist, file), 'utf8');
}

describe('prerendered HTML', () => {
  const routes = ['index.html', 'about/index.html', 'contact/index.html', 'privacy/index.html'];

  for (const file of routes) {
    it(`${file} has single H1 and >=500 chars visible text`, () => {
      const html = readDist(file);
      const h1 = html.match(/<h1[^>]*>/gi) || [];
      expect(h1.length).toBeGreaterThanOrEqual(1);
      const text = html
        .replace(/<script[\s\S]*?<\/script>/gi, '')
        .replace(/<style[\s\S]*?<\/style>/gi, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      expect(text.length).toBeGreaterThanOrEqual(500);
    });
  }
});

describe('JSON-LD on home', () => {
  it('parses Person and WebSite', () => {
    const html = readDist('index.html');
    const m = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    expect(m).toBeTruthy();
    const graph = JSON.parse(m[1]);
    expect(Array.isArray(graph)).toBe(true);
    const types = graph.map((n) => n['@type']);
    expect(types).toContain('Person');
    expect(types).toContain('WebSite');
    expect(types).toContain('ProfessionalService');
    const person = graph.find((n) => n['@type'] === 'Person');
    expect(person.email).toContain('sergioperezmontalvo@gmail.com');
    expect(person.address.addressCountry).toBe('ES');
    const org = graph.find((n) => n['@type'] === 'ProfessionalService');
    expect(org.contactPoint.email).toBe('sergioperezmontalvo@gmail.com');
  });
});

describe('llms.txt', () => {
  it('follows llmstxt.org structure', () => {
    const txt = readDist('llms.txt');
    expect(txt.startsWith('# ')).toBe(true);
    expect(txt).toMatch(/^> /m);
    expect(txt).toMatch(/## Cuándo usar/);
    expect(txt).toMatch(/index\.md/);
  });
});

describe('sitemap.xml', () => {
  it('lists indexable routes', () => {
    const xml = readDist('sitemap.xml');
    expect(xml).toMatch(/<\?xml/);
    expect(xml).toContain('https://sergio-dev.com/');
    expect(xml).toContain('/about');
    expect(xml).toContain('/privacy');
    expect(xml).toContain('<lastmod>');
  });
});

describe('markdown artifacts', () => {
  it('index.md and about.md are non-empty', () => {
    expect(readDist('index.md').length).toBeGreaterThan(100);
    expect(readDist('about.md').length).toBeGreaterThan(100);
  });
});

describe('robots.txt', () => {
  it('references sitemap and allows GPTBot', () => {
    const robots = readDist('robots.txt');
    expect(robots).toContain('Sitemap: https://sergio-dev.com/sitemap.xml');
    expect(robots).toMatch(/GPTBot/);
  });
});
