describe('Searchbar', () => {

  beforeEach(() => {
    cy.visit('')
  })

  it('Should search and select first movie', () => {
    cy.get('h2').should('have.text', 'Aclamados pela crítica:');
    cy.get('[data-testid="search-movie"]').type('The');
    cy.get('[data-testid="movie-searched"]').first().click();
  });

  it('Should move the search page forward and backward to test the pagination', () => {
    cy.get('h2').should('have.text', 'Aclamados pela crítica:');
    cy.get('[data-testid="search-movie"]').type('The');
    cy.get('[data-testid="forward-button"]').click();
    cy.get('[data-testid="back-button"]').click();
  });
})