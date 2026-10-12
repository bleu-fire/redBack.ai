export function getSeasonalBadgeStyle(badgeText?: string): { bg: string; color: string } {
  if (badgeText === 'Deadly' || badgeText === 'Venomous') {
    return { bg: '#FEECE9', color: '#D9383A' };
  }
  if (badgeText === 'Danger') {
    return { bg: '#EAF7EE', color: '#28813C' };
  }
  if (badgeText === 'Protected' || badgeText === 'Rare') {
    return { bg: '#FEF3C7', color: '#B45309' };
  }
  return { bg: '#EAF7EE', color: '#28813C' };
}
