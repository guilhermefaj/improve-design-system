import type { Result } from 'axe-core';

export const documentedContrastException = {
  selector: '.ibs-button--primary',
  foreground: '#FFFFFF',
  background: '#F2703E',
  ratio: 2.93,
  reason: 'Decisão explícita de identidade para o CTA primário; texto permanece em negrito e o alvo possui 44 px.',
} as const;

export function unexpectedSeriousViolations(violations: Result[]) {
  return violations.filter((violation) => {
    if (!['critical', 'serious'].includes(violation.impact ?? '')) return false;
    if (violation.id !== 'color-contrast') return true;
    return violation.nodes.some(
      (node) => !node.target.every((target) => String(target).includes('ibs-button--primary')),
    );
  });
}
