export const localDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-US', {
    timeZone: 'UTC'
  });
};
