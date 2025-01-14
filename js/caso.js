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