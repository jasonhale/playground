const inputs = document.querySelectorAll('input[type=password]');

inputs.forEach((input) => {
  const parent = input.closest('.input-wrap');
  const display = parent.querySelector('.p-view');
  const toggle = parent.querySelector('button[type=button]');
  
  toggle.addEventListener('click', eyeToggle(parent));
  
  input.addEventListener('change', displayToggle(display));
});

function eyeToggle(parent) {
  return (e) => {
    console.info('toggle!');
    const button = e.target;
    button.classList.toggle('fa-eye');
    button.classList.toggle('fa-eye-slash');
    parent.classList.toggle('view');
  }
}

function displayToggle(display) {
  return (e) => {
    console.log('input change', e.target.value);
    display.innerText = e.target.value;
  }
}