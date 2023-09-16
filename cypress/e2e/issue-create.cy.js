import { faker } from '@faker-js/faker';



describe('Issue create', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => { 
    cy.visit(url + '/board?modal-issue-create=true');
    });
  });

  const title = "Bug"
  const description = "My bug description"
  it('Should create an issue and validate it successfully', () => {

    cy.get('[data-testid="modal:issue-create"]').within(() => {

      cy.get('[data-testid="select:type"]').click();
      cy.get('[data-testid="select-option:Bug"]').click();

      //issue description      
      cy.get('.ql-editor').type(description);
      //issue title
      cy.get('input[name="title"]').type(title);
      //Select Pickle Rick from reporter dropdown
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Pickle Rick"]').click();
      //set preority
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Highest"]').click();
      //Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });
      //the issue create window is closed, message is shown
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
  
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains(title);
      //correct avatar and icon are visible
      cy.get('[data-testid="avatar:Pickle Rick"]').should('be.visible');
      cy.get('[data-testid="icon:bug"]').should('be.visible');
    });
  });

 
  const title2 = faker.lorem.word();
  const description2 = faker.lorem.sentence(10);
  it('Should create random data issue and validate it successfully', () => {

    cy.get('[data-testid="modal:issue-create"]').within(() => {

      //random issue description      
      cy.get('.ql-editor').type(description2);
      //random issue title
      cy.get('input[name="title"]').type(title2);
      //Select Baby Yoda from reporter dropdown
      cy.get('[data-testid="select:userIds"]').click();
      cy.get('[data-testid="select-option:Baby Yoda"]').click();
      //set preority
      cy.get('[data-testid="select:priority"]').click();
      cy.get('[data-testid="select-option:Low"]').click();
      //Click on button "Create issue"
      cy.get('button[type="submit"]').click();
    });
      //the issue create window is closed, message is shown
    cy.get('[data-testid="modal:issue-create"]').should('not.exist');
    cy.contains('Issue has been successfully created.').should('be.visible');
  
    cy.reload();
    cy.contains('Issue has been successfully created.').should('not.exist');

    cy.get('[data-testid="board-list:backlog').should('be.visible').and('have.length', '1').within(() => {
      cy.get('[data-testid="list-issue"]')
          .should('have.length', '5')
          .first()
          .find('p')
          .contains(title2);
      //correct avatar and icon are visible
      cy.get('[data-testid="avatar:Baby Yoda"]').should('be.visible');
      cy.get('[data-testid="icon:task"]').should('be.visible');
    });
  });

  it('Should validate title is required field if missing', () => {
    cy.get('[data-testid="modal:issue-create"]').within(() => {

      cy.get('button[type="submit"]').click();

      cy.get('[data-testid="form-field:title"]').should('contain', 'This field is required');
    });
  });
});