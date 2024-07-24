import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";
import 'cypress-file-upload';
import { toInteger } from "cypress/types/lodash";

// Faz o login do usuario, e guarda informacoes:
Given("o usuario esta logado com email {string}, password {string} e id {string}", (email: string, password: string, id: string) => {
    // Faz o login:
    cy.visit("/login-restaurant");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.contains("button", "Entrar").click();
    // Guarda o id do restaurante que está logado:
    cy.setUserId(id)
    cy.wait(200)
});


// Vai para pagina:
Given("o usuario esta na pagina {string}", (page: string) => {
    cy.visit(`/${page}`);
});


// Vai para a pagina especifica para o usuario de acordo com seu id:
Given("o usuario esta na sua pagina {string} do editor de menu", (page: string) => {
    cy.getUserId().then(restaurantId => {
        cy.getMenuEditorPage(page).then(menuEditorPage => {
            let userPage: string = `/${restaurantId}/${menuEditorPage}`
            cy.visit(userPage);
        })
    })
});


// Verifica se usuario esta na pagina de adicionar item que tem seu id:
Given("o usuario esta na sua pagina de adicionar item", () => {
    cy.getUserId().then(restaurantId => {
        let userPage: string = `/${restaurantId}/add-item`
        cy.visit(userPage);
    })
});

// Verifica se usuario esta na pagina de adicionar item que tem seu id:
Given("o usuario esta na sua pagina de editar item, para o item {string}", (item) => {
    // Vai para a pagina de itens do editor de menu:
    cy.getUserId().then(restaurantId => {
        cy.getMenuEditorPage("itens").then(menuEditorPage => {
            let userPage: string = `/${restaurantId}/${menuEditorPage}`
            cy.visit(userPage);
        })
    })
    // Clica no botão de editar do item:
    cy.get(`[data-cy=${item}-remove]`).click();
});


// Verifica se o item está na pagina
Given("o usuario ve o item {string}", (message: string) => {
    cy.contains(message).should("be.visible");
});



// Acao de clicar em um botao:
When("o usuario clica no botao {string}", (button: string) => {
    cy.contains("button", button).click();
});


// Acao de clicar em um botao especificado pelo data-cy:
When("o usuario clica no botao especifico {string}", (button: string) => {
    cy.get(`[data-cy=${button}]`).click();
  });


// Acao de preencher um campo:
When("o usuario preenche o campo {string} com {string}", (field: string, value: string) => {
    cy.get(`[data-cy="${field}"]`).type(value);
});


// Acao de marcar a checkbox:
When("o usuario marca a checkbox {string}", (field: string) => {
    cy.get(`[data-cy="checkbox-${field}"]`).check()
});


// Acao de marcar a checkbox:
When("o usuario adiciona uma imagem {string}", (filePath: string) => {
    cy.get(`[data-cy="ImageUpload"]`).attachFile(filePath)
})


When("espera {string} ms", (tempo: string) => {
    cy.wait(toInteger(tempo))
})


// Verifica se usuario esta na pagina:
Then("o usuario deve ser redirecionado para a pagina {string}", (page: string) => {
    cy.url().should("include", page);
});



// Verifica se usuario esta na pagina de editor de menu com seu id:
Then("o usuario deve ser redirecionado para a sua pagina {string} do editor de menu", (page: string) => {
    cy.getUserId().then(restaurantId => {
        cy.getMenuEditorPage(page).then(menuEditorPage => {
            let userPage: string = `/${restaurantId}/${menuEditorPage}`
            cy.url().should("include", userPage);
        })
    })
});


// Verifica se usuario esta na pagina de adicionar item que tem seu id:
Then("o usuario deve ser redirecionado para a sua pagina de adicionar item", () => {
    cy.getUserId().then(restaurantId => {
        let userPage: string = `/${restaurantId}/add-item`
        cy.url().should("include", userPage);
    })
});

// Verifica se usuario esta na pagina de adicionar item que tem seu id:
Then("o usuario deve ser redirecionado para a sua pagina de editar item", () => {
    cy.getUserId().then(restaurantId => {
        let userPage: string = `/${restaurantId}/edit-item/`
        cy.url().should("include", userPage);
    })
});

// Verifica se um texto está na tela:
Then("o usuario deve ver a mensagem {string}", (message: string) => {
    cy.contains(message).should("be.visible");
});


// Verifica se a categoria existe no cardapio:
Then('a categoria "{string}" existe no cardapio', (category: string) => {
    cy.getUserId().then(restaurantId => {
        cy.getMenuEditorPage("categories").then(menuEditorPage => {
            let userPage: string = `/${restaurantId}/${menuEditorPage}`;
            cy.visit(userPage).then(() => {
                cy.contains(category).should("be.visible");
            });
        });
    });
});

// Verifica se um texto está na tela:
Then("o usuario não deve ver a mensagem {string}", (message: string) => {
    cy.contains(message).should("not.exist");
});

// Verifica se o valor do campo é o esperado:
Then("o usuario ve o campo {string} com {string}", (field: string, value: string) => {
    cy.get(`[data-cy="${field}"]`).should('have.value', value);
});

// Verifica se o valor da checkbox é o esperado:
Then("o usuario ve que a checkbox de {string} esta marcada", (field: string) => {
    cy.get(`[data-cy="checkbox-${field}"]`).should('be.checked')
});