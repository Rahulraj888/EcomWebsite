document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        var emailInput = document.getElementById('registerEmail');
        var email = emailInput.value;
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email || !emailPattern.test(email)) {
            emailInput.classList.add('is-invalid');
            event.preventDefault();
        } else {
            emailInput.classList.remove('is-invalid');
            event.preventDefault(); // prevent form submission
            var toastElement = document.getElementById('registrationToast');
            var toast = new bootstrap.Toast(toastElement);
            toast.show();
            emailInput.value = ''; // clear the input field
        }
    });
});
