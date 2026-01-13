// Espera a página carregar
document.addEventListener('DOMContentLoaded', () => {

    // ----Protecao de LOGIN-----
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    const tableBody = document.getElementById('childrenTableBody');
    const btnPrint = document.getElementById('btnPrintPDF');

    // Lista de crianças do localStorage
    const children = JSON.parse(localStorage.getItem('children')) || [];

    // ----FUNÇÃO PARA FORMATAR DATA ----

    // Formato: de YYYY-MM-DD para MM/DD/YY
    function formatDateUS(dateStr) {
        if (!dateStr) return '';
        const [y, m, d] = dateStr.split('-');
        return `${m}/${d}/${y.slice(-2)}`;
    }

    // ---- FUNÇÃO PARA RENDERIZAR TABELA ----
    function renderTable() {
        tableBody.innerHTML = ''; // limpa a tabela antes de renderizar

        if (children.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="9" style="text-align:center;">No children registered</td>
                </tr>
            `;
            return;
        }

        children.forEach(child => {
            const row = document.createElement('tr');

            // Adiciona classes de coluna para respeitar CSS
            row.innerHTML = `
                <td class="col-id">${child.id}</td>
                <td class="col-name">${child.name}</td>
                <td class="col-date">${formatDateUS(child.birthDate)}</td>
                <td class="col-guardian">${child.guardian}</td>
                <td class="col-phone">${child.phone}</td>
                <td class="col-email">${child.email}</td>
                <td class="col-address">${child.address}</td>
                <td class="col-notes">${child.observations || ''}</td>
                <td class="col-actions">
                    <button onclick="editChild(${child.id})">Edit</button>
                    <button onclick="deleteChild(${child.id})">Delete</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    // ---- Funcao para Deletar Crianca ----

    window.deleteChild = (id) => {
        if (confirm('Delete this child?')) {
            const idx = children.findIndex(c => c.id == id);
            if (idx !== -1) {
                children.splice(idx, 1); // remove do array
                localStorage.setItem('children', JSON.stringify(children)); // salva
                renderTable(); // atualiza tabela
            }
        }
    };

    // ---- Funcao para editar Crianca----
    window.editChild = (id) => {
        window.location.href = `index.html?id=${id}`; // redireciona para edição
    };

    // ------Botao PRINT / SAVE PDF ------
    btnPrint.addEventListener('click', () => {
        window.print(); // usa print do navegador
    });

    // -------Inicia Tabela-----
    renderTable();

});