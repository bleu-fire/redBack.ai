import { ProtocolRule } from '@/data/learningData';

export function getProtocolParts(
  item: ProtocolRule | string
): { lead: string; detail: string } {
  if (typeof item === 'object' && item && 'lead' in item) {
    return { lead: item.lead, detail: item.detail || '' };
  }
  const str = String(item).replace(/^[•\-\*]\s*/, '').trim();
  const colonIdx = str.indexOf(':');
  if (colonIdx > 0 && colonIdx < 40) {
    return {
      lead: str.slice(0, colonIdx).trim(),
      detail: str.slice(colonIdx + 1).trim(),
    };
  }
  if (/^NEVER\s+/i.test(str)) {
    const after = str.replace(/^NEVER\s+/i, '');
    const parenIdx = after.indexOf('(');
    if (parenIdx > 0) {
      return {
        lead: `Never ${after.slice(0, parenIdx).trim()}`,
        detail: after.slice(parenIdx).replace(/[\(\)]/g, '').trim(),
      };
    }
    return { lead: `Never ${after}`, detail: '' };
  }
  return { lead: str, detail: '' };
}
