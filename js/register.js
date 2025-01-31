import * as routes from "../routes.js";
import * as translator from "../translatorPtBr.js";

// Adiciona máscara ao campo CPF
document.getElementById('cpf').addEventListener('input', function (event) {
    let cpfInput = event.target;
    let cpfValue = cpfInput.value;

    // Remove todos os caracteres não numéricos
    cpfValue = cpfValue.replace(/\D/g, '');

    // Aplica a máscara de CPF
    cpfValue = cpfValue.replace(/(\d{3})(\d)/, '$1.$2');
    cpfValue = cpfValue.replace(/(\d{3})(\d)/, '$1.$2');
    cpfValue = cpfValue.replace(/(\d{3})(\d{2})$/, '$1-$2');

    // Atualiza o valor no campo
    cpfInput.value = cpfValue;
});

document.getElementById('cpf').addEventListener('keydown', function (event) {
    const key = event.key;

    // Permite apenas números e teclas de controle
    if (!/^\d$/.test(key) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(key)) {
        event.preventDefault();
    }
});


// Adiciona máscara ao campo Celular
document.getElementById('phone').addEventListener('input', function (event) {
    let cellPhoneInput = event.target;
    let cellPhoneValue = cellPhoneInput.value;

    // Remove todos os caracteres não numéricos
    cellPhoneValue = cellPhoneValue.replace(/\D/g, '');

    // Aplica a máscara de celular
    cellPhoneValue = cellPhoneValue.replace(/^(\d{2})(\d)/, '($1)$2');
    cellPhoneValue = cellPhoneValue.replace(/(\d{5})(\d)/, '$1-$2');

    // Limita ao tamanho do telefone formatado
    cellPhoneValue = cellPhoneValue.slice(0, 14);

    // Atualiza o valor no campo
    cellPhoneInput.value = cellPhoneValue;
});

document.getElementById('phone').addEventListener('keydown', function (event) {
    const key = event.key;

    // Permite apenas números e teclas de controle
    if (!/^\d$/.test(key) && !['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(key)) {
        event.preventDefault();
    }
});

document.getElementById('zipCodeModal').addEventListener('input', function (event) {
    const zipCodeInput = event.target;
    let zipCodeValue = zipCodeInput.value;

    // Remover todos os caracteres não numéricos
    zipCodeValue = zipCodeValue.replace(/\D/g, '');
    document.getElementById('zipCodeModal').value = zipCodeValue;

    // Limitar a 8 caracteres
    if (zipCodeValue.length > 8) {
        zipCodeValue = zipCodeValue.slice(0, 8);
    }

    zipCodeInput.value = zipCodeValue;
    if (zipCodeValue.length !== 8) {
        zipCodeInput.setCustomValidity('O CEP deve conter exatamente 8 dígitos.');
    } else {
        zipCodeInput.setCustomValidity('');
    }
});

// Função para abrir o modal de confirmação do endereço
function addressPerson() {
    const modal = new bootstrap.Modal(document.getElementById("confirmAddressModal"));
    modal.show();
}

// Event delegation para lidar com cliques nos botões de exclusão
document.addEventListener("click", function (event) {
    const addressButton = event.target.closest(".address-btn");
    if (addressButton) {
        addressPerson();
    }
});

//Cep
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('zipCodeModal').value=("");
    document.getElementById('addressModal').value=("");
    document.getElementById('numberModal').value=("");
    document.getElementById('complementModal').value=("");
    document.getElementById('neighborhoodModal').value=("");
    document.getElementById('cityModal').value=("");
    document.getElementById('stateModal').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('addressModal').value=(conteudo.logradouro);
    document.getElementById('neighborhoodModal').value=(conteudo.bairro);
    document.getElementById('cityModal').value=(conteudo.localidade);
    document.getElementById('stateModal').value=(conteudo.uf);

} //end if.
else {
    //CEP não Encontrado.
    limpa_formulário_cep();

    //Sweetalert2
    Swal.fire({
        title: "CEP não encontrado!",
        text: "CEP não encontrado!",
        icon: "error"
    });
}
}

