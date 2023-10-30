const button = document.querySelector('.button-add-task');
const input = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks')

let listaItens = []


function adicionarNovaTarefa() {
    listaItens.push({
        tarefa: input.value,
        concluida: false
    }) //objeto pegando o valor da tarefa e passando false para concluida
    input.value = '' // vai deixar input vazio novamente

    mostrarTarefas()
}

function mostrarTarefas() {
    let novaLi = ''
    listaItens.forEach((item, posicao) => { // pega a tarefa e a posição do iten da lista
        novaLi = novaLi + ` 
            <li class="task ${item.concluida && "done"}">
                <img  src="./img/checked.png" alt="checked-tarefa" onclick="concluirTarefa(${posicao})">
                <p>${item.tarefa}</p>
                <img src="./img/trash.png" alt="trash-tarefa" onclick="deletarItem(${posicao})">
            </li>
        `
    })
    listaCompleta.innerHTML = novaLi //coloca a lista no html

    localStorage.setItem('lista', JSON.stringify(listaItens)) //converte o objeto listaItens e armazena na memoria local usando o setItem
}

function concluirTarefa(posicao) {
    listaItens[posicao].concluida = !listaItens[posicao].concluida
    mostrarTarefas()
}

function deletarItem(posicao) { // função passada na imagem deletar
    listaItens.splice(posicao, 1) //aqui eu coloco quem eu quero deletar e quantos items a partir daquela posição
    mostrarTarefas() //é preciso chamar essa função novamente para ele enchegar a mesma
}

function recarregarTarefas() {
    const tarefaLocalStorage = localStorage.getItem('lista')
    if (tarefaLocalStorage) {
        listaItens = JSON.parse(tarefaLocalStorage) //transforma essa string de volta em objeto
    }


    mostrarTarefas()

}
recarregarTarefas()
button.addEventListener('click', adicionarNovaTarefa)