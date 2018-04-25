import hexToRgba = require('hex-rgba');

export const GRADIENTS = [{
  1: 'FED5CB',
  2: 'FF6B6B'
}, {
  1: 'CDF9F0',
  2: '0291CC'
}, {
  1: 'CDF9E4',
  2: '35D29F'
}, {
  1: 'EB5757',
  2: '1F1C18'
}, {
  1: '44A08D',
  2: '093637'
}, {
  1: '4B7D96',
  2: '16222A'
}];

export function getGradient(index: number, deg: number = 225): string {
  if (index < 0 || index > GRADIENTS.length) {
    index = 0;
  }
  const GRADIENT = GRADIENTS[index];
  const COLOR1 = hexToRgba(GRADIENT['1'], 75);
  const COLOR2 = hexToRgba(GRADIENT['2'], 95);
  return `linear-gradient(${deg}deg, ${COLOR1} 0%, ${COLOR2} 100%)`;
}





