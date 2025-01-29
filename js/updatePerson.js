import * as routes from "../routes.js";
import * as translator from "../translatorPtBr.js";

async function loadPersonData() {
    const urlParams = new URLSearchParams(window.location.search);
    const personId = urlParams.get("id");
  
    if (!personId) {
      Swal.fire(translator.errorExclamation, translator.personIdNotFound, "error");
      window.location.href = "index.html";
      return;
    }
  
    try {
      const response = await fetch(`${routes.urlBaseApiPerson}/${personId}`);
      if (!response.ok) throw new Error("Erro ao carregar pessoa.");
  
      const person = await response.json();
      console.log("Dados da pessoa recebidos:", person);
  
      // Verifica se os campos existem antes de atribuir valores
      if (document.getElementById("id")) document.getElementById("id").value = person.id;
      if (document.getElementById("name")) document.getElementById("name").value = person.name;
      if (document.getElementById("phone")) document.getElementById("phone").value = person.phone;
      if (document.getElementById("cpf")) document.getElementById("cpf").value = person.cpf;
      if (document.getElementById("zipCode")) document.getElementById("zipCode").value = person.zipCode;
      if (document.getElementById("address")) document.getElementById("address").value = person.address;
      if (document.getElementById("number")) document.getElementById("number").value = person.number;
  
      // Verifica se o campo complement existe antes de atribuir valor
      if (document.getElementById("complement")) {
        document.getElementById("complement").value = person.complement || "";
      } else {
        console.warn("Campo 'complement' não encontrado no HTML.");
      }
  
      if (document.getElementById("neighborhood")) document.getElementById("neighborhood").value = person.neighborhood;
      if (document.getElementById("city")) document.getElementById("city").value = person.city;
      if (document.getElementById("state")) document.getElementById("state").value = person.state;
      if (document.getElementById("createdAt")) document.getElementById("createdAt").value = person.createdAt;
      if (document.getElementById("updatedAt")) document.getElementById("updatedAt").value = person.updatedAt;
      if (document.getElementById("active")) document.getElementById("active").value = person.active;
  
    } catch (error) {
      Swal.fire(translator.errorExclamation, translator.errorLoadingPersonData, "error");
      console.error(error);
    }
  }

document.addEventListener("DOMContentLoaded", async () => {
  await loadPersonData();
});

document.getElementById("updatePersonForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const personId = document.getElementById("id").value ;

  const updatedPerson = {
    id: document.getElementById("id").value,
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    cpf: document.getElementById("cpf").value,
    zipCode: document.getElementById("zipCode").value,
    address: document.getElementById("address").value,
    number: document.getElementById("number").value,
    complement: document.getElementById("complement").value,
    neighborhood: document.getElementById("neighborhood").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    createdAt: document.getElementById("createdAt").value,
    updatedAt: document.getElementById("updatedAt").value,
    active: document.getElementById("active").checked
  };

  try {
    const response = await fetch(`${routes.urlBaseApiPerson}/${personId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPerson),
    });

    if (!response.ok) throw new Error("Erro ao atualizar a pessoa.");

    Swal.fire(translator.successExclamation, translator.personSuccessfullyUpdated, "success");
    setTimeout(() => {
      window.location.href = "index.html";
    }, 2000);
  } catch (error) {
    alert("Erro ao salvar alterações: " + error.message);
  }
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

document.getElementById('zipCode').addEventListener('input', function (event) {
    const zipCodeInput = event.target;
    let zipCodeValue = zipCodeInput.value;

    // Remover todos os caracteres não numéricos
    zipCodeValue = zipCodeValue.replace(/\D/g, '');
    document.getElementById('zipCode').value = zipCodeValue;

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

//Cep
function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('address').value=("");
    document.getElementById('neighborhood').value=("");
    document.getElementById('city').value=("");
    document.getElementById('state').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById('address').value=(conteudo.logradouro);
    document.getElementById('neighborhood').value=(conteudo.bairro);
    document.getElementById('city').value=(conteudo.localidade);
    document.getElementById('state').value=(conteudo.uf);

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
            document.getElementById('address').value = "...";
            document.getElementById('neighborhood').value = "...";
            document.getElementById('city').value = "...";
            document.getElementById('state').value = "...";

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