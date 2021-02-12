const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
	formulario.addEventListener('submit', buscarClima);
});

function buscarClima(e) {
	e.preventDefault();

	//validar el formulario

	const ciudad = document.querySelector('#ciudad').value;
	const pais = document.querySelector('#pais').value;

	if (ciudad === '' || pais === '') {
		// hubo un error
		mostrarError('Ambos campos son obligatorios');
		return;
	}

	//consultar la api
	consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
	const alerta = document.querySelector('.bg-red-100');
	if (!alerta) {
		//crear alerta
		const alerta = document.createElement('div');

		alerta.classList.add(
			'bg-red-100',
			'border-red-400',
			'text-red-700',
			'px-4',
			'py-3',
			'rounded',
			'max-w-md',
			'mx-auto',
			'mt-6',
			'text-center'
		);

		alerta.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class='block'>${mensaje}</span>
    `;

		container.appendChild(alerta);

		//se elimina la alerta despues de 5 segundo
		setTimeout(() => {
			alerta.remove();
		}, 5000);
	}
}

function consultarAPI(ciudad, pais) {
	const apiID = '30ea7acda9d153d3523f3508b528e624';
	const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiID}`;

	Spinner();
	fetch(url)
		.then((respuesta) => respuesta.json())
		.then((datos) => {
			console.log(datos);

			limpiarHTML();
			if (datos.cod === '404') {
				mostrarError('Cuidad no encontrada');
				return;
			}
			// imprimir en el html
			mostrarClima(datos);
		});
}