function pesquisacep(valor) {
    console.log(valor);

    // Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    // Verifica se campo cep possui valor informado.
    if (cep != "") {
        // Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        // Valida o formato do CEP.
        if (validacep.test(cep)) {
            // Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('addressModal').value = "...";
            document.getElementById('neighborhoodModal').value = "...";
            document.getElementById('cityModal').value = "...";
            document.getElementById('stateModal').value = "...";

            // Cria um elemento JavaScript.
            var script = document.createElement('script');

            // Sincroniza com o callback.
            script.src = routes.urlBaseZipCode + cep + routes.urlBaseZipCodeEnd;

            // Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);
        } else {
            // CEP é inválido.
            limpa_formulário_cep();

            // Sweetalert2
            Swal.fire({
                title: "Formato de CEP inválido!",
                text: "Formato de CEP inválido!",
                icon: "error"
            });
        }
    } else {
        // CEP sem valor, limpa formulário.
        limpa_formulário_cep();
    }
}

// Expondo a função pesquisacep ao escopo global
window.pesquisacep = pesquisacep;
window.meu_callback = meu_callback;


let addresses = [];

// Função para adicionar endereço
document.getElementById("saveAddess").addEventListener("click", function () {
    const zipCode = document.getElementById("zipCodeModal").value;
    const address = document.getElementById("addressModal").value;
    const number = document.getElementById("numberModal").value;
    const complement = document.getElementById("complementModal").value;
    const neighborhood = document.getElementById("neighborhoodModal").value;
    const city = document.getElementById("cityModal").value;
    const state = document.getElementById("stateModal").value;

    if (!zipCode || !address || !number || !neighborhood || !city || !state) {
        Swal.fire("Erro", "Preencha todos os campos obrigatórios!", "error");
        return;
    }

    const newAddress = {
        id: 0,
        personId: null, // Será preenchido ao cadastrar a pessoa
        zipCode,
        address,
        number,
        complement,
        neighborhood,
        city,
        state,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        active: true
    };

    addresses.push(newAddress);
    updateAddressList();
    limpa_formulário_cep();

    Swal.fire("Sucesso", "Endereço adicionado!", "success");

    bootstrap.Modal.getInstance(document.getElementById("confirmAddressModal")).hide();
});

// Atualiza a exibição dos endereços na tela
function updateAddressList() {
    const addressList = document.getElementById("addressList");
    addressList.innerHTML = "";

    addresses.forEach((addr, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            ${addr.address}, ${addr.number} - ${addr.neighborhood}, ${addr.city}/${addr.state} 
            <button class="btn btn-danger btn-sm" onclick="removeAddress(${index})">Remover</button>
        `;
        addressList.appendChild(li);
    });
}

// Remove um endereço do array e atualiza a lista
function removeAddress(index) {
    addresses.splice(index, 1);
    updateAddressList();
}

window.removeAddress = removeAddress;

// Modificação no envio do formulário
document.getElementById("personForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const personData = {
        id: 0,
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        cpf: document.getElementById("cpf").value,
        createAt: new Date().toISOString(),
        updateAt: new Date().toISOString(),
        active: true
    };

    try {
        const response = await fetch(routes.urlBaseApiPerson, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(personData)
        });

        if (!response.ok) {
            Swal.fire("Erro", "Erro ao cadastrar pessoa!", "error");
            throw new Error(`Erro na API: ${response.status}`);
        }

        const person = await response.json();
        const personId = person.id;

        console.log("Pessoa cadastrada com ID:", personId);

        // Adiciona o personId aos endereços e faz requisições individuais
        if (addresses.length > 0) {
            const addressPromises = addresses.map(addr => {
                addr.personId = personId; // Atribui o ID da pessoa

                return fetch(routes.urlBaseApiAddress, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(addr)
                }).then(response => {
                    if (!response.ok) {
                        throw new Error(`Erro ao cadastrar endereço: ${response.status}`);
                    }
                    return response.json();
                });
            });

            // Aguarda todas as requisições de endereços serem concluídas
            await Promise.all(addressPromises);
        }

        Swal.fire("Sucesso", "Pessoa e endereços cadastrados com sucesso!", "success");

        setTimeout(() => { window.location.href = "index.html"; }, 2000);

    } catch (error) {
        console.error(error);
        Swal.fire("Erro", `Erro: ${error.message}`, "error");
    }
});