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

// Função para remover endereço
// Função para remover endereço existente
async function removeAddress(addressId, event) {
  if (event) event.preventDefault(); // Evitar comportamento padrão do botão ou link

  try {
      const response = await fetch(`${routes.urlBaseApiAddress}/${addressId}`, {
          method: "DELETE",
      });

      if (!response.ok) throw new Error("Erro ao remover o endereço.");

      Swal.fire(translator.successExclamation, translator.addressSuccessfullyDeleted, "success");

      // Atualizar a lista de endereços localmente removendo o endereço
      existingAddresses = existingAddresses.filter(addr => addr.id !== addressId);
      updateAddressList(); // Atualiza a exibição na página
  } catch (error) {
      Swal.fire(translator.errorExclamation, translator.errorRemovingAddress, "error");
      console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadPersonData();
});

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
    const addressButton = event.target.closest(".address-update-btn");
    console.log(addressButton);
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

// Atualiza a exibição dos endereços na tela
window.removeAddress = removeAddress;

let existingAddresses = []; // Endereços já salvos no banco
let newAddresses = []; // Novos endereços adicionados pelo usuário

// Função para carregar os dados da pessoa e endereços
async function loadPersonData() {
    const urlParams = new URLSearchParams(window.location.search);
    const personId = urlParams.get("id");

    if (!personId) {
        Swal.fire(translator.errorExclamation, translator.personIdNotFound, "error");
        window.location.href = "index.html";
        return;
    }

    try {
        // Carregar dados da pessoa
        const response = await fetch(`${routes.urlBaseApiPerson}/${personId}`);
        if (!response.ok) throw new Error("Erro ao carregar pessoa.");

        const person = await response.json();
        document.getElementById("id").value = person.id;
        document.getElementById("name").value = person.name;
        document.getElementById("phone").value = person.phone;
        document.getElementById("cpf").value = person.cpf;
        document.getElementById("createdAt").value = person.createdAt;
        document.getElementById("updatedAt").value = person.updatedAt;
        document.getElementById("active").checked = person.active;

        // Carregar endereços existentes
        const responseAddress = await fetch(`${routes.urlBaseApiAddressGetByPersonId}/${personId}`);
        if (!responseAddress.ok) throw new Error("Erro ao carregar endereços.");

        existingAddresses = await responseAddress.json(); // Salva os endereços carregados
        updateAddressList();
    } catch (error) {
        Swal.fire(translator.errorExclamation, translator.errorLoadingPersonData, "error");
        console.error(error);
    }
}

// Atualiza a exibição dos endereços na lista
// Função para atualizar a exibição dos endereços na lista
function updateAddressList() {
  const addressList = document.getElementById("addressList");
  addressList.innerHTML = "";

  // Renderizar endereços existentes
  existingAddresses.forEach((addr) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
          <span>
              <strong>CEP:</strong> ${addr.zipCode}, 
              <strong>Endereço:</strong> ${addr.address}, 
              <strong>Número:</strong> ${addr.number}, 
              <strong>Complemento:</strong> ${addr.complement || "N/A"}, 
              <strong>Bairro:</strong> ${addr.neighborhood}, 
              <strong>Cidade:</strong> ${addr.city}, 
              <strong>Estado:</strong> ${addr.state}
          </span>
          <button class="btn btn-danger btn-sm" type="button" onclick="removeAddress(${addr.id})">Remover</button>

      `;
      addressList.appendChild(li);
  });

  // Renderizar novos endereços
  newAddresses.forEach((addr, index) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
          <span>
              <strong>CEP:</strong> ${addr.zipCode}, 
              <strong>Endereço:</strong> ${addr.address}, 
              <strong>Número:</strong> ${addr.number}, 
              <strong>Complemento:</strong> ${addr.complement || "N/A"}, 
              <strong>Bairro:</strong> ${addr.neighborhood}, 
              <strong>Cidade:</strong> ${addr.city}, 
              <strong>Estado:</strong> ${addr.state}
          </span>
          <button class="btn btn-danger btn-sm" onclick="removeNewAddress(${index})">Remover</button>
      `;
      addressList.appendChild(li);
  });
}


// Função para adicionar um novo endereço
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
        id: 0, // ID zero para indicar que ainda não foi salvo
        personId: null, // Será preenchido ao salvar a pessoa
        zipCode,
        address,
        number,
        complement,
        neighborhood,
        city,
        state,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        active: true,
    };

    newAddresses.push(newAddress);
    updateAddressList();
    limpa_formulário_cep();
    Swal.fire("Sucesso", "Endereço adicionado!", "success");

    bootstrap.Modal.getInstance(document.getElementById("confirmAddressModal")).hide();
});

// Função para remover um novo endereço da lista
function removeNewAddress(index) {
    newAddresses.splice(index, 1); // Remove o endereço pelo índice
    updateAddressList();
}

// Atualiza a exibição dos endereços na tela
window.removeNewAddress = removeNewAddress;

// Evento de atualização (submit)
document.getElementById("personUpdateForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const personId = document.getElementById("id").value;
    const updatedPerson = {
        id: personId,
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        cpf: document.getElementById("cpf").value,
        createdAt: document.getElementById("createdAt").value,
        updatedAt: document.getElementById("updatedAt").value,
        active: document.getElementById("active").checked,
    };

    try {
        const response = await fetch(`${routes.urlBaseApiPerson}/${personId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedPerson),
        });

        if (!response.ok) throw new Error("Erro ao atualizar a pessoa.");

        // Salva novos endereços no banco
        for (const address of newAddresses) {
            address.personId = personId;
            await fetch(routes.urlBaseApiAddress, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(address),
            });
        }

        Swal.fire(translator.successExclamation, translator.personSuccessfullyUpdated, "success");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    } catch (error) {
        Swal.fire(translator.errorExclamation, "Erro ao salvar alterações: " + error.message, "error");
    }
});
