// Espera a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (e) {
        // Previene el envío del formulario
        e.preventDefault();
        // Limpia errores previos
        clearErrors();

        // Bandera para saber si el formulario es válido
        let isValid = true;

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Validación del campo 'Nombre'
        if (nameInput.value.trim() === '') {
            isValid = false;
            showError(nameInput, 'El campo nombre no puede estar vacío');
        }

        // Validación del campo 'Correo electrónico'
        if (emailInput.value.trim() === '') {
            isValid = false;
            showError(emailInput, 'El campo correo electrónico no puede estar vacío');
        } else {
            // Uso de validator.js para validar el correo electrónico
            if (typeof validator !== 'undefined' && typeof validator.isEmail === 'function') {
                if (!validator.isEmail(emailInput.value)) {
                    isValid = false;
                    showError(emailInput, 'Por favor, ingresa un correo electrónico válido');
                }
            } else {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!re.test(emailInput.value)) {
                    isValid = false;
                    showError(emailInput, 'Por favor, ingresa un correo electrónico válido');
                }
            }
        }
        
        /*else if (!validateEmail(emailInput.value)) {
            isValid = false;
            showError(emailInput, 'Por favor, ingresa un correo electrónico válido');
        }*/

        // Validación del campo 'Mensaje'
        if (messageInput.value.trim() === '') {
            isValid = false;
            showError(messageInput, 'El campo mensaje no puede estar vacío');
        }

        // Si el formulario es válido, se envía
        if (isValid) {
            console.log('Formulario válido');
            form.submit();
        }
    });

    // Función para validar el formato del correo electrónico
    /*function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }*/

    // Función para mostrar mensajes de error
    function showError(input, message) {
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        errorSpan.style.color = 'red';
        errorSpan.textContent = message;
        // Inserta el mensaje de error después del elemento padre del input
        input.parentElement.appendChild(errorSpan);
        // Añade atributos para mejorar accesibilidad
        input.setAttribute('aria-describedby', 'error-' + input.id);
        errorSpan.id = 'error-' + input.id;
    }

    // Función para limpiar los errores previos
    function clearErrors() {
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(function (message) {
            message.remove();
        });
    }
})
