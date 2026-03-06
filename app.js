document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll("#algo-list li");
  const forms = document.querySelectorAll(".algo-form");
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      //Actualizar el menú lateral
      menuItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");

      //Ocultar todos los formularios
      forms.forEach((f) => f.classList.remove("active"));

      // Mostrar el formulario seleccionado
      const targetId = item.getAttribute("data-target");
      document.getElementById(targetId).classList.add("active");

      //Limpiar la tabla de resultados al cambiar de algoritmo
      clearResults();
    });
  });

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const activeAlgoId = form.getAttribute("id");
      const tbody = document.querySelector("#results-table tbody");
      tbody.innerHTML = "";
      console.log("Formulario activo:" + activeAlgoId);
      //Metodo de cuadrados medios
      if (activeAlgoId === "cuadrados-medios") {
        const seedInput = document.getElementById("cm-seed").value;
        const n = parseInt(document.getElementById("cm-n").value, 10);

        if (seedInput.length < 3) {
          alert("La semilla debe tener al menos 3 dígitos.");
          return;
        }

        const results = generateCuadradosMedios(seedInput, n);

        results.forEach((res) => {
          console.info("Renderizando la tabla");
          const tr = document.createElement("tr");
          tr.innerHTML = `
                        <td>${res.i}</td>
                        <td>${res.xi}</td>
                        <td>${res.ri.toFixed(res.D)}</td>
                    `;
          tbody.appendChild(tr);
        });
      }
      //Metodos de productos medios
      else if (activeAlgoId === "productos-medios") {
        const seed1Input = document.getElementById("pm-seed1").value;
        const seed2Input = document.getElementById("pm-seed2").value;
        const n = parseInt(document.getElementById("pm-n").value, 10);

        if (seed1Input.length < 3 || seed2Input.length < 3) {
          alert("Las semillas deben tener al menos 3 dígitos.");
          return;
        }

        const results = generateProductosMedios(seed1Input, seed2Input, n);

        results.forEach((res) => {
          console.info("Renderizando la tabla");
          const tr = document.createElement("tr");
          tr.innerHTML = `
                        <td>${res.i}</td>
                        <td>${res.xi}</td>
                        <td>${res.ri.toFixed(res.D)}</td>
                    `;
          tbody.appendChild(tr);
        });
      } else if (activeAlgoId === "multiplicador-constante") {
        const seedInput = document.getElementById("mc-seed").value;
        const aValue = document.getElementById("mc-a").value;
        const n = parseInt(document.getElementById("mc-n").value, 10);
        if (aValue.length < 3) {
          alert("La Constante debe tener al menos 3 digitos.");
          return;
        }
        if (seedInput.length < 3) {
          alert("La semilla debe tener al menos 3 dígitos.");
          return;
        }
        let a = parseInt(document.getElementById("mc-a").value, 10);
        const results = generateMultiplicadorConstante(seedInput, a, n);
        results.forEach((res) => {
          console.info("Renderizando la tabla");
          const tr = document.createElement("tr");
          tr.innerHTML = `
                        <td>${res.i}</td>
                        <td>${res.xi}</td>
                        <td>${res.ri.toFixed(res.D)}</td>
                    `;
          tbody.appendChild(tr);
        });
      } else if (activeAlgoId === "lineal") {
        const seedInput = document.getElementById("al-seed");
        const k = document.getElementById("al-a");
        const sumaValue = document.getElementById("al-suma");
        //const n = parseInt(document.getElementById("al-n").value, 10);
        //const mValue = document.getElementById("al-m");
        const gValue = document.getElementById("al-g");
        const results = generateLineal(seedInput, k, sumaValue, gValue);
        results.forEach((res) => {
          console.info("Renderizando la tabla");
          const tr = document.createElement("tr");
          tr.innerHTML = `
                        <td>${res.i}</td>
                        <td>${res.xi}</td>
                        <td>${res.ri.toFixed(res.D)}</td>
                    `;
          tbody.appendChild(tr);
        });
      } else if (activeAlgoId === "congruencial-multiplicativo") {
        const seedInput = document.getElementById("cmu-seed");
        const k = document.getElementById("cmu-k");
        const g = document.getElementById("cmu-g");

        const results = generateCongruencialMultiplicativo(seedInput, k, g);
        results.forEach((res) => {
          console.info("Renderizando la tabla");
          const tr = document.createElement("tr");
          tr.innerHTML = `
                        <td>${res.i}</td>
                        <td>${res.xi}</td>
                        <td>${res.ri.toFixed(res.D)}</td>
                    `;
          tbody.appendChild(tr);
        });
      } else {
        const activeAlgoName = form.querySelector("h3").innerText;
        tbody.innerHTML = `
                    <tr>
                        <td colspan="3" style="text-align: center; padding: 30px;">
                            <div style="color: #2563eb; font-weight: bold; margin-bottom: 10px;">
                                ¡Interfaz conectada correctamente!
                            </div>
                            <div style="color: #64748b;">
                                Los parámetros para <strong>${activeAlgoName}</strong> fueron capturados.<br>
                                <em>La lógica matemática en JavaScript se implementará más adelante.</em>
                            </div>
                        </td>
                    </tr>
                `;
      }
    });
  });

  //TODO: Función para el algoritmo de Cuadrados Medios
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
  function generateLineal(seedInput, k, sumaValue, gValue) {
    let results = [];
    let currentSeed = parseInt(seedInput.value, 10);
    let a = parseInt(k.value, 10);
    const c = parseInt(sumaValue.value, 10);
    const m = Math.pow(2, parseInt(gValue.value, 10));
    const D = 4; // Para mostrar al menos 4 dígitos significativos en ri
    a = 1 + 4 * parseInt(k.value, 10);
    for (let i = 1; i <= m; i++) {
      // Mejor solución para evitar problemas de precisión en JavaScript con decimales y mostrar minimo 4 dígitos en el resultado de ri
      let nexSeed = (a * currentSeed + c) % m;
      let ri = nexSeed / (m - 1);
      console.log(`a: ${a},${currentSeed}, c: ${c}, m: ${m}`);
      console.log(`ri: ${ri}`);
      //evita que ri se redondee a 0 si es un número muy pequeño, garantizando al menos 4 dígitos significativos
      if (ri < 0.0001) {
        ri = parseFloat(ri.toPrecision(4));
      }
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
  //Algoritmo congruencial multiplicativo
  function clearResults() {
    const tbody = document.querySelector("#results-table tbody");
    tbody.innerHTML = `
            <tr>
                <td colspan="3" class="empty-state">Configura los parámetros y presiona "Generar Números" para ver los resultados.</td>
            </tr>
        `;
  }
});
