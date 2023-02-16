import { BASE_URL, BASE_URL_DEV } from '../../lib/constants';

const baseUrl = process.env.NODE_ENV === 'production' ? BASE_URL : BASE_URL_DEV;

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Verify Now Page Renders Blog Page', () => {
  const blogURL = `${baseUrl}/now`;
  it('Loads the blog page with post', () => {
    cy.visit(blogURL);
    const markdownContainerElm = cy.get('.markdown');
    markdownContainerElm.should('be.visible');
  });
});
