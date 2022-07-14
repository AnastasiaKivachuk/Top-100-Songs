import {
  PATH_INDEX,
  PATH_SONG,
} from '@constants/routes.constants';
import firebase from '../../firebase.config';

const testAcc = 'test@test.test';
const testPassword = '123456';
const id = 'UExESW9VT2hRUVBsWHI2M0lfdndGOUdEOHNBS2g3N2RXVS44NUVBOTY4RTkzNjhCODFE';

describe('SONG', () => {
  beforeEach(() => {
    cy.visit(PATH_SONG.replace('[id]', id));
    const user = firebase.auth().currentUser;
    if (!user) {
      firebase.auth().signInWithEmailAndPassword(testAcc, testPassword);
    }
  });

  it('should render text', () => {
    cy.get('[data-testid="title"]', { timeout: 5000 }).should('have.length', 1);
    cy.contains(testAcc);
  });

  it('check button back', () => {
    cy.visit('http://localhost:3000/');
    // cy.wait(3000);
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
