import { Interception } from "cypress/types/net-stubbing";
import auth from "../fixtures/auth.json";

let LOCAL_STORAGE_MEMORY: { [key: string]: string } = {};

Cypress.Commands.addAll({
    saveLocalStorage: () =>
        Object.keys(localStorage).forEach(
            (key: string) => (LOCAL_STORAGE_MEMORY[key] = localStorage[key])
        ),

    restoreLocalStorage: () =>
        Object.keys(LOCAL_STORAGE_MEMORY).forEach((key: string) =>
            localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key])
        ),

    login: (email: string = auth.admin.email, password: string = auth.admin.password) => {
        cy.intercept("POST", "/login").as("login");

        cy.visit("/login");
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get("#sign-in").click();
    },

    logout: () => {
        cy.intercept("GET", "/logout").as("logout");
        cy.wait(2000);
        cy.get("#logout").first().click();
    },

    getElement: (dataCY: string, shouldBeVisible = true) => {
        const element = cy.get(`[data-cy="${dataCY}"]`);

        if (shouldBeVisible) element.scrollIntoView().should("be.visible");

        return element;
    },
});

declare global {
    namespace Cypress {
        interface Chainable {
            saveLocalStorage(): void;

            restoreLocalStorage(): void;

            login(email?: string, password?: string): Chainable<Interception>;

            logout(): Chainable<Interception>;

            getElement(dataCY: string, shouldBeVisible?: boolean): Chainable<JQuery<HTMLElement>>;
        }
    }
}
