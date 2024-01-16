export const calculatePercentage = (correct: number, total: number) => {
  if (total === 0) {
    return "0%";
  }

  const percentage = (correct / total) * 100;
  return percentage.toFixed(2) + "%";
};
