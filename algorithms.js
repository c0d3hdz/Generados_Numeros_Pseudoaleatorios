
function gcd(a, b) {
  if (b === 0) {
    return a;
  }
  return gcd(b, a % b);
}


function sonCoprimos(a, b) {
  return gcd(a, b) === 1;
}

// Función para el algoritmo de Cuadrados Medios
function generateCuadradosMedios(seedStr, n) {
  let results = [];
  let currentSeed = seedStr;
  const D = currentSeed.length;
  console.log("D calculado:" + D);
  let Dinsuficiente = false;
  for (let i = 1; i <= n; i++) {
    let numSeed = parseInt(currentSeed, 10);
    let squared = (numSeed * numSeed).toString();

    if (squared.length < 2 * D) {
      squared = "0" + squared;
      if (squared.length < 2 * D) {
        squared = squared + "0";
      }
      Dinsuficiente = true;
    }
    let startIndex = Math.floor((squared.length - D) / 2);
    let nextSeedStr = squared.substring(startIndex, startIndex + D);
    if (Dinsuficiente) {
      console.log(squared);
      console.info(
        "Inidice de inicio :" +
        startIndex +
        " D: " +
        D +
        " Longitud de squared: " +
        squared.length,
      );
      Dinsuficiente = false;
    }
    let nextSeedNum = parseInt(nextSeedStr, 10);
    let ri = nextSeedNum / Math.pow(10, D);
    results.push({
      i: i,
      xi: nextSeedNum,
      ri: ri,
      D: D,
    });

    currentSeed = nextSeedStr;
  }

  return results;
}

// Método de Productos Medios
function generateProductosMedios(seedStr1, seedStr2, n) {
  let results = [];
  const D = Math.max(seedStr1.length, seedStr2.length);
  console.log("D calculado: " + D);

  let x_prev = parseInt(seedStr1, 10);
  let x_curr = parseInt(seedStr2, 10);

  for (let i = 1; i <= n; i++) {
    let product = (x_prev * x_curr).toString();

    while (product.length < 2 * D) {
      product = "0" + product;
    }

    // Extraer los D dígitos centrales
    let startIndex = Math.floor((product.length - D) / 2);
    let nextSeedStr = product.substring(startIndex, startIndex + D);

    let nextSeedNum = parseInt(nextSeedStr, 10);
    let ri = nextSeedNum / Math.pow(10, D);

    results.push({
      i: i,
      xi: nextSeedNum,
      ri: ri,
      D: D,
    });

    x_prev = x_curr;
    x_curr = nextSeedNum;
  }

  return results;
}

// Método Multiplicador Constante
function generateMultiplicadorConstante(seedStr, a, n) {
  let results = [];
  const D = seedStr.length;
  let currentSeed = parseInt(seedStr, 10);

  for (let i = 1; i <= n; i++) {
    let productStr = (a * currentSeed).toString();

    // Rellenar con ceros a la izquierda hasta que tenga 2*D dígitos
    while (productStr.length < 2 * D) {
      productStr = "0" + productStr;
    }

    let startIndex = Math.floor((productStr.length - D) / 2);
    let nextSeedStr = productStr.substring(startIndex, startIndex + D);

    let nextSeedNum = parseInt(nextSeedStr, 10);
    let ri = nextSeedNum / Math.pow(10, D);

    results.push({
      i: i,
      xi: nextSeedNum,
      ri: ri,
      D: D,
    });

    currentSeed = nextSeedNum;
  }

  return results;
}

// Algoritmo Lineal
function generateLineal(seedInput, k, sumaValue, gValue) {
  let results = [];
  let currentSeed = parseInt(seedInput.value, 10);
  let a = parseInt(k.value, 10);
  const c = parseInt(sumaValue.value, 10);
  const m = Math.pow(2, parseInt(gValue.value, 10));
  const D = 4; // Para mostrar al menos 4 dígitos significativos en ri
  a = 1 + 4 * parseInt(k.value, 10);
  for (let i = 1; i <= m; i++) {
    let nexSeed = (a * currentSeed + c) % m;
    let ri = nexSeed / (m - 1);
    results.push({
      i: i,
      xi: nexSeed,
      ri: ri,
      D: D,
    });
    currentSeed = nexSeed;
  }
  return results;
}

