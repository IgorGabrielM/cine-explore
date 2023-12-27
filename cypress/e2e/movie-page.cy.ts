describe('Movie Page', () => {

  beforeEach(() => {
    cy.visit('')
  })

  it('Click movie', () => {
    cy.get('h2').should('have.text', 'Aclamados pela crítica:');
    cy.get('svg[aria-hidden="true"]').should('not.exist');
    cy.get('[data-testid="list-movies"]').should('exist');
    cy.get('[data-testid="movie-card"]').should('have.length', 20);
    cy.get('[data-testid="movie-card"]').first().click();
  });

  it('should display movie details with correct information', () => {
    cy.visit('/pages/movie/238')

    cy.get('[data-testid="title"]').should('exist').and('not.be.empty');
    cy.get('[data-testid="vote"]').should('exist').and('not.be.empty');
    cy.get('[data-testid="description"]').should('exist').and('not.be.empty');
    cy.get('[data-testid="runtime"]').should('exist').and('not.be.empty');
    cy.get('[data-testid="release-date"]').next().should('exist').and('not.be.empty');
    cy.get('[data-testid="gender"]').should('have.length.gte', 1);
  });
})