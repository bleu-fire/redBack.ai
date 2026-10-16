import { aiService } from './ai.service';

describe('AIService - Formatting and Sanitization', () => {
  it('cleans messy delimiters and converts || and ~ to ++green highlight++ syntax', () => {
    const rawMessy = 'The spider has ||red longitudinal stripe|| on its abdomen and ~~mild venom~~.\n\n|||\n\n~';
    const cleaned = aiService.cleanAiReply(rawMessy);

    expect(cleaned).toContain('++red longitudinal stripe++');
    expect(cleaned).toContain('++mild venom++');
    expect(cleaned).not.toContain('||');
    expect(cleaned).not.toContain('~~');
  });

  it('normalizes multiple blank lines and preserves markdown structure', () => {
    const textWithBlankLines = '### Section 1\n\n\n\n- Point 1\n\n\n\n### Section 2';
    const cleaned = aiService.cleanAiReply(textWithBlankLines);

    expect(cleaned).toBe('### Section 1\n\n- Point 1\n\n### Section 2');
  });
});
