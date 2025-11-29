
const mostrarLoader = (contenedor) => {
    const loader = document.createElement("div");
    loader.classList.add("loader-dots");
    loader.id = "loaderTemp";

    loader.innerHTML = `
        <div></div>
        <div></div>
        <div></div>
    `;

    contenedor.appendChild(loader);
};

const ocultarLoader = () => {
    const loader = document.getElementById("loaderTemp");
    if (loader) loader.remove();
};

const mostrarTextoConPromesa = () => {
    const input = document.getElementById("inputTexto");
    const texto = input.value.trim();

    mostrarLoader(document.body);

    new Promise((resolve, reject) => {
        if (texto === "") {
            reject("Debe ingresar un texto");
        } else {
            setTimeout(() => resolve(texto), 1500);
        }
    })
    .then(msg => alert(`Mensaje recibido: ${msg}`))
    .catch(err => alert(err))
    .finally(() => {
        ocultarLoader();
        input.value = "";
    });
};

const formLista = document.getElementById("form");
const lista = document.getElementById("lista");

formLista.addEventListener("submit", e => {
    e.preventDefault();

    const texto = document.getElementById("texto").value.trim();

    mostrarLoader(lista);

    const agregarItem = new Promise((resolve, reject) => {
        if (texto === "") {
            reject("El texto no puede estar vacío");
        } else {
            setTimeout(() => resolve(texto), 1200);
        }
    });

    agregarItem
        .then(txt => {
            const li = document.createElement("li");
            li.textContent = txt;
            lista.appendChild(li);
        })
        .catch(err => alert(err))
        .finally(() => {
            ocultarLoader();
            formLista.reset();
        });
});

const form2 = document.getElementById("form2");

form2.addEventListener("submit", e => {
    e.preventDefault();

    mostrarLoader(form2);

    const num1 = parseFloat(document.getElementById("num1").value);
    const num2 = parseFloat(document.getElementById("num2").value);
    const resultado = document.getElementById("resultado");

    const sumarPromesa = new Promise((resolve, reject) => {
        if (isNaN(num1) || isNaN(num2)) {
            reject("Debe ingresar números válidos");
        } else {
            setTimeout(() => resolve(num1 + num2), 1500);
        }
    });

    sumarPromesa
        .then(suma => resultado.textContent = `Resultado: ${suma}`)
        .catch(err => alert(err))
        .finally(() => {
            ocultarLoader();
            form2.reset();
        });
});

const formRegistro = document.getElementById("formRegistro");
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const password = document.getElementById("password");

const errorNombre = document.getElementById("errorNombre");
const errorEmail = document.getElementById("errorEmail");
const errorPassword = document.getElementById("errorPassword");

const contenedorUsuarios = document.getElementById("usuarios");

// ---- PROMESAS DE VALIDACIÓN ----
const validarNombreP = () => {
    return new Promise((resolve, reject) => {
        if (nombre.value.trim().length < 3) {
            reject("El nombre debe tener al menos 3 caracteres");
        } else {
            resolve();
        }
    });
};

const validarEmailP = () => {
    return new Promise((resolve, reject) => {
        const regex = /\S+@\S+\.\S+/;
        if (!regex.test(email.value.trim())) {
            reject("El email no es válido");
        } else {
            resolve();
        }
    });
};

const validarPasswordP = () => {
    return new Promise((resolve, reject) => {
        if (password.value.length < 6) {
            reject("La contraseña debe tener mínimo 6 caracteres");
        } else {
            resolve();
        }
    });
};

formRegistro.addEventListener("submit", e => {
    e.preventDefault();

    errorNombre.textContent = "";
    errorEmail.textContent = "";
    errorPassword.textContent = "";

    mostrarLoader(formRegistro);

    Promise.allSettled([validarNombreP(), validarEmailP(), validarPasswordP()])
        .then(results => {
            let valido = true;

            if (results[0].status === "rejected") {
                errorNombre.textContent = results[0].reason;
                valido = false;
            }

            if (results[1].status === "rejected") {
                errorEmail.textContent = results[1].reason;
                valido = false;
            }

            if (results[2].status === "rejected") {
                errorPassword.textContent = results[2].reason;
                valido = false;
            }

            if (!valido) return;

            const usuario = {
                nombre: nombre.value.trim(),
                email: email.value.trim(),
                password: password.value.trim()
            };

            agregarUsuario(usuario);
            formRegistro.reset();
        })
        .finally(() => ocultarLoader());
});

const agregarUsuario = usuario => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
        <strong>${usuario.nombre}</strong><br>
        ${usuario.email}
    `;
    contenedorUsuarios.appendChild(card);
};
/* === EJERCICIO 5: VERIFICACIÓN DE CUPÓN === */
const formCupon = document.getElementById('formCupon');
const mensajeCupon = document.getElementById('mensajeCupon');

formCupon.addEventListener('submit', (e) => {
    e.preventDefault();

    const codigo = document.getElementById('codigoCupon').value.trim().toUpperCase();
    
    // Limpiamos mensajes previos
    mensajeCupon.textContent = "";
    mensajeCupon.style.color = "#333";

    mostrarLoader(formCupon);

    const verificarCupon = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (codigo === "DESC2024") {
                resolve("¡Éxito! El cupón del 20% ha sido aplicado.");
            } else if (codigo === "") {
                reject("Por favor, escribe un código.");
            } else {
                reject("El cupón ingresado no es válido o ha expirado.");
            }
        }, 2000);
    });

    verificarCupon
        .then((mensaje) => {
            mensajeCupon.style.color = "green";
            mensajeCupon.textContent = mensaje;
        })
        .catch((error) => {
            mensajeCupon.style.color = "red";
            mensajeCupon.textContent = error;
        })
        .finally(() => {
            ocultarLoader();
            if (mensajeCupon.style.color === "green") {
                document.getElementById('codigoCupon').value = "";
            }
        });
});