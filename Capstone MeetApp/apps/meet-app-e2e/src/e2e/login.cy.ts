describe("log in ",() =>{

    //login into application as regular user
    it("Enter as regular User",()=>{
        cy.visit("/");
        cy.get(".same-size-button:nth-child(1)").click();
        cy.get("h1").contains("LOG IN");
        cy.get(".username").type("laura_adams");
        cy.get(".password").type("laurapass");
        cy.get(".submit").click();
        cy.get("h1").contains("Recommended Events");
    });

    //login into application as organiser
    it("Enter as organiser User",()=>{
        cy.visit("/");
        cy.get(".same-size-button:nth-child(2)").click();
        cy.get("h1").contains("LOG IN");
        cy.get(".username").type("LTDProevents");
        cy.get(".password").type("marketspass");
        cy.get(".submit").click();
        cy.get("h1").contains("Recommended Events");

    })

})