function validarCampo(sesion, horas) {
  sesion = prompt("Ingrese nombre de la sesion");
  horas = parseInt(prompt("Ingrese cuantas horas quieres"));

  if (sesion.trim() === "") {
    while (sesion.trim() === "") {
      sesion = prompt(
        "El campo está vacío. Por favor, ingrese nombre de la sesion"
      );
    }
  } else if (isNaN(horas)) {
    while (isNaN(horas)) {
      horas = parseInt(
        prompt("El campo está vacío. Ingrese cuantas horas quieres")
      );
    }
  }

  console.log("La sesion elegida es " + sesion + " y durara " + horas + " hs");
  return horas;
}

function calcularCosto() {
  const PRECIO = 7000;
  let horas = validarCampo();
  let total = horas * PRECIO;

  console.log("El total de la sesion es " + "$" + total);
}


calcularCosto();
