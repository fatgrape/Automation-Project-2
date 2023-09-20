describe('Issue deleting', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
      cy.visit(url + '/board');
      cy.contains('This is an issue of type: Task.').click();
    });
  });
    it('Should delete an issue', () => { 
      //deleting issue
      cy.get('[data-testid="modal:issue-details"]').should('be.visible');
      cy.get('[data-testid="icon:trash"]').click();
      cy.get('[data-testid="modal:confirm"]').should('be.visible').within(() => {
      cy.contains('Delete issue').click();
    });
      //deletion confirming
      cy.get('[data-testid="modal:confirm"]').should('not.exist');

      cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
        cy.get('[data-testid="list-issue"]').should('have.length', '3')

        cy.contains('This is an issue of type: Task.').should('not.exist')
      });


  });

    it('Should cancle deleting the issue ', () => {
      //canceling deleting an issue
      cy.get('[data-testid="modal:issue-details"]').should('be.visible');
      cy.get('[data-testid="icon:trash"]').click();
      cy.get('[data-testid="modal:confirm"]').should('be.visible').within(() => {
      cy.contains('Cancle').click();
    });
      //existion conformation
    cy.get('[data-testid="modal:confirm"]').should('not.exist');

    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      cy.get('[data-testid="list-issue"]').should('have.length', '4')

      cy.contains('This is an issue of type: Task.').should('be.visible');
    });
  });
});

