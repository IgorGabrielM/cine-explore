describe('Searchbar', () => {

  beforeEach(() => {
    cy.visit('')
  })

  it('Search and select first movie', () => {
    cy.get('h2').should('have.text', 'Aclamados pela crítica:');
    cy.get('[data-testid="search-movie"]').type('The');
    cy.get('[data-testid="movie-searched"]').first().click();
  });

  it('Testing pagination searchbar', () => {
    cy.get('h2').should('have.text', 'Aclamados pela crítica:');
    cy.get('[data-testid="search-movie"]').type('The');
    cy.get('[data-testid="forward-button"]').click();
    cy.get('[data-testid="back-button"]').click();
  });
})