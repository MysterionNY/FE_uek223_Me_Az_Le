import auth from "../../fixtures/auth.json";

describe(`Blogpost tests`, () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
    })

    afterEach(() => {
        cy.logout();
    });

    it('User creates a new blogpost', () => {
        cy.login(auth.user.email, auth.user.password);
        cy.wait(3000);
        cy.visit("/blogpost/create");
        cy.get('#title').type("Das ist ein Titel");
        cy.get('#category').click();
        cy.get('[data-value="SPORT"]').click();
        cy.get('#text').type("Das ist ein Text");
        cy.get('#save-button').click();
    });

    it('User checks if his blogpost exists', () =>{
        cy.login(auth.user.email, auth.user.password);
        cy.wait(3000);
        cy.visit("/blogposts");

    })
})