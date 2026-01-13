document.addEventListener('DOMContentLoaded', () => {

    // ----LOGIN----
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    const children = JSON.parse(localStorage.getItem('children')) || [];
    const attendanceLog = JSON.parse(localStorage.getItem('attendanceLog')) || {};

    const tableBody  = document.querySelector('#reportTable tbody');
    const dailyDate  = document.getElementById('dailyDate');
    const startDate  = document.getElementById('startDate');
    const endDate    = document.getElementById('endDate');
    const modeInputs = document.querySelectorAll('input[name="mode"]');
    const printBtn   = document.getElementById('btnPrint');

    // ----Datas (Local, EUA)----
    function todayLocalISO() {
        const now = new Date();
        const y = now.getFullYear();
        const m = String(now.getMonth() + 1).padStart(2, '0');
        const d = String(now.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }

    function parseISO(dateStr) {
        const [y, m, d] = dateStr.split('-').map(Number);
        return new Date(y, m - 1, d);
    }

    function formatISO(dateObj) {
        const y = dateObj.getFullYear();
        const m = String(dateObj.getMonth() + 1).padStart(2, '0');
        const d = String(dateObj.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }

    function toUS(dateStr) {
        const [y, m, d] = dateStr.split('-');
        return `${m}/${d}/${y.slice(-2)}`;
    }

    // ---------- Inicializa as Datas ----------
    const today = todayLocalISO();
    dailyDate.value = today;
    startDate.value = today;
    endDate.value   = today;

    // ---------- Render ----------
    function renderReport() {
        tableBody.innerHTML = '';

        const mode = document.querySelector('input[name="mode"]:checked').value;
        let dates = [];

        if (mode === 'daily') {
            dates.push(dailyDate.value);
        }

        if (mode === 'range') {
            let current = parseISO(startDate.value);
            const end = parseISO(endDate.value);

            while (current <= end) {
                dates.push(formatISO(current));
                current.setDate(current.getDate() + 1);
            }
        }

        let found = false;

        dates.forEach(date => {
            children.forEach(child => {
                if (attendanceLog[date]?.[child.id]) {
                    found = true;

                    const tr = document.createElement('tr');
                    tr.innerHTML = `
                        <td class="col-id">${child.id}</td>
                        <td class="col-name">${child.name}</td>
                        <td class="col-date">${toUS(date)}</td>
                    `;
                    tableBody.appendChild(tr);
                }
            });
        });

        if (!found) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="3" style="text-align:center;">
                        No attendance records found.
                    </td>
                </tr>
            `;
        }
    }

    // ---------- Eventos ----------
    dailyDate.addEventListener('change', renderReport);
    startDate.addEventListener('change', renderReport);
    endDate.addEventListener('change', renderReport);
    modeInputs.forEach(r => r.addEventListener('change', renderReport));

    printBtn.addEventListener('click', () => window.print());

    // ---------- INIT ----------
    renderReport();
});