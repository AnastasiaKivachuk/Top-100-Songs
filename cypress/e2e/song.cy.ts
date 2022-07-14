import { PATH_INDEX, PATH_SONG } from '@constants/routes.constants';
import firebase from '@root/firebase.config';
import { TEST_USER } from '@root/cypress/fixtures/mock.constants';
import { signInWithEmailAndPassword } from '@services/user.service';

describe('SONG', () => {
  beforeEach(() => {
    cy.visit(PATH_SONG.replace('[id]', TEST_USER.idSong));
    const user = firebase.auth().currentUser;
    if (!user) {
      signInWithEmailAndPassword(TEST_USER.email, TEST_USER.password);
    }
  });

  it('should render text', () => {
    cy.get('[data-testid="title"]', { timeout: 5000 }).should('have.length', 1);
    cy.contains(TEST_USER.email);
  });

  it('check button back', () => {
    cy.visit(PATH_INDEX);
    cy.get('[data-testid="buttonDetail"]', { timeout: 5000 }).first().click();
    cy.get('[data-testid="back"]', { timeout: 5000 }).click({ force: true });
    cy.url().should('include', PATH_INDEX);
  });

  it('open/close details', () => {
    cy.get('[data-testid=btn]', { timeout: 5000 }).contains('Read more');
    cy.get('[data-testid=btn]').click({ force: true });
    cy.get('[data-testid=btn]', { timeout: 5000 }).contains('Show less');
  });

  it('check all links in first loading', () => {
    cy.get('a', { timeout: 5000 }).should('have.length', 2);
  });
});
