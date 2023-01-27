import { BASE_URL, BASE_URL_DEV } from '../../lib/constants';

const baseUrl = process.env.NODE_ENV === 'production' ? BASE_URL : BASE_URL_DEV;

const excludedLinks = ['bandcamp', 'linkedin', 'instagram'];

describe('Test Blog Links', () => {
  const blogURL = `${baseUrl}/blog`;
  it('Loads the blog page', () => {
    cy.request(blogURL).then((res) => {
      expect(res.status).to.eq(200);
    });
  });

  it('Verify navigation across blog links', () => {
    cy.visit(blogURL);
    cy.get("a[data-test='blogPageLink'").each((linkElm) => {
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
