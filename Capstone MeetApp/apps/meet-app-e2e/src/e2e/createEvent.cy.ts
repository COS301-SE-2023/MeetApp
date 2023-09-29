describe("log in and create an event ",() =>{
    //log in to home page
    beforeEach(() => {
        cy.visit("/");
        cy.get(".same-size-button:nth-child(2)").click();
        cy.get("h1").contains("LOG IN");
        cy.get(".username").type("LTDProevents");
        cy.get(".password").type("marketspass");
        cy.get(".submit").click();
        
        
    });

    //create a event
    
    it("Create Event",()=>{
        cy.get("h1").contains("Recommended Events");
        cy.get('#event').click({ force: true }); // Click on the target element with force
        cy.get("h1").contains("Add Events");
        /*//image must be added
        cy.get(".Ename input").type("Chrismas Party", {force:true});
        cy.get(".Oname input").type("Santa Mansions",{force:true});
        cy.get(".Edate input").click({force:true}); // Click to focus
        cy.get('.custom-ok-button').click({force:true}); // Ensure backdrop is gone
        cy.get('.Edate input').type('2013-03-07');
        //cy.get('ion-input[name="this.selectedRange.startDate"]').should('be.visible').type("06:00",{force:true});
        cy.get(".Etime").type("00:00",{force:true});
        cy.get(".descr").type("Jingle Jingle we are having a chrismas party");
        cy.get(".region").type("New York");
        cy.get(".lat").type("40.7128");
        cy.get(".long").type("-74.0060");
        cy.get(".category").type("Party")
        //cy.get(".submit").click();*/
    })
    



})
