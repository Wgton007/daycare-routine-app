document.addEventListener('DOMContentLoaded', () => {

    // Proteção de login
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    const form = document.getElementById('childForm');

    // Carrega crianças do storage
    let children = JSON.parse(localStorage.getItem('children')) || [];

    // Verifica modo de edição
    const params = new URLSearchParams(window.location.search);
    const editId = params.get('id');

    // Preenche omformulário se para fazer  edição
    if (editId) {
        const child = children.find(c => c.id === Number(editId));
        if (child) {
            childName.value = child.name;
            birthDate.value = child.birthDate;
            guardianName.value = child.guardian;
            phone.value = child.phone;
            email.value = child.email;
            address.value = child.address;
            observations.value = child.observations || '';
        }
    }

    // Salvar formulário
    form.addEventListener('submit', e => {
        e.preventDefault();

        const data = {
            name: childName.value.trim(),
            birthDate: birthDate.value,
            guardian: guardianName.value.trim(),
            phone: phone.value.trim(),
            email: email.value.trim(),
            address: address.value.trim(),
            observations: observations.value.trim()
        };

        if (!data.name) {
            alert('Child Name is required');
            return;
        }

        if (editId) {
            // Atualiza
            const index = children.findIndex(c => c.id === Number(editId));
            children[index] = { id: Number(editId), ...data };
            alert('Child updated successfully!');
        } else {
            // ➕ Cria
            const newId = children.length
                ? Math.max(...children.map(c => c.id)) + 1
                : 1;

            children.push({ id: newId, ...data });
            alert('Child saved successfully!');
        }

        localStorage.setItem('children', JSON.stringify(children));

        // Volta para lista
        window.location.href = 'list.html';
    });

});