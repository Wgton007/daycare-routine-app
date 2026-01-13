document.addEventListener('DOMContentLoaded', () => {

    // ---------- Proteção de login ----------
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    const children = JSON.parse(localStorage.getItem('children')) || [];
    const attendanceLog = JSON.parse(localStorage.getItem('attendanceLog')) || {};

    const emailSelect  = document.getElementById('emailSelect');
    const emailSubject = document.getElementById('emailSubject');
    const emailBody    = document.getElementById('emailBody');

    // ---------- Popula Select ----------
    const parentsMap = new Map();

    children.forEach(child => {
        if (child.email && child.guardian) {
            parentsMap.set(child.email, child.guardian);
        }
    });

    parentsMap.forEach((name, email) => {
        const option = document.createElement('option');
        option.value = email;
        option.textContent = `${name} (${email})`;
        emailSelect.appendChild(option);
    });

    emailSelect.selectedIndex = 0; // começa vazio

    // ------Enviar Email ----------
    document.getElementById('btnSendEmail').addEventListener('click', () => {

        const to = emailSelect.value;

        if (!to) {
            alert('Please select a recipient.');
            return;
        }

        const subject = encodeURIComponent(
            emailSubject.value || 'Message from Ely’s Day Care'
        );

        const header =
`🌈 Ely’s Day Care
Licensed Child Care Provider

📍 59–61 Bonair St, Somerville MA
📞 Phone: (781) 866-1648
👨‍🏫 George Lane – Diretor Geral
----------------------------------`;

        const message = emailBody.value || '';

        let recipients = '';

        if (to === 'ALL') {
            recipients = Array.from(parentsMap.keys()).join(',');
        } else {
            recipients = to;
        }

        const body = encodeURIComponent(
            header + '\n\n' + message
        );

        window.location.href = `mailto:${recipients}?subject=${subject}&body=${body}`;
    });

    // ---------- Download JSON ----------
    document.getElementById('btnDownloadJSON').addEventListener('click', () => {

        const backupData = {
            children,
            attendanceLog,
            createdAt: new Date().toISOString()
        };

        const blob = new Blob(
            [JSON.stringify(backupData, null, 2)],
            { type: 'application/json' }
        );

        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'elys-daycare-backup.json';
        a.click();
        URL.revokeObjectURL(a.href);
    });

    // ---------- Salvar PDF ----------
    document.getElementById('btnSavePDF').addEventListener('click', () => {
        window.location.href = 'attendance-report.html';
    });

    // ---------- Abrir Google Drive ----------
    document.getElementById('btnOpenDrive').addEventListener('click', () => {
        window.open('https://drive.google.com/drive/my-drive', '_blank');
    });

});