
const API_URL = '/eventos';
const cadastrar = document.querySelector('#form-cadastro');

async function listarEventos() {
    try {
        const response = await fetch(API_URL);
        const eventos = await response.json();

        const tabelaBody = document.querySelector('#tabela-eventos tbody');
        if (tabelaBody) {
            tabelaBody.innerHTML = ''; 

            eventos.forEach(evento => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${evento.id}</td>
                    <td>${evento.titulo}</td>
                    <td>${evento.descricao}</td>
                    <td>${new Date(evento.data).toLocaleDateString()}</td>
                    <td>${evento.hora}</td>
                    <td>Lat: ${evento.localizacao.coordinates[0]}, Lng: ${evento.localizacao.coordinates[1]}</td>
                    <td class="actions">
                        <button onclick="abrirEditarEvento('${evento.id}')">Editar</button>
                        <button onclick="excluirEvento('${evento.id}')">Excluir</button>
                    </td>
                `;
                tabelaBody.appendChild(row);
            });
        } else {
            console.error('Elemento da tabela de eventos não encontrado. Verifique o HTML.');
        }
    } catch (err) {
        console.error('Erro ao listar eventos:', err);
        alert('Não foi possível carregar os eventos.');
    }
}


if (cadastrar) {
    cadastrar.addEventListener('submit', async function (event) {
        event.preventDefault();

        const titulo = document.querySelector('#titulo').value;
        const descricao = document.querySelector('#descricao').value;
        const data = document.querySelector('#data').value;
        const hora = document.querySelector('#hora').value;
        const localizacao = document.querySelector('#localizacao').value;

        const evento = {
            titulo,
            descricao,
            data,
            hora,
            publico_alvo: "Público Geral",
            localizacao: {
                type: "Point",
                coordinates: localizacao.split(',').map(coord => parseFloat(coord.trim()))
            }
        };

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(evento)
            });

            if (response.ok) {
                alert('Evento cadastrado com sucesso!');
                fecharModal('modal-cadastro');
                listarEventos();
            } else {
                const error = await response.json();
                alert(`Erro ao cadastrar evento: ${error.message || 'Erro desconhecido'}`);
            }

            
        } catch (err) {
            console.error('Erro ao cadastrar evento:', err);
            alert('Não foi possível cadastrar o evento.');
        }
    });
} else {
    console.error('Formulário de cadastro não encontrado. Verifique o HTML.');
}

async function abrirEditarEvento(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        const dados = await response.json();

        // Preenche os campos do formulário de edição
        const tituloField = document.querySelector('#edit-titulo');
        const descricaoField = document.querySelector('#edit-descricao');
        const dataField = document.querySelector('#edit-data');
        const horaField = document.querySelector('#edit-hora');
        const localizacaoField = document.querySelector('#edit-localizacao');

        if (tituloField && descricaoField && dataField && horaField && localizacaoField) {
            tituloField.value = dados.titulo;
            descricaoField.value = dados.descricao;
            dataField.value = new Date(dados.data).toLocaleDateString();
            horaField.value = dados.hora;
            localizacaoField.value = dados.localizacao.coordinates.join(', ');

            // Configura o botão de salvar com o ID do evento
            const salvarEdicao = document.querySelector('#form-editar');
            if (salvarEdicao) {
                salvarEdicao.onsubmit = function (event) {
                    event.preventDefault();
                    editarEvento(id);
                };
            }

            abrirModal('modal-editar');
        } else {
            console.error('Campos do formulário de edição não encontrados. Verifique o HTML.');
        }
    } catch (err) {
        console.error('Erro ao buscar evento para edição:', err);
        alert('Não foi possível carregar os dados do evento.');
    }
}


async function editarEvento(id) {
    const updatedEvento = {
        titulo: document.querySelector('#edit-titulo').value,
        descricao: document.querySelector('#edit-descricao').value,
        data: document.querySelector('#edit-data').value,
        hora: document.querySelector('#edit-hora').value,
        localizacao: {
            type: "Point",
            coordinates: document.querySelector('#edit-localizacao').value.split(',').map(coord => parseFloat(coord.trim()))
        }
    };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            params: { id },
            body: JSON.stringify(updatedEvento)
        });

        if (response.ok) {
            alert('Evento atualizado com sucesso!');
            fecharModal('modal-editar');
            listarEventos();
        } else {
            const error = await response.json();
            alert(`Erro ao atualizar evento: ${error.message || 'Erro desconhecido'}`);
        }
    } catch (err) {
        console.error('Erro ao atualizar evento:', err);
        alert('Não foi possível atualizar o evento.');
    }

    
}

async function excluirEvento(id) {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Evento excluído com sucesso!');
                listarEventos();
            } else {
                const error = await response.json();
                alert(`Erro ao excluir evento: ${error.message || 'Erro desconhecido'}`);
            }
    
        } catch (err) {
            console.error('Erro ao excluir evento:', err);
            alert('Não foi possível excluir o evento.');
        }
    }
}

if (document.querySelector('#tabela-eventos tbody')) {
    listarEventos();
} else {
    console.error('Tabela de eventos não encontrada no HTML. Verifique a estrutura do documento.');
}

// Abre um modal especificado
function abrirModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
}

// Fecha um modal especificado
function fecharModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function mostrarLista() {
    const listaEventos = document.getElementById('lista-eventos');
    if (listaEventos) {
        if (listaEventos.style.display === 'block') {
            listaEventos.style.display = 'none';
        } else {
            listaEventos.style.display = 'block';
            listarEventos(); // Atualiza a lista ao exibir
        }
    } else {
        console.error('Elemento da lista de eventos não encontrado. Verifique o HTML.');
    }
}
