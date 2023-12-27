describe('Home Movies Page', () => {

  //Arrange
  beforeEach(() => {
    cy.visit('')
  })

  it('should load top-rated movies successfully', () => {
    cy.get('h2').should('have.text', 'Aclamados pela crítica:');
    cy.get('svg[aria-hidden="true"]').should('not.exist');
    cy.get('[data-testid="list-movies"]').should('exist');
    cy.get('[data-testid="movie-card"]').should('have.length', 20);
  });

  it('Click on movie', () => {
    cy.get('[data-testid="list-movies"]').should('be.visible');
    cy.get('[data-testid="loading-movies"]').should('not.exist');
    cy.get('[data-testid="movie-card"]').should('have.length', 20);
    cy.get('[data-testid="movie-card"]').first().click();
  });

})