document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");
    const errorMessage = document.createElement("p"); 
    const successMessage = document.createElement("p"); 

  
    errorMessage.id = "error-message";
    successMessage.id = "success-message";

    errorMessage.style.color = "#f44336"; 
    successMessage.style.color = "#4caf50"; 

    errorMessage.style.marginTop = "0.5rem";
    successMessage.style.marginTop = "0.5rem";

    errorMessage.style.display = "none"; 
    successMessage.style.display = "none"; 


    registerForm.appendChild(errorMessage);
    registerForm.appendChild(successMessage);
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        window.location.href = "tablero.html"; 
    });

    
    document.getElementById("registerLink").addEventListener("click", (e) => {
        e.preventDefault();
        loginForm.style.display = "none";
        registerForm.style.display = "block";
        errorMessage.style.display = "none"; 
        successMessage.style.display = "none"; 
    });

   
    document.getElementById("loginLink").addEventListener("click", (e) => {
        e.preventDefault();
        registerForm.style.display = "none";
        loginForm.style.display = "block";
    });


    function validatePasswords() {
        const password = document.getElementById("newPassword").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            errorMessage.textContent = "⚠️ Las contraseñas no coinciden. Por favor, verifica.";
            errorMessage.style.display = "block";
            successMessage.style.display = "none";
            return false;
        } else {
            errorMessage.style.display = "none";
            return true;
        }
    }

  
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        if (validatePasswords()) {
            successMessage.textContent = "✅ Cuenta creada con éxito. Ahora puedes iniciar sesión.";
            successMessage.style.display = "block";
            errorMessage.style.display = "none"; 

          
            registerForm.reset();
            setTimeout(() => {
                successMessage.style.display = "none";
                registerForm.style.display = "none";
                loginForm.style.display = "block";
            }, 2000); 
    });
});


function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = event.currentTarget;

    if (input.type === "password") {
        input.type = "text";
        button.textContent = "🔒";
    } else {
        input.type = "password";
        button.textContent = "👁️";
    }
}
