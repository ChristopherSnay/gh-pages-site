export const getRandomHue = (id: number | string, title: string, salt = 'v1') => {
  const input = `${id}-${title}-${salt}`;
  let hash = 2166136261;

  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return `${Math.abs(hash % 360)}deg`;
};
