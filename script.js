// Espera a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const notification = document.getElementById('notification');
    const spinner = document.getElementById('spinner');

    form.addEventListener('submit', function (e) {
        // Previene el envío del formulario
        e.preventDefault();
        // Limpia errores previos y notificaciones
        clearErrors();
        clearNotification();

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
                // Fallback a una expresión regular si validator.js no está disponible
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
        /* if (isValid) {
            console.log('Formulario válido');
            form.submit();
        }
    }); */

        if (!isValid) {
            const firstErrorField = document.querySelector('.error-message').previousElementSibling;
            if (firstErrorField) {
                firstErrorField.focus(); // Enfoca el primer campo con error
            }
            // Muestra una notificación de error
            showNotification('Por favor, corrige los errores en el formulario.', 'error');
            return; // Detiene la ejecución si hay errores

        }

        // Si el formulario es válido, muestra una notificación de éxito
        spinner.hidden = false; // Muestra el spinner de carga


        // Si el formulario es válido, enviarlo mediante AJAX usando fetch
            // Recopilar los datos del formulario en formato JSON
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                message: messageInput.value.trim()
            };

            // Función para validar el formato del correo electrónico
            /*function validateEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }*/

            fetch('http://localhost:3000/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

                .then(response => {
                    spinner.hidden = true; // Oculta el spinner de carga
                    if (!response.ok) {
                        throw new Error('Error en la respuesta del servidor');
                    }
                    return response.json();
                })

                .then(data => {
                    console.log('Formulario enviado:', data);
                    form.reset(); // Limpia el formulario después de enviar
                    showNotification('Formulario enviado con éxito', 'success');
                })
                .catch(error => {
                    spinner.hidden = true; // Oculta el spinner de carga
                    console.error('Error al enviar el formulario:', error);
                    // Aquí puedes mostrar un mensaje de error al usuario
                    showNotification('Error al enviar el formulario. Intenta nuevamente más tarde.', 'error');
                });
    });

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

    // Función para mostrar notificaciones
    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = type;
    }

    // Función para limpiar la notificación
    function clearNotification() {
        notification.textContent = '';
        notification.className = '';
    }
});
