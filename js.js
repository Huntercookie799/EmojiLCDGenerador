document.addEventListener('DOMContentLoaded', index);

function index() {
    const grid = document.getElementById('grid');
    const outputText = document.getElementById('outputText');
    const variableNameInput = document.getElementById('variableName');

    // Crear celdas de la cuadrícula
    for (let i = 0; i < 40; i++) {
        const item = document.createElement('div');
        item.classList.add('grid-item');
        item.textContent = '0';

        // Evento para alternar entre 0 y 1 al hacer clic
        item.addEventListener('click', () => {
            if (item.textContent === '0') {
                item.textContent = '1';
                item.classList.add('active'); // Agregar clase activa
            } else {
                item.textContent = '0';
                item.classList.remove('active'); // Quitar clase activa
            }
        });

        grid.appendChild(item);
    }

    // Evento para generar la matriz al hacer clic en el botón
    document.getElementById('generateMatrix').addEventListener('click', () => {
        const matriz = [];
        for (let row = 0; row < 8; row++) {
            let fila = '';
            for (let col = 0; col < 5; col++) {
                const index = row * 5 + col;
                fila += grid.children[index].textContent;
            }
            matriz.push(`B${fila}`);
        }

        // Obtener el nombre de la variable desde el campo de entrada
        const variableName = variableNameInput.value || 'matriz'; // Usar 'matriz' como nombre por defecto si está vacío

        // Mostrar la matriz en el cuadro de salida
        outputText.textContent = `byte ${variableName}[8] = {\n`;
        matriz.forEach((row, index) => {
            outputText.textContent += `  ${row}${index < matriz.length - 1 ? ',' : ''}\n`;
        });
        outputText.textContent += '};';
    });

    // Evento para copiar la matriz al portapapeles
    document.getElementById('copyToClipboard').addEventListener('click', () => {
        const textToCopy = outputText.textContent;

        // Copiar al portapapeles
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Matriz copiada al portapapeles!');
        }).catch(err => {
            console.error('Error al copiar: ', err);
        });
    });
}

index();