// Algoritmo congruencial multiplicativo
function generateCongruencialMultiplicativo(seedInput, k, g, Xd) {
  let results = [];
  let currentSeed = parseInt(seedInput.value, 10);
  let kvalue = parseInt(k, 10);
  const gvalue = parseInt(g, 10);
  let a = Xd + 8 * kvalue;
  const m = Math.pow(2, gvalue);
  const N = m / 4;
  const D = 5;
  console.log(`a: ${a}, seed: ${currentSeed}, m: ${m}`);
  for (let i = 1; i <= N; i++) {
    let nextSeed = (a * currentSeed) % m;
    let ri = nextSeed / (m - 1);
    //mayor precision para mostrar los dígitos significativos de ri
    ri = parseFloat(ri.toPrecision(D));
    results.push({
      i: i,
      xi: nextSeed,
      ri: ri,
      D: D,
    });
    currentSeed = nextSeed;
  }
  return results;
}

// Algoritmo congruencial aditivo
function generateCongruencialAditivo(secArray, m, cantidadDeNumeros) {
  let results = [];
  let secuencia = [...secArray];
  const n = secArray.length;
  const D = 5;

  for (let i = n; i < n + cantidadDeNumeros; i++) {
    let nextValue = (secuencia[i - 1] + secuencia[i - n]) % m;
    secuencia.push(nextValue);

    let ri = nextValue / (m - 1);

    results.push({
      i: i,
      xi: nextValue,
      ri: ri,
      D: D,
    });
  }

  return results;
}

// Algoritmo Congruencial Cuadrático
function generateCongruencialCuadratico(seed, a, b, c, m) {
  let results = [];
  let currentSeed = seed;
  const D = 5;

  for (let i = 1; i <= m; i++) {
    let nextSeed = (a * Math.pow(currentSeed, 2) + b * currentSeed + c) % m;
    let ri = nextSeed / (m - 1);

    results.push({
      i: i,
      xi: nextSeed,
      ri: ri,
      D: D,
    });

    currentSeed = nextSeed;
  }

  return results;
}

// Algoritmo BBS (Blum Blum Shub)
function generateBBS(seed, m) {
  if (!sonCoprimos(seed, m)) {
    throw new Error(`Semilla ${seed} no es coprima con m=${m}. Elige una semilla diferente.`);
  }

  let results = [];
  let currentSeed = seed;
  const D = 5;
  for (let i = 1; i <= m; i++) {
    let nextSeed = Math.pow(currentSeed, 2) % m;
    let ri = nextSeed / (m - 1);
    results.push({
      i: i,
      xi: nextSeed,
      ri: ri,
      D: D,
    });

    currentSeed = nextSeed;
    console.log(`Iteración ${i}: xi = ${nextSeed}, ri = ${ri}`);
  }

  return results;
}

// Prueba de Kolmogorov-Smirnov para una distribución uniforme en [0,1]
function getKSCriticalValue(n, alpha) {
  const criticalMap = {
    0.2: 1.07,
    0.15: 1.14,
    0.1: 1.22,
    0.05: 1.36,
    0.02: 1.52,
    0.01: 1.63,
  };

  const k = criticalMap[alpha] || 1.36;
  return k / Math.sqrt(n);
}

function generateKolmogorovSmirnov(sequence, alpha) {
  const sorted = [...sequence].sort((a, b) => a - b);
  const n = sorted.length;
  const dPlusValues = [];
  const dMinusValues = [];
  const rows = [];

  for (let i = 0; i < n; i++) {
    const ri = sorted[i];
    const fObs = (i + 1) / n;
    const fPrev = i / n;
    const fExp = ri;
    const dPlus = fObs - fExp;
    const dMinus = fExp - fPrev;
    const diff = Math.max(dPlus, dMinus);

    dPlusValues.push(dPlus);
    dMinusValues.push(dMinus);
    rows.push({
      i: i + 1,
      xi: ri,
      fPrev: fPrev,
      fObs: fObs,
      dPlus: dPlus,
      dMinus: dMinus,
      diff: diff,
    });
  }

  const Dplus = Math.max(...dPlusValues);
  const Dminus = Math.max(...dMinusValues);
  const D = Math.max(Dplus, Dminus);
  const critical = getKSCriticalValue(n, alpha);
  const reject = D > critical;

  return {
    rows,
    Dplus,
    Dminus,
    D,
    critical,
    reject,
    alpha,
    n,
  };
}

// Prueba de rachas: Arriba y Abajo
function getZCriticalValue(alpha) {
  // Approximate standard normal critical values for two-tailed tests
  const map = {
    0.1: 1.645,
    0.05: 1.96,
    0.01: 2.576
  };
  return map[alpha] || 1.96;
}

