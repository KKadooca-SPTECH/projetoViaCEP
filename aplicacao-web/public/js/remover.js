const cep = document.getElementById("cep");
const numero = document.getElementById("numero");
const complemento = document.getElementById("complemento");

const sugestoes = document.getElementById("sugestoes");
const mensagemSugestoes = document.getElementById("mensagem-sugestoes");
const numerosSugestao = document.getElementById("numeros-sugestao");

const enderecoEncontrado = document.getElementById("endereco-encontrado");
const enderecoNaoEncontrado = document.getElementById("endereco-nao-encontrado");

const btnRemover = document.getElementById("btn-remover");
const btnCancelar = document.getElementById("btn-cancelar");
const btnAlterar = document.getElementById("btn-alterar");

const previewCep = document.getElementById("preview-cep");
const previewNumero = document.getElementById("preview-numero");
const previewRua = document.getElementById("preview-rua");
const previewCidade = document.getElementById("preview-cidade");
const previewEstado = document.getElementById("preview-estado");

const modalMensagem = document.getElementById("modal-mensagem");
const modalTexto = document.getElementById("modal-texto");
const modalIcone = document.getElementById("modal-icone");

let enderecos = [];
let enderecoSelecionado = null;

function mostrarEndereco(endereco) {
    enderecoSelecionado = endereco;

    numero.value = endereco.numero;

    complemento.value = endereco.tipoComplemento && endereco.complemento
        ? endereco.tipoComplemento + ": " + endereco.complemento
        : "-";

    previewCep.textContent = endereco.cep;
    previewNumero.textContent = endereco.numero;
    previewRua.textContent = endereco.rua;
    previewCidade.textContent = endereco.cidade;
    previewEstado.textContent = endereco.estado;

    enderecoEncontrado.style.display = "block";
    enderecoNaoEncontrado.style.display = "none";

    sugestoes.style.display = "none";

    btnRemover.disabled = false;
    btnAlterar.style.display = "block";
}

function limparEndereco() {
    enderecoEncontrado.style.display = "none";
    enderecoNaoEncontrado.style.display = "none";

    sugestoes.style.display = "none";
    numerosSugestao.innerHTML = "";

    numero.value = "";
    complemento.value = "";

    numero.disabled = true;
    complemento.disabled = true;

    btnRemover.disabled = true;
    btnAlterar.style.display = "none";

    enderecoSelecionado = null;
}

cep.addEventListener("input", function () {
    const valorCep = cep.value.replace(/\D/g, "");

    limparEndereco();

    if (valorCep.length === 8) {
        fetch("http://localhost:8080/enderecos")
            .then(resposta => resposta.json())
            .then(dados => {
                enderecos = dados.filter(endereco =>
                    endereco.cep.replace(/\D/g, "") === valorCep
                );

                if (enderecos.length === 0) {
                    enderecoNaoEncontrado.style.display = "block";
                    return;
                }

                mensagemSugestoes.textContent = "Selecione o endereço que deseja remover:";
                numerosSugestao.innerHTML = "";

                enderecos.forEach(endereco => {
                    const botao = document.createElement("button");
                    botao.type = "button";

                    if (endereco.tipoComplemento && endereco.complemento) {
                        botao.textContent = `${endereco.numero} - ${endereco.tipoComplemento}: ${endereco.complemento}`;
                    } else {
                        botao.textContent = `${endereco.numero} - Sem complemento`;
                    }

                    botao.addEventListener("click", function () {
                        mostrarEndereco(endereco);
                    });

                    numerosSugestao.appendChild(botao);
                });

                sugestoes.style.display = "block";
            })
            .catch(() => {
                enderecoNaoEncontrado.style.display = "block";
            });
    }
});

btnAlterar.addEventListener("click", function () {
    numero.value = "";
    complemento.value = "";

    numero.disabled = true;
    complemento.disabled = true;

    enderecoSelecionado = null;

    enderecoEncontrado.style.display = "none";
    btnRemover.disabled = true;
    btnAlterar.style.display = "none";
    sugestoes.style.display = "block";
});

btnRemover.addEventListener("click", function () {
    if (!enderecoSelecionado) {
        return;
    }

    fetch(`http://localhost:8080/enderecos/${enderecoSelecionado.id}`, {
        method: "DELETE"
    })
        .then(resposta => {
            if (resposta.status === 204) {
                modalTexto.textContent = "Endereço removido com sucesso!";
                modalIcone.textContent = "✓";
                modalMensagem.classList.remove("modal-erro");
                modalMensagem.style.display = "flex";

                setTimeout(() => {
                    modalMensagem.style.display = "none";
                    window.location.href = "index.html";
                }, 2000);
            } else if (resposta.status === 404) {
                modalTexto.textContent = "Endereço não encontrado.";
                modalIcone.textContent = "!";
                modalMensagem.classList.add("modal-erro");
                modalMensagem.style.display = "flex";

                setTimeout(() => {
                    modalMensagem.style.display = "none";
                }, 2000);
            } else {
                modalTexto.textContent = "Não foi possível remover o endereço.";
                modalIcone.textContent = "!";
                modalMensagem.classList.add("modal-erro");
                modalMensagem.style.display = "flex";

                setTimeout(() => {
                    modalMensagem.style.display = "none";
                }, 2000);
            }
        })
        .catch(() => {
            modalTexto.textContent = "Não foi possível conectar com o servidor.";
            modalIcone.textContent = "!";
            modalMensagem.classList.add("modal-erro");
            modalMensagem.style.display = "flex";

            setTimeout(() => {
                modalMensagem.style.display = "none";
            }, 2000);
        });
});