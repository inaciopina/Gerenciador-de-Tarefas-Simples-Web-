function incluirTarefa() {
    const nomeDaTarefa = document.getElementById('nomeDaTarefa').value;
    if (!nomeDaTarefa) {
        alert('Por favor, insira o nome da tarefa.');
        return;
    }

    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.push({ nome: nomeDaTarefa, status: 'A concluir' });
    localStorage.setItem('tarefas', JSON.stringify(tarefas));

    document.getElementById('nomeDaTarefa').value = '';
    alert('Tarefa incluída com sucesso!');
}

function tratarTarefas() {
    document.getElementById('inclusao-tarefas').classList.add('hidden');
    document.getElementById('tratar-tarefas').classList.remove('hidden');

    const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

    if (tarefas.length === 0) {
        document.getElementById('tabela-tarefas').innerHTML = '<p>Não há tarefas para serem tratadas.</p>';
        return;
    }

    let tabela = '<table><tr><th>Nome da Tarefa</th><th>Status da Tarefa</th><th>Ações</th></tr>';
    tarefas.forEach((tarefa, index) => {
        tabela += `<tr>
            <td>${tarefa.nome}</td>
            <td>${tarefa.status}</td>
            <td>
                <button onclick="alterarStatus(${index})">${tarefa.status === 'A concluir' ? 'Concluir' : 'Desmarcar'}</button>
                <button onclick="excluirTarefa(${index})">Excluir</button>
            </td>
        </tr>`;
    });
    tabela += '</table>';

    document.getElementById('tabela-tarefas').innerHTML = tabela;
}

function alterarStatus(index) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas[index].status = tarefas[index].status === 'A concluir' ? 'Concluída' : 'A concluir';
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    tratarTarefas();
}

function excluirTarefa(index) {
    let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
    tarefas.splice(index, 1);
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    tratarTarefas();
}

function voltarInclusao() {
    document.getElementById('inclusao-tarefas').classList.remove('hidden');
    document.getElementById('tratar-tarefas').classList.add('hidden');
}
