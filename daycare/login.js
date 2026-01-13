document.addEventListener('DOMContentLoaded', () => {

    // Pega o formulário e o elemento de erro
    const form = document.getElementById('loginForm');
    const errorText = document.getElementById('loginError');

    // Dispara evento ao enviar formulário
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // evita recarregar página

        // Limpa mensagem de erro anterior
        errorText.textContent = '';

        // Pega valores digitados
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value.trim();

        // ---------- Login fixo para teste ----------
        if (username === 'ElysDay' && password === 'C@re26') {
            localStorage.setItem('isLoggedIn', 'true'); // marca usuário como logado
            window.location.href = 'home.html';         // redireciona para Home
        } else {
            // Se usuário ou senha estiverem errados
            errorText.textContent = 'Invalid username or password';
        }
    });

});