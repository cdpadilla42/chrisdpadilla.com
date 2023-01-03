import { BASE_URL, BASE_URL_DEV } from '../../../lib/constants';

describe('Test Broken Links', () => {
  it('Loads the landing page', () => {
    const baseUrl =
      process.env.NODE_ENV === 'production' ? BASE_URL : BASE_URL_DEV;
    cy.request(baseUrl).then((res) => {
      expect(res.status).to.eq(200);
    });
  });
});
