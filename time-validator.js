const input = document.querySelector('input[type="time"]');

input.addEventListener('input', function(event) {
  if (event.target.value < '14:00' || event.target.value > '21:00') {
    input.setCustomValidity('Por favor ingresa la hora entre 2:00 PM y 9:00 PM');
  } else {
    input.setCustomValidity('');
  }
});
