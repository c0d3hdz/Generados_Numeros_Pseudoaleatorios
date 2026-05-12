
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

