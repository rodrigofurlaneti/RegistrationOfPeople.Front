import * as routes from "../routes.js";
import * as translator from "../translatorPtBr.js";

let personIdToDelete = null;

async function fetchPersons() {
    const loadingMessage = document.getElementById("loadingMessage");
    const personsTable = document.getElementById("personsTable");
    const personsBody = document.getElementById("personsBody");

    try {
        const response = await fetch(routes.urlBaseApiPerson);

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
        }

        const persons = await response.json();

        if (persons.length === 0) {
            Swal.fire(translator.errorExclamation, translator.noPersonWereFound, "error");
            loadingMessage.innerHTML = "<p class='text-warning'>Nenhuma pessoa foi encontrado.</p>";
            return;
        }

        // Gerar as linhas da tabela
        personsBody.innerHTML = persons.map(person => `
            <tr>
                <td>${person.id}</td>
                <td>${person.name}</td>
                <td>${person.phone}</td>
                <td>${person.cpf}</td>
                <td>${person.status ? 'Inativo' : 'Ativo'}</td>
                <td>
                    <div class="row justify-content-md-center">
                        <div class="col-sm-6">
                            <a href="updatePerson.html?id=${person.id}" class="btn btn-warning btn-sm">
                                Atualizar
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise iconText" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                                </svg>
                            </a>
                        </div>
                        <div class="col-sm-5">
                            <a href="#" class="btn btn-danger btn-sm delete-btn" data-id="${person.id}">
                                Excluir
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x iconText" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </td>
            </tr>
        `).join("");

        // Esconder a mensagem de carregamento e exibir a tabela
        loadingMessage.classList.add("d-none");
        personsTable.classList.remove("d-none");

    } catch (error) {
        loadingMessage.innerHTML = `<p class="text-danger">Erro: ${error.message}</p>`;
    }
}

// Função para abrir o modal de confirmação de exclusão
function deletePerson(id) {
    personIdToDelete = id;
    const modal = new bootstrap.Modal(document.getElementById("confirmDeleteModal"));
    modal.show();
}

// Event delegation para lidar com cliques nos botões de exclusão
document.addEventListener("click", function (event) {
    const deleteButton = event.target.closest(".delete-btn");
    if (deleteButton) {
        const id = deleteButton.getAttribute("data-id");
        deletePerson(id);
    }
});

// Confirmar exclusão no modal
document.getElementById("confirmDeleteBtn").addEventListener("click", async function () {
    if (personIdToDelete) {
        try {
            const response = await fetch(`${routes.urlBaseApiPerson}/${personIdToDelete}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                Swal.fire(translator.errorExclamation, translator.errorWhenDeletingAPerson, "error");
                throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
            }

            Swal.fire(translator.successExclamation, translator.personSuccessfullyDeleted, "success");

            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error) {
            Swal.fire(translator.errorExclamation, translator.errorWhenDeletingAPerson, "error");
        }
    }
});

// Carregar os produtos ao carregar a página
fetchPersons();

// Função para filtrar a tabela
function filterTable() {
    const filterValue = document.getElementById("filterInput").value.toLowerCase();
    const rows = document.querySelectorAll("#personsBody tr");
  
    rows.forEach((row) => {
        const idCell = row.children[0].textContent.toLowerCase();
        const nameCell = row.children[1].textContent.toLowerCase();
  
        // Exibe a linha se o valor estiver presente em qualquer uma das colunas
        if (idCell.includes(filterValue) || nameCell.includes(filterValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
  }
  
  // Evento para o campo de filtro
  document.getElementById("filterInput").addEventListener("input", filterTable);