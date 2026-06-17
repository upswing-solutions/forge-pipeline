import { tierFor } from '../synthesize-research';
import type { Scoring } from '../../../../types';

const flat = (n: number): Scoring => ({
  website_quality: n,
  social_proof: n,
  contact_confidence: n,
  market_opportunity: n,
  business_maturity: n,
  competitive_position: n,
});

describe('tierFor', () => {
  it('rates a strong prospect (avg >= 7) as tier 3', () => {
    expect(tierFor(flat(8))).toBe(3);
  });
  it('treats the exact boundary avg of 7 as tier 3', () => {
    expect(tierFor(flat(7))).toBe(3);
  });
  it('rates a mid prospect (4 <= avg < 7) as tier 2', () => {
    expect(tierFor(flat(5))).toBe(2);
  });
  it('rates a weak prospect (avg < 4) as tier 1', () => {
    expect(tierFor(flat(2))).toBe(1);
  });
  it('respects the reversed website_quality dimension in the average', () => {
    // No site (10) plus otherwise mediocre 4s averages to 5 -> tier 2.
    expect(
      tierFor({
        website_quality: 10,
        social_proof: 4,
        contact_confidence: 4,
        market_opportunity: 4,
        business_maturity: 4,
        competitive_position: 4,
      }),
    ).toBe(2);
  });
});
