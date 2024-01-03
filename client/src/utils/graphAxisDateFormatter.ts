const graphAxisDateFormatter = (date: Date) =>
  date
    .toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
    })
    .replace(' ', ', ');

export { graphAxisDateFormatter };
