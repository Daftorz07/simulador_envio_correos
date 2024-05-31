
document.addEventListener('DOMContentLoaded', () => {

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // Variables
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const bntReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    // Eventos
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);

    bntReset.addEventListener('click', (e) => {
        e.preventDefault();
        resetFormulario();
    })

    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            resetFormulario();

            const alertaExito = document.createElement('p');
            alertaExito.classList.add('bg-green-600', 'p-2', 'text-center', 'mt-10', 'rounded-lg');
            alertaExito.textContent = 'Email enviado correctamente';
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 1500);
            
        }, 1500);
    }

    function validar(e) {

        const mensaje = `El campo ${e.target.id} es obligatorio`;
        const referencia = e.target.parentElement;

        if (e.target.value.trim() === '') {
            mostrarAlerta(mensaje, referencia);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if (e.target.id === 'email' && !validarEmial(e.target.value)) {
            mostrarAlerta('Email no valido', referencia);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        //Quitar la alerta si se ingresa la información
        limpiarAlerta(referencia);

        //Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        //Validando el email completo
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) {

        //Validar si hay una alerta previa
        const alerta = referencia.querySelector('.bg-red-600');

        if (alerta) {
            alerta.remove();
        }

        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'text-center', 'p-2', 'border', 'rounded-lg', 'border');
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {

        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmial(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email); // True o False
        return resultado;

    }

    function comprobarEmail() {

        console.log(email);
        // Si al menos un campo esta vacio retorna true
        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
        } else {
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        }

    }

    function resetFormulario() {

        //Resetear el formulario
        formulario.reset();

        //Reiniciar el objeto email
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        comprobarEmail();
    }
})