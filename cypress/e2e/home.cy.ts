import {
  PATH_INDEX,
  PATH_PROFILE,
  PATH_SIGN_IN,
  PATH_SONG,
} from '@constants/routes.constants';
import firebase from '../../firebase.config';

const testAcc = 'test@test.test';
const testPassword = '123456';

describe('HOME', () => {
  beforeEach(() => {
    cy.visit(PATH_INDEX);
    const user = firebase.auth().currentUser;
    if (!user) {
      firebase.auth().signInWithEmailAndPassword(testAcc, testPassword);
    }
  });

  it('should render text', () => {
    cy.get('[data-testid="title"]').should('have.length', 1);
    cy.contains(testAcc);
  });

  it('should check profile path', () => {
    cy.get('[data-testid="avatar"]').click();
    cy.get('li').should('have.length', 2);
    cy.get('li').first().click();
    cy.url().should('include', PATH_PROFILE);
  });

  it('should sign out', () => {
    cy.get('[data-testid="avatar"]').click();
    cy.get('li').should('have.length', 2);
    cy.get('li').last().click();
    cy.url().should('include', PATH_SIGN_IN);
  });

  it('get data table', () => {
    cy.wait(4000);
    cy.get('.MuiDataGrid-row', { timeout: 5000 }).should('have.length', 10);
  });

  it('add more songs', () => {
    cy.wait(4000);
    cy.get('[data-testid="container"]', { timeout: 5000 }).scrollTo('bottom', { duration: 500 });
    cy.get('.MuiDataGrid-row', { timeout: 5000 }).should('have.length', 20);
  });

  it('check all links in first loading', () => {
    cy.get('a', { timeout: 5000 }).should('have.length', 23);
    cy.get('[data-testid="buttonDetail"]', { timeout: 5000 }).first().click();
    cy.url().should('include', PATH_SONG.replace('[id]', ''));
  });
});
