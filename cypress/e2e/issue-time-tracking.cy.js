describe('Issue time tracking', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getTimeSpent = ()  => cy.get('[data-testid="modal:tracking"]').find('div').first().children().eq(2).children().first().children().eq(1).children().first();
    const getTimeRemaining = ()  => cy.get('[data-testid="modal:tracking"]').find('div').first().children().eq(2).children().eq(1).children().eq(1).children().first();
    

    it.only('Should add estimation to issue', () => {
        //Adding time tracking and estimation 
        cy.get('input[placeholder="Number"]').clear().type(20);
        cy.get('[data-testid="icon:stopwatch"]').click();
        getTimeSpent().clear().type(2)
        getTimeRemaining().type(5)
        cy.wait(1000);
        cy.contains('button','Done').click()
        cy.get('[data-testid="icon:close"]').eq(0).click()

        //Checking the adding
        cy.contains('This is an issue of type: Task.').click()
        cy.get('input[placeholder="Number"]').should('have.value','20')
        cy.get('[data-testid="icon:stopwatch"]').click();
        getTimeSpent().should('have.value','2')
        getTimeRemaining().should('have.value','5')
        cy.contains('button','Done').click()

        //Deleting time tracking and estimation 
        cy.get('input[placeholder="Number"]').clear()
        cy.get('[data-testid="icon:stopwatch"]').click();
        getTimeSpent().clear()
        getTimeRemaining().clear()
        cy.wait(1000);
        cy.contains('button','Done').click()
        cy.get('[data-testid="icon:close"]').eq(0).click()

        //Checking the deletion 
        cy.contains('This is an issue of type: Task.').click()
        cy.get('input[placeholder="Number"]').should('have.value','')
        cy.get('[data-testid="icon:stopwatch"]').click();
        getTimeSpent().should('have.value','')
        getTimeRemaining().should('have.value','')
    });
});