const daysAgo = (dateString: string) => {
  // Parse the given date
  const date = new Date(dateString).getTime();
  const today = new Date().getTime();

  // Calculate the difference in milliseconds
  const difference = today - date;

  // Convert milliseconds to days
  const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));

  // Return a formatted string
  if (daysDifference === 0) {
    return 'today';
  } else if (daysDifference === 1) {
    return '1 day ago';
  } else {
    return `${daysDifference} days ago`;
  }
};

export { daysAgo };
