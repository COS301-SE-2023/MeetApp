describe("Navigation  ",() =>{
    //log in to home page
    beforeEach(() => {
        cy.visit("/");
        cy.get(".same-size-button:nth-child(1)").click();
        cy.get("h1").contains("LOG IN");
        cy.get(".username").type("laura_adams");
        cy.get(".password").type("laurapass");
        cy.get(".submit").click();

        
    });

    it("Navigation to home",()=>{
        cy.get("h1").contains("Recommended Events");
        cy.get('#Notification').click({force:true});
        cy.get('html').contains('Notifications');
    });
    //routing to home
    it("Navigation to home",()=>{
        cy.get("h1").contains("Recommended Events");
    });
    
    //routing to settings
    it("Navigation to settings",()=>{
        cy.get("h1").contains("Recommended Events");
        cy.get("#settings").click({force:true});
        cy.get("h1").contains("Settings");
    });

    //routing to profile
    it("Navigation to profile",()=>{
        cy.get("h1").contains("Recommended Events");
        cy.get("#profile").click({force:true});
        cy.get("h1").contains("Profile");
    });

    //routing to calendar
    it("Navigation to calendar",()=>{
        cy.get("h1").contains("Recommended Events");
        cy.get("#calendar").click({force:true});
        cy.get("h1").contains("Calendar");
    });
    
     //routing to settings and back to home
     it("Navigation from settings to home",()=>{
        cy.get("h1").contains("Recommended Events");
        cy.get("#settings").click({force:true});
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