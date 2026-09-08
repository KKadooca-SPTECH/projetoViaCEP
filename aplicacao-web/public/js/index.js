const tabelaEnderecos = document.getElementById("tabela-enderecos");
const quantidadeEnderecos = document.getElementById("quantidade-enderecos");
const tabelaContainer = document.getElementById("tabela-container");
const nenhumEndereco = document.getElementById("nenhum-endereco");


fetch("http://localhost:8080/enderecos")

    .then(resposta => resposta.json())
    .then(enderecos => {

        tabelaEnderecos.innerHTML = "";

        if (enderecos.length === 0) {
            tabelaContainer.style.display = "none";
            nenhumEndereco.style.display = "flex";
            quantidadeEnderecos.textContent = "Nenhum endereço cadastrado ainda.";

            return;
        }

        tabelaContainer.style.display = "block";
        nenhumEndereco.style.display = "none";

        if (enderecos.length === 1) {
            quantidadeEnderecos.textContent = "1 endereço cadastrado.";
        } else {
            quantidadeEnderecos.textContent = `${enderecos.length} endereços cadastrados.`;
        }


        enderecos.forEach(endereco => {

            tabelaEnderecos.innerHTML += `
                <tr>
                    <td>${endereco.cep}</td>
                    <td>${endereco.numero}</td>
                    <td>${endereco.rua}</td>
                    <td>${endereco.cidade}</td>
                    <td>${endereco.estado}</td>
                    <td>${endereco.tipoComplemento ? endereco.tipoComplemento + ": " + endereco.complemento : "-"}</td>
                </tr>
            `;
        });
    })

    .catch(() => {
        tabelaContainer.style.display = "none";
        nenhumEndereco.style.display = "flex";
        quantidadeEnderecos.textContent = "Não foi possível carregar os endereços.";
    });