//Declaro mis objetos
const articulos = [
  {
    imagen: "sada",
    nombre: "Higiene facial",
    precio: 6000,
  },
  {
    imagen: "sada",
    nombre: "Limpieza Profunda",
    precio: 8000,
  },
  {
    imagen: "sada",
    nombre: "Masaje con piedras calientes",
    precio: 12000,
  },
  {
    imagen: "sada",
    nombre: "Masajes descontracturante",
    precio: 10000,
  },
];

// Funcion para validar si la sesion que eligen realmente concide
function validarCampo() {
  let sesion = prompt(
    "Ingrese nombre de la sesion" +
      "\n" +
      "1) Higiene facial" +
      "\n" +
      "2) Limpieza Profunda" +
      "\n" +
      "3) Masaje con piedras calientes" +
      "\n" +
      "4) Masajes descontracturante"
  );
  let horas = parseInt(prompt("Ingrese cuantas horas quieres"));

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

  // busco el nombre del articulo en mi array
  let articulo = articulos.find(
    (item) => item.nombre.toLowerCase() === sesion.toLowerCase() // no importa si esta en mayusucula o minuscula
  );

  // En caso de que se ingrese mal el nombre de la sesion lo vuelve a pedir
  while (!articulo) {
    sesion = prompt(
      "No exite la sesion ingresada. Por favor" +
        "\n" +
        "1) Higiene facial" +
        "\n" +
        "2) Limpieza Profunda" +
        "\n" +
        "3) Masaje con piedras calientes" +
        "\n" +
        "4) Masajes descontracturante"
    );

    articulo = articulos.find(
      (item) => item.nombre.toLowerCase() === sesion.toLowerCase()
    );
  }

  console.log("La sesion elegida es " + sesion + " y durara " + horas + " hs");
  return { horas, articulo };
}

// Calculo el costo de la sesion dependiendo cual se elija
function calcularCosto(total) {
  // total va a contener las propiedas hora y articulos
  if (total) {
    let suma = total.horas * total.articulo.precio;
    console.log("El total de la sesion es " + "$" + suma);
  }
}

// Creo una functio para que elijan la fecha de la reserva
function diaDeReserva(fecha) {
  let reserva = new Date(fecha);
  let fechaActual = new Date();

  reserva.setHours(0, 0, 0, 0);
  fechaActual.setHours(0, 0, 0, 0);

  if (reserva >= fechaActual) {
    return true;
  }

  return false;
}

// variables
let total = validarCampo();
let reserva = prompt("Ingrese la fecha de la reserva YYYY-MM-DD");

calcularCosto(total);

if (diaDeReserva(reserva)) {
  console.log("Su reserva seria el dia " + reserva);
} else {
  console.log(
    "La fecha ingresada para la reserva es posterior a la fecha del dia"
  );
}
