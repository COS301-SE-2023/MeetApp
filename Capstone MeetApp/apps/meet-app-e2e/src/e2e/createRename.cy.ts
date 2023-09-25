describe("log in ",() =>{
    //log in to home page
    beforeEach(() => {
        cy.visit("/");
        cy.get("#Org").click();
        cy.get("h1").contains("LOG IN");
        cy.get("#username").type("LTDProevents");
        cy.get("#passwd").type("marketspass");
        cy.get("#submit").click();
        
        
    });

    //create a event
    
    it("Create Event",()=>{
        cy.get("h1").contains("Recommended Events");
        cy.get("#event").click();
        cy.get("h1").contains("Add Events");
        //image must be added
        cy.get("#Ename").type("Chrismas Party");
        cy.get("#Oname").type("Santa Mansions");
        cy.get("#Edate").type("2023-07-08");
        cy.get("#Stime").type("06:00");
        cy.get("#Etime").type("00:00");
        cy.get("#descr").type("Jingle Jingle we are having a chrismas party");
        cy.get("#region").type("New York");
        cy.get("#lat").type("40.7128");
        cy.get("#long").type("-74.0060");
        cy.get("#category").type("Party")
        //cy.get("#submit").click();
    })
    



})
