function generateVarianza(sequence, alphaStr) {
  const alpha = parseFloat(alphaStr);
  const n = sequence.length;
  if(n <= 1) return null;
  
  const mean = sequence.reduce((sum, val) => sum + val, 0) / n;
  const variance = sequence.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1);
  
  // Z values for common alpha/2
  const zMapAlpha2 = {
    0.10: 1.645,   // for 0.05 right tail and 0.95 left tail
    0.05: 1.960,   // for 0.025 right tail and 0.975 left tail
    0.01: 2.576    // for 0.005 right tail and 0.995 left tail
  };
  
  const z = zMapAlpha2[alpha] || 1.96;
  const df = n - 1;
  const p1 = 2 / (9 * df);
  
  // Wilson-Hilferty transformation for chi-square percentiles
  // Upper tail chi-square (critical value for alpha/2, meaning area to the right is alpha/2, area to left is 1-alpha/2)
  const chiSqSup = df * Math.pow((1 - p1 + z * Math.sqrt(p1)), 3);
  // Lower tail chi-square (area to the right is 1-alpha/2, area to left is alpha/2, so we use -z)
  const chiSqInf = df * Math.pow((1 - p1 - z * Math.sqrt(p1)), 3);
  
  const ls = chiSqSup / (12 * df);
  const li = chiSqInf / (12 * df);
  
  const reject = (variance < li || variance > ls);
  
  return {
    n,
    mean,
    variance,
    li,
    ls,
    reject,
    alpha: alphaStr
  };
}
