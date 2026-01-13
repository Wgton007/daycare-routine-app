document.addEventListener('DOMContentLoaded', () => {

    // ----Protecao de Login-----
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    const tableBody = document.getElementById('attendanceTableBody');
    const dateSelect = document.getElementById('dateSelect');
    const saveBtn = document.getElementById('saveAttendance');

    const children = JSON.parse(localStorage.getItem('children')) || [];
    const attendanceLog = JSON.parse(localStorage.getItem('attendanceLog')) || {};

    // ------Funcoes de Datas----
    function todayLocalISO() {
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const d = String(now.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }

    // ---------- POPULA DROPDOWN DE DATAS ----------
    const today = todayLocalISO();
    const dates = Object.keys(attendanceLog);

    if (!dates.includes(today)) {
        dates.push(today);
    }

    dates.sort().forEach(date => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = date;
        dateSelect.appendChild(option);
    });

    dateSelect.value = today;

    // ----Organiza tabela-----
    function renderTable(selectedDate) {
        tableBody.innerHTML = '';

        if (children.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="3" style="text-align:center;">
                        No children registered
                    </td>
                </tr>
            `;
            return;
        }

        children.forEach(child => {
            const present =
                attendanceLog[selectedDate]?.[child.id] ?? false;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${child.id}</td>
                <td>${child.name}</td>
                <td>
                    <input 
                        type="checkbox" 
                        class="present-checkbox"
                        data-id="${child.id}"
                        ${present ? 'checked' : ''}
                    >
                </td>
            `;

            tableBody.appendChild(tr);
        });
    }

    // ----Troca de Data----
    dateSelect.addEventListener('change', () => {
        renderTable(dateSelect.value);
    });

    // ----Salva Presenca----
    saveBtn.addEventListener('click', () => {
        const selectedDate = dateSelect.value;

        // Só cria o dia quando o usuário salva
        if (!attendanceLog[selectedDate]) {
            attendanceLog[selectedDate] = {};
        }

        document
            .querySelectorAll('.present-checkbox')
            .forEach(cb => {
                const id = cb.dataset.id;
                attendanceLog[selectedDate][id] = cb.checked;
            });

        localStorage.setItem(
            'attendanceLog',
            JSON.stringify(attendanceLog)
        );

        alert('Attendance saved successfully!');
    });

    // ---------- INICIALIZA EM BRANCO ----------
    // Faz com que hoje nao vem marcado automaticamente
    renderTable(today);
});