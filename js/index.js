//Declaro mis objetos
const ARTICULOS_ARRAY = [
  {
    id: 1,
    imagen:
      "https://beckyclub.com.ar/wp-content/uploads/2023/07/limpieza-facial-profunda-murcia.jpg",
    nombre: "Higiene facial",
    precio: 6000,
  },
  {
    id: 2,
    imagen:
      "https://www.medicinaesteticacrp.pe/wp-content/uploads/2019/03/limpieza-facial-profunda-procedimiento-3.jpg",
    nombre: "Limpieza Profunda",
    precio: 8000,
  },
  {
    id: 3,
    imagen:
      "https://www.spazio26.com/wp-content/uploads/2019/02/Piedras_Calientes.jpg",
    nombre: "Masaje con piedras calientes",
    precio: 12000,
  },
  {
    id: 4,
    imagen:
      "https://www.dan-spa.com/wp-content/uploads/2023/11/masaje-descontracturante-1.webp",
    nombre: "Masajes descontracturante",
    precio: 10000,
  },
];

let ultimaHoraReservada = null;

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
			<h3>Realiza Tu Reseva De ${nombreSesion}</h3>
			<div class="col-md-4">
				<label for="fecha" class="form-label">Elije una fecha:</label>
				<input type="date" class="form-control" id="fecha" required>
			</div>
			<div class="col-md-4">
				<label for="hora" class="form-label">Elige la hora de la reserva:</label>
				<select class="form-control" id="hora" required> ${verificadorDeHoras()} </select>
			</div>
			<div class="col-12 mt-3">
				<button type="button" class="btn btn-success" onclick="diaDeReserva('${nombreSesion}', ${precio})">Confirmar</button> 
			</div>
		</form>
    `;

  document.getElementById("formReserva").innerHTML = fechaYHoraHTML;

  document.getElementById("fecha").addEventListener("change", () => { 
    document.getElementById("hora").innerHTML = verificadorDeHoras(document.getElementById("fecha").value); 
    }); 
    
    document.getElementById("hora").innerHTML = verificadorDeHoras(document.getElementById("fecha").value);
}

function verificadorDeHoras(fechaSeleccionada) {     

  let reservas = JSON.parse(localStorage.getItem("reservas")) || []; 
  let horasReservadas = []; 

  // Se añaden horas a la lista de reservadas para la fecha seleccionada 
  reservas.forEach(reserva => { 
    if (reserva.fecha === fechaSeleccionada) { 
      let [horas, minutos] = reserva.hora.split(':'); 
      horasReservadas.push(`${horas}:${minutos}`); 
      let proximaHora = new Date(`1970-01-01T${horas}:${minutos}:00Z`); 
      proximaHora.setMinutes(proximaHora.getMinutes() + 30); 
      horasReservadas.push(`${proximaHora.getUTCHours() < 10 ? '0' : ''}${proximaHora.getUTCHours()}:${proximaHora.getUTCMinutes() < 10 ? '0' : ''}${proximaHora.getUTCMinutes()}`); 
      } 
    }); 
    
  let horas = []; 
  const fechaActual = new Date(); 
  const esDiaActual = fechaSeleccionada === fechaActual.toISOString().split('T')[0]; 
  const horaActual = esDiaActual ? `${fechaActual.getHours() < 10 ? '0' : ''}${fechaActual.getHours()}:${fechaActual.getMinutes() < 10 ? '0' : ''}${fechaActual.getMinutes()}` : '00:00'; 
  
  for (let i = 9; i <= 20; i++) {
    for (let j = 0; j < 60; j += 30) {
      if (i === 20 && j === 60) break;
      let hora = i < 10 ? `0${i}` : i;
      let minutos = j < 10 ? `0${j}` : j;
      let horaCompleta = `${hora}:${minutos}`;

      if (horaCompleta > horaActual && !horasReservadas.includes(horaCompleta)) {
        horas.push(`<option value="${horaCompleta}">${horaCompleta}</option>`); 
      }
    }
  }

  return horas.join("");
}

// Creo una functio para que elijan la fecha de la reserva
function diaDeReserva(nombreSesion, precio) {
  let fecha = document.getElementById("fecha").value;
  let hora = document.getElementById("hora").value;
  let duracion = 1;

  if (fecha && hora) {
    const [horas, minutos] = hora.split(":");
    const fechaReserva = new Date(`${fecha}T${horas}:${minutos}:00`);
    const fechaActual = new Date();

    if (fechaReserva < fechaActual) {
      alert(
        "La hora de la reserva es anterior a la hora actual. Por favor, elige una hora posterior."
      );
      return;
    }

    document.getElementById("formReserva").innerHTML = "";

    let total = duracion * precio;

    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    let reserva = { nombreSesion, fecha, hora, duracion, total };
    reservas.push(reserva);
    localStorage.setItem("reservas", JSON.stringify(reservas));

    mostrarReserva();
  }

  return false;
}

function mostrarReserva() {
  const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
  const resevaHTML = document.getElementById("reservaDetalles");
  const FECHA_ACTUAL = new Date();

  let controlDeReservas = reservas.filter((reserva) => {
    const [HORAS, MINUTOS] = reserva.hora.split(":");
    const FECHA_RESERVA = new Date(`${reserva.fecha}T${HORAS}:${MINUTOS}:00`);
    return FECHA_RESERVA > FECHA_ACTUAL;
  });

  localStorage.setItem("reservas", JSON.stringify(controlDeReservas));

  resevaHTML.innerHTML = reservas
    .map(
      (reserva) => `
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
