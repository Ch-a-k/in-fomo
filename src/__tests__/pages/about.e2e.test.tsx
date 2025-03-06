// Пример E2E теста с использованием Cypress

// cypress/integration/about.spec.js
describe('About Page', () => {
  beforeEach(() => {
    cy.visit('/about')
  })

  it('should display the hero section', () => {
    cy.get('h1').contains('About Us')
    cy.get('p').contains('Innovative IT Solutions')
  })

  it('should navigate to team section when clicking the link', () => {
    cy.get('a[href="#team"]').click()
    cy.url().should('include', '#team')
    cy.get('h2').contains('Meet Our Team').should('be.visible')
  })

  it('should navigate to values section when clicking the link', () => {
    cy.get('a[href="#values"]').click()
    cy.url().should('include', '#values')
    cy.get('h2').contains('Our Core Values').should('be.visible')
  })

  it('should display all team members', () => {
    cy.get('#team').scrollIntoView()
    cy.get('#team').find('.grid > div').should('have.length', 10)
  })

  it('should display all company values', () => {
    cy.get('#values').scrollIntoView()
    cy.get('#values').find('.grid > div').should('have.length', 4)
  })

  it('should have working navigation links in header', () => {
    cy.get('header').find('a[href="/"]').should('exist')
    cy.get('header').find('a[href="/services"]').should('exist')
    cy.get('header').find('a[href="/portfolio"]').should('exist')
    cy.get('header').find('a[href="/contact"]').should('exist')
  })

  it('should toggle theme when clicking theme button', () => {
    cy.get('button[aria-label="Toggle theme"]').click()
    cy.get('body').should('have.class', 'dark')
    cy.get('button[aria-label="Toggle theme"]').click()
    cy.get('body').should('not.have.class', 'dark')
  })
}) 