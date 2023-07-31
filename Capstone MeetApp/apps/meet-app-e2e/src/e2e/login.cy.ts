describe("log in ",() =>{

    //login into application as regular user
    it("Enter as regular User",()=>{
        cy.visit("/");
        //cy.wait(2000);
        cy.get("#User").click();
        //cy.wait(3000);
        cy.get("h1").contains("LOG IN");
        cy.get("#username").type("laura_adams");
        cy.get("#passwd").type("laurapass");
        cy.get("#submit").click();
        //cy.wait(2000);
        cy.get("h1").contains("Recommended Events");
    });

    //login into application as organiser
    it("Enter as organiser User",()=>{
        cy.visit("/");
        cy.get("#Org").click();
        //cy.wait(2000);
        cy.get("h1").contains("LOG IN");
        cy.get("#username").type("LTDProevents");
        cy.get("#passwd").type("marketspass");
        cy.get("#submit").click();
        //cy.wait(2000);
        cy.get("h1").contains("Recommended Events");

    })

})