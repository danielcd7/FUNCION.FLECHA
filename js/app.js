window.addEventListener('DOMContentLoaded', () => {
    alert('Bienvenido a la página de Funciones Flecha en JavaScript');
});

const mostrarTexto = () => {
    const input = document.getElementById('inputTexto');
    const texto = input.value.trim();

    if (!texto) return alert('Por favor, ingrese un texto');

    alert(`Texto ingresado: ${texto}`);
    input.value = '';
};

const formLista = document.getElementById('form');
const lista = document.getElementById('lista');

formLista.addEventListener('submit', (e) => {
    e.preventDefault();

    const texto = document.getElementById('texto').value.trim();
    if (!texto) return alert('Por favor, ingrese un texto');

    const li = document.createElement('li');
    li.textContent = texto;
    lista.appendChild(li);

    formLista.reset();
});

const form2 = document.getElementById('form2');

form2.addEventListener('submit', (e) => {
    e.preventDefault();

    const num1 = parseFloat(document.getElementById('num1').value);
    const num2 = parseFloat(document.getElementById('num2').value);
    const resultado = document.getElementById('resultado');

    if (isNaN(num1) || isNaN(num2)) {
        return alert('Por favor, ingrese números válidos');
    }

    const sumar = (a, b) => a + b;

    resultado.textContent = `Resultado: ${sumar(num1, num2)}`;
    form2.reset();
});

const formRegistro = document.getElementById("formRegistro");

const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const password = document.getElementById("password");

const errorNombre = document.getElementById("errorNombre");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");

const contenedorUsuarios = document.getElementById("usuarios");

const validarNombre = () => {
    if (nombre.value.trim().length < 3) {
        errorNombre.textContent = "El nombre debe tener al menos 3 caracteres";
        return false;
    }
    errorNombre.textContent = "";
    return true;
};

const validarEmail = () => {
    const regex = /\S+@\S+\.\S+/;
    if (!regex.test(email.value.trim())) {
        errorEmail.textContent = "Ingrese un email válido";
        return false;
    }
    errorEmail.textContent = "";
    return true;
};

const validarPassword = () => {
    if (password.value.length < 6) {
        errorPassword.textContent = "La contraseña debe tener mínimo 6 caracteres";
        return false;
    }
    errorPassword.textContent = "";
    return true;
};

nombre.addEventListener("input", validarNombre);
email.addEventListener("input", validarEmail);
password.addEventListener("input", validarPassword);

formRegistro.addEventListener("submit", (e) => {
    e.preventDefault();

    const valido = 
        validarNombre() &
        validarEmail() &
        validarPassword();
    
    if (!valido) {
        alert("Por favor, corrija los errores antes de continuar.");
        return;
    }

    const usuario = {
        nombre: nombre.value.trim(),
        email: email.value.trim()
    };

    agregarUsuario(usuario);
    formRegistro.reset();
});

const agregarUsuario = (usuario) => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
        <strong>${usuario.nombre}</strong><br>
        ${usuario.email}
    `;
    contenedorUsuarios.appendChild(card);
};
const formTemperatura = document.getElementById('formTemperatura');
const resultadoTemp = document.getElementById('resultadoTemp');

formTemperatura.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const celsius = parseFloat(document.getElementById('celsius').value);

    if (isNaN(celsius)) {
        return alert('Por favor, ingresa un valor numérico.');
    }

    // Función flecha en una sola línea para la conversión
    const convertirAFahrenheit = c => (c * 9/5) + 32;

    const fahrenheit = convertirAFahrenheit(celsius);
    resultadoTemp.textContent = `${celsius}°C equivalen a ${fahrenheit.toFixed(1)}°F`;
});