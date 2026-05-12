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
        // c relativamente primo a m
        let mprovicional = Math.pow(2, parseInt(gValue.value, 10));

        // Verificar que sumaValue y mprovicional sean coprimos
        if (!sonCoprimos(parseInt(sumaValue.value, 10), mprovicional)) {
          alert("La constante de suma (c) debe ser relativamente prima a m (coprima).");
          return;
        }

        //c y g mayores que 0
        if (sumaValue.value <= 0 || parseInt(sumaValue.value, 10) >= mprovicional) {
          alert(`La constante de suma (c) debe ser un número positivo menor que ${mprovicional}.`);
          return;
        }

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
        //recupera el valor de Xd seleccionado por el usuario
        const xDSelect = document.getElementById("cmu-xD");
        const xDValue = parseInt(xDSelect.value, 10);
        const seedInput = document.getElementById("cmu-seed");
        const k = document.getElementById("cmu-k").value;
        const g = document.getElementById("cmu-g").value;
        if (seedInput.value % 2 === 0) {
          alert(
            "La semilla debe ser un número impar para el algoritmo congruencial multiplicativo.",
          );
          return;
        }
        const results = generateCongruencialMultiplicativo(seedInput, k, g, xDValue);
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
      } else if (activeAlgoId === "congruencial-aditivo") {
        const secInput = document.getElementById("cma-sec").value;
        const secArray = secInput.split(",").map((s) => parseInt(s.trim(), 10));

        if (secArray.some(isNaN)) {
          alert("La secuencia contiene valores no numéricos. Por favor ingresa solo números separados por comas.");
          throw new Error("Secuencia no válida");
        }
        const m = parseInt(document.getElementById("cma-m").value, 10);

        const cantidadDeNumeros = parseInt(document.getElementById("cma-n")?.value || 10, 10);

        console.log("Largo de la secuencia:", secArray.length);

        const results = generateCongruencialAditivo(secArray, m, cantidadDeNumeros);

        results.forEach((res) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
          <td>${res.i}</td>
          <td>${res.xi}</td>
          <td>${res.ri.toFixed(res.D)}</td>
        `;
          tbody.appendChild(tr);
        });
      } else if (activeAlgoId === "congruencial-cuadratico") {
        const seedInput = document.getElementById("cc-seed").value;
        const aInput = document.getElementById("cc-a").value;
        const bInput = document.getElementById("cc-b").value;
        const cInput = document.getElementById("cc-c").value;
        const mInput = document.getElementById("cc-m").value;

        const seed = parseInt(seedInput, 10);
        const a = parseInt(aInput, 10);
        const b = parseInt(bInput, 10);
        const c = parseInt(cInput, 10);
        const m = parseInt(mInput, 10);

        if (a % 2 !== 0) {
          return alert("El valor de a debe ser par para el algoritmo congruencial cuadrático.");
        }
        if (c % 2 !== 1) {
          return alert("El valor de c debe ser impar para el algoritmo congruencial cuadrático.");
        }
        if (((b - 1) % 4 ) !== a % 4) {
          return alert("El valor de b debe cumplir (b-1) % 4 = 0 para el algoritmo congruencial cuadrático.");
        }

        const results = generateCongruencialCuadratico(seed, a, b, c, m);

        results.forEach((res) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
          <td>${res.i}</td>
          <td>${res.xi}</td>
          <td>${res.ri.toFixed(res.D)}</td>
        `;
          tbody.appendChild(tr);
        });
      } else if (activeAlgoId === "bbs") {
        const seedInput = document.getElementById("bbs-seed").value;
        const mInput = document.getElementById("bbs-m").value;

        const seed = parseInt(seedInput, 10);
        const m = parseInt(mInput, 10);

        try {
          const results = generateBBS(seed, m);

          results.forEach((res) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${res.i}</td>
            <td>${res.xi}</td>
            <td>${res.ri.toFixed(res.D)}</td>
          `;
            tbody.appendChild(tr);
          });
        } catch (e) {
          tbody.innerHTML = `<tr><td colspan="3" style="color:red;">${e.message}</td></tr>`;
        }
      } else if (activeAlgoId === "Kolmogorov-Smirnov") {
        const sequenceValue = document.getElementById("ks-sequence").value;
        const alphaValue = parseFloat(document.getElementById("ks-alpha").value);

        const sequence = sequenceValue
          .split(/[,\s]+/)
          .filter(Boolean)
          .map((value) => parseFloat(value.trim()));

        if (sequence.length < 5) {
          alert("Ingresa al menos 5 valores para evaluar la prueba Kolmogorov-Smirnov.");
          return;
        }

        if (sequence.some((value) => Number.isNaN(value) || value < 0 || value > 1)) {
          alert("Todos los valores deben ser numéricos y estar en el rango [0, 1].");
          return;
        }

        const result = generateKolmogorovSmirnov(sequence, alphaValue);
        const thead = document.querySelector("#results-table thead");
        thead.innerHTML = `
            <tr>
                <th>i</th>
                <th>(i-1)/n</th>
                <th>r_i</th>
                <th>i/n</th>
                <th>i/n - r_i</th>
                <th>r_i - (i-1)/n</th>
            </tr>
        `;

        result.rows.forEach((res) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${res.i}</td>
            <td>${res.fPrev.toFixed(2)}</td>
            <td>${res.xi.toFixed(2)}</td>
            <td>${res.fObs.toFixed(2)}</td>
            <td>${res.dPlus.toFixed(2)}</td>
            <td>${res.dMinus.toFixed(2)}</td>
          `;
          tbody.appendChild(tr);
        });

        const conclusionRow = document.createElement("tr");
        conclusionRow.innerHTML = `
          <td colspan="6" style="text-align:left; padding: 16px; background:#f8fafc;">
            <strong>n:</strong> ${result.n} &nbsp;|&nbsp;
            <strong>D+</strong> = ${result.Dplus.toFixed(2)} &nbsp;|&nbsp;
            <strong>D-</strong> = ${result.Dminus.toFixed(2)} &nbsp;|&nbsp;
            <strong>D</strong> = ${result.D.toFixed(2)} &nbsp;|&nbsp;
            <strong>Crítico (α=${result.alpha})</strong> = ${result.critical.toFixed(3)}<br>
            <strong>Decisión:</strong> ${result.reject ? "Rechaza H0 (no uniforme)" : "No rechaza H0 (uniforme)"}
          </td>
        `;
        tbody.appendChild(conclusionRow);
      } else if (activeAlgoId === "rachas-arriba-abajo") {
        const sequenceValue = document.getElementById("raa-sequence").value;
        const alphaValue = parseFloat(document.getElementById("raa-alpha").value);

        const sequence = sequenceValue
          .split(/[\s,]+/)
          .filter(Boolean)
          .map((value) => parseFloat(value.trim()));

        if (sequence.length < 5) {
          alert("Ingresa al menos 5 valores para evaluar la prueba.");
          return;
        }

        const result = generateRachasArribaAbajo(sequence, alphaValue);
        const thead = document.querySelector("#results-table thead");
        thead.innerHTML = `
            <tr>
                <th colspan="3">Resultados de Prueba: Arriba y Abajo</th>
            </tr>
        `;
        
        tbody.innerHTML = `
          <tr><td colspan="3" style="text-align:left; padding: 16px; background:#f8fafc;">
            <strong>Secuencia de signos:</strong> ${result.signs}<br>
            <strong>Número de rachas observadas (R):</strong> ${result.runs}<br>
            <strong>Media esperada:</strong> ${result.expectedRuns.toFixed(4)}<br>
            <strong>Varianza:</strong> ${result.variance.toFixed(4)}<br>
            <strong>Z calculado:</strong> ${result.z.toFixed(4)}<br>
            <strong>Z crítico (α=${result.alpha}):</strong> ±${result.critical.toFixed(4)}<br>
            <strong>Decisión ( |Z| > Z_crit ):</strong> ${result.reject ? "Rechaza H0 (no son independientes)" : "No rechaza H0 (son independientes)"}
          </td></tr>
        `;
      } else if (activeAlgoId === "rachas-media") {
        const sequenceValue = document.getElementById("rm-sequence").value;
        const alphaValue = parseFloat(document.getElementById("rm-alpha").value);

        const sequence = sequenceValue
          .split(/[\s,]+/)
          .filter(Boolean)
          .map((value) => parseFloat(value.trim()));

        if (sequence.length < 5) {
          alert("Ingresa al menos 5 valores para evaluar la prueba.");
          return;
        }

        const result = generateRachasMedia(sequence, alphaValue);
        const thead = document.querySelector("#results-table thead");
        thead.innerHTML = `
            <tr>
                <th colspan="3">Resultados de Prueba: Arriba y Abajo de la Media</th>
            </tr>
        `;
        
        tbody.innerHTML = `
          <tr><td colspan="3" style="text-align:left; padding: 16px; background:#f8fafc;">
            <strong>Media calculada:</strong> ${result.mean.toFixed(4)}<br>
            <strong>Secuencia de signos:</strong> ${result.signs}<br>
            <strong>n1 (+):</strong> ${result.n1} &nbsp;|&nbsp; <strong>n2 (-):</strong> ${result.n2}<br>
            <strong>Número de rachas observadas (R):</strong> ${result.runs}<br>
            <strong>Media esperada:</strong> ${result.expectedRuns.toFixed(4)}<br>
            <strong>Varianza:</strong> ${result.variance.toFixed(4)}<br>
            <strong>Z calculado:</strong> ${result.z.toFixed(4)}<br>
            <strong>Z crítico (α=${result.alpha}):</strong> ±${result.critical.toFixed(4)}<br>
            <strong>Decisión ( |Z| > Z_crit ):</strong> ${result.reject ? "Rechaza H0 (no son independientes)" : "No rechaza H0 (son independientes)"}
          </td></tr>
        `;
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

  function clearResults() {
    const thead = document.querySelector("#results-table thead");
    const tbody = document.querySelector("#results-table tbody");
    thead.innerHTML = `
            <tr>
                <th>Iteración (i)</th>
                <th>Valor (X_i)</th>
                <th>Número Pseudoaleatorio (r_i)</th>
            </tr>
        `;
    tbody.innerHTML = `
            <tr>
                <td colspan="3" class="empty-state">Configura los parámetros y presiona "Generar Números" para ver los resultados.</td>
            </tr>
        `;
  }
});

