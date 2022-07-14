import { PATH_INDEX, PATH_SIGN_IN, PATH_SIGN_UP } from '@constants/routes.constants';
import firebase from '../../firebase.config';

describe('SIGN UP', () => {
  beforeEach(() => {
    cy.visit(PATH_SIGN_UP);
    const user = firebase.auth().currentUser;
    if (user) {
      firebase.auth().signOut();
    }
  });

  const testAcc = 'test@test.test';
  const testPassword = '123456';

  it('should render text', () => {
    cy.contains('Sign Up');
  });

  it('displays 3 inputs', () => {
    cy.get('input').should('have.length', 3);
    cy.get('label').eq(0).should('have.text', 'Email Address *');
    cy.get('label').eq(1).should('have.text', 'Password *');
    cy.get('label').eq(2).should('have.text', 'Remember me');
  });

  it('check first input type', () => {
    cy.get('input').first().should('have.value', '');
    cy.get('input').first().type('1234');
    cy.get('input').first().should('have.value', '1234');
  });
  it('check second input type', () => {
    cy.get('input').eq(1).should('have.value', '');
    cy.get('input').eq(1).type('1234');
    cy.get('input').eq(1).should('have.value', '1234');
  });
  it('check third input type', () => {
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

  it('can\'t create test acc', () => {
    cy.get('input').first().type(testAcc);
    cy.get('input').eq(1).type(testPassword);
    cy.get('button').click();
    cy.contains('The email address is already in use by another account.');
  });

  it('check links', () => {
    cy.get('a').should('have.length', 2);
    cy.get('a').first().should('have.attr', 'href', PATH_INDEX);
    cy.get('a').last().should('have.attr', 'href', PATH_SIGN_IN);
  });
});
