import { PATH_RESTORE_PASSWORD, PATH_SIGN_IN, PATH_SIGN_UP } from '@constants/routes.constants';
import firebase from '@root/firebase.config';
import { TEST_USER } from '@root/cypress/fixtures/mock.constants';
import { signOut } from '@services/user.service';

describe('SIGN IN', () => {
  beforeEach(() => {
    cy.visit(PATH_SIGN_IN);
    const user = firebase.auth().currentUser;
    if (user) {
      signOut();
    }
  });

  it('should render text', () => {
    cy.contains('Sign In');
  });

  it('displays 3 inputs', () => {
    cy.get('input').should('have.length', 3);
    cy.get('label').eq(0).should('have.text', 'Email Address *');
    cy.get('label').eq(1).should('have.text', 'Password *');
    cy.get('label').eq(2).should('have.text', 'Remember me');
  });

  it('check first input type', () => {
    cy.get('input').first().type('1234');
    cy.get('input').first().should('have.value', '1234');
  });
  it('check second input type', () => {
    cy.get('input').eq(1).type('1234');
    cy.get('input').eq(1).should('have.value', '1234');
  });
  it('check input type', () => {
    cy.get('input').last().should('have.value', 'false');
    cy.get('input').last().click();
    cy.get('input').last().should('have.value', 'true');
  });

  it('check invalid value on submit', () => {
    cy.get('input').first().type('1234');
    cy.get('input').eq(1).type('1234');
    cy.get('input').last().click();
    cy.get('button').click();
    cy.contains('Email is incorrect');
    cy.contains('Min length: 6');
  });

  it('check invalid user on submit', () => {
    cy.get('input').first().type('test1@test.test');
    cy.get('input').eq(1).type('123456');
    cy.get('button').click();
    cy.contains('There is no user record corresponding to this identifier.');
  });

  it('check login user on submit', () => {
    cy.get('input').first().type(TEST_USER.email);
    cy.get('input').eq(1).type(TEST_USER.password);
    cy.get('button').click();
    cy.contains(TEST_USER.email);
  });

  it('check links', () => {
    cy.get('a').should('have.length', 3);
    cy.get('a').first().should('have.attr', 'href', '');
    cy.get('a').eq(1).should('have.attr', 'href', PATH_RESTORE_PASSWORD);
    cy.get('a').last().should('have.attr', 'href', PATH_SIGN_UP);
  });

});