function generateRachasArribaAbajo(sequence, alpha) {
  const n = sequence.length;
  let signs = [];
  for (let i = 1; i < n; i++) {
    signs.push(sequence[i] >= sequence[i - 1] ? "+" : "-");
  }

  let runs = 1;
  for (let i = 1; i < signs.length; i++) {
    if (signs[i] !== signs[i - 1]) {
      runs++;
    }
  }

  const expectedRuns = (2 * n - 1) / 3;
  const variance = (16 * n - 29) / 90;
  const z = (runs - expectedRuns) / Math.sqrt(variance);
  const critical = getZCriticalValue(alpha);
  const reject = Math.abs(z) > critical;

  return {
    n,
    signs: signs.join(" "),
    runs,
    expectedRuns,
    variance,
    z,
    critical,
    reject,
    alpha
  };
}

// Prueba de rachas: Arriba y Abajo de la Media
function generateRachasMedia(sequence, alpha) {
  const n = sequence.length;
  const mean = sequence.reduce((a, b) => a + b, 0) / n;

  let signs = [];
  let n1 = 0; // count of +
  let n2 = 0; // count of -

  for (let i = 0; i < n; i++) {
    if (sequence[i] >= mean) {
      signs.push("+");
      n1++;
    } else {
      signs.push("-");
      n2++;
    }
  }

  let runs = 1;
  for (let i = 1; i < signs.length; i++) {
    if (signs[i] !== signs[i - 1]) {
      runs++;
    }
  }

  const expectedRuns = ((2 * n1 * n2) / n) + 1;
  const variance = (2 * n1 * n2 * (2 * n1 * n2 - n)) / (n * n * (n - 1));
  const z = variance === 0 ? 0 : (runs - expectedRuns) / Math.sqrt(variance);
  const critical = getZCriticalValue(alpha);
  const reject = Math.abs(z) > critical;

  return {
    n,
    mean,
    n1,
    n2,
    signs: signs.join(" "),
    runs,
    expectedRuns,
    variance,
    z,
    critical,
    reject,
    alpha
  };
}

// Prueba de Poker
function getChiSquareCriticalValue6df(alpha) {
  const map = {
    0.1: 10.645,
    0.05: 12.592,
    0.01: 16.812
  };
  return map[alpha] || 12.592;
}

function generatePoker(sequence, alpha) {
  const n = sequence.length;

  let counts = {
    TD: 0,
    "1P": 0,
    "2P": 0,
    T: 0,
    TP: 0,
    P: 0,
    Q: 0
  };

  const probabilities = {
    TD: 0.3024,
    "1P": 0.5040,
    "2P": 0.1080,
    T: 0.0720,
    TP: 0.0090,
    P: 0.0045,
    Q: 0.0001
  };

  sequence.forEach(num => {
    let str = num.toString();
    let frac = str.includes('.') ? str.split('.')[1] : "0";
    while (frac.length < 5) frac += "0";
    if (frac.length > 5) frac = frac.substring(0, 5);

    let digitCounts = {};
    for (let char of frac) {
      digitCounts[char] = (digitCounts[char] || 0) + 1;
    }

    let frequencies = Object.values(digitCounts).sort((a, b) => b - a);

    if (frequencies[0] === 5) counts.Q++;
    else if (frequencies[0] === 4) counts.P++;
    else if (frequencies[0] === 3 && frequencies[1] === 2) counts.TP++;
    else if (frequencies[0] === 3 && frequencies[1] === 1) counts.T++;
    else if (frequencies[0] === 2 && frequencies[1] === 2) counts["2P"]++;
    else if (frequencies[0] === 2 && frequencies[1] === 1) counts["1P"]++;
    else counts.TD++;
  });

  let chiSquareCalc = 0;
  let tableDetails = [];

  for (let cat in probabilities) {
    let Oi = counts[cat];
    let Ei = n * probabilities[cat];
    let diffSq = Math.pow(Oi - Ei, 2);
    let stat = Ei === 0 ? 0 : diffSq / Ei;
    chiSquareCalc += stat;

    tableDetails.push({
      category: cat,
      probability: probabilities[cat],
      Oi: Oi,
      Ei: Ei,
      stat: stat
    });
  }

  const df = 6;
  const critical = getChiSquareCriticalValue6df(alpha);
  const reject = chiSquareCalc > critical;

  return {
    n,
    tableDetails,
    chiSquareCalc,
    critical,
    reject,
    df,
    alpha
  };
}

