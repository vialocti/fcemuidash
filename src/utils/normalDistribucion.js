export const normalDistribution = (mean, stdDev) => {
    const data = [];
    for (let x = -5; x <= 5; x += 0.1) {
      const exponent = -((x ** 2) / (2 * stdDev ** 2));
      const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
      data.push(coefficient * Math.exp(exponent));
    }
    return data;
  };
  