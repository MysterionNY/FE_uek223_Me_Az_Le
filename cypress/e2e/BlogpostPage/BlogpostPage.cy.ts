import auth from "../../fixtures/auth.json";

describe(`Blogpost tests`, () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
    })

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

    it('User creates a new blogpost with wrong values', () => {
        cy.login(auth.user.email, auth.user.password);
        cy.wait(3000);
        cy.visit("/blogpost/create");
        cy.get('#title').type("Da");
        cy.get('#text').type("Da");
        cy.get('#save-button').click();
        cy.get('#title-helper-text').should('be.visible');
        cy.get('#text-helper-text').should('be.visible');
    });

    it('User cancels creating a blogpost', () => {
        cy.login(auth.user.email, auth.user.password);
        cy.wait(3000);
        cy.visit("/blogpost/create");
        cy.get('#title').type("Da");
        cy.get('#cancel-button').click();
    })

    it('User checks if his blogpost exists', () =>{
        cy.login(auth.user.email, auth.user.password);
        cy.wait(3000);
        cy.visit("/blogposts");
        cy.get('#search-bar').click().type("Das ist ein Titel");
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root').should('be.visible');
    });

    it('User tries to edit blogpost from someone else, should not work', () =>{
        cy.login(auth.user2.email, auth.user2.password);
        cy.wait(3000);
        cy.visit("/blogposts");
        cy.get('#search-bar').click().type("Das ist ein Titel");
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root').click();
        cy.get('#edit-post').should('not.exist');
    });

    it('Admin tries to edit blogpost from someone else, should work', () => {
        cy.login(auth.admin.email, auth.admin.password);
        cy.wait(3000);
        cy.visit("/blogposts");
        cy.get('#search-bar').click().type("Das ist ein Titel");
        cy.get(':nth-child(1) > .MuiPaper-root > .MuiCardContent-root').click();
        cy.get('#edit-post').click();
        cy.get('#title').type("Das ist der neue Titel");
        cy.get('#save-button').click();
    })
})