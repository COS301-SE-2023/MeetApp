describe("Navigation  ",() =>{
    //log in to home page
    beforeEach(() => {
        cy.visit("/");
        //cy.wait(2000);
        cy.get("#User").click();
        //cy.wait(4000);
        cy.get("h1").contains("LOG IN");
        cy.get("#username").type("laura_adams");
        cy.get("#passwd").type("laurapass");
        cy.get("#submit").click();
        //cy.wait(4000);
        
    });

    //routing to home
    it("Navigation to home",()=>{
        cy.get("h1").contains("Recommended Events");
        cy.get("#home").click();
        cy.get("h1").contains("Recommended Events");
    });
    
    //routing to settings
    it("Navigation to settings",()=>{
        cy.get("h1").contains("Recommended Events");
        cy.get("#settings").click();
        //cy.wait(2000);
        cy.get("h1").contains("Settings");
    });

    //routing to profile
    it("Navigation to profile",()=>{
        cy.get("h1").contains("Recommended Events");
        cy.get("#profile").click();
        cy.get("h1").contains("Profile");
    });

    //routing to calendar
    it("Navigation to calendar",()=>{
        cy.get("h1").contains("Recommended Events");
        cy.get("#calendar").click();
        cy.get("h1").contains("Calendar");
    });
    
     //routing to settings and back to home
     it("Navigation from settings to home",()=>{
        cy.get("h1").contains("Recommended Events");
        cy.get("#settings").click();
        //cy.wait(2000);
        cy.get("h1").contains("Settings");
     });
 
     //routing to profile and back to home
     it("Navigation from profile to home ",()=>{
        /*cy.wait(8000);
        cy.get("h1").contains("Recommended Events");
        cy.get("#profile").click();
        cy.get("h1").contains("Profile");
        cy.wait(4000);
        cy.get("ion-back-button").click();
        cy.wait(1000);
        cy.get("h1").contains("Recommended Events");
        */
     });
 
     //routing to calendar and back to home
     it("Navigation from calendar to home",()=>{
        /*cy.wait(8000);
        cy.get("h1").contains("Recommended Events");
        cy.get("#calendar").click();
        cy.get("h1").contains("Calendar");
        cy.wait(4000);
        cy.get("ion-back-button").click();
        cy.wait(1000);
        cy.get("h1").contains("Recommended Events");
        */
     });

})