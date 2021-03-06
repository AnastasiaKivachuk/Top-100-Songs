import { PATH_RESTORE_PASSWORD, PATH_SIGN_IN } from '@constants/routes.constants';
import firebase from '@root/firebase.config';
import { TEST_USER } from '@root/cypress/fixtures/mock.constants';
import { signOut } from '@services/user.service';

describe('RESTORE PASSWORD', () => {
  beforeEach(() => {
    cy.visit(PATH_RESTORE_PASSWORD);
    const user = firebase.auth().currentUser;
    if (user) {
      signOut();
    }
  });

  it('should render text', () => {
    cy.contains('Restore password');
  });

  it('displays 1 input', () => {
    cy.get('label').should('have.text', 'Email Address *');
  });

  it('check first input type', () => {
    cy.get('input').should('have.value', '');
    cy.get('input').type('1234');
    cy.get('input').should('have.value', '1234');
  });

  it('check invalid value on submit', () => {
    cy.get('input').type('1234');
    cy.get('button').click();
    cy.contains('Email is incorrect');
  });

  it('can\'t restore password', () => {
    cy.get('input').type('a.test@test.test');
    cy.get('button').click();
    cy.contains('There is no user record corresponding to this identifier');
  });

  it('can\'t restore password', () => {
    cy.get('input').type(TEST_USER.email);
    cy.get('button').click();
    cy.url().should('include', PATH_SIGN_IN.replace('[id]', ''));
  });

  it('check links', () => {
    cy.get('a').should('have.length', 2);
    cy.get('a').first().should('have.attr', 'href', '');
    cy.get('a').last().should('have.attr', 'href', PATH_SIGN_IN);
  });
});
