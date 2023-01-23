const input_file = document.getElementById('file_pdf');
const input_button = document.querySelector('.input-file-receiver-btn');
const input_display = document.querySelector('.input-file-receiver-selected');
const select = document.querySelector('select');

console.log(`select's initial value: ${select.value}`)
if (select.value == '') {
    select.setAttribute('style', 'color:grey');
}
select.addEventListener('change', () => {
    select.setAttribute('style', 'color:#160b17')
});

input_button.addEventListener('click', () => {
    input_file.click();
});

input_file.addEventListener('change', (e) => {
    let file_name = input_file.files[0].name;
    let file_extension = file_name.split('.').pop().toLowerCase();

    if (file_extension === 'pdf') {
        input_display.innerHTML = `<em>${file_name}</em>`;
    } else {
        input_display.innerHTML = `<em>Por favor, selecciona un archivo PDF</em>`;
        input_file.value = '';
        return;
    }

    if (input_file.files[0].size > 5242880) {
        input_display.innerHTML = `<em>El tamaño no puede ser más de 5MB</em>`;
        input_file.value = '';
    }
});