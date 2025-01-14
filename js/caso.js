// Seleccionar todos los botones
const buttons = document.querySelectorAll('.group-item-ejecutivo');
// Obtener la celda correspondiente (columna 2)
const container = this.document.getElementById('iframe-pdf');
buttons.forEach(button => {
  button.addEventListener('click', function () {
    // Obtener el URL del iframe desde el atributo data-url
    const url = this.dataset.url;

    // Crear o reemplazar el iframe
    container.innerHTML = `<iframe src="${url}" style="width:100%;height:500px"></iframe>`;
  });
});

// URL del archivo JSON
const url = 'datos/ObtenerExpedientes.json';
// Seleccionar el tbody
const tbody = document.getElementById('tabla-casos');

function convertirFecha(fechaRaw) {
  const timestamp = parseInt(fechaRaw.match(/\d+/)[0], 10);
  const fecha = new Date(timestamp);
  const fechaLegible = fecha.toLocaleString();
  return fechaLegible;
}

// Función para cargar y mostrar los datos
const cargarDatos = async () => {
  try {
    // Hacer la solicitud al archivo JSON
    const respuesta = await fetch(url);

    // Verificar si la respuesta es exitosa
    if (!respuesta.ok) {
      throw new Error(`Error al cargar los datos: ${respuesta.statusText}`);
    }

    // Convertir la respuesta a JSON
    const casos = await respuesta.json();

    // Generar filas dinámicas
    casos.forEach(caso => {
      const tr = document.createElement('tr');
      tr.setAttribute('role', 'row');
      tr.className = 'group-item group-item-JUZ-PAZ';
      tr.setAttribute('data-group', 'JUZ-PAZ');

      // Configurar el redireccionamiento
      tr.setAttribute('onclick', `window.location.href='caso.html?id=${caso.CodCasoJudicial}'`);

      // Agregar celdas
      tr.innerHTML = `
        <td>${caso.NroExpedienteNumero}</td>
        <td>${caso.NroExpedienteAnio}</td>
        <td>${convertirFecha(caso.FechaSorteo)}</td>
        <td>${caso.Caratula}</td>
        <td>${caso.EstadoCasoDespacho}</td>
      `;

      // Agregar la fila a la tabla
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Error al cargar los datos:', error);
  }
};

// Llamar a la función para cargar datos
cargarDatos();
