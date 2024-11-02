//Declaro mis objetos
const ARTICULOS_ARRAY = [
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

function verArticulos() {
  const ARTICULOS_SECT = document.getElementById("articulos");
  ARTICULOS_ARRAY.forEach((articulo) => {
    const ARTICULOS_DIV = document.createElement("div");

    ARTICULOS_DIV.className = "col-3";
    ARTICULOS_DIV.innerHTML = ` 
				<div>
					<div class="card" style="width: 18rem"> 
						<img src="${articulo.imagen}" class="card-img-top" alt="" /> 
						<div class="card-body"> 
							<h5 class="card-title">${articulo.nombre}</h5> 
							<p class="card-text"> $ ${articulo.precio} </p> 
							<button type="button" class="btn btn-info" id="btn_reservar_${articulo.id}">Reservar</button> 
						</div> 
					</div> 
				</div>`;

    ARTICULOS_SECT.appendChild(ARTICULOS_DIV);

    document
      .getElementById(`btn_reservar_${articulo.id}`)
      .addEventListener("click", () => {
        verFecha(articulo.nombre, articulo.precio);
      });
  });
}

// mostrar fecha

function verFecha(nombreSesion, precio) {
  const fechaYHoraHTML = `
		
		<form class="row">
			<h3> Realiza tu reseva </h3>
			<div class="col-md-4">
				<label for="fecha" class="form-label">Elije una fecha:</label>
				<input type="date" class="form-control" id="fecha" value"fecha" required>
			</div>
			<div class="col-md-4">
				<label for="hora" class="form-label">Elige la hora de la reserva:</label>
				<select class="form-control" id="hora" required> ${verificadorDeHoras()} </select>
			</div>
			<div class="col-md-4">
				<label for="duracion" class="form-label">Cantidad de horas</label>
				<input type="number" class="form-control" id="duracion" aria-describedby="inputGroupPrepend2" required>
				</div>
			</div>
			<div class="col-12 mt-3">
				<button type="button" class="btn btn-success" onclick="diaDeReserva('${nombreSesion}', ${precio})">Confirmar</button> 
			</div>
		</form>
    `;

  document.getElementById("formReserva").innerHTML = fechaYHoraHTML;
}

function verificadorDeHoras(){
  let horas = [];
  for (let i = 9; i < 20; i++){
    for(let j = 0; j < 60; j += 30){
      if(i === 20 && j === 30) break;
      let hora = i < 10 ? `0${i}` : i;
      let minutos = j < 10 ? `0${j}` : j;
      horas.push(`<option value = "${hora}:${minutos}" > ${hora}:${minutos} </option>`)
    }
  }

  return horas.join('');
}

// Creo una functio para que elijan la fecha de la reserva
function diaDeReserva(nombreSesion, precio) {
  let fecha = document.getElementById("fecha").value;
  let hora = document.getElementById("hora").value;
  let duracion = parseInt(document.getElementById("duracion").value);

  if (fecha && hora && duracion > 0 && duracion <= 3) {
    document.getElementById("formReserva").innerHTML = "";

    let total = duracion * precio;

    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    let reserva = { nombreSesion, fecha, hora, duracion, total };
    reservas.push(reserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));

    mostrarReserva();
    document.getElementById("reservaDetalles").innerHTML = "";
    
  }

  return false;
}

function mostrarReserva() {
  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  const resevaHTML = document.getElementById("reservaDetalles");

  resevaHTML.innerHTML = reservas.map((reserva) => `
		<div class="row mis_reservas">
			<div class="col">${reserva.nombreSesion}</div>
			<div class="col">${reserva.fecha}</div>
			<div class="col">${reserva.hora}</div>
			<div class="col">${reserva.duracion}</div>
			<div class="col">$${reserva.total}</div>
		</div>
    `
    )
    .join("");
}

verArticulos();
mostrarReserva();