// Prueba de las Medias (T de Student / Estadístico Z para n >= 2)
function generateTStudent(sequence, alphaStr) {
  const alpha = parseFloat(alphaStr);
  const n = sequence.length;
  const mean = sequence.reduce((sum, val) => sum + val, 0) / n;
  
  // Varianza muestral
  const variance = sequence.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1);
  const s = Math.sqrt(variance);

  // Estadístico: t = |Media - 0.5| / (s / raiz(n))
  const t0 = Math.abs(mean - 0.5) / (s / Math.sqrt(n));

  // Valores críticos Z para prueba de dos colas
  const mapZ = {
    0.10: 1.645,
    0.05: 1.960,
    0.01: 2.576
  };
  
  const critical = mapZ[alpha] || 1.960;
  const reject = t0 > critical;

  return {
    n,
    mean,
    variance,
    s,
    tCalculated: t0,
    critical,
    reject,
    alpha: alphaStr
  };
}

// Valores Críticos Chi Cuadrada (Aproximación de Wilson-Hilferty para no mapeados)
function getChiSquareCriticalValueApprox(df, alphaStr) {
  const alpha = parseFloat(alphaStr);
  const chiSqMap = {
    1: { 0.1: 2.706, 0.05: 3.841, 0.01: 6.635 },
    2: { 0.1: 4.605, 0.05: 5.991, 0.01: 9.210 },
    3: { 0.1: 6.251, 0.05: 7.815, 0.01: 11.345 },
    4: { 0.1: 7.779, 0.05: 9.488, 0.01: 13.277 },
    5: { 0.1: 9.236, 0.05: 11.070, 0.01: 15.086 },
    6: { 0.1: 10.645, 0.05: 12.592, 0.01: 16.812 },
    7: { 0.1: 12.017, 0.05: 14.067, 0.01: 18.475 },
    8: { 0.1: 13.362, 0.05: 15.507, 0.01: 20.090 },
    9: { 0.1: 14.684, 0.05: 16.919, 0.01: 21.666 },
    10:{ 0.1: 15.987, 0.05: 18.307, 0.01: 23.209 },
    11:{ 0.1: 17.275, 0.05: 19.675, 0.01: 24.725 },
    12:{ 0.1: 18.549, 0.05: 21.026, 0.01: 26.217 },
    13:{ 0.1: 19.812, 0.05: 22.362, 0.01: 27.688 },
    14:{ 0.1: 21.064, 0.05: 23.685, 0.01: 29.141 },
    15:{ 0.1: 22.307, 0.05: 24.996, 0.01: 30.578 },
    20:{ 0.1: 28.412, 0.05: 31.410, 0.01: 37.566 },
    30:{ 0.1: 40.256, 0.05: 43.773, 0.01: 50.892 }
  };

  if (chiSqMap[df] && chiSqMap[df][alpha]) {
    return chiSqMap[df][alpha];
  }
  
  const zMap = { 0.1: 1.282, 0.05: 1.645, 0.01: 2.326 };
  const z = zMap[alpha] || 1.645;
  const p1 = 2 / (9 * df);
  return df * Math.pow((1 - p1 + z * Math.sqrt(p1)), 3);
}

// Prueba de Uniformidad Chi Cuadrada
function generateChiCuadrada(sequence, mIntervals, alphaStr) {
  const n = sequence.length;
  let m = mIntervals && mIntervals >= 2 ? mIntervals : Math.floor(Math.sqrt(n));
  if (m < 2) m = 2; // mínimo de intervalos

  const expected = n / m;
  let counts = new Array(m).fill(0);
  
  sequence.forEach(val => {
    let index = Math.floor(val * m);
    if (index >= m) index = m - 1; 
    counts[index]++;
  });

  let chiCalc = 0;
  let tableDetails = [];

  for (let i=0; i<m; i++) {
    let observed = counts[i];
    let diffVar = Math.pow(observed - expected, 2) / expected;
    chiCalc += diffVar;

    tableDetails.push({
      interval: `[${(i/m).toFixed(3)}, ${((i+1)/m).toFixed(3)})`,
      Oi: observed,
      Ei: expected,
      stat: diffVar
    });
  }

  const df = m - 1;
  const critical = getChiSquareCriticalValueApprox(df, alphaStr);
  const reject = chiCalc > critical;

  return {
    tableDetails,
    chiCalc,
    df,
    critical,
    reject,
    alpha: alphaStr
  };
}

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
