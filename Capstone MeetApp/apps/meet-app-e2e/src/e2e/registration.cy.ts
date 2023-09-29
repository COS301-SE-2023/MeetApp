import { getRandomString } from '../support/app.po';

describe("sign up ",() =>{
    beforeEach(()=>{
        cy.visit('/');
    })

    //sign up into application as regular user
    it("Enter as regular User",()=>{
        cy.get(".same-size-button:nth-child(1)").click();
        cy.get("h1").contains("LOG IN");
        cy.get("#signup").click();
        cy.get("h1").contains("SIGN UP");
        cy.get("#Ousername input").type(getRandomString(), { force: true });
        cy.get("#password").type("Polane@123!");
        cy.get("#cpassword").type("Polane@123!");
        cy.get("#region").type("Pretoria");
        cy.get("#signup-button").click();

    });

    //sign up into application as organiser
    it("Enter as organiser User",()=>{
        cy.get(".same-size-button:nth-child(2)").click();
        cy.get("h1").contains("LOG IN");
        cy.get("#signup").click();
        cy.get("h1").contains("SIGN UP");
        cy.get("#Ousername").type(getRandomString());
        cy.get("#Oname input").type(getRandomString(),{ force: true });
        cy.get("#Opasswd").type("Polane@123!");
        cy.get("#signup-button").click();
        
    })

})