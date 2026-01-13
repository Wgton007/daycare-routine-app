document.addEventListener('DOMContentLoaded', () => {

    // ----Proteção de login ----
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return; // interrompe execução
    }

    // ----- Botões de navegação -----
    // Registro de nova criança
    document.getElementById('btnRegister').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Lista de crianças
    document.getElementById('btnList').addEventListener('click', () => {
        window.location.href = 'list.html';
    });

    // Check-in diário
    document.getElementById('btnCheckIn').addEventListener('click', () => {
        window.location.href = 'attendance.html';
    });

    // Relatórios de presença
    document.getElementById('btnDailyReport').addEventListener('click', () => {
        window.location.href = 'attendance-report.html';
    });

    // Backup e emails
    document.getElementById('btnBackup').addEventListener('click', () => {
        window.location.href = 'backup.html';
    });

    // -----Logout----
    document.getElementById('btnLogout').addEventListener('click', () => {
        localStorage.removeItem('isLoggedIn'); // remove login
        window.location.href = 'login.html';    // volta para login
    });

});