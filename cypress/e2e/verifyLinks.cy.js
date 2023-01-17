import { BASE_URL, BASE_URL_DEV } from '../../lib/constants';

const baseUrl = process.env.NODE_ENV === 'production' ? BASE_URL : BASE_URL_DEV;

const excludedLinks = ['bandcamp', 'linkedin', 'instagram'];

describe('Test Broken Links', () => {
  it('Loads the landing page', () => {
    cy.request(baseUrl).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it('Verify navigation across landing page links', () => {
    const excludedPaths = { bandcamp: true, linkedin: true };
    cy.visit(baseUrl);
    cy.get("a:not([href*='mailto:'])").each((linkElm) => {
      const linkPath = linkElm.attr('href');
      const shouldExclude = excludedLinks.reduce((p, c) => {
        if (p || linkPath.includes(c)) {
          return true;
        }
        return false;
      }, false);

      if (linkPath.length > 0 && !shouldExclude) {
        cy.request(linkPath).then((res) => {
          expect(res.status).to.eq(200);
        });
      }
    });
  });
});

describe('RSS', () => {
  it('Loads the feed', () => {
    cy.request(`${baseUrl}/api/feed`).then((res) => {
      expect(res.status).to.eq(200);
    });
  });
});
