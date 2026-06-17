import { auditHtml } from '../technical-audit';

const good = `<!doctype html><html lang="en"><head><title>Acme</title>
<meta name="viewport" content="width=device-width"></head>
<body><form></form></body></html>`;

describe('auditHtml', () => {
  it('passes a complete page with no issues and a perfect score', () => {
    expect(auditHtml(good)).toEqual({ score: 10, issues: [] });
  });
  it('flags a missing <title> and docks two points', () => {
    const result = auditHtml(good.replace('<title>Acme</title>', ''));
    expect(result.issues).toContain('missing <title>');
    expect(result.score).toBe(8);
  });
  it('flags all four signals on empty input (score floors via the formula)', () => {
    const result = auditHtml('');
    expect(result.issues).toHaveLength(4);
    expect(result.score).toBe(2); // 10 - (4 * 2)
  });
});
