const cep = document.getElementById("cep");
const rua = document.getElementById("rua");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");
const pais = document.getElementById("pais");
const numero = document.getElementById("numero");

const loading = document.getElementById("loading");

const data = document.getElementById("data");

const temComplemento = document.getElementById("temComplemento");
const camposComplemento = document.getElementById("campos-complemento");
const tipoComplemento = document.getElementById("tipoComplemento");
const complemento = document.getElementById("complemento");

const btnSalvar = document.getElementById("btn-salvar");

const modalMensagem = document.getElementById("modal-mensagem");
const modalTexto = document.getElementById("modal-texto");
const modalIcone = document.getElementById("modal-icone");


fetch("http://localhost:8080/enderecos/tipos-complemento")

    .then(resposta => resposta.json())
    .then(tipos => {

        tipos.forEach(tipo => {
            tipoComplemento.innerHTML += `<option value="${tipo}">${tipo}</option>`;
        });
    })

    .catch(() => {
        tipoComplemento.innerHTML = '<option value="">Não foi possível carregar</option>';
    });

function verificarCampos() {
    if (
        cep.value &&
        numero.value &&
        rua.value &&
        cidade.value &&
        estado.value &&
        pais.value &&
        document.querySelector('input[name="tipoEndereco"]:checked') &&
        (!temComplemento.checked || (
            tipoComplemento.value &&
            complemento.value
        ))
    ) {
        btnSalvar.disabled = false;
    } else {
        btnSalvar.disabled = true;
    }
}


const hoje = new Date();
const ano = hoje.getFullYear();
const mes = String(hoje.getMonth() + 1).padStart(2, "0");
const dia = String(hoje.getDate()).padStart(2, "0");

data.value = `${ano}-${mes}-${dia}`;


numero.addEventListener("input", function () {
    verificarCampos();
});


document.querySelectorAll('input[name="tipoEndereco"]').forEach(function (opcao) {
    opcao.addEventListener("change", function () {
        verificarCampos();
    });
});


temComplemento.addEventListener("change", function () {
    if (temComplemento.checked) {
        camposComplemento.style.display = "flex";
    } else {
        camposComplemento.style.display = "none";
        tipoComplemento.value = "";
        complemento.value = "";
    }

    verificarCampos();
});


tipoComplemento.addEventListener("change", function () {
    verificarCampos();
});


complemento.addEventListener("input", function () {
    verificarCampos();
});


cep.addEventListener("input", function () {
    const valorCep = cep.value.replace(/\D/g, "");

    if (valorCep.length === 8) {
        loading.style.display = "flex";

        setTimeout(() => {
            fetch(`https://viacep.com.br/ws/${valorCep}/json/`)
                .then(resposta => resposta.json())
                .then(dados => {
                    if (dados.erro) {
                        rua.value = "";
                        cidade.value = "";
                        estado.value = "";
                        pais.value = "";
                        verificarCampos();
                        return;
                    }

                    rua.value = dados.logradouro;
                    cidade.value = dados.localidade;
                    estado.value = dados.uf;
                    pais.value = "Brasil";
                    verificarCampos();
                })
                .catch(() => {
                    rua.value = "";
                    cidade.value = "";
                    estado.value = "";
                    pais.value = "";
                    verificarCampos();
                })
                .finally(() => {
                    loading.style.display = "none";
                });
        }, 500);
    } else {
        rua.value = "";
        cidade.value = "";
        estado.value = "";
        pais.value = "";
        verificarCampos();
    }
});


btnSalvar.addEventListener("click", function () {
    const tipoEndereco = document.querySelector('input[name="tipoEndereco"]:checked').value;

    const endereco = {
        cep: cep.value,
        numero: numero.value,
        rua: rua.value,
        cidade: cidade.value,
        estado: estado.value,
        pais: pais.value,
        data: data.value,
        tipoEndereco: tipoEndereco,
        temComplemento: temComplemento.checked,
        tipoComplemento: tipoComplemento.value,
        complemento: complemento.value
    };

    fetch("http://localhost:8080/enderecos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(endereco)
    })
        .then(resposta => {
            if (resposta.status === 201) {
                modalTexto.textContent = "Endereço cadastrado com sucesso!";
                modalIcone.textContent = "✓";
                modalMensagem.classList.remove("modal-erro");
                modalMensagem.style.display = "flex";

                setTimeout(() => {
                    modalMensagem.style.display = "none";
                    window.location.href = "index.html";
                }, 2000);
            } else if (resposta.status === 400) {
                modalTexto.textContent = "Este endereço já está cadastrado.";
                modalIcone.textContent = "!";
                modalMensagem.classList.add("modal-erro");
                modalMensagem.style.display = "flex";

                setTimeout(() => {
                    modalMensagem.style.display = "none";
                }, 2000);
            } else {
                modalTexto.textContent = "Não foi possível cadastrar o endereço.";
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