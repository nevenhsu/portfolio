import hexToRgba = require('hex-rgba');

export const GRADIENTS = [{
  1: 'FED5CB',
  2: 'FF6B6B'
}, {
  1: 'CDF9E4',
  2: '35D29F'
}, {
  1: 'B5EBF7',
  2: '0291CC'
}];

export function getGradient(index: number): string {
  if (index < 0 || index > GRADIENTS.length) {
    index = 0;
  }
  const GRADIENT = GRADIENTS[index];
  const COLOR1 = hexToRgba(GRADIENT['1'], 75);
  const COLOR2 = hexToRgba(GRADIENT['2'], 95);
  return `linear-gradient(225deg, ${COLOR1} 0%, ${COLOR2} 100%)`;
}

export function  randomGradient(): string {
  const RANDOM = Math.floor(Math.random() * 3);
  return getGradient(RANDOM);
}
