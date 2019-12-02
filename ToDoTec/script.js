window.onload = iniciar;

function iniciar(){
    let nome_lista = localStorage.getItem("nome_lista");
    if(!nome_lista) {
        editarNome();
    }
    else{
        let nome = document.querySelector("#form_nome");
        form_nome.style.display = "none";
        let elementoNome = document.querySelector("#titulo");
        elementoNome.innerHTML = nome_lista;
    }
    carregarTarefas();
}

function editarNome(){
    let elementoNome = document.querySelector("#titulo");
    let form_nome = document.querySelector("#form_nome");
    let nome = document.querySelector("#nome");
    nome.value = elementoNome.innerHTML;
    elementoNome.style.display = "none";
    form_nome.style.display = "block";
}

function gravarNome(){
    let nome = document.querySelector("#nome").value;
    localStorage.setItem("nome_lista", nome);
    location.assign(location.href);
}

function criarTarefa(){
    let tarefa = document.querySelector("#campo_texto").value;
    let cor = document.querySelector("#campo_cor").value;
    let data = new Date();
    var key = "tarefa_" + data.getTime();
    let t = {
        "key": key,
        "tarefa": tarefa,
        "cor": cor
    }
    localStorage.setItem(key, JSON.stringify(t));
    adicionarTarefaDOM(t);
}

function adicionarTarefaDOM(t){
        let quadro = document.createElement("li");
        let tarefas = document.querySelector("#tarefas");
        quadro.classList.add("quadro");
        quadro.id = t.key;
        quadro.innerHTML = t.tarefa;
        quadro.style
        .backgroundColor = t.cor;
        quadro.ondblclick = excluirTarefa;
        quadro.style.transform = "rotate(" + Math.random()*6 + "deg)";
        tarefas.appendChild(quadro);
}

function excluirTarefa(e){
    let key = e.target.id;
    let quadro = document.getElementById(key);
    let tarefas = document.querySelector("#tarefas");
    localStorage.removeItem(key);
    tarefas.removeChild(quadro);
}

function carregarTarefas(){
    for(var i=0; i<localStorage.length;i++){
        let key = localStorage.key(i);
        if(key.startsWith("tarefa_")){
            let t = JSON.parse(localStorage.getItem(key));
            adicionarTarefaDOM(t);
        }
    }
}

let elementoNome = document.querySelector("#nome");
elementoNome.addEventListener("change", gravarNome);

let elementoTitulo = document.querySelector("#titulo");
elementoTitulo.addEventListener("click", editarNome);

let botaoAdicionar = document.querySelector("#botao_adicionar");
botaoAdicionar.addEventListener("click", criarTarefa);
