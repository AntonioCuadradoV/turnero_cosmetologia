//Declaro mis objetos
const ARTICULOS = [
  {
    id: 1,
    imagen: "imagenes/Higiene_facial.jpg",
    nombre: "Higiene facial",
    precio: 6000,
  },
  {
    id: 2,
    imagen: "imagenes/LIMPIEZA_PROFUNDA.jpg",
    nombre: "Limpieza Profunda",
    precio: 8000,
  },
  {
    id: 3,
    imagen: "imagenes/Masaje_de_relax.jpg",
    nombre: "Masaje con piedras calientes",
    precio: 12000,
  },
  {
    id: 4,
    imagen: "imagenes/Masajes_descontracturante.jpg",
    nombre: "Masajes descontracturante",
    precio: 10000,
  },
];

let contenedor = document.getElementById("contenedor");

ARTICULOS.forEach((articulo) => {
  let cardHTML = ` 
        <div class="col-3">
            <div class="p-3">
                <div class="card" style="width: 18rem"> 
                    <img src="${articulo.imagen}" class="card-img-top" alt="" /> 
                    <div class="card-body"> 
                        <h5 class="card-title">${articulo.nombre}</h5> 
                        <p class="card-text"> $ ${articulo.precio} </p> 
                        <button type="button" class="btn btn-info" onclick="verFecha('${articulo.nombre}', ${articulo.precio})">Reservar</button> 
                    </div> 
                </div> 
            </div>
        </div> `;

  contenedor.innerHTML += cardHTML;
});

// mostrar fecha

function verFecha(nombreSesion, precio) {
  let fechaYHoraHTML = `
    <div>
        <h3> Elije la fecha de la reserva </h3> 
        <label for="fecha">Elige una fecha:</label> 
        <input type="date" id="fecha" name="fecha" required> 
        <br>
        <label for="hora">Elige una hora:</label> 
        <input type="time" id="hora" name="hora" required> 
        <br> 
        <label for="duracion">Cantidad de horas:</label> 
        <input type="number" id="duracion" name="duracion" min="1" max="4" required> 
        <br><br> 
        <button type="button" class="btn btn-success" onclick="diaDeReserva('${nombreSesion}', ${precio})">Confirmar</button> 
    </div>
    `;

  document.getElementById("formReserva").innerHTML = fechaYHoraHTML;
}

// Creo una functio para que elijan la fecha de la reserva
function diaDeReserva(nombreSesion, precio) {
  let fecha = document.getElementById("fecha").value;
  let hora = document.getElementById("hora").value;
  let duracion = parseInt(document.getElementById("duracion").value);

  if (fecha && hora && duracion > 0 && duracion <= 3) {

    let total = duracion * precio;

    let detalleHTML = `
        <div>
            <h3>Reserva Confirmada</h3>
            <p>Nombre de la seison: ${nombreSesion}</p>
            <p>fehca: ${fecha}</p>
            <p>Hora: ${hora}</p>
            <p>Duracion: ${duracion} horas</p>
            <p>Total: $${total} </p>
        </div>
    `;

    document.getElementById("reservaDetalles").innerHTML = detalleHTML;
  }

  return false;
}
