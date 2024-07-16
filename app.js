const logoPersona = document.querySelector(".imagen_logo_persona");
const texto_1 = document.getElementById("texto_1");
const texto_2 = document.getElementById("texto_2");
const resultadoTexto = document.querySelector(".resultado_texto");
const resultadoContenedor = document.querySelectorAll(".ocultar");
const copiarBoton = document.getElementById("boton_copiar");
const contenedorTexto = document.getElementById("contenedor_texto");

function validarEntrada(texto) {
    if (texto.trim() === "") {
        swal("Ooops!", "Debes ingresar un texto", "warning");
        return false;
    }
    return true;
}

const matrizCodigo = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

function encriptar(texto) {
    matrizCodigo.forEach(([elemento, encriptado]) => {
        texto = texto.replaceAll(elemento, encriptado);
    });
    return texto;
}

function desencriptar(texto) {
    matrizCodigo.forEach(([elemento, encriptado]) => {
        texto = texto.replaceAll(encriptado, elemento);
    });
    return texto;
}

function encriptarBoton() {
    const entrada = contenedorTexto.value;

    if (!validarEntrada(entrada)) {
        return;
    }

    ocultar();
    const salida = encriptar(entrada);
    resultadoTexto.textContent = salida;

    contenedorTexto.value = "";
    copiarBoton.innerText = "Copiar";
}

function desencriptarBoton() {
    const entradaTexto = contenedorTexto.value;

    if (!validarEntrada(entradaTexto)) {
        return;
    }

    ocultar();
    const salida = desencriptar(entradaTexto);
    resultadoTexto.textContent = salida;

    contenedorTexto.value = "";
    copiarBoton.innerText = "Copiar";
}

function ocultar() {
    logoPersona.classList.add("ocultar");
    texto_1.classList.add("ocultar");
    texto_2.classList.add("ocultar");
    resultadoContenedor[0].classList.add("activate");
    resultadoContenedor[1].classList.add("activate");
    resultadoTexto.classList.add("resultado_contenedor");
}

copiarBoton.addEventListener('click', () => {
    navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
            const contenido = resultadoTexto.textContent;
            const entradaTemporal = document.createElement("textarea");

            entradaTemporal.value = contenido;
            document.body.appendChild(entradaTemporal);
            entradaTemporal.select();
            document.execCommand("copy");
            document.body.removeChild(entradaTemporal);

            copiarBoton.innerText = "¡Copiado!";
        }
    });
});
