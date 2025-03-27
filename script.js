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
        } else if (!validateEmail(emailInput.value)) {
            isValid = false;
            showError(emailInput, 'Por favor, ingresa un correo electrónico válido');
        }

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

    