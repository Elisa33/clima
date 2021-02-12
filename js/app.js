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
