const input_file = document.getElementById('file_pdf');
const input_button = document.querySelector('.input-file-receiver-btn');
const input_display = document.querySelector('.input-file-receiver-selected');

let file_extension;

input_button.addEventListener('click', () => {
    input_file.click();
});

input_file.addEventListener('change', (e) => {
    let file_name = e.target.files[0].name;
    file_extension = file_name.split('.').pop().toLowerCase();
    
    console.log(`file name: ${file_name}\nfile's extension: ${file_extension}`)

    if (file_extension === 'pdf') {
        input_display.innerHTML = `<em>${file_name}</em>`;
    } else {
        input_display.innerHTML = `<em>Por favor, selecciona un archivo PDF</em>`;
    }
});