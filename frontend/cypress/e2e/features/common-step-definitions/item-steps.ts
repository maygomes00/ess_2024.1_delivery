import { Given, Then, When } from "@badeball/cypress-cucumber-preprocessor";

// Faz o login do usuario, e guarda informacoes:
Given("o usuario esta logado com email {string}, password {string} e id {string}", (email: string, password: string, id: string) => {
    // Faz o login:
    cy.visit("/login-restaurant");
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.contains("button", "Entrar").click();
    // Guarda o id do restaurante que está logado:
    cy.setUserId(id)
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

// Acao de clicar em um botao:
When("o usuario clica no botao {string}", (button: string) => {
    cy.contains("button", button).click();
});

// Acao de clicar em um botao especificado pelo data-cy:
When("o usuario clica no botao especifico {string}", (button: string) => {
    cy.get(`[data-cy=${button}]`).click();
  });

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

// Verifica se um texto está na tela:
Then("o usuario deve ver a mensagem {string}", (message: string) => {
    cy.contains(message).should("be.visible");
  });
